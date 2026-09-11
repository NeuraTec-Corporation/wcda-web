import { PageIntro } from "@/components/sections/PageIntro";
import { ContentBlockSection } from "@/components/sections/ContentBlockSection";
import type { BreadcrumbItem } from "@/components/editorial/Breadcrumb";
import type { ProsePageContent } from "@/types/content";
import type { SectionTone } from "@/types/ui";
import type { ContentPageId } from "@/config/content-publication";
import { PublicationGate } from "@/components/content/PublicationGate";

type ProsePageProps = {
  page: ProsePageContent;
  pageId: ContentPageId;
  detailsTitle?: string;
  stepsTone?: SectionTone;
  breadcrumb?: readonly BreadcrumbItem[];
};

export function ProsePage({
  page,
  pageId,
  detailsTitle = "What to know",
  stepsTone = "muted",
  breadcrumb,
}: ProsePageProps) {
  const { paragraphs, steps, ...intro } = page;

  return (
    <>
      <PublicationGate page={pageId} section="intro">
        <PageIntro {...intro} breadcrumb={breadcrumb} />
      </PublicationGate>
      <PublicationGate page={pageId} section="details">
        <ContentBlockSection
          headingId={`${page.headingId}-details`}
          title={detailsTitle}
          paragraphs={paragraphs}
          steps={steps}
          tone={stepsTone}
        />
      </PublicationGate>
    </>
  );
}
