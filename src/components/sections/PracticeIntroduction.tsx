import { ActionRow } from "@/components/ui/ActionRow";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ExperienceMedia } from "@/components/experience/ExperienceMedia";
import { ComposerStage } from "@/components/experience/ComposerStage";
import { CompositionOffset } from "@/components/experience/CompositionOffset";
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
        <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,24rem)] lg:gap-16">
          <div className="min-w-0">
            <SectionHeading
              as="h2"
              id={headingId}
              eyebrow={eyebrow}
              title={title}
              description={description}
              measure="column"
            />
            {paragraphs && paragraphs.length > 0 ? (
              <Prose className="mt-stack">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Prose>
            ) : null}
            {facts && facts.length > 0 ? (
              <Card
                className="mt-stack-lg"
                data-visual-target="editorial-cards"
                data-surface-mix=""
              >
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
            <ComposerStage
              visualTarget="home-doctor-media"
              className="relative mx-auto w-full lg:mx-0 lg:max-w-none"
            >
              <CompositionOffset side="left" />
              <ExperienceMedia
                mediaKey={mediaKey}
                visualTarget="home-doctor-media"
                aspectRatio="3 / 4"
                className="relative rounded-lg border border-border shadow-sm"
                sizes="(min-width: 64rem) 24rem, 20rem"
              />
            </ComposerStage>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
