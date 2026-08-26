import type { PreviewPagePath } from "@/config/theme";
import {
  LOGO_PADDING_CSS,
  LOGO_WIDTH_CSS,
  MEDIA_PADDING_CSS,
  parseComposerAssetId,
  type ComposerAssetId,
  type MediaAlignment,
  type MediaPaddingPreset,
  type MediaSizePreset,
  type PreviewBackgroundId,
} from "@/config/media-assets";

export const EXPERIENCE_SAVE_PATH = "/api/internal/experience";
export const EXPERIENCE_LAB_STORAGE_KEY = "wcda-experience-lab-v3";

export type MediaFit = "cover" | "contain";
export type AspectRatioPreset = "auto" | "1 / 1" | "4 / 3" | "3 / 4" | "16 / 9";
export type OverlayPreset = "none" | "light" | "dark" | "brand";
export type MediaSourceMode = "approved" | "placeholder";
export type ContainerPresetId =
  | "clean"
  | "soft-card"
  | "editorial"
  | "offset-frame"
  | "floating-badge"
  | "rounded-portrait"
  | "full-bleed"
  | "feature-card"
  | "corner-action"
  | "top-action"
  | "bottom-action"
  | "media-overlay"
  | "carousel-card"
  | "video-card"
  | "badge-card"
  | "integrated-cutout"
  | "inset-badge-cutout";
export type MediaContainerStyleId =
  | "clean"
  | "soft-rounded"
  | "editorial"
  | "corner-action"
  | "bottom-action"
  | "floating-badge"
  | "rotating-badge"
  | "video"
  | "carousel-media"
  | "full-bleed"
  | "transparent-strip"
  | "brand-surface"
  | "light-surface";
export type MotionEntrance =
  | "none"
  | "fade"
  | "fade-up"
  | "fade-down"
  | "slide-left"
  | "slide-right"
  | "scale-in"
  | "reveal";
export type MotionDuration = "fast" | "medium" | "slow";
export type MotionIntensity = "subtle" | "normal";
export type MotionDelay = "0" | "short" | "medium";
export type MarqueeSpeed = "slow" | "medium";
export type MarqueeDirection = "left" | "right";
export type MarqueeSurface = "primary" | "secondary" | "accent" | "dark";
export type MarqueeLayout = "text" | "icon-text";
export type MarqueeSpacing = "compact" | "comfortable" | "wide";
export type MarqueeHeight = "compact" | "standard" | "large";
export type BadgePosition = "bottom-left" | "bottom-right";
export type BadgeType = "static" | "rotating" | "action";
export type BadgeIconId = "tooth" | "sparkle" | "plus";
export type BadgeDiameter = "small" | "medium" | "large";
export type BadgeRotationSpeed = "slow" | "very-slow";
export type BadgeTextColor = "inverse" | "accent" | "muted";
export type CursorCompanionMode = "off" | "subtle";
export type VideoMode = "modal" | "external" | "embed";
export type PlayButtonStyle = "solid" | "outline" | "minimal";
export type VideoCornerAction = "none" | "info" | "play";
export type CarouselCardsPerView = 1 | 2 | 3;
export type CarouselNavigation = "dots" | "arrows" | "both";
export type CarouselAutoplay = "off" | "slow";
export type CornerActionPosition = "top-right" | "bottom-right" | "bottom-left";
export type CornerActionGlyph = "info" | "arrow" | "play" | "plus";
export type CornerActionMorph = "none" | "info-arrow" | "emphasize";

export type VisualTargetId =
  | "header-logo"
  | "home-hero-media"
  | "home-doctor-media"
  | "home-care-areas"
  | "home-cta"
  | "home-marquee"
  | "about-doctor-media"
  | "about-content"
  | "services-care-cards"
  | "services-treatment-media"
  | "contact-media"
  | "technology-media";

export type ComponentSlotId =
  | "header.logo"
  | "home.hero"
  | "home.services"
  | "home.doctor"
  | "home.cta"
  | "home.marquee"
  | "about.doctor"
  | "about.content"
  | "services.cards"
  | "services.treatments"
  | "contact.media"
  | "technology.media";

export type VisualTarget = {
  id: VisualTargetId;
  label: string;
};

export type ComponentSlotConfig = {
  containerPreset: ContainerPresetId;
  mediaStyle: MediaContainerStyleId;
  assetId: ComposerAssetId;
  fit: MediaFit;
  scale: number;
  positionX: number;
  positionY: number;
  sizePreset: MediaSizePreset;
  padding: MediaPaddingPreset;
  previewBackground: PreviewBackgroundId;
  alignment: MediaAlignment;
  insetBadgeSize?: number;
};

export type MediaExperience = {
  source: MediaSourceMode;
  fit: MediaFit;
  positionX: number;
  positionY: number;
  size: number;
  aspectRatio: AspectRatioPreset;
  radius: number;
  overlay: OverlayPreset;
};

export type ExperienceValues = {
  media: MediaExperience;
  containerPreset: ContainerPresetId;
  motion: {
    entrance: MotionEntrance;
    duration: MotionDuration;
    intensity: MotionIntensity;
    delay: MotionDelay;
  };
  marquee: {
    enabled: boolean;
    layout: MarqueeLayout;
    spacing: MarqueeSpacing;
    height: MarqueeHeight;
    speed: MarqueeSpeed;
    direction: MarqueeDirection;
    pauseOnHover: boolean;
    surface: MarqueeSurface;
  };
  floatingBadge: {
    enabled: boolean;
    type: BadgeType;
    position: BadgePosition;
    overlap: number;
  };
  rotatingBadge: {
    text: string;
    icon: BadgeIconId;
    diameter: BadgeDiameter;
    speed: BadgeRotationSpeed;
    direction: MarqueeDirection;
    surface: MarqueeSurface;
    textColor: BadgeTextColor;
    position: BadgePosition;
  };
  video: {
    enabled: boolean;
    mode: VideoMode;
    poster: MediaSourceMode;
    playButton: PlayButtonStyle;
    overlay: OverlayPreset;
    container: ContainerPresetId;
    cornerAction: VideoCornerAction;
    aspectRatio: AspectRatioPreset;
  };
  carousel: {
    enabled: boolean;
    cardsPerView: CarouselCardsPerView;
    navigation: CarouselNavigation;
    autoplay: CarouselAutoplay;
  };
  cornerAction: {
    enabled: boolean;
    position: CornerActionPosition;
    glyph: CornerActionGlyph;
    morph: CornerActionMorph;
  };
  beforeAfter: {
    enabled: boolean;
  };
  cursorCompanion: CursorCompanionMode;
  components: Record<ComponentSlotId, ComponentSlotConfig>;
};

export const containerPresets: Array<{
  id: ContainerPresetId;
  label: string;
  labelEs?: string;
  number: string;
  labHidden?: boolean;
}> = [
  { id: "clean", label: "Clean", number: "01" },
  { id: "soft-card", label: "Soft Card", number: "02" },
  { id: "editorial", label: "Editorial", number: "03" },
  { id: "offset-frame", label: "Offset Frame", number: "04" },
  {
    id: "inset-badge-cutout",
    label: "Inset Badge Cutout",
    labelEs: "Insignia Integrada",
    number: "05",
  },
  {
    id: "floating-badge",
    label: "Floating Badge",
    number: "05",
    labHidden: true,
  },
  { id: "rounded-portrait", label: "Rounded Portrait", number: "06" },
  { id: "full-bleed", label: "Full Bleed", number: "07" },
  { id: "feature-card", label: "Feature Card", number: "08" },
  { id: "corner-action", label: "Corner Action", number: "09" },
  { id: "top-action", label: "Top Action", number: "10" },
  { id: "bottom-action", label: "Bottom Action", number: "11" },
  { id: "media-overlay", label: "Media Overlay Chrome", number: "12" },
  { id: "carousel-card", label: "Carousel Card Chrome", number: "13" },
  { id: "video-card", label: "Video Card Chrome", number: "14" },
  { id: "badge-card", label: "Badge Card", number: "15", labHidden: true },
  {
    id: "integrated-cutout",
    label: "Integrated Cutout",
    number: "16",
    labHidden: true,
  },
];

export const mediaContainerStyles: Array<{
  id: MediaContainerStyleId;
  label: string;
}> = [
  { id: "clean", label: "Clean" },
  { id: "soft-rounded", label: "Soft Rounded" },
  { id: "editorial", label: "Editorial" },
  { id: "corner-action", label: "Corner Action" },
  { id: "bottom-action", label: "Bottom Action" },
  { id: "floating-badge", label: "Floating Badge" },
  { id: "rotating-badge", label: "Rotating Badge" },
  { id: "video", label: "Video" },
  { id: "carousel-media", label: "Carousel Media" },
  { id: "full-bleed", label: "Full Bleed" },
];

export const headerLogoContainerStyles: Array<{
  id: MediaContainerStyleId;
  label: string;
}> = [
  { id: "transparent-strip", label: "Transparent Strip" },
  { id: "brand-surface", label: "Brand Surface" },
  { id: "light-surface", label: "Light Surface" },
];

export const HEADER_LOGO_STYLE_IDS: readonly MediaContainerStyleId[] = [
  "transparent-strip",
  "brand-surface",
  "light-surface",
];

const headerLogoTarget: VisualTarget = {
  id: "header-logo",
  label: "Header Logo",
};

export const visualTargetsByPage: Partial<
  Record<PreviewPagePath, readonly VisualTarget[]>
> = {
  "/": [
    headerLogoTarget,
    { id: "home-hero-media", label: "Home Hero Media" },
    { id: "home-doctor-media", label: "Dr. Matute Media" },
    { id: "home-care-areas", label: "Service Card Media" },
    { id: "home-cta", label: "Primary CTA" },
    { id: "home-marquee", label: "Services Marquee" },
  ],
  "/about": [
    headerLogoTarget,
    { id: "about-content", label: "About Media" },
  ],
  "/about/dr-jonnathan-matute": [
    headerLogoTarget,
    { id: "about-doctor-media", label: "Dr. Matute Media" },
  ],
  "/services": [
    headerLogoTarget,
    { id: "services-care-cards", label: "Service Card Media" },
    { id: "services-treatment-media", label: "Treatment Media" },
  ],
  "/patients": [headerLogoTarget],
  "/technology": [
    headerLogoTarget,
    { id: "technology-media", label: "Technology Media" },
  ],
  "/contact": [
    headerLogoTarget,
    { id: "contact-media", label: "Contact Media" },
  ],
};

export const visualTargetSlots: Record<VisualTargetId, ComponentSlotId> = {
  "header-logo": "header.logo",
  "home-hero-media": "home.hero",
  "home-doctor-media": "home.doctor",
  "home-care-areas": "home.services",
  "home-cta": "home.cta",
  "home-marquee": "home.marquee",
  "about-doctor-media": "about.doctor",
  "about-content": "about.content",
  "services-care-cards": "services.cards",
  "services-treatment-media": "services.treatments",
  "contact-media": "contact.media",
  "technology-media": "technology.media",
};

export const COMPONENT_SLOTS: ComponentSlotId[] = [
  "header.logo",
  "home.hero",
  "home.services",
  "home.doctor",
  "home.cta",
  "home.marquee",
  "about.doctor",
  "about.content",
  "services.cards",
  "services.treatments",
  "contact.media",
  "technology.media",
];

export const MEDIA_COMPOSER_TARGETS: readonly VisualTargetId[] = [
  "header-logo",
  "home-hero-media",
  "home-doctor-media",
  "about-doctor-media",
  "about-content",
  "home-care-areas",
  "services-care-cards",
  "services-treatment-media",
  "contact-media",
  "technology-media",
];

export const GLOBAL_MEDIA_TARGETS: readonly VisualTargetId[] =
  MEDIA_COMPOSER_TARGETS.filter((target) => target !== "header-logo");

export function isMediaComposerTarget(target: VisualTargetId) {
  return MEDIA_COMPOSER_TARGETS.includes(target);
}

export const MOTION_UNSUPPORTED_TARGETS: readonly VisualTargetId[] = [
  "header-logo",
  "home-marquee",
];

export const GENERAL_CONTAINER_PRESET_IDS: readonly ContainerPresetId[] = [
  "clean",
  "soft-card",
  "editorial",
  "offset-frame",
  "rounded-portrait",
  "full-bleed",
  "feature-card",
];

export const ACTION_CONTAINER_PRESET_IDS: readonly ContainerPresetId[] = [
  "corner-action",
  "top-action",
  "bottom-action",
];

export const CARD_CONTAINER_PRESET_IDS: readonly ContainerPresetId[] = [
  "clean",
  "soft-card",
  "editorial",
  "offset-frame",
  "rounded-portrait",
  "feature-card",
  "corner-action",
  "top-action",
  "bottom-action",
  "carousel-card",
];

export const MEDIA_CONTAINER_PRESET_IDS: readonly ContainerPresetId[] = [
  "clean",
  "soft-card",
  "editorial",
  "offset-frame",
  "rounded-portrait",
  "full-bleed",
  "feature-card",
  "media-overlay",
  "inset-badge-cutout",
];

export const BADGE_CONTAINER_PRESET_IDS: readonly ContainerPresetId[] = [
  "inset-badge-cutout",
];

export const TREATMENT_CONTAINER_PRESET_IDS: readonly ContainerPresetId[] = [
  "clean",
  "soft-card",
  "editorial",
  "offset-frame",
  "rounded-portrait",
  "feature-card",
  "full-bleed",
];

export const SECTION_CONTAINER_PRESET_IDS: readonly ContainerPresetId[] = [
  "clean",
  "soft-card",
  "editorial",
  "offset-frame",
  "feature-card",
];

export const BADGE_COMPATIBLE_TARGETS: readonly VisualTargetId[] = [
  "home-doctor-media",
  "about-doctor-media",
  "about-content",
  "technology-media",
];

export const ACTION_COMPATIBLE_TARGETS: readonly VisualTargetId[] = [
  "home-care-areas",
  "services-care-cards",
];

export const CAROUSEL_CHROME_TARGETS: readonly VisualTargetId[] = [
  "home-care-areas",
  "services-care-cards",
];

export const VIDEO_CHROME_TARGETS: readonly VisualTargetId[] = [
  "home-hero-media",
  "technology-media",
];

export const OVERLAY_CHROME_TARGETS: readonly VisualTargetId[] = [
  "home-hero-media",
  "home-doctor-media",
  "about-doctor-media",
  "about-content",
  "technology-media",
  "contact-media",
];

export const containerToMediaStyle: Record<
  ContainerPresetId,
  MediaContainerStyleId
> = {
  clean: "clean",
  "soft-card": "soft-rounded",
  editorial: "editorial",
  "offset-frame": "editorial",
  "floating-badge": "floating-badge",
  "rounded-portrait": "soft-rounded",
  "full-bleed": "full-bleed",
  "feature-card": "soft-rounded",
  "corner-action": "corner-action",
  "top-action": "corner-action",
  "bottom-action": "bottom-action",
  "media-overlay": "clean",
  "carousel-card": "carousel-media",
  "video-card": "video",
  "badge-card": "rotating-badge",
  "integrated-cutout": "clean",
  "inset-badge-cutout": "clean",
};

export function isActionCompatibleTarget(target: VisualTargetId) {
  return ACTION_COMPATIBLE_TARGETS.includes(target);
}

export function isCarouselChromeTarget(target: VisualTargetId) {
  return CAROUSEL_CHROME_TARGETS.includes(target);
}

export function isVideoChromeTarget(target: VisualTargetId) {
  return VIDEO_CHROME_TARGETS.includes(target);
}

export function isOverlayChromeTarget(target: VisualTargetId) {
  return OVERLAY_CHROME_TARGETS.includes(target);
}

export function isInsetBadgeTarget(target: VisualTargetId) {
  return BADGE_COMPATIBLE_TARGETS.includes(target);
}

export function containerPresetsForTarget(target: VisualTargetId) {
  if (target === "header-logo" || target === "home-marquee") {
    return [];
  }

  const ids: ContainerPresetId[] = [];

  if (target === "home-care-areas" || target === "services-care-cards") {
    ids.push(...CARD_CONTAINER_PRESET_IDS);
  } else if (target === "services-treatment-media") {
    ids.push(...TREATMENT_CONTAINER_PRESET_IDS);
  } else if (target === "home-cta") {
    ids.push(...SECTION_CONTAINER_PRESET_IDS);
  } else {
    ids.push(...GENERAL_CONTAINER_PRESET_IDS);
    if (isOverlayChromeTarget(target)) {
      ids.push("media-overlay");
    }
    if (isVideoChromeTarget(target)) {
      ids.push("video-card");
    }
    if (isInsetBadgeTarget(target)) {
      ids.push("inset-badge-cutout");
    }
  }

  const allowed = new Set(ids);
  return containerPresets.filter(
    (preset) => allowed.has(preset.id) && !preset.labHidden,
  );
}

export function mediaStylesForTarget(target: VisualTargetId) {
  if (target === "header-logo") {
    return [...headerLogoContainerStyles];
  }
  if (target === "home-cta" || target === "home-marquee") {
    return [];
  }

  const exclude = new Set<MediaContainerStyleId>([
    "floating-badge",
    "rotating-badge",
  ]);
  if (!isActionCompatibleTarget(target)) {
    exclude.add("corner-action");
    exclude.add("bottom-action");
  }
  if (!isVideoChromeTarget(target)) {
    exclude.add("video");
  }
  if (!isCarouselChromeTarget(target)) {
    exclude.add("carousel-media");
  }
  if (target === "home-care-areas" || target === "services-care-cards") {
    exclude.add("full-bleed");
  }

  return mediaContainerStyles.filter((item) => !exclude.has(item.id));
}

export function isCornerContainerPreset(
  preset: ContainerPresetId,
): preset is Extract<
  ContainerPresetId,
  "corner-action" | "top-action" | "bottom-action"
> {
  return (
    preset === "corner-action" ||
    preset === "top-action" ||
    preset === "bottom-action"
  );
}

export function isHiddenBadgePreset(preset: ContainerPresetId) {
  return (
    preset === "floating-badge" ||
    preset === "badge-card" ||
    preset === "integrated-cutout"
  );
}

export function isInsetBadgeCutoutPreset(preset: ContainerPresetId) {
  return preset === "inset-badge-cutout" || isHiddenBadgePreset(preset);
}

export function isIntegratedCutoutPreset(preset: ContainerPresetId) {
  return isInsetBadgeCutoutPreset(preset);
}

export function labVisibleContainerPreset(
  preset: ContainerPresetId,
  target: VisualTargetId,
): ContainerPresetId {
  if (
    isInsetBadgeCutoutPreset(preset) &&
    containerPresetsForTarget(target).some(
      (item) => item.id === "inset-badge-cutout",
    )
  ) {
    return "inset-badge-cutout";
  }
  return preset;
}

export const INSET_BADGE_SIZE_DEFAULT = 96;
export const INSET_BADGE_SIZE_MIN = 64;
export const INSET_BADGE_SIZE_MAX = 160;

export function insetBadgeSizePx(config: ComponentSlotConfig) {
  return clampNumber(
    config.insetBadgeSize,
    INSET_BADGE_SIZE_MIN,
    INSET_BADGE_SIZE_MAX,
    INSET_BADGE_SIZE_DEFAULT,
  );
}

export const defaultSlotConfig: ComponentSlotConfig = {
  containerPreset: "clean",
  mediaStyle: "clean",
  assetId: "default",
  fit: "cover",
  scale: 1,
  positionX: 50,
  positionY: 50,
  sizePreset: "standard",
  padding: "none",
  previewBackground: "auto",
  alignment: "left",
};

function photographySlot(): ComponentSlotConfig {
  return { ...defaultSlotConfig };
}

function logoSlot(): ComponentSlotConfig {
  return {
    ...defaultSlotConfig,
    fit: "contain",
    padding: "none",
    mediaStyle: "transparent-strip",
    sizePreset: "wide",
  };
}

export function defaultComponents(): Record<ComponentSlotId, ComponentSlotConfig> {
  return {
    "header.logo": logoSlot(),
    "home.hero": photographySlot(),
    "home.services": photographySlot(),
    "home.doctor": photographySlot(),
    "home.cta": photographySlot(),
    "home.marquee": photographySlot(),
    "about.doctor": photographySlot(),
    "about.content": photographySlot(),
    "services.cards": photographySlot(),
    "services.treatments": photographySlot(),
    "contact.media": photographySlot(),
    "technology.media": photographySlot(),
  };
}

export const mediaStyleToContainer: Record<MediaContainerStyleId, ContainerPresetId> = {
  clean: "clean",
  "soft-rounded": "soft-card",
  editorial: "editorial",
  "corner-action": "corner-action",
  "bottom-action": "bottom-action",
  "floating-badge": "inset-badge-cutout",
  "rotating-badge": "inset-badge-cutout",
  video: "video-card",
  "carousel-media": "carousel-card",
  "full-bleed": "full-bleed",
  "transparent-strip": "clean",
  "brand-surface": "clean",
  "light-surface": "clean",
};

export const defaultMediaExperience: MediaExperience = {
  source: "approved",
  fit: "cover",
  positionX: 50,
  positionY: 50,
  size: 1,
  aspectRatio: "auto",
  radius: 8,
  overlay: "none",
};

/* WCDA_FACTORY_EXPERIENCE_START */
export function createFactoryExperience(): ExperienceValues {
  return {
    media: {
      source: "approved",
      fit: "cover",
      positionX: 50,
      positionY: 50,
      size: 1,
      aspectRatio: "auto",
      radius: 8,
      overlay: "none",
    },
    containerPreset: "clean",
    motion: {
      entrance: "none",
      duration: "medium",
      intensity: "subtle",
      delay: "0",
    },
    marquee: {
      enabled: false,
      layout: "text",
      spacing: "comfortable",
      height: "standard",
      speed: "slow",
      direction: "left",
      pauseOnHover: true,
      surface: "primary",
    },
    floatingBadge: {
      enabled: false,
      type: "static",
      position: "bottom-left",
      overlap: 0.22,
    },
    rotatingBadge: {
      text: "WEST CALDWELL DENTAL ARTS",
      icon: "tooth",
      diameter: "medium",
      speed: "slow",
      direction: "left",
      surface: "primary",
      textColor: "inverse",
      position: "bottom-left",
    },
    video: {
      enabled: false,
      mode: "modal",
      poster: "placeholder",
      playButton: "solid",
      overlay: "dark",
      container: "video-card",
      cornerAction: "none",
      aspectRatio: "16 / 9",
    },
    carousel: {
      enabled: false,
      cardsPerView: 3,
      navigation: "both",
      autoplay: "off",
    },
    cornerAction: {
      enabled: false,
      position: "bottom-right",
      glyph: "arrow",
      morph: "info-arrow",
    },
    beforeAfter: {
      enabled: false,
    },
    cursorCompanion: "off",
    components: {
      "header.logo": {
        containerPreset: "clean",
        mediaStyle: "transparent-strip",
        assetId: "default",
        fit: "contain",
        scale: 1,
        positionX: 50,
        positionY: 50,
        sizePreset: "wide",
        padding: "none",
        previewBackground: "auto",
        alignment: "left",
      },
      "home.hero": {
        containerPreset: "clean",
        mediaStyle: "clean",
        assetId: "default",
        fit: "cover",
        scale: 1,
        positionX: 50,
        positionY: 50,
        sizePreset: "standard",
        padding: "none",
        previewBackground: "auto",
        alignment: "left",
      },
      "home.services": {
        containerPreset: "clean",
        mediaStyle: "clean",
        assetId: "default",
        fit: "cover",
        scale: 1,
        positionX: 50,
        positionY: 50,
        sizePreset: "standard",
        padding: "none",
        previewBackground: "auto",
        alignment: "left",
      },
      "home.doctor": {
        containerPreset: "clean",
        mediaStyle: "clean",
        assetId: "default",
        fit: "cover",
        scale: 1,
        positionX: 50,
        positionY: 50,
        sizePreset: "standard",
        padding: "none",
        previewBackground: "auto",
        alignment: "left",
      },
      "home.cta": {
        containerPreset: "clean",
        mediaStyle: "clean",
        assetId: "default",
        fit: "cover",
        scale: 1,
        positionX: 50,
        positionY: 50,
        sizePreset: "standard",
        padding: "none",
        previewBackground: "auto",
        alignment: "left",
      },
      "home.marquee": {
        containerPreset: "clean",
        mediaStyle: "clean",
        assetId: "default",
        fit: "cover",
        scale: 1,
        positionX: 50,
        positionY: 50,
        sizePreset: "standard",
        padding: "none",
        previewBackground: "auto",
        alignment: "left",
      },
      "about.doctor": {
        containerPreset: "clean",
        mediaStyle: "clean",
        assetId: "default",
        fit: "cover",
        scale: 1,
        positionX: 50,
        positionY: 50,
        sizePreset: "standard",
        padding: "none",
        previewBackground: "auto",
        alignment: "left",
      },
      "about.content": {
        containerPreset: "clean",
        mediaStyle: "clean",
        assetId: "default",
        fit: "cover",
        scale: 1,
        positionX: 50,
        positionY: 50,
        sizePreset: "standard",
        padding: "none",
        previewBackground: "auto",
        alignment: "left",
      },
      "services.cards": {
        containerPreset: "clean",
        mediaStyle: "clean",
        assetId: "default",
        fit: "cover",
        scale: 1,
        positionX: 50,
        positionY: 50,
        sizePreset: "standard",
        padding: "none",
        previewBackground: "auto",
        alignment: "left",
      },
      "services.treatments": {
        containerPreset: "clean",
        mediaStyle: "clean",
        assetId: "default",
        fit: "cover",
        scale: 1,
        positionX: 50,
        positionY: 50,
        sizePreset: "standard",
        padding: "none",
        previewBackground: "auto",
        alignment: "left",
      },
      "contact.media": {
        containerPreset: "clean",
        mediaStyle: "clean",
        assetId: "default",
        fit: "cover",
        scale: 1,
        positionX: 50,
        positionY: 50,
        sizePreset: "standard",
        padding: "none",
        previewBackground: "auto",
        alignment: "left",
      },
      "technology.media": {
        containerPreset: "clean",
        mediaStyle: "clean",
        assetId: "default",
        fit: "cover",
        scale: 1,
        positionX: 50,
        positionY: 50,
        sizePreset: "standard",
        padding: "none",
        previewBackground: "auto",
        alignment: "left",
      },
    },
  };
}

export const wcdaFactoryExperience: ExperienceValues = createFactoryExperience();
/* WCDA_FACTORY_EXPERIENCE_END */

export const wcdaFactoryExperienceMeta = {
  name: "WCDA Factory",
  capturedAt: "2026-08-25T23:40:00-04:00",
  source: "Current Approved Theme + Experience",
} as const;

/* WCDA_APPROVED_EXPERIENCE_START */
export const approvedExperience: ExperienceValues = {
  media: {
    source: "approved",
    fit: "cover",
    positionX: 50,
    positionY: 50,
    size: 1,
    aspectRatio: "auto",
    radius: 8,
    overlay: "none",
  },
  containerPreset: "clean",
  motion: {
    entrance: "none",
    duration: "medium",
    intensity: "subtle",
    delay: "0",
  },
  marquee: {
    enabled: false,
    layout: "text",
    spacing: "comfortable",
    height: "standard",
    speed: "slow",
    direction: "left",
    pauseOnHover: true,
    surface: "primary",
  },
  floatingBadge: {
    enabled: false,
    type: "static",
    position: "bottom-left",
    overlap: 0.22,
  },
  rotatingBadge: {
    text: "WEST CALDWELL DENTAL ARTS",
    icon: "tooth",
    diameter: "medium",
    speed: "slow",
    direction: "left",
    surface: "primary",
    textColor: "inverse",
    position: "bottom-left",
  },
  video: {
    enabled: false,
    mode: "modal",
    poster: "placeholder",
    playButton: "solid",
    overlay: "dark",
    container: "video-card",
    cornerAction: "none",
    aspectRatio: "16 / 9",
  },
  carousel: {
    enabled: false,
    cardsPerView: 3,
    navigation: "both",
    autoplay: "off",
  },
  cornerAction: {
    enabled: false,
    position: "bottom-right",
    glyph: "arrow",
    morph: "info-arrow",
  },
  beforeAfter: {
    enabled: false,
  },
  cursorCompanion: "off",
  components: {
    "header.logo": {
      containerPreset: "clean",
      mediaStyle: "transparent-strip",
      assetId: "default",
      fit: "contain",
      scale: 1,
      positionX: 50,
      positionY: 50,
      sizePreset: "wide",
      padding: "none",
      previewBackground: "auto",
      alignment: "left",
    },
    "home.hero": {
      containerPreset: "clean",
      mediaStyle: "clean",
      assetId: "default",
      fit: "cover",
      scale: 1,
      positionX: 50,
      positionY: 50,
      sizePreset: "standard",
      padding: "none",
      previewBackground: "auto",
      alignment: "left",
    },
    "home.services": {
      containerPreset: "clean",
      mediaStyle: "clean",
      assetId: "default",
      fit: "cover",
      scale: 1,
      positionX: 50,
      positionY: 50,
      sizePreset: "standard",
      padding: "none",
      previewBackground: "auto",
      alignment: "left",
    },
    "home.doctor": {
      containerPreset: "clean",
      mediaStyle: "clean",
      assetId: "default",
      fit: "cover",
      scale: 1,
      positionX: 50,
      positionY: 50,
      sizePreset: "standard",
      padding: "none",
      previewBackground: "auto",
      alignment: "left",
    },
    "home.cta": {
      containerPreset: "clean",
      mediaStyle: "clean",
      assetId: "default",
      fit: "cover",
      scale: 1,
      positionX: 50,
      positionY: 50,
      sizePreset: "standard",
      padding: "none",
      previewBackground: "auto",
      alignment: "left",
    },
    "home.marquee": {
      containerPreset: "clean",
      mediaStyle: "clean",
      assetId: "default",
      fit: "cover",
      scale: 1,
      positionX: 50,
      positionY: 50,
      sizePreset: "standard",
      padding: "none",
      previewBackground: "auto",
      alignment: "left",
    },
    "about.doctor": {
      containerPreset: "clean",
      mediaStyle: "clean",
      assetId: "default",
      fit: "cover",
      scale: 1,
      positionX: 50,
      positionY: 50,
      sizePreset: "standard",
      padding: "none",
      previewBackground: "auto",
      alignment: "left",
    },
    "about.content": {
      containerPreset: "clean",
      mediaStyle: "clean",
      assetId: "default",
      fit: "cover",
      scale: 1,
      positionX: 50,
      positionY: 50,
      sizePreset: "standard",
      padding: "none",
      previewBackground: "auto",
      alignment: "left",
    },
    "services.cards": {
      containerPreset: "clean",
      mediaStyle: "clean",
      assetId: "default",
      fit: "cover",
      scale: 1,
      positionX: 50,
      positionY: 50,
      sizePreset: "standard",
      padding: "none",
      previewBackground: "auto",
      alignment: "left",
    },
    "services.treatments": {
      containerPreset: "clean",
      mediaStyle: "clean",
      assetId: "default",
      fit: "cover",
      scale: 1,
      positionX: 50,
      positionY: 50,
      sizePreset: "standard",
      padding: "none",
      previewBackground: "auto",
      alignment: "left",
    },
    "contact.media": {
      containerPreset: "clean",
      mediaStyle: "clean",
      assetId: "default",
      fit: "cover",
      scale: 1,
      positionX: 50,
      positionY: 50,
      sizePreset: "standard",
      padding: "none",
      previewBackground: "auto",
      alignment: "left",
    },
    "technology.media": {
      containerPreset: "clean",
      mediaStyle: "clean",
      assetId: "default",
      fit: "cover",
      scale: 1,
      positionX: 50,
      positionY: 50,
      sizePreset: "standard",
      padding: "none",
      previewBackground: "auto",
      alignment: "left",
    },
  },
};
/* WCDA_APPROVED_EXPERIENCE_END */

const SOURCES: MediaSourceMode[] = ["approved", "placeholder"];
const FITS: MediaFit[] = ["cover", "contain"];
const ASPECTS: AspectRatioPreset[] = ["auto", "1 / 1", "4 / 3", "3 / 4", "16 / 9"];
const OVERLAYS: OverlayPreset[] = ["none", "light", "dark", "brand"];
const CONTAINERS: ContainerPresetId[] = containerPresets.map((item) => item.id);
const MEDIA_STYLES: MediaContainerStyleId[] = [
  ...mediaContainerStyles.map((item) => item.id),
  ...headerLogoContainerStyles.map((item) => item.id),
];
const ENTRANCES: MotionEntrance[] = [
  "none",
  "fade",
  "fade-up",
  "fade-down",
  "slide-left",
  "slide-right",
  "scale-in",
  "reveal",
];
const DURATIONS: MotionDuration[] = ["fast", "medium", "slow"];
const INTENSITIES: MotionIntensity[] = ["subtle", "normal"];
const DELAYS: MotionDelay[] = ["0", "short", "medium"];
const SPEEDS: MarqueeSpeed[] = ["slow", "medium"];
const DIRECTIONS: MarqueeDirection[] = ["left", "right"];
const SURFACES: MarqueeSurface[] = ["primary", "secondary", "accent", "dark"];
const MARQUEE_LAYOUTS: MarqueeLayout[] = ["text", "icon-text"];
const MARQUEE_SPACING: MarqueeSpacing[] = ["compact", "comfortable", "wide"];
const MARQUEE_HEIGHTS: MarqueeHeight[] = ["compact", "standard", "large"];
const BADGE_POSITIONS: BadgePosition[] = ["bottom-left", "bottom-right"];
const BADGE_TYPES: BadgeType[] = ["static", "rotating", "action"];
const BADGE_ICONS: BadgeIconId[] = ["tooth", "sparkle", "plus"];
const BADGE_DIAMETERS: BadgeDiameter[] = ["small", "medium", "large"];
const BADGE_ROTATION: BadgeRotationSpeed[] = ["slow", "very-slow"];
const BADGE_TEXT_COLORS: BadgeTextColor[] = ["inverse", "accent", "muted"];
const CURSORS: CursorCompanionMode[] = ["off", "subtle"];
const VIDEO_MODES: VideoMode[] = ["modal", "external", "embed"];
const PLAY_BUTTONS: PlayButtonStyle[] = ["solid", "outline", "minimal"];
const VIDEO_CORNERS: VideoCornerAction[] = ["none", "info", "play"];
const CAROUSEL_VIEWS: CarouselCardsPerView[] = [1, 2, 3];
const CAROUSEL_NAV: CarouselNavigation[] = ["dots", "arrows", "both"];
const CAROUSEL_AUTOPLAY: CarouselAutoplay[] = ["off", "slow"];
const CORNER_POSITIONS: CornerActionPosition[] = [
  "top-right",
  "bottom-right",
  "bottom-left",
];
const CORNER_GLYPHS: CornerActionGlyph[] = ["info", "arrow", "play", "plus"];
const CORNER_MORPHS: CornerActionMorph[] = ["none", "info-arrow", "emphasize"];
const SIZE_PRESETS: MediaSizePreset[] = [
  "small",
  "standard",
  "large",
  "xl",
  "wide",
];
const PADDING_PRESETS: MediaPaddingPreset[] = [
  "none",
  "tight",
  "standard",
  "comfortable",
];
const PREVIEW_BACKGROUNDS: PreviewBackgroundId[] = [
  "auto",
  "light",
  "dark",
  "primary",
  "secondary",
  "accent",
  "checkerboard",
];
const ALIGNMENTS: MediaAlignment[] = ["left", "center"];

function isInList<T extends string | number>(
  value: unknown,
  list: readonly T[],
): value is T {
  return list.includes(value as T);
}

function clampNumber(value: unknown, min: number, max: number, fallback: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, value));
}

function parseSlotConfig(
  input: unknown,
  fallback: ComponentSlotConfig,
  slot: ComponentSlotId,
): ComponentSlotConfig | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return null;
  }
  const record = input as Record<string, unknown>;
  if (!isInList(record.containerPreset, CONTAINERS)) return null;
  if (!isInList(record.mediaStyle, MEDIA_STYLES)) return null;
  const scaleMax = slot === "header.logo" ? 7 : 2;
  return {
    containerPreset: record.containerPreset,
    mediaStyle: record.mediaStyle,
    assetId: parseComposerAssetId(record.assetId),
    fit: isInList(record.fit, FITS) ? record.fit : fallback.fit,
    scale: clampNumber(record.scale, 0.5, scaleMax, fallback.scale),
    positionX: clampNumber(record.positionX, 0, 100, fallback.positionX),
    positionY: clampNumber(record.positionY, 0, 100, fallback.positionY),
    sizePreset: isInList(record.sizePreset, SIZE_PRESETS)
      ? record.sizePreset
      : fallback.sizePreset,
    padding: isInList(record.padding, PADDING_PRESETS)
      ? record.padding
      : fallback.padding,
    previewBackground: isInList(record.previewBackground, PREVIEW_BACKGROUNDS)
      ? record.previewBackground
      : fallback.previewBackground,
    alignment: isInList(record.alignment, ALIGNMENTS)
      ? record.alignment
      : fallback.alignment,
    ...(typeof record.insetBadgeSize === "number" &&
    Number.isFinite(record.insetBadgeSize)
      ? {
          insetBadgeSize: clampNumber(
            record.insetBadgeSize,
            INSET_BADGE_SIZE_MIN,
            INSET_BADGE_SIZE_MAX,
            INSET_BADGE_SIZE_DEFAULT,
          ),
        }
      : {}),
  };
}

function parseComponents(input: unknown): Record<ComponentSlotId, ComponentSlotConfig> {
  const next = defaultComponents();
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return next;
  }
  const record = input as Record<string, unknown>;
  for (const slot of COMPONENT_SLOTS) {
    const parsed = parseSlotConfig(record[slot], next[slot], slot);
    if (parsed) {
      next[slot] = parsed;
    }
  }
  return next;
}

function parseBadgeText(value: unknown) {
  if (typeof value !== "string") {
    return approvedExperience.rotatingBadge.text;
  }
  const cleaned = value.replace(/\s+/g, " ").trim().slice(0, 48);
  return cleaned.length > 0 ? cleaned.toUpperCase() : approvedExperience.rotatingBadge.text;
}

export function parseExperienceValues(input: unknown): ExperienceValues | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return null;
  }

  const record = input as Record<string, unknown>;
  const mediaInput =
    record.media && typeof record.media === "object"
      ? (record.media as Record<string, unknown>)
      : null;
  const motionInput =
    record.motion && typeof record.motion === "object"
      ? (record.motion as Record<string, unknown>)
      : null;
  const marqueeInput =
    record.marquee && typeof record.marquee === "object"
      ? (record.marquee as Record<string, unknown>)
      : null;
  const badgeInput =
    record.floatingBadge && typeof record.floatingBadge === "object"
      ? (record.floatingBadge as Record<string, unknown>)
      : null;
  const rotatingInput =
    record.rotatingBadge && typeof record.rotatingBadge === "object"
      ? (record.rotatingBadge as Record<string, unknown>)
      : null;
  const videoInput =
    record.video && typeof record.video === "object"
      ? (record.video as Record<string, unknown>)
      : null;
  const carouselInput =
    record.carousel && typeof record.carousel === "object"
      ? (record.carousel as Record<string, unknown>)
      : null;
  const cornerInput =
    record.cornerAction && typeof record.cornerAction === "object"
      ? (record.cornerAction as Record<string, unknown>)
      : null;
  const beforeInput =
    record.beforeAfter && typeof record.beforeAfter === "object"
      ? (record.beforeAfter as Record<string, unknown>)
      : null;

  if (
    !mediaInput ||
    !motionInput ||
    !marqueeInput ||
    !badgeInput ||
    !rotatingInput ||
    !videoInput ||
    !carouselInput ||
    !cornerInput ||
    !beforeInput
  ) {
    return null;
  }

  if (!isInList(mediaInput.source, SOURCES)) return null;
  if (!isInList(mediaInput.fit, FITS)) return null;
  if (!isInList(mediaInput.aspectRatio, ASPECTS)) return null;
  if (!isInList(mediaInput.overlay, OVERLAYS)) return null;
  if (!isInList(record.containerPreset, CONTAINERS)) return null;
  if (!isInList(motionInput.entrance, ENTRANCES)) return null;
  if (!isInList(motionInput.duration, DURATIONS)) return null;
  if (!isInList(motionInput.intensity, INTENSITIES)) return null;
  if (!isInList(motionInput.delay, DELAYS)) return null;
  if (typeof marqueeInput.enabled !== "boolean") return null;
  if (!isInList(marqueeInput.layout, MARQUEE_LAYOUTS)) return null;
  if (!isInList(marqueeInput.spacing, MARQUEE_SPACING)) return null;
  if (!isInList(marqueeInput.height, MARQUEE_HEIGHTS)) return null;
  if (!isInList(marqueeInput.speed, SPEEDS)) return null;
  if (!isInList(marqueeInput.direction, DIRECTIONS)) return null;
  if (typeof marqueeInput.pauseOnHover !== "boolean") return null;
  if (!isInList(marqueeInput.surface, SURFACES)) return null;
  if (typeof badgeInput.enabled !== "boolean") return null;
  if (!isInList(badgeInput.type, BADGE_TYPES)) return null;
  if (!isInList(badgeInput.position, BADGE_POSITIONS)) return null;
  if (!isInList(rotatingInput.icon, BADGE_ICONS)) return null;
  if (!isInList(rotatingInput.diameter, BADGE_DIAMETERS)) return null;
  if (!isInList(rotatingInput.speed, BADGE_ROTATION)) return null;
  if (!isInList(rotatingInput.direction, DIRECTIONS)) return null;
  if (!isInList(rotatingInput.surface, SURFACES)) return null;
  if (!isInList(rotatingInput.textColor, BADGE_TEXT_COLORS)) return null;
  if (!isInList(rotatingInput.position, BADGE_POSITIONS)) return null;
  if (typeof videoInput.enabled !== "boolean") return null;
  if (!isInList(videoInput.mode, VIDEO_MODES)) return null;
  if (!isInList(videoInput.poster, SOURCES)) return null;
  if (!isInList(videoInput.playButton, PLAY_BUTTONS)) return null;
  if (!isInList(videoInput.overlay, OVERLAYS)) return null;
  if (!isInList(videoInput.container, CONTAINERS)) return null;
  if (!isInList(videoInput.cornerAction, VIDEO_CORNERS)) return null;
  if (!isInList(videoInput.aspectRatio, ASPECTS)) return null;
  if (typeof carouselInput.enabled !== "boolean") return null;
  if (!isInList(carouselInput.cardsPerView, CAROUSEL_VIEWS)) return null;
  if (!isInList(carouselInput.navigation, CAROUSEL_NAV)) return null;
  if (!isInList(carouselInput.autoplay, CAROUSEL_AUTOPLAY)) return null;
  if (typeof cornerInput.enabled !== "boolean") return null;
  if (!isInList(cornerInput.position, CORNER_POSITIONS)) return null;
  if (!isInList(cornerInput.glyph, CORNER_GLYPHS)) return null;
  if (!isInList(cornerInput.morph, CORNER_MORPHS)) return null;
  if (typeof beforeInput.enabled !== "boolean") return null;
  if (!isInList(record.cursorCompanion, CURSORS)) return null;

  return {
    media: {
      source: mediaInput.source,
      fit: mediaInput.fit,
      positionX: clampNumber(mediaInput.positionX, 0, 100, 50),
      positionY: clampNumber(mediaInput.positionY, 0, 100, 50),
      size: clampNumber(mediaInput.size, 0.9, 1.15, 1),
      aspectRatio: mediaInput.aspectRatio,
      radius: clampNumber(mediaInput.radius, 0, 24, 8),
      overlay: mediaInput.overlay,
    },
    containerPreset: record.containerPreset,
    motion: {
      entrance: motionInput.entrance,
      duration: motionInput.duration,
      intensity: motionInput.intensity,
      delay: motionInput.delay,
    },
    marquee: {
      enabled: marqueeInput.enabled,
      layout: marqueeInput.layout,
      spacing: marqueeInput.spacing,
      height: marqueeInput.height,
      speed: marqueeInput.speed,
      direction: marqueeInput.direction,
      pauseOnHover: marqueeInput.pauseOnHover,
      surface: marqueeInput.surface,
    },
    floatingBadge: {
      enabled: badgeInput.enabled,
      type: badgeInput.type,
      position: badgeInput.position,
      overlap: clampNumber(badgeInput.overlap, 0.12, 0.36, 0.22),
    },
    rotatingBadge: {
      text: parseBadgeText(rotatingInput.text),
      icon: rotatingInput.icon,
      diameter: rotatingInput.diameter,
      speed: rotatingInput.speed,
      direction: rotatingInput.direction,
      surface: rotatingInput.surface,
      textColor: rotatingInput.textColor,
      position: rotatingInput.position,
    },
    video: {
      enabled: videoInput.enabled,
      mode: videoInput.mode,
      poster: videoInput.poster,
      playButton: videoInput.playButton,
      overlay: videoInput.overlay,
      container: videoInput.container,
      cornerAction: videoInput.cornerAction,
      aspectRatio: videoInput.aspectRatio === "auto" ? "16 / 9" : videoInput.aspectRatio,
    },
    carousel: {
      enabled: carouselInput.enabled,
      cardsPerView: carouselInput.cardsPerView,
      navigation: carouselInput.navigation,
      autoplay: carouselInput.autoplay,
    },
    cornerAction: {
      enabled: cornerInput.enabled,
      position: cornerInput.position,
      glyph: cornerInput.glyph,
      morph: cornerInput.morph,
    },
    beforeAfter: {
      enabled: beforeInput.enabled,
    },
    cursorCompanion: record.cursorCompanion,
    components: parseComponents(record.components),
  };
}

export function pickExperienceValues(value: ExperienceValues): ExperienceValues {
  return parseExperienceValues(value) ?? approvedExperience;
}

export function experienceValuesEqual(a: ExperienceValues, b: ExperienceValues) {
  return JSON.stringify(pickExperienceValues(a)) === JSON.stringify(pickExperienceValues(b));
}

function formatLiteral(value: unknown): string {
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  return String(value);
}

export function formatApprovedExperienceSource(experience: ExperienceValues) {
  const value = pickExperienceValues(experience);
  const componentLines = COMPONENT_SLOTS.flatMap((slot) => {
    const item = value.components[slot];
    return [
      `    ${JSON.stringify(slot)}: {`,
      `      containerPreset: ${formatLiteral(item.containerPreset)},`,
      `      mediaStyle: ${formatLiteral(item.mediaStyle)},`,
      `      assetId: ${formatLiteral(item.assetId)},`,
      `      fit: ${formatLiteral(item.fit)},`,
      `      scale: ${formatLiteral(item.scale)},`,
      `      positionX: ${formatLiteral(item.positionX)},`,
      `      positionY: ${formatLiteral(item.positionY)},`,
      `      sizePreset: ${formatLiteral(item.sizePreset)},`,
      `      padding: ${formatLiteral(item.padding)},`,
      `      previewBackground: ${formatLiteral(item.previewBackground)},`,
      `      alignment: ${formatLiteral(item.alignment)},`,
      ...(item.insetBadgeSize != null
        ? [`      insetBadgeSize: ${formatLiteral(item.insetBadgeSize)},`]
        : []),
      "    },",
    ];
  });

  return [
    "/* WCDA_APPROVED_EXPERIENCE_START */",
    "export const approvedExperience: ExperienceValues = {",
    "  media: {",
    `    source: ${formatLiteral(value.media.source)},`,
    `    fit: ${formatLiteral(value.media.fit)},`,
    `    positionX: ${formatLiteral(value.media.positionX)},`,
    `    positionY: ${formatLiteral(value.media.positionY)},`,
    `    size: ${formatLiteral(value.media.size)},`,
    `    aspectRatio: ${formatLiteral(value.media.aspectRatio)},`,
    `    radius: ${formatLiteral(value.media.radius)},`,
    `    overlay: ${formatLiteral(value.media.overlay)},`,
    "  },",
    `  containerPreset: ${formatLiteral(value.containerPreset)},`,
    "  motion: {",
    `    entrance: ${formatLiteral(value.motion.entrance)},`,
    `    duration: ${formatLiteral(value.motion.duration)},`,
    `    intensity: ${formatLiteral(value.motion.intensity)},`,
    `    delay: ${formatLiteral(value.motion.delay)},`,
    "  },",
    "  marquee: {",
    `    enabled: ${formatLiteral(value.marquee.enabled)},`,
    `    layout: ${formatLiteral(value.marquee.layout)},`,
    `    spacing: ${formatLiteral(value.marquee.spacing)},`,
    `    height: ${formatLiteral(value.marquee.height)},`,
    `    speed: ${formatLiteral(value.marquee.speed)},`,
    `    direction: ${formatLiteral(value.marquee.direction)},`,
    `    pauseOnHover: ${formatLiteral(value.marquee.pauseOnHover)},`,
    `    surface: ${formatLiteral(value.marquee.surface)},`,
    "  },",
    "  floatingBadge: {",
    `    enabled: ${formatLiteral(value.floatingBadge.enabled)},`,
    `    type: ${formatLiteral(value.floatingBadge.type)},`,
    `    position: ${formatLiteral(value.floatingBadge.position)},`,
    `    overlap: ${formatLiteral(value.floatingBadge.overlap)},`,
    "  },",
    "  rotatingBadge: {",
    `    text: ${formatLiteral(value.rotatingBadge.text)},`,
    `    icon: ${formatLiteral(value.rotatingBadge.icon)},`,
    `    diameter: ${formatLiteral(value.rotatingBadge.diameter)},`,
    `    speed: ${formatLiteral(value.rotatingBadge.speed)},`,
    `    direction: ${formatLiteral(value.rotatingBadge.direction)},`,
    `    surface: ${formatLiteral(value.rotatingBadge.surface)},`,
    `    textColor: ${formatLiteral(value.rotatingBadge.textColor)},`,
    `    position: ${formatLiteral(value.rotatingBadge.position)},`,
    "  },",
    "  video: {",
    `    enabled: ${formatLiteral(value.video.enabled)},`,
    `    mode: ${formatLiteral(value.video.mode)},`,
    `    poster: ${formatLiteral(value.video.poster)},`,
    `    playButton: ${formatLiteral(value.video.playButton)},`,
    `    overlay: ${formatLiteral(value.video.overlay)},`,
    `    container: ${formatLiteral(value.video.container)},`,
    `    cornerAction: ${formatLiteral(value.video.cornerAction)},`,
    `    aspectRatio: ${formatLiteral(value.video.aspectRatio)},`,
    "  },",
    "  carousel: {",
    `    enabled: ${formatLiteral(value.carousel.enabled)},`,
    `    cardsPerView: ${formatLiteral(value.carousel.cardsPerView)},`,
    `    navigation: ${formatLiteral(value.carousel.navigation)},`,
    `    autoplay: ${formatLiteral(value.carousel.autoplay)},`,
    "  },",
    "  cornerAction: {",
    `    enabled: ${formatLiteral(value.cornerAction.enabled)},`,
    `    position: ${formatLiteral(value.cornerAction.position)},`,
    `    glyph: ${formatLiteral(value.cornerAction.glyph)},`,
    `    morph: ${formatLiteral(value.cornerAction.morph)},`,
    "  },",
    "  beforeAfter: {",
    `    enabled: ${formatLiteral(value.beforeAfter.enabled)},`,
    "  },",
    `  cursorCompanion: ${formatLiteral(value.cursorCompanion)},`,
    "  components: {",
    ...componentLines,
    "  },",
    "};",
    "/* WCDA_APPROVED_EXPERIENCE_END */",
  ].join("\n");
}

const MOTION_DURATION_MS: Record<MotionDuration, string> = {
  fast: "420ms",
  medium: "700ms",
  slow: "1100ms",
};

const MOTION_DELAY_MS: Record<MotionDelay, string> = {
  "0": "0ms",
  short: "80ms",
  medium: "160ms",
};

const MOTION_DISTANCE: Record<MotionIntensity, string> = {
  subtle: "10px",
  normal: "18px",
};

export function slotForTarget(target: VisualTargetId): ComponentSlotId {
  return visualTargetSlots[target];
}

export function getComponentConfig(
  experience: ExperienceValues,
  target?: VisualTargetId,
) {
  if (!target) {
    return defaultSlotConfig;
  }
  return experience.components[slotForTarget(target)] ?? defaultSlotConfig;
}

export function updateComponentConfig(
  experience: ExperienceValues,
  target: VisualTargetId,
  patch: Partial<ComponentSlotConfig>,
): ExperienceValues {
  const slot = slotForTarget(target);
  const current = experience.components[slot] ?? defaultSlotConfig;
  const next = { ...current, ...patch };
  return {
    ...experience,
    containerPreset: next.containerPreset,
    components: {
      ...experience.components,
      [slot]: next,
    },
  };
}

export function experienceToCssVars(experience: ExperienceValues) {
  return {
    "--exp-media-fit": experience.media.fit,
    "--exp-media-x": `${experience.media.positionX}%`,
    "--exp-media-y": `${experience.media.positionY}%`,
    "--exp-media-size": String(experience.media.size),
    ...(experience.media.aspectRatio === "auto"
      ? {}
      : { "--exp-media-aspect": experience.media.aspectRatio }),
    "--exp-media-radius": `${experience.media.radius}px`,
    "--exp-motion-duration": MOTION_DURATION_MS[experience.motion.duration],
    "--exp-motion-delay": MOTION_DELAY_MS[experience.motion.delay],
    "--exp-motion-distance": MOTION_DISTANCE[experience.motion.intensity],
    "--exp-marquee-duration":
      experience.marquee.speed === "slow" ? "48s" : "28s",
    "--exp-badge-overlap": `${Math.round(experience.floatingBadge.overlap * 100)}%`,
    "--exp-badge-spin":
      experience.rotatingBadge.speed === "very-slow" ? "48s" : "28s",
  };
}

export function composerCssVars(config: ComponentSlotConfig) {
  return {
    ["--exp-media-fit" as string]: config.fit,
    ["--exp-media-scale" as string]: String(config.scale),
    ["--exp-media-x" as string]: `${config.positionX}%`,
    ["--exp-media-y" as string]: `${config.positionY}%`,
    ["--exp-media-pad" as string]: MEDIA_PADDING_CSS[config.padding],
    ["--exp-logo-scale" as string]: String(config.scale),
    ["--exp-logo-x" as string]: `${config.positionX}%`,
    ["--exp-logo-y" as string]: `${config.positionY}%`,
    ["--exp-logo-padding" as string]: LOGO_PADDING_CSS[config.padding],
    ["--exp-logo-width" as string]: LOGO_WIDTH_CSS[config.sizePreset],
    ["--exp-logo-fit" as string]: config.fit,
  };
}

export function isMotionTarget(target?: string) {
  return Boolean(
    target &&
      target in visualTargetSlots &&
      !MOTION_UNSUPPORTED_TARGETS.includes(target as VisualTargetId),
  );
}

export function approvedExperienceStyleText(experience: ExperienceValues) {
  const vars = experienceToCssVars(experience);
  const declarations = Object.entries(vars)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
  return `html {\n${declarations}\n}`;
}

export function approvedExperienceHtmlAttributes(experience: ExperienceValues) {
  return {
    "data-exp-motion": experience.motion.entrance,
    "data-exp-overlay": experience.media.overlay,
  };
}

function applyComposerToNode(node: HTMLElement, config: ComponentSlotConfig) {
  const vars = composerCssVars(config);
  for (const [name, value] of Object.entries(vars)) {
    node.style.setProperty(name, value);
  }
  node.dataset.containerPreset = config.containerPreset;
  node.dataset.mediaStyle = config.mediaStyle;
  node.dataset.expSize = config.sizePreset;
  node.dataset.expPad = config.padding;
  node.dataset.expAlign = config.alignment;
  node.dataset.expFit = config.fit;
}

function clearComposerFromNode(node: HTMLElement) {
  node.style.removeProperty("--exp-media-fit");
  node.style.removeProperty("--exp-media-scale");
  node.style.removeProperty("--exp-media-x");
  node.style.removeProperty("--exp-media-y");
  node.style.removeProperty("--exp-media-pad");
  node.style.removeProperty("--exp-logo-scale");
  node.style.removeProperty("--exp-logo-x");
  node.style.removeProperty("--exp-logo-y");
  node.style.removeProperty("--exp-logo-padding");
  node.style.removeProperty("--exp-logo-width");
  node.style.removeProperty("--exp-logo-fit");
  delete node.dataset.containerPreset;
  delete node.dataset.mediaStyle;
  delete node.dataset.expSize;
  delete node.dataset.expPad;
  delete node.dataset.expBg;
  delete node.dataset.expAlign;
  delete node.dataset.expFit;
}

export function applyExperienceToDocument(
  experience: ExperienceValues,
  selectedTarget: VisualTargetId,
  element: HTMLElement = document.documentElement,
) {
  const vars = experienceToCssVars(experience);
  for (const [name, value] of Object.entries(vars)) {
    element.style.setProperty(name, value);
  }

  if (experience.media.aspectRatio === "auto") {
    element.style.removeProperty("--exp-media-aspect");
  }

  element.dataset.expSource = experience.media.source;
  element.dataset.expOverlay = experience.media.overlay;
  element.dataset.expMotion = experience.motion.entrance;
  element.dataset.expContainer = experience.containerPreset;
  element.dataset.expMarqueeDir = experience.marquee.direction;
  element.dataset.expMarqueePause = experience.marquee.pauseOnHover
    ? "true"
    : "false";
  element.dataset.expTarget = selectedTarget;

  document.querySelectorAll("[data-visual-target]").forEach((node) => {
    if (!(node instanceof HTMLElement)) {
      return;
    }
    const target = node.dataset.visualTarget as VisualTargetId | undefined;
    const active = target === selectedTarget;
    node.toggleAttribute("data-exp-active", active);
    if (target && target in visualTargetSlots) {
      applyComposerToNode(node, getComponentConfig(experience, target));
    } else if (active) {
      node.dataset.containerPreset = experience.containerPreset;
    } else {
      clearComposerFromNode(node);
    }
  });
}

export function clearExperienceFromDocument(
  element: HTMLElement = document.documentElement,
) {
  for (const name of Object.keys(experienceToCssVars(approvedExperience))) {
    element.style.removeProperty(name);
  }
  element.style.removeProperty("--exp-media-aspect");
  delete element.dataset.expSource;
  delete element.dataset.expOverlay;
  delete element.dataset.expMotion;
  delete element.dataset.expContainer;
  delete element.dataset.expMarqueeDir;
  delete element.dataset.expMarqueePause;
  delete element.dataset.expTarget;
  document.querySelectorAll("[data-visual-target]").forEach((node) => {
    if (node instanceof HTMLElement) {
      node.removeAttribute("data-exp-active");
      clearComposerFromNode(node);
    }
  });
}

export function targetsForPage(path: PreviewPagePath) {
  return visualTargetsByPage[path] ?? [];
}

export function usesBadgeStyle(style: MediaContainerStyleId) {
  return (
    style === "floating-badge" ||
    style === "rotating-badge"
  );
}

export function badgeTypeFromStyle(style: MediaContainerStyleId): BadgeType {
  if (style === "rotating-badge") {
    return "rotating";
  }
  return "static";
}
