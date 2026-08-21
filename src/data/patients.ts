import { headerCta } from "@/data/navigation";
import type { PageContent, ProsePageContent, StepItem } from "@/types/content";

export const patientsPage: PageContent = {
  headingId: "patients-heading",
  eyebrow: "Patients",
  title: "Information for your visit",
  description:
    "Learn what to expect at a first visit, how we discuss fees and dental benefits, and how to request an appointment.",
  primaryAction: headerCta,
  secondaryAction: { href: "/contact", label: "Contact" },
};

export const patientResourceCards = [
  {
    title: "First visit",
    description:
      "What to bring, what a comprehensive visit may include, and how we talk through next steps.",
    href: "/patients/first-visit",
  },
  {
    title: "Financial options",
    description:
      "How we discuss fees and payment before treatment, in language that is clear and practical.",
    href: "/patients/financial-options",
  },
  {
    title: "Insurance",
    description:
      "How dental benefits may apply to your care, discussed alongside recommended treatment.",
    href: "/patients/insurance",
  },
  {
    title: "Patient forms",
    description:
      "How health history and office forms are completed for your visit.",
    href: "/patients/forms",
  },
] as const;

const firstVisitSteps: readonly StepItem[] = [
  {
    title: "Health history",
    description:
      "We review your medical and dental history so care can be planned with your overall health in mind.",
  },
  {
    title: "Medications and supplements",
    description:
      "Please share current medications, supplements, and any allergies. This information helps us treat you safely.",
  },
  {
    title: "Comprehensive oral exam",
    description:
      "Your dentist examines teeth, gums, and related oral tissues and notes findings that may need attention.",
  },
  {
    title: "X-rays when indicated",
    description:
      "Imaging is used when it helps evaluate areas that cannot be seen in a visual exam alone.",
  },
  {
    title: "Oral cancer screening",
    description:
      "A screening of the mouth and surrounding tissues is included as part of a thorough exam.",
  },
  {
    title: "Cleaning when appropriate",
    description:
      "A routine cleaning may be completed during the visit if your periodontal condition allows.",
  },
  {
    title: "Treatment discussion",
    description:
      "If care is recommended, we explain why, outline options, and leave time for questions.",
  },
  {
    title: "Comfort and pace",
    description:
      "If you feel anxious, tell us. We can pause, explain each step, and plan the visit around your comfort.",
  },
  {
    title: "Fees and next visits",
    description:
      "We discuss the cost of recommended care and how to schedule follow-up if treatment is needed.",
  },
];

export const firstVisitPage: ProsePageContent = {
  headingId: "first-visit-heading",
  eyebrow: "Patients",
  title: "Your first visit",
  description:
    "A first visit at West Caldwell Dental Arts is designed to understand your health, examine your mouth thoroughly, and talk through any recommended next steps.",
  paragraphs: [
    "Please arrive a few minutes early so we can complete or review your information. Bring a photo ID, a list of current medications and supplements, and your dental benefit information if you have coverage.",
    "Let us know if you have dental anxiety or if there are parts of a visit that are difficult for you. We can adjust the pace and explain each step as we go.",
  ],
  steps: firstVisitSteps,
  primaryAction: headerCta,
  secondaryAction: { href: "/contact", label: "Contact" },
};

export const financialPage: ProsePageContent = {
  headingId: "financial-heading",
  eyebrow: "Patients",
  title: "Financial options",
  description:
    "We discuss fees before treatment whenever possible so you can make an informed decision about care.",
  paragraphs: [
    "After an exam, we review recommended treatment and the associated fees. You are welcome to ask questions, consider options, and decide what you would like to schedule.",
    "If you have dental benefits, we can help you understand how those benefits may apply. Coverage varies by plan, so we do not treat an estimate as a final bill until benefits are determined.",
    "Payment questions can be discussed with our team at your visit or when you request an appointment. We do not list third-party financing programs or payment methods on this page.",
  ],
  primaryAction: headerCta,
  secondaryAction: { href: "/patients/insurance", label: "Insurance information" },
};

export const insurancePage: ProsePageContent = {
  headingId: "insurance-heading",
  eyebrow: "Patients",
  title: "Dental insurance",
  description:
    "If you have dental benefits, bring your insurance information to your visit so we can help you understand how coverage may apply.",
  paragraphs: [
    "Dental plans differ in what they cover, what they require for approval, and what remaining balance may be your responsibility. We can help you review those details in the context of recommended treatment.",
    "Plan details vary. The most accurate information comes from your policy and a benefits review for the care being discussed.",
    "If you do not have dental benefits, we can still review fees and visit options with you directly.",
  ],
  primaryAction: { href: "/patients/financial-options", label: "Financial options" },
  secondaryAction: headerCta,
};

export const formsPage: ProsePageContent = {
  headingId: "forms-heading",
  eyebrow: "Patients",
  title: "Patient forms",
  description:
    "Health history and office forms can be completed at your visit. Please do not send medical details through this website.",
  paragraphs: [
    "New and returning patients complete or update health history, medications, and office information as part of care. Forms are available at the office.",
    "If you want to know what to have ready, ask when you request a visit. Please do not send clinical history, medication lists, or insurance identification numbers through this website.",
    "In-office completion is the path we use for forms today.",
  ],
  primaryAction: headerCta,
  secondaryAction: { href: "/contact", label: "Contact the office" },
};
