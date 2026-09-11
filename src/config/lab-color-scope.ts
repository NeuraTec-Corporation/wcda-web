import type { ContentPageId } from "@/config/content-publication";
import { parseHexColorInput, type ThemeValues } from "@/config/theme";
import type { ExperienceValues, VisualTargetId } from "@/config/experience";
import type { LabMode, LabBi } from "@/config/lab-registry";
import type { LabSectionId } from "@/config/lab-ui";
import { sectionColorKey } from "@/config/scoped-colors";

export type {
  ScopedColors,
} from "@/config/scoped-colors";
export {
  compactScopedColors,
  copyElementScopedColor,
  copyPageScopedColor,
  copySectionScopedColor,
  parseScopedColors,
  sectionColorKey,
  setElementScopedColor,
  setPageScopedColor,
  setSectionScopedColor,
  applyScopedElementFills,
  clearScopedElementFills,
  scopedCanvasStyle,
  scopedSurfaceStyle,
} from "@/config/scoped-colors";

export type ColorApplyKind =
  | "system"
  | "page"
  | "section"
  | "element";

export type SystemColorProperty =
  | "pageBackground"
  | "headerBackground"
  | "footerBackground"
  | "background"
  | "surface"
  | "surfaceMuted"
  | "surfaceStrong"
  | "primary"
  | "secondary"
  | "accent"
  | "foreground"
  | "muted"
  | "border"
  | "cta"
  | "ctaHover"
  | "navHover";

export type LocalColorProperty = "pageBackground" | "sectionBackground" | "containerBackground";

export type ColorApplyTarget = {
  kind: ColorApplyKind;
  property: string;
  propertyLabel: LabBi;
  resultLabel: LabBi;
  applyLabel: LabBi;
  pageId?: ContentPageId;
  pageLabel?: LabBi;
  sectionId?: string;
  sectionLabel?: LabBi;
  elementId?: VisualTargetId;
  elementLabel?: LabBi;
  themeKey?: SystemColorProperty;
};

export const CONTAINER_COLOR_TARGETS: readonly VisualTargetId[] = [
  "home-care-areas",
  "services-care-cards",
  "patients-resource-cards",
  "editorial-cards",
  "home-cta",
  "home-doctor-media",
  "about-doctor-media",
  "about-content",
  "services-treatment-media",
  "contact-media",
  "technology-media",
];

export const SYSTEM_COLOR_PROPERTIES: Array<{
  id: SystemColorProperty;
  label: LabBi;
}> = [
  { id: "pageBackground", label: { en: "Global Page Background", es: "Fondo de página global" } },
  { id: "background", label: { en: "Global Background token", es: "Token de fondo global" } },
  { id: "surface", label: { en: "Global Surface", es: "Superficie global" } },
  { id: "surfaceMuted", label: { en: "Global Muted Background", es: "Fondo atenuado global" } },
  { id: "accent", label: { en: "Global Accent", es: "Acento global" } },
  { id: "primary", label: { en: "Global Primary", es: "Primario global" } },
  { id: "headerBackground", label: { en: "Header Background", es: "Fondo del encabezado" } },
  { id: "footerBackground", label: { en: "Footer Background", es: "Fondo del pie" } },
  { id: "foreground", label: { en: "Global Text", es: "Texto global" } },
  { id: "muted", label: { en: "Global Muted Text", es: "Texto atenuado global" } },
  { id: "border", label: { en: "Global Border", es: "Borde global" } },
  { id: "cta", label: { en: "Global CTA", es: "CTA global" } },
];

export function isContainerColorTarget(
  target?: string,
): target is VisualTargetId {
  return Boolean(
    target && CONTAINER_COLOR_TARGETS.includes(target as VisualTargetId),
  );
}

export function defaultSystemProperty(section: LabSectionId): SystemColorProperty {
  if (section === "header") return "headerBackground";
  if (section === "footer") return "footerBackground";
  if (section === "surfaces") return "pageBackground";
  if (section === "colors") return "background";
  return "pageBackground";
}

export function systemFamilyForProperty(
  property: SystemColorProperty,
): "surfaces" | "header" | "footer" | "colors" {
  if (property === "pageBackground") return "surfaces";
  if (property === "headerBackground") return "header";
  if (property === "footerBackground") return "footer";
  return "colors";
}

export function themeValueForProperty(theme: ThemeValues, property: SystemColorProperty) {
  const value = theme[property];
  return typeof value === "string" ? value : undefined;
}

type ResolveArgs = {
  labMode: LabMode;
  displayedSection: LabSectionId;
  systemProperty: SystemColorProperty;
  localProperty: LocalColorProperty;
  pageId?: ContentPageId;
  pageLabel?: LabBi;
  sectionId?: string;
  sectionLabel?: LabBi;
  elementId?: VisualTargetId | "section";
  elementLabel?: LabBi;
};

export function resolveColorApplyTarget(args: ResolveArgs): ColorApplyTarget {
  if (
    args.labMode === "editor" &&
    args.elementId === "header-logo"
  ) {
    return {
      kind: "system",
      property: "headerBackground",
      propertyLabel: { en: "Header Background", es: "Fondo del encabezado" },
      resultLabel: {
        en: "Affects Header only. Page canvas and Footer keep their own tokens.",
        es: "Afecta solo el encabezado. El lienzo y el pie conservan sus tokens.",
      },
      applyLabel: { en: "Apply to Header", es: "Aplicar al encabezado" },
      themeKey: "headerBackground",
      elementId: "header-logo",
      elementLabel: args.elementLabel,
    };
  }

  if (args.labMode === "system") {
    const meta =
      SYSTEM_COLOR_PROPERTIES.find((item) => item.id === args.systemProperty) ??
      SYSTEM_COLOR_PROPERTIES[0];
    const kindNote =
      args.systemProperty === "headerBackground"
        ? {
            en: "Affects Header only. Page canvas and Footer keep their own tokens.",
            es: "Afecta solo el encabezado. El lienzo y el pie conservan sus tokens.",
          }
        : args.systemProperty === "footerBackground"
          ? {
              en: "Affects Footer only. Page canvas and Header keep their own tokens.",
              es: "Afecta solo el pie. El lienzo y el encabezado conservan sus tokens.",
            }
          : {
              en: "Affects all pages that inherit this global token. Explicit local overrides stay in place.",
              es: "Afecta todas las páginas que heredan este token global. Las excepciones locales explícitas se conservan.",
            };
    return {
      kind: "system",
      property: meta.id,
      propertyLabel: meta.label,
      resultLabel: kindNote,
      applyLabel: { en: "Apply Globally", es: "Aplicar globalmente" },
      themeKey: meta.id,
    };
  }

  if (
    args.localProperty === "containerBackground" &&
    args.elementId &&
    args.elementId !== "section" &&
    isContainerColorTarget(args.elementId)
  ) {
    return {
      kind: "element",
      property: "containerBackground",
      propertyLabel: { en: "Container Background", es: "Fondo del contenedor" },
      resultLabel: {
        en: "Affects this selected element/container only.",
        es: "Afecta solo este elemento/contenedor seleccionado.",
      },
      applyLabel: { en: "Apply to Element", es: "Aplicar al elemento" },
      pageId: args.pageId,
      pageLabel: args.pageLabel,
      sectionId: args.sectionId,
      sectionLabel: args.sectionLabel,
      elementId: args.elementId,
      elementLabel: args.elementLabel,
    };
  }

  if (args.localProperty === "sectionBackground" && args.pageId && args.sectionId) {
    return {
      kind: "section",
      property: "sectionBackground",
      propertyLabel: { en: "Section Background", es: "Fondo de sección" },
      resultLabel: {
        en: "Affects this section only.",
        es: "Afecta solo esta sección.",
      },
      applyLabel: { en: "Apply to Section", es: "Aplicar a la sección" },
      pageId: args.pageId,
      pageLabel: args.pageLabel,
      sectionId: args.sectionId,
      sectionLabel: args.sectionLabel,
    };
  }

  return {
    kind: "page",
    property: "pageBackground",
    propertyLabel: { en: "Page Background", es: "Fondo de página" },
    resultLabel: {
      en: "Affects this page only. Other pages keep inheriting the System background.",
      es: "Afecta solo esta página. Las demás siguen heredando el fondo de Sistema.",
    },
    applyLabel: { en: "Apply to Page", es: "Aplicar a la página" },
    pageId: args.pageId,
    pageLabel: args.pageLabel,
  };
}

export function defaultLocalProperty(
  elementId?: VisualTargetId | "section",
): LocalColorProperty {
  if (elementId && elementId !== "section" && isContainerColorTarget(elementId)) {
    return "containerBackground";
  }
  if (elementId === "section") {
    return "sectionBackground";
  }
  return "pageBackground";
}

export function resolveColorApplyHex(
  target: ColorApplyTarget,
  theme: ThemeValues,
  experience: ExperienceValues,
) {
  if (target.kind === "system" && target.themeKey) {
    const value = theme[target.themeKey];
    return typeof value === "string" ? parseHexColorInput(value) ?? undefined : undefined;
  }
  if (target.kind === "page" && target.pageId) {
    return experience.scopedColors?.pages?.[target.pageId];
  }
  if (target.kind === "section" && target.pageId && target.sectionId) {
    return experience.scopedColors?.sections?.[
      sectionColorKey(target.pageId, target.sectionId)
    ];
  }
  if (target.kind === "element" && target.elementId) {
    return experience.scopedColors?.elements?.[target.elementId];
  }
  return undefined;
}
