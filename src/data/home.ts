import { siteConfig } from "@/config/site";
import { contactDetails } from "@/data/contact";
import type {
  CallToActionContent,
  CardSectionContent,
  ContactPreviewContent,
  HeroContent,
  PracticeIntroductionContent,
} from "@/types/content";

export const homeHero: HeroContent = {
  eyebrow: siteConfig.location.label,
  title: siteConfig.name,
  description:
    "A dental practice in West Caldwell, New Jersey. This website publishes practice information, services, and contact details as those details are confirmed.",
  primaryAction: { href: "/contact", label: "View contact information" },
  secondaryAction: { href: "/about", label: "About the practice" },
};

export const homeTrust: CallToActionContent = {
  eyebrow: "Introduction",
  title: "A local dental practice",
  description:
    "West Caldwell Dental Arts provides dental care in West Caldwell, New Jersey. Team biographies, visit guidance, and a confirmed service list will appear on this site after they are verified. This page does not make clinical outcome claims.",
  primaryAction: { href: "/about", label: "Open the About page" },
};

export const homeServices: CardSectionContent = {
  eyebrow: "Services",
  title: "Treatments and services",
  description:
    "Named treatments will be listed only after they are confirmed. The groups below are structural placeholders, not a catalog of offered procedures.",
  items: [
    {
      title: "General dentistry",
      description:
        "A summary of general dental services will be published after confirmation. This placeholder does not list specific procedures.",
    },
    {
      title: "Preventive visits",
      description:
        "Details about routine and preventive visits will be added when confirmed by the practice.",
    },
    {
      title: "Further treatments",
      description:
        "Additional treatments, if offered, will be described on the Services page once confirmed.",
    },
  ],
  cta: { href: "/services", label: "Go to the Services page" },
};

export const homeWhyChoose: CardSectionContent = {
  eyebrow: "Overview",
  title: "Why West Caldwell Dental Arts",
  description:
    "These notes describe the practice at a public-information level. They are not comparisons, guarantees, or clinical claims.",
  items: [
    {
      title: "A West Caldwell practice",
      description:
        "The practice is identified with West Caldwell, New Jersey.",
    },
    {
      title: "Confirmed information only",
      description:
        "Services, team details, hours, and visit information will be added after they are verified.",
    },
    {
      title: "A clear contact path",
      description:
        "Location and communication details will live on the Contact page as they are published.",
    },
  ],
};

export const homePractice: PracticeIntroductionContent = {
  eyebrow: "The practice",
  title: "Practice introduction",
  description:
    "Clinician names, credentials, and practice history are not published here yet. This section reserves space for verified biographies.",
  placeholderTitle: "Clinician biography",
  placeholderBody:
    "A verified introduction will appear in this space. No credentials, years of experience, or clinical claims are stated in this release.",
  portraitLabel: "Portrait placeholder",
  cta: { href: "/about", label: "Open the About page" },
};

export const homePatientCta: CallToActionContent = {
  eyebrow: "Patients",
  title: "Information for patients",
  description:
    "The Patients page will hold visit-related information as it is confirmed. Online booking and forms are not part of this release.",
  primaryAction: { href: "/patients", label: "Open the Patients page" },
  secondaryAction: { href: "/contact", label: "Open the Contact page" },
};

export const homeContact: ContactPreviewContent = {
  eyebrow: "Location",
  title: "Contact and location",
  description:
    "Street address, phone number, and office hours will be listed on the Contact page once confirmed.",
  details: contactDetails,
  cta: { href: "/contact", label: "View the Contact page" },
};
