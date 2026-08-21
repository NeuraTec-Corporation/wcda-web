import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
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
        <ul className="mt-stack grid min-w-0 gap-x-8 sm:grid-cols-2">
          {treatments.map((treatment) => (
            <li
              key={treatment.slug}
              id={treatment.slug}
              className="min-w-0 scroll-mt-28 border-t border-border"
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

type TreatmentDetailProps = {
  title: string;
  intro: string;
  sections: readonly { title: string; description: string }[];
};

export function TreatmentDetail({
  title,
  intro,
  sections,
}: TreatmentDetailProps) {
  return (
    <article>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      <Prose className="mt-stack">
        <p>{intro}</p>
      </Prose>
      {sections.map((section) => (
        <section key={section.title} className="mt-stack-lg">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {section.title}
          </h2>
          <p className="mt-2 max-w-narrow text-base leading-relaxed text-muted">
            {section.description}
          </p>
        </section>
      ))}
    </article>
  );
}
