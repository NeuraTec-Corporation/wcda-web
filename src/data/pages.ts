import { doctorProfile } from "@/data/doctor";
import { getCallOfficeCta } from "@/data/contact";
import { headerCta } from "@/data/navigation";
import type { PageContent } from "@/types/content";

export const servicesPage: PageContent = {
  headingId: "services-heading",
  eyebrow: "Services",
  title: "Dental services",
  description:
    "Explore areas of care and the treatments and services discussed after an exam.",
  primaryAction: headerCta,
  secondaryAction: { href: "/contact", label: "Ask about a visit" },
};

export const contactPage: PageContent = {
  headingId: "contact-heading",
  eyebrow: "Get in Touch",
  title: "Contact West Caldwell Dental Arts",
  description:
    "Questions about scheduling, your visit, or general office information can be directed to our team. Use the options below or request an appointment.",
  primaryAction: headerCta,
  secondaryAction: getCallOfficeCta(),
};

export const teamPage: PageContent = {
  headingId: "team-heading",
  eyebrow: "About",
  title: "The practice team",
  description:
    "Care at West Caldwell Dental Arts is provided under the ownership of Dr. Jonnathan Matute, DMD. The people who support your visits are an important part of the practice.",
  primaryAction: { href: doctorProfile.href, label: "Meet Dr. Matute" },
  secondaryAction: headerCta,
};

export const doctorPage: PageContent = {
  headingId: "doctor-heading",
  eyebrow: "Practice owner",
  title: doctorProfile.displayName,
  description: doctorProfile.summary,
  primaryAction: headerCta,
  secondaryAction: { href: "/about", label: "About the practice" },
};
