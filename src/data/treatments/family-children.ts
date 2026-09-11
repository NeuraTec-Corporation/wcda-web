import {
  faqs,
  published,
  related,
  section,
  treatment,
} from "@/data/treatments/helpers";

export const familyChildrenTreatments = [
  treatment({
    slug: "teens-dentistry",
    title: "Teen Dentistry",
    categorySlug: "family-children",
    summary:
      "Dental care for adolescents, including exams, cleanings, and conversations about developing oral health habits.",
    intro:
      "Teen dentistry covers the years when permanent teeth finish arriving, independence grows, and habits around snacks, sports, and orthodontics often change. Visits still include exams and cleanings. They also make room for the teen’s own questions, not only a parent’s.",
    metaDescription:
      "Teen dental care at West Caldwell Dental Arts includes exams, cleanings, and age-appropriate guidance after evaluation.",
    ...published,
    sections: {
      overview: section("What teen visits include", [
        "Exams look at cavities, gums, wisdom-tooth development when relevant, alignment, and wear. Cleanings and home-care coaching are part of most visits. Privacy for a teen’s questions can be arranged when that feels appropriate.",
      ]),
      whyRecommended: section("Why regular visits matter in the teen years", [
        "Diet, orthodontic appliances, and busy schedules can raise cavity risk. Sports increase the chance of injury. Wisdom teeth may begin to cause crowding or hygiene difficulty. Catching those issues early keeps options simpler.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Hygiene around braces or aligners, soda and snack patterns, mouthguard use, and any jaw clicking or grinding. Medical history and medications are reviewed as they would be for an adult.",
      ]),
      howItWorks: section("How visits are usually structured", [
        "A typical visit includes exam, cleaning as appropriate, and a short, direct conversation about what to keep doing and what to change. Treatment, if needed, is explained before it starts.",
      ]),
      whatToExpect: section("What you may expect", [
        "A tone that is respectful and clear. We do not lecture. We do explain what we see. Parents are included in planning unless a different arrangement is agreed.",
      ]),
      benefits: section("Intended goals", [
        "Healthy gums, fewer surprises from decay, and a teen who understands their own mouth well enough to care for it.",
      ]),
      considerations: section("Limitations and considerations", [
        "Teen cooperation with home care still determines a large part of the outcome. Orthodontic movement of teeth is a separate discussion and is not started from a cleaning visit alone.",
      ]),
      alternatives: section("Possible next steps", [
        "Sealants, fluoride, mouthguards, ortho screening, or restorative care may follow findings. Each is discussed on its own merits.",
      ]),
      faq: faqs([
        {
          question: "Should a parent stay in the room?",
          answer:
            "Many families stay together. If a teen wants a moment to speak privately, we can discuss how to do that respectfully.",
        },
        {
          question: "When are wisdom teeth checked?",
          answer:
            "When development, symptoms, or age make a look useful. Not every teen needs removal. Imaging, when used, has a reason.",
        },
      ]),
      relatedTreatments: related([
        "childrens-cleanings-exams",
        "sports-mouthguards",
        "ortho-screenings",
      ]),
    },
  }),
  treatment({
    slug: "infant-oral-exams",
    title: "Infant Oral Exams",
    categorySlug: "family-children",
    summary:
      "An early look at oral development and guidance for caregivers on teething, feeding, and first dental visits.",
    intro:
      "An infant oral exam is a gentle first look at the mouth, gums, and any teeth that have arrived. It is as much a visit for caregivers as for the child: teething, feeding, bottles, and what to expect next. The aim is a calm introduction, not a miniature adult appointment.",
    metaDescription:
      "Infant oral exams at West Caldwell Dental Arts offer a gentle first look at development and guidance for caregivers.",
    ...published,
    sections: {
      overview: section("What an infant exam is", [
        "The dentist looks at gum pads, erupting teeth, tongue and lip attachments when relevant, and signs of decay or injury. The visit is short and paced to the child. A full cleaning is usually not the point of a first infant exam.",
      ]),
      whyRecommended: section("Why early visits are recommended", [
        "Guidance is often more useful before problems start. Caregivers can ask about teething, nighttime feeding, and how to clean new teeth. Unusual eruption patterns can be noted early.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Birth and feeding history, fluoride exposure, family cavity experience, and any concerns about licking, biting, or white spots on new teeth.",
      ]),
      howItWorks: section("How the visit generally works", [
        "The child may sit on a caregiver’s lap. The dentist uses a light and a finger or small mirror. Findings are explained immediately. Home-care steps are demonstrated when useful.",
      ]),
      whatToExpect: section("What you may expect", [
        "Crying is common and not a failure. The visit can still be successful. You should leave with a few specific next steps, not a long list.",
      ]),
      benefits: section("Intended goals", [
        "A first relationship with the office, answers for caregivers, and a baseline for growth.",
      ]),
      considerations: section("Limitations and considerations", [
        "Infants cannot cooperate like older children. Some questions wait until more teeth arrive. Treatment, if ever needed, is planned with extra attention to safety and comfort.",
      ]),
      alternatives: section("Possible next steps", [
        "A return visit when more teeth erupt, a discussion of fluoride, or referral if a developmental concern is outside general dental care.",
      ]),
      faq: faqs([
        {
          question: "When should the first visit happen?",
          answer:
            "A common recommendation is by the first birthday or within six months of the first tooth. If you are unsure, call and we can help you choose a time.",
        },
        {
          question: "Will my baby need X-rays?",
          answer:
            "Almost never at a first infant exam. Images are used later only when they would change what we know or recommend.",
        },
      ]),
      relatedTreatments: related(["childrens-cleanings-exams", "fluoride"]),
    },
  }),
  treatment({
    slug: "childrens-cleanings-exams",
    title: "Children's Cleanings & Exams",
    categorySlug: "family-children",
    summary:
      "Age-appropriate exams and cleanings planned to help children become more comfortable with dental visits.",
    intro:
      "Children’s exams and cleanings are sized to age, attention span, and comfort. The clinical goals are the same as for adults—find problems early and keep gums and teeth healthy—but the pace, language, and tools are adjusted so the visit feels manageable.",
    metaDescription:
      "Children’s dental exams and cleanings at West Caldwell Dental Arts are paced for comfort and thorough evaluation.",
    ...published,
    sections: {
      overview: section("What these visits include", [
        "A look at teeth, gums, bite, and oral habits, plus a cleaning suited to the child’s cooperation and deposit level. Coaching for brushing at home is part of most visits. Sealants or fluoride may be discussed when they fit the findings.",
      ]),
      whyRecommended: section("Why they are recommended", [
        "Primary teeth still matter for chewing, speech, and holding space for permanent teeth. Regular visits also help children learn what a dental office is before a toothache is the first memory.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Cavity risk, hygiene, diet, eruption, alignment, and how the child copes with sitting still. Caregiver questions are welcome.",
      ]),
      howItWorks: section("How treatment generally works", [
        "Tell-show-do is used when it helps: naming an instrument, showing it, then using it. Cleaning is gentle. If a child needs a slower first visit, that can still be a complete exam with a shorter cleaning.",
      ]),
      whatToExpect: section("What you may expect", [
        "Some children do well immediately. Others need two visits to feel settled. Either path is acceptable. Praise is specific (“you kept your mouth open”) rather than generic.",
      ]),
      benefits: section("Intended goals", [
        "Healthy teeth, calmer future visits, and caregivers who know what to do at home.",
      ]),
      considerations: section("Limitations and considerations", [
        "A child’s cooperation sets a limit on what can be completed safely. If decay needs treatment, that is planned separately with attention to comfort. We do not rush restorative work during a first frightened visit unless pain or infection requires it.",
      ]),
      alternatives: section("Possible next steps", [
        "Fluoride, sealants, pediatric imaging when indicated, or a restorative visit. Referral is discussed if behavior or medical needs exceed what can be done comfortably here.",
      ]),
      faq: faqs([
        {
          question: "Should I sit with my child?",
          answer:
            "Often yes, especially for younger children. We can adjust as the child grows more comfortable.",
        },
        {
          question: "What if my child will not open?",
          answer:
            "We slow down, try again, or complete what is safe. Forcing a full adult-style cleaning is not the goal of a first difficult visit.",
        },
      ]),
      relatedTreatments: related(["pediatric-x-rays", "sealants", "fluoride", "infant-oral-exams"]),
    },
  }),
  treatment({
    slug: "pediatric-x-rays",
    title: "Pediatric X-Rays",
    categorySlug: "family-children",
    summary:
      "Imaging used when it helps evaluate developing teeth, and only when the benefit of the image is clear.",
    intro:
      "Pediatric radiographs are used when an image is likely to answer a question that looking in the mouth cannot. Developing teeth, space for permanent teeth, and hidden decay between contacts are common reasons. They are not a routine extra for every child’s every visit.",
    metaDescription:
      "Pediatric dental X-rays at West Caldwell Dental Arts are taken when images are likely to help diagnosis in children.",
    ...published,
    sections: {
      overview: section("What pediatric X-rays are", [
        "Small images of teeth and supporting bone, sized and timed for children. The number of images depends on the clinical question, not a fixed package.",
      ]),
      whyRecommended: section("Why they may be recommended", [
        "To look between teeth that touch tightly, to check unerupted teeth, to evaluate an injury, or to understand an infection. Without a reason, they can wait.",
      ]),
      evaluation: section("What an evaluation considers", [
        "Age, cooperation, last images, cavity risk, and whether the child can hold still. Caregiver concerns about exposure are discussed openly.",
      ]),
      howItWorks: section("How imaging generally works", [
        "A small sensor is placed, often with a caregiver nearby. Thyroid collars and modern sensors are used as appropriate. Images are reviewed with the caregiver.",
      ]),
      whatToExpect: section("What you may expect", [
        "A few seconds of holding still. If a child cannot tolerate the sensor, we may postpone rather than struggle, unless the image is needed to treat pain or infection.",
      ]),
      benefits: section("Intended goals", [
        "Information that makes treatment more accurate and avoids guessing about hidden decay or missing teeth.",
      ]),
      considerations: section("Limitations and considerations", [
        "Images use a low amount of radiation. They are recommended when the expected benefit is clear. They do not replace a visual exam.",
      ]),
      alternatives: section("Possible alternatives", [
        "Waiting, a different type of image, or treating based on what can be seen if the child cannot cooperate and the situation is not urgent.",
      ]),
      faq: faqs([
        {
          question: "Are X-rays safe for children?",
          answer:
            "When they are needed, modern dental images use a low dose and are targeted. We recommend them for a reason and can explain that reason before they are taken.",
        },
        {
          question: "How often will my child need them?",
          answer:
            "It depends on cavity risk and what we need to see. Some children need images less often than others.",
        },
      ]),
      relatedTreatments: related(["childrens-cleanings-exams", "dental-x-rays"]),
    },
  }),
  treatment({
    slug: "sports-mouthguards",
    title: "Sports Mouthguards",
    categorySlug: "family-children",
    summary:
      "A custom guard intended to help protect teeth during sports and other contact activities.",
    intro:
      "A sports mouthguard is a custom-made cover worn over the teeth during contact or high-risk activity. It is intended to help reduce dental injury. It is not a guarantee that a tooth will never be hurt, and it is not the same as a night guard for grinding.",
    metaDescription:
      "Custom sports mouthguards at West Caldwell Dental Arts are made after an exam to help protect teeth during activity.",
    ...published,
    sections: {
      overview: section("What a sports mouthguard is", [
        "It is a device formed from a model or scan of the teeth so it fits more securely than many store-bought options. Fit affects whether a child will actually wear it.",
      ]),
      whyRecommended: section("Why it may be recommended", [
        "When a sport or activity has a realistic chance of impact to the mouth. Braces, large restorations, or prior dental injury can make protection more important to discuss.",
      ]),
      evaluation: section("What an evaluation considers", [
        "The sport, the child’s bite, orthodontic appliances, and whether a stock guard is already in use. Eruption of new teeth in growing children may mean a guard needs replacement sooner.",
      ]),
      howItWorks: section("How they are generally made", [
        "Impressions or a scan are taken. The laboratory or in-office process produces the guard. Fit is checked so speech and breathing are as comfortable as practical.",
      ]),
      whatToExpect: section("What you may expect", [
        "A short records visit and a delivery visit. The child should practice wearing the guard before game day. Minor adjustments are common.",
      ]),
      benefits: section("Intended goals", [
        "A guard the child will wear, with a fit that stays in place better than a loose boil-and-bite tray for many patients.",
      ]),
      considerations: section("Limitations and considerations", [
        "No guard prevents every injury. Growing children outgrow guards. A guard that is left in a bag does not help. It is not designed as a sleep apnea device or a grinding splint unless that is a separate, specific appliance.",
      ]),
      maintenance: section("Maintenance", [
        "Rinse after use, store in a case, and keep away from heat. Bring it to dental visits so fit can be checked.",
      ]),
      alternatives: section("Possible alternatives", [
        "A well-fitted store-bought guard may still be better than nothing if a custom guard is delayed. We can discuss tradeoffs honestly.",
      ]),
      faq: faqs([
        {
          question: "Can my child wear a guard with braces?",
          answer:
            "Often yes, with a design that accounts for brackets. Tell us if orthodontic treatment is in progress or planned.",
        },
        {
          question: "Is this the same as a night guard?",
          answer:
            "No. Night guards are for clenching or grinding during sleep. Sports guards are for impact during activity. They are different devices.",
        },
      ]),
      relatedTreatments: related(["oral-appliances", "teens-dentistry"]),
    },
  }),
] as const;
