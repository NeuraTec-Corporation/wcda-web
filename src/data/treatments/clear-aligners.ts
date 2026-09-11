import {
  draft,
  faqs,
  related,
  section,
  treatment,
} from "@/data/treatments/helpers";

export const clearAlignerTreatments = [
  treatment({
    slug: "invisalign",
    title: "Invisalign",
    categorySlug: "clear-aligners",
    summary:
      "A branded clear-aligner system. Not currently listed as a public offering pending owner confirmation of availability.",
    intro:
      "Invisalign is a specific clear-aligner brand used to move teeth with a series of custom trays. This record is stored because the name exists in the practice catalog as a deferred item. It is not published as a current West Caldwell Dental Arts offering. Generic aligner care, if offered later, would be confirmed separately.",
    metaDescription:
      "Invisalign is recorded as a draft, unpublished service at West Caldwell Dental Arts pending owner confirmation.",
    ...draft,
    sections: {
      overview: section("What Invisalign is", [
        "It is a sequence of removable plastic aligners planned from a digital model of the teeth. Attachments, elastics, or refinements may be part of a real plan. The brand name is not interchangeable with every clear-aligner product.",
      ]),
      whyRecommended: section("Why it might be considered", [
        "For selected crowding, spacing, or bite issues when removable trays are appropriate and the patient can wear them as directed.",
      ]),
      evaluation: section("What an evaluation would consider", [
        "Periodontal support, restorations, skeletal bite problems, and cooperation. Not every malocclusion is an aligner case.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Records, a digital plan, a series of trays, and review visits. Refinements are common. Retainers are needed afterward.",
      ]),
      whatToExpect: section("What a patient might expect", [
        "Pressure with each new tray, speech changes for a short time, and a requirement to wear trays most of the day.",
      ]),
      benefits: section("Intended goals if used", [
        "Gradual alignment within the limits of biology and the planned movements.",
      ]),
      considerations: section("Limitations and considerations", [
        "Results depend on wear time. Complex bites may need braces or surgery. Gums must be healthy first.",
      ]),
      alternatives: section("Possible alternatives", [
        "Other aligner systems, fixed braces, limited restorative camouflage, or no treatment.",
      ]),
      faq: faqs([
        {
          question: "Is Invisalign available here?",
          answer:
            "This item is not enabled for public listing. Please ask the office about current orthodontic options rather than assuming this brand is offered.",
        },
      ]),
      relatedTreatments: related(["clear-aligner-treatment", "ortho-screenings", "retainers"]),
    },
  }),
  treatment({
    slug: "clear-aligner-treatment",
    title: "Clear Aligner Treatment",
    categorySlug: "clear-aligners",
    summary:
      "Removable custom trays that can gradually move teeth when orthodontic aligner care is clinically appropriate.",
    intro:
      "Clear aligner treatment uses a series of custom removable trays to guide teeth into a more even position. It is not suitable for every bite. This draft exists so the category has complete literature for owner review. It is not publicly enabled until the practice confirms this offering independently of any single brand name.",
    metaDescription:
      "Clear aligner treatment is recorded as a draft at West Caldwell Dental Arts pending owner confirmation before public listing.",
    ...draft,
    sections: {
      overview: section("What clear aligners are", [
        "Each tray is worn for a planned period, then replaced by the next. Small tooth-colored attachments may be bonded to help certain movements. The trays are taken out to eat and to clean the teeth.",
      ]),
      whyRecommended: section("Why they may be discussed", [
        "When crowding or spacing is mild to moderate, when the patient prefers removable appliances, and when gums and bone can support movement.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Bite classification, oral hygiene, restorations, jaw joints, and whether skeletal problems would make aligners incomplete.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Records and a staged movement plan. Trays are dispensed in groups with periodic checks. Refinement scans are common near the end.",
      ]),
      whatToExpect: section("What you may expect", [
        "Discipline around hours of wear. Missed wear lengthens treatment or reduces the result. Discomfort with new trays is typical and usually settles.",
      ]),
      benefits: section("Intended goals", [
        "Improved alignment within the range the plan can achieve, with trays that are less visible than many braces.",
      ]),
      considerations: section("Limitations and considerations", [
        "Aligners cannot reliably do every movement. Lost trays delay care. Decay risk can rise if trays are worn over plaque. Retainers are required to hold the result.",
      ]),
      maintenance: section("Maintenance during treatment", [
        "Brush before reinserting trays. Clean trays as instructed. Keep exams and cleanings on schedule.",
      ]),
      alternatives: section("Possible alternatives", [
        "Fixed orthodontics, restorative reshaping for very small discrepancies, or observation.",
      ]),
      faq: faqs([
        {
          question: "How many hours a day would I wear them?",
          answer:
            "Most protocols require most of the day and night except eating and cleaning. Exact hours would be part of any real treatment agreement.",
        },
      ]),
      relatedTreatments: related(["invisalign", "ortho-screenings", "retainers"]),
    },
  }),
  treatment({
    slug: "retainers",
    title: "Retainers",
    categorySlug: "clear-aligners",
    summary:
      "Appliances worn after tooth movement, or in selected other cases, to help teeth stay in their new positions.",
    intro:
      "Retainers help keep teeth from drifting after orthodontic movement. They may be removable or bonded. This draft record supports owner review. It is not listed as a standalone public treatment until confirmed.",
    metaDescription:
      "Retainers are recorded as a draft treatment at West Caldwell Dental Arts pending owner confirmation before public listing.",
    ...draft,
    sections: {
      overview: section("What retainers are", [
        "Removable plastic or wire-and-acrylic devices, or a thin wire bonded behind teeth. They do not actively straighten teeth the way aligners in active treatment do.",
      ]),
      whyRecommended: section("Why they may be recommended", [
        "Teeth have a tendency to move after braces or aligners. Retention is part of finishing, not an optional extra, if a result is to be kept.",
      ]),
      evaluation: section("What an evaluation considers", [
        "The finished bite, hygiene around a bonded wire, and whether grinding requires a combined night guard design.",
      ]),
      howItWorks: section("How they are generally made", [
        "A scan or impression after active movement. Delivery includes wear instructions. Lost retainers should be replaced rather than waiting for teeth to shift.",
      ]),
      whatToExpect: section("What you may expect", [
        "A schedule that often starts full-time and becomes nights-only. Lifelong night wear is commonly advised because teeth can move at any age.",
      ]),
      benefits: section("Intended goals", [
        "Helping maintain alignment achieved in treatment.",
      ]),
      considerations: section("Limitations and considerations", [
        "Retainers break and warp. Bonded wires can come loose and trap plaque. They do not prevent all relapse if not worn.",
      ]),
      alternatives: section("Possible alternatives", [
        "Accepting some relapse, limited retreatment, or a different retainer design.",
      ]),
      faq: faqs([
        {
          question: "How long do I need a retainer?",
          answer:
            "For as long as you want the teeth to stay where they were moved. There is no date after which teeth permanently lock in place.",
        },
      ]),
      relatedTreatments: related(["clear-aligner-treatment", "oral-appliances"]),
    },
  }),
] as const;
