import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { VisualTargetId } from "@/config/experience";
import { ComposerMediaWell } from "@/components/experience/ComposerMediaWell";
import type { StepItem } from "@/types/content";
import type { SectionTone } from "@/types/ui";

type ContentBlockSectionProps = {
  headingId: string;
  eyebrow?: string;
  title: string;
  paragraphs: readonly string[];
  steps?: readonly StepItem[];
  tone?: SectionTone;
  visualTarget?: VisualTargetId;
};

export function ContentBlockSection({
  headingId,
  eyebrow,
  title,
  paragraphs,
  steps,
  tone = "default",
  visualTarget,
}: ContentBlockSectionProps) {
  return (
    <Section
      tone={tone}
      aria-labelledby={headingId}
    >
      <Container>
        <SectionHeading as="h2" id={headingId} eyebrow={eyebrow} title={title} />
        {visualTarget ? (
          <ComposerMediaWell visualTarget={visualTarget} />
        ) : null}
        <Prose className="mt-stack">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
        {steps && steps.length > 0 ? (
          <ol className="mt-stack-lg max-w-narrow">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="grid min-w-0 grid-cols-[2rem_minmax(0,1fr)] gap-3 border-t border-border py-4"
              >
                <p className="text-sm font-medium tabular-nums text-accent">
                  {index + 1}
                </p>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        ) : null}
      </Container>
    </Section>
  );
}
