import { ActionRow } from "@/components/ui/ActionRow";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
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
  mediaKey,
  headingId = "practice-heading",
}: PracticeIntroductionProps) {
  return (
    <Section tone="muted" aria-labelledby={headingId}>
      <Container>
        <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] lg:gap-12">
          <div className="min-w-0">
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
              </Card>
            ) : null}
            {cta ? <ActionRow primary={cta} /> : null}
          </div>
          {mediaKey ? (
            <div className="mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none">
              <MediaFrame
                mediaKey={mediaKey}
                aspectRatio="3 / 4"
                className="rounded-lg border border-border shadow-sm"
                sizes="(min-width: 64rem) 22rem, 20rem"
              />
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
