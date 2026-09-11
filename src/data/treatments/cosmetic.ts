import {
  draft,
  faqs,
  published,
  related,
  section,
  treatment,
} from "@/data/treatments/helpers";

export const cosmeticTreatments = [
  treatment({
    slug: "porcelain-veneers",
    title: "Porcelain Veneers",
    categorySlug: "cosmetic",
    summary:
      "Thin porcelain coverings that can change the shape or color of visible teeth after an exam and planning visit.",
    intro:
      "Porcelain veneers are thin restorations bonded to the front of selected teeth. They may be considered when color, small chips, or modest shape changes are the concern and the teeth and gums are otherwise a suitable foundation. Veneers are planned after an exam. They are not a first step when decay, gum inflammation, or bite problems need attention first.",
    metaDescription:
      "Porcelain veneers at West Caldwell Dental Arts may reshape or recode selected teeth after exam, planning, and a discussion of alternatives.",
    ...published,
    sections: {
      overview: section("What porcelain veneers are", [
        "A veneer is a custom porcelain facing that covers the visible surface of a tooth. It can alter shade, length, or outline when those changes are appropriate. It does not replace a full crown when a tooth needs more coverage or strength. The material is chosen for appearance and how it will be maintained over time.",
      ]),
      whyRecommended: section("Why they may be recommended", [
        "They may be discussed for teeth that are discolored in a way whitening cannot address, for small chips, or for modest reshaping when bonding alone is not enough. They may also be part of a plan for several front teeth so the result looks even. They are not recommended solely because a photograph looks appealing.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Gum health, bite, enamel thickness, existing restorations, grinding, and how much tooth structure would need to be prepared. Photographs, models, or a mock-up may be used so you can see a proposed outline before anything is bonded. If a tooth needs a crown or if decay is present, that is addressed first.",
      ]),
      howItWorks: section("How treatment generally works", [
        "After planning, selected teeth are prepared, records are taken, and a laboratory fabricates the veneers. Temporary facings may be placed. At delivery, shade and fit are checked, then the veneers are bonded. The bite is reviewed so the new edges do not interfere with chewing or grinding patterns.",
      ]),
      whatToExpect: section("What you may expect", [
        "There is usually more than one visit. Teeth can feel different until the bite settles. Sensitivity can occur after preparation and often eases. You should expect a detailed conversation about how much tooth structure will be reduced. Some designs are more conservative than others; that depends on the starting shape of the teeth.",
      ]),
      benefits: section("Intended goals", [
        "A stable, maintainable change in the appearance of selected teeth, with color and shape that fit the rest of the mouth. The aim is a result that looks like teeth, not like a mask.",
      ]),
      considerations: section("Limitations and considerations", [
        "Veneers can chip or debond. They do not stop grinding. Heavily restored or worn teeth may need a different restoration. Color matching to natural teeth has limits, especially if only one tooth is treated. Veneers are not reversible in the same way as whitening; enamel that is prepared does not grow back.",
      ]),
      recoveryAftercare: section("Comfort and recovery", [
        "Mild tenderness after preparation or bonding is common. A softer diet for a short period may be suggested. Avoid using veneered teeth to open packages. Report a high bite or a loose veneer promptly.",
      ]),
      maintenance: section("Maintenance", [
        "Daily cleaning around the gumline and regular exams matter. Night protection may be discussed if you clench. Whitening products do not change porcelain the way they change enamel; shade planning happens before bonding.",
      ]),
      alternatives: section("Possible alternatives", [
        "Whitening, bonding, orthodontic alignment, or crowns may be more appropriate depending on the finding. Those options are reviewed so veneers are chosen for a reason, not by default.",
      ]),
      faq: faqs([
        {
          question: "Will veneers look artificial?",
          answer:
            "That depends on planning, shade, and how much the outline is changed. We aim for a result that fits your face and the neighboring teeth. Dramatic, uniform “sets” are not the only option, and they are not always appropriate.",
        },
        {
          question: "How long do veneers last?",
          answer:
            "Longevity varies with bite, grinding, hygiene, and the condition of the tooth underneath. They are restorations, not a lifetime coating. We can discuss what would help them last in your mouth.",
        },
        {
          question: "Can one tooth be veneered?",
          answer:
            "Sometimes. Matching a single porcelain restoration to a group of natural teeth is more demanding. After an exam we can say whether that is realistic or whether a different approach would blend more predictably.",
        },
      ]),
      relatedTreatments: related([
        "teeth-whitening",
        "dental-bonding",
        "porcelain-crowns",
      ]),
    },
  }),
  treatment({
    slug: "teeth-whitening",
    title: "Teeth Whitening",
    categorySlug: "cosmetic",
    summary:
      "Professionally directed whitening options discussed after checking the health of teeth and gums.",
    intro:
      "Teeth whitening is a professionally directed process intended to lighten the shade of natural tooth enamel. It is discussed after an exam so we can see whether discoloration is from the enamel surface, from inside the tooth, or from restorations that will not change color. Whitening is elective. It is not a treatment for decay or gum disease.",
    metaDescription:
      "Professionally directed teeth whitening at West Caldwell Dental Arts is discussed after an exam of teeth, gums, and existing restorations.",
    ...published,
    sections: {
      overview: section("What whitening is", [
        "Whitening uses a peroxide-based gel, in a custom tray or in a supervised office setting, to lighten enamel. It does not change the color of crowns, veneers, or fillings. The starting shade, the cause of staining, and gum health all affect whether it is a reasonable option.",
      ]),
      whyRecommended: section("Why it may be discussed", [
        "It may be discussed when enamel has yellowed with age or from diet and you want a lighter shade before other cosmetic work, or as a standalone preference. It is not recommended when teeth hurt from untreated decay, when gums are inflamed, or when expectations are that restorations will lighten too.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Cavities, exposed roots, existing restorations, recession, and how sensitive the teeth already are. Photographs or a shade guide may be used to document the starting point. If a single tooth is dark after trauma or root canal treatment, a different internal approach may be more appropriate than bleaching the whole smile.",
      ]),
      howItWorks: section("How treatment generally works", [
        "If custom trays are used, impressions or a scan are taken and you receive instructions on wear time. In-office visits, when used, apply gel under isolation. Strength and duration are chosen to balance change with comfort. You should not assume that more gel or longer wear is better.",
      ]),
      whatToExpect: section("What you may expect", [
        "Sensitivity during or after whitening is common and usually temporary. Gums can feel irritated if gel contacts them. Shade change is gradual with trays. Results vary. Some enamel lightens more than other enamel. A realistic endpoint is discussed before you start.",
      ]),
      benefits: section("Intended goals", [
        "A lighter enamel shade that still looks like your teeth. The goal is a measured change, not an extreme white that does not match skin tone or restorations.",
      ]),
      considerations: section("Limitations and considerations", [
        "Whitening is not permanent in the sense that staining habits can return color over time. It does not treat intrinsic discoloration from every cause. Overuse can increase sensitivity. It is not appropriate on unrestored cavities. Pregnancy and certain medical questions may lead us to postpone elective bleaching.",
      ]),
      recoveryAftercare: section("Comfort and aftercare", [
        "Sensitivity toothpaste, shorter wear times, or pausing days can help if teeth ache. Avoid staining foods and drinks for a short period if that is part of your instructions. Call if gum burns or severe sensitivity occur.",
      ]),
      maintenance: section("Maintenance", [
        "Touch-up trays, if provided, are used occasionally rather than continuously. Daily hygiene and exams continue. If you later have a crown or filling on a front tooth, shade matching is planned to the then-current enamel, not to an old photograph.",
      ]),
      alternatives: section("Possible alternatives", [
        "Professional cleaning first if stain is mostly external. Bonding or veneers if enamel will not lighten enough or if shape is the real concern. No treatment is also a valid choice.",
      ]),
      faq: faqs([
        {
          question: "Is store-bought whitening the same?",
          answer:
            "Over-the-counter products vary in strength and how well they fit. Ill-fitting trays can irritate gums. After an exam we can discuss whether a custom approach is worthwhile for your teeth.",
        },
        {
          question: "Will it work on crowns or fillings?",
          answer:
            "No. Restorations keep their original shade. If they show after enamel lightens, replacement of those restorations may be discussed later. That is a separate decision.",
        },
        {
          question: "How white will my teeth get?",
          answer:
            "There is no single number. Starting shade, enamel thickness, and the cause of color all matter. We would rather stop at a natural result than push past comfort.",
        },
      ]),
      relatedTreatments: related([
        "porcelain-veneers",
        "teeth-cleaning",
        "dental-bonding",
      ]),
    },
  }),
  treatment({
    slug: "botox",
    title: "BOTOX",
    categorySlug: "cosmetic",
    summary:
      "A neuromodulator treatment that may be considered in selected dental or facial-muscle contexts after examination. Not currently listed as a public offering.",
    intro:
      "This record describes botulinum toxin type A as it is sometimes discussed in dental settings, such as selected muscle-related concerns. It is stored for owner review. It is not published as a current West Caldwell Dental Arts offering. Availability should not be assumed from this page existing in the catalog.",
    metaDescription:
      "BOTOX is recorded as a draft service concept at West Caldwell Dental Arts and is not published as a current public offering.",
    ...draft,
    sections: {
      overview: section("What this treatment is", [
        "Botulinum toxin type A can reduce activity in targeted muscles for a limited time. In dentistry it is sometimes discussed for clenching-related muscle discomfort or for selected facial esthetic requests. Those uses have different evidence, different consent, and different training requirements.",
      ]),
      whyRecommended: section("Why it might be considered", [
        "Only after a diagnosis, not as a cosmetic add-on by default. Muscle pain, certain functional concerns, or a clearly defined esthetic request would need their own evaluation.",
      ]),
      evaluation: section("What an evaluation would consider", [
        "Medical history, medications, neuromuscular conditions, pregnancy, the pattern of muscle activity, and whether a dental cause (bite, grinding, joint) should be treated first.",
      ]),
      howItWorks: section("How treatment generally works", [
        "If offered, small amounts would be placed in mapped muscles. Onset is delayed. Effect is temporary. Follow-up would be part of any real protocol.",
      ]),
      whatToExpect: section("What a patient might expect", [
        "Brief injections, possible bruising, and a gradual change in muscle activity. Results vary. This is not a substitute for a night guard or for treating joint disease.",
      ]),
      benefits: section("Intended goals if used", [
        "Temporary reduction of selected muscle activity when that is the clinical aim. Esthetic softening of expression is a different goal and would need separate, explicit consent.",
      ]),
      considerations: section("Limitations and considerations", [
        "Not appropriate for every patient. Spread of effect, eyelid or smile change, and systemic contraindications are known issues to discuss if this were ever offered. It does not treat the dental causes of grinding.",
      ]),
      alternatives: section("Possible alternatives", [
        "Occlusal appliances, physical therapy referral, bite evaluation, or no treatment. Those paths may be more relevant for many dental patients.",
      ]),
      faq: faqs([
        {
          question: "Is this available at the office?",
          answer:
            "This item is not enabled for public listing. Ask the office directly if you have a question about current services. Do not rely on this draft record as a promise of treatment.",
        },
      ]),
      relatedTreatments: related(["teeth-grinding", "oral-appliances"]),
    },
  }),
  treatment({
    slug: "gum-contouring",
    title: "Gum Contouring",
    categorySlug: "cosmetic",
    summary:
      "Reshaping of gum display around teeth, considered only after periodontal and esthetic evaluation. Not currently listed as a public offering.",
    intro:
      "Gum contouring is a procedure that reshapes gum tissue to change how much tooth is visible. It can be discussed for selected esthetic concerns or when tissue architecture interferes with cleaning. This record is stored for owner review and is not published as a current public offering.",
    metaDescription:
      "Gum contouring is recorded as a draft service concept at West Caldwell Dental Arts and is not published as a current public offering.",
    ...draft,
    sections: {
      overview: section("What gum contouring is", [
        "It is a surgical or laser-assisted reshaping of gingival margins. It is not a substitute for treating periodontal disease. If inflammation is present, that is addressed first.",
      ]),
      whyRecommended: section("Why it might be considered", [
        "Uneven gum heights, excess display of gum when smiling, or tissue that covers too much of a tooth after eruption. Each case needs a diagnosis of why the tissue looks that way, including bone level.",
      ]),
      evaluation: section("What an evaluation would consider", [
        "Periodontal probing, bone sounding or imaging when needed, smile line, tooth length, and whether orthodontics or restorative lengthening would be more appropriate.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Tissue is reshaped with a blade, laser, or both, sometimes with bone recontouring if biologic width requires it. Healing time depends on how much is done.",
      ]),
      whatToExpect: section("What a patient might expect", [
        "Soreness, dietary limits for a short period, and a need to keep the area clean without disrupting sutures or a dressing if used.",
      ]),
      benefits: section("Intended goals if used", [
        "More even gingival display or improved access for hygiene when architecture is the problem.",
      ]),
      considerations: section("Limitations and considerations", [
        "Tissue can rebound. If bone is not addressed when it should be, the result may not be stable. It does not whiten teeth or straighten them.",
      ]),
      alternatives: section("Possible alternatives", [
        "Orthodontics, restorative lengthening with crowns or veneers after periodontal planning, or no treatment.",
      ]),
      faq: faqs([
        {
          question: "Is this the same as treating gum disease?",
          answer:
            "No. Periodontal therapy treats inflammation and supporting bone. Contouring is a separate, often esthetic or architectural, procedure.",
        },
      ]),
      relatedTreatments: related(["periodontal-therapy", "porcelain-veneers"]),
    },
  }),
  treatment({
    slug: "dental-bonding",
    title: "Dental Bonding",
    categorySlug: "cosmetic",
    summary:
      "Tooth-colored composite used to repair chips, close small spaces, or reshape selected teeth when that is clinically appropriate.",
    intro:
      "Dental bonding uses tooth-colored composite to add or restore small amounts of tooth structure. It may be considered for chips, worn edges, or modest shape changes when a veneer is not needed. This record is a complete draft for owner review. It is not listed publicly until confirmed as a distinct published offering.",
    metaDescription:
      "Dental bonding is recorded as a draft treatment at West Caldwell Dental Arts pending owner confirmation before any public listing.",
    ...draft,
    sections: {
      overview: section("What bonding is", [
        "Composite is bonded to enamel or dentin after the surface is prepared. It can repair a chip or change an outline in a single visit in many cases. It is the same family of material used in many fillings, applied here with an esthetic emphasis.",
      ]),
      whyRecommended: section("Why it may be recommended", [
        "When the change needed is small, when conserving tooth structure matters, or when a patient wants to try a shape change before a more involved restoration.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Bite, grinding, the size of the chip, color match, and whether moisture control is possible. Large rebuilds or heavy bite forces may need a different restoration.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Shade is chosen, the tooth is isolated, adhesive steps are completed, and composite is layered and shaped. The bite is adjusted and the surface is polished.",
      ]),
      whatToExpect: section("What you may expect", [
        "A single visit in many cases. The tooth may feel slightly different until you adapt. Composite can stain over time more than porcelain.",
      ]),
      benefits: section("Intended goals", [
        "A conservative repair or modest cosmetic change that can often be completed without a laboratory.",
      ]),
      considerations: section("Limitations and considerations", [
        "Bonding can chip, wear, or discolor. It is not as color-stable as porcelain in many mouths. It does not straighten crowded teeth.",
      ]),
      maintenance: section("Maintenance", [
        "Avoid biting hard objects with bonded edges. Polishing at recall visits can refresh the surface. A night guard may be discussed if you clench.",
      ]),
      alternatives: section("Possible alternatives", [
        "Whitening first if color is the issue, veneers if a more durable facing is needed, or no treatment for a small chip that is not bothersome.",
      ]),
      faq: faqs([
        {
          question: "Is bonding the same as a filling?",
          answer:
            "The material can be the same family. Bonding in this sense is often used to add to a tooth’s outline, not only to fill a cavity. The exam decides which description fits.",
        },
      ]),
      relatedTreatments: related([
        "porcelain-veneers",
        "tooth-colored-fillings",
        "teeth-whitening",
      ]),
    },
  }),
] as const;
