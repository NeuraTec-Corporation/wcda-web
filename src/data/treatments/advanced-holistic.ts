import {
  draft,
  faqs,
  related,
  section,
  treatment,
} from "@/data/treatments/helpers";

export const advancedHolisticTreatments = [
  treatment({
    slug: "holistic-services",
    title: "Holistic Services",
    categorySlug: "advanced-holistic",
    summary:
      "A deferred catalog label for additional or holistic-framed services. Not published. Stored for owner review only.",
    intro:
      "This record keeps the historical catalog name “Holistic Services” as a draft under the unpublished Additional services category. It is not a public page and not a list of confirmed offerings. Minimally invasive and biological topics that are actually offered are published under their own category and treatment slugs. Do not treat this draft as a menu of available procedures.",
    metaDescription:
      "Holistic Services is a deferred, unpublished catalog record at West Caldwell Dental Arts and is not a public offering.",
    ...draft,
    sections: {
      overview: section("What this record is", [
        "A placeholder for owner decisions about naming and whether any additional services belong in a separate category. Concrete treatments such as ozone, ceramic implants, and safe amalgam removal already have their own published literature where they are confirmed.",
      ]),
      whyRecommended: section("Why it remains in data", [
        "So a former catalog label is not deleted. Content governance prefers storing unpublished items rather than removing them.",
      ]),
      evaluation: section("Owner review", [
        "Confirm whether this category should ever be published, renamed, or left disabled. Confirm that public biological dentistry content lives on the minimally invasive category pages.",
      ]),
      howItWorks: section("Publication state", [
        "enabled is false and status is draft. The parent category is also unpublished. Direct URLs must not index this content.",
      ]),
      whatToExpect: section("What patients should use instead", [
        "The published Minimally Invasive & Biological Dentistry category and its enabled treatment pages, plus other confirmed areas of care.",
      ]),
      benefits: section("Intended use of this record", [
        "Internal completeness and a place to attach future, confirmed offerings if the owner later approves them.",
      ]),
      considerations: section("Limitations", [
        "The word holistic is easy to over-promise. This office’s public biological pages already use conservative, conditional language. Any future content here should meet the same standard.",
      ]),
      alternatives: section("Related published topics", [
        "See biomimetic dentistry, dental ozone, metal-free dentistry, and related published treatments rather than this deferred label.",
      ]),
      faq: faqs([
        {
          question: "Are holistic services listed on the website?",
          answer:
            "No. This item and its category are disabled. Published biological and minimally invasive care is listed under that category’s own treatments.",
        },
      ]),
      relatedTreatments: related([
        "biomimetic-dentistry",
        "metal-free-dentistry",
        "dental-ozone",
      ]),
    },
  }),
] as const;
