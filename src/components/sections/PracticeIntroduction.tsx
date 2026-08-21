import { ActionRow } from "@/components/ui/ActionRow";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProfileIntroductionContent } from "@/types/content";

type PracticeIntroductionProps = ProfileIntroductionContent & {
  headingId?: string;
};

export function PracticeIntroduction({
  eyebrow,
  title,
  description,
  paragraphs,
  facts,
  cta,
  headingId = "practice-heading",
}: PracticeIntroductionProps) {
  return (
    <Section tone="muted" aria-labelledby={headingId}>
      <Container>
        <SectionHeading
          as="h2"
          id={headingId}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        {paragraphs && paragraphs.length > 0 ? (
          <Prose className="mt-stack">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Prose>
        ) : null}
        {facts && facts.length > 0 ? (
          <Card className="mt-stack-lg bg-background">
            <dl className="grid min-w-0 gap-4 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} className="min-w-0">
                  <dt className="text-sm font-medium text-foreground">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
            {cta ? (
              <ActionRow
                primary={cta}
                className="mt-stack flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap"
              />
            ) : null}
          </Card>
        ) : cta ? (
          <ActionRow primary={cta} />
        ) : null}
      </Container>
    </Section>
  );
}
