import { siteConfig } from "@/config/site";
import { getCallOfficeCta } from "@/data/contact";
import type { AppointmentIntakeConfig, PageContent, StepItem } from "@/types/content";

export const appointmentPage: PageContent = {
  headingId: "appointment-heading",
  eyebrow: "Appointments",
  title: "Request an appointment",
  description:
    "West Caldwell Dental Arts welcomes new and returning patients. Please do not send medical or dental history through this website.",
  primaryAction: getCallOfficeCta(),
  secondaryAction: { href: "/contact", label: "Visit the Contact page" },
};

export const appointmentParagraphs = [
  "Online appointment requests are not sent from this website yet. Call the office or use the contact details on this page to plan a visit.",
  "Please do not include health history, medications, insurance identification numbers, or other personal health information through this website. We collect that information through an appropriate process at or before your visit.",
] as const;

export const appointmentCallTips: readonly StepItem[] = [
  {
    title: "Preferred days or times",
    description:
      "Have a few scheduling windows in mind so we can look for a visit that fits.",
  },
  {
    title: "New or returning patient",
    description:
      "This helps us prepare the right amount of time for your appointment.",
  },
  {
    title: "How we can reach you",
    description:
      "A callback number is helpful so we can continue the conversation about scheduling.",
  },
];

export const appointmentIntake: AppointmentIntakeConfig = {
  path: siteConfig.appointmentHref,
  acceptsOnlineSubmission: false,
  phiCollectionEnabled: false,
  futureNonPhiFields: [
    {
      name: "name",
      label: "Full name",
      input: "text",
      required: true,
    },
    {
      name: "phone",
      label: "Phone number",
      input: "tel",
      required: true,
    },
    {
      name: "preferredTime",
      label: "Preferred days or times",
      input: "textarea",
      required: false,
    },
  ],
};
