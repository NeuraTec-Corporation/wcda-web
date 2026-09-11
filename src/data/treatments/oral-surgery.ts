import {
  draft,
  faqs,
  published,
  related,
  section,
  treatment,
} from "@/data/treatments/helpers";

export const oralSurgeryTreatments = [
  treatment({
    slug: "tooth-extractions",
    title: "Tooth Extractions",
    categorySlug: "oral-surgery",
    summary:
      "Removal of a tooth that cannot be restored, or that is causing infection or crowding that cannot be managed another way.",
    intro:
      "A tooth extraction is the removal of a tooth from its socket. It is considered when the tooth cannot be restored predictably, when infection cannot be controlled another way, or when leaving the tooth would cause more harm than removing it. The reason, the visit, and typical after-care are explained before the appointment proceeds.",
    metaDescription:
      "Tooth extractions at West Caldwell Dental Arts are considered when a tooth cannot be restored comfortably or safely after examination.",
    ...published,
    sections: {
      overview: section("What an extraction is", [
        "The tooth is loosened and removed with instruments after the area is numb. Some teeth come out in one piece. Others are sectioned if roots are curved or the tooth is broken. A simple extraction and a surgical extraction differ in how much bone or gum needs to be managed.",
      ]),
      whyRecommended: section("Why it may be recommended", [
        "Advanced decay, a fracture below the bone, failed root canal treatment, severe periodontal bone loss, or a tooth that interferes with other necessary care. Crowding alone is not always a reason; that decision is specific.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Radiographs, medical history, medications including blood thinners, sinus or nerve proximity, and whether sedation or a specialist would be safer. Replacement options can be outlined before the tooth is removed so the site is not an afterthought.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Anesthetic is given and tested. The tooth is elevated and delivered. The socket is inspected. Sutures may be placed. Gauze pressure is used to help a clot form. Written instructions go home with you.",
      ]),
      whatToExpect: section("What you may expect", [
        "Pressure during the visit more than sharp pain if anesthesia is working. Afterward, bleeding that tapers, swelling that may peak the next day, and a hole that closes over days to weeks. Difficulty opening wide can occur, especially with back teeth.",
      ]),
      benefits: section("Intended goals", [
        "Removal of a source of infection or pain, or of a tooth that cannot be maintained, so the rest of the mouth can be cared for more safely.",
      ]),
      considerations: section("Limitations and considerations", [
        "Extraction is irreversible. Nearby teeth can be sensitive. Dry socket can occur, especially with lower molars and smoking. Numbness that lasts is uncommon but is discussed when the nerve is close. Replacement is a separate decision.",
      ]),
      recoveryAftercare: section("Comfort and recovery", [
        "Bite on gauze as directed. Do not smoke or use straws while the clot is forming if that is part of your instructions. Soft foods, gentle rinsing after the first day, and prescribed or over-the-counter medicines as allowed. Call for bleeding that does not slow, fever, or pain that worsens after a few days.",
      ]),
      maintenance: section("After the site heals", [
        "The space is checked at follow-up. If a replacement is planned, timing depends on healing and the chosen option. Remaining teeth still need daily care.",
      ]),
      alternatives: section("Possible alternatives", [
        "Root canal treatment and restoration if the tooth is saveable, periodontal therapy if the issue is gum support that can still be managed, or referral for a more complex surgical removal.",
      ]),
      faq: faqs([
        {
          question: "Will I feel the extraction?",
          answer:
            "You should be numb to sharp pain. Pressure and noise are normal. If you feel pain, say so so more anesthetic can be given when it is safe to do so.",
        },
        {
          question: "When can I replace the tooth?",
          answer:
            "Sometimes a plan is made the same day; sometimes bone and gum need to heal first. Implants, bridges, and partial dentures have different timelines. We discuss that before or at the extraction visit.",
        },
        {
          question: "What is a dry socket?",
          answer:
            "It is pain that can occur when the clot is lost and bone is exposed. It is treatable in the office. Following after-care instructions lowers the chance but does not make it impossible.",
        },
      ]),
      relatedTreatments: related([
        "oral-surgery",
        "wisdom-tooth-extraction",
        "implants",
        "root-canals",
      ]),
    },
  }),
  treatment({
    slug: "oral-surgery",
    title: "Oral Surgery",
    categorySlug: "oral-surgery",
    summary:
      "Surgical dental care, including more involved extractions, planned after a clinical examination.",
    intro:
      "Oral surgery in this practice setting means surgical dental procedures that go beyond a simple lift-and-remove extraction. That can include teeth that are broken at the gum, roots that need to be uncovered, or other intraoral surgery planned after examination. Complex hospital-level surgery is not assumed. If a procedure exceeds what can be done safely here, referral is discussed.",
    metaDescription:
      "Oral surgery at West Caldwell Dental Arts includes more involved extractions and related surgical dental care after examination.",
    ...published,
    sections: {
      overview: section("What oral surgery includes here", [
        "Surgical extractions, management of remaining roots, and related soft-tissue or bone steps that allow a tooth to be removed or a site to be prepared. Each procedure is defined by the anatomy in front of us, not by a generic package.",
      ]),
      whyRecommended: section("Why it may be recommended", [
        "When a tooth or root cannot be removed with simple elevation, when bone must be conservatively reshaped, or when access requires a small gum opening. The goal is a controlled visit rather than force.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Imaging, medical history, anxiety and comfort needs, and whether a specialist in oral and maxillofacial surgery would be the safer clinician for that anatomy.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Anesthesia, a planned incision or bone removal only as needed, delivery of the tooth or root, cleaning of the site, and sutures when they help healing. You leave with instructions specific to what was done.",
      ]),
      whatToExpect: section("What you may expect", [
        "A longer visit than a simple extraction. More swelling is possible. Sutures may dissolve or need removal. Time off strenuous activity is often suggested for a short period.",
      ]),
      benefits: section("Intended goals", [
        "Complete removal or surgical correction with attention to neighboring structures, so healing can proceed without leaving fragments that were meant to come out.",
      ]),
      considerations: section("Limitations and considerations", [
        "Surgery has more swelling and a longer recovery than a simple extraction. Sinus communication, nerve proximity, and medical bleeding risk are discussed when relevant. Not every surgical problem is treated in a general dental office.",
      ]),
      recoveryAftercare: section("Comfort and recovery", [
        "Ice, elevation of the head, medications as directed, and a soft diet. Keep gauze and follow-up appointments. Report increasing swelling after the third day, fever, or bleeding that soaks dressings.",
      ]),
      alternatives: section("Possible alternatives", [
        "Referral to an oral surgeon, watching a situation that is truly stable (uncommon when surgery was recommended), or a different treatment if the diagnosis changes.",
      ]),
      faq: faqs([
        {
          question: "Is this the same as seeing an oral surgeon?",
          answer:
            "Oral and maxillofacial surgeons complete additional hospital-based training and manage a wider range of facial surgery. Some surgical extractions are appropriate in a general dental setting. If yours is not, we refer.",
        },
        {
          question: "Will I be asleep?",
          answer:
            "Many visits use local anesthetic only. Additional comfort options, when available, are discussed in advance. General anesthesia in a hospital or surgical center is a different setting.",
        },
      ]),
      relatedTreatments: related([
        "tooth-extractions",
        "bone-grafting",
        "wisdom-tooth-extraction",
      ]),
    },
  }),
  treatment({
    slug: "bone-grafting",
    title: "Bone Grafting",
    categorySlug: "oral-surgery",
    summary:
      "Placement of bone or bone-substitute material to support healing of a socket or ridge, often discussed with implants. Not currently listed as a public offering.",
    intro:
      "Bone grafting in dentistry may be used to preserve or rebuild jawbone after extraction or to prepare a site for an implant. This record is stored for owner review. It is not published as a current public offering. Need and technique are highly site-specific.",
    metaDescription:
      "Bone grafting is recorded as a draft service at West Caldwell Dental Arts and is not published as a current public offering.",
    ...draft,
    sections: {
      overview: section("What bone grafting is", [
        "Material is placed in a socket or along a ridge to provide a scaffold for the patient’s own bone during healing. Sources and products vary. Not every extraction site is grafted.",
      ]),
      whyRecommended: section("Why it might be considered", [
        "To reduce collapse of the ridge when an implant is later planned, or to rebuild width or height when a site is deficient. It is not automatically required for every missing tooth.",
      ]),
      evaluation: section("What an evaluation would consider", [
        "Imaging, infection at the site, sinus anatomy, medical history, and whether a graft would change the feasibility of an implant.",
      ]),
      howItWorks: section("How treatment generally works", [
        "After the site is prepared, graft material is placed and often covered with a membrane. Sutures hold the gum. Healing is measured in months before an implant in many protocols.",
      ]),
      whatToExpect: section("What a patient might expect", [
        "Swelling and dietary limits similar to a surgical extraction, plus instructions not to disturb the graft. Particles in the mouth can occur; the office should be called if a large portion is lost.",
      ]),
      benefits: section("Intended goals if used", [
        "A more adequate volume of bone for a future implant or a more stable ridge contour in selected cases.",
      ]),
      considerations: section("Limitations and considerations", [
        "Grafts can fail to produce enough bone. Infection, smoking, and membrane exposure reduce success. Grafting does not guarantee an implant can be placed.",
      ]),
      alternatives: section("Possible alternatives", [
        "Healing without a graft, a different implant diameter or position, a bridge, or a removable replacement.",
      ]),
      faq: faqs([
        {
          question: "Is this currently offered?",
          answer:
            "This item is not enabled for public listing. Current availability should be confirmed with the office, not assumed from this draft.",
        },
      ]),
      relatedTreatments: related(["implants", "tooth-extractions", "oral-surgery"]),
    },
  }),
  treatment({
    slug: "wisdom-tooth-extraction",
    title: "Wisdom Tooth Extraction",
    categorySlug: "oral-surgery",
    summary:
      "Removal of third molars when they are causing problems or are likely to, after imaging and examination.",
    intro:
      "Wisdom teeth are third molars. They are not automatically removed. Extraction is considered when they are decayed, infected, crowding other teeth in a way that matters, or trapped under the gum in a position that is hard to keep clean. This draft record is complete for owner review and is not separately listed publicly until confirmed.",
    metaDescription:
      "Wisdom tooth extraction is recorded as a draft treatment at West Caldwell Dental Arts pending owner confirmation before public listing.",
    ...draft,
    sections: {
      overview: section("What this treatment is", [
        "Removal of one or more third molars, sometimes simple and sometimes surgical depending on eruption and root shape.",
      ]),
      whyRecommended: section("Why it may be recommended", [
        "Pain, swelling, decay that cannot be restored, gum infection around a partly erupted tooth, or a position that threatens the second molar.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Panoramic or 3D imaging, nerve proximity, age, and symptoms. Healthy, fully erupted, cleanable wisdom teeth may be watched.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Same principles as surgical or simple extraction, often with more swelling for lower impacted teeth.",
      ]),
      whatToExpect: section("What you may expect", [
        "Several days of limited opening and a soft diet. Impacted lower molars have a higher chance of dry socket than many other extractions.",
      ]),
      benefits: section("Intended goals", [
        "Removing a source of infection or a tooth that cannot be maintained, when that is the diagnosis.",
      ]),
      considerations: section("Limitations and considerations", [
        "Nerve injury is uncommon but is discussed when the canal is close. Not every asymptomatic wisdom tooth needs removal.",
      ]),
      alternatives: section("Possible alternatives", [
        "Monitoring, operculectomy in very selected cases, or restorative care if the tooth is erupted and restorable.",
      ]),
      faq: faqs([
        {
          question: "Should all wisdom teeth come out?",
          answer:
            "No. The decision is based on the tooth, the gum, the second molar, and your health—not on age alone.",
        },
      ]),
      relatedTreatments: related(["tooth-extractions", "oral-surgery"]),
    },
  }),
] as const;
