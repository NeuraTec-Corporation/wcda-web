import {
  draft,
  faqs,
  published,
  related,
  section,
  treatment,
} from "@/data/treatments/helpers";

export const periodontalTreatments = [
  treatment({
    slug: "periodontal-therapy",
    title: "Periodontal Therapy",
    categorySlug: "periodontal",
    summary:
      "Treatment for gum inflammation or periodontal disease, which may include deeper cleaning and closer follow-up.",
    intro:
      "Periodontal therapy treats inflammation of the gums and, when present, the supporting bone around teeth. It is more than a routine cleaning when deposits and bacteria sit below the gumline or when pockets and bone changes are found. The plan is based on measurements and images, then explained before treatment starts. Home care remains part of any result.",
    metaDescription:
      "Periodontal therapy at West Caldwell Dental Arts treats gum inflammation or periodontal disease with deeper cleaning and follow-up when indicated.",
    ...published,
    sections: {
      overview: section("What periodontal therapy is", [
        "It includes diagnosis of gingivitis or periodontitis, removal of deposits above and below the gum, and a schedule of reevaluation. In some mouths it stays within deep cleaning (scaling and root planing). In others it includes more frequent maintenance or referral to a periodontist for surgery or regeneration. Laser or other adjuncts, when used, are additions—not a replacement for mechanical cleaning.",
      ]),
      whyRecommended: section("Why it may be recommended", [
        "Bleeding gums, odor, loose teeth, receding gums, or pockets that trap bacteria are common reasons to look more closely. Untreated periodontitis can lead to bone loss and tooth loss. Therapy is recommended when findings show that a regular cleaning would not reach the problem.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Probing depths, bleeding, recession, furcation involvement, mobility, plaque pattern, radiographs of bone levels, and medical factors such as diabetes or smoking. Your home-care ability is part of the diagnosis, not a judgment.",
      ]),
      howItWorks: section("How treatment generally works", [
        "After the findings are explained, deposits are removed in one or more visits, often by quadrant, with local anesthetic when needed. You receive specific home-care instruction. A reevaluation visit checks whether tissues have calmed or whether further care is needed.",
      ]),
      whatToExpect: section("What you may expect", [
        "Soreness and sensitivity after deep cleaning, especially to cold. Gums may shrink slightly as swelling reduces, which can make teeth look longer. This is often the inflammation settling, not a surprise “side effect” in isolation. Bleeding with brushing should lessen over time if the therapy is working and home care continues.",
      ]),
      benefits: section("Intended goals", [
        "Calmer gums, shallower or more maintainable pockets where possible, and a slower rate of bone loss. Comfortable chewing and keeping teeth that can still be maintained are typical aims. Therapy does not grow back all lost bone by itself.",
      ]),
      considerations: section("Limitations and considerations", [
        "Periodontitis is often a chronic condition. Therapy reduces bacterial load and inflammation; it does not make the mouth immune to relapse. Smoking and poorly controlled systemic disease make results harder. Some teeth with advanced bone loss cannot be saved.",
      ]),
      recoveryAftercare: section("Comfort and recovery", [
        "Soft foods if tender, gentle but thorough cleaning, and any rinses prescribed. Sensitivity toothpaste may help. Call if swelling, fever, or severe pain occur.",
      ]),
      maintenance: section("Maintenance", [
        "Periodontal maintenance visits are often closer together than twice-yearly cleanings. The interval is based on your response, not a slogan. Daily cleaning below the gumline with the tools that fit your spaces is essential.",
      ]),
      alternatives: section("Possible alternatives", [
        "A routine cleaning only if disease is not present, specialist periodontal surgery, extraction of hopeless teeth, or adjunctive approaches discussed case by case.",
      ]),
      faq: faqs([
        {
          question: "Is this the same as a regular cleaning?",
          answer:
            "No. A regular cleaning is for a generally healthy mouth. Periodontal therapy treats deposits and inflammation below the gum when disease is present. Using the wrong type of cleaning leaves bacteria behind.",
        },
        {
          question: "Will my gums grow back?",
          answer:
            "Inflamed gums can become less swollen, which may change how they look. Lost bone and gum from periodontitis do not simply return with cleaning. Additional procedures, when appropriate, are a separate discussion.",
        },
        {
          question: "Can I wait if my gums only bleed a little?",
          answer:
            "Bleeding is a sign worth evaluating. Waiting is a decision with a tradeoff. We would rather measure and tell you whether it is gingivitis, periodontitis, or something else than guess from the sink.",
        },
      ]),
      relatedTreatments: related([
        "scaling-root-planing",
        "teeth-cleaning",
        "laser-dentistry",
      ]),
    },
  }),
  treatment({
    slug: "scaling-root-planing",
    title: "Scaling and Root Planing",
    categorySlug: "periodontal",
    summary:
      "A deeper cleaning beneath the gums to remove deposits on root surfaces when periodontal pockets are present.",
    intro:
      "Scaling and root planing is a nonsurgical periodontal cleaning that reaches below the gum to remove tartar and bacterial biofilm from root surfaces. It is used when pockets and deposits make a routine cleaning incomplete. This draft record is stored for owner review as a named treatment distinct from the broader periodontal therapy page.",
    metaDescription:
      "Scaling and root planing is recorded as a draft treatment at West Caldwell Dental Arts pending owner confirmation before public listing.",
    ...draft,
    sections: {
      overview: section("What scaling and root planing is", [
        "Scaling removes deposits. Root planing smooths contaminated root surfaces so gums can rest more closely against the tooth. It is typically done by sections of the mouth with local anesthetic when needed.",
      ]),
      whyRecommended: section("Why it may be recommended", [
        "When probing and images show periodontitis with deposits that a prophylaxis cannot reach.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Pocket depths, bleeding, root anatomy, and whether some sites need a specialist instead of or after this cleaning.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Numbness, ultrasonic and hand instruments, and irrigation. One or more appointments depending on how many quadrants are involved.",
      ]),
      whatToExpect: section("What you may expect", [
        "Tenderness, sensitivity, and a need to keep the mouth clean while gums are healing. A reevaluation visit is part of the process.",
      ]),
      benefits: section("Intended goals", [
        "Reduce bacterial load and inflammation so pockets can improve and maintenance can begin.",
      ]),
      considerations: section("Limitations and considerations", [
        "It cannot rebuild all lost bone. Deep sites may still need surgery. Home care determines much of the outcome.",
      ]),
      alternatives: section("Possible alternatives", [
        "Periodontal surgery, extraction of hopeless teeth, or a different maintenance plan if disease is mild.",
      ]),
      faq: faqs([
        {
          question: "Why isn’t this on the public list yet?",
          answer:
            "The office already discusses periodontal therapy publicly. This named procedure is stored as draft until the owner confirms it as its own published page.",
        },
      ]),
      relatedTreatments: related(["periodontal-therapy", "teeth-cleaning"]),
    },
  }),
] as const;
