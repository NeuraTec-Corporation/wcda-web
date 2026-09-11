import type { TreatmentSectionId } from "@/types/content";
import type { PublicationStatus } from "@/types/navigation";

export const PUBLICATION_APPLY_PATH = "/api/internal/publication";
export const PUBLICATION_LAB_STORAGE_KEY = "wcda-lab-publication-working-v1";
export const PUBLICATION_CUSTOM_STORAGE_KEY = "wcda-lab-publication-custom-v1";

export const CONTENT_PAGE_IDS = [
  "home",
  "about",
  "doctor",
  "team",
  "services",
  "patients",
  "patients-first-visit",
  "patients-financial-options",
  "patients-insurance",
  "patients-forms",
  "technology",
  "contact",
] as const;

export type ContentPageId = (typeof CONTENT_PAGE_IDS)[number];

export type PagePublicationPatch = {
  enabled?: boolean;
  sections?: Record<string, boolean>;
};

export type CategoryPublicationPatch = {
  enabled?: boolean;
};

export type TreatmentPublicationPatch = {
  enabled?: boolean;
  sections?: Partial<Record<TreatmentSectionId, boolean>>;
};

export type ContentPublicationPatch = {
  pages?: Partial<Record<ContentPageId, PagePublicationPatch>>;
  categories?: Record<string, CategoryPublicationPatch>;
  treatments?: Record<string, TreatmentPublicationPatch>;
};

export function treatmentPublicationKey(
  categorySlug: string,
  treatmentSlug: string,
) {
  return `${categorySlug}/${treatmentSlug}`;
}

export function isContentPageId(value: string): value is ContentPageId {
  return (CONTENT_PAGE_IDS as readonly string[]).includes(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parseBooleanMap(input: unknown): Record<string, boolean> | undefined {
  if (!isRecord(input)) {
    return undefined;
  }
  const next: Record<string, boolean> = {};
  for (const [key, value] of Object.entries(input)) {
    if (typeof value === "boolean") {
      next[key] = value;
    }
  }
  return Object.keys(next).length > 0 ? next : undefined;
}

function parsePagePatch(input: unknown): PagePublicationPatch | undefined {
  if (!isRecord(input)) {
    return undefined;
  }
  const patch: PagePublicationPatch = {};
  if (typeof input.enabled === "boolean") {
    patch.enabled = input.enabled;
  }
  const sections = parseBooleanMap(input.sections);
  if (sections) {
    patch.sections = sections;
  }
  return patch.enabled !== undefined || patch.sections ? patch : undefined;
}

function parseCategoryPatch(input: unknown): CategoryPublicationPatch | undefined {
  if (!isRecord(input) || typeof input.enabled !== "boolean") {
    return undefined;
  }
  return { enabled: input.enabled };
}

function parseTreatmentPatch(input: unknown): TreatmentPublicationPatch | undefined {
  if (!isRecord(input)) {
    return undefined;
  }
  const patch: TreatmentPublicationPatch = {};
  if (typeof input.enabled === "boolean") {
    patch.enabled = input.enabled;
  }
  const sections = parseBooleanMap(input.sections);
  if (sections) {
    patch.sections = sections;
  }
  return patch.enabled !== undefined || patch.sections ? patch : undefined;
}

export function parseContentPublicationPatch(
  input: unknown,
): ContentPublicationPatch | null {
  if (input == null) {
    return {};
  }
  if (!isRecord(input)) {
    return null;
  }

  const next: ContentPublicationPatch = {};

  if (isRecord(input.pages)) {
    const pages: Partial<Record<ContentPageId, PagePublicationPatch>> = {};
    for (const [key, value] of Object.entries(input.pages)) {
      if (!isContentPageId(key)) {
        continue;
      }
      const patch = parsePagePatch(value);
      if (patch) {
        pages[key] = patch;
      }
    }
    if (Object.keys(pages).length > 0) {
      next.pages = pages;
    }
  }

  if (isRecord(input.categories)) {
    const categories: Record<string, CategoryPublicationPatch> = {};
    for (const [key, value] of Object.entries(input.categories)) {
      const patch = parseCategoryPatch(value);
      if (patch) {
        categories[key] = patch;
      }
    }
    if (Object.keys(categories).length > 0) {
      next.categories = categories;
    }
  }

  if (isRecord(input.treatments)) {
    const treatments: Record<string, TreatmentPublicationPatch> = {};
    for (const [key, value] of Object.entries(input.treatments)) {
      const patch = parseTreatmentPatch(value);
      if (patch) {
        treatments[key] = patch;
      }
    }
    if (Object.keys(treatments).length > 0) {
      next.treatments = treatments;
    }
  }

  return next;
}

export function pickContentPublicationPatch(
  patch: ContentPublicationPatch,
): ContentPublicationPatch {
  return parseContentPublicationPatch(patch) ?? {};
}

export function contentPublicationEqual(
  left: ContentPublicationPatch,
  right: ContentPublicationPatch,
) {
  return (
    JSON.stringify(pickContentPublicationPatch(left)) ===
    JSON.stringify(pickContentPublicationPatch(right))
  );
}

export function resolvePageEnabled(
  patch: ContentPublicationPatch,
  pageId: ContentPageId,
) {
  return patch.pages?.[pageId]?.enabled ?? true;
}

export function resolvePageSectionFlag(
  patch: ContentPublicationPatch,
  pageId: ContentPageId,
  sectionId: string,
) {
  return patch.pages?.[pageId]?.sections?.[sectionId] ?? true;
}

export function resolvePageSectionEnabled(
  patch: ContentPublicationPatch,
  pageId: ContentPageId,
  sectionId: string,
) {
  if (!resolvePageEnabled(patch, pageId)) {
    return false;
  }
  return patch.pages?.[pageId]?.sections?.[sectionId] ?? true;
}

export function resolveCategoryEnabled(
  patch: ContentPublicationPatch,
  slug: string,
  sourceEnabled: boolean,
) {
  return patch.categories?.[slug]?.enabled ?? sourceEnabled;
}

export function resolveTreatmentEnabled(
  patch: ContentPublicationPatch,
  categorySlug: string,
  treatmentSlug: string,
  sourceEnabled: boolean,
) {
  return (
    patch.treatments?.[treatmentPublicationKey(categorySlug, treatmentSlug)]
      ?.enabled ?? sourceEnabled
  );
}

export function resolveTreatmentSectionEnabled(
  patch: ContentPublicationPatch,
  categorySlug: string,
  treatmentSlug: string,
  sectionId: TreatmentSectionId,
  sourceEnabled: boolean,
) {
  const override =
    patch.treatments?.[treatmentPublicationKey(categorySlug, treatmentSlug)]
      ?.sections?.[sectionId];
  return override ?? sourceEnabled;
}

export function isPubliclyVisible(input: {
  enabled: boolean;
  status: PublicationStatus;
}) {
  return input.enabled && input.status === "published";
}

function omitEmpty<T extends object>(value: T): T | undefined {
  return Object.keys(value).length > 0 ? value : undefined;
}

export function setPageEnabled(
  patch: ContentPublicationPatch,
  pageId: ContentPageId,
  enabled: boolean,
): ContentPublicationPatch {
  const pages = { ...patch.pages };
  const current = { ...pages[pageId] };
  if (enabled) {
    delete current.enabled;
  } else {
    current.enabled = false;
  }
  const cleaned = omitEmpty(current);
  if (cleaned) {
    pages[pageId] = cleaned;
  } else {
    delete pages[pageId];
  }
  return pickContentPublicationPatch({
    ...patch,
    pages: omitEmpty(pages),
  });
}

export function setPageSectionEnabled(
  patch: ContentPublicationPatch,
  pageId: ContentPageId,
  sectionId: string,
  enabled: boolean,
): ContentPublicationPatch {
  const pages = { ...patch.pages };
  const current = { ...pages[pageId] };
  const sections = { ...current.sections };
  if (enabled) {
    delete sections[sectionId];
  } else {
    sections[sectionId] = false;
  }
  const cleanedSections = omitEmpty(sections);
  if (cleanedSections) {
    current.sections = cleanedSections;
  } else {
    delete current.sections;
  }
  const cleaned = omitEmpty(current);
  if (cleaned) {
    pages[pageId] = cleaned;
  } else {
    delete pages[pageId];
  }
  return pickContentPublicationPatch({
    ...patch,
    pages: omitEmpty(pages),
  });
}

export function setCategoryEnabled(
  patch: ContentPublicationPatch,
  slug: string,
  enabled: boolean,
  sourceEnabled: boolean,
): ContentPublicationPatch {
  const categories = { ...patch.categories };
  if (enabled === sourceEnabled) {
    delete categories[slug];
  } else {
    categories[slug] = { enabled };
  }
  return pickContentPublicationPatch({
    ...patch,
    categories: omitEmpty(categories),
  });
}

export function setTreatmentEnabled(
  patch: ContentPublicationPatch,
  categorySlug: string,
  treatmentSlug: string,
  enabled: boolean,
  sourceEnabled: boolean,
): ContentPublicationPatch {
  const key = treatmentPublicationKey(categorySlug, treatmentSlug);
  const treatments = { ...patch.treatments };
  const current = { ...treatments[key] };
  if (enabled === sourceEnabled) {
    delete current.enabled;
  } else {
    current.enabled = enabled;
  }
  const cleaned = omitEmpty(current);
  if (cleaned) {
    treatments[key] = cleaned;
  } else {
    delete treatments[key];
  }
  return pickContentPublicationPatch({
    ...patch,
    treatments: omitEmpty(treatments),
  });
}

export function setTreatmentSectionEnabled(
  patch: ContentPublicationPatch,
  categorySlug: string,
  treatmentSlug: string,
  sectionId: TreatmentSectionId,
  enabled: boolean,
  sourceEnabled: boolean,
): ContentPublicationPatch {
  const key = treatmentPublicationKey(categorySlug, treatmentSlug);
  const treatments = { ...patch.treatments };
  const current = { ...treatments[key] };
  const sections = { ...current.sections };
  if (enabled === sourceEnabled) {
    delete sections[sectionId];
  } else {
    sections[sectionId] = enabled;
  }
  const cleanedSections = omitEmpty(sections);
  if (cleanedSections) {
    current.sections = cleanedSections;
  } else {
    delete current.sections;
  }
  const cleaned = omitEmpty(current);
  if (cleaned) {
    treatments[key] = cleaned;
  } else {
    delete treatments[key];
  }
  return pickContentPublicationPatch({
    ...patch,
    treatments: omitEmpty(treatments),
  });
}

/* WCDA_APPROVED_PUBLICATION_START */
export const approvedContentPublication: ContentPublicationPatch = {
  pages: {
    home: {
      sections: {
        contact: false,
      },
    },
  },
};
/* WCDA_APPROVED_PUBLICATION_END */

let previewOverride: ContentPublicationPatch | null = null;
const previewListeners = new Set<() => void>();

export function setPublicationPreviewOverride(
  patch: ContentPublicationPatch | null,
) {
  previewOverride = patch ? pickContentPublicationPatch(patch) : null;
  previewListeners.forEach((listener) => listener());
}

export function subscribePublicationPreview(listener: () => void) {
  previewListeners.add(listener);
  return () => {
    previewListeners.delete(listener);
  };
}

export function getActivePublicationPatch(): ContentPublicationPatch {
  return previewOverride ?? approvedContentPublication;
}
