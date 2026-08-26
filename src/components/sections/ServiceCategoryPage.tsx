import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { CompositionOffset } from "@/components/experience/CompositionOffset";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TreatmentList } from "@/components/sections/TreatmentList";
import { headerCta } from "@/data/navigation";
import type { ServiceCategory, ServiceRecord } from "@/types/content";

type ServiceCategoryPageProps = {
  category: ServiceCategory;
  treatments: readonly ServiceRecord[];
};

export function ServiceCategoryPage({
  category,
  treatments,
}: ServiceCategoryPageProps) {
  return (
    <>
      <Section className="py-10 md:py-16" aria-labelledby="category-heading">
        <Container>
          <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
            <div className="exp-shell relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <CompositionOffset side="left" />
              <MediaFrame
                mediaKey={category.mediaKey}
                className="relative rounded-lg border border-border"
                sizes="(min-width: 64rem) 22rem, 100vw"
              />
            </div>
            <div className="min-w-0">
              <SectionHeading
                as="h1"
                id="category-heading"
                eyebrow="Areas of Care"
                title={category.title}
                description={category.summary}
              />
              <Prose className="mt-stack">
                <p>{category.description}</p>
              </Prose>
              <ActionRow
                primary={headerCta}
                secondary={{ href: "/services", label: "All services" }}
              />
            </div>
          </div>
        </Container>
      </Section>
      <TreatmentList
        headingId="category-treatments-heading"
        title="Treatments & services"
        description="Treatments in this area. After an exam, we discuss what is appropriate for your care."
        treatments={treatments}
      />
    </>
  );
}
