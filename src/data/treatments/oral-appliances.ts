import {
  faqs,
  published,
  related,
  section,
  treatment,
} from "@/data/treatments/helpers";

export const oralApplianceTreatments = [
  treatment({
    slug: "oral-appliances",
    title: "Oral Appliances",
    categorySlug: "oral-appliances",
    summary:
      "Custom devices made to protect teeth, support the jaw, or address wear from clenching and grinding.",
    intro:
      "Oral appliances are custom-made devices worn in the mouth to protect teeth, distribute bite forces, or, in some designs, support the jaw. They are not one product. A sports guard, a night guard, and other appliances have different purposes. The right device, if any, is chosen after an exam of the teeth, gums, joints, and your symptoms.",
    metaDescription:
      "Custom oral appliances at West Caldwell Dental Arts may protect teeth or support the jaw when an exam shows that a device could help.",
    ...published,
    sections: {
      overview: section("What oral appliances are", [
        "They are laboratory or in-office devices formed to your teeth. Materials and coverage (upper, lower, full arch, or anterior) depend on the diagnosis. Over-the-counter boil-and-bite trays are a different category and often fit less securely.",
      ]),
      whyRecommended: section("Why they may be recommended", [
        "To reduce wear from grinding, to protect restorations, to give sore muscles a more even contact, or to protect teeth during sport. They are not a complete treatment for every headache or joint problem.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Tooth wear, cracked teeth, muscle tenderness, joint sounds, airway-related snoring questions when relevant, and whether the bite is stable. If sleep apnea is suspected, medical evaluation comes before using a dental device for breathing.",
      ]),
      howItWorks: section("How they are generally made", [
        "Impressions or a scan, a bite record when needed, fabrication, and a delivery visit for adjustment. Follow-up is used to check sore spots and the way teeth meet with the appliance in.",
      ]),
      whatToExpect: section("What you may expect", [
        "An adaptation period for speech and saliva. Morning bite changes can occur with some designs and are monitored. An appliance that is painful should be adjusted, not worn through injury.",
      ]),
      benefits: section("Intended goals", [
        "Protection of tooth surfaces and restorations, and, when appropriate, a more comfortable place for the jaw to rest at night.",
      ]),
      considerations: section("Limitations and considerations", [
        "Appliances do not always stop the habit of clenching. They can be lost or broken. Some people cannot tolerate a bulky design. They are not a cure for joint disease. NightLase and other approaches, when discussed, are separate options with their own criteria.",
      ]),
      recoveryAftercare: section("Getting used to the appliance", [
        "Increase wear as instructed. Bring it to dental visits. If a tooth feels locked in the morning, call so we can review the design.",
      ]),
      maintenance: section("Maintenance", [
        "Clean with a brush and cool water or a recommended cleaner. Keep away from heat and pets. Replace when it is worn through or no longer fits after dental work.",
      ]),
      alternatives: section("Possible alternatives", [
        "No appliance if wear is minimal, physical therapy or medical referral for joint pain, restorative repair of damaged teeth, or a different appliance design.",
      ]),
      faq: faqs([
        {
          question: "Is a night guard the same as a sports mouthguard?",
          answer:
            "No. Night guards are for clenching or grinding during sleep. Sports guards are for impact. Using the wrong one can be uncomfortable or ineffective.",
        },
        {
          question: "Can I use a store-bought guard?",
          answer:
            "Some people do. Fit and coverage vary. If you have restorations, a tight bite, or joint symptoms, a custom device is often easier to discuss after an exam.",
        },
      ]),
      relatedTreatments: related([
        "teeth-grinding",
        "sports-mouthguards",
        "nightlase",
      ]),
    },
  }),
  treatment({
    slug: "teeth-grinding",
    title: "Teeth Grinding",
    categorySlug: "oral-appliances",
    summary:
      "Evaluation of grinding or clenching and discussion of protection, such as a night guard, when indicated.",
    intro:
      "Teeth grinding and clenching (bruxism) can wear enamel, crack teeth, and strain jaw muscles. Evaluation looks at the teeth, the muscles, the joints, and your sleep and stress context without assuming a single cause. Protection, when recommended, is usually an appliance. Treating the habit itself is less straightforward and is discussed honestly.",
    metaDescription:
      "Evaluation of teeth grinding at West Caldwell Dental Arts can lead to protection such as a night guard when an exam shows it may help.",
    ...published,
    sections: {
      overview: section("What grinding and clenching are", [
        "Grinding slides teeth against each other. Clenching holds them tightly. Either can happen during sleep or while awake. You may not hear it. Flattened teeth, sore muscles, or a partner’s report are common clues.",
      ]),
      whyRecommended: section("Why evaluation matters", [
        "Unexplained broken fillings, morning headaches, or sensitivity can have a bite-force component. Finding that out can change how restorations are designed and whether a guard is worthwhile.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Wear facets, cracked teeth, muscle palpation, joint examination, restorations at risk, and questions about sleep quality and daytime clenching. If sleep-disordered breathing is a concern, we may suggest medical evaluation rather than treating only the teeth.",
      ]),
      howItWorks: section("How care is usually organized", [
        "Findings are explained. If an appliance is appropriate, records are taken. If restorations are needed, they may be sequenced with protection so new work is not immediately overloaded. Relaxation strategies for daytime clenching can be discussed; they are habits, not procedures.",
      ]),
      whatToExpect: section("What you may expect", [
        "A conversation that may conclude you need a guard, you need restorations, you need both, or you need a medical referral. Not every worn tooth needs a crown on the first visit.",
      ]),
      benefits: section("Intended goals", [
        "Understanding whether force is damaging the teeth and offering protection when it is likely to help. Reducing further wear is a typical aim; reversing wear that has already happened is not.",
      ]),
      considerations: section("Limitations and considerations", [
        "A night guard does not always stop grinding. Some people clench around the guard. Awake clenching is not solved by a device you wear only at night. Medications and sleep disorders can play a role that dentistry alone does not fix.",
      ]),
      maintenance: section("If a guard is made", [
        "Wear it as directed, keep it clean, and bring it to exams. Dental work can change the fit and require a remake.",
      ]),
      alternatives: section("Possible alternatives", [
        "Monitoring mild wear, restoring damaged teeth, physical therapy, or medical sleep evaluation. BOTOX for muscles is not a published offering here and would not replace a diagnosis.",
      ]),
      faq: faqs([
        {
          question: "Will a night guard stop me from grinding?",
          answer:
            "Often the goal is to protect teeth and spread force, not to switch the habit off. Some people grind less with a well-adjusted appliance; others do not. We set expectations before you invest in one.",
        },
        {
          question: "Is grinding caused by stress?",
          answer:
            "Stress can contribute, especially to daytime clenching. Sleep grinding has other possible factors as well. We do not reduce the problem to a single cause without looking at the mouth.",
        },
      ]),
      relatedTreatments: related([
        "oral-appliances",
        "porcelain-crowns",
        "nightlase",
      ]),
    },
  }),
] as const;
