export const THEME_LAB_MESSAGE = "wcda-theme-lab";
export const THEME_LAB_READY = "wcda-theme-lab-ready";
export const THEME_LAB_QUERY = "themeLab";
export const THEME_LAB_STORAGE_KEY = "wcda-theme-lab-v5";
export const THEME_SAVE_PATH = "/api/internal/theme";
export const VISUAL_APPLY_PATH = "/api/internal/apply";

// Theme Lab manages one global website theme. Preview routes are visualization targets only; per-page theme overrides are intentionally unsupported.

export type ThemePresetId =
  | "wcda-factory"
  | "wcda-current"
  | "wcda-designer"
  | "jc-dental"
  | "wcda-jc-mix"
  | "wcda-inspired"
  | "custom";

export type ThemeFontId = "geist" | "arial" | "georgia" | "system";

export type ThemeValues = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceMuted: string;
  surfaceStrong: string;
  foreground: string;
  muted: string;
  border: string;
  headingFont: ThemeFontId;
  bodyFont: ThemeFontId;
  headingScale: number;
  bodyScale: number;
  radius: number;
  shadowIntensity: number;
  cardDensity: number;
  sectionSpacing: number;
  contentWidth: number;
  headerDensity: number;
};

export type ThemeConfigSnapshot = ThemeValues & {
  preset: ThemePresetId;
};

export const fontStacks: Record<ThemeFontId, string> = {
  geist: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
  arial: "Arial, Helvetica, sans-serif",
  georgia: 'Georgia, "Times New Roman", Times, serif',
  system: "system-ui, -apple-system, Segoe UI, sans-serif",
};

export const fontLabels: Record<ThemeFontId, string> = {
  geist: "Geist",
  arial: "Arial / Helvetica",
  georgia: "Georgia",
  system: "system-ui",
};

const shapeDefaults = {
  headingFont: "geist" as ThemeFontId,
  bodyFont: "geist" as ThemeFontId,
  headingScale: 1,
  bodyScale: 1,
  radius: 8,
  shadowIntensity: 1,
  cardDensity: 0.45,
  sectionSpacing: 0.4,
  contentWidth: 0.5,
  headerDensity: 0.45,
};

export const APPROVED_THEME_LABEL = "WCDA Approved Theme";

/* WCDA Factory is the immutable recovery baseline captured from Current Approved.
   Apply Custom as Current / Load Current / Undo / Inspired / Designer must never overwrite this block. */
/* WCDA_FACTORY_THEME_START */
export const wcdaFactoryTheme: ThemeValues = {
  primary: "#243140",
  secondary: "#4e4841",
  accent: "#7a5533",
  background: "#f6f3ee",
  surface: "#fcfaf7",
  surfaceMuted: "#ece6dc",
  surfaceStrong: "#243140",
  foreground: "#1c1916",
  muted: "#4e4841",
  border: "#d5cdc1",
  headingFont: "geist",
  bodyFont: "geist",
  headingScale: 1,
  bodyScale: 1,
  radius: 8,
  shadowIntensity: 1,
  cardDensity: 0.5,
  sectionSpacing: 0.214286,
  contentWidth: 0.5,
  headerDensity: 0.333333,
};
/* WCDA_FACTORY_THEME_END */

export const wcdaFactoryMeta = {
  name: "WCDA Factory",
  capturedAt: "2026-08-25T23:40:00-04:00",
  source: "Current Approved Theme + Experience",
} as const;

/* Storage alias only. Not a user-facing state name. */
export const wcdaOriginalTheme: ThemeValues = wcdaFactoryTheme;

/* Official WCDA Designer Brand Canon — RECORD ONLY. Not applied.
   Primary Blue: #002774
   Primary Background: #EBE1D8
   Typeface: Montserrat
   Logo: official designer-approved WCDA logo */
export const wcdaDesignerCanon = {
  name: "WCDA Designer",
  applied: false,
  primaryBlue: "#002774",
  primaryBackground: "#EBE1D8",
  typeface: "Montserrat",
  logo: "official designer-approved WCDA logo",
} as const;

const wcdaFactoryCssVars: Record<string, string> = {
  "--theme-primary": "#243140",
  "--theme-primary-hover": "#1c1916",
  "--theme-primary-foreground": "#ffffff",
  "--theme-secondary": "#4e4841",
  "--theme-secondary-hover": "#3f3a35",
  "--theme-secondary-foreground": "#ffffff",
  "--theme-accent": "#7a5533",
  "--theme-accent-foreground": "#fcfaf7",
  "--theme-background": "#f6f3ee",
  "--theme-surface": "#fcfaf7",
  "--theme-surface-muted": "#ece6dc",
  "--theme-surface-strong": "#243140",
  "--theme-on-strong": "#ffffff",
  "--theme-foreground": "#1c1916",
  "--theme-muted": "#4e4841",
  "--theme-border": "#d5cdc1",
  "--theme-placeholder": "#ded7cc",
  "--theme-placeholder-ink": "#4e4841",
  "--theme-focus": "#243140",
  "--theme-danger": "#9b2c2c",
  "--theme-font-heading": fontStacks.geist,
  "--theme-font-body": fontStacks.geist,
  "--theme-heading-scale": "1",
  "--theme-body-scale": "1",
  "--theme-radius": "0.5rem",
  "--theme-shadow-intensity": "1",
  "--theme-card-padding": "1.25rem",
  "--theme-section": "3.25rem",
  "--theme-content-width": "72rem",
  "--theme-header-padding": "0.75rem",
  "--container-narrow": "40rem",
  "--radius-sm": "0.375rem",
  "--radius-md": "0.5rem",
  "--radius-lg": "0.75rem",
  "--spacing-section": "3.25rem",
  "--spacing-section-lg": "4.75rem",
  "--spacing-card": "1.25rem",
  "--spacing-card-lg": "1.5rem",
  "--shadow-xs": "0 8px 24px rgba(28, 25, 22, 0.055)",
  "--shadow-sm":
    "0 1px 2px rgba(28, 25, 22, 0.04), 0 1px 2px rgba(28, 25, 22, 0.03)",
  "--shadow-md": "0 8px 24px rgba(28, 25, 22, 0.055)",
  "--shadow-lg": "0 16px 36px rgba(28, 25, 22, 0.08)",
};

export const themePresets: Record<
  Exclude<ThemePresetId, "custom">,
  ThemeValues
> = {
  "wcda-factory": { ...wcdaFactoryTheme },
  "wcda-designer": { ...wcdaFactoryTheme },
  "wcda-current": {
    primary: "#1e2a38",
    secondary: "#534b43",
    accent: "#7d5330",
    background: "#f3efe8",
    surface: "#fffaf4",
    surfaceMuted: "#ebe4d9",
    surfaceStrong: "#fffaf4",
    foreground: "#1a1714",
    muted: "#534c45",
    border: "#d6cfc4",
    ...shapeDefaults,
  },
  "jc-dental": {
    primary: "#0e4a7a",
    secondary: "#1a6b8a",
    accent: "#2aa8b8",
    background: "#f3f7fa",
    surface: "#ffffff",
    surfaceMuted: "#e8eef4",
    surfaceStrong: "#0b2d4a",
    foreground: "#122433",
    muted: "#4a5c6b",
    border: "#d5dee6",
    ...shapeDefaults,
    radius: 6,
  },
  "wcda-jc-mix": {
    primary: "#17375e",
    secondary: "#1e5a7a",
    accent: "#2cb8c6",
    background: "#f2f6f8",
    surface: "#ffffff",
    surfaceMuted: "#e7eef2",
    surfaceStrong: "#10263d",
    foreground: "#142433",
    muted: "#4d5d6a",
    border: "#d3dde4",
    ...shapeDefaults,
    radius: 6,
  },
  /* User-facing WCDA Inspired. Inherits the former WCDA + JC Mix recipe.
     jc-dental and wcda-jc-mix remain internal reference snapshots. */
  "wcda-inspired": {
    primary: "#17375e",
    secondary: "#1e5a7a",
    accent: "#2cb8c6",
    background: "#f2f6f8",
    surface: "#ffffff",
    surfaceMuted: "#e7eef2",
    surfaceStrong: "#10263d",
    foreground: "#142433",
    muted: "#4d5d6a",
    border: "#d3dde4",
    ...shapeDefaults,
    radius: 6,
  },
};

/* WCDA_APPROVED_THEME_START */
export const approvedThemeVersion = "2026.08.24-01";
export const approvedTheme: ThemeValues = {
  primary: "#243140",
  secondary: "#4e4841",
  accent: "#7a5533",
  background: "#f6f3ee",
  surface: "#fcfaf7",
  surfaceMuted: "#ece6dc",
  surfaceStrong: "#243140",
  foreground: "#1c1916",
  muted: "#4e4841",
  border: "#d5cdc1",
  headingFont: "geist",
  bodyFont: "geist",
  headingScale: 1,
  bodyScale: 1,
  radius: 8,
  shadowIntensity: 1,
  cardDensity: 0.5,
  sectionSpacing: 0.214286,
  contentWidth: 0.5,
  headerDensity: 0.333333,
};
/* WCDA_APPROVED_THEME_END */

export const defaultPublicTheme: ThemeValues = approvedTheme;
export const defaultLabPreset: Exclude<ThemePresetId, "custom"> = "wcda-factory";

export function normalizeThemePresetId(
  value: string | null | undefined,
): ThemePresetId {
  if (value === "wcda-original" || value === "wcda-factory") {
    return "wcda-factory";
  }
  if (
    value === "wcda-factory" ||
    value === "wcda-current" ||
    value === "wcda-designer" ||
    value === "jc-dental" ||
    value === "wcda-jc-mix" ||
    value === "wcda-inspired" ||
    value === "custom"
  ) {
    return value;
  }
  return "custom";
}

export const previewPages = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Dr. Matute", path: "/about/dr-jonnathan-matute" },
  { label: "Services", path: "/services" },
  { label: "Patients", path: "/patients" },
  { label: "Technology", path: "/technology" },
  { label: "Contact", path: "/contact" },
] as const;

export type PreviewPagePath = (typeof previewPages)[number]["path"];

export const previewViewports = [
  { id: "wide", label: "1440", width: "1440px" },
  { id: "desktop", label: "Desktop", width: "100%" },
  { id: "laptop", label: "1024", width: "1024px" },
  { id: "tablet", label: "Tablet", width: "768px" },
  { id: "mobile", label: "Mobile", width: "390px" },
  { id: "small", label: "360", width: "360px" },
] as const;

export type PreviewViewportId = (typeof previewViewports)[number]["id"];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return null;
  }

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((channel) => clamp(Math.round(channel), 0, 255).toString(16).padStart(2, "0"))
    .join("")}`;
}

export function isHexColor(value: string) {
  return /^#[0-9A-Fa-f]{6}$/.test(value.trim());
}

export function mixHex(a: string, b: string, amountB: number) {
  const colorA = hexToRgb(a);
  const colorB = hexToRgb(b);
  if (!colorA || !colorB) {
    return a;
  }

  const t = clamp(amountB, 0, 1);
  return rgbToHex(
    colorA.r + (colorB.r - colorA.r) * t,
    colorA.g + (colorB.g - colorA.g) * t,
    colorA.b + (colorB.b - colorA.b) * t,
  );
}

export function contrastText(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return "#f7f3ec";
  }

  const luminance =
    (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
  return luminance > 0.58 ? "#1a1714" : "#f7f3ec";
}

function lerp(min: number, max: number, t: number) {
  return min + (max - min) * clamp(t, 0, 1);
}

function isWcdaFactoryTheme(theme: ThemeValues) {
  const original = wcdaFactoryTheme;
  const keys: Array<keyof ThemeValues> = [
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
    "headingFont",
    "bodyFont",
    "headingScale",
    "bodyScale",
    "radius",
    "shadowIntensity",
    "cardDensity",
    "sectionSpacing",
    "contentWidth",
    "headerDensity",
  ];

  return keys.every((key) => {
    const left = theme[key];
    const right = original[key];
    if (typeof left === "number" && typeof right === "number") {
      return Math.abs(left - right) < 0.001;
    }
    return left === right;
  });
}

export function themeToCssVars(theme: ThemeValues): Record<string, string> {
  const primaryForeground = contrastText(theme.primary);
  const secondaryForeground = contrastText(theme.secondary);
  const accentForeground = contrastText(theme.accent);
  const onStrong = contrastText(theme.surfaceStrong);
  const radius = `${clamp(theme.radius, 0, 24)}px`;
  const cardPadding = `${lerp(0.75, 1.75, theme.cardDensity)}rem`;
  const section = `${lerp(2.5, 6, theme.sectionSpacing)}rem`;
  const content = `${lerp(64, 80, theme.contentWidth)}rem`;
  const headerPadding = `${lerp(0.5, 1.25, theme.headerDensity)}rem`;
  const shadow = clamp(theme.shadowIntensity, 0, 1);

  const vars: Record<string, string> = {
    "--theme-primary": theme.primary,
    "--theme-primary-hover": mixHex(theme.primary, "#000000", 0.14),
    "--theme-primary-foreground": primaryForeground,
    "--theme-secondary": theme.secondary,
    "--theme-secondary-hover": mixHex(theme.secondary, "#000000", 0.14),
    "--theme-secondary-foreground": secondaryForeground,
    "--theme-accent": theme.accent,
    "--theme-accent-foreground": accentForeground,
    "--theme-background": theme.background,
    "--theme-surface": theme.surface,
    "--theme-surface-muted": theme.surfaceMuted,
    "--theme-surface-strong": theme.surfaceStrong,
    "--theme-on-strong": onStrong,
    "--theme-foreground": theme.foreground,
    "--theme-muted": theme.muted,
    "--theme-border": theme.border,
    "--theme-placeholder": mixHex(theme.surfaceMuted, theme.border, 0.35),
    "--theme-placeholder-ink": mixHex(theme.muted, theme.border, 0.35),
    "--theme-focus": mixHex(theme.primary, "#3d7eb5", 0.35),
    "--theme-danger": "#9b2c2c",
    "--theme-font-heading": fontStacks[theme.headingFont],
    "--theme-font-body": fontStacks[theme.bodyFont],
    "--theme-heading-scale": String(clamp(theme.headingScale, 0.9, 1.15)),
    "--theme-body-scale": String(clamp(theme.bodyScale, 0.9, 1.1)),
    "--theme-radius": radius,
    "--theme-shadow-intensity": String(shadow),
    "--theme-card-padding": cardPadding,
    "--theme-section": section,
    "--theme-content-width": content,
    "--theme-header-padding": headerPadding,
  };

  if (isWcdaFactoryTheme(theme)) {
    return { ...vars, ...wcdaFactoryCssVars };
  }

  return vars;
}

export function applyThemeToElement(
  theme: ThemeValues,
  element: HTMLElement,
) {
  const vars = themeToCssVars(theme);
  for (const [name, value] of Object.entries(vars)) {
    element.style.setProperty(name, value);
  }
}

export function clearThemeFromElement(element: HTMLElement) {
  for (const name of Object.keys(themeToCssVars(defaultPublicTheme))) {
    element.style.removeProperty(name);
  }
}

export function createPreviewSrc(path: string) {
  const url = new URL(path, "https://wcaldwelldentalarts.com");
  url.searchParams.set(THEME_LAB_QUERY, "1");
  return `${url.pathname}${url.search}`;
}

export function isThemeLabPreview() {
  if (typeof window === "undefined") {
    return false;
  }

  return new URLSearchParams(window.location.search).get(THEME_LAB_QUERY) === "1";
}

export function isThemeLabEnabled() {
  return process.env.NODE_ENV === "development";
}

export const THEME_VALUE_KEYS = [
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
  "headingFont",
  "bodyFont",
  "headingScale",
  "bodyScale",
  "radius",
  "shadowIntensity",
  "cardDensity",
  "sectionSpacing",
  "contentWidth",
  "headerDensity",
] as const satisfies ReadonlyArray<keyof ThemeValues>;

const FONT_IDS: readonly ThemeFontId[] = ["geist", "arial", "georgia", "system"];

const NUMBER_RANGES: Record<
  Extract<keyof ThemeValues, "headingScale" | "bodyScale" | "radius" | "shadowIntensity" | "cardDensity" | "sectionSpacing" | "contentWidth" | "headerDensity">,
  { min: number; max: number }
> = {
  headingScale: { min: 0.9, max: 1.15 },
  bodyScale: { min: 0.9, max: 1.1 },
  radius: { min: 0, max: 24 },
  shadowIntensity: { min: 0, max: 1 },
  cardDensity: { min: 0, max: 1 },
  sectionSpacing: { min: 0, max: 1 },
  contentWidth: { min: 0, max: 1 },
  headerDensity: { min: 0, max: 1 },
};

export function pickThemeValues(theme: ThemeValues): ThemeValues {
  return {
    primary: theme.primary,
    secondary: theme.secondary,
    accent: theme.accent,
    background: theme.background,
    surface: theme.surface,
    surfaceMuted: theme.surfaceMuted,
    surfaceStrong: theme.surfaceStrong,
    foreground: theme.foreground,
    muted: theme.muted,
    border: theme.border,
    headingFont: theme.headingFont,
    bodyFont: theme.bodyFont,
    headingScale: theme.headingScale,
    bodyScale: theme.bodyScale,
    radius: theme.radius,
    shadowIntensity: theme.shadowIntensity,
    cardDensity: theme.cardDensity,
    sectionSpacing: theme.sectionSpacing,
    contentWidth: theme.contentWidth,
    headerDensity: theme.headerDensity,
  };
}

export function parseThemeValues(input: unknown): ThemeValues | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return null;
  }

  const record = input as Record<string, unknown>;
  const parsed: Record<string, string | number> = {};

  for (const key of THEME_VALUE_KEYS) {
    if (!(key in record)) {
      return null;
    }

    const value = record[key];

    if (key === "headingFont" || key === "bodyFont") {
      if (typeof value !== "string" || !FONT_IDS.includes(value as ThemeFontId)) {
        return null;
      }
      parsed[key] = value;
      continue;
    }

    if (key in NUMBER_RANGES) {
      const range = NUMBER_RANGES[key as keyof typeof NUMBER_RANGES];
      if (typeof value !== "number" || !Number.isFinite(value)) {
        return null;
      }
      if (value < range.min || value > range.max) {
        return null;
      }
      parsed[key] = value;
      continue;
    }

    if (typeof value !== "string" || !isHexColor(value)) {
      return null;
    }
    parsed[key] = value;
  }

  return pickThemeValues(parsed as ThemeValues);
}

export function themeValuesEqual(a: ThemeValues, b: ThemeValues) {
  return THEME_VALUE_KEYS.every((key) => {
    const left = a[key];
    const right = b[key];
    if (typeof left === "number" && typeof right === "number") {
      return Math.abs(left - right) < 0.001;
    }
    return left === right;
  });
}

export function approvedThemeStyleText(theme: ThemeValues = approvedTheme) {
  const light = Object.entries(themeToCssVars(theme))
    .map(([name, value]) => `${name}: ${value};`)
    .join(" ");

  return `:root { ${light} }`;
}

export function nextApprovedThemeVersion(
  currentVersion: string,
  now: Date = new Date(),
) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  const date = `${year}.${month}.${day}`;
  const match = /^(\d{4}\.\d{2}\.\d{2})-(\d{2,})$/.exec(currentVersion);

  if (match && match[1] === date) {
    const next = Number.parseInt(match[2], 10) + 1;
    return `${date}-${String(next).padStart(2, "0")}`;
  }

  return `${date}-01`;
}
