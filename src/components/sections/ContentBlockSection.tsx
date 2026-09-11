import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ComposerMediaWell } from "@/components/experience/ComposerMediaWell";
import { InfoCard, InfoCardGrid } from "@/components/editorial";
import { OptionalMediaPanel } from "@/components/editorial/OptionalMediaPanel";
import type { VisualTargetId } from "@/config/experience";
import type { StepItem } from "@/types/content";
import type { SectionTone } from "@/types/ui";
import { cn } from "@/lib/cn";

type ContentBlockSectionProps = {
  headingId: string;
  eyebrow?: string;
  title: string;
  paragraphs: readonly string[];
  steps?: readonly StepItem[];
  tone?: SectionTone;
  visualTarget?: VisualTargetId;
  mediaKey?: string;
};

export function ContentBlockSection({
  headingId,
  eyebrow,
  title,
  paragraphs,
  steps,
  tone = "default",
  visualTarget,
  mediaKey,
}: ContentBlockSectionProps) {
  const showMedia = Boolean(visualTarget || mediaKey);

  return (
    <Section tone={tone} aria-labelledby={headingId}>
      <Container>
        <div
          className={cn(
            "grid min-w-0 items-start gap-10",
            showMedia && "lg:grid-cols-[minmax(0,1.15fr)_minmax(14rem,24rem)] lg:gap-16",
          )}
        >
          <div className="min-w-0">
            <SectionHeading
              as="h2"
              id={headingId}
              eyebrow={eyebrow}
              title={title}
              measure="column"
            />
            <Prose className="mt-stack max-w-none">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
          </div>
          {showMedia ? (
            <div className="min-w-0">
              {mediaKey && visualTarget ? (
                <OptionalMediaPanel
                  mediaKey={mediaKey}
                  visualTarget={visualTarget}
                />
              ) : visualTarget ? (
                <ComposerMediaWell visualTarget={visualTarget} />
              ) : (
                <OptionalMediaPanel mediaKey={mediaKey} />
              )}
            </div>
          ) : null}
        </div>
        {steps && steps.length > 0 ? (
          <InfoCardGrid
            columns={steps.length > 2 ? 3 : 2}
            className="mt-stack-lg"
          >
            {steps.map((step, index) => (
              <InfoCard
                key={step.title}
                headingId={`${headingId}-step-${index + 1}`}
                title={step.title}
                index={index}
                headingLevel="h3"
              >
                <p className="text-base leading-relaxed text-muted">
                  {step.description}
                </p>
              </InfoCard>
            ))}
          </InfoCardGrid>
        ) : null}
      </Container>
    </Section>
  );
}
