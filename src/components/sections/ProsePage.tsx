import { PageIntro } from "@/components/sections/PageIntro";
import { ContentBlockSection } from "@/components/sections/ContentBlockSection";
import type { ProsePageContent } from "@/types/content";
import type { SectionTone } from "@/types/ui";

type ProsePageProps = {
  page: ProsePageContent;
  detailsTitle?: string;
  stepsTone?: SectionTone;
};

export function ProsePage({
  page,
  detailsTitle = "What to know",
  stepsTone = "muted",
}: ProsePageProps) {
  const { paragraphs, steps, ...intro } = page;

  return (
    <>
      <PageIntro {...intro} />
      <ContentBlockSection
        headingId={`${page.headingId}-details`}
        title={detailsTitle}
        paragraphs={paragraphs}
        steps={steps}
        tone={stepsTone}
      />
    </>
  );
}
