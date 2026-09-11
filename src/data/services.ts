import type {
  ServiceCategory,
  ServiceRecord,
  TreatmentRecord,
} from "@/types/content";
import type { PublicationStatus } from "@/types/navigation";
import { treatmentRecords } from "@/data/treatments";
import {
  getActivePublicationPatch,
  isPubliclyVisible,
  resolveCategoryEnabled,
  resolveTreatmentEnabled,
} from "@/config/content-publication";

export const serviceCategories: readonly ServiceCategory[] = [
  {
    slug: "preventive-general",
    title: "Preventive & General Dentistry",
    summary:
      "Routine exams, cleanings, and everyday dental care that help maintain oral health.",
    description:
      "Preventive and general dentistry focuses on keeping teeth and gums healthy and noticing concerns early. A visit in this area typically includes an exam, a review of health history, and a conversation about home care. If further treatment is recommended, it is explained before anything begins.",
    enabled: true,
    status: "published",
    mediaKey: "01",
  },
  {
    slug: "family-children",
    title: "Family & Children's Dentistry",
    summary:
      "Dental visits for children, teens, and adults, planned around each patient's age and comfort.",
    description:
      "Family dentistry organizes care so children, teens, and adults can be seen with attention to age and comfort. Children's visits often emphasize a gentle introduction, an age-appropriate exam, and guidance for caregivers.",
    enabled: true,
    status: "published",
    mediaKey: "02",
  },
  {
    slug: "cosmetic",
    title: "Cosmetic Dentistry",
    summary:
      "Options that can improve the appearance of a smile, discussed in the context of oral health.",
    description:
      "Cosmetic dentistry looks at color, shape, and alignment as part of a healthy smile. Recommendations, when made, follow an exam and a conversation about goals, materials, and what a visit involves.",
    enabled: true,
    status: "published",
    mediaKey: "03",
  },
  {
    slug: "restorative",
    title: "Restorative & Tooth Replacement",
    summary:
      "Care that repairs damaged teeth and replaces missing teeth when that is the right next step.",
    description:
      "Restorative dentistry repairs teeth affected by decay, wear, or injury, and can replace teeth that cannot be saved. After an exam, options can be reviewed in terms of look, feel, function, and personal preference.",
    enabled: true,
    status: "published",
    mediaKey: "04",
  },
  {
    slug: "dental-implants",
    title: "Dental Implants",
    summary:
      "A tooth-replacement option that can support a crown, bridge, or denture when clinically appropriate.",
    description:
      "Dental implants are used to replace missing teeth by supporting a restoration in the jaw. Whether this is a fit depends on bone support, general health, and nearby teeth. If this type of care is discussed after an exam, the visit sequence can be explained in plain language.",
    enabled: true,
    status: "published",
    mediaKey: "05",
  },
  {
    slug: "root-canal",
    title: "Root Canal & Tooth Preservation",
    summary:
      "Treatment intended to relieve infection or inflammation inside a tooth so it can often be kept.",
    description:
      "Root canal treatment addresses infection or inflammation in the inner tissue of a tooth. The usual goal is to relieve discomfort and, when possible, keep the natural tooth. If this care is recommended, the visit and how the tooth is restored afterward can be explained first.",
    enabled: true,
    status: "published",
    mediaKey: "06",
  },
  {
    slug: "oral-surgery",
    title: "Oral Surgery / Extractions",
    summary:
      "Tooth removal and related surgical care when a tooth cannot be restored comfortably or safely.",
    description:
      "Oral surgery and extractions are considered when a tooth cannot be repaired, is causing infection, or is otherwise not maintainable. If removal is discussed, the reason, the visit, and typical after-care can be reviewed in advance.",
    enabled: true,
    status: "published",
    mediaKey: "07",
  },
  {
    slug: "clear-aligners",
    title: "Clear Aligners",
    summary:
      "Removable aligners that can gradually straighten teeth when this type of orthodontic care is a fit.",
    description:
      "Clear aligner treatment uses a series of custom trays to guide teeth into a more even position. It is not the right option for every bite. After an exam, it can be discussed whether aligner care is appropriate and what wearing and follow-up involve.",
    enabled: true,
    status: "published",
    mediaKey: "08",
  },
  {
    slug: "oral-appliances",
    title: "Oral Appliances / Bruxism",
    summary:
      "Custom appliances that can help protect teeth from grinding, clenching, or sports contact.",
    description:
      "Oral appliances are custom-made devices worn to protect teeth, support the jaw, or reduce wear from grinding and clenching. After an exam, it can be discussed when an appliance may help and how it is worn and cared for.",
    enabled: true,
    status: "published",
    mediaKey: "09",
  },
  {
    slug: "periodontal",
    title: "Periodontal / Gum Care",
    summary:
      "Evaluation and treatment that support the health of gums and the bone that holds teeth in place.",
    description:
      "Periodontal care focuses on the gums and supporting bone. Bleeding, tenderness, or changes in gum contour can be signs that a closer look is needed. Recommendations, when made, follow exam findings and a discussion of home care.",
    enabled: true,
    status: "published",
    mediaKey: "10",
  },
  {
    slug: "minimally-invasive-biological",
    title: "Minimally Invasive & Biological Dentistry",
    summary:
      "Conservative approaches that focus on preserving healthy tooth structure, using advanced technology and thoughtfully selected materials when clinically appropriate.",
    description:
      "This area of care looks at ways to conserve healthy tooth structure and choose materials with care, using technology when it supports a precise, conservative visit. Options are reviewed in the context of your exam findings, oral health, and personal preferences. Not every treatment is appropriate for every patient. Recommendations are made after examination, diagnosis, and discussion of available options.",
    metaDescription:
      "Explore conservative and technology-assisted dental approaches at West Caldwell Dental Arts, including biomimetic dentistry, ozone, laser dentistry, air abrasion, ceramic implants, and related options.",
    enabled: true,
    status: "published",
    mediaKey: "11",
  },
  {
    slug: "advanced-holistic",
    title: "Additional services",
    summary: "Deferred from the public catalog.",
    description: "Deferred from the public catalog.",
    enabled: false,
    status: "draft",
    ownerConfirmationRequired: true,
  },
];

export const serviceRecords: readonly TreatmentRecord[] = treatmentRecords;

export function isPublishedEntity(entity: {
  enabled: boolean;
  status: PublicationStatus;
}): boolean {
  return isPubliclyVisible(entity);
}

function categoryIsPublic(category: ServiceCategory) {
  return isPublishedEntity({
    enabled: resolveCategoryEnabled(
      getActivePublicationPatch(),
      category.slug,
      category.enabled,
    ),
    status: category.status,
  });
}

function treatmentIsPublic(treatment: TreatmentRecord) {
  return isPublishedEntity({
    enabled: resolveTreatmentEnabled(
      getActivePublicationPatch(),
      treatment.categorySlug,
      treatment.slug,
      treatment.enabled,
    ),
    status: treatment.status,
  });
}

export function getConfirmedCategories(): ServiceCategory[] {
  return serviceCategories.filter(categoryIsPublic);
}

export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.slug === slug);
}

export function getManagedCategories(): ServiceCategory[] {
  return [...serviceCategories];
}

export function getManagedTreatmentsByCategory(
  categorySlug: string,
): TreatmentRecord[] {
  return treatmentRecords.filter(
    (treatment) => treatment.categorySlug === categorySlug,
  );
}

export function getConfirmedCategoryBySlug(
  slug: string,
): ServiceCategory | undefined {
  const category = getCategoryBySlug(slug);

  if (!category || !categoryIsPublic(category)) {
    return undefined;
  }

  return category;
}

export function getConfirmedServicesByCategory(
  categorySlug: string,
): ServiceRecord[] {
  return treatmentRecords.filter(
    (service) =>
      service.categorySlug === categorySlug && treatmentIsPublic(service),
  );
}

export function getTreatmentHref(service: ServiceRecord): string {
  return `/services/${service.categorySlug}/${service.slug}`;
}

export function getTreatmentBySlugs(
  categorySlug: string,
  treatmentSlug: string,
): TreatmentRecord | undefined {
  return treatmentRecords.find(
    (treatment) =>
      treatment.categorySlug === categorySlug && treatment.slug === treatmentSlug,
  );
}

export function getPublishedTreatment(
  categorySlug: string,
  treatmentSlug: string,
): TreatmentRecord | undefined {
  if (!getConfirmedCategoryBySlug(categorySlug)) {
    return undefined;
  }

  const treatment = getTreatmentBySlugs(categorySlug, treatmentSlug);

  if (!treatment || !treatmentIsPublic(treatment)) {
    return undefined;
  }

  return treatment;
}

export function getPublishedTreatments(): TreatmentRecord[] {
  const publishedCategorySlugs = new Set(
    getConfirmedCategories().map((category) => category.slug),
  );

  return treatmentRecords.filter(
    (treatment) =>
      publishedCategorySlugs.has(treatment.categorySlug) &&
      treatmentIsPublic(treatment),
  );
}

export function getPublishedTreatmentsBySlugs(
  slugs: readonly string[],
): TreatmentRecord[] {
  const published = getPublishedTreatments();

  return slugs.flatMap((slug) => {
    const match = published.find((treatment) => treatment.slug === slug);
    return match ? [match] : [];
  });
}

export const treatmentsCatalogCategoryOrder = [
  "preventive-general",
  "restorative",
  "family-children",
  "cosmetic",
  "oral-surgery",
  "oral-appliances",
  "dental-implants",
  "root-canal",
  "periodontal",
  "minimally-invasive-biological",
] as const;

export function getConfirmedTreatmentGroups(): {
  category: ServiceCategory;
  treatments: ServiceRecord[];
}[] {
  const catalogOrder = new Map<string, number>(
    treatmentsCatalogCategoryOrder.map((slug, index) => [slug, index]),
  );

  return getConfirmedCategories()
    .map((category) => ({
      category,
      treatments: getConfirmedServicesByCategory(category.slug),
    }))
    .filter((group) => group.treatments.length > 0)
    .sort((a, b) => {
      const aIndex =
        catalogOrder.get(a.category.slug) ?? Number.MAX_SAFE_INTEGER;
      const bIndex =
        catalogOrder.get(b.category.slug) ?? Number.MAX_SAFE_INTEGER;

      return aIndex - bIndex;
    });
}

export function getFeaturedCareAreas(): ServiceCategory[] {
  const featuredSlugs = [
    "preventive-general",
    "family-children",
    "cosmetic",
    "restorative",
    "dental-implants",
    "periodontal",
  ] as const;

  return featuredSlugs.flatMap((slug) => {
    const category = getConfirmedCategoryBySlug(slug);
    return category ? [category] : [];
  });
}

export function getMarqueeServices(): Array<{ slug: string; title: string }> {
  const marqueeSlugs = [
    "pediatric-x-rays",
    "tooth-colored-fillings",
    "teeth-whitening",
    "porcelain-crowns",
    "root-canals",
    "periodontal-therapy",
    "implants",
  ] as const;
  const published = getPublishedTreatments();

  return marqueeSlugs.flatMap((slug) => {
    const service = published.find((item) => item.slug === slug);
    return service ? [{ slug: service.slug, title: service.title }] : [];
  });
}

export function getMarqueeServiceNames(): string[] {
  return getMarqueeServices().map((item) => item.title);
}
