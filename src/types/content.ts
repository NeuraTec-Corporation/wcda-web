import type { NavItem } from "@/types/navigation";

export type ContentBlock = {
  eyebrow?: string;
  title: string;
  description: string;
};

export type ContentCard = {
  title: string;
  description: string;
};

export type HeroContent = ContentBlock & {
  primaryAction: NavItem;
  secondaryAction?: NavItem;
};

export type CardSectionContent = ContentBlock & {
  items: readonly ContentCard[];
  cta?: NavItem;
};

export type CallToActionContent = ContentBlock & {
  primaryAction: NavItem;
  secondaryAction?: NavItem;
};

export type PracticeIntroductionContent = ContentBlock & {
  placeholderTitle: string;
  placeholderBody: string;
  portraitLabel: string;
  cta?: NavItem;
};

export type ContactDetail = {
  label: string;
  value: string;
};

export type ContactPreviewContent = ContentBlock & {
  details: readonly ContactDetail[];
  cta?: NavItem;
};

export type PageContent = ContentBlock & {
  headingId: string;
};
