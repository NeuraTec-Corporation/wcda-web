import { headerCta } from "@/data/navigation";
import type { PageContent, TechnologyRecord } from "@/types/content";

export const technologyPage: PageContent = {
  headingId: "technology-heading",
  eyebrow: "Technology",
  title: "Thoughtful use of dental technology",
  description:
    "We use dental technology when it helps us examine, explain, or treat a concern more clearly. Equipment is chosen for the needs of the visit, not for its own sake.",
  primaryAction: headerCta,
  secondaryAction: { href: "/contact", label: "Ask about your visit" },
};

export const technologyParagraphs = [
  "Some visits benefit from imaging, magnification, or other tools that help us see details the eye cannot. When we recommend a tool or image, we explain why it is useful for your care.",
  "If you have questions about the instruments used during an appointment, we can talk through them during your visit.",
] as const;

export const technologyRecords: readonly TechnologyRecord[] = [];

export function getConfirmedTechnology(): readonly TechnologyRecord[] {
  return technologyRecords.filter((record) => record.status === "confirmed");
}
