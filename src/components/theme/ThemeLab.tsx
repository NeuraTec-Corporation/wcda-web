"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  EXPERIENCE_LAB_STORAGE_KEY,
  approvedExperience,
  experienceValuesEqual,
  parseExperienceValues,
  pickExperienceValues,
  targetsForPage,
  wcdaFactoryExperience,
  type ExperienceValues,
  type VisualTargetId,
} from "@/config/experience";
import {
  LAB_LANGUAGE_STORAGE_KEY,
  detectLabSource,
  labCopy,
  labControlScope,
  labSections,
  labSources,
  parseLabLanguage,
  sectionVisible,
  wcdaInspiredTheme,
  type LabCopy,
  type LabLanguage,
  type LabSectionId,
  type LabSourceId,
} from "@/config/lab-ui";
import {
  THEME_LAB_MESSAGE,
  THEME_LAB_READY,
  THEME_LAB_STORAGE_KEY,
  VISUAL_APPLY_PATH,
  approvedTheme,
  approvedThemeVersion,
  createPreviewSrc,
  defaultLabPreset,
  fontLabels,
  isHexColor,
  normalizeThemePresetId,
  parseThemeValues,
  pickThemeValues,
  previewPages,
  previewViewports,
  themePresets,
  themeValuesEqual,
  wcdaFactoryTheme,
  type PreviewPagePath,
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
} from "@/components/theme/ThemeLabExperience";
import {
  LabControlHelp,
  LabGuidePanel,
  LabUiProvider,
} from "@/components/theme/LabControlHelp";
import {
  labControls,
  labPageLabels,
  labTargetLabels,
  labText,
  type LabControlId,
} from "@/config/lab-guide";

type LabConfirmKind =
  | "undo"
  | "load-current"
  | "load-factory"
  | "load-inspired"
  | "apply";

type SessionSnapshot = {
  theme: ThemeValues;
  experience: ExperienceValues;
  source: LabSourceId;
  preset: ThemePresetId;
  basePreset: Exclude<ThemePresetId, "custom">;
};

const colorFields = [
  { key: "primary", label: "Primary", group: "Brand" },
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

function matchingPreset(theme: ThemeValues): ThemePresetId {
  const named = (
    Object.keys(themePresets) as Array<Exclude<ThemePresetId, "custom">>
  ).find((id) => themeValuesEqual(theme, themePresets[id]));
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
    storedBase !== "wcda-jc-mix" &&
    storedBase !== "wcda-designer"
      ? storedBase
      : matched === "custom" ||
          matched === "jc-dental" ||
          matched === "wcda-jc-mix" ||
          matched === "wcda-designer"
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

function confirmText(kind: LabConfirmKind, copy: LabCopy) {
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
  return {
    title: copy.confirmApplyTitle,
    body: copy.confirmApplyBody,
    action: copy.applyCustom,
  };
}

function sectionLabel(id: LabSectionId, copy: LabCopy) {
  return copy[id];
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
  const [previewPage, setPreviewPage] = useState<PreviewPagePath>("/");
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
  const [session, setSession] = useState<SessionSnapshot>(() => ({
    theme: pickThemeValues(initial.theme),
    experience: pickExperienceValues(
      loadStoredExperience() ?? approvedExperience,
    ),
    source: detectLabSource(
      initial.theme,
      loadStoredExperience() ?? approvedExperience,
      approvedTheme,
      approvedExperience,
    ),
    preset: initial.preset,
    basePreset: initial.basePreset,
  }));
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
    useState<VisualTargetId>("home-hero-media");
  const [showGuide, setShowGuide] = useState(false);

  const unsaved =
    !themeValuesEqual(theme, session.theme) ||
    !experienceValuesEqual(experience, session.experience);
  const pageTargets = targetsForPage(previewPage);
  const scope = labControlScope(selectedTarget);
  const visibleSections = labSections.filter((id) =>
    sectionVisible(id, scope),
  );
  const displayedSection = sectionVisible(labSection, scope)
    ? labSection
    : "brand";

  useEffect(() => {
    window.localStorage.setItem(LAB_LANGUAGE_STORAGE_KEY, language);
  }, [language]);

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

  const postTheme = useCallback(() => {
    const frame = iframeRef.current?.contentWindow;
    if (!frame) {
      return;
    }

    frame.postMessage(
      { type: THEME_LAB_MESSAGE, theme, experience, selectedTarget },
      window.location.origin,
    );
  }, [theme, experience, selectedTarget]);

  useEffect(() => {
    function handleReady(event: MessageEvent) {
      if (event.origin !== window.location.origin) {
        return;
      }
      if (event.data?.type === THEME_LAB_READY) {
        postTheme();
      }
    }

    window.addEventListener("message", handleReady);
    return () => window.removeEventListener("message", handleReady);
  }, [postTheme]);

  useEffect(() => {
    postTheme();
  }, [postTheme, previewPage]);

  function captureSession(
    nextTheme: ThemeValues,
    nextExperience: ExperienceValues,
    nextSource: LabSourceId,
    nextPreset: ThemePresetId,
    nextBase: Exclude<ThemePresetId, "custom">,
  ) {
    setSession({
      theme: pickThemeValues(nextTheme),
      experience: pickExperienceValues(nextExperience),
      source: nextSource,
      preset: nextPreset,
      basePreset: nextBase,
    });
  }

  function loadFactory() {
    const nextTheme = pickThemeValues(wcdaFactoryTheme);
    const nextExperience = pickExperienceValues(wcdaFactoryExperience);
    setTheme(nextTheme);
    setExperience(nextExperience);
    setPreset("wcda-factory");
    setBasePreset("wcda-factory");
    setSource("factory");
    captureSession(
      nextTheme,
      nextExperience,
      "factory",
      "wcda-factory",
      "wcda-factory",
    );
    setStatusMessage(copy.loadedFactory);
    setStatusError("");
  }

  function loadCurrent() {
    const nextTheme = pickThemeValues(approvedBaseline);
    const nextExperience = pickExperienceValues(approvedExperienceBaseline);
    const matched = matchingPreset(nextTheme);
    const nextPreset = matched === "jc-dental" || matched === "wcda-jc-mix"
      ? "wcda-inspired"
      : matched;
    const nextBase =
      nextPreset === "custom" ? defaultLabPreset : nextPreset;
    setTheme(nextTheme);
    setExperience(nextExperience);
    setPreset(nextPreset);
    setBasePreset(nextBase);
    setSource("current");
    captureSession(
      nextTheme,
      nextExperience,
      "current",
      nextPreset,
      nextBase,
    );
    setStatusMessage(copy.loadedCurrent);
    setStatusError("");
  }

  function loadInspired() {
    const nextTheme = pickThemeValues(wcdaInspiredTheme);
    const nextExperience = pickExperienceValues(approvedExperienceBaseline);
    setTheme(nextTheme);
    setExperience(nextExperience);
    setPreset("wcda-inspired");
    setBasePreset("wcda-inspired");
    setSource("inspired");
    captureSession(
      nextTheme,
      nextExperience,
      "inspired",
      "wcda-inspired",
      "wcda-inspired",
    );
    setStatusMessage(copy.loadedInspired);
    setStatusError("");
  }

  function undoUnsaved() {
    setTheme(pickThemeValues(session.theme));
    setExperience(pickExperienceValues(session.experience));
    setPreset(session.preset);
    setBasePreset(session.basePreset);
    setSource(session.source);
    setStatusMessage(copy.undone);
    setStatusError("");
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

  function selectDesigner() {
    setSource("designer");
    setStatusMessage(copy.designerNotApplied);
    setStatusError("");
  }

  function selectSource(id: LabSourceId) {
    if (id === "custom") {
      setSource("custom");
      setPreset("custom");
      return;
    }
    if (id === "designer") {
      selectDesigner();
      return;
    }
    if (unsaved) {
      setPendingConfirm(
        id === "factory"
          ? "load-factory"
          : id === "current"
            ? "load-current"
            : "load-inspired",
      );
      return;
    }
    if (id === "factory") loadFactory();
    else if (id === "current") loadCurrent();
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

  async function applyCustomAsCurrent() {
    setSaving(true);
    setStatusMessage("");
    setStatusError("");

    try {
      const response = await fetch(VISUAL_APPLY_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theme: pickThemeValues(theme),
          experience: pickExperienceValues(experience),
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
        return;
      }

      const savedTheme = pickThemeValues(result.theme);
      const savedExperience = pickExperienceValues(result.experience);
      setApprovedBaseline(savedTheme);
      setApprovedExperienceBaseline(savedExperience);
      if (result.version) {
        setApprovedVersion(result.version);
      }
      setSource("current");
      captureSession(
        savedTheme,
        savedExperience,
        "current",
        preset === "wcda-factory" ? "custom" : preset,
        basePreset,
      );
      setStatusMessage(copy.applied);
    } catch {
      setStatusError(copy.applyFailed);
    } finally {
      setSaving(false);
    }
  }

  function confirmPending() {
    if (pendingConfirm === "undo") undoUnsaved();
    else if (pendingConfirm === "load-current") loadCurrent();
    else if (pendingConfirm === "load-factory") loadFactory();
    else if (pendingConfirm === "load-inspired") loadInspired();
    else if (pendingConfirm === "apply") void applyCustomAsCurrent();
    setPendingConfirm(null);
  }

  const previewWidth = useMemo(() => {
    const selected = previewViewports.find((item) => item.id === viewport);
    return selected?.width ?? "100%";
  }, [viewport]);

  const colorGroups = ["Brand", "Surfaces", "Text", "Structure"] as const;
  const colorGroupLabel: Record<(typeof colorGroups)[number], string> = {
    Brand: copy.colorsBrand,
    Surfaces: copy.colorsSurfaces,
    Text: copy.colorsText,
    Structure: copy.colorsStructure,
  };
  const dialog = pendingConfirm ? confirmText(pendingConfirm, copy) : null;
  const sourceLabel: Record<LabSourceId, string> = {
    factory: copy.factory,
    current: copy.current,
    designer: copy.designer,
    inspired: copy.inspired,
    custom: copy.custom,
  };

  return (
    <LabUiProvider language={language}>
    <div className="flex h-dvh min-h-0 flex-col bg-zinc-950 text-zinc-100 lg:flex-row">
      <aside className="flex min-h-0 w-full shrink-0 flex-col border-b border-zinc-800 lg:h-full lg:w-[320px] lg:border-r lg:border-b-0 xl:w-[340px]">
        <div className="border-b border-zinc-800 px-4 py-4">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-cyan-400">
            {copy.labTitle}
          </p>
          <fieldset className="mt-3 min-w-0">
            <legend className="text-xs text-zinc-400">{copy.language}</legend>
            <div className="mt-2 grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => setLanguage("es")}
                className={`min-h-11 rounded-md border px-2 text-xs ${
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
                className={`min-h-11 rounded-md border px-2 text-xs ${
                  language === "en"
                    ? "border-cyan-400 bg-cyan-400/10 text-white"
                    : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
                }`}
              >
                {copy.english}
              </button>
            </div>
          </fieldset>
          <button
            type="button"
            onClick={() => setShowGuide((open) => !open)}
            aria-pressed={showGuide}
            className={`mt-3 min-h-11 w-full rounded-md border px-3 text-sm ${
              showGuide
                ? "border-cyan-400 bg-cyan-400/10 text-white"
                : "border-zinc-700 text-zinc-200 hover:border-zinc-500"
            }`}
          >
            {language === "es" ? "Ayuda" : "Help"}
          </button>
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                {copy.factory}
              </p>
              <p className="mt-1 text-xs text-zinc-500">{copy.factoryHint}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                {copy.current}
              </p>
              <p className="mt-1 text-sm text-zinc-200">{copy.approved}</p>
              <p className="mt-1 text-xs text-zinc-500">{approvedVersion}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                {copy.custom}
              </p>
              <p className="mt-1 text-sm text-zinc-200">
                {unsaved
                  ? `${copy.custom} — ${copy.unsaved}`
                  : copy.saved}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {copy.editing}: {sourceLabel[source]}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-amber-200/80">
            {copy.factoryImmutable}
          </p>
          <p className="mt-2 text-sm text-zinc-400">{copy.theme}</p>
          <p className="mt-1 text-xs text-zinc-500">
            {copy.globalTheme} · {copy.entireSite}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-1">
            {visibleSections.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setLabSection(id)}
                className={`min-h-11 rounded-md border px-2 text-xs ${
                  displayedSection === id
                    ? "border-cyan-400 bg-cyan-400/10 text-white"
                    : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
                }`}
              >
                {sectionLabel(id, copy)}
              </button>
            ))}
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          {showGuide ? (
            <div className="mb-6">
              <LabGuidePanel
                selectedTarget={selectedTarget}
                section={displayedSection}
              />
            </div>
          ) : null}
          {displayedSection === "brand" || displayedSection === "recovery" ? (
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
                          value={theme[field.key]}
                          fallback={String(
                            themePresets[
                              source === "factory"
                                ? "wcda-factory"
                                : source === "inspired"
                                  ? "wcda-inspired"
                                  : source === "designer"
                                    ? "wcda-factory"
                                    : basePreset
                            ][field.key],
                          )}
                          onChange={(next) => updateTheme(field.key, next)}
                        />
                      ))}
                  </div>
                </fieldset>
              ))}
            </>
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

          {displayedSection === "media" ? (
            <ThemeLabMediaPanel
              experience={experience}
              selectedTarget={selectedTarget}
              onChange={updateExperience}
            />
          ) : null}

          {displayedSection === "containers" ? (
            <ThemeLabContainersPanel
              experience={experience}
              selectedTarget={selectedTarget}
              onChange={updateExperience}
            />
          ) : null}

          {displayedSection === "motion" ? (
            <>
              <p className="mb-3 text-xs text-zinc-500">{copy.hiddenControls}</p>
              <ThemeLabMotionPanel
                experience={experience}
                onChange={updateExperience}
              />
            </>
          ) : null}

          {displayedSection === "effects" ? (
            <>
              <p className="mb-3 text-xs text-zinc-500">{copy.hiddenControls}</p>
              <ThemeLabEffectsPanel
                experience={experience}
                selectedTarget={selectedTarget}
                onChange={updateExperience}
                emptyLabel={copy.noEffects}
              />
            </>
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
                onClick={() => setPendingConfirm("apply")}
                disabled={saving}
                className="min-h-11 rounded-md border border-cyan-400 bg-cyan-400/20 px-3 text-sm text-white hover:bg-cyan-400/30 disabled:opacity-60"
              >
                {saving ? copy.saving : copy.applyCustom}
              </button>
              <p className="text-xs text-zinc-500">{copy.applyCustomHint}</p>
              <LabControlHelp id="recovery-apply" />
              <p className="text-xs text-amber-200/80">{copy.factoryImmutable}</p>
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

          {displayedSection !== "recovery" && (statusMessage || statusError) ? (
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
        </div>
      </aside>

      <section className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="flex min-w-0 flex-wrap items-center gap-3 border-b border-zinc-800 px-4 py-3">
          <label className="flex min-w-0 items-center gap-2 text-sm" htmlFor="theme-preview-page">
            <span className="text-zinc-400">{copy.previewPage}</span>
            <select
              id="theme-preview-page"
              value={previewPage}
              onChange={(event) => {
                const nextPage = event.target.value as PreviewPagePath;
                setPreviewPage(nextPage);
                const nextTargets = targetsForPage(nextPage);
                if (
                  nextTargets.length > 0 &&
                  !nextTargets.some((item) => item.id === selectedTarget)
                ) {
                  setSelectedTarget(nextTargets[0].id);
                }
              }}
              className="min-h-11 rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100"
            >
              {previewPages.map((item) => (
                <option key={item.path} value={item.path}>
                  {labPageLabels[language][item.path]}
                </option>
              ))}
            </select>
          </label>
          <LabControlHelp id="preview-page" compact />
          {pageTargets.length > 0 ? (
            <label className="flex min-w-0 items-center gap-2 text-sm" htmlFor="theme-selected-element">
              <span className="text-zinc-400">{copy.selectedElement}</span>
              <select
                id="theme-selected-element"
                value={
                  pageTargets.some((item) => item.id === selectedTarget)
                    ? selectedTarget
                    : (pageTargets[0]?.id ?? selectedTarget)
                }
                onChange={(event) =>
                  setSelectedTarget(event.target.value as VisualTargetId)
                }
                className="min-h-11 rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100"
              >
                {pageTargets.map((item) => (
                  <option key={item.id} value={item.id}>
                    {labTargetLabels[language][item.id]}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
          <LabControlHelp id="selected-element" compact />
          <fieldset className="flex min-w-0 flex-wrap items-center gap-2">
            <legend className="sr-only">{copy.viewport}</legend>
            <span className="text-sm text-zinc-400">{copy.viewport}</span>
            {previewViewports.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setViewport(item.id)}
                className={`min-h-11 rounded-md border px-3 text-sm ${
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
        <div className="min-h-0 flex-1 overflow-auto bg-zinc-900 p-4">
          <div
            className={`mx-auto h-full min-h-[32rem] overflow-hidden rounded-md border border-zinc-700 bg-white shadow-lg ${
              viewport === "desktop" ? "w-full" : ""
            }`}
            style={
              viewport === "desktop"
                ? { width: "100%" }
                : { width: previewWidth, maxWidth: "100%" }
            }
          >
            <iframe
              ref={iframeRef}
              title={`WCDA preview: ${previewPage}`}
              src={createPreviewSrc(previewPage)}
              className="h-full min-h-[32rem] w-full border-0 bg-white"
              onLoad={postTheme}
            />
          </div>
        </div>
      </section>
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
            <p id="lab-confirm-body" className="mt-3 text-sm leading-relaxed text-zinc-300">
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
    </div>
    </LabUiProvider>
  );
}
