import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TreatmentItem } from "@/components/sections/TreatmentItem";
import { getTreatmentHref } from "@/data/services";
import type { ServiceRecord } from "@/types/content";
import type { SectionTone } from "@/types/ui";

type TreatmentListProps = {
  headingId: string;
  title: string;
  description?: string;
  treatments: readonly ServiceRecord[];
  tone?: SectionTone;
};

export function TreatmentList({
  headingId,
  title,
  description,
  treatments,
  tone = "muted",
}: TreatmentListProps) {
  if (treatments.length === 0) {
    return null;
  }

  return (
    <Section tone={tone} aria-labelledby={headingId}>
      <Container>
        <SectionHeading
          as="h2"
          id={headingId}
          title={title}
          description={description}
        />
        <ul className="mt-stack grid min-w-0 gap-3 sm:grid-cols-2">
          {treatments.map((treatment) => (
            <li
              key={treatment.slug}
              id={treatment.slug}
              className="editorial-card min-w-0 scroll-mt-28 px-2"
              data-visual-target="editorial-cards"
            >
              <TreatmentItem
                title={treatment.title}
                mediaKey={treatment.mediaKey}
                href={getTreatmentHref(treatment)}
                status={treatment.status}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
