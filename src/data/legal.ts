import { siteConfig } from "@/config/site";
import { getCallOfficeCta } from "@/data/contact";
import type { PageContent } from "@/types/content";

export const privacyPage: PageContent = {
  headingId: "privacy-heading",
  eyebrow: "Privacy",
  title: "Privacy information",
  description:
    "This page describes, in general terms, how West Caldwell Dental Arts treats information related to this website.",
  primaryAction: { href: "/contact", label: "Contact the office" },
  secondaryAction: getCallOfficeCta(),
};

export const privacySections = [
  {
    headingId: "privacy-website-heading",
    title: "Information you may share on this website",
    paragraphs: [
      "Some pages on this website may invite you to share contact details such as your name, email address, phone number, or a general message. Those fields are intended for office communication, such as questions about scheduling or visiting the practice.",
      "Please do not submit sensitive medical or health information, dental history, medications, Social Security numbers, or insurance identification numbers through generic website forms. The practice collects health information through an appropriate process at or before a visit.",
    ],
  },
  {
    headingId: "privacy-operation-heading",
    title: "How this website operates",
    paragraphs: [
      "Like most websites, this site may use cookies or similar browser storage that are needed for the pages to function. We do not currently use advertising cookies or analytics services on this website.",
      "If you follow a link to another website or service, such as Google Maps or Instagram, that destination has its own privacy practices. West Caldwell Dental Arts does not control those third-party terms.",
    ],
  },
  {
    headingId: "privacy-questions-heading",
    title: "Questions and updates",
    paragraphs: [
      `If you have a question about this page, contact West Caldwell Dental Arts at ${siteConfig.email.display} or ${siteConfig.phone.display}.`,
      "This information may be updated from time to time as the website or office processes change. The current version is the one published on this page.",
    ],
  },
] as const;

export const accessibilityPage: PageContent = {
  headingId: "accessibility-heading",
  eyebrow: "Accessibility",
  title: "Website accessibility",
  description:
    "West Caldwell Dental Arts is working to make this website usable for people with a range of abilities. We welcome feedback when something is difficult to use.",
  primaryAction: { href: "/contact", label: "Contact the office" },
  secondaryAction: getCallOfficeCta(),
};

export const accessibilitySections = [
  {
    headingId: "accessibility-commitment-heading",
    title: "Our approach",
    paragraphs: [
      "We are committed to improving the accessibility of this website over time. That work is ongoing. This page is not a claim that the site meets a specific technical standard or that it has been formally audited.",
      "If you use assistive technology or need information in another format, we will do our best to help you get what you need to plan a visit or reach the office.",
    ],
  },
  {
    headingId: "accessibility-help-heading",
    title: "Requesting assistance",
    paragraphs: [
      `If you encounter a barrier on this website, please tell us. Call ${siteConfig.phone.display} or email ${siteConfig.email.display} and include the page you were using and what you were trying to do.`,
      "You can also use the Contact page for general office questions. We will use the details you provide to look into the issue and help you continue.",
    ],
  },
] as const;
