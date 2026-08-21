import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
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
      <Section aria-labelledby="category-heading">
        <Container>
          <div className="grid min-w-0 gap-stack lg:grid-cols-[minmax(0,18rem)_1fr] lg:items-start">
            <MediaFrame
              mediaKey={category.mediaKey}
              className="max-w-md rounded-lg"
              sizes="(min-width: 64rem) 18rem, 100vw"
            />
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
