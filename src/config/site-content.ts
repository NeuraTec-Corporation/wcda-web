import { homeHero, homeWhyChoose } from "@/data/home";
import type { CardSectionContent, HeroContent } from "@/types/content";

type LabBi = { en: string; es: string };

export const CONTENT_APPLY_PATH = "/api/internal/content";
export const CONTENT_LAB_STORAGE_KEY = "wcda-lab-content-working-v1";
export const CONTENT_CUSTOM_STORAGE_KEY = "wcda-lab-content-custom-v1";

export type ContentGovernance =
  | "editable"
  | "editable-with-warning"
  | "protected";

export type ContentFieldType = "text" | "multiline" | "cta-label" | "link";

export const CONTENT_FIELD_IDS = [
  "home.hero.heading",
  "home.hero.description",
  "home.hero.primaryCta",
  "home.hero.secondaryCta",
  "home.hero.pillar1",
  "home.hero.pillar2",
  "home.hero.pillar3",
  "home.whyChoose.independentOwnership.title",
  "home.whyChoose.independentOwnership.description",
  "home.whyChoose.westCaldwellCommunity.title",
  "home.whyChoose.westCaldwellCommunity.description",
  "home.whyChoose.clearNextSteps.title",
  "home.whyChoose.clearNextSteps.description",
] as const;

export type ContentFieldId = (typeof CONTENT_FIELD_IDS)[number];

export const HOME_HERO_FIELD_IDS = [
  "home.hero.heading",
  "home.hero.description",
  "home.hero.primaryCta",
  "home.hero.secondaryCta",
  "home.hero.pillar1",
  "home.hero.pillar2",
  "home.hero.pillar3",
] as const satisfies readonly ContentFieldId[];

export const HOME_WHY_CHOOSE_ITEM_KEYS = [
  "independent-ownership",
  "west-caldwell-community",
  "clear-next-steps",
] as const;

export type HomeWhyChooseItemKey = (typeof HOME_WHY_CHOOSE_ITEM_KEYS)[number];

export const HOME_WHY_CHOOSE_FIELDS: Record<
  HomeWhyChooseItemKey,
  readonly [ContentFieldId, ContentFieldId]
> = {
  "independent-ownership": [
    "home.whyChoose.independentOwnership.title",
    "home.whyChoose.independentOwnership.description",
  ],
  "west-caldwell-community": [
    "home.whyChoose.westCaldwellCommunity.title",
    "home.whyChoose.westCaldwellCommunity.description",
  ],
  "clear-next-steps": [
    "home.whyChoose.clearNextSteps.title",
    "home.whyChoose.clearNextSteps.description",
  ],
};

export function isHomeWhyChooseItemKey(
  value: string | undefined,
): value is HomeWhyChooseItemKey {
  return Boolean(
    value &&
      (HOME_WHY_CHOOSE_ITEM_KEYS as readonly string[]).includes(value),
  );
}

export const CONTENT_ELEMENT_IDS = [
  "home-hero-heading",
  "home-hero-description",
  "home-hero-primary-cta",
  "home-hero-secondary-cta",
  "home-hero-pillars",
] as const;

export type ContentElementId = (typeof CONTENT_ELEMENT_IDS)[number];

export type SiteContentPatch = Partial<Record<ContentFieldId, string>>;

export type ContentFieldSchema = {
  id: ContentFieldId;
  scope: "element";
  field: string;
  type: ContentFieldType;
  label: LabBi;
  governance: ContentGovernance;
  multiline: boolean;
  linkAllowed: boolean;
  semanticRole?: "heading" | "paragraph" | "cta" | "label";
  recommendedMax?: number;
  guidance?: LabBi;
  warning?: LabBi;
};

export const CONTENT_INTERNAL_ROUTES = [
  "/",
  "/about",
  "/about/dr-jonnathan-matute",
  "/about/team",
  "/services",
  "/patients",
  "/patients/first-visit",
  "/patients/financial-options",
  "/patients/insurance",
  "/patients/forms",
  "/technology",
  "/contact",
  "/request-appointment",
  "/privacy",
  "/accessibility",
] as const;

const PILLAR_DEFAULTS = ["Prevent", "Treat", "Protect"] as const;

export const contentFieldSchema: Record<ContentFieldId, ContentFieldSchema> = {
  "home.hero.heading": {
    id: "home.hero.heading",
    scope: "element",
    field: "title",
    type: "text",
    label: { en: "Heading", es: "Título" },
    governance: "editable",
    multiline: false,
    linkAllowed: false,
    semanticRole: "heading",
    recommendedMax: 48,
    guidance: {
      en: "Recommended maximum: about one visual heading line.",
      es: "Máximo recomendado: aproximadamente una línea de título.",
    },
  },
  "home.hero.description": {
    id: "home.hero.description",
    scope: "element",
    field: "description",
    type: "multiline",
    label: { en: "Description", es: "Descripción" },
    governance: "editable",
    multiline: true,
    linkAllowed: false,
    semanticRole: "paragraph",
    recommendedMax: 280,
    guidance: {
      en: "Recommended maximum: two to three short sentences.",
      es: "Máximo recomendado: dos o tres frases cortas.",
    },
  },
  "home.hero.primaryCta": {
    id: "home.hero.primaryCta",
    scope: "element",
    field: "primaryAction.label",
    type: "cta-label",
    label: { en: "Primary CTA", es: "CTA principal" },
    governance: "editable",
    multiline: false,
    linkAllowed: false,
    semanticRole: "cta",
    recommendedMax: 24,
    guidance: {
      en: "Recommended short label. The destination stays the approved appointment route.",
      es: "Etiqueta corta recomendada. El destino sigue siendo la ruta de cita aprobada.",
    },
  },
  "home.hero.secondaryCta": {
    id: "home.hero.secondaryCta",
    scope: "element",
    field: "secondaryAction.label",
    type: "cta-label",
    label: { en: "Secondary CTA", es: "CTA secundaria" },
    governance: "editable",
    multiline: false,
    linkAllowed: false,
    semanticRole: "cta",
    recommendedMax: 24,
    guidance: {
      en: "Recommended short label. The destination stays the approved services route.",
      es: "Etiqueta corta recomendada. El destino sigue siendo la ruta de servicios aprobada.",
    },
  },
  "home.hero.pillar1": {
    id: "home.hero.pillar1",
    scope: "element",
    field: "pillars.0",
    type: "text",
    label: { en: "Pillar 1", es: "Pilar 1" },
    governance: "editable",
    multiline: false,
    linkAllowed: false,
    semanticRole: "label",
    recommendedMax: 16,
    guidance: {
      en: "Short word or phrase. The public hero displays this in uppercase.",
      es: "Palabra o frase corta. El héroe público la muestra en mayúsculas.",
    },
  },
  "home.hero.pillar2": {
    id: "home.hero.pillar2",
    scope: "element",
    field: "pillars.1",
    type: "text",
    label: { en: "Pillar 2", es: "Pilar 2" },
    governance: "editable",
    multiline: false,
    linkAllowed: false,
    semanticRole: "label",
    recommendedMax: 16,
  },
  "home.hero.pillar3": {
    id: "home.hero.pillar3",
    scope: "element",
    field: "pillars.2",
    type: "text",
    label: { en: "Pillar 3", es: "Pilar 3" },
    governance: "editable",
    multiline: false,
    linkAllowed: false,
    semanticRole: "label",
    recommendedMax: 16,
  },
  "home.whyChoose.independentOwnership.title": {
    id: "home.whyChoose.independentOwnership.title",
    scope: "element",
    field: "items.independent-ownership.title",
    type: "text",
    label: { en: "Title", es: "Título" },
    governance: "editable",
    multiline: false,
    linkAllowed: false,
    semanticRole: "heading",
    recommendedMax: 48,
  },
  "home.whyChoose.independentOwnership.description": {
    id: "home.whyChoose.independentOwnership.description",
    scope: "element",
    field: "items.independent-ownership.description",
    type: "multiline",
    label: { en: "Description", es: "Descripción" },
    governance: "editable",
    multiline: true,
    linkAllowed: false,
    semanticRole: "paragraph",
    recommendedMax: 220,
  },
  "home.whyChoose.westCaldwellCommunity.title": {
    id: "home.whyChoose.westCaldwellCommunity.title",
    scope: "element",
    field: "items.west-caldwell-community.title",
    type: "text",
    label: { en: "Title", es: "Título" },
    governance: "editable",
    multiline: false,
    linkAllowed: false,
    semanticRole: "heading",
    recommendedMax: 48,
  },
  "home.whyChoose.westCaldwellCommunity.description": {
    id: "home.whyChoose.westCaldwellCommunity.description",
    scope: "element",
    field: "items.west-caldwell-community.description",
    type: "multiline",
    label: { en: "Description", es: "Descripción" },
    governance: "editable",
    multiline: true,
    linkAllowed: false,
    semanticRole: "paragraph",
    recommendedMax: 220,
  },
  "home.whyChoose.clearNextSteps.title": {
    id: "home.whyChoose.clearNextSteps.title",
    scope: "element",
    field: "items.clear-next-steps.title",
    type: "text",
    label: { en: "Title", es: "Título" },
    governance: "editable",
    multiline: false,
    linkAllowed: false,
    semanticRole: "heading",
    recommendedMax: 48,
  },
  "home.whyChoose.clearNextSteps.description": {
    id: "home.whyChoose.clearNextSteps.description",
    scope: "element",
    field: "items.clear-next-steps.description",
    type: "multiline",
    label: { en: "Description", es: "Descripción" },
    governance: "editable",
    multiline: true,
    linkAllowed: false,
    semanticRole: "paragraph",
    recommendedMax: 220,
  },
};

export const CONTENT_ELEMENT_FIELDS: Record<
  ContentElementId,
  readonly ContentFieldId[]
> = {
  "home-hero-heading": ["home.hero.heading"],
  "home-hero-description": ["home.hero.description"],
  "home-hero-primary-cta": ["home.hero.primaryCta"],
  "home-hero-secondary-cta": ["home.hero.secondaryCta"],
  "home-hero-pillars": [
    "home.hero.pillar1",
    "home.hero.pillar2",
    "home.hero.pillar3",
  ],
};

export function isContentFieldId(value: string): value is ContentFieldId {
  return (CONTENT_FIELD_IDS as readonly string[]).includes(value);
}

export function isContentElementId(value: string): value is ContentElementId {
  return (CONTENT_ELEMENT_IDS as readonly string[]).includes(value);
}

export function sanitizeContentText(value: string) {
  return value.replace(/[<>\u0000]/g, "");
}

export function defaultContentValue(id: ContentFieldId): string {
  switch (id) {
    case "home.hero.heading":
      return homeHero.title;
    case "home.hero.description":
      return homeHero.description;
    case "home.hero.primaryCta":
      return homeHero.primaryAction.label;
    case "home.hero.secondaryCta":
      return homeHero.secondaryAction?.label ?? "";
    case "home.hero.pillar1":
      return homeHero.pillars[0] ?? PILLAR_DEFAULTS[0];
    case "home.hero.pillar2":
      return homeHero.pillars[1] ?? PILLAR_DEFAULTS[1];
    case "home.hero.pillar3":
      return homeHero.pillars[2] ?? PILLAR_DEFAULTS[2];
    case "home.whyChoose.independentOwnership.title":
      return homeWhyChoose.items[0]?.title ?? "";
    case "home.whyChoose.independentOwnership.description":
      return homeWhyChoose.items[0]?.description ?? "";
    case "home.whyChoose.westCaldwellCommunity.title":
      return homeWhyChoose.items[1]?.title ?? "";
    case "home.whyChoose.westCaldwellCommunity.description":
      return homeWhyChoose.items[1]?.description ?? "";
    case "home.whyChoose.clearNextSteps.title":
      return homeWhyChoose.items[2]?.title ?? "";
    case "home.whyChoose.clearNextSteps.description":
      return homeWhyChoose.items[2]?.description ?? "";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function parseSiteContentPatch(input: unknown): SiteContentPatch | null {
  if (input == null) {
    return {};
  }
  if (!isRecord(input)) {
    return null;
  }
  const next: SiteContentPatch = {};
  for (const id of CONTENT_FIELD_IDS) {
    const value = input[id];
    if (typeof value === "string") {
      next[id] = sanitizeContentText(value);
    }
  }
  return next;
}

export function pickSiteContentPatch(patch: SiteContentPatch): SiteContentPatch {
  const next: SiteContentPatch = {};
  for (const id of CONTENT_FIELD_IDS) {
    const value = patch[id];
    if (typeof value === "string") {
      next[id] = sanitizeContentText(value);
    }
  }
  return next;
}

export function siteContentEqual(left: SiteContentPatch, right: SiteContentPatch) {
  for (const id of CONTENT_FIELD_IDS) {
    if ((left[id] ?? "") !== (right[id] ?? "")) {
      return false;
    }
  }
  return true;
}

export function resolveContentValue(
  id: ContentFieldId,
  ...layers: SiteContentPatch[]
) {
  for (const layer of layers) {
    const value = layer[id];
    if (typeof value === "string") {
      return sanitizeContentText(value);
    }
  }
  return defaultContentValue(id);
}

export function contentSliceEqual(
  ids: readonly ContentFieldId[],
  left: SiteContentPatch,
  right: SiteContentPatch,
  fallback: SiteContentPatch = {},
) {
  return ids.every(
    (id) =>
      resolveContentValue(id, left, fallback) ===
      resolveContentValue(id, right, fallback),
  );
}

export function applyContentSlice(
  target: SiteContentPatch,
  source: SiteContentPatch,
  ids: readonly ContentFieldId[],
  current: SiteContentPatch = {},
): SiteContentPatch {
  const next = pickSiteContentPatch(target);
  for (const id of ids) {
    next[id] = resolveContentValue(id, source, target, current);
  }
  return pickSiteContentPatch(next);
}

export function publishContentSlice(
  current: SiteContentPatch,
  custom: SiteContentPatch,
  ids: readonly ContentFieldId[],
): SiteContentPatch {
  const next = pickSiteContentPatch(current);
  for (const id of ids) {
    const resolved = resolveContentValue(id, custom, current);
    if (resolved === defaultContentValue(id)) {
      delete next[id];
    } else {
      next[id] = resolved;
    }
  }
  return pickSiteContentPatch(next);
}

export function restoreContentSlice(
  target: SiteContentPatch,
  source: SiteContentPatch,
  ids: readonly ContentFieldId[],
): SiteContentPatch {
  const next = pickSiteContentPatch(target);
  for (const id of ids) {
    const value = source[id];
    if (typeof value === "string") {
      next[id] = sanitizeContentText(value);
    } else {
      delete next[id];
    }
  }
  return next;
}

export function defaultSiteContentPatch(): SiteContentPatch {
  const next: SiteContentPatch = {};
  for (const id of CONTENT_FIELD_IDS) {
    next[id] = defaultContentValue(id);
  }
  return next;
}

export function resolveWorkingSiteContent(
  working: SiteContentPatch,
  custom: SiteContentPatch,
  current: SiteContentPatch,
): SiteContentPatch {
  const next: SiteContentPatch = {};
  for (const id of CONTENT_FIELD_IDS) {
    next[id] = resolveContentValue(id, working, custom, current);
  }
  return next;
}

export function contentLiveUnsaved(
  ids: readonly ContentFieldId[],
  working: SiteContentPatch,
  custom: SiteContentPatch,
  current: SiteContentPatch,
) {
  return ids.some(
    (id) =>
      resolveContentValue(id, working, custom, current) !==
      resolveContentValue(id, custom, current),
  );
}

export function dirtyContentFieldIds(
  ids: readonly ContentFieldId[],
  working: SiteContentPatch,
  custom: SiteContentPatch,
  current: SiteContentPatch,
): ContentFieldId[] {
  return ids.filter(
    (id) =>
      resolveContentValue(id, working, custom, current) !==
      resolveContentValue(id, custom, current),
  );
}

export function contentAppliedNotCurrent(
  ids: readonly ContentFieldId[],
  working: SiteContentPatch,
  custom: SiteContentPatch,
  current: SiteContentPatch,
) {
  return (
    !contentLiveUnsaved(ids, working, custom, current) &&
    ids.some(
      (id) =>
        resolveContentValue(id, custom, current) !==
        resolveContentValue(id, current),
    )
  );
}

export function clearContentSlice(
  target: SiteContentPatch,
  ids: readonly ContentFieldId[],
): SiteContentPatch {
  const next = pickSiteContentPatch(target);
  for (const id of ids) {
    delete next[id];
  }
  return next;
}

export function contentFieldsNeedWarning(ids: readonly ContentFieldId[]) {
  return ids.some(
    (id) => contentFieldSchema[id].governance === "editable-with-warning",
  );
}

export function contentFieldsAreProtected(ids: readonly ContentFieldId[]) {
  return ids.every(
    (id) => contentFieldSchema[id].governance === "protected",
  );
}

export function resolveHomeHero(patch: SiteContentPatch = {}): HeroContent {
  const heading = resolveContentValue("home.hero.heading", patch);
  const description = resolveContentValue("home.hero.description", patch);
  const primaryLabel = resolveContentValue("home.hero.primaryCta", patch);
  const secondaryLabel = resolveContentValue("home.hero.secondaryCta", patch);
  const pillars = [
    resolveContentValue("home.hero.pillar1", patch),
    resolveContentValue("home.hero.pillar2", patch),
    resolveContentValue("home.hero.pillar3", patch),
  ] as const;

  return {
    ...homeHero,
    title: heading || homeHero.title,
    description: description || homeHero.description,
    primaryAction: {
      ...homeHero.primaryAction,
      label: primaryLabel || homeHero.primaryAction.label,
    },
    secondaryAction: homeHero.secondaryAction
      ? {
          ...homeHero.secondaryAction,
          label: secondaryLabel || homeHero.secondaryAction.label,
        }
      : undefined,
    pillars,
  };
}

export function resolveHomeWhyChoose(
  patch: SiteContentPatch = {},
): CardSectionContent {
  return {
    ...homeWhyChoose,
    items: homeWhyChoose.items.map((item) => {
      if (!isHomeWhyChooseItemKey(item.id)) {
        return item;
      }
      const [titleId, descriptionId] = HOME_WHY_CHOOSE_FIELDS[item.id];
      const title = resolveContentValue(titleId, patch);
      const description = resolveContentValue(descriptionId, patch);
      return {
        ...item,
        title: title || item.title,
        description: description || item.description,
      };
    }),
  };
}

export function listPendingContentScopes(
  custom: SiteContentPatch,
  current: SiteContentPatch,
  fallback: SiteContentPatch = current,
): {
  id: string;
  path: LabBi;
  ids: readonly ContentFieldId[];
  pageId: "home";
  sectionId: string;
  elementId: string;
}[] {
  const pending: {
    id: string;
    path: LabBi;
    ids: readonly ContentFieldId[];
    pageId: "home";
    sectionId: string;
    elementId: string;
  }[] = [];
  const groups: {
    id: string;
    ids: readonly ContentFieldId[];
    path: LabBi;
    pageId: "home";
    sectionId: string;
    elementId: string;
  }[] = [
    {
      id: "copy:home.hero",
      ids: HOME_HERO_FIELD_IDS,
      path: { en: "Home / Hero / Hero Content", es: "Inicio / Héroe / Contenido del héroe" },
      pageId: "home",
      sectionId: "hero",
      elementId: "home-hero-content",
    },
    {
      id: "copy:home.whyChoose.independent-ownership",
      ids: HOME_WHY_CHOOSE_FIELDS["independent-ownership"],
      path: {
        en: "Home / Why this practice / Independent ownership",
        es: "Inicio / Por qué este consultorio / Propiedad independiente",
      },
      pageId: "home",
      sectionId: "whyChoose",
      elementId: "home-why-card/independent-ownership",
    },
    {
      id: "copy:home.whyChoose.west-caldwell-community",
      ids: HOME_WHY_CHOOSE_FIELDS["west-caldwell-community"],
      path: {
        en: "Home / Why this practice / West Caldwell community",
        es: "Inicio / Por qué este consultorio / Comunidad de West Caldwell",
      },
      pageId: "home",
      sectionId: "whyChoose",
      elementId: "home-why-card/west-caldwell-community",
    },
    {
      id: "copy:home.whyChoose.clear-next-steps",
      ids: HOME_WHY_CHOOSE_FIELDS["clear-next-steps"],
      path: {
        en: "Home / Why this practice / Clear next steps",
        es: "Inicio / Por qué este consultorio / Próximos pasos claros",
      },
      pageId: "home",
      sectionId: "whyChoose",
      elementId: "home-why-card/clear-next-steps",
    },
  ];
  for (const group of groups) {
    if (contentLiveUnsaved(group.ids, custom, current, fallback)) {
      pending.push(group);
    }
  }
  return pending;
}

export const factorySiteContent: SiteContentPatch = {};

/* WCDA_APPROVED_SITE_CONTENT_START */
export const approvedSiteContent: SiteContentPatch = {
  "home.hero.heading": "Thoughtful dentistry Personal care",
  "home.hero.pillar1": "Prevent •",
  "home.hero.pillar2": "Treat •",
};
/* WCDA_APPROVED_SITE_CONTENT_END */
