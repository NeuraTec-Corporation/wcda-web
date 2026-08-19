import { CardGridSection } from "@/components/sections/CardGridSection";
import type { CardSectionContent } from "@/types/content";

type ServicesOverviewProps = CardSectionContent & {
  headingId?: string;
};

export function ServicesOverview({
  headingId = "services-overview-heading",
  ...content
}: ServicesOverviewProps) {
  return (
    <CardGridSection
      headingId={headingId}
      cardClassName="bg-background"
      {...content}
    />
  );
}
