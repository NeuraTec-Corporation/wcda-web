import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { StepItem } from "@/types/content";
import type { SectionTone } from "@/types/ui";

type ContentBlockSectionProps = {
  headingId: string;
  eyebrow?: string;
  title: string;
  paragraphs: readonly string[];
  steps?: readonly StepItem[];
  tone?: SectionTone;
};

export function ContentBlockSection({
  headingId,
  eyebrow,
  title,
  paragraphs,
  steps,
  tone = "default",
}: ContentBlockSectionProps) {
  return (
    <Section tone={tone} aria-labelledby={headingId}>
      <Container>
        <SectionHeading as="h2" id={headingId} eyebrow={eyebrow} title={title} />
        <Prose className="mt-stack">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
        {steps && steps.length > 0 ? (
          <ol className="mt-stack-lg grid min-w-0 gap-4">
            {steps.map((step, index) => (
              <li key={step.title} className="min-w-0">
                <Card className="bg-background">
                  <p className="text-sm font-medium text-accent">
                    {index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </Card>
              </li>
            ))}
          </ol>
        ) : null}
      </Container>
    </Section>
  );
}
