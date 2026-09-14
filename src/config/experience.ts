import type { PreviewPagePath } from "@/config/theme";
import {
  applyScopedElementFills,
  clearScopedElementFills,
  parseScopedColors,
  scopedElementFillCss,
  type ScopedColors,
} from "@/config/scoped-colors";
import {
  LOGO_PADDING_CSS,
  LOGO_WIDTH_CSS,
  MEDIA_PADDING_CSS,
  isRegisteredAssetId,
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
  | "media-card-modern"
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
  | "media-card-modern"
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
  | "home-hero-content"
  | "home-doctor-media"
  | "home-care-areas"
  | "home-cta"
  | "home-marquee"
  | "about-doctor-media"
  | "about-content"
  | "services-care-cards"
  | "services-treatment-media"
  | "contact-media"
  | "technology-media"
  | "patients-resource-cards"
  | "editorial-cards";

export type ComponentSlotId =
  | "header.logo"
  | "home.hero"
  | "home.heroContent"
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

export type ItemMediaOverride = {
  scale: number;
  positionX: number;
  positionY: number;
  panX?: number;
  panY?: number;
  allowFreeOverflow?: boolean;
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
  itemAssets?: Partial<Record<string, ComposerAssetId>>;
  itemMedia?: Partial<Record<string, ItemMediaOverride>>;
  panX?: number;
  panY?: number;
  allowFreeOverflow?: boolean;
  insetBadgeSize?: number;
  layoutOffsetX?: number;
  layoutOffsetY?: number;
  layoutMaxWidth?: number;
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
    transitionDuration: number;
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
  containerSurfaceIntensity?: Partial<Record<VisualTargetId, number>>;
  scopedColors?: ScopedColors;
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
  { id: "media-card-modern", label: "Media Card Modern", number: "14" },
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
  { id: "media-card-modern", label: "Media Card Modern" },
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

const editorialCardsTarget: VisualTarget = {
  id: "editorial-cards",
  label: "Editorial Cards",
};

export const visualTargetsByPage: Partial<
  Record<PreviewPagePath, readonly VisualTarget[]>
> = {
  "/": [
    headerLogoTarget,
    { id: "home-hero-media", label: "Home Hero Media" },
    { id: "home-hero-content", label: "Hero Content" },
    { id: "home-doctor-media", label: "Dr. Matute Media" },
    { id: "home-care-areas", label: "Service Card Media" },
    { id: "home-cta", label: "Primary CTA" },
    { id: "home-marquee", label: "Services Marquee" },
    editorialCardsTarget,
  ],
  "/about": [
    headerLogoTarget,
    { id: "about-content", label: "About Media" },
    editorialCardsTarget,
  ],
  "/about/dr-jonnathan-matute": [
    headerLogoTarget,
    { id: "about-doctor-media", label: "Dr. Matute Media" },
    editorialCardsTarget,
  ],
  "/services": [
    headerLogoTarget,
    { id: "services-care-cards", label: "Service Card Media" },
    { id: "services-treatment-media", label: "Treatment Media" },
    editorialCardsTarget,
  ],
  "/patients": [
    headerLogoTarget,
    { id: "patients-resource-cards", label: "Patient Resource Cards" },
  ],
  "/patients/first-visit": [headerLogoTarget, editorialCardsTarget],
  "/patients/financial-options": [headerLogoTarget, editorialCardsTarget],
  "/patients/insurance": [headerLogoTarget, editorialCardsTarget],
  "/patients/forms": [headerLogoTarget, editorialCardsTarget],
  "/about/team": [headerLogoTarget],
  "/technology": [
    headerLogoTarget,
    { id: "technology-media", label: "Technology Media" },
    editorialCardsTarget,
  ],
  "/contact": [
    headerLogoTarget,
    { id: "contact-media", label: "Contact Media" },
    editorialCardsTarget,
  ],
};

export const visualTargetSlots: Partial<Record<VisualTargetId, ComponentSlotId>> =
  {
    "header-logo": "header.logo",
    "home-hero-media": "home.hero",
    "home-hero-content": "home.heroContent",
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

export const SURFACE_INTENSITY_TARGETS = [
  "patients-resource-cards",
  "home-care-areas",
  "services-care-cards",
  "editorial-cards",
] as const;

export type SurfaceIntensityTargetId =
  (typeof SURFACE_INTENSITY_TARGETS)[number];

export function isSurfaceIntensityTarget(
  target: string | undefined,
): target is SurfaceIntensityTargetId {
  return Boolean(
    target &&
      (SURFACE_INTENSITY_TARGETS as readonly string[]).includes(target),
  );
}

export const SURFACE_LIGHTNESS_MIN = -0.3;
export const SURFACE_LIGHTNESS_MAX = 0.3;

export function surfaceLightnessKeepCssVar(target: SurfaceIntensityTargetId) {
  return `--exp-sl-keep-${target}`;
}

export function surfaceLightnessTowardCssVar(target: SurfaceIntensityTargetId) {
  return `--exp-sl-toward-${target}`;
}

function clampSurfaceLightness(value: number) {
  return (
    Math.round(
      Math.min(SURFACE_LIGHTNESS_MAX, Math.max(SURFACE_LIGHTNESS_MIN, value)) *
        100,
    ) / 100
  );
}

export const COMPONENT_SLOTS: ComponentSlotId[] = [
  "header.logo",
  "home.hero",
  "home.heroContent",
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
  "home-hero-content",
  "home-marquee",
  "patients-resource-cards",
  "editorial-cards",
];

export const LAYOUT_ONLY_TARGETS: readonly VisualTargetId[] = [
  "home-hero-content",
];

export function isLayoutOnlyTarget(
  target?: string,
): target is (typeof LAYOUT_ONLY_TARGETS)[number] {
  return Boolean(
    target && LAYOUT_ONLY_TARGETS.includes(target as (typeof LAYOUT_ONLY_TARGETS)[number]),
  );
}

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
  "rounded-portrait",
  "feature-card",
  "carousel-card",
  "media-card-modern",
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
  "media-card-modern": "media-card-modern",
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
  if (
    target === "header-logo" ||
    target === "home-marquee" ||
    target === "home-hero-content" ||
    target === "patients-resource-cards" ||
    target === "editorial-cards"
  ) {
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
  if (target === "header-logo" || target === "home-hero-content") {
    return [];
  }
  if (
    target === "home-cta" ||
    target === "home-marquee" ||
    target === "patients-resource-cards" ||
    target === "editorial-cards"
  ) {
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
    exclude.add("media-card-modern");
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

export function isMediaCardModernPreset(preset: ContainerPresetId) {
  return preset === "media-card-modern";
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

export function isSurfaceIntensityControlVisible(
  target: VisualTargetId,
  preset: ContainerPresetId,
) {
  return isSurfaceIntensityTarget(target) && !isInsetBadgeCutoutPreset(preset);
}

export function getContainerSurfaceIntensity(
  experience: ExperienceValues,
  target: VisualTargetId,
) {
  if (!isSurfaceIntensityTarget(target)) {
    return 0;
  }
  const value = experience.containerSurfaceIntensity?.[target];
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return 0;
  }
  if (value > SURFACE_LIGHTNESS_MAX) {
    return 0;
  }
  return clampSurfaceLightness(value);
}

export function updateContainerSurfaceIntensity(
  experience: ExperienceValues,
  target: VisualTargetId,
  value: number,
): ExperienceValues {
  if (!isSurfaceIntensityTarget(target)) {
    return experience;
  }
  const clamped = clampSurfaceLightness(value);
  const next: Partial<Record<VisualTargetId, number>> = {
    ...experience.containerSurfaceIntensity,
  };
  if (Math.abs(clamped) < 0.0005) {
    delete next[target];
  } else {
    next[target] = clamped;
  }
  return {
    ...experience,
    containerSurfaceIntensity: next,
  };
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

export const HERO_CONTENT_OFFSET_MIN = -120;
export const HERO_CONTENT_OFFSET_MAX = 120;
export const HERO_CONTENT_WIDTH_MIN = 20;
export const HERO_CONTENT_WIDTH_MAX = 42;
export const HERO_CONTENT_WIDTH_DEFAULT = 34;

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

function layoutSlot(): ComponentSlotConfig {
  return {
    ...defaultSlotConfig,
    layoutOffsetX: 0,
    layoutOffsetY: 0,
    layoutMaxWidth: HERO_CONTENT_WIDTH_DEFAULT,
  };
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
    "home.heroContent": layoutSlot(),
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
  "media-card-modern": "media-card-modern",
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
      transitionDuration: 780,
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
      "home.heroContent": {
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
        layoutOffsetX: 0,
        layoutOffsetY: 0,
        layoutMaxWidth: 34,
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
    type: "rotating",
    position: "bottom-left",
    overlap: 0.22,
  },
  rotatingBadge: {
    text: "FREE DENTAL EXAM & X-RAY",
    icon: "tooth",
    diameter: "medium",
    speed: "very-slow",
    direction: "left",
    surface: "secondary",
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
    transitionDuration: 2500,
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
  cursorCompanion: "subtle",
  containerSurfaceIntensity: {
    "patients-resource-cards": 0.05,
  },
  scopedColors: {
    pages: {
      "home": "#F1F0EF",
      "contact": "#F1F0EF",
    },
    sections: {
      "home/trust": "#F1F0EF",
      "home/careAreas": "#F1F0EF",
      "home/whyChoose": "#F1F0EF",
      "home/practice": "#F1F0EF",
      "about/intro": "#F1F0EE",
      "about/philosophy": "#F1F0EF",
      "about/independence": "#F1F0EF",
      "about/whyChoose": "#F1F0EF",
      "about/links": "#F1F0EF",
      "about/cta": "#F1F0EF",
      "doctor/intro": "#F1F0EE",
      "doctor/biography": "#F1F0EE",
      "doctor/education": "#F1F0EF",
      "doctor/cta": "#F1F0EF",
      "team/intro": "#F1F0EE",
      "team/members": "#F1F0EE",
      "services/intro": "#F1F0EE",
      "services/areas": "#F1F0EE",
      "services/treatments": "#F1F0EF",
      "services/cta": "#F1F0EF",
      "patients/resources": "#F1F0EE",
      "patients/cta": "#F1F0EF",
      "patients-first-visit/intro": "#F1F0EE",
      "patients-first-visit/details": "#F1F0EE",
      "patients-financial-options/intro": "#F1F0EE",
      "patients-financial-options/details": "#F1F0EF",
      "patients-insurance/intro": "#F1F0EE",
      "patients-insurance/details": "#F1F0EF",
      "patients-forms/intro": "#F1F0EE",
      "patients-forms/details": "#F1F0EF",
      "technology/intro": "#F1F0EE",
      "technology/details": "#F1F0EF",
      "technology/tools": "#F1F0EF",
      "technology/cta": "#F1F0EF",
      "contact/intro": "#F1F0EE",
      "contact/details": "#F1F0EE",
      "contact/form": "#F1F0EE",
    },
    elements: {
      "home-doctor-media": "#F1F0EF",
      "home-care-areas": "#F1F0EF",
      "editorial-cards": "#F1F0EF",
      "about-content": "#F1F0EF",
      "patients-resource-cards": "#F1F0EF",
    },
  },
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
    "home.heroContent": {
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
      layoutOffsetX: -12,
      layoutOffsetY: -34,
      layoutMaxWidth: 33,
    },
    "home.services": {
      containerPreset: "media-card-modern",
      mediaStyle: "media-card-modern",
      assetId: "default",
      fit: "cover",
      scale: 1,
      positionX: 50,
      positionY: 50,
      sizePreset: "standard",
      padding: "none",
      previewBackground: "auto",
      alignment: "left",
      itemAssets: {
        "preventive-general": "wcda-category-hero-preventive-general",
        "family-children": "/media/services/family-children/wcda-category-hero.png",
        "cosmetic": "/media/services/cosmetic/wcda-category-hero.png",
        "restorative": "/media/services/restorative/wcda-category-hero.png",
        "dental-implants": "/media/services/dental-implants/wcda-category-hero.png",
        "periodontal": "/media/services/periodontal/ChatGPT-Image-Sep-7-2026-04_33_29-PM.png",
      },
      itemMedia: {
        "preventive-general": {
          scale: 1,
          positionX: 50,
          positionY: 50,
          panX: -11.328020962801846,
          panY: -2.5648377158425073,
        },
        "family-children": {
          scale: 1,
          positionX: 50,
          positionY: 50,
          panX: -11.969225334398674,
          panY: -2.88543701171875,
        },
        "cosmetic": {
          scale: 1,
          positionX: 50,
          positionY: 50,
          panX: -12.18295819831617,
          panY: -1.9236304543235085,
        },
        "restorative": {
          scale: 1,
          positionX: 50,
          positionY: 50,
          panX: -13.037906993519178,
          panY: -1.603022488680753,
        },
        "dental-implants": {
          scale: 1,
          positionX: 50,
          positionY: 50,
          panX: -11.114270759351326,
          panY: -6.091481989080256,
        },
        "periodontal": {
          scale: 1,
          positionX: 50,
          positionY: 50,
          panX: -12.610429705995502,
          panY: -4.1678688742897725,
        },
      },
    },
    "home.doctor": {
      containerPreset: "inset-badge-cutout",
      mediaStyle: "clean",
      assetId: "wcda-drmatute",
      fit: "cover",
      scale: 1,
      positionX: 50,
      positionY: 50,
      sizePreset: "standard",
      padding: "none",
      previewBackground: "auto",
      alignment: "left",
      insetBadgeSize: 113,
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
      containerPreset: "carousel-card",
      mediaStyle: "carousel-media",
      assetId: "default",
      fit: "cover",
      scale: 1,
      positionX: 50,
      positionY: 50,
      sizePreset: "standard",
      padding: "none",
      previewBackground: "auto",
      alignment: "left",
      itemAssets: {
        "periodontal": "/media/services/periodontal/ChatGPT-Image-Sep-7-2026-04_33_29-PM.png",
        "clear-aligners": "/media/services/clear-aligners/ChatGPT Image Sep 7, 2026, 05_04_09 PM.png",
        "dental-implants": "/media/services/dental-implants/wcda-category-hero.png",
        "restorative": "/media/services/restorative/wcda-category-hero.png",
        "cosmetic": "/media/services/cosmetic/wcda-category-hero.png",
        "family-children": "/media/services/family-children/wcda-category-hero.png",
        "preventive-general": "wcda-category-hero-preventive-general",
      },
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
export const CAROUSEL_TRANSITION_DURATION_MIN = 300;
export const CAROUSEL_TRANSITION_DURATION_MAX = 3500;
export const CAROUSEL_TRANSITION_DURATION_DEFAULT = 780;
export const CAROUSEL_TRANSITION_DURATION_STEP = 50;

export function clampCarouselTransitionDuration(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return CAROUSEL_TRANSITION_DURATION_DEFAULT;
  }
  return Math.min(
    CAROUSEL_TRANSITION_DURATION_MAX,
    Math.max(CAROUSEL_TRANSITION_DURATION_MIN, Math.round(value)),
  );
}

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

export const MEDIA_PAN_MIN = -100;
export const MEDIA_PAN_MAX = 100;
/** Modest crop allowance so 3:2 in 3:2 at 100% zoom can still pan. */
export const MEDIA_SAFE_PAN_FLOOR = 24;

export function mediaPanLimit(scale: number, allowFreeOverflow?: boolean) {
  if (allowFreeOverflow) {
    return MEDIA_PAN_MAX;
  }
  const zoomSlack = Math.max(0, (scale - 1) * 50);
  return clampNumber(
    MEDIA_SAFE_PAN_FLOOR + zoomSlack,
    MEDIA_SAFE_PAN_FLOOR,
    MEDIA_PAN_MAX,
    MEDIA_SAFE_PAN_FLOOR,
  );
}

export function resolveMediaPan(
  config: Pick<ComponentSlotConfig, "scale" | "panX" | "panY" | "allowFreeOverflow">,
) {
  const allowFreeOverflow = Boolean(config.allowFreeOverflow);
  const limit = mediaPanLimit(config.scale, allowFreeOverflow);
  return {
    panX: clampNumber(config.panX, MEDIA_PAN_MIN, MEDIA_PAN_MAX, 0),
    panY: clampNumber(config.panY, MEDIA_PAN_MIN, MEDIA_PAN_MAX, 0),
    allowFreeOverflow,
    limit,
    renderPanX: clampNumber(config.panX, -limit, limit, 0),
    renderPanY: clampNumber(config.panY, -limit, limit, 0),
  };
}

function parseItemAssets(input: unknown): {
  itemAssets?: Partial<Record<string, ComposerAssetId>>;
} {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {};
  }
  const next: Partial<Record<string, ComposerAssetId>> = {};
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (!key || typeof value !== "string") {
      continue;
    }
    if (value === "placeholder") {
      next[key] = "placeholder";
      continue;
    }
    if (value === "default") {
      continue;
    }
    if (isRegisteredAssetId(value)) {
      next[key] = value;
    }
  }
  return Object.keys(next).length > 0 ? { itemAssets: next } : {};
}

function parseItemMedia(input: unknown): {
  itemMedia?: Partial<Record<string, ItemMediaOverride>>;
} {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {};
  }
  const next: Partial<Record<string, ItemMediaOverride>> = {};
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (!key || !value || typeof value !== "object" || Array.isArray(value)) {
      continue;
    }
    const record = value as Record<string, unknown>;
    next[key] = {
      scale: clampNumber(record.scale, 0.5, 2, 1),
      positionX: clampNumber(record.positionX, 0, 100, 50),
      positionY: clampNumber(record.positionY, 0, 100, 50),
      panX: clampNumber(record.panX, MEDIA_PAN_MIN, MEDIA_PAN_MAX, 0),
      panY: clampNumber(record.panY, MEDIA_PAN_MIN, MEDIA_PAN_MAX, 0),
      ...(record.allowFreeOverflow === true
        ? { allowFreeOverflow: true }
        : {}),
    };
  }
  return Object.keys(next).length > 0 ? { itemMedia: next } : {};
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
    ...parseItemAssets(record.itemAssets),
    ...parseItemMedia(record.itemMedia),
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
    ...(slot === "home.heroContent"
      ? {
          layoutOffsetX: clampNumber(
            record.layoutOffsetX,
            HERO_CONTENT_OFFSET_MIN,
            HERO_CONTENT_OFFSET_MAX,
            fallback.layoutOffsetX ?? 0,
          ),
          layoutOffsetY: clampNumber(
            record.layoutOffsetY,
            HERO_CONTENT_OFFSET_MIN,
            HERO_CONTENT_OFFSET_MAX,
            fallback.layoutOffsetY ?? 0,
          ),
          layoutMaxWidth: clampNumber(
            record.layoutMaxWidth,
            HERO_CONTENT_WIDTH_MIN,
            HERO_CONTENT_WIDTH_MAX,
            fallback.layoutMaxWidth ?? HERO_CONTENT_WIDTH_DEFAULT,
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

function parseContainerSurfaceIntensity(
  input: unknown,
): Partial<Record<VisualTargetId, number>> {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {};
  }
  const record = input as Record<string, unknown>;
  const next: Partial<Record<VisualTargetId, number>> = {};
  for (const target of SURFACE_INTENSITY_TARGETS) {
    if (!(target in record)) {
      continue;
    }
    if (typeof record[target] !== "number" || !Number.isFinite(record[target])) {
      continue;
    }
    if (record[target] > SURFACE_LIGHTNESS_MAX) {
      continue;
    }
    const value = clampSurfaceLightness(record[target]);
    if (Math.abs(value) > 0.0005) {
      next[target] = value;
    }
  }
  return next;
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
      transitionDuration: clampCarouselTransitionDuration(
        carouselInput.transitionDuration,
      ),
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
    containerSurfaceIntensity: parseContainerSurfaceIntensity(
      record.containerSurfaceIntensity,
    ),
    scopedColors: parseScopedColors(record.scopedColors),
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

function formatSurfaceIntensitySource(
  map: Partial<Record<VisualTargetId, number>> | undefined,
) {
  const entries = SURFACE_INTENSITY_TARGETS.filter((target) => {
    const value = map?.[target];
    return typeof value === "number" && Math.abs(value) > 0.0005;
  }).map((target) => {
    const value = map?.[target] ?? 0;
    return `    ${JSON.stringify(target)}: ${formatLiteral(value)},`;
  });
  if (entries.length === 0) {
    return [];
  }
  return [
    "  containerSurfaceIntensity: {",
    ...entries,
    "  },",
  ];
}

function formatScopedColorsSource(map: ScopedColors | undefined) {
  if (!map) {
    return [];
  }
  const pages = Object.entries(map.pages ?? {}).filter(
    (entry): entry is [string, string] => typeof entry[1] === "string",
  );
  const sections = Object.entries(map.sections ?? {}).filter(
    (entry): entry is [string, string] => typeof entry[1] === "string",
  );
  const elements = Object.entries(map.elements ?? {}).filter(
    (entry): entry is [string, string] => typeof entry[1] === "string",
  );
  if (pages.length === 0 && sections.length === 0 && elements.length === 0) {
    return [];
  }
  const block = (label: string, entries: Array<[string, string]>) =>
    entries.length === 0
      ? []
      : [
          `    ${label}: {`,
          ...entries.map(
            ([key, value]) => `      ${JSON.stringify(key)}: ${formatLiteral(value)},`,
          ),
          "    },",
        ];
  return [
    "  scopedColors: {",
    ...block("pages", pages),
    ...block("sections", sections),
    ...block("elements", elements),
    "  },",
  ];
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
      ...(item.itemAssets && Object.keys(item.itemAssets).length > 0
        ? [
            `      itemAssets: {`,
            ...Object.entries(item.itemAssets)
              .filter((entry): entry is [string, string] => Boolean(entry[1]))
              .map(
                ([key, value]) =>
                  `        ${JSON.stringify(key)}: ${formatLiteral(value)},`,
              ),
            `      },`,
          ]
        : []),
      ...(item.itemMedia && Object.keys(item.itemMedia).length > 0
        ? [
            `      itemMedia: {`,
            ...Object.entries(item.itemMedia)
              .filter((entry): entry is [string, ItemMediaOverride] =>
                Boolean(entry[1]),
              )
              .flatMap(([key, value]) => [
                `        ${JSON.stringify(key)}: {`,
                `          scale: ${formatLiteral(value.scale)},`,
                `          positionX: ${formatLiteral(value.positionX)},`,
                `          positionY: ${formatLiteral(value.positionY)},`,
                ...(value.panX
                  ? [`          panX: ${formatLiteral(value.panX)},`]
                  : []),
                ...(value.panY
                  ? [`          panY: ${formatLiteral(value.panY)},`]
                  : []),
                ...(value.allowFreeOverflow
                  ? [`          allowFreeOverflow: true,`]
                  : []),
                `        },`,
              ]),
            `      },`,
          ]
        : []),
      ...(item.insetBadgeSize != null
        ? [`      insetBadgeSize: ${formatLiteral(item.insetBadgeSize)},`]
        : []),
      ...(item.layoutOffsetX != null
        ? [`      layoutOffsetX: ${formatLiteral(item.layoutOffsetX)},`]
        : []),
      ...(item.layoutOffsetY != null
        ? [`      layoutOffsetY: ${formatLiteral(item.layoutOffsetY)},`]
        : []),
      ...(item.layoutMaxWidth != null
        ? [`      layoutMaxWidth: ${formatLiteral(item.layoutMaxWidth)},`]
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
    `    transitionDuration: ${formatLiteral(value.carousel.transitionDuration)},`,
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
    ...formatSurfaceIntensitySource(value.containerSurfaceIntensity),
    ...formatScopedColorsSource(value.scopedColors),
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

export function slotForTarget(target: VisualTargetId): ComponentSlotId | undefined {
  return visualTargetSlots[target];
}

export function getComponentConfig(
  experience: ExperienceValues,
  target?: VisualTargetId,
) {
  if (!target) {
    return defaultSlotConfig;
  }
  const slot = visualTargetSlots[target];
  if (!slot) {
    return defaultSlotConfig;
  }
  return experience.components[slot] ?? defaultSlotConfig;
}

export function updateComponentConfig(
  experience: ExperienceValues,
  target: VisualTargetId,
  patch: Partial<ComponentSlotConfig>,
): ExperienceValues {
  const slot = visualTargetSlots[target];
  if (!slot) {
    return experience;
  }
  const current = experience.components[slot] ?? defaultSlotConfig;
  const next = { ...current, ...patch };
  if (patch.itemAssets === undefined && !("itemAssets" in patch)) {
    /* keep current itemAssets */
  }
  if (patch.itemAssets && Object.keys(patch.itemAssets).length === 0) {
    delete next.itemAssets;
  }
  if (patch.itemMedia === undefined && !("itemMedia" in patch)) {
    /* keep current itemMedia */
  }
  if (patch.itemMedia && Object.keys(patch.itemMedia).length === 0) {
    delete next.itemMedia;
  }
  return {
    ...experience,
    ...(isLayoutOnlyTarget(target) ? {} : { containerPreset: next.containerPreset }),
    components: {
      ...experience.components,
      [slot]: next,
    },
  };
}

export function resolveSlotAssetId(
  config: ComponentSlotConfig,
  itemKey?: string,
): ComposerAssetId {
  if (itemKey) {
    const item = config.itemAssets?.[itemKey];
    if (item) {
      return item;
    }
  }
  return config.assetId;
}

export function updateItemAsset(
  experience: ExperienceValues,
  target: VisualTargetId,
  itemKey: string,
  assetId: ComposerAssetId,
): ExperienceValues {
  const current = getComponentConfig(experience, target);
  const itemAssets = { ...(current.itemAssets ?? {}) };
  if (assetId === "default") {
    delete itemAssets[itemKey];
  } else {
    itemAssets[itemKey] = assetId;
  }
  return updateComponentConfig(experience, target, {
    itemAssets: Object.keys(itemAssets).length > 0 ? itemAssets : undefined,
  });
}

export function isPerItemMediaTarget(
  target?: string,
): target is "home-care-areas" | "services-care-cards" {
  return target === "home-care-areas" || target === "services-care-cards";
}

export function isPerItemMediaSlot(slot: ComponentSlotId) {
  return slot === "home.services" || slot === "services.cards";
}

export function resolveItemMedia(
  config: ComponentSlotConfig,
  itemKey?: string,
): ComponentSlotConfig {
  if (!itemKey) {
    return config;
  }
  const override = config.itemMedia?.[itemKey];
  if (!override) {
    return config;
  }
  return {
    ...config,
    scale: override.scale,
    positionX: override.positionX,
    positionY: override.positionY,
    panX: override.panX ?? 0,
    panY: override.panY ?? 0,
    allowFreeOverflow: Boolean(override.allowFreeOverflow),
  };
}

export function updateItemMedia(
  experience: ExperienceValues,
  target: VisualTargetId,
  itemKey: string,
  patch: Partial<ItemMediaOverride>,
): ExperienceValues {
  const current = getComponentConfig(experience, target);
  const existing = current.itemMedia?.[itemKey];
  const nextValue: ItemMediaOverride = {
    scale: clampNumber(
      patch.scale ?? existing?.scale ?? current.scale,
      0.5,
      2,
      current.scale,
    ),
    positionX: clampNumber(
      patch.positionX ?? existing?.positionX ?? current.positionX,
      0,
      100,
      current.positionX,
    ),
    positionY: clampNumber(
      patch.positionY ?? existing?.positionY ?? current.positionY,
      0,
      100,
      current.positionY,
    ),
    panX: clampNumber(
      patch.panX ?? existing?.panX ?? current.panX ?? 0,
      MEDIA_PAN_MIN,
      MEDIA_PAN_MAX,
      0,
    ),
    panY: clampNumber(
      patch.panY ?? existing?.panY ?? current.panY ?? 0,
      MEDIA_PAN_MIN,
      MEDIA_PAN_MAX,
      0,
    ),
    allowFreeOverflow: Boolean(
      patch.allowFreeOverflow ??
        existing?.allowFreeOverflow ??
        current.allowFreeOverflow,
    ),
  };
  const itemMedia = { ...(current.itemMedia ?? {}) };
  const matchesSlot =
    nextValue.scale === current.scale &&
    nextValue.positionX === current.positionX &&
    nextValue.positionY === current.positionY &&
    (nextValue.panX ?? 0) === 0 &&
    (nextValue.panY ?? 0) === 0 &&
    !nextValue.allowFreeOverflow;
  if (matchesSlot) {
    delete itemMedia[itemKey];
  } else {
    itemMedia[itemKey] = nextValue;
  }
  return updateComponentConfig(experience, target, {
    itemMedia: Object.keys(itemMedia).length > 0 ? itemMedia : undefined,
  });
}

export function experienceToCssVars(experience: ExperienceValues) {
  const intensityVars = Object.fromEntries(
    SURFACE_INTENSITY_TARGETS.flatMap((target) => {
      const value = getContainerSurfaceIntensity(experience, target);
      const keep = `${100 - Math.round(Math.abs(value) * 100)}%`;
      const toward = value < 0 ? "#5C4E43" : "#F2EDE8";
      return [
        [surfaceLightnessKeepCssVar(target), keep],
        [surfaceLightnessTowardCssVar(target), toward],
      ];
    }),
  );

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
    ...intensityVars,
  };
}

export function composerCssVars(config: ComponentSlotConfig) {
  const pan = resolveMediaPan(config);
  return {
    ["--exp-media-fit" as string]: config.fit,
    ["--exp-media-scale" as string]: String(config.scale),
    ["--exp-media-x" as string]: `${config.positionX}%`,
    ["--exp-media-y" as string]: `${config.positionY}%`,
    ["--exp-media-pan-x" as string]: String(pan.renderPanX),
    ["--exp-media-pan-y" as string]: String(pan.renderPanY),
    ["--exp-media-pad" as string]: MEDIA_PADDING_CSS[config.padding],
    ["--exp-logo-scale" as string]: String(config.scale),
    ["--exp-logo-x" as string]: `${config.positionX}%`,
    ["--exp-logo-y" as string]: `${config.positionY}%`,
    ["--exp-logo-padding" as string]: LOGO_PADDING_CSS[config.padding],
    ["--exp-logo-width" as string]: LOGO_WIDTH_CSS[config.sizePreset],
    ["--exp-logo-fit" as string]: config.fit,
  };
}

export function heroContentLayout(config: ComponentSlotConfig) {
  return {
    offsetX: clampNumber(
      config.layoutOffsetX,
      HERO_CONTENT_OFFSET_MIN,
      HERO_CONTENT_OFFSET_MAX,
      0,
    ),
    offsetY: clampNumber(
      config.layoutOffsetY,
      HERO_CONTENT_OFFSET_MIN,
      HERO_CONTENT_OFFSET_MAX,
      0,
    ),
    maxWidth: clampNumber(
      config.layoutMaxWidth,
      HERO_CONTENT_WIDTH_MIN,
      HERO_CONTENT_WIDTH_MAX,
      HERO_CONTENT_WIDTH_DEFAULT,
    ),
  };
}

export function heroContentCssVars(config: ComponentSlotConfig) {
  const layout = heroContentLayout(config);
  return {
    ["--hero-content-offset-x" as string]: `${layout.offsetX}px`,
    ["--hero-content-offset-y" as string]: `${layout.offsetY}px`,
    ["--hero-content-max-width" as string]: `${layout.maxWidth}rem`,
  };
}

export function isMotionTarget(target?: string) {
  return Boolean(
      target &&
      visualTargetSlots[target as VisualTargetId] &&
      !MOTION_UNSUPPORTED_TARGETS.includes(target as VisualTargetId),
  );
}

export function approvedExperienceStyleText(experience: ExperienceValues) {
  const vars = experienceToCssVars(experience);
  const declarations = Object.entries(vars)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
  const elementFills = scopedElementFillCss(experience.scopedColors);
  return `html {\n${declarations}\n}${elementFills ? `\n${elementFills}` : ""}`;
}

export function approvedExperienceHtmlAttributes(experience: ExperienceValues) {
  return {
    "data-exp-motion": experience.motion.entrance,
    "data-exp-overlay": experience.media.overlay,
  };
}

function applyLayoutToNode(node: HTMLElement, config: ComponentSlotConfig) {
  const vars = heroContentCssVars(config);
  for (const [name, value] of Object.entries(vars)) {
    node.style.setProperty(name, value);
  }
}

function clearLayoutFromNode(node: HTMLElement) {
  node.style.removeProperty("--hero-content-offset-x");
  node.style.removeProperty("--hero-content-offset-y");
  node.style.removeProperty("--hero-content-max-width");
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
  node.dataset.expX = String(config.positionX);
  node.dataset.expY = String(config.positionY);
  node.dataset.expScale = String(config.scale);
  const pan = resolveMediaPan(config);
  node.dataset.expPanX = String(pan.panX);
  node.dataset.expPanY = String(pan.panY);
  node.dataset.expPanFree = pan.allowFreeOverflow ? "1" : "0";
}

function clearComposerFromNode(node: HTMLElement) {
  node.style.removeProperty("--exp-media-fit");
  node.style.removeProperty("--exp-media-scale");
  node.style.removeProperty("--exp-media-x");
  node.style.removeProperty("--exp-media-y");
  node.style.removeProperty("--exp-media-pan-x");
  node.style.removeProperty("--exp-media-pan-y");
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
  delete node.dataset.expX;
  delete node.dataset.expY;
  delete node.dataset.expScale;
  delete node.dataset.expPanX;
  delete node.dataset.expPanY;
  delete node.dataset.expPanFree;
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

  for (const target of SURFACE_INTENSITY_TARGETS) {
    element.style.removeProperty(`--exp-si-${target}`);
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
    if (target && isLayoutOnlyTarget(target)) {
      applyLayoutToNode(node, getComponentConfig(experience, target));
    } else if (target && visualTargetSlots[target]) {
      applyComposerToNode(
        node,
        resolveItemMedia(getComponentConfig(experience, target), node.dataset.labItemId),
      );
    } else if (isSurfaceIntensityTarget(target)) {
      // Intensity-only card families keep React-owned attributes.
    } else if (active) {
      node.dataset.containerPreset = experience.containerPreset;
    } else {
      clearComposerFromNode(node);
    }
  });
  applyScopedElementFills(experience.scopedColors);
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
      clearLayoutFromNode(node);
    }
  });
  clearScopedElementFills();
}

export function targetsForPage(path: string) {
  if (path.startsWith("/services/")) {
    return visualTargetsByPage["/services"] ?? [];
  }
  return visualTargetsByPage[path as PreviewPagePath] ?? [];
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
