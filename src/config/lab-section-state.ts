import {
  COMPONENT_SLOTS,
  isPerItemMediaSlot,
  isSurfaceIntensityTarget,
  parseExperienceValues,
  pickExperienceValues,
  slotForTarget,
  applyEditorialIconItem,
  type ComponentSlotConfig,
  type ExperienceValues,
  type VisualTargetId,
} from "@/config/experience";
import {
  parseThemeValues,
  pickThemeValues,
  type ThemeValues,
} from "@/config/theme";
import { labControlScope, type LabSectionId } from "@/config/lab-ui";
import {
  copyElementScopedColor,
  elementScopedColorKey,
} from "@/config/scoped-colors";

export const CUSTOM_STAGED_STORAGE_KEY = "wcda-lab-custom-staged-v1";

export type LabStagedSectionId = Exclude<
  LabSectionId,
  "recovery" | "content" | "approval" | "position" | "tools"
>;

export type LabSectionStatus = "no-changes" | "unsaved" | "applied-to-custom";

export const labStagedSections: LabStagedSectionId[] = [
  "brand",
  "colors",
  "typography",
  "surfaces",
  "header",
  "footer",
  "media",
  "containers",
  "motion",
  "effects",
];

const BRAND_KEYS = [
  "radius",
  "shadowIntensity",
  "cardDensity",
  "sectionSpacing",
  "contentWidth",
  "headerDensity",
] as const;

const COLOR_KEYS = [
  "primary",
  "secondary",
  "accent",
  "background",
  "surface",
  "surfaceMuted",
  "surfaceStrong",
  "foreground",
  "muted",
  "border",
] as const;

const COLOR_OPTIONAL_KEYS = [
  "cta",
  "ctaHover",
  "ctaActive",
  "navHover",
  "navHalo",
  "navHaloActive",
] as const;

const TYPE_KEYS = [
  "headingFont",
  "bodyFont",
  "headingScale",
  "bodyScale",
] as const;

const MEDIA_SLOT_KEYS = [
  "assetId",
  "fit",
  "scale",
  "positionX",
  "positionY",
  "sizePreset",
  "padding",
  "previewBackground",
  "alignment",
] as const satisfies ReadonlyArray<keyof ComponentSlotConfig>;

const CONTAINER_SLOT_KEYS = [
  "containerPreset",
  "mediaStyle",
  "insetBadgeSize",
] as const satisfies ReadonlyArray<keyof ComponentSlotConfig>;

const LAYOUT_SLOT_KEYS = [
  "layoutOffsetX",
  "layoutOffsetY",
  "layoutMaxWidth",
] as const satisfies ReadonlyArray<keyof ComponentSlotConfig>;

const ELEMENT_SLOT_KEYS = [
  ...MEDIA_SLOT_KEYS,
  ...CONTAINER_SLOT_KEYS,
  ...LAYOUT_SLOT_KEYS,
] as const;

const EFFECT_KEYS = [
  "marquee",
  "floatingBadge",
  "rotatingBadge",
  "video",
  "carousel",
  "cornerAction",
  "beforeAfter",
  "cursorCompanion",
] as const satisfies ReadonlyArray<keyof ExperienceValues>;

function copyOneSlot(
  target: ExperienceValues,
  source: ExperienceValues,
  slot: NonNullable<ReturnType<typeof slotForTarget>>,
) {
  const components = { ...target.components };
  const from = source.components[slot];
  const to = components[slot];
  const next: ComponentSlotConfig = { ...to };
  for (const key of ELEMENT_SLOT_KEYS) {
    const value = from[key];
    if (value === undefined) {
      delete next[key];
    } else {
      (next as Record<string, unknown>)[key as string] = value;
    }
  }
  components[slot] = next;
  return components;
}

function elementEffectPatch(
  target: VisualTargetId,
  targetExperience: ExperienceValues,
  sourceExperience: ExperienceValues,
  itemKey?: string,
): Partial<ExperienceValues> {
  const scope = labControlScope(target);
  const extra: Partial<ExperienceValues> = {};
  if (!itemKey || scope.carouselMotion) {
    if (scope.marquee) extra.marquee = sourceExperience.marquee;
    if (scope.carouselMotion) extra.carousel = sourceExperience.carousel;
  }
  if (scope.editorialIcons && itemKey) {
    extra.editorialIcons = applyEditorialIconItem(
      targetExperience.editorialIcons,
      sourceExperience.editorialIcons,
      itemKey,
    );
  }
  return extra;
}

export function applyCursorCompanion(
  targetExperience: ExperienceValues,
  sourceExperience: ExperienceValues,
) {
  return pickExperienceValues({
    ...targetExperience,
    cursorCompanion: sourceExperience.cursorCompanion,
  });
}

export function cursorCompanionEqual(
  left: ExperienceValues,
  right: ExperienceValues,
) {
  return left.cursorCompanion === right.cursorCompanion;
}

function copyItemAsset(
  target: ExperienceValues,
  source: ExperienceValues,
  slot: NonNullable<ReturnType<typeof slotForTarget>>,
  itemKey: string,
) {
  const components = { ...target.components };
  const next: ComponentSlotConfig = { ...components[slot] };
  const items = { ...(next.itemAssets ?? {}) };
  const value = source.components[slot]?.itemAssets?.[itemKey];
  if (!value || value === "default") {
    delete items[itemKey];
  } else {
    items[itemKey] = value;
  }
  if (Object.keys(items).length > 0) {
    next.itemAssets = items;
  } else {
    delete next.itemAssets;
  }
  if (isPerItemMediaSlot(slot)) {
    const mediaItems = { ...(next.itemMedia ?? {}) };
    const mediaValue = source.components[slot]?.itemMedia?.[itemKey];
    if (!mediaValue) {
      delete mediaItems[itemKey];
    } else {
      mediaItems[itemKey] = { ...mediaValue };
    }
    if (Object.keys(mediaItems).length > 0) {
      next.itemMedia = mediaItems;
    } else {
      delete next.itemMedia;
    }
    components[slot] = next;
    return components;
  }
  for (const key of MEDIA_SLOT_KEYS) {
    if (key === "assetId") {
      continue;
    }
    const mediaValue = source.components[slot]?.[key];
    if (mediaValue === undefined) {
      delete next[key];
    } else {
      (next as Record<string, unknown>)[key as string] = mediaValue;
    }
  }
  components[slot] = next;
  return components;
}

export function applyElementSlice(
  target: VisualTargetId,
  targetExperience: ExperienceValues,
  sourceExperience: ExperienceValues,
  itemKey?: string,
): ExperienceValues {
  const slot = slotForTarget(target);
  const components = slot
    ? itemKey
      ? copyItemAsset(targetExperience, sourceExperience, slot, itemKey)
      : copyOneSlot(targetExperience, sourceExperience, slot)
    : targetExperience.components;
  const intensity = { ...(targetExperience.containerSurfaceIntensity ?? {}) };
  if (isSurfaceIntensityTarget(target) && !itemKey) {
    const value = sourceExperience.containerSurfaceIntensity?.[target];
    if (value === undefined) {
      delete intensity[target];
    } else {
      intensity[target] = value;
    }
  }
  return pickExperienceValues({
    ...targetExperience,
    components,
    containerSurfaceIntensity: intensity,
    scopedColors: copyElementScopedColor(
      elementScopedColorKey(target, itemKey),
      targetExperience.scopedColors,
      sourceExperience.scopedColors,
    ),
    ...elementEffectPatch(target, targetExperience, sourceExperience, itemKey),
  });
}

export function promoteElementExperience(
  target: VisualTargetId,
  currentExperience: ExperienceValues,
  customExperience: ExperienceValues,
  itemKey?: string,
): ExperienceValues {
  return applyElementSlice(
    target,
    currentExperience,
    customExperience,
    itemKey,
  );
}

export function promoteElementEqual(
  target: VisualTargetId,
  left: ExperienceValues,
  right: ExperienceValues,
  itemKey?: string,
) {
  const a = promoteElementExperience(target, left, left, itemKey);
  const b = promoteElementExperience(target, left, right, itemKey);
  return stable(a) === stable(b);
}

export function elementSliceEqual(
  target: VisualTargetId,
  left: ExperienceValues,
  right: ExperienceValues,
  itemKey?: string,
) {
  const a = applyElementSlice(target, left, left, itemKey);
  const b = applyElementSlice(target, left, right, itemKey);
  return stable(a) === stable(b);
}

function stable(value: unknown) {
  return JSON.stringify(value);
}

function copyThemeKeys(
  target: ThemeValues,
  source: ThemeValues,
  keys: readonly (keyof ThemeValues)[],
) {
  const next: ThemeValues = { ...target };
  for (const key of keys) {
    const value = source[key];
    if (value === undefined) {
      delete next[key];
    } else {
      (next as Record<string, unknown>)[key as string] = value;
    }
  }
  return pickThemeValues(next);
}

function themeKeySlice(
  theme: ThemeValues,
  keys: readonly (keyof ThemeValues)[],
) {
  const slice: Record<string, unknown> = {};
  for (const key of keys) {
    slice[key] = theme[key];
  }
  return slice;
}

function mergeSlotFields(
  target: ExperienceValues,
  source: ExperienceValues,
  keys: readonly (keyof ComponentSlotConfig)[],
) {
  const components = { ...target.components };
  for (const slot of COMPONENT_SLOTS) {
    const from = source.components[slot];
    const to = components[slot];
    const next: ComponentSlotConfig = { ...to };
    for (const key of keys) {
      const value = from[key];
      if (value === undefined) {
        delete next[key];
      } else {
        (next as Record<string, unknown>)[key as string] = value;
      }
    }
    components[slot] = next;
  }
  return components;
}

function slotSlice(
  experience: ExperienceValues,
  keys: readonly (keyof ComponentSlotConfig)[],
) {
  return COMPONENT_SLOTS.map((slot) => {
    const item = experience.components[slot];
    const slice: Record<string, unknown> = {};
    for (const key of keys) {
      slice[key] = item[key];
    }
    return slice;
  });
}

export function isLabStagedSection(
  section: LabSectionId,
): section is LabStagedSectionId {
  return (
    section !== "recovery" &&
    section !== "content" &&
    section !== "approval" &&
    section !== "position" &&
    section !== "tools"
  );
}

export function applyLabSectionSlice(
  section: LabStagedSectionId,
  targetTheme: ThemeValues,
  targetExperience: ExperienceValues,
  sourceTheme: ThemeValues,
  sourceExperience: ExperienceValues,
): { theme: ThemeValues; experience: ExperienceValues } {
  if (section === "brand") {
    return {
      theme: copyThemeKeys(targetTheme, sourceTheme, BRAND_KEYS),
      experience: pickExperienceValues(targetExperience),
    };
  }
  if (section === "colors") {
    return {
      theme: copyThemeKeys(targetTheme, sourceTheme, [
        ...COLOR_KEYS,
        ...COLOR_OPTIONAL_KEYS,
      ]),
      experience: pickExperienceValues(targetExperience),
    };
  }
  if (section === "typography") {
    return {
      theme: copyThemeKeys(targetTheme, sourceTheme, TYPE_KEYS),
      experience: pickExperienceValues(targetExperience),
    };
  }
  if (section === "surfaces") {
    return {
      theme: copyThemeKeys(targetTheme, sourceTheme, ["pageBackground"]),
      experience: pickExperienceValues(targetExperience),
    };
  }
  if (section === "header") {
    return {
      theme: copyThemeKeys(targetTheme, sourceTheme, ["headerBackground"]),
      experience: applyElementSlice(
        "header-logo",
        targetExperience,
        sourceExperience,
      ),
    };
  }
  if (section === "footer") {
    return {
      theme: copyThemeKeys(targetTheme, sourceTheme, ["footerBackground"]),
      experience: pickExperienceValues(targetExperience),
    };
  }
  if (section === "media") {
    return {
      theme: pickThemeValues(targetTheme),
      experience: pickExperienceValues({
        ...targetExperience,
        media: sourceExperience.media,
        components: mergeSlotFields(
          targetExperience,
          sourceExperience,
          MEDIA_SLOT_KEYS,
        ),
      }),
    };
  }
  if (section === "containers") {
    return {
      theme: pickThemeValues(targetTheme),
      experience: pickExperienceValues({
        ...targetExperience,
        containerPreset: sourceExperience.containerPreset,
        containerSurfaceIntensity: sourceExperience.containerSurfaceIntensity,
        components: mergeSlotFields(
          targetExperience,
          sourceExperience,
          CONTAINER_SLOT_KEYS,
        ),
      }),
    };
  }
  if (section === "motion") {
    return {
      theme: pickThemeValues(targetTheme),
      experience: pickExperienceValues({
        ...targetExperience,
        motion: sourceExperience.motion,
      }),
    };
  }
  return {
    theme: pickThemeValues(targetTheme),
    experience: pickExperienceValues({
      ...targetExperience,
      floatingBadge: sourceExperience.floatingBadge,
      rotatingBadge: sourceExperience.rotatingBadge,
      video: sourceExperience.video,
      carousel: sourceExperience.carousel,
      cornerAction: sourceExperience.cornerAction,
      beforeAfter: sourceExperience.beforeAfter,
      cursorCompanion: sourceExperience.cursorCompanion,
    }),
  };
}

export function labSectionSliceEqual(
  section: LabStagedSectionId,
  leftTheme: ThemeValues,
  leftExperience: ExperienceValues,
  rightTheme: ThemeValues,
  rightExperience: ExperienceValues,
) {
  const left = pickThemeValues(leftTheme);
  const right = pickThemeValues(rightTheme);
  const leftExp = pickExperienceValues(leftExperience);
  const rightExp = pickExperienceValues(rightExperience);

  if (section === "brand") {
    return stable(themeKeySlice(left, BRAND_KEYS)) === stable(themeKeySlice(right, BRAND_KEYS));
  }
  if (section === "colors") {
    return (
      stable(themeKeySlice(left, [...COLOR_KEYS, ...COLOR_OPTIONAL_KEYS])) ===
      stable(themeKeySlice(right, [...COLOR_KEYS, ...COLOR_OPTIONAL_KEYS]))
    );
  }
  if (section === "typography") {
    return stable(themeKeySlice(left, TYPE_KEYS)) === stable(themeKeySlice(right, TYPE_KEYS));
  }
  if (section === "surfaces") {
    return (
      stable(themeKeySlice(left, ["pageBackground"])) ===
      stable(themeKeySlice(right, ["pageBackground"]))
    );
  }
  if (section === "header") {
    return (
      stable(themeKeySlice(left, ["headerBackground"])) ===
        stable(themeKeySlice(right, ["headerBackground"])) &&
      elementSliceEqual("header-logo", leftExp, rightExp)
    );
  }
  if (section === "footer") {
    return (
      stable(themeKeySlice(left, ["footerBackground"])) ===
      stable(themeKeySlice(right, ["footerBackground"]))
    );
  }
  if (section === "media") {
    return (
      stable(leftExp.media) === stable(rightExp.media) &&
      stable(slotSlice(leftExp, MEDIA_SLOT_KEYS)) ===
        stable(slotSlice(rightExp, MEDIA_SLOT_KEYS))
    );
  }
  if (section === "containers") {
    return (
      leftExp.containerPreset === rightExp.containerPreset &&
      stable(leftExp.containerSurfaceIntensity ?? {}) ===
        stable(rightExp.containerSurfaceIntensity ?? {}) &&
      stable(slotSlice(leftExp, CONTAINER_SLOT_KEYS)) ===
        stable(slotSlice(rightExp, CONTAINER_SLOT_KEYS))
    );
  }
  if (section === "motion") {
    return stable(leftExp.motion) === stable(rightExp.motion);
  }
  return EFFECT_KEYS.filter((key) => key !== "marquee").every(
    (key) => stable(leftExp[key]) === stable(rightExp[key]),
  );
}

export function labSectionStatus(
  section: LabStagedSectionId,
  liveTheme: ThemeValues,
  liveExperience: ExperienceValues,
  customTheme: ThemeValues,
  customExperience: ExperienceValues,
  currentTheme: ThemeValues,
  currentExperience: ExperienceValues,
): LabSectionStatus {
  if (
    !labSectionSliceEqual(
      section,
      liveTheme,
      liveExperience,
      customTheme,
      customExperience,
    )
  ) {
    return "unsaved";
  }
  if (
    !labSectionSliceEqual(
      section,
      customTheme,
      customExperience,
      currentTheme,
      currentExperience,
    )
  ) {
    return "applied-to-custom";
  }
  return "no-changes";
}

export function parseCustomStaged(raw: string | null): {
  theme: ThemeValues;
  experience: ExperienceValues;
} | null {
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as {
      theme?: unknown;
      experience?: unknown;
    };
    const theme = parseThemeValues(parsed.theme);
    const experience = parseExperienceValues(parsed.experience);
    if (!theme || !experience) {
      return null;
    }
    return { theme, experience };
  } catch {
    return null;
  }
}
