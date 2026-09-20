import { siteConfig } from "@/config/site";
import {
  getCallOfficeCta,
  getPublicContactDetails,
} from "@/data/contact";
import { doctorProfile } from "@/data/doctor";
import { headerCta } from "@/data/navigation";
import type {
  CallToActionContent,
  CardSectionContent,
  ContactPreviewContent,
  HeroContent,
  ProfileIntroductionContent,
} from "@/types/content";
import type { NavItem } from "@/types/navigation";

export const homeHero: HeroContent = {
  title: "Thoughtful dentistry. Personal care.",
  description:
    "An independent dental practice in West Caldwell, New Jersey, led by Dr. Jonnathan Matute, DMD, providing thoughtful, patient-centered care for your oral health.",
  primaryAction: headerCta,
  secondaryAction: { href: "/services", label: "View services" },
  mediaKey: "90",
  pillars: ["Prevent", "Treat", "Protect"],
};

export const homeTrust: CallToActionContent = {
  eyebrow: "Our approach",
  title: "Care that starts with listening",
  description:
    "We take time to understand your health history, answer questions, and explain options in plain language. Comfort, clarity, and a pace that feels manageable are part of how we plan visits.",
  primaryAction: { href: "/about", label: "About the practice" },
  secondaryAction: headerCta,
};

export const homeCareAreas: {
  headingId: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: NavItem;
} = {
  headingId: "home-care-areas-heading",
  eyebrow: "Services",
  title: "Areas of dental care",
  description:
    "These are common areas of dentistry patients ask about. After an exam, we discuss what is appropriate for your oral health and goals.",
  cta: { href: "/services", label: "View all services" },
};

export const homeWhyChoose: CardSectionContent = {
  eyebrow: "Why West Caldwell Dental Arts",
  title: "A local, independent practice",
  description:
    "West Caldwell Dental Arts is independently owned and focused on clear, patient-centered dental care.",
  items: [
    {
      id: "independent-ownership",
      title: "Independent ownership",
      description: `The practice is owned by ${doctorProfile.displayName}.`,
    },
    {
      id: "west-caldwell-community",
      title: "West Caldwell community",
      description: `West Caldwell Dental Arts serves patients in ${siteConfig.identity.label}.`,
    },
    {
      id: "clear-next-steps",
      title: "Clear next steps",
      description:
        "Exam findings and fees are discussed so you can decide how you would like to proceed.",
    },
  ],
};

export const homePractice: ProfileIntroductionContent = {
  eyebrow: "Practice owner",
  title: doctorProfile.displayName,
  paragraphs: doctorProfile.homeParagraphs,
  cta: { href: doctorProfile.href, label: "About Dr. Matute" },
  mediaKey: doctorProfile.mediaKey,
};

export const homePatientCta: CallToActionContent = {
  eyebrow: "Patients",
  title: "Prepare for your visit",
  description:
    "See what a first visit includes, how we discuss fees and dental benefits, and how to request an appointment.",
  primaryAction: { href: "/patients", label: "Patient information" },
  secondaryAction: headerCta,
};

export const homeContact: ContactPreviewContent = {
  eyebrow: "Location",
  title: "Visit West Caldwell Dental Arts",
  description:
    "West Caldwell Dental Arts is an independent practice in West Caldwell, New Jersey. Request an appointment to begin planning a visit.",
  details: getPublicContactDetails(),
  primaryAction: headerCta,
  secondaryAction: getCallOfficeCta(),
};
