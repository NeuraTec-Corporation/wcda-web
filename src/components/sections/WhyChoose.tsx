import { CardGridSection } from "@/components/sections/CardGridSection";
import type { CardSectionContent } from "@/types/content";

type WhyChooseProps = CardSectionContent & {
  headingId?: string;
};

export function WhyChoose({
  headingId = "why-choose-heading",
  ...content
}: WhyChooseProps) {
  return (
    <CardGridSection
      headingId={headingId}
      tone="surface"
      cardClassName="bg-background"
      {...content}
    />
  );
}
