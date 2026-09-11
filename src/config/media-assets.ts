import { mediaManifest } from "@/config/media-manifest";
import {
  isApprovedPublicMediaSrc,
  virtualAssetFromPublicSrc,
} from "@/config/lab-media-library";

export type MediaAssetCategory =
  | "branding"
  | "home"
  | "doctor"
  | "about"
  | "services"
  | "contact"
  | "technology";

export type MediaAssetTone = "light-mark" | "dark-mark" | "color-mark" | "photo";

export type MediaSizePreset = "small" | "standard" | "large" | "xl" | "wide";
export type MediaPaddingPreset = "none" | "tight" | "standard" | "comfortable";
export type PreviewBackgroundId =
  | "auto"
  | "light"
  | "dark"
  | "primary"
  | "secondary"
  | "accent"
  | "checkerboard";
export type MediaAlignment = "left" | "center";
export type ComposerAssetId = "default" | "placeholder" | string;

export type RegisteredMediaAsset = {
  id: string;
  category: MediaAssetCategory;
  fileName: string;
  src: string;
  label: string;
  tone: MediaAssetTone;
};

export const mediaAssetCategories: Array<{
  id: MediaAssetCategory;
  label: string;
}> = [
  { id: "branding", label: "Branding" },
  { id: "home", label: "Home" },
  { id: "doctor", label: "Doctor" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
  { id: "technology", label: "Technology" },
];

export const mediaAssetRegistry: readonly RegisteredMediaAsset[] = [
  {
    id: "wcda-logo",
    category: "branding",
    fileName: "wcda-logo.png",
    src: "/images/wcda/branding/wcda-logo.png",
    label: "wcda-logo.png",
    tone: "color-mark",
  },
  {
    id: "wcda-logo-white",
    category: "branding",
    fileName: "wcda-logo-white.png",
    src: "/images/wcda/branding/wcda-logo-white.png",
    label: "wcda-logo-white.png",
    tone: "light-mark",
  },
  {
    id: "wcda-logo-black",
    category: "branding",
    fileName: "wcda-logo-black.png",
    src: "/images/wcda/branding/wcda-logo-black.png",
    label: "wcda-logo-black.png",
    tone: "dark-mark",
  },
  {
    id: "wcda-logo-black-w",
    category: "branding",
    fileName: "wcda-logo-black-w.png",
    src: "/images/wcda/branding/wcda-logo-black-w.png",
    label: "wcda-logo-black-w.png",
    tone: "dark-mark",
  },
  {
    id: "wcda-logo-blue",
    category: "branding",
    fileName: "wcda-logo-blue.png",
    src: "/images/wcda/branding/wcda-logo-blue.png",
    label: "wcda-logo-blue.png",
    tone: "color-mark",
  },
  {
    id: "wcda-logo-symbol-blue",
    category: "branding",
    fileName: "wcda-logo-symbol-blue.png",
    src: "/images/wcda/branding/wcda-logo-symbol-blue.png",
    label: "wcda-logo-symbol-blue.png",
    tone: "color-mark",
  },
  {
    id: "wcda-drmatute",
    category: "doctor",
    fileName: "wcda-drmatute.png",
    src: "/images/wcda/doctor/wcda-drmatute.png",
    label: "Dr. Jonnathan Matute — Portrait",
    tone: "photo",
  },
  {
    id: "wcda-home-hero-master-v01",
    category: "home",
    fileName: "wcda-home-hero-master-v01.png",
    src: "/media/home/hero/wcda-home-hero-master-v01.png",
    label: "Home Hero — Cinematic master",
    tone: "photo",
  },
  {
    id: "wcda-category-hero-preventive-general",
    category: "services",
    fileName: "wcda-category-hero.png",
    src: "/media/services/preventive-general/wcda-category-hero.png",
    label: "Preventive & General — Category photograph",
    tone: "photo",
  },
  ...mediaManifest
    .filter((entry) => {
      const src = entry.src;
      return (
        src !== "/images/wcda/doctor/wcda-drmatute.png" &&
        src !== "/media/home/hero/wcda-home-hero-master-v01.png" &&
        src !== "/media/services/preventive-general/wcda-category-hero.png"
      );
    })
    .map((entry) => ({
      id: entry.id,
      category: entry.labCategory,
      fileName: entry.src.split("/").pop() ?? `${entry.id}.svg`,
      src: entry.src,
      label: entry.contentSubject,
      tone: entry.src.endsWith(".svg")
        ? ("color-mark" as const)
        : ("photo" as const),
    })),
];

const assetsById = new Map(
  mediaAssetRegistry.map((asset) => [asset.id, asset] as const),
);

export const MEDIA_PADDING_CSS: Record<MediaPaddingPreset, string> = {
  none: "0px",
  tight: "0.25rem",
  standard: "0.5rem",
  comfortable: "1rem",
};

export const LOGO_PADDING_CSS: Record<MediaPaddingPreset, string> = {
  none: "0px",
  tight: "0.15rem 0.3rem",
  standard: "0.28rem 0.7rem",
  comfortable: "0.38rem 1.05rem",
};

export const LOGO_WIDTH_CSS: Record<MediaSizePreset, string> = {
  small: "9rem",
  standard: "12.5rem",
  large: "15rem",
  wide: "16.5rem",
  xl: "min(21rem, calc(100vw - 8.5rem))",
};

export const mediaSizePresets: Array<{ id: MediaSizePreset; label: string }> = [
  { id: "small", label: "Small" },
  { id: "standard", label: "Standard" },
  { id: "large", label: "Large" },
  { id: "xl", label: "XL" },
  { id: "wide", label: "Wide" },
];

export const mediaPaddingPresets: Array<{
  id: MediaPaddingPreset;
  label: string;
}> = [
  { id: "none", label: "None" },
  { id: "tight", label: "Tight" },
  { id: "standard", label: "Standard" },
  { id: "comfortable", label: "Comfortable" },
];

export const previewBackgrounds: Array<{
  id: PreviewBackgroundId;
  label: string;
}> = [
  { id: "auto", label: "Auto" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "primary", label: "Primary" },
  { id: "secondary", label: "Secondary" },
  { id: "accent", label: "Accent" },
  { id: "checkerboard", label: "Checkerboard" },
];

export function isRegisteredAssetId(value: string): boolean {
  return assetsById.has(value) || isApprovedPublicMediaSrc(value);
}

export function getRegisteredAsset(
  id: string | undefined,
): RegisteredMediaAsset | undefined {
  if (!id) {
    return undefined;
  }
  const registered = assetsById.get(id);
  if (registered) {
    return registered;
  }
  if (isApprovedPublicMediaSrc(id)) {
    const bySrc = mediaAssetRegistry.find((asset) => asset.src === id);
    return bySrc ?? virtualAssetFromPublicSrc(id);
  }
  return undefined;
}

export function getAssetsByCategory(category: MediaAssetCategory) {
  return mediaAssetRegistry.filter((asset) => asset.category === category);
}

export function isDoctorMediaTarget(target?: string) {
  return target === "home-doctor-media" || target === "about-doctor-media";
}

export type MediaGalleryGroupId = "priority" | "related" | "all";

export type MediaGalleryGroup = {
  id: MediaGalleryGroupId;
  label: { en: string; es: string };
  assets: readonly RegisteredMediaAsset[];
};

function assetFolder(src: string) {
  const parts = src.split("/").filter(Boolean);
  if (parts.length < 2) {
    return "";
  }
  return parts.slice(0, -1).join("/");
}

function priorityPrefixForTarget(target?: string, itemKey?: string) {
  if (itemKey) {
    return `media/services/${itemKey}`;
  }
  if (target === "header-logo") {
    return "images/wcda/branding";
  }
  if (target === "home-hero-media") {
    return "media/home";
  }
  if (isDoctorMediaTarget(target)) {
    return "images/wcda/doctor";
  }
  if (target === "contact-media") {
    return "media/contact";
  }
  if (target === "technology-media") {
    return "media/technology";
  }
  if (target === "about-content") {
    return "media/practice";
  }
  if (target === "home-care-areas" || target === "services-care-cards") {
    return "media/services";
  }
  return "";
}

export function galleryGroupsForTarget(
  target?: string,
  itemKey?: string,
): MediaGalleryGroup[] {
  const prefix = priorityPrefixForTarget(target, itemKey);
  const relatedPrefix =
    itemKey && prefix.startsWith("media/services/")
      ? "media/services"
      : prefix.split("/").slice(0, 2).join("/");
  const used = new Set<string>();
  const take = (assets: readonly RegisteredMediaAsset[]) => {
    const next: RegisteredMediaAsset[] = [];
    for (const asset of assets) {
      if (used.has(asset.id)) {
        continue;
      }
      used.add(asset.id);
      next.push(asset);
    }
    return next;
  };

  const priority = prefix
    ? take(
        mediaAssetRegistry.filter((asset) =>
          assetFolder(asset.src).startsWith(prefix),
        ),
      )
    : [];
  const related =
    relatedPrefix && relatedPrefix !== prefix
      ? take(
          mediaAssetRegistry.filter((asset) =>
            assetFolder(asset.src).startsWith(relatedPrefix),
          ),
        )
      : [];
  const all = take([...mediaAssetRegistry]);

  const groups: MediaGalleryGroup[] = [];
  if (prefix) {
    groups.push({
      id: "priority",
      label: { en: "This target", es: "Este destino" },
      assets: priority,
    });
  }
  if (relatedPrefix && relatedPrefix !== prefix) {
    groups.push({
      id: "related",
      label: { en: "Related", es: "Relacionados" },
      assets: related,
    });
  }
  groups.push({
    id: "all",
    label: { en: "All Media", es: "Todo el media" },
    assets: all,
  });
  return groups;
}

export function parseComposerAssetId(value: unknown): ComposerAssetId {
  if (value === "default" || value === "placeholder") {
    return value;
  }
  if (typeof value === "string" && isRegisteredAssetId(value)) {
    return value;
  }
  return "default";
}

export function resolvePreviewBackground(
  previewBackground: PreviewBackgroundId,
  target?: string,
): Exclude<PreviewBackgroundId, "auto"> {
  if (previewBackground !== "auto") {
    return previewBackground;
  }
  return target === "header-logo" ? "dark" : "light";
}

export function getContrastWarning(options: {
  assetId: ComposerAssetId;
  previewBackground: PreviewBackgroundId;
  target?: string;
}): string | null {
  const asset = getRegisteredAsset(options.assetId);
  if (!asset || asset.category !== "branding") {
    return null;
  }

  const background = resolvePreviewBackground(
    options.previewBackground,
    options.target,
  );

  if (asset.tone === "light-mark" && (background === "light" || background === "secondary")) {
    return "Low contrast against current background";
  }

  if (asset.tone === "dark-mark" && background === "dark") {
    return "Low contrast against current background";
  }

  if (asset.tone === "color-mark" && background === "primary") {
    return "Low contrast against current background";
  }

  return null;
}

export type ComposerSource =
  | { mode: "placeholder" }
  | { mode: "default"; src?: string }
  | { mode: "image"; src: string; asset?: RegisteredMediaAsset };

export function resolveComposerSource(
  assetId: ComposerAssetId,
  fallbackSrc?: string,
): ComposerSource {
  if (assetId === "placeholder") {
    return { mode: "placeholder" };
  }

  if (assetId !== "default") {
    const asset = getRegisteredAsset(assetId);
    if (asset) {
      return { mode: "image", src: asset.src, asset };
    }
    if (isApprovedPublicMediaSrc(assetId)) {
      return { mode: "image", src: assetId };
    }
  }

  if (fallbackSrc) {
    return { mode: "image", src: fallbackSrc };
  }

  return { mode: "default" };
}

export function sizePresetsForTarget(
  target?: string,
): Array<{ id: MediaSizePreset; label: string }> {
  if (target === "header-logo") {
    return [
      { id: "small", label: "Compact" },
      { id: "standard", label: "Standard" },
      { id: "wide", label: "Wide" },
      { id: "xl", label: "Full" },
    ];
  }

  if (target === "home-hero-media" || target === "technology-media") {
    return [
      { id: "standard", label: "Standard" },
      { id: "wide", label: "Wide" },
    ];
  }

  if (target === "home-doctor-media" || target === "about-doctor-media") {
    return [
      { id: "standard", label: "Standard" },
      { id: "large", label: "Large" },
    ];
  }

  return [
    { id: "standard", label: "Standard" },
    { id: "large", label: "Large" },
  ];
}

export function scaleRangeForTarget(target?: string) {
  if (target === "header-logo") {
    return { min: 0.5, max: 2, step: 0.01 };
  }
  return { min: 0.5, max: 2, step: 0.01 };
}

export function logoWidthPresets(): Array<{ id: MediaSizePreset; label: string }> {
  return [
    { id: "small", label: "Compact" },
    { id: "standard", label: "Standard" },
    { id: "wide", label: "Wide" },
    { id: "xl", label: "Full" },
  ];
}

export function composerStageClass(
  target: string | undefined,
  sizePreset: MediaSizePreset,
) {
  if (target === "home-hero-media") {
    return "absolute inset-0 h-full w-full max-w-none";
  }

  if (target === "home-doctor-media" || target === "about-doctor-media") {
    return sizePreset === "large" ? "max-w-md" : "max-w-sm";
  }

  if (target === "technology-media") {
    return sizePreset === "wide" ? "max-w-5xl" : "max-w-3xl";
  }

  if (target === "about-content") {
    return sizePreset === "large" ? "max-w-2xl" : "max-w-xl";
  }

  return undefined;
}

export function logoSizeClass(sizePreset: MediaSizePreset) {
  if (sizePreset === "small") {
    return "h-8 max-h-8 sm:h-9 sm:max-h-9";
  }
  if (sizePreset === "large") {
    return "h-10 max-h-10 sm:h-10 sm:max-h-10";
  }
  if (sizePreset === "xl") {
    return "h-10 max-h-10 max-w-[11rem] sm:h-10 sm:max-h-10 sm:max-w-[13rem]";
  }
  return "h-9 max-h-9 sm:h-10 sm:max-h-10";
}
