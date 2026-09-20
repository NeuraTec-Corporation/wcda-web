import type {
  NavItem,
  PublicationStatus,
  RecordStatus,
  ServiceStatus,
} from "@/types/navigation";

export type ContentBlock = {
  eyebrow?: string;
  title: string;
  description: string;
};

export type ContentCard = {
  id?: string;
  title: string;
  description: string;
  href?: string;
};

export type LabeledValue = {
  label: string;
  value: string;
  href?: string;
};

export type HeroContent = ContentBlock & {
  primaryAction: NavItem;
  secondaryAction?: NavItem;
  mediaKey?: string;
  pillars: readonly [string, string, string];
};

export type CardSectionContent = ContentBlock & {
  items: readonly ContentCard[];
  cta?: NavItem;
};

export type CallToActionContent = ContentBlock & {
  primaryAction: NavItem;
  secondaryAction?: NavItem;
};

export type ProfileIntroductionContent = Omit<ContentBlock, "description"> & {
  description?: string;
  paragraphs?: readonly string[];
  facts?: readonly LabeledValue[];
  cta?: NavItem;
  mediaKey?: string;
};

export type EducationItem = {
  title: string;
  institution?: string;
  location?: string;
  year?: string;
  detail?: string;
};

export type ContactDetail = LabeledValue;

export type ContactPreviewContent = ContentBlock & {
  details: readonly ContactDetail[];
  primaryAction?: NavItem;
  secondaryAction?: NavItem;
};

export type PageContent = ContentBlock & {
  headingId: string;
  primaryAction?: NavItem;
  secondaryAction?: NavItem;
};

export type StepItem = {
  title: string;
  description: string;
};

export type ProsePageContent = PageContent & {
  paragraphs: readonly string[];
  steps?: readonly StepItem[];
};

export type ServiceCategory = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  metaDescription?: string;
  enabled: boolean;
  status: PublicationStatus;
  ownerConfirmationRequired?: boolean;
  mediaKey?: string;
};

export type ServiceRecord = {
  slug: string;
  title: string;
  categorySlug: string;
  summary: string;
  enabled: boolean;
  status: PublicationStatus;
  ownerConfirmationRequired?: boolean;
  mediaKey?: string;
};

export const TREATMENT_SECTION_IDS = [
  "overview",
  "whyRecommended",
  "evaluation",
  "howItWorks",
  "whatToExpect",
  "benefits",
  "considerations",
  "recoveryAftercare",
  "maintenance",
  "alternatives",
  "faq",
  "clinicalNote",
  "relatedTreatments",
] as const;

export type TreatmentSectionId = (typeof TREATMENT_SECTION_IDS)[number];

export type TreatmentFaq = {
  question: string;
  answer: string;
};

export type TreatmentSection = {
  enabled: boolean;
  heading: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
  faqs?: readonly TreatmentFaq[];
  relatedSlugs?: readonly string[];
};

export type TreatmentRecord = ServiceRecord & {
  metaTitle?: string;
  metaDescription: string;
  intro: string;
  heroMediaKey?: string;
  supportingMediaKey?: string;
  sections: Partial<Record<TreatmentSectionId, TreatmentSection>>;
};

export type TreatmentContent = {
  slug: string;
  title: string;
  categorySlug: string;
  summary: string;
  intro: string;
  sections: readonly ContentBlock[];
  status: ServiceStatus;
};

export type DoctorProfile = {
  slug: string;
  displayName: string;
  credential: string;
  role: string;
  href: string;
  mediaKey?: string;
  summary: string;
  intro?: string;
  homeParagraphs: readonly string[];
  biography: readonly string[];
  education: readonly EducationItem[];
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  status: RecordStatus;
};

export type TechnologyRecord = {
  slug: string;
  title: string;
  summary: string;
  status: RecordStatus;
};

export type AppointmentIntakeConfig = {
  path: string;
  acceptsOnlineSubmission: boolean;
  phiCollectionEnabled: boolean;
  futureNonPhiFields: readonly {
    name: string;
    label: string;
    input: "text" | "tel" | "email" | "textarea";
    required: boolean;
  }[];
};
