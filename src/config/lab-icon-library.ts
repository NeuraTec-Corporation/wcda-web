export const LAB_ICON_API_PATH = "/api/internal/icons";
export const LAB_ICON_DIR = "media/icons";
export const LAB_ICON_PUBLIC_PREFIX = "/media/icons/";
export const LAB_ICON_MAX_BYTES = 2 * 1024 * 1024;
export const LAB_ICON_EXTENSIONS = [".svg", ".png"] as const;

export type LabIconKind = "svg" | "png";
export type LabIconColorMode = "currentColor" | "fixed";

export type LabIconAsset = {
  id: string;
  src: string;
  fileName: string;
  label: string;
  kind: LabIconKind;
  colorMode: LabIconColorMode;
};

const ICON_MIME_TYPES = new Set([
  "",
  "image/svg+xml",
  "image/png",
  "text/xml",
  "application/xml",
  "text/plain",
  "application/octet-stream",
]);

export function iconKindFromSrc(value: string): LabIconKind | null {
  const lower = value.toLowerCase();
  if (lower.endsWith(".svg")) {
    return "svg";
  }
  if (lower.endsWith(".png")) {
    return "png";
  }
  return null;
}

export function isApprovedIconSrc(value: string) {
  if (!value.startsWith(LAB_ICON_PUBLIC_PREFIX)) {
    return false;
  }
  if (value.includes("..") || value.includes("\\") || value.includes("?") || value.includes("#")) {
    return false;
  }
  if (value.includes("//", 1)) {
    return false;
  }
  const rest = value.slice(LAB_ICON_PUBLIC_PREFIX.length);
  if (!rest || rest.includes("/")) {
    return false;
  }
  return iconKindFromSrc(rest) !== null;
}

export function iconLabelFromFileName(fileName: string) {
  const stem = fileName.replace(/\.(svg|png)$/i, "");
  return stem
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeIconFileName(name: string) {
  const base = name.split(/[/\\]/).pop()?.trim() ?? "";
  if (!base) {
    return null;
  }
  const lower = base.toLowerCase();
  const ext = LAB_ICON_EXTENSIONS.find((item) => lower.endsWith(item));
  if (!ext) {
    return null;
  }
  const stem = base
    .slice(0, -ext.length)
    .replace(/\s+/g, "-")
    .replace(/[^A-Za-z0-9._-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^\.+/, "")
    .replace(/\.+$/, "");
  if (!stem) {
    return null;
  }
  return `${stem}${ext}`;
}

export function isAllowedIconUploadFile(file: {
  name: string;
  type?: string;
  size: number;
}) {
  if (file.size > LAB_ICON_MAX_BYTES) {
    return "tooLarge";
  }
  if (!sanitizeIconFileName(file.name)) {
    return "unsupported";
  }
  if (file.type && !ICON_MIME_TYPES.has(file.type.toLowerCase())) {
    return "unsupported";
  }
  return null;
}

export function isPngBuffer(bytes: Uint8Array) {
  return (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  );
}

export function buildLabIconAsset(
  src: string,
  fileName: string,
  colorMode: LabIconColorMode,
): LabIconAsset | null {
  if (!isApprovedIconSrc(src)) {
    return null;
  }
  const kind = iconKindFromSrc(src);
  if (!kind) {
    return null;
  }
  return {
    id: src,
    src,
    fileName,
    label: iconLabelFromFileName(fileName),
    kind,
    colorMode: kind === "png" ? "fixed" : colorMode,
  };
}

export function editorialIconColorEnabled(
  src: string | undefined,
  colorMode: LabIconColorMode,
) {
  if (src && iconKindFromSrc(src) === "png") {
    return false;
  }
  return colorMode === "currentColor";
}

export function operatorIconError(code: string, language: "en" | "es") {
  const copy: Record<string, { en: string; es: string }> = {
    unsupported: {
      en: "Only SVG and PNG icon files are supported.",
      es: "Solo se admiten archivos de icono SVG y PNG.",
    },
    tooLarge: {
      en: "Icon file is too large.",
      es: "El archivo de icono es demasiado grande.",
    },
    exists: {
      en: "An icon with this name already exists.",
      es: "Ya existe un icono con este nombre.",
    },
    unsafe: {
      en: "This SVG contains unsupported or unsafe content.",
      es: "Este SVG contiene contenido no admitido o inseguro.",
    },
    unable: {
      en: "Unable to add icon.",
      es: "No se pudo agregar el icono.",
    },
  };
  return copy[code]?.[language] ?? copy.unable[language];
}
