import {
  faqs,
  published,
  related,
  section,
  treatment,
} from "@/data/treatments/helpers";

export const rootCanalTreatments = [
  treatment({
    slug: "root-canals",
    title: "Root Canals",
    categorySlug: "root-canal",
    summary:
      "Treatment of the inner tooth to address infection or inflammation and, when possible, retain the natural tooth.",
    intro:
      "Root canal treatment addresses inflamed or infected tissue inside a tooth so the tooth can often be kept rather than removed. It is recommended when that inner tissue cannot recover on its own, or when leaving it would allow infection to continue. The visit is explained before it begins. Keeping the tooth still depends on restoring it afterward and on the remaining root and bone.",
    metaDescription:
      "Root canal treatment at West Caldwell Dental Arts addresses inner-tooth inflammation or infection when keeping the natural tooth is appropriate.",
    ...published,
    sections: {
      overview: section("What root canal treatment is", [
        "The dentist accesses the inner chamber, removes inflamed or infected pulp tissue, disinfects the canal system, and seals it. The tooth then needs a restoration—often a filling and, for many back teeth, a crown—so it can function. The procedure is about the inside of the tooth, not about taking the tooth out.",
      ]),
      whyRecommended: section("Why it may be recommended", [
        "Deep decay, a crack that reaches the pulp, injury, or a long-standing restoration can inflame or infect the nerve. Symptoms may include lingering cold sensitivity, biting pain, swelling, or no symptoms at all with a finding on an image. Treatment is recommended when the alternative is likely to be extraction or spreading infection.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Tests of the tooth’s response, how it feels to bite, gum swelling, and radiographs. Cracks, remaining tooth structure, and periodontal support help decide whether saving the tooth is worthwhile. If the tooth is not restorable, extraction may be the more honest path.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Local anesthetic is used. A small opening is made, canals are located and cleaned with instruments and irrigants, and a sealer and filling material are placed. A temporary or permanent restoration closes the top. Some teeth are completed in one visit; others need a second visit if infection or complexity requires it.",
      ]),
      whatToExpect: section("What you may expect", [
        "The tooth is numb during treatment. You may feel pressure. Afterward, tenderness to bite for a few days is common. Severe swelling or fever is not expected and should be reported. The tooth may feel different until the final restoration is in place.",
      ]),
      benefits: section("Intended goals", [
        "Relief of inflammation or infection inside the tooth and retention of the root so you can chew with your own tooth when the outlook is reasonable.",
      ]),
      considerations: section("Limitations and considerations", [
        "Not every root canal succeeds. Complex anatomy, cracks, or delayed restoration can lead to failure. A tooth that has had root canal treatment can still decay or fracture. Some teeth need retreatment or surgery later. Antibiotics, when used, do not replace cleaning the canals.",
      ]),
      recoveryAftercare: section("Comfort and recovery", [
        "Over-the-counter pain relief is often sufficient if you can take it. Chew on the other side until the tooth is restored. If a temporary filling wears down, call. Follow any medication instructions exactly.",
      ]),
      maintenance: section("Maintenance", [
        "Complete the coverage restoration when it is recommended. Keep the tooth clean. The tooth is still checked at exams. Night protection may help if you grind.",
      ]),
      alternatives: section("Possible alternatives", [
        "Extraction and discussion of replacement, or, in selected failing cases, specialist retreatment. Watching an infected tooth is generally not a stable plan.",
      ]),
      faq: faqs([
        {
          question: "Is a root canal very painful?",
          answer:
            "Modern treatment is done with effective local anesthetic in most cases. The infection or inflammation that leads to the visit is often what hurt beforehand. Afterward, soreness is common; we discuss how to manage it. Tell us if you have had trouble getting numb in the past.",
        },
        {
          question: "Why do I still need a crown afterward?",
          answer:
            "Many teeth, especially molars, are weaker after the inner tissue is removed and an opening has been made. A crown can help protect against fracture. The remaining tooth structure decides, not a blanket rule for every tooth.",
        },
        {
          question: "Can the infection come back?",
          answer:
            "It can, if bacteria re-enter, if a canal was difficult to clean, or if the tooth cracks. That is why follow-up and a proper restoration matter. New symptoms should be examined rather than ignored.",
        },
      ]),
      relatedTreatments: related([
        "porcelain-crowns",
        "tooth-extractions",
        "tooth-colored-fillings",
      ]),
    },
  }),
] as const;
