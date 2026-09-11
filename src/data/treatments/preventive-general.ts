import {
  draft,
  faqs,
  published,
  related,
  section,
  treatment,
} from "@/data/treatments/helpers";

export const preventiveGeneralTreatments = [
  treatment({
    slug: "home-care",
    title: "Home Care",
    categorySlug: "preventive-general",
    summary:
      "Guidance on brushing, flossing, and daily habits that support the work done during dental visits.",
    intro:
      "Daily home care is the part of oral health that happens between visits. Brushing, cleaning between teeth, and a few steady habits can support gum health and help reduce the chance of new decay. This page is a general overview. The most useful routine is the one that matches your mouth, your dexterity, and any findings from an exam.",
    metaDescription:
      "Learn how daily brushing, cleaning between teeth, and home-care habits support oral health at West Caldwell Dental Arts.",
    ...draft,
    sections: {
      overview: section("What home care is", [
        "Home care includes brushing, cleaning between teeth, and habits that affect the teeth and gums, such as snacking patterns and dry mouth. It is not a substitute for professional exams and cleanings. It is the daily work that helps professional care last longer.",
      ]),
      whyRecommended: section("Why it may be discussed", [
        "After an exam, home care is often reviewed because plaque that remains along the gumline or between teeth can contribute to inflammation and decay. Small changes in technique or products may be suggested when they appear likely to help.",
      ]),
      evaluation: section("What an evaluation considers", [
        "A dentist or hygienist may look at plaque distribution, gum response, crowding, restorations, and how comfortable you are with current tools. Medical history, including medications that reduce saliva, can also shape the conversation.",
      ]),
      howItWorks: section("How guidance is usually given", [
        "Recommendations, when made, are specific rather than generic. That may include brush type, how to clean between teeth, fluoride toothpaste, or a different sequence if an area is hard to reach. The goal is a routine you can keep, not an ideal that is difficult to follow.",
      ]),
      whatToExpect: section("What you may expect", [
        "A visit may include a brief demonstration, time for questions, and written or verbal reminders. Results are not immediate. Gum tissues and plaque patterns are typically reviewed at later visits.",
      ]),
      benefits: section("Intended goals", [
        "The usual aims are to support gum health, reduce plaque in areas that tend to collect it, and help you understand what your own mouth needs between appointments.",
      ]),
      considerations: section("Limitations and considerations", [
        "Home care cannot reverse every problem. Cavities, cracked teeth, and established periodontal disease still need professional evaluation. Aggressive brushing can wear enamel or irritate gums. Products should be chosen with your exam findings in mind.",
      ]),
      maintenance: section("Maintenance", [
        "Consistency matters more than occasional intensive effort. If your hands, braces, or restorations make cleaning difficult, say so. A different tool may be easier than trying harder with the same one.",
      ]),
      alternatives: section("Possible alternatives", [
        "When standard floss is difficult, other interdental cleaners may be discussed. Prescription-strength fluoride or more frequent professional cleanings may be considered when risk is higher.",
      ]),
      faq: faqs([
        {
          question: "Is an electric toothbrush required?",
          answer:
            "Not necessarily. Technique and completeness often matter more than brand. An electric brush can help some people. After an exam, we can discuss what fits your mouth and your preferences.",
        },
        {
          question: "How often should I clean between my teeth?",
          answer:
            "Most people benefit from cleaning between teeth once daily. The method depends on the spaces between your teeth and your comfort. We can review that during a visit.",
        },
      ]),
      relatedTreatments: related(["teeth-cleaning", "fluoride", "sealants"]),
    },
  }),
  treatment({
    slug: "teeth-cleaning",
    title: "Teeth Cleaning",
    categorySlug: "preventive-general",
    summary:
      "Professional cleaning to remove plaque and tartar and to support gum health.",
    intro:
      "A professional cleaning removes plaque and tartar that daily brushing does not always reach, especially along the gumline and between teeth. It is a routine part of preventive care for many patients. How often a cleaning is recommended depends on gum health, medical history, and what is found at the exam.",
    metaDescription:
      "Professional dental cleanings at West Caldwell Dental Arts remove plaque and tartar and support gum health after an exam.",
    ...published,
    sections: {
      overview: section("What a cleaning is", [
        "A dental cleaning, sometimes called prophylaxis, is a professional visit to remove bacterial deposits from the teeth. Soft plaque can often be brushed away. Hardened tartar generally needs instruments used in the office. The visit is usually paired with an exam so the mouth is evaluated, not only polished.",
      ]),
      whyRecommended: section("Why it may be recommended", [
        "Cleanings may be recommended to support gum health, reduce irritants along the gumline, and help you keep restorations and natural teeth easier to maintain. They may also be spaced more closely when gums bleed easily, when deposits return quickly, or when medical factors raise risk.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Before or during cleaning, the dentist or hygienist reviews gums, pocket depths when indicated, plaque pattern, restorations, and any areas that are tender. X-rays may be used when they add information that a visual exam cannot provide.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Deposits are removed with hand instruments, an ultrasonic scaler, or a combination. Teeth may then be polished. Fluoride may be discussed afterward when it is appropriate. The visit is paced to your comfort, and you can ask to pause at any time.",
      ]),
      whatToExpect: section("What you may expect", [
        "You may notice scraping sounds, water spray, and brief sensitivity, especially near the gums. Gums can feel slightly tender afterward if they were inflamed. The amount of time needed varies with how much deposit is present and whether a more involved cleaning is indicated.",
      ]),
      benefits: section("Intended goals", [
        "The usual goals are a cleaner tooth surface, calmer gum tissues over time, and a clearer picture of areas that need closer attention at home or at the next visit.",
      ]),
      considerations: section("Limitations and considerations", [
        "A standard cleaning is not the same as treatment for established periodontal disease. If deeper deposits or bone changes are found, a different type of cleaning or a specialist referral may be discussed. Cleanings do not repair cavities or cracked teeth.",
      ]),
      recoveryAftercare: section("Comfort and recovery", [
        "Most people return to normal eating the same day. If gums are tender, a softer diet for a short period and gentle brushing can help. Sensitivity usually settles. Contact the office if bleeding or discomfort persists beyond what was described at the visit.",
      ]),
      maintenance: section("Maintenance", [
        "Daily home care and the interval to the next cleaning are part of the plan. Some patients do well with twice-yearly visits. Others benefit from a shorter interval. That decision is based on findings, not a single calendar rule.",
      ]),
      alternatives: section("Possible alternatives", [
        "When gum disease is present, scaling and root planing or periodontal therapy may be more appropriate than a routine cleaning. That distinction is made after evaluation.",
      ]),
      faq: faqs([
        {
          question: "How often should I have my teeth cleaned?",
          answer:
            "Many healthy patients are seen twice a year. If your gums, medical history, or deposit pattern suggest a different interval, that will be explained. The schedule is individualized.",
        },
        {
          question: "Will a cleaning hurt?",
          answer:
            "Comfort varies. Inflamed gums can be more sensitive. We can pause, adjust technique, or discuss options to make the visit more comfortable. Tell us how you are feeling during the appointment.",
        },
        {
          question: "Is a cleaning the same as a periodontal cleaning?",
          answer:
            "No. A routine cleaning addresses deposits above and slightly below the gumline in a generally healthy mouth. Periodontal cleanings treat deeper deposits when gum disease is present. The exam determines which is appropriate.",
        },
      ]),
      relatedTreatments: related([
        "oral-cancer-screening",
        "fluoride",
        "periodontal-therapy",
        "dental-exams",
      ]),
    },
  }),
  treatment({
    slug: "oral-cancer-screening",
    title: "Oral Cancer Screening",
    categorySlug: "preventive-general",
    summary:
      "A visual and tactile check of the mouth, lips, and related tissues as part of a comprehensive exam.",
    intro:
      "An oral cancer screening is a careful look at the lips, tongue, floor of the mouth, cheeks, palate, and nearby tissues. It is typically part of a comprehensive exam rather than a separate visit. The purpose is to notice changes that may need follow-up, not to alarm or to diagnose from a glance.",
    metaDescription:
      "Oral cancer screening at West Caldwell Dental Arts is a visual and tactile check of the mouth during a comprehensive exam.",
    ...published,
    sections: {
      overview: section("What screening is", [
        "Screening means looking and, when appropriate, gently feeling tissues for color change, texture change, swelling, or sores that do not fit a simple irritation. Most findings are not cancer. The value of screening is noticing something early enough to observe, photograph, or refer.",
      ]),
      whyRecommended: section("Why it may be recommended", [
        "It is recommended as a regular part of adult dental exams. Tobacco use, heavy alcohol use, certain viral exposures, and age can raise concern, but screening is useful even when those factors are absent.",
      ]),
      evaluation: section("What an evaluation considers", [
        "The dentist reviews the extraoral and intraoral tissues, asks about symptoms such as a persistent sore or difficulty swallowing, and notes how long a change has been present. Additional tests are not automatic.",
      ]),
      howItWorks: section("How screening generally works", [
        "Lights, mirrors, and palpation are used. You may be asked to move your tongue. Adjunctive lights or dyes are used only when the dentist believes they add information. If a finding needs another look, a short observation period or a referral may be discussed.",
      ]),
      whatToExpect: section("What you may expect", [
        "The screening is usually brief and does not require anesthesia. You may be asked questions about habits and symptoms. If nothing concerning is found, that is documented and screening continues at future exams.",
      ]),
      benefits: section("Intended goals", [
        "The goal is awareness and timely follow-up. Screening cannot guarantee that every change will be found, and it cannot replace a biopsy when a tissue diagnosis is needed.",
      ]),
      considerations: section("Limitations and considerations", [
        "A normal screening does not mean risk is zero. Some lesions look similar whether they are harmless or not. Persistent sores, lumps, or unexplained numbness should be reported even between visits.",
      ]),
      alternatives: section("Possible next steps", [
        "Observation, photographs, medical referral, or biopsy may be discussed if a finding does not resolve. Those steps are chosen after clinical judgment, not as a routine package.",
      ]),
      faq: faqs([
        {
          question: "Does a screening diagnose cancer?",
          answer:
            "No. Screening looks for changes that may need more evaluation. Only a tissue sample can confirm certain diagnoses. Most screened patients do not need that step.",
        },
        {
          question: "How often is it done?",
          answer:
            "It is typically included with comprehensive exams. If you notice a sore that lasts more than two weeks, call the office rather than waiting for the next routine visit.",
        },
      ]),
      relatedTreatments: related(["teeth-cleaning", "adults-dentistry"]),
    },
  }),
  treatment({
    slug: "ortho-screenings",
    title: "Ortho Screenings",
    categorySlug: "preventive-general",
    summary:
      "A look at tooth alignment and bite to help determine whether orthodontic evaluation may be useful.",
    intro:
      "An ortho screening is a structured look at how teeth line up, how the bite meets, and whether crowding, spacing, or jaw relationships might benefit from further orthodontic thought. It is not the same as starting aligner or brace treatment. It is a conversation starter after an exam.",
    metaDescription:
      "Orthodontic screenings at West Caldwell Dental Arts review alignment and bite to discuss whether further evaluation may help.",
    ...published,
    sections: {
      overview: section("What an ortho screening is", [
        "The dentist observes crowding, spacing, overbite, underbite, crossbite, and tooth wear that may relate to how teeth meet. For children and teens, timing of tooth eruption also matters. The screening may conclude that no treatment is needed, that observation is enough, or that a more detailed orthodontic evaluation would be useful.",
      ]),
      whyRecommended: section("Why it may be recommended", [
        "It may be recommended when teeth appear crowded, when a bite looks uneven, when a child is losing teeth in an unusual pattern, or when an adult asks about alignment. It can also be part of checking whether clear aligners are even a reasonable topic.",
      ]),
      evaluation: section("What an evaluation considers", [
        "The exam looks at teeth, gums, jaw joints, and, when needed, images. Habits such as grinding or thumb habits in children may be noted. General health and oral hygiene affect whether orthodontic appliances would be wise later.",
      ]),
      howItWorks: section("How screening generally works", [
        "Findings are explained in plain language. If a specialist or aligner records would add value, that is discussed rather than assumed. No appliance is started from screening alone.",
      ]),
      whatToExpect: section("What you may expect", [
        "You should leave with a sense of whether alignment is only a cosmetic preference, a functional concern, or something to watch. Timing for children is often about waiting for more growth, not rushing.",
      ]),
      benefits: section("Intended goals", [
        "The goal is an honest map of options: observe, treat later, or evaluate more fully. It helps avoid starting movement of teeth when gums, decay, or bite issues should be addressed first.",
      ]),
      considerations: section("Limitations and considerations", [
        "Screening cannot predict every future change in a growing child. Adult treatment has limits based on bone, roots, and restorations. Not every bite that looks uneven needs treatment.",
      ]),
      alternatives: section("Possible alternatives", [
        "Observation, referral to an orthodontist, or discussion of clear aligners when appropriate may follow. Restorative or periodontal care may take priority first.",
      ]),
      faq: faqs([
        {
          question: "Does a screening mean I need braces?",
          answer:
            "No. Many screenings end with observation or no treatment. Braces or aligners are considered only when the bite, gums, and goals support that conversation.",
        },
        {
          question: "Can adults be screened?",
          answer:
            "Yes. Adult alignment and bite can be reviewed. Whether movement of teeth is appropriate depends on periodontal support and the rest of the exam.",
        },
      ]),
      relatedTreatments: related(["clear-aligner-treatment", "teens-dentistry"]),
    },
  }),
  treatment({
    slug: "sealants",
    title: "Sealants",
    categorySlug: "preventive-general",
    summary:
      "A protective coating placed on chewing surfaces of certain teeth to help reduce decay risk.",
    intro:
      "A sealant is a thin protective coating placed in the grooves of certain chewing teeth. Those grooves can trap plaque even when brushing is careful. Sealants are often discussed for children and teens, and sometimes for adults, when the tooth and the risk pattern make them a reasonable option.",
    metaDescription:
      "Dental sealants at West Caldwell Dental Arts can protect chewing grooves from decay when they are appropriate after an exam.",
    ...published,
    sections: {
      overview: section("What sealants are", [
        "Sealants flow into pits and fissures on the biting surface and then harden. They do not straighten teeth and they do not treat a cavity that already needs a filling. They are a preventive coating for selected surfaces.",
      ]),
      whyRecommended: section("Why they may be recommended", [
        "They may be recommended when deep grooves are hard to clean, when a tooth has recently erupted, or when a patient has had decay in similar teeth. They are not automatic for every molar.",
      ]),
      evaluation: section("What an evaluation considers", [
        "The dentist checks whether the groove is already decayed, whether the tooth is fully erupted enough to keep dry, and whether the patient can sit comfortably for the steps. Existing fillings on that surface usually mean a sealant is not the right choice.",
      ]),
      howItWorks: section("How treatment generally works", [
        "The tooth is cleaned, isolated, and prepared so the material can bond. The sealant is placed and hardened with a light. The bite is checked. The visit is usually short for each tooth.",
      ]),
      whatToExpect: section("What you may expect", [
        "You may taste the cleaning materials briefly. There is typically no drilling for a straightforward sealant. Afterward the tooth should feel smooth in the grooves. If a high spot is felt, it can be adjusted.",
      ]),
      benefits: section("Intended goals", [
        "The intended goal is to make a groove easier to keep clean and to help reduce the chance of decay on that surface. Success still depends on diet, hygiene, and regular exams.",
      ]),
      considerations: section("Limitations and considerations", [
        "Sealants can wear or chip. They do not protect the sides of teeth. If decay is already into the tooth, a restoration is more appropriate. They are not a substitute for fluoride or cleanings.",
      ]),
      maintenance: section("Maintenance", [
        "Sealants are checked at recall visits. If a portion is lost, replacement can be discussed. Continue brushing the chewing surfaces; the coating is an aid, not a shield that never needs care.",
      ]),
      alternatives: section("Possible alternatives", [
        "Watchful waiting, fluoride varnish, or a small filling if decay is already present may be more appropriate. The exam decides.",
      ]),
      faq: faqs([
        {
          question: "Are sealants only for children?",
          answer:
            "They are most often used on newly erupted permanent molars. Adults with deep, decay-free grooves may still be candidates after an exam.",
        },
        {
          question: "Do sealants contain fluoride?",
          answer:
            "Some materials do and some do not. If that matters to you, ask at the visit so the material can be explained before it is placed.",
        },
      ]),
      relatedTreatments: related(["fluoride", "childrens-cleanings-exams", "teeth-cleaning"]),
    },
  }),
  treatment({
    slug: "adults-dentistry",
    title: "Adult Dentistry",
    categorySlug: "preventive-general",
    summary:
      "Exam, cleaning, and restorative planning for adult patients, including time to discuss questions and goals.",
    intro:
      "Adult dentistry is comprehensive care for permanent teeth, gums, and bite in people whose oral needs may include restorations, wear, medical considerations, and longer-term planning. A typical relationship includes exams, cleanings, and enough time to discuss what you want from your teeth over the next years, not only the next week.",
    metaDescription:
      "Adult dentistry at West Caldwell Dental Arts includes exams, cleanings, and treatment planning discussed after evaluation.",
    ...published,
    sections: {
      overview: section("What adult dentistry includes", [
        "It includes prevention, diagnosis, and treatment of decay, gum disease, cracked teeth, missing teeth, and bite-related wear. It also includes listening to concerns about appearance, comfort, and time. Care is sequenced so urgent problems are addressed before elective ones when that is the safer order.",
      ]),
      whyRecommended: section("Why a comprehensive adult visit matters", [
        "Adults often have a mix of old restorations, medical conditions, and habits such as grinding. A visit that only polishes teeth can miss those connections. A full look helps decide what is needed now and what can be watched.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Health history, medications, gums, teeth, bite, existing restorations, and, when useful, radiographs are reviewed. Your goals and budget constraints, when you share them, help sequence recommendations honestly.",
      ]),
      howItWorks: section("How care is usually organized", [
        "A first comprehensive visit typically includes exam, cleaning as appropriate, and a discussion of findings. Treatment, if recommended, is explained before it begins. Follow-up intervals depend on risk, not a single rule for every adult.",
      ]),
      whatToExpect: section("What you may expect", [
        "You should expect plain-language explanations and a chance to ask questions. Not every finding requires immediate treatment. Some items are documented and rechecked.",
      ]),
      benefits: section("Intended goals", [
        "Comfort, function, and maintainable oral health over time. Cosmetic wishes are considered in the context of healthy teeth and gums.",
      ]),
      considerations: section("Limitations and considerations", [
        "Adult dentistry cannot reverse every past problem. Some teeth have a guarded outlook. Medical conditions can limit what is safe to do in one visit. Honesty about those limits is part of good care.",
      ]),
      alternatives: section("Possible paths", [
        "Depending on findings, care may stay preventive, move into restorative treatment, or include referral for specialty procedures. Those paths are discussed, not assumed.",
      ]),
      faq: faqs([
        {
          question: "How is an adult exam different from a child’s exam?",
          answer:
            "Adult exams often include more attention to restorations, wear, periodontal measurements, and medical interactions. The tone of the visit still aims to be clear and unhurried.",
        },
        {
          question: "Do I need X-rays at every visit?",
          answer:
            "No. Images are recommended when they are likely to change what we know or what we recommend. Frequency depends on your history and current findings.",
        },
      ]),
      relatedTreatments: related(["teeth-cleaning", "oral-cancer-screening", "tooth-colored-fillings"]),
    },
  }),
  treatment({
    slug: "fluoride",
    title: "Fluoride",
    categorySlug: "preventive-general",
    summary:
      "A topical fluoride application that can help strengthen enamel when it is appropriate for the patient.",
    intro:
      "Topical fluoride is a mineral treatment applied to teeth in the office to help strengthen enamel. It is discussed when decay risk, exposed root surfaces, or recent sensitivity make it a reasonable addition to brushing with fluoride toothpaste at home. It is not required for every patient at every visit.",
    metaDescription:
      "In-office fluoride at West Caldwell Dental Arts may be used to support enamel when it is appropriate after an exam.",
    ...published,
    sections: {
      overview: section("What topical fluoride is", [
        "Fluoride can be applied as a varnish, gel, or foam that stays in contact with enamel for a short time. It is different from community water fluoride and from toothpaste. The office application is a concentrated, brief treatment chosen for a specific reason.",
      ]),
      whyRecommended: section("Why it may be recommended", [
        "It may be recommended after decay, along dry mouth, for children with higher cavity risk, or for adults with exposed roots. It may also be used when enamel looks vulnerable but a filling is not yet indicated.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Cavity history, diet, saliva, orthodontic appliances, exposed roots, and current home products are considered. If you prefer to avoid fluoride, say so. Other preventive steps can still be discussed.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Teeth are dried as needed, the material is applied, and you receive simple instructions, such as waiting to eat or brush. The visit is short. Taste varies by product.",
      ]),
      whatToExpect: section("What you may expect", [
        "Varnish can feel slightly sticky until it wears off. Gel trays are brief. You should not expect a color change of the whole smile. The aim is enamel support, not whitening.",
      ]),
      benefits: section("Intended goals", [
        "Help remineralize vulnerable enamel and reduce the chance of new decay in people who are at elevated risk. Results depend on home care and diet as well.",
      ]),
      considerations: section("Limitations and considerations", [
        "Fluoride does not reverse a cavity that already needs a filling. Swallowing large amounts is not the intent of topical use; we use amounts and methods suited to the patient. It is not a substitute for cleaning or for repairing broken teeth.",
      ]),
      maintenance: section("Maintenance", [
        "Daily fluoride toothpaste is still the foundation for most patients. Office applications, when used, are scheduled based on risk rather than automatically at every cleaning.",
      ]),
      alternatives: section("Possible alternatives", [
        "Diet counseling, more frequent cleanings, sealants, or prescription toothpaste may be discussed instead of or in addition to in-office fluoride.",
      ]),
      faq: faqs([
        {
          question: "Is in-office fluoride the same as toothpaste?",
          answer:
            "No. Toothpaste is a daily low-dose exposure. An office application is a short, higher-concentration treatment used for a reason identified at the exam.",
        },
        {
          question: "Can I decline fluoride?",
          answer:
            "Yes. We can discuss other ways to support enamel. Your preference is part of the plan.",
        },
      ]),
      relatedTreatments: related(["sealants", "teeth-cleaning", "childrens-cleanings-exams"]),
    },
  }),
  treatment({
    slug: "dental-exams",
    title: "Dental Exams",
    categorySlug: "preventive-general",
    summary:
      "A structured evaluation of teeth, gums, and related tissues used to understand current oral health and plan next steps.",
    intro:
      "A dental exam is the visit in which teeth, gums, bite, and relevant tissues are evaluated in a systematic way. It is the basis for every later recommendation. This record exists so exam visits can have their own literature and, if confirmed as a standalone published page, their own URL.",
    metaDescription:
      "Dental exams at West Caldwell Dental Arts review teeth, gums, and related tissues before any treatment is recommended.",
    ...draft,
    sections: {
      overview: section("What an exam is", [
        "An exam looks at more than cavities. Gums, existing restorations, wear, oral tissues, and, when indicated, images are part of understanding the mouth as a whole. Findings are explained before treatment is planned.",
      ]),
      whyRecommended: section("Why exams are recommended", [
        "Problems are often easier to manage when they are noticed early. Exams also create a baseline so changes can be compared over time.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Health history, medications, symptoms, and your questions are part of the exam, not an afterthought.",
      ]),
      howItWorks: section("How an exam generally works", [
        "Looking, measuring when indicated, and reviewing images if they are needed. Time is reserved to discuss what was found.",
      ]),
      whatToExpect: section("What you may expect", [
        "A conversation about what looks stable, what should be watched, and what, if anything, should be treated. Not every finding requires a procedure.",
      ]),
      benefits: section("Intended goals", [
        "Clarity. You should understand the state of your mouth well enough to make informed choices.",
      ]),
      considerations: section("Limitations and considerations", [
        "An exam cannot see every future problem. Some issues start between visits. Call if something changes.",
      ]),
      faq: faqs([
        {
          question: "Is an exam the same as a cleaning?",
          answer:
            "No. A cleaning removes deposits. An exam diagnoses and plans. They are often scheduled together but they are different parts of the visit.",
        },
      ]),
      relatedTreatments: related(["teeth-cleaning", "oral-cancer-screening", "dental-x-rays"]),
    },
  }),
  treatment({
    slug: "dental-x-rays",
    title: "Dental X-Rays",
    categorySlug: "preventive-general",
    summary:
      "Imaging used when it helps evaluate teeth, bone, or restorations beyond what can be seen in the mouth.",
    intro:
      "Dental radiographs are images used when they are likely to add information that a visual exam cannot provide. They are not taken by habit at every visit. When they are recommended, the reason can be explained in plain language.",
    metaDescription:
      "Dental X-rays at West Caldwell Dental Arts are used when images are likely to help diagnosis after a clinical exam.",
    ...draft,
    sections: {
      overview: section("What dental X-rays are", [
        "They are images of teeth and supporting bone. Different views show different areas. They can help find decay between teeth, look at root tips, or check bone levels.",
      ]),
      whyRecommended: section("Why they may be recommended", [
        "When something cannot be seen directly, when symptoms suggest a deeper problem, or when a period of time has passed and a comparison would be useful.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Your history, last images, pregnancy status if relevant, and the clinical question we are trying to answer.",
      ]),
      howItWorks: section("How imaging generally works", [
        "A sensor or film is placed, you hold still, and the image is reviewed with you. Digital sensors are commonly used.",
      ]),
      whatToExpect: section("What you may expect", [
        "A few moments of pressure from the sensor. If the sensor is uncomfortable, tell us so we can adjust.",
      ]),
      benefits: section("Intended goals", [
        "Better information for a safer, more accurate recommendation.",
      ]),
      considerations: section("Limitations and considerations", [
        "Images use a low amount of radiation. They are used when the expected benefit outweighs that exposure. They do not replace looking in the mouth.",
      ]),
      faq: faqs([
        {
          question: "Can I refuse X-rays?",
          answer:
            "You can discuss concerns. If we cannot complete a recommendation safely without an image, we will say so rather than guess.",
        },
      ]),
      relatedTreatments: related(["teeth-cleaning", "pediatric-x-rays", "digital-cavity-detection"]),
    },
  }),
] as const;
