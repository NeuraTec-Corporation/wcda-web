import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import {
  destinationForTarget,
  isAllowedUploadFile,
  isApprovedPublicMediaSrc,
  operatorMediaError,
  relatedDirForTarget,
  sanitizeMediaFileName,
  type LabMediaListAsset,
} from "@/config/lab-media-library";
import { mediaAssetRegistry } from "@/config/media-assets";
import {
  listPublicMediaFiles,
  writeLabMediaFile,
} from "@/lib/lab-media-fs";
import { isThemeLabEnabled } from "@/config/theme";

export const dynamic = "force-dynamic";

function jsonError(code: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json(
    {
      error: operatorMediaError(code, "en"),
      code,
      ...extra,
    },
    { status },
  );
}

function resolveAssetId(src: string) {
  const registered = mediaAssetRegistry.find((item) => item.src === src);
  return registered?.id ?? src;
}

function withRegistryIds(assets: LabMediaListAsset[]) {
  return assets.map((asset) => ({
    ...asset,
    id: resolveAssetId(asset.src),
  }));
}

export async function GET(request: Request) {
  if (!isThemeLabEnabled()) {
    notFound();
  }
  const url = new URL(request.url);
  const target = url.searchParams.get("target") ?? undefined;
  const itemKey = url.searchParams.get("itemKey") ?? undefined;
  const dest = destinationForTarget(target, itemKey ?? undefined);
  const related = relatedDirForTarget(target, itemKey ?? undefined);
  const thisTarget = dest
    ? withRegistryIds(listPublicMediaFiles(dest.relativeDir, false))
    : [];
  const relatedAssets = related
    ? withRegistryIds(listPublicMediaFiles(related, true)).filter(
        (asset) => !thisTarget.some((item) => item.src === asset.src),
      )
    : [];
  const all = withRegistryIds([
    ...listPublicMediaFiles("media", true),
    ...listPublicMediaFiles("images/wcda", true),
  ]);
  return NextResponse.json({
    destination: dest,
    thisTarget,
    related: relatedAssets,
    all,
  });
}

export async function POST(request: Request) {
  if (!isThemeLabEnabled()) {
    notFound();
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonError("unable", 400);
  }

  const target = String(form.get("target") ?? "");
  const itemKey = String(form.get("itemKey") ?? "") || undefined;
  const conflictRaw = String(form.get("conflict") ?? "");
  const conflict =
    conflictRaw === "replace" || conflictRaw === "keep-both"
      ? conflictRaw
      : undefined;
  const dest = destinationForTarget(target, itemKey);
  if (!dest) {
    return jsonError("noDestination", 400);
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return jsonError("unable", 400);
  }
  const uploadError = isAllowedUploadFile(file);
  if (uploadError === "tooLarge") {
    return jsonError("tooLarge", 413);
  }
  if (uploadError) {
    return jsonError("unsupported", 400);
  }
  const safeName = sanitizeMediaFileName(file.name);
  if (!safeName) {
    return jsonError("unsupported", 400);
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const written = writeLabMediaFile({
    relativeDir: dest.relativeDir,
    fileName: safeName,
    bytes,
    conflict,
  });
  if (!written.ok) {
    return jsonError(written.code, written.code === "exists" ? 409 : 400, {
      fileName: written.code === "exists" ? written.fileName : undefined,
      destinationLabel: dest.label,
    });
  }
  if (!isApprovedPublicMediaSrc(written.asset.src)) {
    return jsonError("unable", 500);
  }
  return NextResponse.json({
    ok: true,
    asset: {
      ...written.asset,
      id: resolveAssetId(written.asset.src),
    },
    destination: dest,
  });
}
