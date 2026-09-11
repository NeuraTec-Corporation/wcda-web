import {
  faqs,
  published,
  related,
  section,
  treatment,
} from "@/data/treatments/helpers";

export const minimallyInvasiveBiologicalTreatments = [
  treatment({
    slug: "biomimetic-dentistry",
    title: "Biomimetic Dentistry",
    categorySlug: "minimally-invasive-biological",
    summary:
      "Treatment planning focused on conserving healthy tooth structure and restoring teeth in ways that closely reproduce their natural form and function.",
    intro:
      "Biomimetic dentistry is an approach to repairing teeth that emphasizes keeping as much healthy structure as possible and restoring what is missing so the tooth can flex and seal more like a natural tooth. It is a planning philosophy, not a single product. Whether a filling, onlay, or other restoration is used still depends on the damage present and on an examination.",
    metaDescription:
      "Biomimetic dentistry at West Caldwell Dental Arts focuses on conserving healthy tooth structure and restoring teeth to function after evaluation.",
    ...published,
    sections: {
      overview: section("What biomimetic dentistry means here", [
        "The word describes imitating biology: enamel and dentin have different roles, and a repair that ignores that can leak or crack. Practically, it means careful isolation, adhesive technique, and choosing a restoration that covers only what is weakened rather than reducing a tooth for a crown when a more conservative design can work. It does not mean that every tooth can avoid a crown.",
      ]),
      whyRecommended: section("Why this approach may be recommended", [
        "When a tooth still has strong walls, when a large old filling is being replaced, or when a patient wants to understand how much of their own tooth can be kept. It may also be discussed when cracks are present but the tooth is still restorable.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Remaining wall thickness, crack lines, decay depth, ability to keep the field dry, bite forces, and the condition of the pulp. Images and magnification, when used, help see what the eye might miss. If the tooth is too broken, a coverage restoration or extraction may still be the honest recommendation.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Decay and failing material are removed with attention to keeping sound tooth. Adhesive steps are completed under isolation. The restoration—direct composite or an indirect onlay in many cases—is placed to restore contacts and the chewing surface. Immediate dentin sealing and layered bonding are examples of techniques that may be used when they fit the case; they are not a script for every visit.",
      ]),
      whatToExpect: section("What you may expect", [
        "Visits that can be longer than a simple filling because isolation and layering take time. Sensitivity after bonding can occur. The tooth should feel like it meets the bite evenly. Follow-up checks confirm the seal and the way you chew.",
      ]),
      benefits: section("Intended goals", [
        "A restoration that conserves tooth, reduces unnecessary reduction, and aims for a durable seal. The goal is a tooth you can keep maintaining, not a promise that it will never need more care.",
      ]),
      considerations: section("Limitations and considerations", [
        "Adhesive dentistry fails when the field is wet or the remaining tooth is too weak. Heavy grinding can still break conservative restorations. Biomimetic language is not a substitute for treating gum disease or an infected nerve. It is not “natural” in the sense of using no materials; it is about how materials are used.",
      ]),
      recoveryAftercare: section("Comfort and recovery", [
        "Avoid heavy chewing on a newly bonded tooth until numbness fades and any bite adjustment is complete. Report a high spot or increasing pain.",
      ]),
      maintenance: section("Maintenance", [
        "Margins are still vulnerable to new decay. Daily cleaning and recall exams remain essential. A night appliance may be discussed if force is high.",
      ]),
      alternatives: section("Possible alternatives", [
        "A conventional crown when coverage is needed, a simple filling when the defect is small, or extraction if the tooth cannot be restored. Digital detection and air abrasion, when used, may support conservative preparation but do not define the whole approach.",
      ]),
      faq: faqs([
        {
          question: "Is biomimetic dentistry a specific brand of filling?",
          answer:
            "No. It is a way of deciding how much tooth to keep and how to bond a restoration. The material still depends on the case.",
        },
        {
          question: "Will this avoid a crown forever?",
          answer:
            "Not necessarily. If a tooth later cracks or a restoration fails, a crown may still be appropriate. The aim is not to delay a needed crown; it is to avoid an unnecessary one.",
        },
        {
          question: "Is this the same as holistic dentistry?",
          answer:
            "They are not the same idea. Biomimetic care is about tooth structure and adhesive restoration. Material preferences and other biological topics are discussed separately when they are relevant.",
        },
      ]),
      relatedTreatments: related([
        "onlays",
        "composite-fillings",
        "air-abrasion",
        "digital-cavity-detection",
      ]),
    },
  }),
  treatment({
    slug: "dental-ozone",
    title: "Dental Ozone",
    categorySlug: "minimally-invasive-biological",
    summary:
      "Ozone may be used as an adjunct in selected dental procedures to support microbial control and conservative treatment strategies.",
    intro:
      "Dental ozone refers to the use of ozone gas or ozonated fluids as an adjunct during selected procedures. It may be discussed as one way to support disinfection in a conservative visit. It is not a standalone cure for cavities or gum disease. Whether it is used depends on the diagnosis, the site, and whether it adds something useful to standard care.",
    metaDescription:
      "Dental ozone at West Caldwell Dental Arts may be used as an adjunct in selected procedures after examination, not as a standalone treatment.",
    ...published,
    sections: {
      overview: section("What dental ozone is", [
        "Ozone is a form of oxygen used in dentistry in carefully controlled ways, typically as a gas in a tooth preparation or as a rinse. It is intended to reduce microbes in the immediate area being treated. It is an adjunct, meaning it is used alongside examination, removal of decay when needed, and restorations or periodontal therapy as indicated.",
      ]),
      whyRecommended: section("Why it may be recommended", [
        "In selected cases, to support a conservative approach to early lesions, to rinse a preparation, or as part of a broader minimally invasive plan. It is not recommended as a replacement for removing infected tooth structure that needs to come out, or as a substitute for cleaning periodontal deposits.",
      ]),
      evaluation: section("What an evaluation considers", [
        "The size and activity of a lesion, whether the tooth can be isolated, gum health, and whether standard treatment alone is sufficient. Medical questions related to breathing ozone are taken seriously; application is localized, not a room full of gas.",
      ]),
      howItWorks: section("How it is generally used", [
        "After the area is prepared or isolated, ozone may be applied for a short, controlled period, then the planned restoration or other treatment continues. You should hear why it is being used in your visit, not only that a technology is available.",
      ]),
      whatToExpect: section("What you may expect", [
        "A brief additional step. Taste or smell can be noticeable and fades. It does not usually replace anesthetic when a deeper restoration is needed. You should not expect a cavity to “disappear” without a plan for the remaining tooth.",
      ]),
      benefits: section("Intended goals", [
        "Support microbial control in a defined site and help some conservative treatments have a cleaner field. Goals are modest and case-specific.",
      ]),
      considerations: section("Limitations and considerations", [
        "Evidence and protocols vary by use. Ozone does not remineralize a hole that already needs a filling. It does not treat an abscess the way root canal treatment or extraction does. It is not marketed here as a detox or as a systemic therapy.",
      ]),
      alternatives: section("Possible alternatives", [
        "Standard restorative or periodontal treatment without ozone, fluoride for incipient lesions, or more definitive care when the diagnosis requires it.",
      ]),
      faq: faqs([
        {
          question: "Can ozone heal a cavity so I do not need a filling?",
          answer:
            "Some very early changes are managed with monitoring and prevention. Once a cavitated lesion needs restoration, ozone is not a substitute for repairing the tooth. We will say which situation you are in.",
        },
        {
          question: "Is ozone safe?",
          answer:
            "When it is applied with dental equipment designed for that purpose, exposure is intended to be localized. We do not use it as a general air treatment. If you have respiratory concerns, mention them before any adjunct is used.",
        },
      ]),
      relatedTreatments: related([
        "air-abrasion",
        "biomimetic-dentistry",
        "digital-cavity-detection",
        "tooth-colored-fillings",
      ]),
    },
  }),
  treatment({
    slug: "air-abrasion",
    title: "Air Abrasion / No-Drill Cavity Repair",
    categorySlug: "minimally-invasive-biological",
    summary:
      "Air abrasion can remove small areas of decay using a controlled stream of fine particles, helping preserve more healthy tooth structure in appropriate cases.",
    intro:
      "Air abrasion uses a precise stream of fine particles to remove small areas of stained or decayed tooth structure. It can allow a conservative repair in selected cases without a traditional rotary drill. It is not suitable for every cavity. Depth, location, and whether the tooth can be isolated still decide whether this method is appropriate.",
    metaDescription:
      "Air abrasion at West Caldwell Dental Arts may remove small areas of decay conservatively when an exam shows the method is appropriate.",
    ...published,
    sections: {
      overview: section("What air abrasion is", [
        "A handpiece delivers particles that wear away softened or stained tooth in a controlled way. The area is then restored, often with bonded composite. The phrase “no-drill” describes the cutting method, not a promise that every cavity visit will feel the same or that anesthetic is never used.",
      ]),
      whyRecommended: section("Why it may be recommended", [
        "For small pits, early lesions, or stain in grooves where preserving enamel walls matters. It may also be used to prepare a surface for bonding. Large, deep, or interproximal decay often still needs conventional preparation.",
      ]),
      evaluation: section("What an evaluation considers", [
        "How deep the lesion is, whether it is between teeth, patient comfort with powder and suction, and whether a sealant or fluoride would be enough instead of a restoration.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Isolation and high-volume suction protect the airway and keep the field usable. The lesion is cleaned with the particle stream, rinsed, and restored. Magnification or detection tools may guide how much is removed.",
      ]),
      whatToExpect: section("What you may expect", [
        "A dusty or sandy sensation and a loud suction sound. Many small lesions are comfortable without anesthetic; if you feel pain, we stop and adjust. Powder on the lips or tongue is wiped away. You may still need a conventional drill if the decay is deeper than it looked.",
      ]),
      benefits: section("Intended goals", [
        "Remove diseased or stained structure while keeping more healthy tooth than a larger bur preparation might, in cases that fit the method.",
      ]),
      considerations: section("Limitations and considerations", [
        "Air abrasion does not replace crowns, root canals, or treatment of large decay. Particles must be evacuated. It is less useful when decay wraps around a contact or under an old restoration. “No-drill” is not a guarantee for every visit.",
      ]),
      recoveryAftercare: section("Comfort and recovery", [
        "Similar to a small filling. Sensitivity can occur. Rinse as you like once the restoration is finished.",
      ]),
      alternatives: section("Possible alternatives", [
        "Watching an incipient lesion, a conventional filling, or a sealant if the groove is not yet cavitated.",
      ]),
      faq: faqs([
        {
          question: "Will I never need a drill again?",
          answer:
            "No. Air abrasion is for selected small lesions. Other problems still need burs, crowns, or surgical care.",
        },
        {
          question: "Is this the same as laser cavity removal?",
          answer:
            "No. Lasers and air abrasion are different tools. Either may be conservative in the right case. The tooth decides, not the device.",
        },
      ]),
      relatedTreatments: related([
        "digital-cavity-detection",
        "composite-fillings",
        "sealants",
        "biomimetic-dentistry",
      ]),
    },
  }),
  treatment({
    slug: "fotona-laser-dentistry",
    title: "Fotona Laser Dentistry",
    categorySlug: "minimally-invasive-biological",
    summary:
      "Laser technology may be used for selected soft-tissue and hard-tissue dental procedures with a minimally invasive approach.",
    intro:
      "Fotona laser dentistry refers to the use of a specific dual-wavelength laser platform for selected hard-tissue and soft-tissue procedures. It may allow precise treatment with less conventional instrumentation in appropriate cases. It is not used for every visit, and it is not a different kind of dentistry so much as a different set of tools. NightLase and other named protocols, when discussed, have their own pages and criteria.",
    metaDescription:
      "Fotona laser dentistry at West Caldwell Dental Arts may support selected hard- and soft-tissue procedures after examination.",
    ...published,
    sections: {
      overview: section("What this laser platform is used for", [
        "Different wavelengths interact with water in tooth structure or with soft tissue. That can mean conservative cavity preparation in some cases, or soft-tissue contouring and other indicated procedures. The device does not diagnose. The dentist still examines, isolates, and restores as needed.",
      ]),
      whyRecommended: section("Why it may be recommended", [
        "When a laser can treat a defined target with less collateral contact than a scalpel or bur, or when a patient may benefit from a particular protocol that this platform supports. Recommendation follows a diagnosis, not a preference for technology.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Tissue type, filling materials nearby, whether a tooth is already crowned, medical history, and whether conventional treatment would be more predictable. Eye protection is part of every laser visit.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Settings are chosen for the tissue. You wear protective eyewear. Water spray and suction are often used. The planned filling, periodontal step, or other treatment then continues. Some procedures remain two-visit or still need anesthetic.",
      ]),
      whatToExpect: section("What you may expect", [
        "Sounds and water that differ from a drill. Sensation varies by tissue and settings. You should be able to pause. Soft-tissue sites may need simple after-care similar to a small surgical visit.",
      ]),
      benefits: section("Intended goals", [
        "Precise energy delivery for selected procedures, with an emphasis on treating only the intended tissue when that is achievable.",
      ]),
      considerations: section("Limitations and considerations", [
        "Lasers cannot do every preparation. Metal and some ceramics behave differently. Cost and time are not reasons to use a laser if a simpler method is better. Marketing claims about “no pain” are not how this office describes care; comfort is managed case by case.",
      ]),
      recoveryAftercare: section("Comfort and recovery", [
        "Depends on whether hard tissue, soft tissue, or a named protocol was used. You will receive instructions for that visit. Report unexpected swelling or pain.",
      ]),
      alternatives: section("Possible alternatives", [
        "Conventional rotary preparation, scalpel surgery, air abrasion, or no laser adjunct. Laser dentistry as a general topic is related but not identical to this platform-specific page.",
      ]),
      faq: faqs([
        {
          question: "Is Fotona the only laser you use?",
          answer:
            "This page describes this platform. Other laser uses in the office, if any, are discussed under laser dentistry or the specific procedure. Names of devices matter less than whether the tool fits the diagnosis.",
        },
        {
          question: "Can the laser do a root canal or a crown?",
          answer:
            "A laser may be an adjunct in some steps of care. It does not replace the full sequence of root canal treatment or laboratory crowns when those are needed.",
        },
      ]),
      relatedTreatments: related([
        "laser-dentistry",
        "nightlase",
        "air-abrasion",
        "periodontal-therapy",
      ]),
    },
  }),
  treatment({
    slug: "nightlase",
    title: "NightLase",
    categorySlug: "minimally-invasive-biological",
    summary:
      "A laser-based treatment option that may be considered for selected patients with snoring or sleep-related breathing concerns after appropriate evaluation.",
    intro:
      "NightLase is a laser protocol aimed at selected patients who snore or have related sleep-breathing concerns. It is not a diagnosis of sleep apnea and it is not a substitute for a medical sleep study when one is indicated. Whether it is appropriate depends on an examination of the airway-related tissues and on understanding what the treatment can and cannot change.",
    metaDescription:
      "NightLase at West Caldwell Dental Arts may be considered for selected snoring or sleep-related concerns after appropriate evaluation.",
    ...published,
    sections: {
      overview: section("What NightLase is", [
        "It is a series of laser visits directed at oral and throat tissues involved in snoring for some people. The intent is to change tissue tightness in a way that may reduce snoring. It is a dental-office protocol, not a CPAP machine and not a surgical airway reconstruction.",
      ]),
      whyRecommended: section("Why it may be discussed", [
        "When snoring is a concern, the mouth and throat are accessible to this type of energy, and medical red flags for untreated sleep apnea have been considered. It is not a first step when someone needs urgent medical sleep care.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Snoring history, witnessed pauses in breathing, daytime sleepiness, body habitus, nasal obstruction, tonsil and palate anatomy, and whether a physician-directed sleep study is needed first. Dental findings such as grinding may be related but are not the same problem.",
      ]),
      howItWorks: section("How treatment generally works", [
        "If it proceeds, a series of appointments applies laser energy to mapped tissues according to the protocol. You wear eye protection. Visits are spaced. Results, if they occur, are judged over the series—not after a single session.",
      ]),
      whatToExpect: section("What you may expect", [
        "A warming or tightening sensation. A sore throat for a short period can occur. Speech and swallowing are typically possible the same day, but comfort varies. A partner’s report of snoring may change, stay the same, or need more time to judge.",
      ]),
      benefits: section("Intended goals", [
        "A possible reduction in snoring for selected patients. Goals are discussed as possibilities, not as a guaranteed quiet night.",
      ]),
      considerations: section("Limitations and considerations", [
        "NightLase does not treat all causes of snoring. It is not equivalent to CPAP for obstructive sleep apnea. Weight, alcohol, and nasal blockage still matter. Some people are not candidates because of anatomy or medical risk. This office will not present it as a cure for apnea.",
      ]),
      recoveryAftercare: section("Comfort and aftercare", [
        "Cool fluids, avoiding very hot or abrasive foods if the throat is sore, and completing the planned series if you and the dentist continue. Report significant pain, bleeding, or breathing trouble.",
      ]),
      alternatives: section("Possible alternatives", [
        "Medical sleep evaluation, CPAP or other physician-directed therapy, positional strategies, weight management as advised by a physician, or an oral appliance for sleep apnea only when a physician and dentist coordinate that care.",
      ]),
      faq: faqs([
        {
          question: "Is this a treatment for sleep apnea?",
          answer:
            "Sleep apnea is a medical diagnosis. NightLase may be discussed for snoring in selected cases. If apnea is suspected or confirmed, physician-directed care comes first. We will not use this protocol as a replacement for indicated medical treatment.",
        },
        {
          question: "How many visits are involved?",
          answer:
            "Protocols are typically a short series rather than a single visit. The exact number is explained if you are a candidate. Skipping sessions makes results harder to interpret.",
        },
      ]),
      relatedTreatments: related([
        "fotona-laser-dentistry",
        "oral-appliances",
        "teeth-grinding",
      ]),
    },
  }),
  treatment({
    slug: "safe-amalgam-removal",
    title: "Safe Amalgam Removal / IAOMT Protocol",
    categorySlug: "minimally-invasive-biological",
    summary:
      "Amalgam removal may be performed using enhanced isolation, evacuation, and exposure-control techniques consistent with established safety protocols.",
    intro:
      "When an amalgam (silver) filling needs to be replaced, removal can be done with extra attention to isolation, high-volume evacuation, and other steps intended to reduce exposure to particles and vapor for the patient and the team. This office describes that process in relation to recognized safety protocols, including approaches associated with IAOMT. Amalgam is not removed solely because it is metal. Replacement is planned when the filling is failing, decaying at the edge, or otherwise indicated—and after you understand what will replace it.",
    metaDescription:
      "Amalgam removal at West Caldwell Dental Arts may use enhanced isolation and evacuation when a silver filling needs replacement after exam.",
    ...published,
    sections: {
      overview: section("What this protocol is", [
        "It is a set of precautions used while drilling out amalgam: rubber dam isolation when possible, supplemental air and suction, sectioning the filling to reduce grinding, and protective coverings as appropriate. The filling is then replaced with another restorative material chosen for that tooth. The protocol is about how removal is done, not about a medical detox.",
      ]),
      whyRecommended: section("Why removal may be recommended", [
        "Broken amalgam, recurrent decay, a crack, or a plan to place a different restoration. Elective removal of sound amalgam is a separate, more cautious conversation because every removal still requires drilling on a tooth.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Whether the amalgam actually needs replacement, how much tooth remains, rubber-dam feasibility, pregnancy (elective care is often postponed), and what material will go back in. If a tooth needs a crown or the nerve is involved, that diagnosis leads.",
      ]),
      howItWorks: section("How treatment generally works", [
        "The tooth is isolated. Extra evacuation and, when used, an alternative air source are arranged. The amalgam is removed in chunks rather than pulverized when possible. The tooth is then restored with composite, an onlay, or another indicated option. IAOMT-style checklists, when followed, are operational steps—not a guarantee of a particular blood test result.",
      ]),
      whatToExpect: section("What you may expect", [
        "A visit that looks more covered and suction-intensive than a simple filling replacement. Anesthetic is typical. The new restoration may take longer than the removal. You should not expect to feel unwell from a properly isolated removal; if you have specific health concerns, raise them before the visit.",
      ]),
      benefits: section("Intended goals", [
        "Replace a failing amalgam while reducing unnecessary exposure during the drilling process, then restore the tooth so it can be maintained.",
      ]),
      considerations: section("Limitations and considerations", [
        "No protocol makes removal exposure-free. The tooth still undergoes preparation. Composite or ceramic replacements have their own limits. This is not a treatment for systemic disease. We do not use language such as “toxin-free” or “detox” as clinical claims.",
      ]),
      recoveryAftercare: section("Comfort and recovery", [
        "Same as after a filling or onlay: bite check, possible sensitivity, and care of the new restoration. Unusual symptoms should be reported, as with any dental visit.",
      ]),
      alternatives: section("Possible alternatives", [
        "Repair or polish of a sound amalgam, watching a stable filling, or a coverage restoration if the tooth is too broken for a direct replacement.",
      ]),
      faq: faqs([
        {
          question: "Do you remove amalgam because it is mercury?",
          answer:
            "We remove amalgam when the restoration or the tooth needs it, and we use careful isolation when we do. We do not recommend taking out sound fillings as a general health treatment. That distinction matters.",
        },
        {
          question: "What is IAOMT?",
          answer:
            "It is an organization that publishes a protocol for reducing exposure during amalgam removal. We may use steps consistent with that kind of protocol. It is a safety method, not a diagnosis of mercury illness.",
        },
        {
          question: "What replaces the silver filling?",
          answer:
            "Usually a tooth-colored bonded restoration or an indirect onlay or crown if more coverage is needed. The remaining tooth decides.",
        },
      ]),
      relatedTreatments: related([
        "metal-free-dentistry",
        "composite-fillings",
        "onlays",
        "biomimetic-dentistry",
      ]),
    },
  }),
  treatment({
    slug: "ceramic-implants",
    title: "Ceramic Implants",
    categorySlug: "minimally-invasive-biological",
    summary:
      "Metal-free ceramic implant options may be considered for appropriately selected patients seeking an alternative to conventional titanium implants.",
    intro:
      "Ceramic implants are tooth-root replacements made from zirconia rather than titanium. They may be considered when a metal-free implant is preferred and the site is a suitable candidate. They are not automatically better than titanium. Bone, bite, gum biotype, and the restoration that will sit on top all matter. Conventional implants remain an important comparison.",
    metaDescription:
      "Ceramic implants at West Caldwell Dental Arts may be considered as a metal-free implant option when the site and health history are appropriate.",
    ...published,
    sections: {
      overview: section("What ceramic implants are", [
        "They are zirconia fixtures placed in the jaw to support a crown or other restoration after healing. Designs may be one-piece or two-piece depending on the system. White color can be an advantage in thin gums. Handling and restoration protocols differ from many titanium systems.",
      ]),
      whyRecommended: section("Why they may be recommended", [
        "When a patient prefers to avoid metal in the implant itself, when gum display makes a white fixture appealing, and when anatomy and the chosen system match. Preference alone is not enough if the site is a poor candidate for any implant.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Bone volume, gum thickness, bite force, the need for grafting, and whether a one-piece ceramic implant’s angle can be restored cleanly. Medical history is reviewed as it would be for any implant. Imaging is typically part of planning.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Planning, surgical placement, a healing period, and then the ceramic or other restoration. Immediate temporaries are used only when the case allows. Laboratory communication is important because ceramic systems are less forgiving of casual technique than some familiar titanium workflows.",
      ]),
      whatToExpect: section("What you may expect", [
        "A surgical visit and months of healing in many cases. The restoration sequence may differ from a titanium implant you have read about. Maintenance around the gum is still required.",
      ]),
      benefits: section("Intended goals", [
        "A metal-free fixture that can support a replacement tooth in selected sites, with an appearance that some patients prefer at the gumline.",
      ]),
      considerations: section("Limitations and considerations", [
        "Ceramic is strong but can fracture if overloaded or if the design is wrong. Two-piece ceramic systems have their own mechanical limits. Long-term data sets differ from titanium. Not every laboratory is equally experienced. If ceramic is not a fit, titanium or a non-implant replacement may be more predictable.",
      ]),
      recoveryAftercare: section("Comfort and recovery", [
        "Similar to other implant placement: swelling control, diet, and hygiene around the site without disturbing healing. Report mobility of a fixture or increasing pain.",
      ]),
      maintenance: section("Maintenance", [
        "Professional exams, careful home care, and protection from grinding. Ceramic implants can still develop inflammation if plaque control is poor.",
      ]),
      alternatives: section("Possible alternatives", [
        "Titanium implants, a bridge, a partial denture, or no replacement. Metal-free dentistry as a broader material conversation is related but not the same as placing a ceramic implant.",
      ]),
      faq: faqs([
        {
          question: "Are ceramic implants safer than titanium?",
          answer:
            "They are a different material with different handling. “Safer” is not a word we use as a blanket claim. Suitability is individual. Allergies to titanium are uncommon; if that is a concern, it can be discussed with appropriate medical context.",
        },
        {
          question: "Do they look more natural?",
          answer:
            "A white fixture can help when gums are thin. The crown, gum health, and tooth position still determine how natural the result looks.",
        },
      ]),
      relatedTreatments: related([
        "implants",
        "metal-free-dentistry",
        "porcelain-bridges",
      ]),
    },
  }),
  treatment({
    slug: "metal-free-dentistry",
    title: "Metal-Free Dentistry",
    categorySlug: "minimally-invasive-biological",
    summary:
      "Selected restorations and materials may be planned using metal-free options when clinically appropriate.",
    intro:
      "Metal-free dentistry means planning fillings, crowns, and other restorations with ceramic or resin materials when those materials can meet the mechanical and biologic needs of the tooth. It is a material preference applied case by case. It does not mean that every metal restoration in the mouth must be replaced, or that metal is never used when it is the more predictable choice.",
    metaDescription:
      "Metal-free dentistry at West Caldwell Dental Arts may use ceramic or resin restorations when those materials are appropriate after examination.",
    ...published,
    sections: {
      overview: section("What metal-free planning is", [
        "Composite, ceramic onlays, porcelain crowns, and ceramic implants are examples of options that contain no dental amalgam or cast metal. Some crowns still use a strong core; the visible layer may be ceramic. The point is to match material to the tooth, the bite, and your preferences after those preferences are informed by limits.",
      ]),
      whyRecommended: section("Why it may be discussed", [
        "Esthetics, a wish to avoid amalgam, or replacement of a failing metal restoration. It may also come up when a ceramic onlay can conserve tooth compared with a metal crown. It is not recommended as a systemic health intervention.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Bite force, remaining tooth, parafunction, how visible the tooth is, and whether a metal restoration is still functioning well. Removing sound metal work has a cost in tooth structure.",
      ]),
      howItWorks: section("How treatment generally works", [
        "The indicated restoration is planned in a metal-free material when that material can do the job. Adhesive protocols, laboratory choice, and occlusion are part of making ceramic or composite last. If a situation still calls for a metal component, that is explained rather than hidden.",
      ]),
      whatToExpect: section("What you may expect", [
        "Shade matching visits, possible two-visit laboratory work, and a conversation about grinding protection. Ceramic can look more like enamel than many metals; it can also chip if the bite is ignored.",
      ]),
      benefits: section("Intended goals", [
        "Restorations that meet appearance goals without metal when that is mechanically reasonable, and honest substitution when it is not.",
      ]),
      considerations: section("Limitations and considerations", [
        "Ceramic and composite have wear and fracture patterns of their own. Some partial denture frameworks still use metal because it is thin and strong. “Metal-free” is not a synonym for safer or more biocompatible in every scientific sense; it is a material category.",
      ]),
      alternatives: section("Possible alternatives", [
        "Keeping a sound metal restoration, using metal where strength in a thin section is needed, or a different prosthetic design.",
      ]),
      faq: faqs([
        {
          question: "Will you replace all my silver fillings?",
          answer:
            "Only if they need replacement for dental reasons, or if after a full discussion you still choose elective replacement knowing the tooth will be drilled. We do not treat metal-free preference as an emergency.",
        },
        {
          question: "Are white fillings metal-free?",
          answer:
            "Composite resins are not amalgam. They are a different chemistry. We can discuss composition at a visit if that is important to you.",
        },
      ]),
      relatedTreatments: related([
        "safe-amalgam-removal",
        "ceramic-implants",
        "porcelain-crowns",
        "composite-fillings",
      ]),
    },
  }),
  treatment({
    slug: "digital-cavity-detection",
    title: "Digital Cavity Detection",
    categorySlug: "minimally-invasive-biological",
    summary:
      "Digital diagnostic tools may help identify early changes in tooth structure and support conservative treatment planning.",
    intro:
      "Digital cavity detection uses devices that supplement the eyes, explorer, and radiographs. Fluorescence or transillumination, depending on the tool, may show early changes in enamel or dentin. These tools do not replace clinical judgment. They help decide whether to watch, remineralize, or restore—and how small a repair can be.",
    metaDescription:
      "Digital cavity detection at West Caldwell Dental Arts may help find early tooth changes and support conservative planning after an exam.",
    ...published,
    sections: {
      overview: section("What digital detection is", [
        "A sensor or camera looks at how a tooth responds to light. Readings or images are compared with what we see and with X-rays when those are indicated. The output is a finding to interpret, not an automatic filling.",
      ]),
      whyRecommended: section("Why it may be used", [
        "To inspect grooves that are stained but may not be cavitated, to monitor a spot over time, or to be more precise about where a small preparation should start. It is especially useful when the goal is to avoid treating a tooth that is only stained.",
      ]),
      evaluation: section("What an evaluation considers", [
        "The tooth’s history, hygiene, diet, radiographs, and whether the device can access the surface. Crowns, heavy stain, and some restorations can confuse readings. We say when a tool is less reliable.",
      ]),
      howItWorks: section("How it is generally used", [
        "The tooth is dried or cleaned as needed. The device is applied. Findings are explained in plain language: watch, prevent, or restore. If a repair is needed, air abrasion or a small composite may follow in the same or a later visit.",
      ]),
      whatToExpect: section("What you may expect", [
        "A brief, usually comfortable measurement. You may see a number or a picture. You should hear what it means for your tooth, including uncertainty.",
      ]),
      benefits: section("Intended goals", [
        "Earlier, more conservative decisions—and fewer fillings placed “just in case” in a stained groove.",
      ]),
      considerations: section("Limitations and considerations", [
        "False positives and false negatives exist. Devices do not see between teeth as well as bitewing radiographs in many cases. They do not diagnose infection at the root. They are an aid.",
      ]),
      alternatives: section("Possible alternatives", [
        "Visual exam and X-rays alone, watching a lesion, or treating based on a clear cavity that does not need extra devices.",
      ]),
      faq: faqs([
        {
          question: "Does a high reading mean I need a filling today?",
          answer:
            "Not always. Some readings support prevention and recall. Others support a small restoration. We combine the reading with what we see.",
        },
        {
          question: "Does this replace X-rays?",
          answer:
            "No. Different tools answer different questions. Images between teeth remain important when contacts are tight.",
        },
      ]),
      relatedTreatments: related([
        "air-abrasion",
        "sealants",
        "fluoride",
        "biomimetic-dentistry",
      ]),
    },
  }),
  treatment({
    slug: "laser-dentistry",
    title: "Laser Dentistry",
    categorySlug: "minimally-invasive-biological",
    summary:
      "Laser systems may be used in selected dental procedures to support precise, conservative treatment.",
    intro:
      "Laser dentistry is the use of dental lasers for selected procedures on gums, other soft tissue, or, with the right wavelength, tooth structure. It is a category of tools. Specific platforms such as Fotona and specific protocols such as NightLase are described on their own pages. This page explains the general idea: energy directed at a target with attention to neighboring tissue.",
    metaDescription:
      "Laser dentistry at West Caldwell Dental Arts may be used in selected procedures to support precise, conservative treatment after examination.",
    ...published,
    sections: {
      overview: section("What laser dentistry includes", [
        "Soft-tissue uses may include shaping gums in indicated cases or assisting periodontal visits. Hard-tissue uses, when the laser is designed for that, may include conservative preparation. Each use has settings, eye protection, and a diagnosis behind it.",
      ]),
      whyRecommended: section("Why a laser may be recommended", [
        "When the target tissue is a good match for the wavelength and when a laser offers a cleaner or more conservative path than the alternative. It is not recommended because it sounds advanced.",
      ]),
      evaluation: section("What an evaluation considers", [
        "The procedure actually needed, filling materials in the way, medical history, and whether a scalpel, bur, or air abrasion would be more straightforward.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Protective eyewear, isolation as needed, then energy applied to the planned site. Restorative or periodontal steps that complete the visit still follow standard principles.",
      ]),
      whatToExpect: section("What you may expect", [
        "Different sounds than a drill. Sensation that ranges from little to a need for anesthetic. Soft-tissue healing instructions if gums were treated.",
      ]),
      benefits: section("Intended goals", [
        "Treat a defined target with control, in cases where that control is an advantage.",
      ]),
      considerations: section("Limitations and considerations", [
        "Lasers are not silent, painless, or universal. They do not sterilize a mouth. They do not replace exams, fillings of large defects, or medical care. Comfort claims are individual.",
      ]),
      alternatives: section("Possible alternatives", [
        "Conventional instruments, air abrasion, or no adjunct. See Fotona laser dentistry when that platform is the one being used, and NightLase when snoring is the topic.",
      ]),
      faq: faqs([
        {
          question: "How is this different from Fotona laser dentistry?",
          answer:
            "This page is the general category. The Fotona page describes a specific platform used for selected hard- and soft-tissue work. If your visit uses that device, both pages may apply; the procedure still leads.",
        },
        {
          question: "Can a laser treat gum disease by itself?",
          answer:
            "Lasers may be an adjunct. Periodontal therapy still depends on removing deposits and on home care. A laser pass is not a complete treatment for periodontitis.",
        },
      ]),
      relatedTreatments: related([
        "fotona-laser-dentistry",
        "nightlase",
        "periodontal-therapy",
        "air-abrasion",
      ]),
    },
  }),
] as const;
