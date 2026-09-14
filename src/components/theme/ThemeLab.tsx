"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  EXPERIENCE_LAB_STORAGE_KEY,
  approvedExperience,
  experienceValuesEqual,
  parseExperienceValues,
  pickExperienceValues,
  updateComponentConfig,
  updateItemAsset,
  updateItemMedia,
  isPerItemMediaTarget,
  wcdaFactoryExperience,
  type ExperienceValues,
  type VisualTargetId,
} from "@/config/experience";
import {
  LAB_LANGUAGE_STORAGE_KEY,
  detectLabSource,
  labCopy,
  labSources,
  parseLabLanguage,
  wcdaInspiredTheme,
  type LabCopy,
  type LabLanguage,
  type LabSectionId,
  type LabSourceId,
} from "@/config/lab-ui";
import {
  labControls,
  labPageLabels,
  labText,
  type LabControlId,
} from "@/config/lab-guide";
import {
  THEME_LAB_MEDIA_PAN,
  THEME_LAB_MESSAGE,
  THEME_LAB_READY,
  THEME_LAB_SELECT,
  THEME_LAB_STORAGE_KEY,
  VISUAL_APPLY_PATH,
  approvedTheme,
  approvedThemeVersion,
  chromeHexFromWarmth,
  createPreviewSrc,
  defaultLabPreset,
  fontLabels,
  isHexColor,
  normalizeThemePresetId,
  parseThemeValues,
  pickThemeValues,
  previewPages,
  previewViewports,
  parseHexColorInput,
  nearestChromeWarmth,
  resolvedFooterBackground,
  resolvedHeaderBackground,
  resolvedPageBackground,
  themePresets,
  themeValuesEqual,
  wcdaDesignerTheme,
  wcdaFactoryTheme,
  type PreviewViewportId,
  type ThemeConfigSnapshot,
  type ThemeFontId,
  type ThemePresetId,
  type ThemeValues,
} from "@/config/theme";
import {
  ThemeLabContainersPanel,
  ThemeLabEffectsPanel,
  ThemeLabMediaPanel,
  ThemeLabMotionPanel,
  ThemeLabPositionPanel,
} from "@/components/theme/ThemeLabExperience";
import { ColorSampler } from "@/components/theme/ColorSampler";
import { LabContextMenu, type LabContextMenuAction } from "@/components/theme/LabContextMenu";
import {
  LabChangeActionBar,
  LabPendingList,
  LabStatusDots,
} from "@/components/theme/LabPendingChanges";
import {
  defaultLocalProperty,
  defaultSystemProperty,
  isContainerColorTarget,
  resolveColorApplyHex,
  resolveColorApplyTarget,
  setElementScopedColor,
  setPageScopedColor,
  setSectionScopedColor,
  SYSTEM_COLOR_PROPERTIES,
  type LocalColorProperty,
  type SystemColorProperty,
} from "@/config/lab-color-scope";
import {
  copyElementScopedColor,
  copyPageScopedColor,
  copySectionScopedColor,
  sectionColorKey,
} from "@/config/scoped-colors";
import {
  LabControlHelp,
  LabGuidePanel,
  LabUiProvider,
} from "@/components/theme/LabControlHelp";
import {
  childElementsFor,
  contentFieldsForElement,
  defaultElementId,
  defaultSectionId,
  editorFamiliesForSelection,
  findElement,
  findElementForPreview,
  labLabel,
  LAB_MODE_STORAGE_KEY,
  parseLabMode,
  resolveLabPage,
  rootElementsForSection,
  SYSTEM_FAMILIES,
  labPages,
  type LabEditorElementId,
  type LabMode,
} from "@/config/lab-registry";
import {
  applyContentSlice,
  approvedSiteContent,
  clearContentSlice,
  CONTENT_APPLY_PATH,
  CONTENT_CUSTOM_STORAGE_KEY,
  CONTENT_FIELD_IDS,
  CONTENT_LAB_STORAGE_KEY,
  contentAppliedNotCurrent,
  contentFieldsNeedWarning,
  contentLiveUnsaved,
  contentSliceEqual,
  dirtyContentFieldIds,
  defaultContentValue,
  defaultSiteContentPatch,
  parseSiteContentPatch,
  pickSiteContentPatch,
  publishContentSlice,
  resolveWorkingSiteContent,
  restoreContentSlice,
  sanitizeContentText,
  type ContentFieldId,
  type SiteContentPatch,
} from "@/config/site-content";
import { ContentEditor } from "@/components/theme/ContentEditor";
import {
  THEME_LAB_FOCUS,
  type LabPreviewFocus,
} from "@/config/lab-preview-focus";
import {
  listPendingCustomScopes,
  applyPendingScope,
  type LabChangeBundle,
  type PendingCustomScope,
  mergeElementIntoCurrent,
  mergeSectionPublicationIntoCurrent,
  mergeSectionVisualIntoCurrent,
  mergeSystemFamilyIntoCurrent,
} from "@/config/lab-scoped-merge";
import {
  CUSTOM_STAGED_STORAGE_KEY,
  applyElementSlice,
  applyLabSectionSlice,
  elementSliceEqual,
  isLabStagedSection,
  labSectionSliceEqual,
  labSectionStatus,
  labStagedSections,
  parseCustomStaged,
  promoteElementEqual,
  promoteElementExperience,
  type LabSectionStatus,
  type LabStagedSectionId,
} from "@/config/lab-section-state";
import {
  PUBLICATION_APPLY_PATH,
  PUBLICATION_CUSTOM_STORAGE_KEY,
  PUBLICATION_LAB_STORAGE_KEY,
  approvedContentPublication,
  contentPublicationEqual,
  parseContentPublicationPatch,
  pickContentPublicationPatch,
  resolvePageSectionFlag,
  setPageSectionEnabled,
  type ContentPublicationPatch,
} from "@/config/content-publication";
import { ThemeLabContent } from "@/components/theme/ThemeLabContent";
import { ThemeLabShell } from "@/components/theme/ThemeLabShell";
import {
  getManagedCategories,
  getManagedTreatmentsByCategory,
} from "@/data/services";

type LabConfirmKind =
  | "undo"
  | "load-current"
  | "load-factory"
  | "load-inspired"
  | "load-designer"
  | "apply"
  | "reset-all"
  | "promote-element"
  | "promote-section"
  | "promote-system"
  | "promote-copy"
  | "apply-copy-warning"
  | "apply-publish-all";

const colorFields = [
  { key: "primary", label: "Primary", group: "Brand" },
  { key: "cta", label: "CTA Soft Blue", group: "Brand" },
  { key: "ctaHover", label: "CTA Hover", group: "Brand" },
  { key: "navHover", label: "Nav Hover Text", group: "Brand" },
  { key: "secondary", label: "Secondary", group: "Brand" },
  { key: "accent", label: "Accent", group: "Brand" },
  { key: "background", label: "Page Background", group: "Surfaces" },
  { key: "surface", label: "Surface / Cards", group: "Surfaces" },
  { key: "surfaceMuted", label: "Muted Background", group: "Surfaces" },
  { key: "surfaceStrong", label: "Dark Surface", group: "Surfaces" },
  { key: "foreground", label: "Primary Text", group: "Text" },
  { key: "muted", label: "Muted Text", group: "Text" },
  { key: "border", label: "Border", group: "Structure" },
] as const;

const navHaloFields = [
  { key: "navHalo", min: 0, max: 0.25, step: 0.01, fallback: 0.06 },
  { key: "navHaloActive", min: 0, max: 0.25, step: 0.01, fallback: 0.1 },
] as const;

const sliderFields = [
  { key: "headingScale", label: "Heading Scale", min: 0.9, max: 1.15, step: 0.01 },
  { key: "bodyScale", label: "Body Scale", min: 0.9, max: 1.1, step: 0.01 },
  { key: "radius", label: "Corner Radius", min: 0, max: 24, step: 1 },
  { key: "shadowIntensity", label: "Shadow Intensity", min: 0, max: 1, step: 0.05 },
  { key: "cardDensity", label: "Card Density", min: 0, max: 1, step: 0.05 },
  { key: "sectionSpacing", label: "Section Spacing", min: 0, max: 1, step: 0.05 },
  { key: "contentWidth", label: "Content Width", min: 0, max: 1, step: 0.05 },
  { key: "headerDensity", label: "Header Density", min: 0, max: 1, step: 0.05 },
] as const;

function resolvedThemeColor(
  theme: ThemeValues,
  key: (typeof colorFields)[number]["key"],
  fallback: ThemeValues,
) {
  const candidates = [
    theme[key],
    fallback[key],
    key === "ctaHover" ? theme.cta : undefined,
    key === "ctaHover" ? fallback.cta : undefined,
    theme.primary,
  ];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && isHexColor(candidate)) {
      return candidate;
    }
  }
  return theme.primary;
}

function ColorControl({
  id,
  label,
  helpId,
  value,
  fallback,
  onChange,
}: {
  id: string;
  label: string;
  helpId?: LabControlId;
  value: string;
  fallback: string;
  onChange: (value: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const hexValue = editing ? draft : value;

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm text-zinc-200">
        {label}
      </label>
      {helpId ? <LabControlHelp id={helpId} /> : null}
      <div className="mt-1.5 flex items-center gap-2">
        <input
          id={id}
          type="color"
          value={isHexColor(value) ? value : "#000000"}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-11 shrink-0 cursor-pointer rounded-md border border-zinc-700 bg-zinc-900 p-1"
        />
        <input
          type="text"
          value={hexValue}
          spellCheck={false}
          aria-label={`${label} hex`}
          onFocus={() => {
            setDraft(value);
            setEditing(true);
          }}
          onChange={(event) => {
            const next = event.target.value;
            setDraft(next);
            if (isHexColor(next)) {
              onChange(next);
            }
          }}
          onBlur={() => {
            if (isHexColor(draft)) {
              onChange(draft);
            } else {
              setDraft(isHexColor(value) ? value : fallback);
            }
            setEditing(false);
          }}
          className="min-h-11 min-w-0 flex-1 rounded-md border border-zinc-700 bg-zinc-900 px-3 font-mono text-sm text-zinc-100"
        />
      </div>
    </div>
  );
}

function formatWarmthValue(value: number) {
  return value > 0 ? `+${value}` : String(value);
}

function GlobalSurfaceControl({
  sliderId,
  helpId,
  hex,
  language,
  onHexChange,
}: {
  sliderId: string;
  helpId: LabControlId;
  hex: string;
  language: LabLanguage;
  onHexChange: (hex: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(hex);
  const [invalid, setInvalid] = useState(false);
  const nearest = nearestChromeWarmth(hex);
  const shownHex = editing ? draft : hex;

  return (
    <div className="min-w-0">
      <label
        htmlFor={sliderId}
        className="flex items-center justify-between text-sm text-zinc-200"
      >
        <span>{labText(labControls[helpId].help.label, language)}</span>
        <span className="font-mono text-xs text-zinc-400">
          {formatWarmthValue(nearest.warmth)}
        </span>
      </label>
      {labControls[helpId].help.termNote ? (
        <p className="mt-0.5 text-[0.7rem] text-zinc-500">
          {labText(
            { en: "Warmth", es: "Calidez" },
            language,
          )}
        </p>
      ) : null}
      <div className="mt-1 flex justify-between text-[0.7rem] text-zinc-500">
        <span>
          {labText({ en: "Cooler / more neutral", es: "Más neutro" }, language)}
        </span>
        <span>
          {labText({ en: "Warmer / creamier", es: "Más cálido" }, language)}
        </span>
      </div>
      <input
        id={sliderId}
        type="range"
        min={-100}
        max={100}
        step={1}
        value={nearest.warmth}
        onChange={(event) => {
          setInvalid(false);
          setEditing(false);
          onHexChange(chromeHexFromWarmth(Number(event.target.value)));
        }}
        className="mt-2 w-full"
      />
      <div className="mt-2 flex items-center gap-2 text-sm text-zinc-300">
        <span
          aria-hidden
          className="h-6 w-6 shrink-0 rounded-md border border-zinc-600"
          style={{ backgroundColor: hex }}
        />
        <label className="min-w-0 flex-1" htmlFor={`${sliderId}-hex`}>
          <span className="block text-[0.7rem] text-zinc-500">
            {labText(
              { en: "Resulting color", es: "Color resultante" },
              language,
            )}
          </span>
          <input
            id={`${sliderId}-hex`}
            type="text"
            value={shownHex}
            spellCheck={false}
            aria-label={`${labText(labControls[helpId].help.label, language)} hex`}
            onFocus={() => {
              setDraft(hex);
              setEditing(true);
              setInvalid(false);
            }}
            onChange={(event) => {
              const next = event.target.value;
              setDraft(next);
              const parsed = parseHexColorInput(next);
              if (parsed) {
                setInvalid(false);
                onHexChange(parsed);
              }
            }}
            onBlur={() => {
              const parsed = parseHexColorInput(draft);
              if (parsed) {
                onHexChange(parsed);
                setInvalid(false);
              } else {
                setDraft(hex);
                setInvalid(draft.trim().length > 0);
              }
              setEditing(false);
            }}
            className="mt-1 min-h-11 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 font-mono text-sm text-zinc-100"
          />
        </label>
      </div>
      {nearest.exact ? null : (
        <p className="mt-1 text-[0.7rem] text-amber-300">
          {labText({ en: "Custom color", es: "Color personalizado" }, language)}
        </p>
      )}
      {invalid ? (
        <p className="mt-1 text-[0.7rem] text-red-400">
          {labText(
            {
              en: "Enter a valid 6-digit HEX color.",
              es: "Ingrese un color HEX válido de 6 dígitos.",
            },
            language,
          )}
        </p>
      ) : null}
      <LabControlHelp id={helpId} />
    </div>
  );
}

function loadStoredConfig() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(THEME_LAB_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as {
      preset: ThemePresetId;
      basePreset: Exclude<ThemePresetId, "custom">;
      theme: ThemeValues;
    };
  } catch {
    return null;
  }
}

function isCompleteThemeValues(
  value: ThemeValues | undefined | null,
): value is ThemeValues {
  return Boolean(value && typeof value.primary === "string");
}

/** Incomplete or unknown ids are not treated as full ThemeValues. */
function completePresetTheme(id: string | undefined): ThemeValues | undefined {
  if (!id || id === "custom") {
    return undefined;
  }
  if (!(id in themePresets)) {
    return undefined;
  }
  const values = themePresets[id as Exclude<ThemePresetId, "custom">];
  return isCompleteThemeValues(values) ? values : undefined;
}

function colorFallbackTheme(
  source: LabSourceId,
  basePreset: Exclude<ThemePresetId, "custom">,
  editorTheme: ThemeValues,
): ThemeValues {
  const fromSource =
    source === "factory"
      ? completePresetTheme("wcda-factory")
      : source === "inspired"
        ? completePresetTheme("wcda-inspired")
        : source === "designer"
          ? completePresetTheme("wcda-designer")
          : undefined;
  return (
    fromSource ??
    completePresetTheme(basePreset) ??
    (isCompleteThemeValues(editorTheme) ? editorTheme : undefined) ??
    approvedTheme
  );
}

function matchingPreset(theme: ThemeValues): ThemePresetId {
  const named = (
    Object.keys(themePresets) as Array<Exclude<ThemePresetId, "custom">>
  ).find(
    (id) =>
      isCompleteThemeValues(themePresets[id]) &&
      themeValuesEqual(theme, themePresets[id]),
  );
  return named ?? "custom";
}

function getInitialLabState() {
  const stored = loadStoredConfig();
  const theme = parseThemeValues(stored?.theme) ?? approvedTheme;
  const matched = matchingPreset(theme);
  const storedPreset = stored?.preset
    ? normalizeThemePresetId(String(stored.preset))
    : matched;
  const storedBaseRaw = stored?.basePreset
    ? normalizeThemePresetId(String(stored.basePreset))
    : undefined;
  const storedBase =
    storedBaseRaw && storedBaseRaw !== "custom" ? storedBaseRaw : undefined;
  const basePreset =
    storedBase &&
    storedBase !== "jc-dental" &&
    storedBase !== "wcda-jc-mix"
      ? storedBase
      : matched === "custom" ||
          matched === "jc-dental" ||
          matched === "wcda-jc-mix"
        ? defaultLabPreset
        : matched;
  return {
    theme,
    preset:
      storedPreset === "jc-dental" || storedPreset === "wcda-jc-mix"
        ? "wcda-inspired"
        : storedPreset,
    basePreset,
  };
}

function loadStoredExperience() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(EXPERIENCE_LAB_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return parseExperienceValues(JSON.parse(raw));
  } catch {
    return null;
  }
}

function loadStoredCustomStaged() {
  if (typeof window === "undefined") {
    return null;
  }
  return parseCustomStaged(
    window.localStorage.getItem(CUSTOM_STAGED_STORAGE_KEY),
  );
}

function loadStoredSiteContent(
  key: string,
  fallback: SiteContentPatch,
): SiteContentPatch {
  if (typeof window === "undefined") {
    return pickSiteContentPatch(fallback);
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return pickSiteContentPatch(fallback);
    }
    return parseSiteContentPatch(JSON.parse(raw)) ?? pickSiteContentPatch(fallback);
  } catch {
    return pickSiteContentPatch(fallback);
  }
}

function loadStoredPublication(key: string): ContentPublicationPatch {
  if (typeof window === "undefined") {
    return pickContentPublicationPatch(approvedContentPublication);
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return pickContentPublicationPatch(approvedContentPublication);
    }
    return (
      parseContentPublicationPatch(JSON.parse(raw)) ??
      pickContentPublicationPatch(approvedContentPublication)
    );
  } catch {
    return pickContentPublicationPatch(approvedContentPublication);
  }
}

function publicationStatus(
  live: ContentPublicationPatch,
  custom: ContentPublicationPatch,
  current: ContentPublicationPatch,
): LabSectionStatus {
  if (!contentPublicationEqual(live, custom)) {
    return "unsaved";
  }
  if (!contentPublicationEqual(custom, current)) {
    return "applied-to-custom";
  }
  return "no-changes";
}

function fillCopy(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(values[key] ?? ""),
  );
}

function confirmText(
  kind: LabConfirmKind,
  copy: LabCopy,
  path?: string,
  counts?: { unsaved: number; ready: number },
) {
  if (kind === "undo") {
    return {
      title: copy.confirmUndoTitle,
      body: copy.confirmUndoBody,
      action: copy.undoUnsaved,
    };
  }
  if (kind === "load-current") {
    return {
      title: copy.confirmLoadCurrentTitle,
      body: copy.confirmLoadCurrentBody,
      action: copy.loadCurrent,
    };
  }
  if (kind === "load-factory") {
    return {
      title: copy.confirmLoadFactoryTitle,
      body: copy.confirmLoadFactoryBody,
      action: copy.loadFactory,
    };
  }
  if (kind === "load-inspired") {
    return {
      title: copy.confirmLoadInspiredTitle,
      body: copy.confirmLoadInspiredBody,
      action: copy.loadInspired,
    };
  }
  if (kind === "load-designer") {
    return {
      title: copy.confirmLoadDesignerTitle,
      body: copy.confirmLoadDesignerBody,
      action: copy.designer,
    };
  }
  if (kind === "reset-all") {
    return {
      title: copy.confirmResetAllTitle,
      body: copy.confirmResetAllBody,
      action: copy.resetAllToCurrent,
    };
  }
  if (kind === "promote-element") {
    return {
      title: copy.confirmPromoteElementTitle,
      body: `${copy.pathLabel}:\n${path ?? ""}\n\n${copy.confirmPromoteElementBody}`,
      action: copy.promoteElement,
    };
  }
  if (kind === "promote-section") {
    return {
      title: copy.confirmPromoteSectionTitle,
      body: `${copy.pathLabel}:\n${path ?? ""}\n\n${copy.confirmPromoteSectionBody}`,
      action: copy.promoteSection,
    };
  }
  if (kind === "promote-system") {
    return {
      title: copy.confirmPromoteSystemTitle,
      body: `${copy.pathLabel}:\n${path ?? ""}\n\n${copy.confirmPromoteSystemBody}`,
      action: copy.promoteSystem,
    };
  }
  if (kind === "promote-copy") {
    return {
      title: copy.confirmPromoteElementTitle,
      body: `${copy.pathLabel}:\n${path ?? ""}\n\n${copy.confirmPromoteElementBody}`,
      action: copy.promoteElement,
    };
  }
  if (kind === "apply-copy-warning") {
    return {
      title: copy.confirmCopyWarningTitle,
      body: copy.confirmCopyWarningBody,
      action: copy.applyElement,
    };
  }
  if (kind === "apply-publish-all") {
    const unsaved = counts?.unsaved ?? 0;
    const ready = counts?.ready ?? 0;
    const total = unsaved + ready;
    return {
      title: copy.confirmApplyPublishTitle,
      body: fillCopy(copy.confirmApplyPublishBody, {
        unsaved,
        ready,
        total,
      }),
      action: fillCopy(copy.confirmApplyPublishAction, { total }),
    };
  }
  return {
    title: copy.confirmApplyAllTitle,
    body: copy.confirmApplyAllBody,
    action: copy.applyAllAsCurrent,
  };
}

function sectionStatusLabel(status: LabSectionStatus, copy: LabCopy) {
  if (status === "unsaved") return copy.sectionUnsaved;
  if (status === "applied-to-custom") return copy.sectionAppliedToCustom;
  return copy.sectionNoChanges;
}

function sectionStatusDotClass(status: LabSectionStatus) {
  if (status === "unsaved") return "bg-amber-400";
  if (status === "applied-to-custom") return "bg-cyan-400";
  return "bg-zinc-600";
}

function sectionLabel(id: LabSectionId, copy: LabCopy) {
  return copy[id];
}

function labNavClass(active: boolean) {
  return `flex min-h-9 w-full items-center rounded-md px-2 text-left text-[0.8rem] ${
    active
      ? "bg-cyan-400/15 text-white"
      : "text-zinc-300 hover:bg-zinc-800"
  }`;
}

function parsePreviewWidthPx(width: string) {
  if (!width.endsWith("px")) {
    return null;
  }
  const value = Number.parseInt(width, 10);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function LabPreviewStage({
  width,
  children,
}: {
  width: string;
  children: ReactNode;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const framePx = parsePreviewWidthPx(width);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (framePx == null) {
      return;
    }
    const host = hostRef.current;
    if (!host) {
      return;
    }
    const update = () => {
      const next = host.clientWidth / framePx;
      setScale(next > 0 ? Math.min(1, next) : 1);
    };
    const observer = new ResizeObserver(update);
    observer.observe(host);
    return () => observer.disconnect();
  }, [framePx]);

  if (framePx == null) {
    return (
      <div className="mx-auto h-full min-h-[32rem] w-full overflow-hidden rounded-md border border-zinc-700 bg-white shadow-lg">
        {children}
      </div>
    );
  }

  return (
    <div ref={hostRef} className="h-full min-h-[32rem]">
      <div
        className="h-full min-h-[32rem] overflow-hidden"
        style={{ width: framePx * scale }}
      >
        <div
          className="h-full min-h-[32rem] overflow-hidden rounded-md border border-zinc-700 bg-white shadow-lg"
          style={{
            width: framePx,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function viewportLabel(id: PreviewViewportId, copy: LabCopy) {
  if (id === "desktop") return copy.desktop;
  if (id === "tablet") return copy.tablet;
  if (id === "mobile") return copy.mobile;
  const preset = previewViewports.find((item) => item.id === id);
  return preset?.label ?? id;
}

export function ThemeLab() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [language, setLanguage] = useState<LabLanguage>(() =>
    parseLabLanguage(
      typeof window === "undefined"
        ? null
        : window.localStorage.getItem(LAB_LANGUAGE_STORAGE_KEY),
    ),
  );
  const copy = labCopy[language];
  const initial = getInitialLabState();
  const [basePreset, setBasePreset] =
    useState<Exclude<ThemePresetId, "custom">>(initial.basePreset);
  const [preset, setPreset] = useState<ThemePresetId>(initial.preset);
  const [theme, setTheme] = useState(initial.theme);
  const [previewPage, setPreviewPage] = useState<string>("/");
  const [viewport, setViewport] = useState<PreviewViewportId>("desktop");
  const [copyState, setCopyState] = useState(copy.copyTheme);
  const [approvedBaseline, setApprovedBaseline] = useState(() =>
    pickThemeValues(approvedTheme),
  );
  const [approvedVersion, setApprovedVersion] = useState(approvedThemeVersion);
  const [experience, setExperience] = useState(
    () => loadStoredExperience() ?? approvedExperience,
  );
  const [approvedExperienceBaseline, setApprovedExperienceBaseline] =
    useState(approvedExperience);
  const [source, setSource] = useState<LabSourceId>(() =>
    detectLabSource(
      initial.theme,
      loadStoredExperience() ?? approvedExperience,
      approvedTheme,
      approvedExperience,
    ),
  );
  const [pendingConfirm, setPendingConfirm] = useState<LabConfirmKind | null>(
    null,
  );
  const [statusMessage, setStatusMessage] = useState("");
  const [statusError, setStatusError] = useState("");
  const [saving, setSaving] = useState(false);
  const [labSection, setLabSection] = useState<LabSectionId>("brand");
  const [copyExperienceState, setCopyExperienceState] = useState(
    copy.copyExperience,
  );
  const [selectedTarget, setSelectedTarget] =
    useState<VisualTargetId>("home-hero-content");
  const [labMode, setLabMode] = useState<LabMode>(() =>
    parseLabMode(
      typeof window === "undefined"
        ? null
        : window.localStorage.getItem(LAB_MODE_STORAGE_KEY),
    ),
  );
  const [confirmPath, setConfirmPath] = useState("");
  const [previewSectionId, setPreviewSectionId] = useState("hero");
  const [editorElementId, setEditorElementId] =
    useState<LabEditorElementId>("home-hero-content");
  const [isolateSection, setIsolateSection] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showPendingPanel, setShowPendingPanel] = useState(false);
  const [unsavedNavOpen, setUnsavedNavOpen] = useState(false);
  const [galleryNonce, setGalleryNonce] = useState(0);
  const [changeImageSignal, setChangeImageSignal] = useState(0);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    media: boolean;
    title: string;
    subtitle: string;
  } | null>(null);
  const pendingNavIntent = useRef<(() => void) | null>(null);
  const skipNavGuard = useRef(false);
  const previewSelectRef = useRef<(payload: {
    visualTarget?: string;
    itemKey?: string;
    pageId?: string;
    sectionId?: string;
    media?: boolean;
    kind?: string;
    clientX?: number;
    clientY?: number;
  }) => void>(() => {});
  const mediaPanRef = useRef<(payload: {
    visualTarget?: string;
    itemKey?: string;
    panX?: number;
    panY?: number;
  }) => void>(() => {});
  const [customTheme, setCustomTheme] = useState(() => {
    const stored = loadStoredCustomStaged();
    return stored?.theme ?? pickThemeValues(initial.theme);
  });
  const [customExperience, setCustomExperience] = useState(() => {
    const stored = loadStoredCustomStaged();
    return (
      stored?.experience ??
      pickExperienceValues(loadStoredExperience() ?? approvedExperience)
    );
  });
  const [approvedPublication, setApprovedPublication] = useState(
    () => pickContentPublicationPatch(approvedContentPublication),
  );
  const [publication, setPublication] = useState(() =>
    loadStoredPublication(PUBLICATION_LAB_STORAGE_KEY),
  );
  const [customPublication, setCustomPublication] = useState(() =>
    loadStoredPublication(PUBLICATION_CUSTOM_STORAGE_KEY),
  );
  const [approvedSiteContentBaseline, setApprovedSiteContentBaseline] =
    useState(() => pickSiteContentPatch(approvedSiteContent));
  const [siteContent, setSiteContent] = useState(() =>
    loadStoredSiteContent(CONTENT_LAB_STORAGE_KEY, {}),
  );
  const [customSiteContent, setCustomSiteContent] = useState(() =>
    loadStoredSiteContent(CONTENT_CUSTOM_STORAGE_KEY, {}),
  );
  const [systemColorProperty, setSystemColorProperty] =
    useState<SystemColorProperty>("pageBackground");
  const [localColorProperty, setLocalColorProperty] =
    useState<LocalColorProperty>("pageBackground");
  const [navCollapsed, setNavCollapsed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.localStorage.getItem("wcda-lab-nav-collapsed-v1") === "1";
  });
  const [inspectorCollapsed, setInspectorCollapsed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return (
      window.localStorage.getItem("wcda-lab-inspector-collapsed-v1") === "1"
    );
  });
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [inspectorDrawerOpen, setInspectorDrawerOpen] = useState(false);

  const sectionStatuses = useMemo(() => {
    const next = {} as Record<LabStagedSectionId, LabSectionStatus>;
    for (const id of labStagedSections) {
      next[id] = labSectionStatus(
        id,
        theme,
        experience,
        customTheme,
        customExperience,
        approvedBaseline,
        approvedExperienceBaseline,
      );
    }
    return next;
  }, [
    theme,
    experience,
    customTheme,
    customExperience,
    approvedBaseline,
    approvedExperienceBaseline,
  ]);
  const unsaved =
    labStagedSections.some((id) => sectionStatuses[id] === "unsaved") ||
    publicationStatus(publication, customPublication, approvedPublication) ===
      "unsaved" ||
    contentLiveUnsaved(
      CONTENT_FIELD_IDS,
      siteContent,
      customSiteContent,
      approvedSiteContentBaseline,
    );
  const hasStagedCustom =
    labStagedSections.some((id) => sectionStatuses[id] === "applied-to-custom") ||
    publicationStatus(publication, customPublication, approvedPublication) ===
      "applied-to-custom" ||
    contentAppliedNotCurrent(
      CONTENT_FIELD_IDS,
      siteContent,
      customSiteContent,
      approvedSiteContentBaseline,
    );
  const contentStatus = publicationStatus(
    publication,
    customPublication,
    approvedPublication,
  );
  const labPage = resolveLabPage(previewPage);
  const resolvedSection =
    labPage?.sections.find((item) => item.id === previewSectionId) ??
    labPage?.sections[0];
  const resolvedElement =
    findElement(resolvedSection, editorElementId) ??
    resolvedSection?.elements[0];
  const selectedCopyFields = contentFieldsForElement(resolvedElement);
  const copyUnsaved = contentLiveUnsaved(
    selectedCopyFields,
    siteContent,
    customSiteContent,
    approvedSiteContentBaseline,
  );
  const copyReadyToPublish = contentAppliedNotCurrent(
    selectedCopyFields,
    siteContent,
    customSiteContent,
    approvedSiteContentBaseline,
  );
  const parentElement = resolvedElement?.parentId
    ? findElement(resolvedSection, resolvedElement.parentId)
    : undefined;
  const editorFamilies = editorFamiliesForSelection(
    resolvedSection,
    resolvedElement,
  );
  const visibleSections: LabSectionId[] =
    labMode === "system"
      ? SYSTEM_FAMILIES.map((family) => family as LabSectionId)
      : labMode === "editor"
        ? editorFamilies.map((family) =>
            family === "publication" ? "content" : (family as LabSectionId),
          )
        : [];
  const displayedSection: LabSectionId =
    labMode === "approval" || labMode === "recovery"
      ? labMode
      : visibleSections.includes(labSection)
        ? labSection
        : (visibleSections[0] ?? "brand");
  const panelTarget: VisualTargetId =
    labMode === "system" && displayedSection === "header"
      ? "header-logo"
      : labMode === "system" && displayedSection === "containers"
        ? "editorial-cards"
        : (resolvedElement?.visualTarget ?? selectedTarget);
  const displayedSectionStatus =
    displayedSection === "content"
      ? contentStatus
      : displayedSection === "copy"
        ? copyUnsaved
          ? "unsaved"
          : copyReadyToPublish
            ? "applied-to-custom"
            : "no-changes"
      : isLabStagedSection(displayedSection)
        ? sectionStatuses[displayedSection]
        : null;
  const elementUnsaved =
    Boolean(resolvedElement?.visualTarget) &&
    !elementSliceEqual(
      resolvedElement!.visualTarget as VisualTargetId,
      experience,
      customExperience,
      resolvedElement?.itemKey,
    );
  const sectionPublicationUnsaved =
    Boolean(labPage && resolvedSection) &&
    resolvePageSectionFlag(publication, labPage!.id, resolvedSection!.id) !==
      resolvePageSectionFlag(
        customPublication,
        labPage!.id,
        resolvedSection!.id,
      );
  const editorSectionUnsaved =
    sectionPublicationUnsaved ||
    Boolean(
      resolvedSection?.elements.some(
        (element) =>
          Boolean(element.visualTarget) &&
          !elementSliceEqual(
            element.visualTarget as VisualTargetId,
            experience,
            customExperience,
            element.itemKey,
          ),
      ),
    ) ||
    Boolean(
      labPage &&
        resolvedSection &&
        (experience.scopedColors?.sections?.[
          sectionColorKey(labPage.id, resolvedSection.id)
        ] ?? "") !==
          (customExperience.scopedColors?.sections?.[
            sectionColorKey(labPage.id, resolvedSection.id)
          ] ?? ""),
    ) ||
    Boolean(
      labPage &&
        (experience.scopedColors?.pages?.[labPage.id] ?? "") !==
          (customExperience.scopedColors?.pages?.[labPage.id] ?? ""),
    );
  const editorElementScope = Boolean(
    resolvedElement?.visualTarget && resolvedElement.id !== "section",
  );
  const systemContainersUnsaved = !elementSliceEqual(
    "editorial-cards",
    experience,
    customExperience,
  );
  const systemFamilyUnsaved =
    displayedSection === "containers"
      ? systemContainersUnsaved
      : displayedSection === "effects"
        ? !labSectionSliceEqual(
            "effects",
            theme,
            experience,
            customTheme,
            customExperience,
          )
        : displayedSectionStatus === "unsaved";
  const editorPath = [
    labPage ? labLabel(labPage.label, language) : copy.previewPage,
    resolvedSection ? labLabel(resolvedSection.label, language) : copy.previewSection,
    parentElement ? labLabel(parentElement.label, language) : null,
    (editorElementScope || selectedCopyFields.length > 0) && resolvedElement
      ? labLabel(resolvedElement.label, language)
      : copy.sectionItself,
  ]
    .filter((part): part is string => Boolean(part))
    .join(" / ");
  const editorColorElementId =
    resolvedElement?.id === "section"
      ? "section"
      : resolvedElement?.visualTarget;
  const samplerPropertyOptions =
    labMode === "system" && displayedSection === "tools"
      ? SYSTEM_COLOR_PROPERTIES
      : labMode === "system" && displayedSection === "colors"
        ? SYSTEM_COLOR_PROPERTIES.filter(
            (item) =>
              item.id !== "pageBackground" &&
              item.id !== "headerBackground" &&
              item.id !== "footerBackground",
          )
        : labMode === "editor" && editorColorElementId !== "header-logo"
          ? [
              {
                id: "pageBackground",
                label: { en: "Page Background", es: "Fondo de página" },
              },
              ...(labPage && resolvedSection
                ? [
                    {
                      id: "sectionBackground",
                      label: {
                        en: "Section Background",
                        es: "Fondo de sección",
                      },
                    },
                  ]
                : []),
              ...(isContainerColorTarget(resolvedElement?.visualTarget)
                ? [
                    {
                      id: "containerBackground",
                      label: {
                        en: "Container Background",
                        es: "Fondo del contenedor",
                      },
                    },
                  ]
                : []),
            ]
          : undefined;
  const palettePropertyIds = new Set(
    SYSTEM_COLOR_PROPERTIES.filter(
      (item) =>
        item.id !== "pageBackground" &&
        item.id !== "headerBackground" &&
        item.id !== "footerBackground",
    ).map((item) => item.id),
  );
  const activeSystemProperty: SystemColorProperty =
    displayedSection === "tools"
      ? systemColorProperty
      : displayedSection === "colors" && palettePropertyIds.has(systemColorProperty)
        ? systemColorProperty
        : defaultSystemProperty(displayedSection);
  const activeLocalProperty: LocalColorProperty =
    samplerPropertyOptions?.some((item) => item.id === localColorProperty)
      ? localColorProperty
      : defaultLocalProperty(editorColorElementId);
  const colorApplyTarget = resolveColorApplyTarget({
    labMode,
    displayedSection,
    systemProperty: activeSystemProperty,
    localProperty: activeLocalProperty,
    pageId: labPage?.id,
    pageLabel: labPage?.label,
    sectionId: resolvedSection?.id,
    sectionLabel: resolvedSection?.label,
    elementId: editorColorElementId,
    elementLabel: resolvedElement?.label,
  });
  const samplerWorkingHex = resolveColorApplyHex(
    colorApplyTarget,
    theme,
    experience,
  );
  const samplerCustomHex = resolveColorApplyHex(
    colorApplyTarget,
    customTheme,
    customExperience,
  );
  const samplerCurrentHex = resolveColorApplyHex(
    colorApplyTarget,
    approvedBaseline,
    approvedExperienceBaseline,
  );
  const samplerStatus =
    (samplerWorkingHex ?? "") !== (samplerCustomHex ?? "")
      ? "unsaved"
      : (samplerCustomHex ?? "") !== (samplerCurrentHex ?? "")
        ? "ready"
        : "current";
  const showColorSampler =
    displayedSection !== "copy" &&
    (labMode === "editor" ||
      (labMode === "system" &&
        (displayedSection === "tools" ||
          displayedSection === "colors" ||
          displayedSection === "surfaces" ||
          displayedSection === "header" ||
          displayedSection === "footer")));
  const elementAppliedNotCurrent =
    Boolean(resolvedElement?.visualTarget) &&
    !elementUnsaved &&
    !promoteElementEqual(
      resolvedElement!.visualTarget as VisualTargetId,
      customExperience,
      approvedExperienceBaseline,
      resolvedElement?.itemKey,
    );
  const sectionAppliedNotCurrent =
    Boolean(labPage && resolvedSection) &&
    !editorSectionUnsaved &&
    (resolvePageSectionFlag(
      customPublication,
      labPage!.id,
      resolvedSection!.id,
    ) !==
      resolvePageSectionFlag(
        approvedPublication,
        labPage!.id,
        resolvedSection!.id,
      ) ||
      Boolean(
        resolvedSection!.elements.some(
          (element) =>
            Boolean(element.visualTarget) &&
            !promoteElementEqual(
              element.visualTarget as VisualTargetId,
              customExperience,
              approvedExperienceBaseline,
              element.itemKey,
            ),
        ),
      ) ||
      (customExperience.scopedColors?.sections?.[
        sectionColorKey(labPage!.id, resolvedSection!.id)
      ] ?? "") !==
        (approvedExperienceBaseline.scopedColors?.sections?.[
          sectionColorKey(labPage!.id, resolvedSection!.id)
        ] ?? "") ||
      (customExperience.scopedColors?.pages?.[labPage!.id] ?? "") !==
        (approvedExperienceBaseline.scopedColors?.pages?.[labPage!.id] ?? ""));
  const systemAppliedNotCurrent =
    displayedSection === "containers"
      ? !systemContainersUnsaved &&
        !promoteElementEqual(
          "editorial-cards",
          customExperience,
          approvedExperienceBaseline,
        )
      : displayedSection === "effects"
        ? labSectionSliceEqual(
            "effects",
            theme,
            experience,
            customTheme,
            customExperience,
          ) &&
          !labSectionSliceEqual(
            "effects",
            customTheme,
            customExperience,
            approvedBaseline,
            approvedExperienceBaseline,
          )
        : isLabStagedSection(displayedSection) &&
          displayedSectionStatus === "applied-to-custom";
  const pendingScopes = listPendingCustomScopes(
    customTheme,
    customExperience,
    customPublication,
    approvedBaseline,
    approvedExperienceBaseline,
    approvedPublication,
    customSiteContent,
    approvedSiteContentBaseline,
  );
  const unsavedScopes = listPendingCustomScopes(
    theme,
    experience,
    publication,
    customTheme,
    customExperience,
    customPublication,
    siteContent,
    customSiteContent,
    approvedSiteContentBaseline,
  );
  const readyScopes = pendingScopes.filter(
    (item) => !unsavedScopes.some((unsaved) => unsaved.id === item.id),
  );
  const editorScopeState =
    displayedSection === "copy"
      ? copyUnsaved
        ? copy.unsavedChanges
        : copyReadyToPublish
          ? copy.appliedToCustomNotCurrent
          : copy.current
      : editorElementScope
        ? elementUnsaved
          ? copy.unsavedChanges
          : elementAppliedNotCurrent
            ? copy.appliedToCustomNotCurrent
            : copy.current
        : editorSectionUnsaved
          ? copy.unsavedChanges
          : sectionAppliedNotCurrent
            ? copy.appliedToCustomNotCurrent
            : copy.current;
  const systemScopeState = systemFamilyUnsaved
    ? copy.unsavedChanges
    : systemAppliedNotCurrent
      ? copy.appliedToCustomNotCurrent
      : copy.current;

  useEffect(() => {
    window.localStorage.setItem(LAB_LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    window.localStorage.setItem(LAB_MODE_STORAGE_KEY, labMode);
  }, [labMode]);

  useEffect(() => {
    window.localStorage.setItem("wcda-lab-nav-collapsed-v1", navCollapsed ? "1" : "0");
  }, [navCollapsed]);

  useEffect(() => {
    window.localStorage.setItem(
      "wcda-lab-inspector-collapsed-v1",
      inspectorCollapsed ? "1" : "0",
    );
  }, [inspectorCollapsed]);

  useEffect(() => {
    window.localStorage.setItem(
      THEME_LAB_STORAGE_KEY,
      JSON.stringify({ preset, basePreset, theme }),
    );
  }, [preset, basePreset, theme]);

  useEffect(() => {
    window.localStorage.setItem(
      EXPERIENCE_LAB_STORAGE_KEY,
      JSON.stringify(experience),
    );
  }, [experience]);

  useEffect(() => {
    window.localStorage.setItem(
      CUSTOM_STAGED_STORAGE_KEY,
      JSON.stringify({
        theme: customTheme,
        experience: customExperience,
      }),
    );
  }, [customTheme, customExperience]);

  useEffect(() => {
    window.localStorage.setItem(
      PUBLICATION_LAB_STORAGE_KEY,
      JSON.stringify(publication),
    );
  }, [publication]);

  useEffect(() => {
    window.localStorage.setItem(
      PUBLICATION_CUSTOM_STORAGE_KEY,
      JSON.stringify(customPublication),
    );
  }, [customPublication]);

  useEffect(() => {
    window.localStorage.setItem(
      CONTENT_LAB_STORAGE_KEY,
      JSON.stringify(siteContent),
    );
  }, [siteContent]);

  useEffect(() => {
    window.localStorage.setItem(
      CONTENT_CUSTOM_STORAGE_KEY,
      JSON.stringify(customSiteContent),
    );
  }, [customSiteContent]);

  const postTheme = useCallback(() => {
    const frame = iframeRef.current?.contentWindow;
    if (!frame) {
      return;
    }

    frame.postMessage(
      {
        type: THEME_LAB_MESSAGE,
        theme,
        experience,
        selectedTarget,
        publication,
        siteContent: resolveWorkingSiteContent(
          siteContent,
          customSiteContent,
          approvedSiteContentBaseline,
        ),
      },
      window.location.origin,
    );
  }, [
    theme,
    experience,
    selectedTarget,
    publication,
    siteContent,
    customSiteContent,
    approvedSiteContentBaseline,
  ]);

  const postLabFocus = useCallback(() => {
    const frame = iframeRef.current?.contentWindow;
    if (!frame) {
      return;
    }
    const page = resolveLabPage(previewPage);
    const section =
      page?.sections.find((item) => item.id === previewSectionId) ??
      page?.sections[0];
    const element = findElement(section, editorElementId) ?? section?.elements[0];
    const focus: LabPreviewFocus = {
      mode: labMode,
      pageId: page?.id ?? "",
      sectionId: section?.id ?? "",
      elementId: element?.id ?? "section",
      isolateSection: labMode === "editor" && isolateSection,
      sectionLabel: section
        ? `${copy.previewSection}: ${labLabel(section.label, language)}`
        : "",
      elementLabel:
        element && element.id !== "section"
          ? `${copy.selectedElement}: ${labLabel(element.label, language)}`
          : "",
      visualTarget: element?.visualTarget,
      itemKey: element?.itemKey,
    };
    frame.postMessage(
      { type: THEME_LAB_FOCUS, focus },
      window.location.origin,
    );
  }, [
    labMode,
    isolateSection,
    previewPage,
    previewSectionId,
    editorElementId,
    language,
    copy.previewSection,
    copy.selectedElement,
  ]);

  useEffect(() => {
    function handleReady(event: MessageEvent) {
      if (event.origin !== window.location.origin) {
        return;
      }
      if (event.data?.type === THEME_LAB_READY) {
        postTheme();
        postLabFocus();
      }
      if (event.data?.type === THEME_LAB_SELECT) {
        previewSelectRef.current(event.data);
      }
      if (event.data?.type === THEME_LAB_MEDIA_PAN) {
        mediaPanRef.current(event.data);
      }
    }

    window.addEventListener("message", handleReady);
    return () => window.removeEventListener("message", handleReady);
  }, [postTheme, postLabFocus]);

  useEffect(() => {
    postTheme();
  }, [postTheme, previewPage]);

  useEffect(() => {
    postLabFocus();
  }, [postLabFocus]);

  function adoptWorkingConfiguration(
    nextTheme: ThemeValues,
    nextExperience: ExperienceValues,
    nextSource: LabSourceId,
    nextPreset: ThemePresetId,
    nextBase: Exclude<ThemePresetId, "custom">,
    message: string,
  ) {
    const themeNext = pickThemeValues(nextTheme);
    const experienceNext = pickExperienceValues(nextExperience);
    setTheme(themeNext);
    setExperience(experienceNext);
    setCustomTheme(themeNext);
    setCustomExperience(experienceNext);
    setPreset(nextPreset);
    setBasePreset(nextBase);
    setSource(nextSource);
    setStatusMessage(message);
    setStatusError("");
  }

  function loadFactory() {
    adoptWorkingConfiguration(
      wcdaFactoryTheme,
      wcdaFactoryExperience,
      "factory",
      "wcda-factory",
      "wcda-factory",
      copy.loadedFactory,
    );
    const defaults = defaultSiteContentPatch();
    setSiteContent(defaults);
    setCustomSiteContent(defaults);
  }

  function loadCurrent() {
    const nextTheme = pickThemeValues(approvedBaseline);
    const matched = matchingPreset(nextTheme);
    const nextPreset =
      matched === "jc-dental" || matched === "wcda-jc-mix"
        ? "wcda-inspired"
        : matched;
    const nextBase =
      nextPreset === "custom" || !completePresetTheme(nextPreset)
        ? defaultLabPreset
        : nextPreset;
    adoptWorkingConfiguration(
      nextTheme,
      approvedExperienceBaseline,
      "current",
      nextPreset,
      nextBase,
      copy.loadedCurrent,
    );
    const currentContent = pickSiteContentPatch(approvedSiteContentBaseline);
    setSiteContent({});
    setCustomSiteContent(currentContent);
  }

  function resetAllToCurrent() {
    const nextTheme = pickThemeValues(approvedBaseline);
    const matched = matchingPreset(nextTheme);
    const nextPreset =
      matched === "jc-dental" || matched === "wcda-jc-mix"
        ? "wcda-inspired"
        : matched;
    const nextBase =
      nextPreset === "custom" || !completePresetTheme(nextPreset)
        ? defaultLabPreset
        : nextPreset;
    adoptWorkingConfiguration(
      nextTheme,
      approvedExperienceBaseline,
      "current",
      nextPreset,
      nextBase,
      copy.resetAllDone,
    );
    const currentPublication = pickContentPublicationPatch(approvedPublication);
    setPublication(currentPublication);
    setCustomPublication(currentPublication);
    const currentContent = pickSiteContentPatch(approvedSiteContentBaseline);
    setSiteContent({});
    setCustomSiteContent(currentContent);
  }

  function loadInspired() {
    adoptWorkingConfiguration(
      wcdaInspiredTheme,
      approvedExperienceBaseline,
      "inspired",
      "wcda-inspired",
      "wcda-inspired",
      copy.loadedInspired,
    );
  }

  function loadDesigner() {
    adoptWorkingConfiguration(
      wcdaDesignerTheme,
      approvedExperienceBaseline,
      "designer",
      "wcda-designer",
      "wcda-designer",
      copy.loadedDesigner,
    );
  }

  function undoUnsaved() {
    setTheme(pickThemeValues(customTheme));
    setExperience(pickExperienceValues(customExperience));
    setPublication(pickContentPublicationPatch(customPublication));
    setSiteContent({});
    setPreset("custom");
    setSource("custom");
    setStatusMessage(copy.undone);
    setStatusError("");
  }

  function applySectionToCustom() {
    if (labMode === "system" && displayedSection === "containers") {
      setCustomExperience(
        applyElementSlice("editorial-cards", customExperience, experience),
      );
      setPreset("custom");
      setSource("custom");
      setStatusMessage(copy.sectionAppliedMessage);
      setStatusError("");
      return;
    }
    if (labMode === "system" && displayedSection === "effects") {
      const next = applyLabSectionSlice(
        "effects",
        customTheme,
        customExperience,
        theme,
        experience,
      );
      setCustomTheme(next.theme);
      setCustomExperience(next.experience);
      setPreset("custom");
      setSource("custom");
      setStatusMessage(copy.sectionAppliedMessage);
      setStatusError("");
      return;
    }
    if (displayedSection === "content") {
      setCustomPublication(pickContentPublicationPatch(publication));
      setStatusMessage(copy.sectionAppliedMessage);
      setStatusError("");
      return;
    }
    if (!isLabStagedSection(displayedSection)) {
      return;
    }
    const next = applyLabSectionSlice(
      displayedSection,
      customTheme,
      customExperience,
      theme,
      experience,
    );
    setCustomTheme(next.theme);
    setCustomExperience(next.experience);
    setPreset("custom");
    setSource("custom");
    setStatusMessage(copy.sectionAppliedMessage);
    setStatusError("");
  }

  function resetSectionToCustom() {
    if (labMode === "system" && displayedSection === "containers") {
      setExperience(
        applyElementSlice("editorial-cards", experience, customExperience),
      );
      setStatusMessage(copy.sectionResetMessage);
      setStatusError("");
      return;
    }
    if (labMode === "system" && displayedSection === "effects") {
      const next = applyLabSectionSlice(
        "effects",
        theme,
        experience,
        customTheme,
        customExperience,
      );
      setTheme(next.theme);
      setExperience(next.experience);
      setStatusMessage(copy.sectionResetMessage);
      setStatusError("");
      return;
    }
    if (displayedSection === "content") {
      setPublication(pickContentPublicationPatch(customPublication));
      setStatusMessage(copy.sectionResetMessage);
      setStatusError("");
      return;
    }
    if (!isLabStagedSection(displayedSection)) {
      return;
    }
    const next = applyLabSectionSlice(
      displayedSection,
      theme,
      experience,
      customTheme,
      customExperience,
    );
    setTheme(next.theme);
    setExperience(next.experience);
    setStatusMessage(copy.sectionResetMessage);
    setStatusError("");
  }

  function applyElementToCustom() {
    const target = resolvedElement?.visualTarget;
    if (!target) {
      return;
    }
    setCustomExperience(
      applyElementSlice(
        target,
        customExperience,
        experience,
        resolvedElement?.itemKey,
      ),
    );
    setPreset("custom");
    setSource("custom");
    setStatusMessage(copy.elementAppliedMessage);
    setStatusError("");
  }

  function resetElementToCustom() {
    const target = resolvedElement?.visualTarget;
    if (!target) {
      return;
    }
    setExperience(
      applyElementSlice(
        target,
        experience,
        customExperience,
        resolvedElement?.itemKey,
      ),
    );
    setStatusMessage(copy.elementResetMessage);
    setStatusError("");
  }

  function restoreElementToCurrent() {
    const target = resolvedElement?.visualTarget;
    if (!target) {
      return;
    }
    setExperience(
      applyElementSlice(
        target,
        experience,
        approvedExperienceBaseline,
        resolvedElement?.itemKey,
      ),
    );
    setCustomExperience(
      applyElementSlice(
        target,
        customExperience,
        approvedExperienceBaseline,
        resolvedElement?.itemKey,
      ),
    );
    setStatusMessage(copy.restoreCurrent);
    setStatusError("");
  }

  function restoreSystemFamilyToCurrent() {
    if (labMode === "system" && displayedSection === "containers") {
      setExperience(
        applyElementSlice(
          "editorial-cards",
          experience,
          approvedExperienceBaseline,
        ),
      );
      setCustomExperience(
        applyElementSlice(
          "editorial-cards",
          customExperience,
          approvedExperienceBaseline,
        ),
      );
      setStatusMessage(copy.restoreCurrent);
      setStatusError("");
      return;
    }
    if (!isLabStagedSection(displayedSection)) {
      return;
    }
    const live = applyLabSectionSlice(
      displayedSection,
      theme,
      experience,
      approvedBaseline,
      approvedExperienceBaseline,
    );
    const nextCustom = applyLabSectionSlice(
      displayedSection,
      customTheme,
      customExperience,
      approvedBaseline,
      approvedExperienceBaseline,
    );
    setTheme(live.theme);
    setExperience(live.experience);
    setCustomTheme(nextCustom.theme);
    setCustomExperience(nextCustom.experience);
    setStatusMessage(copy.restoreCurrent);
    setStatusError("");
  }

  function applyCopyToCustom() {
    if (selectedCopyFields.length === 0) {
      return;
    }
    const dirtyIds = dirtyContentFieldIds(
      selectedCopyFields,
      siteContent,
      customSiteContent,
      approvedSiteContentBaseline,
    );
    if (dirtyIds.length > 0) {
      setCustomSiteContent(
        applyContentSlice(
          customSiteContent,
          siteContent,
          dirtyIds,
          approvedSiteContentBaseline,
        ),
      );
    }
    setSiteContent(clearContentSlice(siteContent, selectedCopyFields));
    setStatusMessage(copy.elementAppliedMessage);
    setStatusError("");
  }

  function requestApplyCopy() {
    if (selectedCopyFields.length === 0 || !copyUnsaved) {
      return;
    }
    if (contentFieldsNeedWarning(selectedCopyFields)) {
      setConfirmPath(editorPath);
      setPendingConfirm("apply-copy-warning");
      return;
    }
    applyCopyToCustom();
  }

  function resetCopyToCustom() {
    if (selectedCopyFields.length === 0) {
      return;
    }
    setSiteContent(clearContentSlice(siteContent, selectedCopyFields));
    setStatusMessage(copy.elementResetMessage);
    setStatusError("");
  }

  function restoreCopyToCurrent() {
    if (selectedCopyFields.length === 0) {
      return;
    }
    setCustomSiteContent(
      restoreContentSlice(
        customSiteContent,
        approvedSiteContentBaseline,
        selectedCopyFields,
      ),
    );
    setSiteContent(clearContentSlice(siteContent, selectedCopyFields));
    setStatusMessage(copy.elementResetMessage);
    setStatusError("");
  }

  function restoreCopyOriginal(ids: readonly ContentFieldId[]) {
    setSiteContent((current) => {
      const next = pickSiteContentPatch(current);
      for (const id of ids) {
        next[id] = defaultContentValue(id);
      }
      return next;
    });
    setStatusMessage("");
    setStatusError("");
  }

  function updateCopyField(id: ContentFieldId, value: string) {
    setStatusMessage("");
    setStatusError("");
    setSiteContent((current) => ({
      ...current,
      [id]: sanitizeContentText(value),
    }));
  }

  function applyPageSectionToCustom() {
    if (!labPage || !resolvedSection) {
      return;
    }
    let nextExperience = customExperience;
    nextExperience = pickExperienceValues({
      ...nextExperience,
      scopedColors: copySectionScopedColor(
        labPage.id,
        resolvedSection.id,
        nextExperience.scopedColors,
        experience.scopedColors,
      ),
    });
    for (const element of resolvedSection.elements) {
      if (element.visualTarget) {
        nextExperience = applyElementSlice(
          element.visualTarget,
          nextExperience,
          experience,
          element.itemKey,
        );
      }
    }
    setCustomExperience(nextExperience);
    const nextPublication = setPageSectionEnabled(
      customPublication,
      labPage.id,
      resolvedSection.id,
      resolvePageSectionFlag(publication, labPage.id, resolvedSection.id),
    );
    setCustomPublication(nextPublication);
    setPreset("custom");
    setSource("custom");
    setStatusMessage(copy.sectionAppliedMessage);
    setStatusError("");
  }

  function resetPageSectionToCustom() {
    if (!labPage || !resolvedSection) {
      return;
    }
    let nextExperience = experience;
    nextExperience = pickExperienceValues({
      ...nextExperience,
      scopedColors: copySectionScopedColor(
        labPage.id,
        resolvedSection.id,
        nextExperience.scopedColors,
        customExperience.scopedColors,
      ),
    });
    for (const element of resolvedSection.elements) {
      if (element.visualTarget) {
        nextExperience = applyElementSlice(
          element.visualTarget,
          nextExperience,
          customExperience,
          element.itemKey,
        );
      }
    }
    setExperience(nextExperience);
    const nextPublication = setPageSectionEnabled(
      publication,
      labPage.id,
      resolvedSection.id,
      resolvePageSectionFlag(customPublication, labPage.id, resolvedSection.id),
    );
    setPublication(nextPublication);
    setStatusMessage(copy.sectionResetMessage);
    setStatusError("");
  }

  function currentScopeHasUnsaved() {
    if (labMode === "editor") {
      if (selectedCopyFields.length > 0 && copyUnsaved) {
        return true;
      }
      if (editorElementScope) {
        return elementUnsaved;
      }
      return editorSectionUnsaved;
    }
    if (labMode === "system") {
      return systemFamilyUnsaved;
    }
    return false;
  }

  function applyCurrentScopeToCustom() {
    if (labMode === "editor" && selectedCopyFields.length > 0 && copyUnsaved) {
      applyCopyToCustom();
      return;
    }
    if (labMode === "editor" && editorElementScope) {
      applyElementToCustom();
      return;
    }
    if (labMode === "editor") {
      applyPageSectionToCustom();
      return;
    }
    if (labMode === "system") {
      applySectionToCustom();
    }
  }

  function discardCurrentScope() {
    if (labMode === "editor" && selectedCopyFields.length > 0 && copyUnsaved) {
      resetCopyToCustom();
      return;
    }
    if (labMode === "editor" && editorElementScope) {
      resetElementToCustom();
      return;
    }
    if (labMode === "editor") {
      resetPageSectionToCustom();
      return;
    }
    if (labMode === "system") {
      resetSectionToCustom();
    }
  }

  function requestNavigate(intent: () => void) {
    if (skipNavGuard.current || !currentScopeHasUnsaved()) {
      intent();
      return;
    }
    pendingNavIntent.current = intent;
    setUnsavedNavOpen(true);
  }

  function finishUnsavedNav(mode: "stay" | "discard" | "apply") {
    if (mode === "stay") {
      setUnsavedNavOpen(false);
      pendingNavIntent.current = null;
      return;
    }
    if (mode === "discard") {
      discardCurrentScope();
    }
    if (mode === "apply") {
      applyCurrentScopeToCustom();
    }
    const intent = pendingNavIntent.current;
    pendingNavIntent.current = null;
    setUnsavedNavOpen(false);
    skipNavGuard.current = true;
    intent?.();
    skipNavGuard.current = false;
  }

  function commitPreviewPage(nextPage: string) {
    setLabMode("editor");
    setPreviewPage(nextPage);
    const page = resolveLabPage(nextPage);
    if (!page) {
      return;
    }
    const sectionId = defaultSectionId(page);
    setPreviewSectionId(sectionId);
    const section = page.sections.find((item) => item.id === sectionId);
    const elementId = section ? defaultElementId(section) : "section";
    setEditorElementId(elementId);
    const element = findElement(section, elementId);
    setLocalColorProperty(
      defaultLocalProperty(
        element?.id === "section" ? "section" : element?.visualTarget,
      ),
    );
    if (element?.visualTarget) {
      setSelectedTarget(element.visualTarget);
    }
    const families = editorFamiliesForSelection(section, element);
    const next = families[0];
    if (next) {
      setLabSection(next === "publication" ? "content" : next);
    }
  }

  function commitPreviewSection(sectionId: string) {
    if (!labPage) {
      return;
    }
    setPreviewSectionId(sectionId);
    const section = labPage.sections.find((item) => item.id === sectionId);
    if (!section) {
      return;
    }
    const elementId = defaultElementId(section);
    setEditorElementId(elementId);
    const element = findElement(section, elementId);
    setLocalColorProperty(
      defaultLocalProperty(
        element?.id === "section" ? "section" : element?.visualTarget,
      ),
    );
    if (element?.visualTarget) {
      setSelectedTarget(element.visualTarget);
    }
    const families = editorFamiliesForSelection(section, element);
    const next = families[0];
    if (next) {
      setLabSection(next === "publication" ? "content" : next);
    }
  }

  function commitEditorElement(id: LabEditorElementId) {
    setEditorElementId(id);
    const element = findElement(resolvedSection, id);
    setLocalColorProperty(
      defaultLocalProperty(
        element?.id === "section" ? "section" : element?.visualTarget,
      ),
    );
    if (element?.visualTarget) {
      setSelectedTarget(element.visualTarget);
    }
    const families = editorFamiliesForSelection(resolvedSection, element);
    const next = families[0];
    if (next) {
      setLabSection(next === "publication" ? "content" : next);
    }
  }

  function adoptPreviewPage(nextPage: string) {
    const page = resolveLabPage(nextPage);
    const sectionId = page ? defaultSectionId(page) : "";
    const section = page?.sections.find((item) => item.id === sectionId);
    const elementId = section ? defaultElementId(section) : "section";
    if (
      labMode === "editor" &&
      previewPage === nextPage &&
      previewSectionId === sectionId &&
      editorElementId === elementId
    ) {
      return;
    }
    requestNavigate(() => commitPreviewPage(nextPage));
  }

  function adoptPreviewSection(sectionId: string) {
    if (!labPage) {
      return;
    }
    const section = labPage.sections.find((item) => item.id === sectionId);
    const elementId = section ? defaultElementId(section) : "section";
    if (
      labMode === "editor" &&
      previewSectionId === sectionId &&
      editorElementId === elementId
    ) {
      return;
    }
    requestNavigate(() => commitPreviewSection(sectionId));
  }

  function adoptEditorElement(id: LabEditorElementId) {
    if (labMode === "editor" && id === editorElementId) {
      commitEditorElement(id);
      return;
    }
    requestNavigate(() => commitEditorElement(id));
  }

  function placeContextMenu(payload: {
    kind?: string;
    media?: boolean;
    clientX?: number;
    clientY?: number;
    pageId?: string;
    sectionId?: string;
    visualTarget?: string;
    itemKey?: string;
  }) {
    if (payload.kind !== "contextmenu") {
      return;
    }
    const frame = iframeRef.current;
    const rect = frame?.getBoundingClientRect();
    const match = findElementForPreview({
      pageId: payload.pageId,
      sectionId: payload.sectionId,
      visualTarget: payload.visualTarget,
      itemKey: payload.itemKey,
    });
    const parent = match?.element.parentId
      ? findElement(match.section, match.element.parentId)
      : null;
    const title = labLabel(
      (parent ?? match?.element)?.label ?? {
        en: payload.visualTarget === "header-logo" ? "Header" : "Target",
        es: payload.visualTarget === "header-logo" ? "Encabezado" : "Destino",
      },
      language,
    );
    setContextMenu({
      x: Math.min(
        (rect?.left ?? 0) + Number(payload.clientX ?? 0),
        window.innerWidth - 240,
      ),
      y: Math.min(
        (rect?.top ?? 0) + Number(payload.clientY ?? 0),
        window.innerHeight - 280,
      ),
      media: Boolean(payload.media),
      title,
      subtitle: payload.media
        ? language === "es"
          ? "Imagen"
          : "Image"
        : language === "es"
          ? "Elemento"
          : "Element",
    });
  }

  function applyPreviewSelection(payload: {
    visualTarget?: string;
    itemKey?: string;
    pageId?: string;
    sectionId?: string;
    media?: boolean;
    kind?: string;
    clientX?: number;
    clientY?: number;
  }) {
    if (payload.visualTarget === "header-logo") {
      const already =
        labMode === "system" &&
        displayedSection === "header" &&
        selectedTarget === "header-logo";
      const go = () => {
        setLabMode("system");
        setLabSection("header");
        setSelectedTarget("header-logo");
        setEditorElementId("header-logo");
        placeContextMenu(payload);
      };
      if (already) {
        go();
        return;
      }
      requestNavigate(go);
      return;
    }
    const match = findElementForPreview({
      pageId: payload.pageId,
      sectionId: payload.sectionId,
      visualTarget: payload.visualTarget,
      itemKey: payload.itemKey,
    });
    if (!match) {
      if (payload.sectionId && payload.pageId) {
        const page = labPages.find((item) => item.id === payload.pageId);
        if (page) {
          const already =
            labMode === "editor" &&
            previewPage === page.path &&
            previewSectionId === payload.sectionId &&
            editorElementId === "section";
          const go = () => {
            setLabMode("editor");
            setPreviewPage(page.path);
            setPreviewSectionId(payload.sectionId ?? "");
            setEditorElementId("section");
            setLocalColorProperty("sectionBackground");
            setLabSection("content");
            placeContextMenu(payload);
          };
          if (already) {
            go();
            return;
          }
          requestNavigate(go);
        }
      }
      return;
    }
    const already =
      labMode === "editor" &&
      previewPage === match.page.path &&
      previewSectionId === match.section.id &&
      editorElementId === match.element.id;
    const go = () => {
      setLabMode("editor");
      setPreviewPage(match.page.path);
      setPreviewSectionId(match.section.id);
      setEditorElementId(match.element.id);
      setLocalColorProperty(
        defaultLocalProperty(
          match.element.id === "section"
            ? "section"
            : match.element.visualTarget,
        ),
      );
      if (match.element.visualTarget) {
        setSelectedTarget(match.element.visualTarget);
      }
      const families = editorFamiliesForSelection(match.section, match.element);
      const next =
        payload.media && families.includes("media")
          ? "media"
          : families[0];
      if (next) {
        setLabSection(next === "publication" ? "content" : next);
      }
      placeContextMenu(payload);
    };
    if (already) {
      go();
      return;
    }
    requestNavigate(go);
  }

  function restoreSelectedMedia(source: "current" | "default") {
    const target = resolvedElement?.visualTarget;
    const itemKey = resolvedElement?.itemKey;
    if (!target) {
      return;
    }
    if (source === "default") {
      if (itemKey) {
        setExperience(updateItemAsset(experience, target, itemKey, "default"));
        return;
      }
      setExperience(
        updateComponentConfig(experience, target, { assetId: "default" }),
      );
      return;
    }
    setExperience(
      applyElementSlice(
        target,
        experience,
        approvedExperienceBaseline,
        itemKey,
      ),
    );
    setCustomExperience(
      applyElementSlice(
        target,
        customExperience,
        approvedExperienceBaseline,
        itemKey,
      ),
    );
  }

  function workingBundle(): LabChangeBundle {
    return {
      theme,
      experience,
      publication,
      content: siteContent,
    };
  }

  function customBundle(): LabChangeBundle {
    return {
      theme: customTheme,
      experience: customExperience,
      publication: customPublication,
      content: customSiteContent,
    };
  }

  function currentBundle(): LabChangeBundle {
    return {
      theme: approvedBaseline,
      experience: approvedExperienceBaseline,
      publication: approvedPublication,
      content: approvedSiteContentBaseline,
    };
  }

  function writeCustomBundle(next: LabChangeBundle) {
    setCustomTheme(pickThemeValues(next.theme));
    setCustomExperience(pickExperienceValues(next.experience));
    setCustomPublication(next.publication);
    setCustomSiteContent(next.content);
    setPreset("custom");
    setSource("custom");
  }

  function writeWorkingBundle(next: LabChangeBundle) {
    setTheme(pickThemeValues(next.theme));
    setExperience(pickExperienceValues(next.experience));
    setPublication(next.publication);
    setSiteContent(next.content);
  }

  function applyAllUnsavedToCustom() {
    const applied = unsavedScopes.length;
    const visual = workingBundle();
    const dirtyCopyIds = dirtyContentFieldIds(
      CONTENT_FIELD_IDS,
      siteContent,
      customSiteContent,
      approvedSiteContentBaseline,
    );
    writeCustomBundle({
      ...visual,
      content:
        dirtyCopyIds.length > 0
          ? applyContentSlice(
              customSiteContent,
              siteContent,
              dirtyCopyIds,
              approvedSiteContentBaseline,
            )
          : customSiteContent,
    });
    if (dirtyCopyIds.length > 0) {
      setSiteContent(clearContentSlice(siteContent, dirtyCopyIds));
    }
    const readyAfter = applied + readyScopes.length;
    setStatusMessage(
      fillCopy(copy.appliedUnsavedSummary, {
        applied,
        ready: readyAfter,
      }),
    );
    setStatusError("");
  }

  function reviewPendingChange(item: PendingCustomScope) {
    setShowPendingPanel(false);
    requestNavigate(() => {
      if (item.nav.mode === "system") {
        setLabMode("system");
        setLabSection(item.nav.labSection);
        if (item.visualTarget) {
          setSelectedTarget(item.visualTarget);
        }
        setInspectorCollapsed(false);
        setInspectorDrawerOpen(true);
        return;
      }
      setLabMode("editor");
      if (item.nav.pagePath) {
        setPreviewPage(item.nav.pagePath);
      }
      if (item.nav.sectionId) {
        setPreviewSectionId(item.nav.sectionId);
      }
      if (item.nav.elementId) {
        setEditorElementId(item.nav.elementId as LabEditorElementId);
      }
      setLabSection(item.nav.labSection);
      if (item.visualTarget) {
        setSelectedTarget(item.visualTarget);
      }
      setInspectorCollapsed(false);
      setInspectorDrawerOpen(true);
    });
  }

  function applyPendingUnsaved(item: PendingCustomScope) {
    if (item.copyFieldIds) {
      const dirtyIds = dirtyContentFieldIds(
        item.copyFieldIds,
        siteContent,
        customSiteContent,
        approvedSiteContentBaseline,
      );
      if (dirtyIds.length > 0) {
        setCustomSiteContent(
          applyContentSlice(
            customSiteContent,
            siteContent,
            dirtyIds,
            approvedSiteContentBaseline,
          ),
        );
      }
      setSiteContent(clearContentSlice(siteContent, item.copyFieldIds));
      setStatusMessage(copy.elementAppliedMessage);
      setStatusError("");
      return;
    }
    writeCustomBundle(applyPendingScope(item, customBundle(), workingBundle()));
    setStatusMessage(copy.elementAppliedMessage);
    setStatusError("");
  }

  function discardPendingUnsaved(item: PendingCustomScope) {
    if (item.copyFieldIds) {
      setSiteContent(clearContentSlice(siteContent, item.copyFieldIds));
      setStatusMessage(copy.elementResetMessage);
      setStatusError("");
      return;
    }
    writeWorkingBundle(applyPendingScope(item, workingBundle(), customBundle()));
    setStatusMessage(copy.elementResetMessage);
    setStatusError("");
  }

  function restorePendingReady(item: PendingCustomScope) {
    writeCustomBundle(applyPendingScope(item, customBundle(), currentBundle()));
    writeWorkingBundle(applyPendingScope(item, workingBundle(), currentBundle()));
    if (item.copyFieldIds) {
      setSiteContent(clearContentSlice(siteContent, item.copyFieldIds));
    }
    setStatusMessage(copy.restoreCurrent);
    setStatusError("");
  }

  async function publishPendingReady(item: PendingCustomScope) {
    setSaving(true);
    setStatusMessage("");
    setStatusError("");
    try {
      if (item.copyFieldIds) {
        const saved = await writeCurrentContent(
          publishContentSlice(
            approvedSiteContentBaseline,
            customSiteContent,
            item.copyFieldIds,
          ),
        );
        setCustomSiteContent(
          restoreContentSlice(customSiteContent, saved, item.copyFieldIds),
        );
        setSiteContent(clearContentSlice(siteContent, item.copyFieldIds));
        setStatusMessage(copy.promotedToCurrent);
        return;
      }
      if (item.kind === "section" && item.domain === "content" && item.pageId && item.sectionId) {
        const publication = mergeSectionPublicationIntoCurrent(
          approvedPublication,
          customPublication,
          item.pageId,
          item.sectionId,
        );
        const saved = await writeCurrentPublication(publication);
        setCustomPublication(
          setPageSectionEnabled(
            customPublication,
            item.pageId,
            item.sectionId,
            resolvePageSectionFlag(saved, item.pageId, item.sectionId),
          ),
        );
        setPublication(
          setPageSectionEnabled(
            publication,
            item.pageId,
            item.sectionId,
            resolvePageSectionFlag(saved, item.pageId, item.sectionId),
          ),
        );
        setStatusMessage(copy.promotedToCurrent);
        return;
      }
      if (item.family && isLabStagedSection(item.family)) {
        const merged = mergeSystemFamilyIntoCurrent(
          item.family,
          approvedBaseline,
          approvedExperienceBaseline,
          customTheme,
          customExperience,
        );
        const saved = await writeCurrentVisual(merged.theme, merged.experience);
        const customNext = applyLabSectionSlice(
          item.family,
          customTheme,
          customExperience,
          saved.theme,
          saved.experience,
        );
        const live = applyLabSectionSlice(
          item.family,
          theme,
          experience,
          saved.theme,
          saved.experience,
        );
        setCustomTheme(customNext.theme);
        setCustomExperience(customNext.experience);
        setTheme(live.theme);
        setExperience(live.experience);
        setStatusMessage(copy.promotedToCurrent);
        return;
      }
      if (item.visualTarget) {
        const merged = mergeElementIntoCurrent(
          approvedBaseline,
          approvedExperienceBaseline,
          customExperience,
          item.visualTarget,
          item.itemKey,
        );
        const saved = await writeCurrentVisual(merged.theme, merged.experience);
        setCustomExperience(
          promoteElementExperience(
            item.visualTarget,
            customExperience,
            saved.experience,
            item.itemKey,
          ),
        );
        setExperience(
          promoteElementExperience(
            item.visualTarget,
            experience,
            saved.experience,
            item.itemKey,
          ),
        );
        setStatusMessage(copy.promotedToCurrent);
        return;
      }
      if (item.pageId && item.id.startsWith("page-color:")) {
        const mergedExperience = pickExperienceValues({
          ...approvedExperienceBaseline,
          scopedColors: copyPageScopedColor(
            item.pageId,
            approvedExperienceBaseline.scopedColors,
            customExperience.scopedColors,
          ),
        });
        const saved = await writeCurrentVisual(approvedBaseline, mergedExperience);
        setCustomExperience(
          pickExperienceValues({
            ...customExperience,
            scopedColors: copyPageScopedColor(
              item.pageId,
              customExperience.scopedColors,
              saved.experience.scopedColors,
            ),
          }),
        );
        setExperience(
          pickExperienceValues({
            ...experience,
            scopedColors: copyPageScopedColor(
              item.pageId,
              experience.scopedColors,
              saved.experience.scopedColors,
            ),
          }),
        );
        setStatusMessage(copy.promotedToCurrent);
        return;
      }
      if (item.pageId && item.sectionId && item.id.startsWith("section-color:")) {
        const mergedExperience = pickExperienceValues({
          ...approvedExperienceBaseline,
          scopedColors: copySectionScopedColor(
            item.pageId,
            item.sectionId,
            approvedExperienceBaseline.scopedColors,
            customExperience.scopedColors,
          ),
        });
        const saved = await writeCurrentVisual(approvedBaseline, mergedExperience);
        setCustomExperience(
          pickExperienceValues({
            ...customExperience,
            scopedColors: copySectionScopedColor(
              item.pageId,
              item.sectionId,
              customExperience.scopedColors,
              saved.experience.scopedColors,
            ),
          }),
        );
        setExperience(
          pickExperienceValues({
            ...experience,
            scopedColors: copySectionScopedColor(
              item.pageId,
              item.sectionId,
              experience.scopedColors,
              saved.experience.scopedColors,
            ),
          }),
        );
        setStatusMessage(copy.promotedToCurrent);
      }
    } catch {
      setStatusError(copy.applyFailed);
    } finally {
      setSaving(false);
    }
  }

  async function applyAndPublishAll() {
    const snapshot = workingBundle();
    applyAllUnsavedToCustom();
    await applyCustomAsCurrent(snapshot);
  }

  function handleContextMenuAction(action: LabContextMenuAction) {
    setContextMenu(null);
    if (action === "change-image") {
      setLabSection("media");
      setInspectorCollapsed(false);
      setInspectorDrawerOpen(true);
      setGalleryNonce((value) => value + 1);
      setChangeImageSignal((value) => value + 1);
      return;
    }
    if (action === "position" || action === "free-pan") {
      setLabSection(
        resolvedElement?.families.includes("position") ? "position" : "media",
      );
      setInspectorCollapsed(false);
      setInspectorDrawerOpen(true);
      if (action === "free-pan") {
        window.setTimeout(() => {
          const node = document.getElementById("lab-free-pan");
          node?.scrollIntoView({ block: "nearest" });
          const input = document.getElementById("service-card-pan-x");
          if (input instanceof HTMLInputElement) {
            input.focus();
          }
        }, 80);
      }
      return;
    }
    if (action === "restore-current") {
      restoreSelectedMedia("current");
      return;
    }
    if (action === "restore-default") {
      restoreSelectedMedia("default");
      return;
    }
    if (action === "open-inspector") {
      setInspectorCollapsed(false);
      setInspectorDrawerOpen(true);
      return;
    }
    if (action === "advanced") {
      setLabSection("media");
      setInspectorCollapsed(false);
      setInspectorDrawerOpen(true);
      window.setTimeout(() => {
        const node = document.getElementById("lab-media-advanced");
        if (node instanceof HTMLDetailsElement) {
          node.open = true;
          node.scrollIntoView({ block: "nearest" });
        }
      }, 80);
    }
  }

  function closeLabDrawers() {
    setNavDrawerOpen(false);
    setInspectorDrawerOpen(false);
  }

  function selectLabFamily(id: LabSectionId) {
    setLabSection(id);
    if (id === "header") {
      setSelectedTarget("header-logo");
    } else if (id === "containers" && labMode === "system") {
      setSelectedTarget("editorial-cards");
    } else if (resolvedElement?.visualTarget) {
      setSelectedTarget(resolvedElement.visualTarget);
    }
  }

  function updateTheme<K extends keyof ThemeValues>(key: K, value: ThemeValues[K]) {
    setStatusMessage("");
    setStatusError("");
    setPreset("custom");
    setSource("custom");
    setTheme((current) => ({ ...current, [key]: value }));
  }

  function updateExperience(next: ExperienceValues) {
    setStatusMessage("");
    setStatusError("");
    setPreset("custom");
    setSource("custom");
    setExperience(next);
  }

  function previewSamplerColor(hex: string) {
    const target = colorApplyTarget;
    const parsed = parseHexColorInput(hex);
    if (!parsed) {
      return;
    }
    setStatusMessage("");
    setStatusError("");
    setPreset("custom");
    setSource("custom");

    if (target.kind === "system" && target.themeKey) {
      const key = target.themeKey;
      setTheme((current) => ({ ...current, [key]: parsed }));
      return;
    }

    if (target.kind === "page" && target.pageId) {
      setExperience(
        pickExperienceValues({
          ...experience,
          scopedColors: setPageScopedColor(
            experience.scopedColors,
            target.pageId,
            parsed,
          ),
        }),
      );
      return;
    }

    if (target.kind === "section" && target.pageId && target.sectionId) {
      setExperience(
        pickExperienceValues({
          ...experience,
          scopedColors: setSectionScopedColor(
            experience.scopedColors,
            target.pageId,
            target.sectionId,
            parsed,
          ),
        }),
      );
      return;
    }

    if (target.kind === "element" && target.elementId) {
      setExperience(
        pickExperienceValues({
          ...experience,
          scopedColors: setElementScopedColor(
            experience.scopedColors,
            target.elementId,
            parsed,
          ),
        }),
      );
    }
  }

  function applySamplerColor() {
    const target = colorApplyTarget;
    setStatusMessage("");
    setStatusError("");
    setPreset("custom");
    setSource("custom");

    if (target.kind === "system" && target.themeKey) {
      const hex = theme[target.themeKey];
      if (typeof hex !== "string" || !parseHexColorInput(hex)) {
        return;
      }
      setCustomTheme(
        pickThemeValues({ ...customTheme, [target.themeKey]: hex }),
      );
      setStatusMessage(copy.sectionAppliedMessage);
      return;
    }

    if (target.kind === "page" && target.pageId) {
      setCustomExperience(
        pickExperienceValues({
          ...customExperience,
          scopedColors: copyPageScopedColor(
            target.pageId,
            customExperience.scopedColors,
            experience.scopedColors,
          ),
        }),
      );
      setStatusMessage(copy.sectionAppliedMessage);
      return;
    }

    if (target.kind === "section" && target.pageId && target.sectionId) {
      setCustomExperience(
        pickExperienceValues({
          ...customExperience,
          scopedColors: copySectionScopedColor(
            target.pageId,
            target.sectionId,
            customExperience.scopedColors,
            experience.scopedColors,
          ),
        }),
      );
      setStatusMessage(copy.sectionAppliedMessage);
      return;
    }

    if (target.kind === "element" && target.elementId) {
      setCustomExperience(
        pickExperienceValues({
          ...customExperience,
          scopedColors: copyElementScopedColor(
            target.elementId,
            customExperience.scopedColors,
            experience.scopedColors,
          ),
        }),
      );
      setStatusMessage(copy.elementAppliedMessage);
    }
  }

  function selectSource(id: LabSourceId) {
    if (id === "custom") {
      setSource("custom");
      setPreset("custom");
      return;
    }
    if (unsaved || hasStagedCustom) {
      setPendingConfirm(
        id === "factory"
          ? "load-factory"
          : id === "current"
            ? "load-current"
            : id === "designer"
              ? "load-designer"
              : "load-inspired",
      );
      return;
    }
    if (id === "factory") loadFactory();
    else if (id === "current") loadCurrent();
    else if (id === "designer") loadDesigner();
    else loadInspired();
  }

  async function copyTheme() {
    const payload: ThemeConfigSnapshot = {
      preset,
      ...pickThemeValues(theme),
    };
    await navigator.clipboard.writeText(`${JSON.stringify(payload, null, 2)}\n`);
    setCopyState(copy.copied);
    window.setTimeout(() => setCopyState(copy.copyTheme), 1600);
  }

  async function copyExperienceConfig() {
    await navigator.clipboard.writeText(
      `${JSON.stringify(pickExperienceValues(experience), null, 2)}\n`,
    );
    setCopyExperienceState(copy.copied);
    window.setTimeout(() => setCopyExperienceState(copy.copyExperience), 1600);
  }

  async function applyCustomAsCurrent(overrides?: LabChangeBundle) {
    setSaving(true);
    setStatusMessage("");
    setStatusError("");

    const publishTheme = pickThemeValues(overrides?.theme ?? customTheme);
    const publishExperience = pickExperienceValues(
      overrides?.experience ?? customExperience,
    );
    const publishPublication = overrides?.publication ?? customPublication;
    const publishContent = overrides?.content ?? customSiteContent;
    const keepWorking =
      !overrides &&
      (!themeValuesEqual(theme, customTheme) ||
        !experienceValuesEqual(experience, customExperience) ||
        !contentPublicationEqual(publication, customPublication) ||
        !contentSliceEqual(
          CONTENT_FIELD_IDS,
          siteContent,
          customSiteContent,
        ));

    try {
      const visualChanged =
        !themeValuesEqual(publishTheme, approvedBaseline) ||
        !experienceValuesEqual(publishExperience, approvedExperienceBaseline);
      const publicationChanged = !contentPublicationEqual(
        publishPublication,
        approvedPublication,
      );
      const copyChanged = !contentSliceEqual(
        CONTENT_FIELD_IDS,
        publishContent,
        approvedSiteContentBaseline,
      );

      if (visualChanged) {
        const response = await fetch(VISUAL_APPLY_PATH, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            theme: publishTheme,
            experience: publishExperience,
          }),
        });
        const result = (await response.json()) as {
          ok?: boolean;
          theme?: ThemeValues;
          version?: string;
          experience?: ExperienceValues;
          error?: string;
        };

        if (!response.ok || !result.ok || !result.theme || !result.experience) {
          setStatusError(result.error || copy.applyFailed);
          return false;
        }

        const savedTheme = pickThemeValues(result.theme);
        const savedExperience = pickExperienceValues(result.experience);
        setCustomTheme(savedTheme);
        setCustomExperience(savedExperience);
        setApprovedBaseline(savedTheme);
        setApprovedExperienceBaseline(savedExperience);
        if (!keepWorking) {
          setTheme(savedTheme);
          setExperience(savedExperience);
        }
        if (result.version) {
          setApprovedVersion(result.version);
        }
      }

      if (publicationChanged) {
        const publicationResponse = await fetch(PUBLICATION_APPLY_PATH, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publication: pickContentPublicationPatch(publishPublication),
          }),
        });
        const publicationResult = (await publicationResponse.json()) as {
          ok?: boolean;
          publication?: ContentPublicationPatch;
          error?: string;
        };
        if (
          !publicationResponse.ok ||
          !publicationResult.ok ||
          !publicationResult.publication
        ) {
          setStatusError(publicationResult.error || copy.applyFailed);
          return false;
        }
        const savedPublication = pickContentPublicationPatch(
          publicationResult.publication,
        );
        setCustomPublication(savedPublication);
        setApprovedPublication(savedPublication);
        if (!keepWorking) {
          setPublication(savedPublication);
        }
      }

      if (copyChanged) {
        const savedContent = await writeCurrentContent(
          publishContentSlice(
            approvedSiteContentBaseline,
            publishContent,
            CONTENT_FIELD_IDS,
          ),
        );
        setCustomSiteContent(pickSiteContentPatch(savedContent));
        if (!keepWorking) {
          setSiteContent({});
        }
      }

      if (visualChanged || publicationChanged || copyChanged) {
        if (!keepWorking) {
          setSource("current");
        }
        setStatusMessage(copy.allCustomPromoted);
      }
      return true;
    } catch {
      setStatusError(copy.applyFailed);
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function writeCurrentVisual(nextTheme: ThemeValues, nextExperience: ExperienceValues) {
    const response = await fetch(VISUAL_APPLY_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        theme: pickThemeValues(nextTheme),
        experience: pickExperienceValues(nextExperience),
      }),
    });
    const result = (await response.json()) as {
      ok?: boolean;
      theme?: ThemeValues;
      version?: string;
      experience?: ExperienceValues;
      error?: string;
    };
    if (!response.ok || !result.ok || !result.theme || !result.experience) {
      throw new Error(result.error || copy.applyFailed);
    }
    const savedTheme = pickThemeValues(result.theme);
    const savedExperience = pickExperienceValues(result.experience);
    setApprovedBaseline(savedTheme);
    setApprovedExperienceBaseline(savedExperience);
    if (result.version) {
      setApprovedVersion(result.version);
    }
    return { theme: savedTheme, experience: savedExperience };
  }

  async function writeCurrentPublication(nextPublication: ContentPublicationPatch) {
    const publicationResponse = await fetch(PUBLICATION_APPLY_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        publication: pickContentPublicationPatch(nextPublication),
      }),
    });
    const publicationResult = (await publicationResponse.json()) as {
      ok?: boolean;
      publication?: ContentPublicationPatch;
      error?: string;
    };
    if (
      !publicationResponse.ok ||
      !publicationResult.ok ||
      !publicationResult.publication
    ) {
      throw new Error(publicationResult.error || copy.applyFailed);
    }
    const savedPublication = pickContentPublicationPatch(
      publicationResult.publication,
    );
    setApprovedPublication(savedPublication);
    return savedPublication;
  }

  async function writeCurrentContent(nextContent: SiteContentPatch) {
    const contentResponse = await fetch(CONTENT_APPLY_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: pickSiteContentPatch(nextContent),
      }),
    });
    const contentResult = (await contentResponse.json()) as {
      ok?: boolean;
      content?: SiteContentPatch;
      error?: string;
    };
    if (!contentResponse.ok || !contentResult.ok || !contentResult.content) {
      throw new Error(contentResult.error || copy.applyFailed);
    }
    const savedContent = pickSiteContentPatch(contentResult.content);
    setApprovedSiteContentBaseline(savedContent);
    return savedContent;
  }

  async function publishCopyToCurrent() {
    if (selectedCopyFields.length === 0 || copyUnsaved || !copyReadyToPublish) {
      return;
    }
    setSaving(true);
    setStatusMessage("");
    setStatusError("");
    try {
      const saved = await writeCurrentContent(
        publishContentSlice(
          approvedSiteContentBaseline,
          customSiteContent,
          selectedCopyFields,
        ),
      );
      setCustomSiteContent(
        restoreContentSlice(customSiteContent, saved, selectedCopyFields),
      );
      setSiteContent(clearContentSlice(siteContent, selectedCopyFields));
      setStatusMessage(copy.promotedToCurrent);
    } catch {
      setStatusError(copy.applyFailed);
    } finally {
      setSaving(false);
    }
  }

  async function promoteElementToCurrent() {
    const target = resolvedElement?.visualTarget;
    if (!target) {
      return;
    }
    setSaving(true);
    setStatusMessage("");
    setStatusError("");
    try {
      const merged = mergeElementIntoCurrent(
        approvedBaseline,
        approvedExperienceBaseline,
        customExperience,
        target,
        resolvedElement?.itemKey,
      );
      const saved = await writeCurrentVisual(merged.theme, merged.experience);
      setCustomExperience(
        promoteElementExperience(
          target,
          customExperience,
          saved.experience,
          resolvedElement?.itemKey,
        ),
      );
      setExperience(
        promoteElementExperience(
          target,
          experience,
          saved.experience,
          resolvedElement?.itemKey,
        ),
      );
      setStatusMessage(copy.promotedToCurrent);
    } catch {
      setStatusError(copy.applyFailed);
    } finally {
      setSaving(false);
    }
  }

  async function promoteSectionToCurrent() {
    if (!labPage || !resolvedSection) {
      return;
    }
    setSaving(true);
    setStatusMessage("");
    setStatusError("");
    try {
      const visual = mergeSectionVisualIntoCurrent(
        approvedBaseline,
        approvedExperienceBaseline,
        customExperience,
        resolvedSection,
        labPage.id,
      );
      const visualChanged =
        !themeValuesEqual(visual.theme, approvedBaseline) ||
        !experienceValuesEqual(visual.experience, approvedExperienceBaseline);
      if (visualChanged) {
        const saved = await writeCurrentVisual(visual.theme, visual.experience);
        let nextCustom = customExperience;
        let nextLive = experience;
        for (const element of resolvedSection.elements) {
          if (element.visualTarget) {
            nextCustom = promoteElementExperience(
              element.visualTarget,
              nextCustom,
              saved.experience,
              element.itemKey,
            );
            nextLive = promoteElementExperience(
              element.visualTarget,
              nextLive,
              saved.experience,
              element.itemKey,
            );
          }
        }
        nextCustom = pickExperienceValues({
          ...nextCustom,
          scopedColors: copySectionScopedColor(
            labPage.id,
            resolvedSection.id,
            nextCustom.scopedColors,
            saved.experience.scopedColors,
          ),
        });
        nextLive = pickExperienceValues({
          ...nextLive,
          scopedColors: copySectionScopedColor(
            labPage.id,
            resolvedSection.id,
            nextLive.scopedColors,
            saved.experience.scopedColors,
          ),
        });
        setCustomExperience(nextCustom);
        setExperience(nextLive);
      }
      const publication = mergeSectionPublicationIntoCurrent(
        approvedPublication,
        customPublication,
        labPage.id,
        resolvedSection.id,
      );
      if (!contentPublicationEqual(publication, approvedPublication)) {
        const savedPublication = await writeCurrentPublication(publication);
        setCustomPublication(
          setPageSectionEnabled(
            customPublication,
            labPage.id,
            resolvedSection.id,
            resolvePageSectionFlag(savedPublication, labPage.id, resolvedSection.id),
          ),
        );
        setPublication(
          setPageSectionEnabled(
            publication,
            labPage.id,
            resolvedSection.id,
            resolvePageSectionFlag(savedPublication, labPage.id, resolvedSection.id),
          ),
        );
      }
      setStatusMessage(copy.promotedToCurrent);
    } catch {
      setStatusError(copy.applyFailed);
    } finally {
      setSaving(false);
    }
  }

  async function promoteSystemFamilyToCurrent() {
    if (!isLabStagedSection(displayedSection)) {
      return;
    }
    const family = displayedSection;
    setSaving(true);
    setStatusMessage("");
    setStatusError("");
    try {
      const merged = mergeSystemFamilyIntoCurrent(
        family,
        approvedBaseline,
        approvedExperienceBaseline,
        customTheme,
        customExperience,
      );
      const saved = await writeCurrentVisual(merged.theme, merged.experience);
      if (family === "containers") {
        setCustomExperience(
          applyElementSlice("editorial-cards", customExperience, saved.experience),
        );
        setExperience(
          applyElementSlice("editorial-cards", experience, saved.experience),
        );
      } else {
        const customNext = applyLabSectionSlice(
          family,
          customTheme,
          customExperience,
          saved.theme,
          saved.experience,
        );
        const live = applyLabSectionSlice(
          family,
          theme,
          experience,
          saved.theme,
          saved.experience,
        );
        setCustomTheme(customNext.theme);
        setCustomExperience(customNext.experience);
        setTheme(live.theme);
        setExperience(live.experience);
      }
      setStatusMessage(copy.promotedToCurrent);
    } catch {
      setStatusError(copy.applyFailed);
    } finally {
      setSaving(false);
    }
  }

  function requestPromote(kind: LabConfirmKind, path: string) {
    setConfirmPath(path);
    setPendingConfirm(kind);
  }

  function confirmPending() {
    if (pendingConfirm === "undo") undoUnsaved();
    else if (pendingConfirm === "load-current") loadCurrent();
    else if (pendingConfirm === "load-factory") loadFactory();
    else if (pendingConfirm === "load-inspired") loadInspired();
    else if (pendingConfirm === "load-designer") loadDesigner();
    else if (pendingConfirm === "reset-all") resetAllToCurrent();
    else if (pendingConfirm === "apply") void applyCustomAsCurrent();
    else if (pendingConfirm === "promote-element") void promoteElementToCurrent();
    else if (pendingConfirm === "promote-section") void promoteSectionToCurrent();
    else if (pendingConfirm === "promote-system") void promoteSystemFamilyToCurrent();
    else if (pendingConfirm === "promote-copy") void publishCopyToCurrent();
    else if (pendingConfirm === "apply-copy-warning") applyCopyToCustom();
    else if (pendingConfirm === "apply-publish-all") void applyAndPublishAll();
    setPendingConfirm(null);
  }

  const previewWidth = useMemo(() => {
    const selected = previewViewports.find((item) => item.id === viewport);
    return selected?.width ?? "100%";
  }, [viewport]);

  const fallbackTheme = colorFallbackTheme(source, basePreset, theme);
  const colorGroups = ["Brand", "Surfaces", "Text", "Structure"] as const;
  const colorGroupLabel: Record<(typeof colorGroups)[number], string> = {
    Brand: copy.colorsBrand,
    Surfaces: copy.colorsSurfaces,
    Text: copy.colorsText,
    Structure: copy.colorsStructure,
  };
  const dialog = pendingConfirm
    ? confirmText(pendingConfirm, copy, confirmPath, {
        unsaved: unsavedScopes.length,
        ready: readyScopes.length,
      })
    : null;
  const sourceLabel: Record<LabSourceId, string> = {
    factory: copy.factory,
    current: copy.current,
    designer: copy.designer,
    inspired: copy.inspired,
    custom: copy.custom,
  };

  useEffect(() => {
    previewSelectRef.current = applyPreviewSelection;
    mediaPanRef.current = (payload) => {
      const visualTarget = payload.visualTarget as VisualTargetId | undefined;
      const itemKey = payload.itemKey;
      if (!isPerItemMediaTarget(visualTarget) || !itemKey) {
        return;
      }
      if (
        typeof payload.panX !== "number" ||
        typeof payload.panY !== "number"
      ) {
        return;
      }
      setExperience((current) =>
        updateItemMedia(current, visualTarget, itemKey, {
          panX: payload.panX,
          panY: payload.panY,
        }),
      );
    };
  });

  return (
    <LabUiProvider language={language}>
    <ThemeLabShell
      navCollapsed={navCollapsed}
      inspectorCollapsed={inspectorCollapsed}
      navDrawerOpen={navDrawerOpen}
      inspectorDrawerOpen={inspectorDrawerOpen}
      onToggleNav={() => setNavCollapsed((value) => !value)}
      onToggleInspector={() => setInspectorCollapsed((value) => !value)}
      onOpenNavDrawer={() => setNavDrawerOpen(true)}
      onOpenInspectorDrawer={() => setInspectorDrawerOpen(true)}
      onCloseDrawers={closeLabDrawers}
      language={language}
      nav={
        <>
          <div className="space-y-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cyan-400">
              {copy.labTitle}
            </p>
            <div className="flex flex-wrap gap-1">
              <span
                title={copy.factoryHint}
                className="rounded border border-zinc-700 px-1.5 py-0.5 text-[0.65rem] text-zinc-400"
              >
                Factory 🔒
              </span>
              <span
                title={`${copy.currentHint} ${approvedVersion}`}
                className="rounded border border-zinc-700 px-1.5 py-0.5 text-[0.65rem] text-zinc-300"
              >
                Current ✓
              </span>
            </div>
            <fieldset className="min-w-0">
              <legend className="sr-only">{copy.language}</legend>
              <div className="grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => setLanguage("es")}
                  className={`min-h-9 rounded-md border px-2 text-[0.7rem] ${
                    language === "es"
                      ? "border-cyan-400 bg-cyan-400/10 text-white"
                      : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
                  }`}
                >
                  {copy.spanish}
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`min-h-9 rounded-md border px-2 text-[0.7rem] ${
                    language === "en"
                      ? "border-cyan-400 bg-cyan-400/10 text-white"
                      : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
                  }`}
                >
                  {copy.english}
                </button>
              </div>
            </fieldset>
          </div>

          <div className="mt-5">
            <button
              type="button"
              onClick={() => {
                requestNavigate(() => {
                  setLabMode("system");
                  setLabSection("brand");
                  closeLabDrawers();
                });
              }}
              className={labNavClass(labMode === "system")}
            >
              {copy.systemMode}
              <LabStatusDots
                unsaved={unsavedScopes.some((item) => item.nav.mode === "system")}
                ready={readyScopes.some((item) => item.nav.mode === "system")}
                onUnsaved={() => {
                  const item = unsavedScopes.find((entry) => entry.nav.mode === "system");
                  if (item) reviewPendingChange(item);
                }}
                onReady={() => {
                  const item = readyScopes.find((entry) => entry.nav.mode === "system");
                  if (item) reviewPendingChange(item);
                }}
              />
            </button>
          </div>

          <div className="mt-5 space-y-1">
            <p className="px-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-500">
              {language === "es" ? "Páginas" : "Pages"}
            </p>
            {labPages.map((page) => {
              const pageActive =
                labMode === "editor" && labPage?.id === page.id;
              return (
                <div key={page.id}>
                  <button
                    type="button"
                    onClick={() => {
                      adoptPreviewPage(page.path);
                      closeLabDrawers();
                    }}
                    className={labNavClass(pageActive)}
                  >
                    {labLabel(page.label, language)}
                    <LabStatusDots
                      unsaved={unsavedScopes.some((item) => item.nav.pageId === page.id)}
                      ready={readyScopes.some((item) => item.nav.pageId === page.id)}
                      onUnsaved={() => {
                        const item = unsavedScopes.find((entry) => entry.nav.pageId === page.id);
                        if (item) reviewPendingChange(item);
                      }}
                      onReady={() => {
                        const item = readyScopes.find((entry) => entry.nav.pageId === page.id);
                        if (item) reviewPendingChange(item);
                      }}
                    />
                  </button>
                  {pageActive ? (
                    <div className="ml-2 mt-1 space-y-1 border-l border-zinc-800 pl-2">
                      {page.sections.map((section) => {
                        const sectionActive =
                          resolvedSection?.id === section.id;
                        return (
                          <div key={section.id}>
                            <button
                              type="button"
                              onClick={() => {
                                adoptPreviewSection(section.id);
                                closeLabDrawers();
                              }}
                              className={labNavClass(sectionActive)}
                            >
                              {labLabel(section.label, language)}
                              <LabStatusDots
                                unsaved={unsavedScopes.some(
                                  (item) =>
                                    item.nav.pageId === page.id &&
                                    item.nav.sectionId === section.id,
                                )}
                                ready={readyScopes.some(
                                  (item) =>
                                    item.nav.pageId === page.id &&
                                    item.nav.sectionId === section.id,
                                )}
                                onUnsaved={() => {
                                  const item = unsavedScopes.find(
                                    (entry) =>
                                      entry.nav.pageId === page.id &&
                                      entry.nav.sectionId === section.id,
                                  );
                                  if (item) reviewPendingChange(item);
                                }}
                                onReady={() => {
                                  const item = readyScopes.find(
                                    (entry) =>
                                      entry.nav.pageId === page.id &&
                                      entry.nav.sectionId === section.id,
                                  );
                                  if (item) reviewPendingChange(item);
                                }}
                              />
                            </button>
                            {sectionActive ? (
                              <div className="ml-2 mt-1 space-y-1 border-l border-zinc-800 pl-2">
                                {rootElementsForSection(section).map((element) => {
                                  const children = childElementsFor(
                                    section,
                                    element.id,
                                  );
                                  const elementIds = new Set([
                                    element.id,
                                    ...children.map((child) => child.id),
                                  ]);
                                  const matchesElement = (item: PendingCustomScope) =>
                                    Boolean(
                                      item.nav.elementId &&
                                        elementIds.has(
                                          item.nav.elementId as LabEditorElementId,
                                        ),
                                    );
                                  return (
                                    <div key={element.id}>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          adoptEditorElement(element.id);
                                          closeLabDrawers();
                                        }}
                                        className={labNavClass(
                                          resolvedElement?.id === element.id,
                                        )}
                                      >
                                        {element.id === "section"
                                          ? copy.sectionItself
                                          : labLabel(element.label, language)}
                                        <LabStatusDots
                                          unsaved={unsavedScopes.some(matchesElement)}
                                          ready={readyScopes.some(matchesElement)}
                                          onUnsaved={() => {
                                            const item = unsavedScopes.find(matchesElement);
                                            if (item) reviewPendingChange(item);
                                          }}
                                          onReady={() => {
                                            const item = readyScopes.find(matchesElement);
                                            if (item) reviewPendingChange(item);
                                          }}
                                        />
                                      </button>
                                      {children.length > 0 ? (
                                        <div className="ml-2 mt-1 space-y-1 border-l border-zinc-800 pl-2">
                                          {children.map((child) => {
                                            const matchesChild = (item: PendingCustomScope) =>
                                              item.nav.elementId === child.id;
                                            return (
                                            <button
                                              key={child.id}
                                              type="button"
                                              onClick={() => {
                                                adoptEditorElement(child.id);
                                                closeLabDrawers();
                                              }}
                                              className={labNavClass(
                                                resolvedElement?.id === child.id,
                                              )}
                                            >
                                              {labLabel(child.label, language)}
                                              <LabStatusDots
                                                unsaved={unsavedScopes.some(matchesChild)}
                                                ready={readyScopes.some(matchesChild)}
                                                onUnsaved={() => {
                                                  const item = unsavedScopes.find(matchesChild);
                                                  if (item) reviewPendingChange(item);
                                                }}
                                                onReady={() => {
                                                  const item = readyScopes.find(matchesChild);
                                                  if (item) reviewPendingChange(item);
                                                }}
                                              />
                                            </button>
                                            );
                                          })}
                                        </div>
                                      ) : null}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-6 space-y-1 border-t border-zinc-800 pt-4">
            <p className="px-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-600">
              {language === "es" ? "Gobernanza" : "Governance"}
            </p>
            <button
              type="button"
              onClick={() => {
                requestNavigate(() => {
                  setLabMode("approval");
                  closeLabDrawers();
                });
              }}
              className={labNavClass(labMode === "approval")}
            >
              {copy.approvalMode}
            </button>
            <button
              type="button"
              onClick={() => {
                requestNavigate(() => {
                  setLabMode("recovery");
                  closeLabDrawers();
                });
              }}
              className={labNavClass(labMode === "recovery")}
            >
              {copy.recoveryMode}
            </button>
          </div>
        </>
      }
      previewToolbar={
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <label className="flex min-w-0 items-center gap-2 text-sm" htmlFor="theme-preview-page">
            <span className="text-zinc-400">{copy.previewPage}</span>
            <select
              id="theme-preview-page"
              value={previewPage}
              onChange={(event) => adoptPreviewPage(event.target.value)}
              className="min-h-9 min-w-0 max-w-full rounded-md border border-zinc-700 bg-zinc-900 px-2 text-sm text-zinc-100"
            >
              <optgroup label={language === "es" ? "Páginas" : "Pages"}>
                {previewPages.map((item) => (
                  <option key={item.path} value={item.path}>
                    {labPageLabels[language][item.path]}
                  </option>
                ))}
              </optgroup>
              <optgroup label={language === "es" ? "Categorías" : "Categories"}>
                {getManagedCategories().map((category) => (
                  <option
                    key={category.slug}
                    value={`/services/${category.slug}`}
                  >
                    {category.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label={language === "es" ? "Tratamientos" : "Treatments"}>
                {getManagedCategories().flatMap((category) =>
                  getManagedTreatmentsByCategory(category.slug).map((treatment) => (
                    <option
                      key={`${treatment.categorySlug}/${treatment.slug}`}
                      value={`/services/${treatment.categorySlug}/${treatment.slug}`}
                    >
                      {treatment.title}
                    </option>
                  )),
                )}
              </optgroup>
            </select>
          </label>
          <LabControlHelp id="preview-page" compact />
          {labMode === "editor" ? (
            <button
              type="button"
              role="switch"
              aria-checked={isolateSection}
              onClick={() =>
                requestNavigate(() => setIsolateSection((on) => !on))
              }
              className={`min-h-9 rounded-md border px-2 text-[0.7rem] ${
                isolateSection
                  ? "border-cyan-400 bg-cyan-400/10 text-white"
                  : "border-zinc-700 text-zinc-200 hover:border-zinc-500"
              }`}
            >
              {copy.isolateSection}
            </button>
          ) : null}
          <fieldset className="ml-auto flex min-w-0 flex-wrap items-center gap-1">
            <legend className="sr-only">{copy.viewport}</legend>
            <span className="text-[0.7rem] text-zinc-400">{copy.viewport}</span>
            {previewViewports.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setViewport(item.id)}
                className={`min-h-9 rounded-md border px-2 text-[0.7rem] ${
                  viewport === item.id
                    ? "border-cyan-400 bg-cyan-400/10 text-white"
                    : "border-zinc-700 text-zinc-200 hover:border-zinc-500"
                }`}
              >
                {viewportLabel(item.id, copy)}
              </button>
            ))}
          </fieldset>
          <LabControlHelp id="viewport" compact />
        </div>
      }
      preview={
        <LabPreviewStage width={previewWidth}>
          <iframe
            ref={iframeRef}
            title={`WCDA preview: ${previewPage}`}
            src={createPreviewSrc(previewPage)}
            className="h-full min-h-[32rem] w-full border-0 bg-white"
            onLoad={() => {
              postTheme();
              postLabFocus();
            }}
          />
        </LabPreviewStage>
      }
      inspectorHeader={
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {copy.editing}
              </p>
              <p className="mt-1 text-sm leading-snug text-zinc-100">
                {labMode === "editor"
                  ? editorPath
                  : labMode === "system"
                    ? `${copy.systemMode} / ${sectionLabel(displayedSection, copy)}`
                    : labMode === "approval"
                      ? copy.approvalMode
                      : copy.recoveryMode}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowGuide((open) => !open)}
              aria-pressed={showGuide}
              className={`min-h-9 shrink-0 rounded-md border px-2 text-[0.7rem] ${
                showGuide
                  ? "border-cyan-400 bg-cyan-400/10 text-white"
                  : "border-zinc-700 text-zinc-200 hover:border-zinc-500"
              }`}
            >
              {language === "es" ? "Ayuda" : "Help"}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowPendingPanel(true)}
            className="w-full rounded-md border border-zinc-800 bg-zinc-900/80 px-2 py-1.5 text-left text-[0.7rem]"
          >
            {unsavedScopes.length === 0 && readyScopes.length === 0 ? (
              <span className="text-emerald-300">
                🟢 {copy.publishedStatus}
              </span>
            ) : (
              <span>
                {unsavedScopes.length > 0 ? (
                  <span className="text-amber-300">
                    🟠 {unsavedScopes.length} {copy.sectionUnsaved}
                  </span>
                ) : null}
                {unsavedScopes.length > 0 && readyScopes.length > 0
                  ? " · "
                  : null}
                {readyScopes.length > 0 ? (
                  <span className="text-cyan-300">
                    🔵 {readyScopes.length} {copy.sectionAppliedToCustom}
                  </span>
                ) : null}
              </span>
            )}
          </button>
          {labMode === "editor" || labMode === "system" ? (
            <p
              className={`text-[0.65rem] font-medium uppercase tracking-[0.12em] ${
                (labMode === "editor"
                  ? editorScopeState
                  : systemScopeState) === copy.unsavedChanges
                  ? "text-amber-300"
                  : (labMode === "editor"
                        ? editorScopeState
                        : systemScopeState) === copy.appliedToCustomNotCurrent
                    ? "text-cyan-300"
                    : "text-zinc-500"
              }`}
            >
              {copy.stateLabel}:{" "}
              {labMode === "editor" ? editorScopeState : systemScopeState}
            </p>
          ) : (
            <p className="text-[0.65rem] uppercase tracking-[0.12em] text-zinc-500">
              {copy.stateLabel}:{" "}
              {pendingScopes.length > 0
                ? copy.appliedToCustomNotCurrent
                : copy.current}
            </p>
          )}
          {showGuide ? (
            <p className="text-[0.7rem] leading-relaxed text-zinc-500">
              {labMode === "editor"
                ? copy.areaEditorHelp
                : labMode === "system"
                  ? copy.areaSystemHelp
                  : labMode === "approval"
                    ? copy.areaApprovalHelp
                    : copy.areaRecoveryHelp}
            </p>
          ) : null}
        </div>
      }
      inspectorTabs={
        visibleSections.length > 0 ? (
          <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
            {visibleSections.slice(0, 5).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => selectLabFamily(id)}
                className={`flex shrink-0 items-center gap-1 rounded-md border px-2 py-1.5 text-[0.7rem] ${
                  displayedSection === id
                    ? "border-cyan-400 bg-cyan-400/10 text-white"
                    : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
                }`}
              >
                {id === "copy" ? (
                  <span
                    className={`size-1.5 shrink-0 rounded-full ${sectionStatusDotClass(
                      contentLiveUnsaved(
                        CONTENT_FIELD_IDS,
                        siteContent,
                        customSiteContent,
                        approvedSiteContentBaseline,
                      )
                        ? "unsaved"
                        : contentAppliedNotCurrent(
                            CONTENT_FIELD_IDS,
                            siteContent,
                            customSiteContent,
                            approvedSiteContentBaseline,
                          )
                          ? "applied-to-custom"
                          : "no-changes",
                    )}`}
                    aria-hidden
                  />
                ) : isLabStagedSection(id) ? (
                  <span
                    className={`size-1.5 shrink-0 rounded-full ${sectionStatusDotClass(sectionStatuses[id])}`}
                    title={sectionStatusLabel(sectionStatuses[id], copy)}
                    aria-hidden
                  />
                ) : id === "content" ? (
                  <span
                    className={`size-1.5 shrink-0 rounded-full ${sectionStatusDotClass(contentStatus)}`}
                    title={sectionStatusLabel(contentStatus, copy)}
                    aria-hidden
                  />
                ) : null}
                {sectionLabel(id, copy)}
              </button>
            ))}
            {visibleSections.length > 5 ? (
              <label className="sr-only" htmlFor="lab-inspector-more">
                {language === "es" ? "Más" : "More"}
              </label>
            ) : null}
            {visibleSections.length > 5 ? (
              <select
                id="lab-inspector-more"
                value={
                  visibleSections.slice(5).includes(displayedSection)
                    ? displayedSection
                    : ""
                }
                onChange={(event) => {
                  const next = event.target.value as LabSectionId;
                  if (next) {
                    selectLabFamily(next);
                  }
                }}
                className={`min-h-8 max-w-[7.5rem] shrink-0 rounded-md border bg-zinc-950 px-1.5 text-[0.7rem] ${
                  visibleSections.slice(5).includes(displayedSection)
                    ? "border-cyan-400 text-white"
                    : "border-zinc-700 text-zinc-300"
                }`}
              >
                <option value="">
                  {language === "es" ? "Más" : "More"}
                </option>
                {visibleSections.slice(5).map((id) => (
                  <option key={id} value={id}>
                    {sectionLabel(id, copy)}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
        ) : null
      }
      inspectorBody={
        <>
          {showGuide ? (
            <div className="mb-6">
              <LabGuidePanel
                selectedTarget={panelTarget}
                section={displayedSection}
              />
            </div>
          ) : null}
          {showColorSampler ? (
            <div
              className={
                displayedSection === "tools" ? "min-w-0" : "mb-6 min-w-0"
              }
            >
              <ColorSampler
                key={[
                  colorApplyTarget.kind,
                  colorApplyTarget.property,
                  colorApplyTarget.pageId ?? "",
                  colorApplyTarget.sectionId ?? "",
                  colorApplyTarget.elementId ?? "",
                ].join(":")}
                language={language}
                target={colorApplyTarget}
                propertyOptions={samplerPropertyOptions}
                selectedProperty={
                  labMode === "system"
                    ? activeSystemProperty
                    : activeLocalProperty
                }
                workingHex={samplerWorkingHex}
                currentHex={samplerCurrentHex}
                status={samplerStatus}
                onPropertyChange={
                  samplerPropertyOptions
                    ? (id) => {
                        if (labMode === "system") {
                          setSystemColorProperty(id as SystemColorProperty);
                        } else {
                          setLocalColorProperty(id as LocalColorProperty);
                        }
                      }
                    : undefined
                }
                onPreview={previewSamplerColor}
                onApply={applySamplerColor}
              />
            </div>
          ) : null}
          {displayedSection === "brand" ? (
            <fieldset className="min-w-0">
              <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                {copy.presets}
              </legend>
              <div className="mt-3 grid grid-cols-1 gap-2">
                {labSources.map(
                  (id) => (
                    <div key={id}>
                    <button
                      type="button"
                      onClick={() => selectSource(id)}
                      className={`min-h-11 w-full rounded-md border px-3 text-left text-sm ${
                        source === id
                          ? "border-cyan-400 bg-cyan-400/10 text-white"
                          : "border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-zinc-500"
                      }`}
                    >
                      {sourceLabel[id]}
                    </button>
                    <LabControlHelp id={`preset-${id}` as LabControlId} />
                    </div>
                  ),
                )}
              </div>
              <p className="mt-2 text-xs text-zinc-500">
                {source === "factory"
                  ? copy.factoryHint
                  : source === "current"
                    ? copy.currentHint
                    : source === "designer"
                      ? copy.designerHint
                      : source === "inspired"
                        ? copy.inspiredHint
                        : copy.customHint}
              </p>
            </fieldset>
          ) : null}

          {displayedSection === "brand" ? (
            <fieldset className="mt-6 min-w-0">
              <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                {copy.shapeDensity}
              </legend>
              <div className="mt-3 flex flex-col gap-4">
                {sliderFields
                  .filter(
                    (field) =>
                      field.key !== "headingScale" &&
                      field.key !== "bodyScale",
                  )
                  .map((field) => (
                    <div key={field.key}>
                      <label
                        htmlFor={`theme-${field.key}`}
                        className="flex items-center justify-between text-sm text-zinc-200"
                      >
                        <span>
                          {labText(
                            labControls[`slider-${field.key}` as LabControlId]
                              .help.label,
                            language,
                          )}
                        </span>
                        <span className="font-mono text-xs text-zinc-400">
                          {Number(theme[field.key]).toFixed(
                            field.step < 1 ? 2 : 0,
                          )}
                        </span>
                      </label>
                      <input
                        id={`theme-${field.key}`}
                        type="range"
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        value={Number(theme[field.key])}
                        onChange={(event) =>
                          updateTheme(field.key, Number(event.target.value))
                        }
                        className="mt-2 w-full"
                      />
                      <LabControlHelp
                        id={`slider-${field.key}` as LabControlId}
                      />
                    </div>
                  ))}
              </div>
            </fieldset>
          ) : null}

          {displayedSection === "colors" ? (
            <>
              {colorGroups.map((group) => (
                <fieldset key={group} className="mt-6 min-w-0 first:mt-0">
                  <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                    {colorGroupLabel[group]}
                  </legend>
                  <div className="mt-3 flex flex-col gap-3">
                    {colorFields
                      .filter((field) => field.group === group)
                      .map((field) => (
                        <ColorControl
                          key={field.key}
                          id={`theme-${field.key}`}
                          label={labText(
                            labControls[`color-${field.key}` as LabControlId]
                              .help.label,
                            language,
                          )}
                          helpId={`color-${field.key}` as LabControlId}
                          value={resolvedThemeColor(theme, field.key, fallbackTheme)}
                          fallback={resolvedThemeColor(
                            fallbackTheme,
                            field.key,
                            theme,
                          )}
                          onChange={(next) => updateTheme(field.key, next)}
                        />
                      ))}
                  </div>
                </fieldset>
              ))}
              <fieldset className="mt-6 min-w-0">
                <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                  {labText(
                    { en: "Navigation halo", es: "Halo de navegación" },
                    language,
                  )}
                </legend>
                <div className="mt-3 flex flex-col gap-4">
                  {navHaloFields.map((field) => (
                    <div key={field.key}>
                      <label
                        htmlFor={`theme-${field.key}`}
                        className="flex items-center justify-between text-sm text-zinc-200"
                      >
                        <span>
                          {labText(
                            labControls[`slider-${field.key}`].help.label,
                            language,
                          )}
                        </span>
                        <span className="font-mono text-xs text-zinc-400">
                          {Number(theme[field.key] ?? field.fallback).toFixed(2)}
                        </span>
                      </label>
                      <input
                        id={`theme-${field.key}`}
                        type="range"
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        value={Number(theme[field.key] ?? field.fallback)}
                        onChange={(event) =>
                          updateTheme(field.key, Number(event.target.value))
                        }
                        className="mt-2 w-full"
                      />
                      <LabControlHelp id={`slider-${field.key}`} />
                    </div>
                  ))}
                </div>
              </fieldset>
            </>
          ) : null}

          {displayedSection === "surfaces" ? (
            <fieldset className="min-w-0">
              <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                {copy.surfaces}
              </legend>
              <p className="mt-2 text-[0.7rem] leading-relaxed text-zinc-500">
                {labText(
                  {
                    en: "Page Background affects the page canvas only. Header Background and Footer Background are independent and live with Header and Footer.",
                    es: "Fondo de página afecta solo el lienzo. Fondo del encabezado y fondo del pie son independientes y viven con Encabezado y Pie.",
                  },
                  language,
                )}
              </p>
              <div className="mt-3 flex flex-col gap-6">
                <GlobalSurfaceControl
                  sliderId="theme-chromeWarmth"
                  helpId="slider-chromeWarmth"
                  hex={resolvedPageBackground(theme)}
                  language={language}
                  onHexChange={(hex) => updateTheme("pageBackground", hex)}
                />
              </div>
            </fieldset>
          ) : null}

          {displayedSection === "typography" ? (
            <fieldset className="min-w-0">
              <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                {copy.typography}
              </legend>
              <div className="mt-3 flex flex-col gap-3">
                <label className="block text-sm text-zinc-200" htmlFor="heading-font">
                  {copy.headingFont}
                  <select
                    id="heading-font"
                    value={theme.headingFont}
                    onChange={(event) =>
                      updateTheme(
                        "headingFont",
                        event.target.value as ThemeFontId,
                      )
                    }
                    className="mt-1.5 min-h-11 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100"
                  >
                    {(Object.keys(fontLabels) as ThemeFontId[]).map((id) => (
                      <option key={id} value={id}>
                        {fontLabels[id]}
                      </option>
                    ))}
                  </select>
                </label>
                <LabControlHelp id="font-heading" />
                <label className="block text-sm text-zinc-200" htmlFor="body-font">
                  {copy.bodyFont}
                  <select
                    id="body-font"
                    value={theme.bodyFont}
                    onChange={(event) =>
                      updateTheme("bodyFont", event.target.value as ThemeFontId)
                    }
                    className="mt-1.5 min-h-11 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100"
                  >
                    {(Object.keys(fontLabels) as ThemeFontId[]).map((id) => (
                      <option key={id} value={id}>
                        {fontLabels[id]}
                      </option>
                    ))}
                  </select>
                </label>
                <LabControlHelp id="font-body" />
                {sliderFields
                  .filter(
                    (field) =>
                      field.key === "headingScale" ||
                      field.key === "bodyScale",
                  )
                  .map((field) => (
                    <div key={field.key}>
                      <label
                        htmlFor={`theme-${field.key}`}
                        className="flex items-center justify-between text-sm text-zinc-200"
                      >
                        <span>
                          {labText(
                            labControls[`slider-${field.key}` as LabControlId]
                              .help.label,
                            language,
                          )}
                        </span>
                        <span className="font-mono text-xs text-zinc-400">
                          {Number(theme[field.key]).toFixed(2)}
                        </span>
                      </label>
                      <input
                        id={`theme-${field.key}`}
                        type="range"
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        value={Number(theme[field.key])}
                        onChange={(event) =>
                          updateTheme(field.key, Number(event.target.value))
                        }
                        className="mt-2 w-full"
                      />
                      <LabControlHelp
                        id={`slider-${field.key}` as LabControlId}
                      />
                    </div>
                  ))}
              </div>
            </fieldset>
          ) : null}

          {displayedSection === "position" ? (
            <ThemeLabPositionPanel
              experience={experience}
              selectedTarget={panelTarget}
              itemKey={resolvedElement?.itemKey}
              baseline={approvedExperienceBaseline}
              onChange={updateExperience}
            />
          ) : null}

          {displayedSection === "media" ? (
            <ThemeLabMediaPanel
              key={`${galleryNonce}-${panelTarget}-${resolvedElement?.itemKey ?? ""}`}
              experience={experience}
              selectedTarget={panelTarget}
              itemKey={resolvedElement?.itemKey}
              baseline={approvedExperienceBaseline}
              onChange={updateExperience}
              openPickerSignal={changeImageSignal}
            />
          ) : null}

          {displayedSection === "header" ? (
            <>
              <GlobalSurfaceControl
                sliderId="theme-headerBackground"
                helpId="slider-headerBackground"
                hex={resolvedHeaderBackground(theme)}
                language={language}
                onHexChange={(hex) => updateTheme("headerBackground", hex)}
              />
              <ThemeLabMediaPanel
                experience={experience}
                selectedTarget="header-logo"
                baseline={approvedExperienceBaseline}
                onChange={updateExperience}
              />
            </>
          ) : null}

          {displayedSection === "footer" ? (
            <GlobalSurfaceControl
              sliderId="theme-footerBackground"
              helpId="slider-footerBackground"
              hex={resolvedFooterBackground(theme)}
              language={language}
              onHexChange={(hex) => updateTheme("footerBackground", hex)}
            />
          ) : null}

          {displayedSection === "containers" ? (
            <ThemeLabContainersPanel
              experience={experience}
              selectedTarget={panelTarget}
              onChange={updateExperience}
            />
          ) : null}

          {displayedSection === "motion" ? (
            <>
              <p className="mb-3 text-xs text-zinc-500">
                {labText(
                  {
                    en: "Motion is a global Experience setting. It is not scoped to the selected page, section, or element.",
                    es: "Motion es un ajuste global de Experience. No está limitado a la página, sección o elemento seleccionado.",
                  },
                  language,
                )}
              </p>
              <ThemeLabMotionPanel
                experience={experience}
                onChange={updateExperience}
              />
            </>
          ) : null}

          {displayedSection === "effects" ? (
            <>
              <p className="mb-3 text-xs text-zinc-500">
                {labMode === "system"
                  ? labText(
                      {
                        en: "Cursor Companion is global. It does not depend on Preview Page, Section, or Selected Element.",
                        es: "El compañero de cursor es global. No depende de Página, Sección ni Elemento seleccionado.",
                      },
                      language,
                    )
                  : copy.hiddenControls}
              </p>
              <ThemeLabEffectsPanel
                experience={experience}
                selectedTarget={panelTarget}
                onChange={updateExperience}
                variant={labMode === "system" ? "system" : "editor"}
              />
            </>
          ) : null}

          {displayedSection === "content" ? (
            <ThemeLabContent
              language={language}
              publication={publication}
              previewPath={previewPage}
              focusedSectionId={resolvedSection?.id}
              onChange={(next) => {
                setStatusMessage("");
                setStatusError("");
                setPublication(pickContentPublicationPatch(next));
              }}
              onPreviewPath={adoptPreviewPage}
            />
          ) : null}

          {displayedSection === "copy" ? (
            <ContentEditor
              fieldIds={selectedCopyFields}
              working={siteContent}
              custom={customSiteContent}
              current={approvedSiteContentBaseline}
              onChange={updateCopyField}
              onRestoreOriginal={restoreCopyOriginal}
            />
          ) : null}

          {displayedSection === "approval" ? (
            <div className="mt-2 flex flex-col gap-4">
              <p className="text-[0.7rem] leading-relaxed text-zinc-500">
                {copy.areaApprovalHelp}
              </p>
              {unsavedScopes.length === 0 && readyScopes.length === 0 ? (
                <p className="text-sm text-emerald-300">🟢 {copy.publishedStatus}</p>
              ) : (
                <>
                  <LabPendingList
                    language={language}
                    items={unsavedScopes}
                    status="unsaved"
                    heading={copy.pendingUnsavedHeading}
                    reviewLabel={copy.pendingReview}
                    applyLabel={language === "es" ? "Aplicar" : "Apply"}
                    discardLabel={copy.discardChange}
                    publishLabel={language === "es" ? "Publicar" : "Publish"}
                    restoreLabel={copy.restoreCurrent}
                    onReview={reviewPendingChange}
                    onApply={applyPendingUnsaved}
                    onDiscard={discardPendingUnsaved}
                  />
                  <LabPendingList
                    language={language}
                    items={readyScopes}
                    status="ready"
                    heading={copy.pendingReadyHeading}
                    reviewLabel={copy.pendingReview}
                    applyLabel={language === "es" ? "Aplicar" : "Apply"}
                    discardLabel={copy.discardChange}
                    publishLabel={language === "es" ? "Publicar" : "Publish"}
                    restoreLabel={copy.restoreCurrent}
                    onReview={reviewPendingChange}
                    onPublish={(item) => void publishPendingReady(item)}
                    onRestore={restorePendingReady}
                  />
                </>
              )}
              {statusMessage ? (
                <p className="text-sm text-cyan-300" role="status">
                  {statusMessage}
                </p>
              ) : null}
              {statusError ? (
                <p className="text-sm text-red-300" role="alert">
                  {statusError}
                </p>
              ) : null}
            </div>
          ) : null}

          {displayedSection === "recovery" ? (
            <div className="mt-6 flex flex-col gap-4">
              <div className="rounded-md border border-zinc-800 bg-zinc-900/60 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                  {copy.recovery}
                </p>
                <div className="mt-3">
                  <p className="text-sm text-zinc-200">{copy.undoUnsaved}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {copy.undoUnsavedHint}
                  </p>
                  <LabControlHelp id="recovery-undo" />
                  <button
                    type="button"
                    onClick={() => setPendingConfirm("undo")}
                    className="mt-2 min-h-11 w-full rounded-md border border-zinc-700 px-3 text-sm text-zinc-200 hover:border-zinc-500"
                  >
                    {copy.undoUnsaved}
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-zinc-200">{copy.loadCurrent}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {copy.loadCurrentHint}
                  </p>
                  <LabControlHelp id="recovery-load-current" />
                  <button
                    type="button"
                    onClick={() => setPendingConfirm("load-current")}
                    className="mt-2 min-h-11 w-full rounded-md border border-zinc-700 px-3 text-sm text-zinc-200 hover:border-zinc-500"
                  >
                    {copy.loadCurrent}
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-zinc-200">{copy.loadFactory}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {copy.loadFactoryHint}
                  </p>
                  <LabControlHelp id="recovery-load-factory" />
                  <button
                    type="button"
                    onClick={() => setPendingConfirm("load-factory")}
                    className="mt-2 min-h-11 w-full rounded-md border border-zinc-700 px-3 text-sm text-zinc-200 hover:border-zinc-500"
                  >
                    {copy.loadFactory}
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-zinc-200">{copy.loadInspired}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {copy.loadInspiredHint}
                  </p>
                  <LabControlHelp id="recovery-load-inspired" />
                  <button
                    type="button"
                    onClick={() => setPendingConfirm("load-inspired")}
                    className="mt-2 min-h-11 w-full rounded-md border border-zinc-700 px-3 text-sm text-zinc-200 hover:border-zinc-500"
                  >
                    {copy.loadInspired}
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPendingConfirm("reset-all")}
                className="min-h-11 rounded-md border border-zinc-700 px-3 text-sm text-zinc-200 hover:border-zinc-500"
              >
                {copy.resetAllToCurrent}
              </button>
              <p className="text-xs text-zinc-500">{copy.resetAllToCurrentHint}</p>
              <LabControlHelp id="recovery-reset-all" />
              <button
                type="button"
                onClick={() => void copyTheme()}
                className="min-h-11 rounded-md border border-zinc-700 px-3 text-sm text-zinc-200 hover:border-zinc-500"
              >
                {copyState}
              </button>
              <LabControlHelp id="recovery-copy-theme" />
              <button
                type="button"
                onClick={() => void copyExperienceConfig()}
                className="min-h-11 rounded-md border border-zinc-700 px-3 text-sm text-zinc-200 hover:border-zinc-500"
              >
                {copyExperienceState}
              </button>
              <LabControlHelp id="recovery-copy-experience" />
              {statusMessage ? (
                <p className="text-sm text-cyan-300" role="status">
                  {statusMessage}
                </p>
              ) : null}
              {statusError ? (
                <p className="text-sm text-red-300" role="alert">
                  {statusError}
                </p>
              ) : null}
            </div>
          ) : null}

          {displayedSection !== "recovery" &&
          displayedSection !== "approval" &&
          (statusMessage || statusError) ? (
            <div className="mt-4">
              {statusMessage ? (
                <p className="text-sm text-cyan-300" role="status">
                  {statusMessage}
                </p>
              ) : null}
              {statusError ? (
                <p className="text-sm text-red-300" role="alert">
                  {statusError}
                </p>
              ) : null}
            </div>
          ) : null}

        </>
      }
      inspectorActions={
        labMode === "approval" ? (
          <LabChangeActionBar
            unsavedCount={unsavedScopes.length}
            readyCount={readyScopes.length}
            unsavedLabel={copy.sectionUnsaved}
            readyLabel={copy.sectionAppliedToCustom}
            publishedLabel={copy.publishedStatus}
            applyAllLabel={copy.applyAllUnsaved}
            publishAllLabel={copy.publishReady}
            applyPublishAllLabel={copy.applyAndPublishAll}
            saving={saving}
            onApplyAll={applyAllUnsavedToCustom}
            onPublishAll={() => {
              setConfirmPath("");
              setPendingConfirm("apply");
            }}
            onApplyPublishAll={() => setPendingConfirm("apply-publish-all")}
          />
        ) : labMode === "editor" && displayedSection === "copy" ? (
          copyUnsaved ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={resetCopyToCustom}
                className="min-h-11 rounded-md border border-zinc-700 px-2 text-xs text-zinc-200 hover:border-zinc-500"
              >
                {copy.resetElement}
              </button>
              <button
                type="button"
                onClick={requestApplyCopy}
                className="min-h-11 rounded-md border border-cyan-400/70 px-2 text-xs text-zinc-100 hover:bg-cyan-400/10"
              >
                {language === "es" ? "Aplicar" : "Apply"}
              </button>
            </div>
          ) : copyReadyToPublish ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={restoreCopyToCurrent}
                className="min-h-11 rounded-md border border-zinc-700 px-2 text-xs text-zinc-200 hover:border-zinc-500"
              >
                {copy.restoreCurrent}
              </button>
              <button
                type="button"
                onClick={() => requestPromote("promote-copy", editorPath)}
                disabled={saving}
                className="min-h-11 rounded-md border border-cyan-400 bg-cyan-400/20 px-2 text-xs text-white hover:bg-cyan-400/30 disabled:opacity-60"
              >
                {language === "es" ? "Publicar" : "Publish"}
              </button>
            </div>
          ) : null
        ) : labMode === "editor" ? (
          editorElementScope && elementUnsaved ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={resetElementToCustom}
                className="min-h-11 rounded-md border border-zinc-700 px-2 text-xs text-zinc-200 hover:border-zinc-500"
              >
                {copy.resetElement}
              </button>
              <button
                type="button"
                onClick={applyElementToCustom}
                className="min-h-11 rounded-md border border-cyan-400/70 px-2 text-xs text-zinc-100 hover:bg-cyan-400/10"
              >
                {copy.applyElement}
              </button>
            </div>
          ) : editorElementScope && elementAppliedNotCurrent ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={restoreElementToCurrent}
                className="min-h-11 rounded-md border border-zinc-700 px-2 text-xs text-zinc-200 hover:border-zinc-500"
              >
                {copy.restoreCurrent}
              </button>
              <button
                type="button"
                onClick={() => requestPromote("promote-element", editorPath)}
                disabled={saving}
                className="min-h-11 rounded-md border border-cyan-400 bg-cyan-400/20 px-2 text-xs text-white hover:bg-cyan-400/30 disabled:opacity-60"
              >
                {language === "es" ? "Publicar" : "Publish"}
              </button>
            </div>
          ) : !editorElementScope && editorSectionUnsaved ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={resetPageSectionToCustom}
                className="min-h-11 rounded-md border border-zinc-700 px-2 text-xs text-zinc-200 hover:border-zinc-500"
              >
                {copy.resetSection}
              </button>
              <button
                type="button"
                onClick={applyPageSectionToCustom}
                className="min-h-11 rounded-md border border-cyan-400/70 px-2 text-xs text-zinc-100 hover:bg-cyan-400/10"
              >
                {copy.applySection}
              </button>
            </div>
          ) : !editorElementScope && sectionAppliedNotCurrent ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => requestPromote("promote-section", editorPath)}
                disabled={saving}
                className="min-h-11 rounded-md border border-cyan-400 bg-cyan-400/20 px-2 text-xs text-white hover:bg-cyan-400/30 disabled:opacity-60"
              >
                {language === "es" ? "Publicar" : "Publish"}
              </button>
            </div>
          ) : null
        ) : labMode === "system" &&
          (displayedSectionStatus ||
            displayedSection === "containers" ||
            displayedSection === "effects" ||
            displayedSection === "footer") ? (
          systemFamilyUnsaved ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={resetSectionToCustom}
                className="min-h-11 rounded-md border border-zinc-700 px-2 text-xs text-zinc-200 hover:border-zinc-500"
              >
                {copy.resetSection}
              </button>
              <button
                type="button"
                onClick={applySectionToCustom}
                className="min-h-11 rounded-md border border-cyan-400/70 px-2 text-xs text-zinc-100 hover:bg-cyan-400/10"
              >
                {language === "es" ? "Aplicar" : "Apply"}
              </button>
            </div>
          ) : systemAppliedNotCurrent ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={restoreSystemFamilyToCurrent}
                className="min-h-11 rounded-md border border-zinc-700 px-2 text-xs text-zinc-200 hover:border-zinc-500"
              >
                {copy.restoreCurrent}
              </button>
              <button
                type="button"
                onClick={() =>
                  requestPromote(
                    "promote-system",
                    `${copy.systemMode} / ${sectionLabel(displayedSection, copy)}`,
                  )
                }
                disabled={saving}
                className="min-h-11 rounded-md border border-cyan-400 bg-cyan-400/20 px-2 text-xs text-white hover:bg-cyan-400/30 disabled:opacity-60"
              >
                {language === "es" ? "Publicar" : "Publish"}
              </button>
            </div>
          ) : null
        ) : null
      }
    />
      {dialog ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="presentation"
          onClick={() => setPendingConfirm(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lab-confirm-title"
            aria-describedby="lab-confirm-body"
            className="w-full max-w-md rounded-lg border border-zinc-700 bg-zinc-950 p-5 text-zinc-100 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="lab-confirm-title" className="text-base font-semibold">
              {dialog.title}
            </h2>
            <p id="lab-confirm-body" className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-300">
              {dialog.body}
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setPendingConfirm(null)}
                className="min-h-11 rounded-md border border-zinc-700 px-4 text-sm text-zinc-200 hover:border-zinc-500"
              >
                {copy.cancel}
              </button>
              <button
                type="button"
                onClick={confirmPending}
                className="min-h-11 rounded-md border border-cyan-400 bg-cyan-400/20 px-4 text-sm text-white hover:bg-cyan-400/30"
              >
                {dialog.action}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {unsavedNavOpen ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lab-unsaved-nav-title"
            aria-describedby="lab-unsaved-nav-body"
            className="w-full max-w-md rounded-lg border border-zinc-700 bg-zinc-950 p-5 text-zinc-100 shadow-xl"
          >
            <h2 id="lab-unsaved-nav-title" className="text-base font-semibold">
              {copy.unsavedNavTitle}
            </h2>
            <p className="mt-3 text-sm text-zinc-200">
              {language === "es" ? "Cambiaste:" : "You changed:"}
            </p>
            <p className="mt-1 text-sm font-medium text-white">{editorPath}</p>
            <p
              id="lab-unsaved-nav-body"
              className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-300"
            >
              {copy.unsavedNavBody}
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => finishUnsavedNav("stay")}
                className="min-h-11 rounded-md border border-zinc-700 px-4 text-sm text-zinc-200 hover:border-zinc-500"
              >
                {copy.unsavedNavStay}
              </button>
              <button
                type="button"
                onClick={() => finishUnsavedNav("discard")}
                className="min-h-11 rounded-md border border-zinc-700 px-4 text-sm text-zinc-200 hover:border-zinc-500"
              >
                {copy.unsavedNavDiscard}
              </button>
              <button
                type="button"
                onClick={() => finishUnsavedNav("apply")}
                className="min-h-11 rounded-md border border-cyan-400 bg-cyan-400/20 px-4 text-sm text-white hover:bg-cyan-400/30"
              >
                {copy.unsavedNavApply}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {showPendingPanel ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
          role="presentation"
          onClick={() => setShowPendingPanel(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lab-pending-title"
            className="max-h-[80vh] w-full max-w-lg overflow-auto rounded-lg border border-zinc-700 bg-zinc-950 p-5 text-zinc-100 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="lab-pending-title" className="text-base font-semibold">
              {copy.pendingChangesTitle}
            </h2>
            {unsavedScopes.length === 0 && readyScopes.length === 0 ? (
              <p className="mt-3 text-sm text-zinc-400">{copy.pendingNone}</p>
            ) : (
              <div className="mt-4 space-y-4">
                <LabPendingList
                  language={language}
                  items={unsavedScopes}
                  status="unsaved"
                  heading={copy.pendingUnsavedHeading}
                  reviewLabel={copy.pendingReview}
                  applyLabel={language === "es" ? "Aplicar" : "Apply"}
                  discardLabel={copy.discardChange}
                  publishLabel={language === "es" ? "Publicar" : "Publish"}
                  restoreLabel={copy.restoreCurrent}
                  onReview={reviewPendingChange}
                  onApply={applyPendingUnsaved}
                  onDiscard={discardPendingUnsaved}
                />
                <LabPendingList
                  language={language}
                  items={readyScopes}
                  status="ready"
                  heading={copy.pendingReadyHeading}
                  reviewLabel={copy.pendingReview}
                  applyLabel={language === "es" ? "Aplicar" : "Apply"}
                  discardLabel={copy.discardChange}
                  publishLabel={language === "es" ? "Publicar" : "Publish"}
                  restoreLabel={copy.restoreCurrent}
                  onReview={reviewPendingChange}
                  onPublish={(item) => void publishPendingReady(item)}
                  onRestore={restorePendingReady}
                />
              </div>
            )}
            <div className="mt-5">
              <LabChangeActionBar
                unsavedCount={unsavedScopes.length}
                readyCount={readyScopes.length}
                unsavedLabel={copy.sectionUnsaved}
                readyLabel={copy.sectionAppliedToCustom}
                publishedLabel={copy.publishedStatus}
                applyAllLabel={copy.applyAllUnsaved}
                publishAllLabel={copy.publishReady}
                applyPublishAllLabel={copy.applyAndPublishAll}
                saving={saving}
                onApplyAll={() => {
                  applyAllUnsavedToCustom();
                }}
                onPublishAll={() => {
                  setShowPendingPanel(false);
                  requestPromote("apply", copy.pendingChangesTitle);
                }}
                onApplyPublishAll={() => {
                  setShowPendingPanel(false);
                  setPendingConfirm("apply-publish-all");
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
      {contextMenu ? (
        <LabContextMenu
          language={language}
          x={contextMenu.x}
          y={contextMenu.y}
          title={contextMenu.title}
          subtitle={contextMenu.subtitle}
          media={contextMenu.media}
          onAction={handleContextMenuAction}
          onClose={() => setContextMenu(null)}
        />
      ) : null}
    </LabUiProvider>
  );
}
