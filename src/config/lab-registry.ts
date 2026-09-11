import type { LabLanguage } from "@/config/lab-ui";
import type { ContentPageId } from "@/config/content-publication";
import { contentPages } from "@/config/publication-catalog";
import type { VisualTargetId } from "@/config/experience";
import type { PreviewPagePath } from "@/config/theme";
import {
  CONTENT_ELEMENT_FIELDS,
  HOME_HERO_FIELD_IDS,
  type ContentElementId,
  type ContentFieldId,
} from "@/config/site-content";
import {
  getConfirmedCategories,
  getFeaturedCareAreas,
} from "@/data/services";

export type LabMode = "editor" | "system" | "approval" | "recovery";
export type LabEditorElementId = VisualTargetId | ContentElementId | "section";

export type LabControlFamily =
  | "publication"
  | "copy"
  | "position"
  | "media"
  | "containers"
  | "motion"
  | "effects"
  | "brand"
  | "colors"
  | "typography"
  | "surfaces"
  | "header"
  | "footer"
  | "tools"
  | "recovery";

export type LabDeclaredScope = "global" | "page" | "section" | "element" | "recovery";

export type LabBi = { en: string; es: string };

export type LabElementDef = {
  id: LabEditorElementId;
  visualTarget?: VisualTargetId;
  itemKey?: string;
  contentFields?: readonly ContentFieldId[];
  parentId?: LabEditorElementId;
  label: LabBi;
  families: readonly LabControlFamily[];
  publication: boolean;
  scope: LabDeclaredScope;
};

export type LabPageSectionDef = {
  id: string;
  label: LabBi;
  publication: boolean;
  elements: readonly LabElementDef[];
};

export type LabPageDef = {
  id: ContentPageId;
  path: string;
  label: LabBi;
  sections: readonly LabPageSectionDef[];
};

const SECTION_ELEMENT: LabElementDef = {
  id: "section",
  label: { en: "Section", es: "Sección" },
  families: ["publication"],
  publication: true,
  scope: "section",
};

function copyTarget(
  id: ContentElementId,
  label: LabBi,
): LabElementDef {
  return {
    id,
    contentFields: CONTENT_ELEMENT_FIELDS[id],
    parentId: "home-hero-content",
    label,
    families: ["copy"],
    publication: false,
    scope: "element",
  };
}

function visual(
  id: VisualTargetId,
  label: LabBi,
  families: readonly LabControlFamily[],
  extra?: Partial<Pick<LabElementDef, "contentFields">>,
): LabElementDef {
  return {
    id,
    visualTarget: id,
    contentFields: extra?.contentFields,
    label,
    families,
    publication: false,
    scope: "element",
  };
}

function sectionOf(
  page: (typeof contentPages)[number],
  sectionId: string,
  elements: readonly LabElementDef[],
): LabPageSectionDef {
  const source = page.sections.find((item) => item.id === sectionId);
  if (!source) {
    throw new Error(`Unknown Lab section ${page.id}/${sectionId}`);
  }
  return {
    id: source.id,
    label: source.label,
    publication: true,
    elements: [SECTION_ELEMENT, ...elements],
  };
}

function pageDef(
  id: ContentPageId,
  attached: Record<string, readonly LabElementDef[]>,
): LabPageDef {
  const page = contentPages.find((item) => item.id === id);
  if (!page) {
    throw new Error(`Unknown content page ${id}`);
  }
  return {
    id: page.id,
    path: page.path,
    label: page.label,
    sections: page.sections.map((item) =>
      sectionOf(page, item.id, attached[item.id] ?? []),
    ),
  };
}

const MEDIA_CONTAINER: LabControlFamily[] = ["media", "containers"];
const CONTAINER_ONLY: LabControlFamily[] = ["containers"];
const MARQUEE_EFFECTS: LabControlFamily[] = ["effects"];
const CTA_CONTAINER: LabControlFamily[] = ["containers"];

const EDITORIAL_CARDS_ELEMENT = visual(
  "editorial-cards",
  { en: "Editorial Cards", es: "Tarjetas editoriales" },
  CONTAINER_ONLY,
);

function careCardElements(
  visualTarget: "home-care-areas" | "services-care-cards",
  categories: readonly { slug: string; title: string }[],
): LabElementDef[] {
  const prefix =
    visualTarget === "home-care-areas" ? "home-care" : "services-care";
  const nodes: LabElementDef[] = [
    visual(
      visualTarget,
      { en: "Service Cards", es: "Tarjetas de servicio" },
      CONTAINER_ONLY,
    ),
  ];
  for (const category of categories) {
    const cardId = `${prefix}-card/${category.slug}` as LabEditorElementId;
    const mediaId = `${prefix}-media/${category.slug}` as LabEditorElementId;
    nodes.push({
      id: cardId,
      label: { en: category.title, es: category.title },
      families: [],
      publication: false,
      scope: "element",
    });
    nodes.push({
      id: mediaId,
      visualTarget,
      parentId: cardId,
      itemKey: category.slug,
      label: { en: "Service Card Media", es: "Media de tarjetas de servicio" },
      families: ["media", "position"],
      publication: false,
      scope: "element",
    });
  }
  return nodes;
}

export const labPages: readonly LabPageDef[] = [
  pageDef("home", {
    hero: [
      visual(
        "home-hero-content",
        { en: "Hero Content", es: "Contenido del héroe" },
        ["copy", "position"],
        { contentFields: HOME_HERO_FIELD_IDS },
      ),
      copyTarget("home-hero-heading", { en: "Heading", es: "Título" }),
      copyTarget("home-hero-description", { en: "Description", es: "Descripción" }),
      copyTarget("home-hero-primary-cta", { en: "Primary CTA", es: "CTA principal" }),
      copyTarget("home-hero-secondary-cta", {
        en: "Secondary CTA",
        es: "CTA secundaria",
      }),
      copyTarget("home-hero-pillars", { en: "Pillars", es: "Pilares" }),
      visual("home-hero-media", { en: "Home Hero Media", es: "Media del héroe (inicio)" }, MEDIA_CONTAINER),
    ],
    marquee: [visual("home-marquee", { en: "Services Marquee", es: "Marquee de servicios" }, MARQUEE_EFFECTS)],
    careAreas: careCardElements("home-care-areas", getFeaturedCareAreas()),
    whyChoose: [EDITORIAL_CARDS_ELEMENT],
    practice: [visual("home-doctor-media", { en: "Dr. Matute Media", es: "Media del Dr. Matute" }, MEDIA_CONTAINER)],
    patientCta: [visual("home-cta", { en: "Primary CTA", es: "CTA primario" }, CTA_CONTAINER)],
  }),
  pageDef("about", {
    philosophy: [visual("about-content", { en: "About Media", es: "Media de About" }, MEDIA_CONTAINER)],
    whyChoose: [EDITORIAL_CARDS_ELEMENT],
    links: [EDITORIAL_CARDS_ELEMENT],
  }),
  pageDef("doctor", {
    intro: [visual("about-doctor-media", { en: "Dr. Matute Media", es: "Media del Dr. Matute" }, MEDIA_CONTAINER)],
    education: [EDITORIAL_CARDS_ELEMENT],
  }),
  pageDef("team", {}),
  pageDef("services", {
    areas: careCardElements("services-care-cards", getConfirmedCategories()),
    treatments: [visual("services-treatment-media", { en: "Treatment Media", es: "Media de tratamientos" }, MEDIA_CONTAINER)],
  }),
  pageDef("patients", {
    resources: [visual("patients-resource-cards", { en: "Patient Resource Cards", es: "Tarjetas de recursos para pacientes" }, CONTAINER_ONLY)],
  }),
  pageDef("patients-first-visit", {
    details: [EDITORIAL_CARDS_ELEMENT],
  }),
  pageDef("patients-financial-options", {
    details: [EDITORIAL_CARDS_ELEMENT],
  }),
  pageDef("patients-insurance", {
    details: [EDITORIAL_CARDS_ELEMENT],
  }),
  pageDef("patients-forms", {
    details: [EDITORIAL_CARDS_ELEMENT],
  }),
  pageDef("technology", {
    details: [visual("technology-media", { en: "Technology Media", es: "Media de tecnología" }, MEDIA_CONTAINER)],
    tools: [EDITORIAL_CARDS_ELEMENT],
  }),
  pageDef("contact", {
    intro: [visual("contact-media", { en: "Contact Media", es: "Media de contacto" }, MEDIA_CONTAINER)],
    details: [EDITORIAL_CARDS_ELEMENT],
    form: [EDITORIAL_CARDS_ELEMENT],
  }),
];

export const labGlobalElements = {
  headerLogo: visual("header-logo", { en: "Header Logo", es: "Logo del encabezado" }, ["media"]),
  editorialCards: EDITORIAL_CARDS_ELEMENT,
} as const;

export const SYSTEM_FAMILIES: readonly LabControlFamily[] = [
  "brand",
  "colors",
  "typography",
  "surfaces",
  "tools",
  "header",
  "footer",
  "containers",
  "motion",
  "effects",
];

export const EDITOR_FAMILIES: readonly LabControlFamily[] = [
  "publication",
  "copy",
  "position",
  "media",
  "containers",
  "effects",
];

export const LAB_MODE_STORAGE_KEY = "wcda-lab-mode-v1";

export function parseLabMode(value: string | null): LabMode {
  if (
    value === "system" ||
    value === "approval" ||
    value === "recovery"
  ) {
    return value;
  }
  return "editor";
}

export function labLabel(value: LabBi, language: LabLanguage) {
  return value[language];
}

export function resolveLabPage(path: string): LabPageDef | undefined {
  const normalized = path.split("?")[0] || path;
  if (normalized === "/services" || normalized.startsWith("/services/")) {
    return labPages.find((page) => page.id === "services");
  }
  return labPages.find((page) => page.path === normalized);
}

export function labPageById(id: ContentPageId) {
  return labPages.find((page) => page.id === id);
}

export function labSectionById(page: LabPageDef, sectionId: string) {
  return page.sections.find((section) => section.id === sectionId) ?? page.sections[0];
}

export function labElementsForSection(section: LabPageSectionDef) {
  return section.elements;
}

export function defaultSectionId(page: LabPageDef) {
  return page.sections[0]?.id ?? "";
}

export function defaultElementId(section: LabPageSectionDef): LabEditorElementId {
  const visual = section.elements.find((item) => item.visualTarget);
  return visual?.id ?? "section";
}

export function familiesForElement(element: LabElementDef): readonly LabControlFamily[] {
  return element.families;
}

export function editorFamiliesForSelection(
  section: LabPageSectionDef | undefined,
  element: LabElementDef | undefined,
): LabControlFamily[] {
  if (!section) {
    return ["tools"];
  }
  if (!element || element.id === "section") {
    return section.publication ? ["publication", "tools"] : ["tools"];
  }
  return [
    ...EDITOR_FAMILIES.filter((family) => element.families.includes(family)),
    "tools",
  ];
}

export function visualTargetForElement(
  element: LabElementDef | undefined,
  fallback: VisualTargetId,
): VisualTargetId {
  return element?.visualTarget ?? fallback;
}

export function findElementForPreview(args: {
  pageId?: string;
  sectionId?: string;
  visualTarget?: string;
  itemKey?: string;
}) {
  const pages = args.pageId
    ? labPages.filter((page) => page.id === args.pageId)
    : labPages;
  for (const page of pages) {
    const sections = args.sectionId
      ? page.sections.filter((section) => section.id === args.sectionId)
      : page.sections;
    for (const section of sections) {
      if (args.itemKey && args.visualTarget) {
        const match = section.elements.find(
          (element) =>
            element.visualTarget === args.visualTarget &&
            element.itemKey === args.itemKey,
        );
        if (match) {
          return { page, section, element: match };
        }
      }
      if (args.visualTarget) {
        const match = section.elements.find(
          (element) =>
            element.visualTarget === args.visualTarget && !element.itemKey,
        );
        if (match) {
          return { page, section, element: match };
        }
        const any = section.elements.find(
          (element) => element.visualTarget === args.visualTarget,
        );
        if (any) {
          return { page, section, element: any };
        }
      }
      if (args.sectionId && !args.visualTarget) {
        const sectionElement = section.elements.find((item) => item.id === "section");
        if (sectionElement) {
          return { page, section, element: sectionElement };
        }
      }
    }
  }
  return null;
}

export function findElement(
  section: LabPageSectionDef | undefined,
  id: LabEditorElementId,
) {
  return section?.elements.find((item) => item.id === id);
}

export function contentFieldsForElement(element?: LabElementDef) {
  return element?.contentFields ?? [];
}

export function rootElementsForSection(section: LabPageSectionDef) {
  return section.elements.filter((item) => !item.parentId);
}

export function childElementsFor(
  section: LabPageSectionDef,
  parentId: LabEditorElementId,
) {
  return section.elements.filter((item) => item.parentId === parentId);
}

export function editorTargetsForPage(path: string): VisualTargetId[] {
  const page = resolveLabPage(path);
  if (!page) {
    return [];
  }
  const ids: VisualTargetId[] = [];
  for (const section of page.sections) {
    for (const element of section.elements) {
      if (element.visualTarget && !ids.includes(element.visualTarget)) {
        ids.push(element.visualTarget);
      }
    }
  }
  return ids;
}

export function sectionIdForVisualTarget(
  page: LabPageDef,
  target: VisualTargetId,
) {
  for (const section of page.sections) {
    if (section.elements.some((item) => item.visualTarget === target)) {
      return section.id;
    }
  }
  return page.sections[0]?.id ?? "";
}

export const labPreviewPagePaths: readonly PreviewPagePath[] = contentPages.map(
  (page) => page.path as PreviewPagePath,
);

export function isGlobalVisualTarget(target: VisualTargetId) {
  return target === "header-logo" || target === "editorial-cards";
}
