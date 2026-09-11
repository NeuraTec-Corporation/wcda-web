import type {
  TreatmentFaq,
  TreatmentRecord,
  TreatmentSection,
  TreatmentSectionId,
} from "@/types/content";
import type { PublicationStatus } from "@/types/navigation";

export const CLINICAL_NOTE: TreatmentSection = {
  enabled: true,
  heading: "Individual evaluation",
  paragraphs: [
    "Whether this treatment is appropriate depends on an examination, your health history, and your goals. This page is general information. It is not a diagnosis, a treatment plan, or a promise of a particular result.",
  ],
};

export function section(
  heading: string,
  paragraphs: readonly string[],
  extra?: Omit<TreatmentSection, "enabled" | "heading" | "paragraphs">,
): TreatmentSection {
  return {
    enabled: true,
    heading,
    paragraphs,
    ...extra,
  };
}

export function faqs(items: readonly TreatmentFaq[]): TreatmentSection {
  return {
    enabled: true,
    heading: "Common questions",
    faqs: items,
  };
}

export function related(slugs: readonly string[]): TreatmentSection {
  return {
    enabled: true,
    heading: "Related care",
    relatedSlugs: slugs,
  };
}

export function hidden(value: TreatmentSection): TreatmentSection {
  return { ...value, enabled: false };
}

const TREATMENT_SUPPORTING_MEDIA = new Set([
  "porcelain-veneers",
  "teeth-whitening",
  "teeth-cleaning",
  "childrens-cleanings-exams",
  "implants",
  "root-canals",
  "tooth-extractions",
  "oral-appliances",
  "periodontal-therapy",
  "biomimetic-dentistry",
]);

type TreatmentInput = {
  slug: string;
  title: string;
  categorySlug: string;
  summary: string;
  intro: string;
  metaDescription?: string;
  metaTitle?: string;
  enabled: boolean;
  status: PublicationStatus;
  ownerConfirmationRequired?: boolean;
  mediaKey?: string;
  heroMediaKey?: string;
  supportingMediaKey?: string;
  sections: Partial<Record<TreatmentSectionId, TreatmentSection>>;
};

export function treatment(input: TreatmentInput): TreatmentRecord {
  const mediaKey = input.mediaKey ?? `tx-${input.slug}`;
  const supportingMediaKey =
    input.supportingMediaKey ??
    (TREATMENT_SUPPORTING_MEDIA.has(input.slug)
      ? `tx-${input.slug}-support`
      : undefined);

  return {
    slug: input.slug,
    title: input.title,
    categorySlug: input.categorySlug,
    summary: input.summary,
    intro: input.intro,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription ?? input.summary,
    enabled: input.enabled,
    status: input.status,
    ownerConfirmationRequired: input.ownerConfirmationRequired,
    mediaKey,
    heroMediaKey: input.heroMediaKey,
    supportingMediaKey,
    sections: {
      clinicalNote: CLINICAL_NOTE,
      ...input.sections,
    },
  };
}

export const published = {
  enabled: true,
  status: "published" as const,
};

export const draft = {
  enabled: false,
  status: "draft" as const,
  ownerConfirmationRequired: true,
};
