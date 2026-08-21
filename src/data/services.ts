import type { ServiceCategory, ServiceRecord, TreatmentContent } from "@/types/content";

export const serviceCategories: readonly ServiceCategory[] = [
  {
    slug: "preventive-general",
    title: "Preventive & General Dentistry",
    summary:
      "Routine exams, cleanings, and everyday dental care that help maintain oral health.",
    description:
      "Preventive and general dentistry focuses on keeping teeth and gums healthy and noticing concerns early. A visit in this area typically includes an exam, a review of health history, and a conversation about home care. If further treatment is recommended, it is explained before anything begins.",
    status: "confirmed",
    mediaKey: "01",
  },
  {
    slug: "family-children",
    title: "Family & Children's Dentistry",
    summary:
      "Dental visits for children, teens, and adults, planned around each patient's age and comfort.",
    description:
      "Family dentistry organizes care so children, teens, and adults can be seen with attention to age and comfort. Children's visits often emphasize a gentle introduction, an age-appropriate exam, and guidance for caregivers.",
    status: "confirmed",
    mediaKey: "02",
  },
  {
    slug: "cosmetic",
    title: "Cosmetic Dentistry",
    summary:
      "Options that can improve the appearance of a smile, discussed in the context of oral health.",
    description:
      "Cosmetic dentistry looks at color, shape, and alignment as part of a healthy smile. Recommendations, when made, follow an exam and a conversation about goals, materials, and what a visit involves.",
    status: "confirmed",
    mediaKey: "03",
  },
  {
    slug: "restorative",
    title: "Restorative & Tooth Replacement",
    summary:
      "Care that repairs damaged teeth and replaces missing teeth when that is the right next step.",
    description:
      "Restorative dentistry repairs teeth affected by decay, wear, or injury, and can replace teeth that cannot be saved. After an exam, options can be reviewed in terms of look, feel, function, and personal preference.",
    status: "confirmed",
    mediaKey: "04",
  },
  {
    slug: "dental-implants",
    title: "Dental Implants",
    summary:
      "A tooth-replacement option that can support a crown, bridge, or denture when clinically appropriate.",
    description:
      "Dental implants are used to replace missing teeth by supporting a restoration in the jaw. Whether this is a fit depends on bone support, general health, and nearby teeth. If this type of care is discussed after an exam, the visit sequence can be explained in plain language.",
    status: "confirmed",
    mediaKey: "05",
  },
  {
    slug: "root-canal",
    title: "Root Canal & Tooth Preservation",
    summary:
      "Treatment intended to relieve infection or inflammation inside a tooth so it can often be kept.",
    description:
      "Root canal treatment addresses infection or inflammation in the inner tissue of a tooth. The usual goal is to relieve discomfort and, when possible, keep the natural tooth. If this care is recommended, the visit and how the tooth is restored afterward can be explained first.",
    status: "confirmed",
    mediaKey: "06",
  },
  {
    slug: "oral-surgery",
    title: "Oral Surgery / Extractions",
    summary:
      "Tooth removal and related surgical care when a tooth cannot be restored comfortably or safely.",
    description:
      "Oral surgery and extractions are considered when a tooth cannot be repaired, is causing infection, or is otherwise not maintainable. If removal is discussed, the reason, the visit, and typical after-care can be reviewed in advance.",
    status: "confirmed",
    mediaKey: "07",
  },
  {
    slug: "clear-aligners",
    title: "Clear Aligners",
    summary:
      "Removable aligners that can gradually straighten teeth when this type of orthodontic care is a fit.",
    description:
      "Clear aligner treatment uses a series of custom trays to guide teeth into a more even position. It is not the right option for every bite. After an exam, it can be discussed whether aligner care is appropriate and what wearing and follow-up involve.",
    status: "confirmed",
    mediaKey: "08",
  },
  {
    slug: "oral-appliances",
    title: "Oral Appliances / Bruxism",
    summary:
      "Custom appliances that can help protect teeth from grinding, clenching, or sports contact.",
    description:
      "Oral appliances are custom-made devices worn to protect teeth, support the jaw, or reduce wear from grinding and clenching. After an exam, it can be discussed when an appliance may help and how it is worn and cared for.",
    status: "confirmed",
    mediaKey: "09",
  },
  {
    slug: "periodontal",
    title: "Periodontal / Gum Care",
    summary:
      "Evaluation and treatment that support the health of gums and the bone that holds teeth in place.",
    description:
      "Periodontal care focuses on the gums and supporting bone. Bleeding, tenderness, or changes in gum contour can be signs that a closer look is needed. Recommendations, when made, follow exam findings and a discussion of home care.",
    status: "confirmed",
    mediaKey: "10",
  },
  {
    slug: "advanced-holistic",
    title: "Additional services",
    summary: "Deferred from the public catalog.",
    description: "Deferred from the public catalog.",
    status: "disabled",
  },
];

export const serviceRecords: readonly ServiceRecord[] = [
  {
    slug: "home-care",
    title: "Home Care",
    categorySlug: "preventive-general",
    summary:
      "Guidance on brushing, flossing, and daily habits that support the work done during dental visits.",
    status: "disabled",
  },
  {
    slug: "teeth-cleaning",
    title: "Teeth Cleaning",
    categorySlug: "preventive-general",
    summary:
      "Professional cleaning to remove plaque and tartar and to support gum health.",
    status: "confirmed",
  },
  {
    slug: "oral-cancer-screening",
    title: "Oral Cancer Screening",
    categorySlug: "preventive-general",
    summary:
      "A visual and tactile check of the mouth, lips, and related tissues as part of a comprehensive exam.",
    status: "confirmed",
  },
  {
    slug: "ortho-screenings",
    title: "Ortho Screenings",
    categorySlug: "preventive-general",
    summary:
      "A look at tooth alignment and bite to help determine whether orthodontic evaluation may be useful.",
    status: "confirmed",
  },
  {
    slug: "sealants",
    title: "Sealants",
    categorySlug: "preventive-general",
    summary:
      "A protective coating placed on chewing surfaces of certain teeth to help reduce decay risk.",
    status: "confirmed",
  },
  {
    slug: "adults-dentistry",
    title: "Adult Dentistry",
    categorySlug: "preventive-general",
    summary:
      "Exam, cleaning, and restorative planning for adult patients, including time to discuss questions and goals.",
    status: "confirmed",
  },
  {
    slug: "fluoride",
    title: "Fluoride",
    categorySlug: "preventive-general",
    summary:
      "A topical fluoride application that can help strengthen enamel when it is appropriate for the patient.",
    status: "confirmed",
  },
  {
    slug: "teens-dentistry",
    title: "Teen Dentistry",
    categorySlug: "family-children",
    summary:
      "Dental care for adolescents, including exams, cleanings, and conversations about developing oral health habits.",
    status: "confirmed",
  },
  {
    slug: "infant-oral-exams",
    title: "Infant Oral Exams",
    categorySlug: "family-children",
    summary:
      "An early look at oral development and guidance for caregivers on teething, feeding, and first dental visits.",
    status: "confirmed",
  },
  {
    slug: "childrens-cleanings-exams",
    title: "Children's Cleanings & Exams",
    categorySlug: "family-children",
    summary:
      "Age-appropriate exams and cleanings planned to help children become more comfortable with dental visits.",
    status: "confirmed",
  },
  {
    slug: "pediatric-x-rays",
    title: "Pediatric X-Rays",
    categorySlug: "family-children",
    summary:
      "Imaging used when it helps evaluate developing teeth, and only when the benefit of the image is clear.",
    status: "confirmed",
  },
  {
    slug: "sports-mouthguards",
    title: "Sports Mouthguards",
    categorySlug: "family-children",
    summary:
      "A custom guard intended to help protect teeth during sports and other contact activities.",
    status: "confirmed",
  },
  {
    slug: "porcelain-veneers",
    title: "Porcelain Veneers",
    categorySlug: "cosmetic",
    summary:
      "Thin porcelain coverings that can change the shape or color of visible teeth after an exam and planning visit.",
    status: "confirmed",
  },
  {
    slug: "teeth-whitening",
    title: "Teeth Whitening",
    categorySlug: "cosmetic",
    summary:
      "Professionally directed whitening options discussed after checking the health of teeth and gums.",
    status: "confirmed",
  },
  {
    slug: "botox",
    title: "BOTOX",
    categorySlug: "cosmetic",
    summary: "Deferred from the public catalog.",
    status: "disabled",
  },
  {
    slug: "gum-contouring",
    title: "Gum Contouring",
    categorySlug: "cosmetic",
    summary: "Deferred from the public catalog.",
    status: "disabled",
  },
  {
    slug: "restorative-dentistry",
    title: "Restorative Dentistry",
    categorySlug: "restorative",
    summary:
      "Treatment that repairs teeth so they can function more comfortably, using options matched to the clinical finding.",
    status: "confirmed",
  },
  {
    slug: "tooth-colored-fillings",
    title: "Tooth-Colored Fillings",
    categorySlug: "restorative",
    summary:
      "Tooth-colored restorations used to repair decayed or damaged tooth structure.",
    status: "confirmed",
  },
  {
    slug: "composite-fillings",
    title: "Composite Fillings",
    categorySlug: "restorative",
    summary:
      "Composite material used to restore small to moderate areas of decay or wear.",
    status: "confirmed",
  },
  {
    slug: "porcelain-crowns",
    title: "Porcelain Crowns",
    categorySlug: "restorative",
    summary:
      "A full-coverage restoration that can protect a tooth after large repairs, fracture, or root canal treatment.",
    status: "confirmed",
  },
  {
    slug: "onlays",
    title: "Onlays",
    categorySlug: "restorative",
    summary:
      "A partial-coverage restoration that rebuilds a damaged chewing surface while conserving remaining tooth structure.",
    status: "confirmed",
  },
  {
    slug: "porcelain-bridges",
    title: "Porcelain Bridges",
    categorySlug: "restorative",
    summary:
      "A fixed option for replacing one or more missing teeth by joining restorations to neighboring teeth.",
    status: "confirmed",
  },
  {
    slug: "dentures",
    title: "Full or Partial Dentures",
    categorySlug: "restorative",
    summary:
      "Removable replacements for several or all missing teeth, designed after an exam and impressions.",
    status: "confirmed",
  },
  {
    slug: "implants",
    title: "Implants",
    categorySlug: "dental-implants",
    summary:
      "A titanium post placed in the jaw to support a crown, bridge, or denture when the site is a suitable candidate.",
    status: "confirmed",
  },
  {
    slug: "root-canals",
    title: "Root Canals",
    categorySlug: "root-canal",
    summary:
      "Treatment of the inner tooth to address infection or inflammation and, when possible, retain the natural tooth.",
    status: "confirmed",
  },
  {
    slug: "tooth-extractions",
    title: "Tooth Extractions",
    categorySlug: "oral-surgery",
    summary:
      "Removal of a tooth that cannot be restored, or that is causing infection or crowding that cannot be managed another way.",
    status: "confirmed",
  },
  {
    slug: "oral-surgery",
    title: "Oral Surgery",
    categorySlug: "oral-surgery",
    summary:
      "Surgical dental care, including more involved extractions, planned after a clinical examination.",
    status: "confirmed",
  },
  {
    slug: "bone-grafting",
    title: "Bone Grafting",
    categorySlug: "oral-surgery",
    summary: "Deferred from the public catalog.",
    status: "disabled",
  },
  {
    slug: "invisalign",
    title: "Invisalign",
    categorySlug: "clear-aligners",
    summary: "Deferred from the public catalog.",
    status: "disabled",
  },
  {
    slug: "oral-appliances",
    title: "Oral Appliances",
    categorySlug: "oral-appliances",
    summary:
      "Custom devices made to protect teeth, support the jaw, or address wear from clenching and grinding.",
    status: "confirmed",
  },
  {
    slug: "teeth-grinding",
    title: "Teeth Grinding",
    categorySlug: "oral-appliances",
    summary:
      "Evaluation of grinding or clenching and discussion of protection, such as a night guard, when indicated.",
    status: "confirmed",
  },
  {
    slug: "periodontal-therapy",
    title: "Periodontal Therapy",
    categorySlug: "periodontal",
    summary:
      "Treatment for gum inflammation or periodontal disease, which may include deeper cleaning and closer follow-up.",
    status: "confirmed",
  },
  {
    slug: "holistic-services",
    title: "Holistic Services",
    categorySlug: "advanced-holistic",
    summary: "Deferred from the public catalog.",
    status: "disabled",
  },
];

export function getConfirmedCategories(): ServiceCategory[] {
  return serviceCategories.filter((category) => category.status === "confirmed");
}

export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.slug === slug);
}

export function getConfirmedCategoryBySlug(
  slug: string,
): ServiceCategory | undefined {
  const category = getCategoryBySlug(slug);

  if (!category || category.status !== "confirmed") {
    return undefined;
  }

  return category;
}

export function getConfirmedServicesByCategory(
  categorySlug: string,
): ServiceRecord[] {
  return serviceRecords.filter(
    (service) =>
      service.categorySlug === categorySlug && service.status === "confirmed",
  );
}

export function getTreatmentHref(service: ServiceRecord): string {
  return `/services/${service.categorySlug}#${service.slug}`;
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

export function toTreatmentContent(service: ServiceRecord): TreatmentContent {
  return {
    slug: service.slug,
    title: service.title,
    categorySlug: service.categorySlug,
    summary: service.summary,
    intro: service.summary,
    sections: [],
    status: service.status,
  };
}
