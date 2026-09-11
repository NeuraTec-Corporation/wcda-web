import {
  draft,
  faqs,
  published,
  related,
  section,
  treatment,
} from "@/data/treatments/helpers";

export const restorativeTreatments = [
  treatment({
    slug: "restorative-dentistry",
    title: "Restorative Dentistry",
    categorySlug: "restorative",
    summary:
      "Treatment that repairs teeth so they can function more comfortably, using options matched to the clinical finding.",
    intro:
      "Restorative dentistry is the family of treatments that repair teeth damaged by decay, fracture, or wear, and that can replace teeth that cannot be kept. The specific restoration—filling, onlay, crown, bridge, or denture—is chosen after an exam, not from a menu. This page explains how that planning usually works at West Caldwell Dental Arts.",
    metaDescription:
      "Restorative dentistry at West Caldwell Dental Arts repairs or replaces teeth after examination, using options matched to the clinical finding.",
    ...published,
    sections: {
      overview: section("What restorative dentistry includes", [
        "It includes fillings, partial and full-coverage restorations, bridges, and removable replacements. The shared aim is comfortable chewing, a seal against new decay where possible, and a plan you can maintain. Appearance is considered, but strength and cleanability come first when those needs conflict.",
      ]),
      whyRecommended: section("Why it may be recommended", [
        "When a tooth is weakened, sensitive, or missing structure, leaving it untreated can allow decay or cracks to progress. Restorative care is recommended when the benefit of repair outweighs watching, and when the tooth or site is a reasonable candidate.",
      ]),
      evaluation: section("What an evaluation considers", [
        "How much healthy tooth remains, the bite, gum and bone support, existing restorations, and your goals. Images are used when they add information. Medical history can affect which materials or appointment lengths are wise.",
      ]),
      howItWorks: section("How care is usually organized", [
        "Urgent problems such as pain or broken teeth are sequenced first. Elective replacements are planned when the mouth is stable enough. Each restoration has its own visit pattern, which is explained before it starts.",
      ]),
      whatToExpect: section("What you may expect", [
        "A clear description of why a particular option is on the table, what it involves, and what it cannot do. Second opinions and staged treatment are acceptable when the situation is not urgent.",
      ]),
      benefits: section("Intended goals", [
        "Comfortable function, protection of remaining tooth structure, and a restoration that can be cleaned. Longevity depends on the tooth, the bite, and home care.",
      ]),
      considerations: section("Limitations and considerations", [
        "Not every tooth can be restored predictably. Some have a guarded outlook even after excellent work. Restorations do not make a tooth immune to new decay or fracture.",
      ]),
      alternatives: section("Possible paths", [
        "Monitoring a small finding, repairing the tooth, or removing it and discussing replacement. Those choices are discussed with the risks of waiting included.",
      ]),
      faq: faqs([
        {
          question: "Is the most expensive option always the right one?",
          answer:
            "No. The right restoration is the one that matches the remaining tooth, the bite, and what you can maintain. We explain tradeoffs rather than ranking options by price alone.",
        },
        {
          question: "Can everything be done in one visit?",
          answer:
            "Sometimes for smaller repairs. Crowns, bridges, and many replacements need records and a laboratory or a healing period. We will say which applies.",
        },
      ]),
      relatedTreatments: related([
        "tooth-colored-fillings",
        "porcelain-crowns",
        "dentures",
        "implants",
      ]),
    },
  }),
  treatment({
    slug: "tooth-colored-fillings",
    title: "Tooth-Colored Fillings",
    categorySlug: "restorative",
    summary:
      "Tooth-colored restorations used to repair decayed or damaged tooth structure.",
    intro:
      "Tooth-colored fillings restore areas of decay or small fractures using materials designed to blend with enamel. They are used when enough healthy tooth remains to support a bonded repair. The visit is planned after the dentist confirms that a filling, rather than a larger restoration, is appropriate.",
    metaDescription:
      "Tooth-colored fillings at West Caldwell Dental Arts repair decay or small fractures when a bonded restoration is appropriate after exam.",
    ...published,
    sections: {
      overview: section("What tooth-colored fillings are", [
        "They are restorations placed directly in the tooth, most often composite resin, shaped and hardened in a single visit. They replace missing structure and seal the prepared area. They are not a coating over an untreated cavity.",
      ]),
      whyRecommended: section("Why they may be recommended", [
        "To remove decay or repair a chip while conserving as much healthy tooth as practical. They may also replace an older restoration that is leaking or broken if the remaining tooth can still support a filling.",
      ]),
      evaluation: section("What an evaluation considers", [
        "The size and location of the problem, contact with neighboring teeth, bite forces, and whether the decay is close to the nerve. If the remaining walls are thin, an onlay or crown may be more protective than a large filling.",
      ]),
      howItWorks: section("How treatment generally works", [
        "The area is anesthetized if needed, decay or old material is removed, the tooth is isolated, and adhesive steps are completed. Composite is placed in layers, shaped, and adjusted to the bite. A liner or other adjunct may be used when the preparation is deep.",
      ]),
      whatToExpect: section("What you may expect", [
        "Numbness for a period after local anesthetic. The tooth may feel high until the bite is refined, or sensitive to cold for a time. Most people return to normal eating once numbness fades, unless a different instruction is given.",
      ]),
      benefits: section("Intended goals", [
        "A sealed repair that restores contour for cleaning and chewing, with a shade that is less noticeable than many metal restorations.",
      ]),
      considerations: section("Limitations and considerations", [
        "Composite can wear, chip, or stain. Very large fillings may not protect the tooth as well as a coverage restoration. Moisture during placement can affect the bond. Fillings do not “heal” the nerve if the tooth later needs root canal treatment.",
      ]),
      recoveryAftercare: section("Comfort and recovery", [
        "Avoid chewing on the numb side until feeling returns. Mild soreness of the gum from the clamp or injection can occur. Contact the office if the bite feels high, if pain increases, or if a piece breaks.",
      ]),
      maintenance: section("Maintenance", [
        "Clean along the edges of the filling as you would a natural tooth. The restoration is checked at exams. Diet and grinding still affect how long it lasts.",
      ]),
      alternatives: section("Possible alternatives", [
        "Watching a very early change, a different material, an onlay or crown if the tooth needs more coverage, or extraction if the tooth cannot be restored.",
      ]),
      faq: faqs([
        {
          question: "Is a tooth-colored filling the same as composite?",
          answer:
            "Composite is the most common tooth-colored filling material in this office’s restorative discussion. Other tooth-colored options exist for different situations. The exam matches the material to the tooth.",
        },
        {
          question: "Will I see the filling?",
          answer:
            "Shades are chosen to blend. Perfect invisibility is not always possible, especially at the edges or if the tooth is very translucent. Function and seal remain the priority.",
        },
      ]),
      relatedTreatments: related([
        "composite-fillings",
        "onlays",
        "air-abrasion",
        "porcelain-crowns",
      ]),
    },
  }),
  treatment({
    slug: "composite-fillings",
    title: "Composite Fillings",
    categorySlug: "restorative",
    summary:
      "Composite material used to restore small to moderate areas of decay or wear.",
    intro:
      "Composite fillings use a resin material that is bonded to the tooth to restore small to moderate areas of decay or wear. They are a specific type of tooth-colored restoration. Whether composite is the right choice depends on the size of the preparation, moisture control, and how the tooth meets the bite.",
    metaDescription:
      "Composite fillings at West Caldwell Dental Arts restore small to moderate decay or wear when a bonded resin repair is appropriate.",
    ...published,
    sections: {
      overview: section("What composite fillings are", [
        "Composite is a filled resin placed in layers and hardened with a light. It bonds to prepared tooth structure when isolation is adequate. It can be used in front or back teeth when the remaining walls can support it.",
      ]),
      whyRecommended: section("Why they may be recommended", [
        "For conservative repairs where the dentist can keep the field dry and the remaining tooth is strong enough. They may also be used to replace selected older restorations when the tooth still qualifies for a direct filling.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Depth of decay, proximity to the pulp, existing cracks, and whether an indirect restoration would last more predictably. Grinding and missing enamel at the margins affect the decision.",
      ]),
      howItWorks: section("How treatment generally works", [
        "After anesthesia and isolation, the tooth is prepared, adhesive chemistry is applied, and composite is layered. The bite and contacts are checked so floss and chewing work as they should.",
      ]),
      whatToExpect: section("What you may expect", [
        "A visit that is often completed in one appointment. Bright curing lights, the taste of materials, and a period of numbness. Sensitivity can follow, especially if the filling is deep.",
      ]),
      benefits: section("Intended goals", [
        "A conservative, tooth-colored repair that restores form without covering the entire tooth when that coverage is not needed.",
      ]),
      considerations: section("Limitations and considerations", [
        "Composite is technique-sensitive. It can shrink slightly as it sets, which is managed with layering. It is not ideal for every large reconstruction. Patients who cannot sit for isolation may need a different approach.",
      ]),
      recoveryAftercare: section("Comfort and recovery", [
        "Wait until numbness fades before chewing. If the tooth feels high the next day, call so the bite can be adjusted. Increasing pain is not expected and should be reported.",
      ]),
      maintenance: section("Maintenance", [
        "Composite edges are a common place for new decay if plaque sits there. Daily cleaning and recall visits matter as much as the day the filling was placed.",
      ]),
      alternatives: section("Possible alternatives", [
        "A different direct material in selected cases, an onlay or crown if more coverage is needed, or monitoring if a lesion is still incipient and risk can be lowered another way.",
      ]),
      faq: faqs([
        {
          question: "How is this different from a “tooth-colored filling”?",
          answer:
            "Composite is the usual material behind that name here. The tooth-colored fillings page describes the broader idea of bonded, tooth-matching repairs. This page focuses on composite specifically.",
        },
        {
          question: "Can composite replace a whole cusp?",
          answer:
            "Sometimes a large composite is used; often a coverage restoration is more protective. The remaining tooth and the bite decide.",
        },
      ]),
      relatedTreatments: related([
        "tooth-colored-fillings",
        "onlays",
        "biomimetic-dentistry",
      ]),
    },
  }),
  treatment({
    slug: "porcelain-crowns",
    title: "Porcelain Crowns",
    categorySlug: "restorative",
    summary:
      "A full-coverage restoration that can protect a tooth after large repairs, fracture, or root canal treatment.",
    intro:
      "A porcelain crown covers the visible portion of a tooth to restore strength, shape, and a seal after significant damage or a large previous repair. It is considered when a filling would leave the tooth too weak. Crowns are planned after an exam and, when needed, after the tooth’s nerve and gums are understood.",
    metaDescription:
      "Porcelain crowns at West Caldwell Dental Arts can protect a tooth after large repairs, fracture, or root canal treatment when indicated.",
    ...published,
    sections: {
      overview: section("What a porcelain crown is", [
        "It is a custom cap that encircles the tooth above the gum, made to match shade and contour as closely as practical. Modern all-ceramic crowns are commonly used. The tooth underneath is prepared so the crown has room and a defined edge.",
      ]),
      whyRecommended: section("Why they may be recommended", [
        "After a large filling, a crack, a root canal, or a break that leaves little supporting enamel. The crown’s job is to hold the remaining tooth together and restore chewing contact.",
      ]),
      evaluation: section("What an evaluation considers", [
        "How much tooth is left above the gum, whether a buildup is needed, gum health, bite, and whether the tooth has enough bone support. If the margin would sit too deep, other steps may be discussed first.",
      ]),
      howItWorks: section("How treatment generally works", [
        "The tooth is prepared, a temporary crown is often placed, and records go to a laboratory or milling process. At delivery, fit, contacts, shade, and bite are checked before the crown is cemented or bonded.",
      ]),
      whatToExpect: section("What you may expect", [
        "Usually two visits, sometimes more if the laboratory needs an adjustment. The temporary can feel bulky or come off; if it does, call. After the final crown, the bite may need a small refinement once you chew normally.",
      ]),
      benefits: section("Intended goals", [
        "A protective covering that restores outline for cleaning and chewing. Appearance is planned with the neighboring teeth in mind.",
      ]),
      considerations: section("Limitations and considerations", [
        "A crown does not make a tooth indestructible. Decay can still start at the edge. Porcelain can chip. The nerve can still become inflamed later, especially if the tooth was already compromised. Preparing a tooth removes structure; that is why crowns are not used for small problems.",
      ]),
      recoveryAftercare: section("Comfort and recovery", [
        "Sensitivity after preparation is common. Avoid sticky foods on a temporary. After cementation, mild tenderness of the gum can occur. Persistent pain should be evaluated.",
      ]),
      maintenance: section("Maintenance", [
        "Clean under the contact points and along the crown edge. Night protection may help if you grind. The crown is examined at recall visits for chips, open margins, or gum change.",
      ]),
      alternatives: section("Possible alternatives", [
        "An onlay if enough tooth can be conserved, a filling if the damage is still small, or extraction if the tooth cannot be restored predictably.",
      ]),
      faq: faqs([
        {
          question: "Do all root canal teeth need crowns?",
          answer:
            "Back teeth that have had root canal treatment often benefit from coverage because they can be more brittle. Front teeth are decided case by case. The remaining structure is the guide.",
        },
        {
          question: "Will it look like my other teeth?",
          answer:
            "Shade and translucency are matched as closely as the material and neighboring teeth allow. A single crown next to unrestored teeth is more noticeable to match than a pair planned together.",
        },
      ]),
      relatedTreatments: related([
        "onlays",
        "root-canals",
        "porcelain-bridges",
        "porcelain-veneers",
      ]),
    },
  }),
  treatment({
    slug: "onlays",
    title: "Onlays",
    categorySlug: "restorative",
    summary:
      "A partial-coverage restoration that rebuilds a damaged chewing surface while conserving remaining tooth structure.",
    intro:
      "An onlay is a custom restoration that covers a damaged chewing surface and one or more cusps without always encircling the entire tooth the way a crown does. It may be considered when a filling would be too large and a full crown would remove more healthy structure than needed.",
    metaDescription:
      "Onlays at West Caldwell Dental Arts rebuild damaged chewing surfaces while conserving remaining tooth structure when that design is appropriate.",
    ...published,
    sections: {
      overview: section("What an onlay is", [
        "It is an indirect restoration—usually ceramic or a similar laboratory or milled material—bonded or cemented to a prepared tooth. It replaces missing cusps and the biting table while leaving uninvolved walls when they are strong.",
      ]),
      whyRecommended: section("Why they may be recommended", [
        "When decay or an old filling has weakened cusps, when a crack involves the chewing surface, or when a conservative coverage restoration fits a biomimetic or structure-preserving plan.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Remaining wall thickness, isolation for bonding, bite forces, and whether the margin can be placed on sound tooth. If too little enamel remains, a crown may be more predictable.",
      ]),
      howItWorks: section("How treatment generally works", [
        "The tooth is prepared, a temporary may be placed, and the onlay is fabricated. At seating, contacts and bite are verified, then the restoration is bonded according to the material’s protocol.",
      ]),
      whatToExpect: section("What you may expect", [
        "Two visits in many cases. Bonding visits can be longer than a simple filling because isolation and adhesive steps matter. Sensitivity can occur after bonding and often settles.",
      ]),
      benefits: section("Intended goals", [
        "Rebuilding the chewing surface while keeping more of your own tooth than a full crown would in selected cases.",
      ]),
      considerations: section("Limitations and considerations", [
        "Onlays require a precise fit and a bondable surface. They can still fracture under heavy grinding. Not every tooth that “could” have an onlay is a good candidate if isolation is poor or walls are cracked below the gum.",
      ]),
      recoveryAftercare: section("Comfort and recovery", [
        "Treat the temporary carefully if one is used. After bonding, avoid hard foods on that side until you are comfortable. Report a high bite.",
      ]),
      maintenance: section("Maintenance", [
        "The margins are watched at exams. Grinding protection may be discussed. Home care along the edges is the same discipline as for any restoration.",
      ]),
      alternatives: section("Possible alternatives", [
        "A large composite in some smaller situations, a full crown if more coverage is needed, or extraction if the tooth is not restorable.",
      ]),
      faq: faqs([
        {
          question: "Is an onlay better than a crown?",
          answer:
            "It is not universally better. It is more conservative when the remaining tooth can support that design. When it cannot, a crown may be the more protective choice.",
        },
        {
          question: "Is this the same as an inlay?",
          answer:
            "An inlay sits within the cusps. An onlay covers one or more cusps. The names describe how much of the chewing surface is replaced.",
        },
      ]),
      relatedTreatments: related([
        "inlays",
        "porcelain-crowns",
        "composite-fillings",
        "biomimetic-dentistry",
      ]),
    },
  }),
  treatment({
    slug: "porcelain-bridges",
    title: "Porcelain Bridges",
    categorySlug: "restorative",
    summary:
      "A fixed option for replacing one or more missing teeth by joining restorations to neighboring teeth.",
    intro:
      "A porcelain bridge replaces a missing tooth by joining a prosthetic tooth to restorations on the neighboring teeth. It does not come in and out. It is one of several replacement options and is chosen only after the supporting teeth and gums are evaluated.",
    metaDescription:
      "Porcelain bridges at West Caldwell Dental Arts can replace missing teeth by joining restorations to neighboring teeth after evaluation.",
    ...published,
    sections: {
      overview: section("What a porcelain bridge is", [
        "The missing space is filled by a pontic (the replacement tooth) connected to crowns or retainers on adjacent teeth. The whole piece is cemented as one unit. It relies on those supporting teeth being healthy enough to carry extra load.",
      ]),
      whyRecommended: section("Why they may be recommended", [
        "When a tooth is missing, the neighboring teeth already need crowns, and an implant is not preferred or not a candidate. It can restore chewing and appearance without surgery in selected cases.",
      ]),
      evaluation: section("What an evaluation considers", [
        "The strength and nerve status of the abutment teeth, gum and bone support, how the bite hits the pontic, and whether the span is too long. Images help judge bone and root length.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Abutment teeth are prepared, records are taken, a temporary bridge may be worn, and the laboratory fabricates the porcelain bridge. Fit, shade, and bite are verified before cementation. Hygiene under the pontic is demonstrated.",
      ]),
      whatToExpect: section("What you may expect", [
        "Multiple visits. Learning to clean under the replacement tooth is part of success. The bite may feel different until you adapt.",
      ]),
      benefits: section("Intended goals", [
        "A fixed replacement that does not need to be removed daily, with a porcelain surface planned to blend with neighboring teeth.",
      ]),
      considerations: section("Limitations and considerations", [
        "Supporting teeth are prepared even if they were previously intact—that is a real cost. Decay or gum disease on an abutment can compromise the whole bridge. Implants avoid preparing neighbors but require surgery and adequate bone. Bridges do not last indefinitely.",
      ]),
      recoveryAftercare: section("Comfort and recovery", [
        "Tenderness after preparation is common. A temporary that loosens should be recemented. After delivery, gums around new margins can be tender while they adapt.",
      ]),
      maintenance: section("Maintenance", [
        "Floss threaders, special floss, or other aids are used under the pontic. Regular exams watch the abutments. A night guard may be discussed if you grind.",
      ]),
      alternatives: section("Possible alternatives", [
        "An implant-supported crown, a removable partial denture, or leaving the space if chewing and appearance are acceptable and the bite is stable. Each has different tradeoffs.",
      ]),
      faq: faqs([
        {
          question: "How do I clean under a bridge?",
          answer:
            "You cannot floss straight through as you would between two natural teeth. We show you how to pass cleaner under the replacement tooth. That step is not optional if you want the abutments to stay healthy.",
        },
        {
          question: "Is a bridge better than an implant?",
          answer:
            "Neither is automatically better. Implants spare neighboring teeth. Bridges avoid surgery and can be practical when neighbors already need crowns. The exam and your preferences both matter.",
        },
      ]),
      relatedTreatments: related(["implants", "dentures", "porcelain-crowns"]),
    },
  }),
  treatment({
    slug: "dentures",
    title: "Full or Partial Dentures",
    categorySlug: "restorative",
    summary:
      "Removable replacements for several or all missing teeth, designed after an exam and impressions.",
    intro:
      "Dentures are removable replacements for several or all missing teeth. A partial denture uses remaining teeth for support. A complete denture rests on the gums when no teeth remain in that arch. Fit, speech, and chewing take an adjustment period. They are designed after an exam, impressions or scans, and a discussion of what dentures can and cannot do.",
    metaDescription:
      "Full or partial dentures at West Caldwell Dental Arts are removable replacements designed after an exam and records of your mouth.",
    ...published,
    sections: {
      overview: section("What dentures are", [
        "They are prosthetic teeth set in a base that sits on the gums and, for partials, often clasps or other connectors on remaining teeth. They are taken out for cleaning. They are not glued in like a bridge or implant crown.",
      ]),
      whyRecommended: section("Why they may be recommended", [
        "When several teeth are missing and a fixed option is not appropriate, not desired, or not possible with the remaining bone and teeth. They can restore appearance and a degree of chewing.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Remaining teeth, ridge shape, saliva, jaw joint comfort, and whether implants might later support a denture. Medical history, including dry mouth, affects comfort.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Records of the jaws and bite are made. Try-in visits check tooth position and appearance before the denture is finished. After delivery, adjustments are expected as sore spots appear.",
      ]),
      whatToExpect: section("What you may expect", [
        "An adaptation period for speech and chewing. Sore spots are common at first and are treated with adjustments, not by enduring them. Adhesive is sometimes used; it is not a substitute for a poor fit.",
      ]),
      benefits: section("Intended goals", [
        "Replacement of missing teeth with a device you can remove to clean, at a complexity that matches the remaining mouth.",
      ]),
      considerations: section("Limitations and considerations", [
        "Dentures do not chew as efficiently as natural teeth or many implant restorations. The bone under a complete denture can change over years, so relines may be needed. Partials can stress clasped teeth if hygiene is poor.",
      ]),
      recoveryAftercare: section("Comfort and aftercare", [
        "Follow wear instructions, especially if an immediate denture was placed after extractions. Rinse as directed. Return promptly for sore-spot adjustments.",
      ]),
      maintenance: section("Maintenance", [
        "Clean the denture daily as instructed, clean remaining teeth and gums, and leave the denture out for part of the day if that is part of your plan. Night storage is usually in water or a recommended solution, not wrapped dry on a counter.",
      ]),
      alternatives: section("Possible alternatives", [
        "Implant-supported dentures, bridges, or keeping a shortened dental arch if function is acceptable. Those options depend on bone, health, and remaining teeth.",
      ]),
      faq: faqs([
        {
          question: "Will I be able to eat normally?",
          answer:
            "Many people eat a wide diet after they adapt, often starting with softer foods. Dentures are not the same as natural teeth. We discuss realistic chewing expectations before you commit.",
        },
        {
          question: "How often do dentures need to be replaced?",
          answer:
            "Wear, staining, and changes in the gums all play a role. Some people need relines or a new denture after several years; others go longer. Exams still matter even when you have no natural teeth in an arch.",
        },
      ]),
      relatedTreatments: related([
        "implants",
        "porcelain-bridges",
        "tooth-extractions",
        "implant-supported-dentures",
      ]),
    },
  }),
  treatment({
    slug: "inlays",
    title: "Inlays",
    categorySlug: "restorative",
    summary:
      "A custom restoration that fits within the cusps of a tooth to replace a larger filling when extra strength or a precise fit is useful.",
    intro:
      "An inlay is a laboratory or milled restoration that sits inside the cusps of a tooth. It may be considered when a direct filling would be large but the cusps themselves are still strong. This record is a complete draft for owner review and is not listed publicly until confirmed.",
    metaDescription:
      "Inlays are recorded as a draft treatment at West Caldwell Dental Arts pending owner confirmation before any public listing.",
    ...draft,
    sections: {
      overview: section("What an inlay is", [
        "It replaces the inner chewing surface without covering the cusps. Materials are typically ceramic or similar. It is fabricated outside the mouth and then bonded or cemented.",
      ]),
      whyRecommended: section("Why it may be recommended", [
        "When contacts and anatomy are easier to restore indirectly, or when a large composite is less predictable.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Cusp strength, isolation, and whether an onlay or crown would protect the tooth better.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Preparation, records, fabrication, and adhesive seating in a second visit in most cases.",
      ]),
      whatToExpect: section("What you may expect", [
        "Two visits and a temporary in many cases. Bonding visits require staying open and dry.",
      ]),
      benefits: section("Intended goals", [
        "A precise inner restoration with contours that can be easier to clean than some large fillings.",
      ]),
      considerations: section("Limitations and considerations", [
        "If cusps later crack, the inlay may need to be replaced with an onlay or crown. Cost and visits are higher than a simple filling.",
      ]),
      alternatives: section("Possible alternatives", [
        "Composite filling, onlay, or crown depending on remaining tooth.",
      ]),
      faq: faqs([
        {
          question: "Is an inlay always more conservative than a crown?",
          answer:
            "It conserves cusps when those cusps are healthy. If they are not, covering them is often the more conservative long-term choice.",
        },
      ]),
      relatedTreatments: related(["onlays", "composite-fillings", "porcelain-crowns"]),
    },
  }),
] as const;
