import { serviceCategories } from "@/data/services";
import type { RegisteredMediaAsset } from "@/config/media-assets";

export const LAB_MEDIA_API_PATH = "/api/internal/media";
export const LAB_MEDIA_MAX_BYTES = 8 * 1024 * 1024;
export const LAB_MEDIA_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".svg",
] as const;

export const LAB_MEDIA_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/svg+xml",
]);

export const APPROVED_PUBLIC_PREFIXES = ["/media/", "/images/wcda/"] as const;

const SERVICE_SLUGS = new Set(serviceCategories.map((item) => item.slug));

export type LabMediaDestination = {
  relativeDir: string;
  publicDir: string;
  label: { en: string; es: string };
};

export type LabMediaListAsset = RegisteredMediaAsset & {
  discovered: boolean;
};

export function isApprovedPublicMediaSrc(value: string) {
  if (!value.startsWith("/") || value.includes("..") || value.includes("\\")) {
    return false;
  }
  if (value.includes("?") || value.includes("#") || value.includes("//", 1)) {
    return false;
  }
  const lower = value.toLowerCase();
  if (
    !LAB_MEDIA_EXTENSIONS.some((ext) => lower.endsWith(ext))
  ) {
    return false;
  }
  return APPROVED_PUBLIC_PREFIXES.some((prefix) => value.startsWith(prefix));
}

export function mediaCategoryForPublicSrc(
  src: string,
): RegisteredMediaAsset["category"] {
  if (src.startsWith("/images/wcda/branding/")) {
    return "branding";
  }
  if (src.startsWith("/images/wcda/doctor/")) {
    return "doctor";
  }
  if (src.startsWith("/media/home/")) {
    return "home";
  }
  if (src.startsWith("/media/practice/") || src.startsWith("/media/about/")) {
    return "about";
  }
  if (src.startsWith("/media/contact/")) {
    return "contact";
  }
  if (src.startsWith("/media/technology/")) {
    return "technology";
  }
  return "services";
}

export function virtualAssetFromPublicSrc(src: string): RegisteredMediaAsset {
  const fileName = src.split("/").pop() ?? "image";
  return {
    id: src,
    src,
    fileName,
    label: fileName,
    category: mediaCategoryForPublicSrc(src),
    tone: src.toLowerCase().endsWith(".svg") ? "color-mark" : "photo",
  };
}

export function destinationForTarget(
  target?: string,
  itemKey?: string,
): LabMediaDestination | null {
  if (
    itemKey &&
    SERVICE_SLUGS.has(itemKey) &&
    (target === "home-care-areas" ||
      target === "services-care-cards" ||
      target === "services-treatment-media")
  ) {
    const category = serviceCategories.find((item) => item.slug === itemKey);
    return {
      relativeDir: `media/services/${itemKey}`,
      publicDir: `/media/services/${itemKey}/`,
      label: {
        en: category?.title ?? itemKey,
        es: category?.title ?? itemKey,
      },
    };
  }

  if (target === "header-logo") {
    return {
      relativeDir: "images/wcda/branding",
      publicDir: "/images/wcda/branding/",
      label: { en: "Header logo", es: "Logo del encabezado" },
    };
  }
  if (target === "home-hero-media") {
    return {
      relativeDir: "media/home/hero",
      publicDir: "/media/home/hero/",
      label: { en: "Home hero", es: "Héroe de inicio" },
    };
  }
  if (target === "home-doctor-media" || target === "about-doctor-media") {
    return {
      relativeDir: "images/wcda/doctor",
      publicDir: "/images/wcda/doctor/",
      label: { en: "Doctor portrait", es: "Retrato del doctor" },
    };
  }
  if (target === "contact-media") {
    return {
      relativeDir: "media/contact",
      publicDir: "/media/contact/",
      label: { en: "Contact media", es: "Media de contacto" },
    };
  }
  if (target === "technology-media") {
    return {
      relativeDir: "media/technology",
      publicDir: "/media/technology/",
      label: { en: "Technology media", es: "Media de tecnología" },
    };
  }
  if (target === "about-content") {
    return {
      relativeDir: "media/practice",
      publicDir: "/media/practice/",
      label: { en: "About media", es: "Media de About" },
    };
  }
  return null;
}

export function relatedDirForTarget(target?: string, itemKey?: string) {
  const dest = destinationForTarget(target, itemKey);
  if (!dest) {
    return null;
  }
  if (dest.relativeDir.startsWith("media/services/")) {
    return "media/services";
  }
  return dest.relativeDir.split("/").slice(0, 2).join("/");
}

export function sanitizeMediaFileName(name: string) {
  const base = name.split(/[/\\]/).pop()?.trim() ?? "";
  if (!base) {
    return null;
  }
  const dot = base.lastIndexOf(".");
  const ext = (dot > 0 ? base.slice(dot) : "").toLowerCase();
  if (
    !LAB_MEDIA_EXTENSIONS.includes(ext as (typeof LAB_MEDIA_EXTENSIONS)[number])
  ) {
    return null;
  }
  const rawStem = dot > 0 ? base.slice(0, dot) : base;
  const stem = rawStem
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

export function isAllowedUploadFile(file: {
  name: string;
  type?: string;
  size: number;
}) {
  if (file.size > LAB_MEDIA_MAX_BYTES) {
    return "tooLarge";
  }
  if (!sanitizeMediaFileName(file.name)) {
    return "unsupported";
  }
  if (file.type && !LAB_MEDIA_MIME_TYPES.has(file.type)) {
    return "unsupported";
  }
  return null;
}

export function nextVersionedFileName(fileName: string, taken: Iterable<string>) {
  const used = new Set(
    [...taken].map((item) => item.toLowerCase()),
  );
  const dot = fileName.lastIndexOf(".");
  const stem = dot > 0 ? fileName.slice(0, dot) : fileName;
  const ext = dot > 0 ? fileName.slice(dot) : "";
  let n = 2;
  while (n < 1000) {
    const candidate = `${stem}-v${String(n).padStart(2, "0")}${ext}`;
    if (!used.has(candidate.toLowerCase())) {
      return candidate;
    }
    n += 1;
  }
  return `${stem}-v${Date.now()}${ext}`;
}

export function operatorMediaError(
  code: string,
  language: "en" | "es",
) {
  const copy: Record<string, { en: string; es: string }> = {
    unsupported: {
      en: "Unsupported image format.",
      es: "Formato de imagen no compatible.",
    },
    tooLarge: {
      en: "File is too large.",
      es: "El archivo es demasiado grande.",
    },
    exists: {
      en: "An image with this name already exists.",
      es: "Ya existe una imagen con este nombre.",
    },
    unable: {
      en: "Unable to add image.",
      es: "No se pudo agregar la imagen.",
    },
    noDestination: {
      en: "This target does not accept new files.",
      es: "Este destino no admite archivos nuevos.",
    },
  };
  return copy[code]?.[language] ?? copy.unable[language];
}
