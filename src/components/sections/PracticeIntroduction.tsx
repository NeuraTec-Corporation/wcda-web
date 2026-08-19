import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PracticeIntroductionContent } from "@/types/content";

type PracticeIntroductionProps = PracticeIntroductionContent & {
  headingId?: string;
};

export function PracticeIntroduction({
  eyebrow,
  title,
  description,
  placeholderTitle,
  placeholderBody,
  portraitLabel,
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
        <div className="mt-stack-lg grid min-w-0 gap-stack md:grid-cols-[minmax(0,16rem)_1fr] md:items-start">
          <div
            aria-hidden="true"
            className="flex aspect-[4/5] max-w-64 items-center justify-center rounded-lg border border-dashed border-border bg-surface text-sm text-muted"
          >
            {portraitLabel}
          </div>
          <Card className="bg-background">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {placeholderTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {placeholderBody}
            </p>
            {cta ? (
              <div className="mt-stack">
                <Button href={cta.href} variant="outline">
                  {cta.label}
                </Button>
              </div>
            ) : null}
          </Card>
        </div>
      </Container>
    </Section>
  );
}
