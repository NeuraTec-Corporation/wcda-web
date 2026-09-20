import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import {
  buildLabIconAsset,
  iconKindFromSrc,
  isAllowedIconUploadFile,
  isApprovedIconSrc,
  isPngBuffer,
  LAB_ICON_DIR,
  operatorIconError,
  sanitizeIconFileName,
  type LabIconAsset,
} from "@/config/lab-icon-library";
import { inspectSvgColorMode, sanitizeSvgSource } from "@/lib/lab-icon-svg";
import {
  listPublicMediaFiles,
  readPublicMediaText,
  writeLabMediaFile,
} from "@/lib/lab-media-fs";
import { isThemeLabEnabled } from "@/config/theme";

export const dynamic = "force-dynamic";

function jsonError(code: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json(
    {
      error: operatorIconError(code, "en"),
      code,
      ...extra,
    },
    { status },
  );
}

function toIconAsset(src: string, fileName: string): LabIconAsset | null {
  const kind = iconKindFromSrc(src);
  if (!kind) {
    return null;
  }
  if (kind === "png") {
    return buildLabIconAsset(src, fileName, "fixed");
  }
  const text = readPublicMediaText(src);
  return buildLabIconAsset(
    src,
    fileName,
    text ? inspectSvgColorMode(text) : "currentColor",
  );
}

function listIconLibrary() {
  return listPublicMediaFiles(LAB_ICON_DIR, false)
    .map((item) => toIconAsset(item.src, item.fileName))
    .filter((item): item is LabIconAsset => Boolean(item));
}

export async function GET() {
  if (!isThemeLabEnabled()) {
    notFound();
  }
  return NextResponse.json({
    assets: listIconLibrary(),
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

  const conflictRaw = String(form.get("conflict") ?? "");
  const conflict =
    conflictRaw === "replace" || conflictRaw === "keep-both"
      ? conflictRaw
      : undefined;
  const file = form.get("file");
  if (!(file instanceof File)) {
    return jsonError("unable", 400);
  }
  const uploadError = isAllowedIconUploadFile(file);
  if (uploadError === "tooLarge") {
    return jsonError("tooLarge", 413);
  }
  if (uploadError) {
    return jsonError("unsupported", 400);
  }
  const safeName = sanitizeIconFileName(file.name);
  if (!safeName) {
    return jsonError("unsupported", 400);
  }
  const kind = iconKindFromSrc(safeName);
  if (!kind) {
    return jsonError("unsupported", 400);
  }

  let bytes: Buffer;
  try {
    bytes = Buffer.from(await file.arrayBuffer());
  } catch {
    return jsonError("unable", 400);
  }

  let writeBytes = bytes;
  let colorMode: LabIconAsset["colorMode"] = "fixed";
  if (kind === "png") {
    if (!isPngBuffer(bytes)) {
      return jsonError("unsupported", 400);
    }
  } else {
    const sanitized = sanitizeSvgSource(bytes.toString("utf8"));
    if (!sanitized.ok) {
      return jsonError(sanitized.code, 400);
    }
    writeBytes = Buffer.from(sanitized.svg, "utf8");
    colorMode = sanitized.colorMode;
  }

  const written = writeLabMediaFile({
    relativeDir: LAB_ICON_DIR,
    fileName: safeName,
    bytes: writeBytes,
    conflict,
  });
  if (!written.ok) {
    return jsonError(written.code, written.code === "exists" ? 409 : 400, {
      fileName: written.code === "exists" ? written.fileName : undefined,
    });
  }
  if (!isApprovedIconSrc(written.asset.src)) {
    return jsonError("unable", 500);
  }
  const asset = buildLabIconAsset(
    written.asset.src,
    written.asset.fileName,
    colorMode,
  );
  if (!asset) {
    return jsonError("unable", 500);
  }
  return NextResponse.json({
    ok: true,
    asset,
  });
}
