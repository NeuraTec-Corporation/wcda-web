import {
  draft,
  faqs,
  published,
  related,
  section,
  treatment,
} from "@/data/treatments/helpers";

export const dentalImplantTreatments = [
  treatment({
    slug: "implants",
    title: "Implants",
    categorySlug: "dental-implants",
    summary:
      "A titanium post placed in the jaw to support a crown, bridge, or denture when the site is a suitable candidate.",
    intro:
      "A dental implant is a small post placed in the jaw to support a replacement tooth or to help stabilize a denture. It is one option for missing teeth, not the only one. Whether an implant is appropriate depends on bone, gum health, medical history, and the neighboring bite. Those questions are answered after an examination, not from a photograph of a missing space.",
    metaDescription:
      "Dental implants at West Caldwell Dental Arts may support a crown, bridge, or denture when bone, health, and bite make the site a suitable candidate.",
    ...published,
    sections: {
      overview: section("What a dental implant is", [
        "The implant is the portion that integrates with bone. A connector (abutment) and a crown, bridge, or denture attachment complete the replacement. Healing time between placement and the final tooth varies. The implant itself is not the visible tooth.",
      ]),
      whyRecommended: section("Why they may be recommended", [
        "To replace a missing tooth without preparing neighboring teeth for a bridge, or to improve support for a denture. They may also be discussed when a tooth cannot be saved and the patient wants a fixed replacement.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Three-dimensional imaging is often used to judge bone height, width, and nearby nerves or sinus. Gum health, smoking, diabetes control, medications that affect bone, and clenching all influence planning. If a site is deficient, grafting or a different replacement may be discussed.",
      ]),
      howItWorks: section("How treatment generally works", [
        "After planning, the implant is placed in a surgical visit. A healing period typically follows so the bone can integrate. Then an abutment and restoration are made. Some situations allow a temporary tooth during healing; others do not. The sequence is explained for your site, not as a universal timeline.",
      ]),
      whatToExpect: section("What you may expect", [
        "Soreness after placement, dietary limits for a short period, and several visits over months. Integration is not visible to you; it is judged clinically and with images when needed. The final crown is shaped to clean around, not only to look like a tooth from the front.",
      ]),
      benefits: section("Intended goals", [
        "A stable foundation for a replacement tooth that does not rely on neighboring teeth the way a bridge does, when the site heals as planned.",
      ]),
      considerations: section("Limitations and considerations", [
        "Implants can fail to integrate or develop inflammation in the surrounding tissues. They are not immune to bite overload. They do not prevent bone change in other parts of the jaw. Healing is slower when medical or smoking factors are present. An implant is not appropriate for every missing-tooth space.",
      ]),
      recoveryAftercare: section("Comfort and recovery", [
        "Written instructions cover swelling, medications if prescribed, and what to eat. Keep the area clean as directed without disturbing sutures. Contact the office for increasing pain, fever, or a fixture that feels loose.",
      ]),
      maintenance: section("Maintenance", [
        "Daily cleaning around the implant crown and professional examinations are required. Special brushes or other aids may be recommended. Implants can develop peri-implant disease if plaque control is poor.",
      ]),
      alternatives: section("Possible alternatives", [
        "A bridge, a removable partial denture, or leaving the space if function and the bite allow. Ceramic implant materials are a separate discussion when metal-free options are being considered.",
      ]),
      faq: faqs([
        {
          question: "Are implants painful?",
          answer:
            "The placement visit is done with local anesthetic, and other comfort measures can be discussed. Afterward, soreness is expected; severe or worsening pain is not and should be reported. Comfort varies with the site and with individual healing.",
        },
        {
          question: "How long do implants last?",
          answer:
            "When they integrate and are maintained, many function for a long time. The crown on top may need repair or replacement sooner than the implant. Nothing in the mouth is maintenance-free.",
        },
        {
          question: "Can anyone get an implant?",
          answer:
            "No. Bone volume, medical history, and gum health all matter. If an implant is not a fit, we explain why and discuss other replacements.",
        },
      ]),
      relatedTreatments: related([
        "ceramic-implants",
        "porcelain-bridges",
        "dentures",
        "bone-grafting",
      ]),
    },
  }),
  treatment({
    slug: "implant-crowns",
    title: "Implant Crowns",
    categorySlug: "dental-implants",
    summary:
      "The visible tooth restoration attached to a dental implant after healing, designed for chewing, appearance, and cleaning access.",
    intro:
      "An implant crown is the tooth-shaped restoration that attaches to an implant after the site has healed enough to restore. It is a distinct step from placing the implant. This draft record exists so the restoration visit can be reviewed as its own content entity before any public listing.",
    metaDescription:
      "Implant crowns are recorded as a draft treatment at West Caldwell Dental Arts pending owner confirmation before any public listing.",
    ...draft,
    sections: {
      overview: section("What an implant crown is", [
        "It is the custom tooth that screws or cements to an abutment on the implant. Emergence profile—how the crown meets the gum—is planned so you can clean it.",
      ]),
      whyRecommended: section("Why it is a separate step", [
        "The implant needs a period of stability. The crown is designed after that, using records of the bite and neighboring teeth.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Integration, gum contour, screw access, shade, and how the opposing tooth hits.",
      ]),
      howItWorks: section("How treatment generally works", [
        "An impression or scan of the implant position is made. The laboratory fabricates the abutment and crown or a combined restoration. Fit and bite are verified at delivery.",
      ]),
      whatToExpect: section("What you may expect", [
        "A try-in may be needed. Screw-retained crowns have an access that is filled after torqueing. Cemented crowns require careful cleanup of excess cement.",
      ]),
      benefits: section("Intended goals", [
        "A functional, cleanable tooth that matches the site as closely as practical.",
      ]),
      considerations: section("Limitations and considerations", [
        "Porcelain can chip. Screws can loosen. The gum architecture around an implant is not identical to a natural tooth.",
      ]),
      maintenance: section("Maintenance", [
        "Professional exams include checking the restoration and the tissues. Do not use the implant tooth as a tool.",
      ]),
      alternatives: section("Possible alternatives", [
        "A temporary healing crown in selected cases, or a different replacement if the implant is not restored.",
      ]),
      faq: faqs([
        {
          question: "Is the crown the same as the implant?",
          answer:
            "No. The implant is in the bone. The crown is the visible tooth. Both need maintenance.",
        },
      ]),
      relatedTreatments: related(["implants", "porcelain-crowns", "ceramic-implants"]),
    },
  }),
  treatment({
    slug: "implant-supported-dentures",
    title: "Implant-Supported Dentures",
    categorySlug: "dental-implants",
    summary:
      "A denture that attaches to implants for more stability than a conventional complete denture in selected cases.",
    intro:
      "Implant-supported dentures use two or more implants to help hold a removable or, in some designs, a fixed prosthesis. They may be considered when a conventional denture lacks stability. This draft is stored for owner review and is not published as a confirmed distinct offering until approved.",
    metaDescription:
      "Implant-supported dentures are recorded as a draft treatment at West Caldwell Dental Arts pending owner confirmation.",
    ...draft,
    sections: {
      overview: section("What they are", [
        "Implants in the jaw connect to a denture through locators, a bar, or other attachments. Some designs are removed by the patient for cleaning; others are fixed and cleaned around like a bridge.",
      ]),
      whyRecommended: section("Why they may be considered", [
        "When a loose lower denture interferes with eating or speaking, and enough bone and health exist to place implants.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Available bone, number of implants needed, opposing arch, and whether the patient can maintain the chosen hygiene design.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Implants are placed and allowed to heal, then attachments and a new or converted denture are delivered. Conversion of an existing denture is not always possible.",
      ]),
      whatToExpect: section("What you may expect", [
        "Surgery, healing, and several prosthetic visits. Stability is usually better than a gum-supported denture; it is still a prosthesis with maintenance needs.",
      ]),
      benefits: section("Intended goals", [
        "Improved retention and chewing confidence compared with a conventional complete denture in selected patients.",
      ]),
      considerations: section("Limitations and considerations", [
        "More implants and a fixed design add complexity and cost. Attachments wear and need replacement. Bone grafting may still be required.",
      ]),
      alternatives: section("Possible alternatives", [
        "A well-made conventional denture, a different implant number, or a fixed implant bridge if anatomy and maintenance allow.",
      ]),
      faq: faqs([
        {
          question: "Can my current denture be reused?",
          answer:
            "Sometimes as a conversion; often a new denture is more predictable. That is decided after records.",
        },
      ]),
      relatedTreatments: related(["implants", "dentures"]),
    },
  }),
] as const;
