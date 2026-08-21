import { doctorProfile } from "@/data/doctor";
import { headerCta } from "@/data/navigation";
import type { CallToActionContent, PageContent } from "@/types/content";
import type { NavItem } from "@/types/navigation";

export const aboutPage: PageContent = {
  headingId: "about-heading",
  eyebrow: "About",
  title: "An independent practice in West Caldwell",
  description:
    "West Caldwell Dental Arts is an independent dental practice owned by Dr. Jonnathan Matute, DMD. We provide patient-centered care in West Caldwell, New Jersey.",
  primaryAction: headerCta,
  secondaryAction: { href: doctorProfile.href, label: "Meet Dr. Matute" },
};

export const aboutPhilosophy = {
  headingId: "philosophy-heading",
  eyebrow: "Our approach",
  title: "Care that starts with listening",
  paragraphs: [
    "We begin with your health history, your questions, and what you hope to address. Findings are explained in plain language, and recommendations are discussed before treatment begins.",
    "Comfort matters. If you feel anxious about dental visits, tell us. We can adjust the pace of an appointment, pause when you need a moment, and plan visits so you know what to expect.",
  ],
};

export const aboutIndependence = {
  headingId: "independence-heading",
  eyebrow: "The practice",
  title: "Independent care in a local office",
  paragraphs: [
    "West Caldwell Dental Arts operates as an independent practice. Dr. Jonnathan Matute, DMD, is the practice owner. Patients see a local office with a clear point of contact for their care.",
    "Continuity is part of that model. Your records, treatment conversations, and follow-up stay with this practice, so you do not have to re-explain your history at every turn.",
  ],
};

export const aboutWhyChoose: CallToActionContent = {
  eyebrow: "Why patients choose us",
  title: "A clear, local place for dental care",
  description:
    "A local office, independent ownership, and a straightforward way to plan your visit.",
  primaryAction: { href: doctorProfile.href, label: `Meet ${doctorProfile.displayName}` },
  secondaryAction: headerCta,
};

export const aboutWhyItems = [
  {
    title: "Independent West Caldwell practice",
    description:
      "Care is provided at our West Caldwell office under the ownership of Dr. Jonnathan Matute, DMD.",
  },
  {
    title: "Time to understand the plan",
    description:
      "We explain exam findings and treatment options before you decide how to proceed.",
  },
  {
    title: "A straightforward next step",
    description:
      "Request an appointment to begin planning a visit, or visit the Contact page for more information.",
  },
] as const;

export const aboutRelatedLinks: readonly NavItem[] = [
  { href: doctorProfile.href, label: "Meet Dr. Matute" },
  { href: "/about/team", label: "The practice team" },
  { href: "/services", label: "Explore services" },
];
