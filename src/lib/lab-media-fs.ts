import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
  type Dirent,
} from "node:fs";
import path from "node:path";
import {
  APPROVED_PUBLIC_PREFIXES,
  isApprovedPublicMediaSrc,
  LAB_MEDIA_EXTENSIONS,
  nextVersionedFileName,
  sanitizeMediaFileName,
  virtualAssetFromPublicSrc,
  type LabMediaListAsset,
} from "@/config/lab-media-library";

const PUBLIC_ROOT = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "public",
);

function approvedRoots() {
  return APPROVED_PUBLIC_PREFIXES.map((prefix) =>
    path.join(
      /* turbopackIgnore: true */ PUBLIC_ROOT,
      prefix.replace(/^\//, ""),
    ),
  );
}

export function isPathInsideApprovedRoot(candidate: string) {
  const resolved = path.resolve(candidate);
  return approvedRoots().some((root) => {
    const rel = path.relative(root, resolved);
    return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
  });
}

export function publicDirToFs(relativeDir: string) {
  const dest = path.join(/* turbopackIgnore: true */ PUBLIC_ROOT, relativeDir);
  if (!isPathInsideApprovedRoot(dest)) {
    return null;
  }
  return dest;
}

function toPublicSrc(absFile: string) {
  const rel = path.relative(PUBLIC_ROOT, absFile).replaceAll("\\", "/");
  return `/${rel}`;
}

export function readPublicMediaText(src: string) {
  if (!isApprovedPublicMediaSrc(src)) {
    return null;
  }
  const abs = path.join(
    /* turbopackIgnore: true */ PUBLIC_ROOT,
    src.replace(/^\//, ""),
  );
  if (!isPathInsideApprovedRoot(abs) || !existsSync(/* turbopackIgnore: true */ abs)) {
    return null;
  }
  try {
    return readFileSync(/* turbopackIgnore: true */ abs, "utf8");
  } catch {
    return null;
  }
}

function isAllowedFile(fileName: string) {
  const lower = fileName.toLowerCase();
  return LAB_MEDIA_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function readDirents(dir: string): Dirent[] {
  try {
    return readdirSync(/* turbopackIgnore: true */ dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function listFilesRecursive(dir: string, depth: number, acc: string[]) {
  if (depth < 0 || !existsSync(/* turbopackIgnore: true */ dir)) {
    return;
  }
  for (const entry of readDirents(dir)) {
    const abs = path.join(/* turbopackIgnore: true */ dir, entry.name);
    if (!isPathInsideApprovedRoot(abs)) {
      continue;
    }
    if (entry.isDirectory()) {
      listFilesRecursive(abs, depth - 1, acc);
      continue;
    }
    if (entry.isFile() && isAllowedFile(entry.name)) {
      acc.push(abs);
    }
  }
}

export function listPublicMediaFiles(
  relativeDir: string,
  recursive = false,
): LabMediaListAsset[] {
  const dir = publicDirToFs(relativeDir);
  if (!dir || !existsSync(/* turbopackIgnore: true */ dir)) {
    return [];
  }
  const files: string[] = [];
  if (recursive) {
    listFilesRecursive(dir, 4, files);
  } else {
    for (const entry of readDirents(dir)) {
      if (!entry.isFile() || !isAllowedFile(entry.name)) {
        continue;
      }
      const abs = path.join(/* turbopackIgnore: true */ dir, entry.name);
      if (isPathInsideApprovedRoot(abs)) {
        files.push(abs);
      }
    }
  }
  const assets: LabMediaListAsset[] = [];
  for (const abs of files) {
    const src = toPublicSrc(abs);
    if (!isApprovedPublicMediaSrc(src)) {
      continue;
    }
    if (src.startsWith("/media/icons/") && relativeDir !== "media/icons") {
      continue;
    }
    assets.push({
      ...virtualAssetFromPublicSrc(src),
      discovered: true,
    });
  }
  return assets.sort((a, b) => a.fileName.localeCompare(b.fileName));
}

export function existingFileNames(relativeDir: string) {
  return new Set(
    listPublicMediaFiles(relativeDir, false).map((item) => item.fileName),
  );
}

export type MediaWriteConflict = "replace" | "keep-both";

export function writeLabMediaFile(options: {
  relativeDir: string;
  fileName: string;
  bytes: Buffer;
  conflict?: MediaWriteConflict;
}) {
  const destDir = publicDirToFs(options.relativeDir);
  if (!destDir) {
    return { ok: false as const, code: "unable" };
  }
  const safeName = sanitizeMediaFileName(options.fileName);
  if (!safeName) {
    return { ok: false as const, code: "unsupported" };
  }
  mkdirSync(/* turbopackIgnore: true */ destDir, { recursive: true });
  const taken = existingFileNames(options.relativeDir);
  const takenLower = new Set([...taken].map((item) => item.toLowerCase()));
  let finalName = safeName;
  if (takenLower.has(safeName.toLowerCase())) {
    if (options.conflict === "replace") {
      finalName = safeName;
    } else if (options.conflict === "keep-both") {
      finalName = nextVersionedFileName(safeName, taken);
    } else {
      return {
        ok: false as const,
        code: "exists" as const,
        fileName: safeName,
      };
    }
  }
  const abs = path.join(/* turbopackIgnore: true */ destDir, finalName);
  if (!isPathInsideApprovedRoot(abs)) {
    return { ok: false as const, code: "unable" };
  }
  writeFileSync(/* turbopackIgnore: true */ abs, options.bytes);
  const src = toPublicSrc(abs);
  return {
    ok: true as const,
    asset: {
      ...virtualAssetFromPublicSrc(src),
      discovered: true,
    } satisfies LabMediaListAsset,
  };
}
