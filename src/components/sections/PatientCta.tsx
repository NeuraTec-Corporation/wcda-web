import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { VisualTargetId } from "@/config/experience";
import type { CallToActionContent } from "@/types/content";
import type { SectionTone } from "@/types/ui";

type PatientCtaProps = CallToActionContent & {
  headingId?: string;
  tone?: SectionTone;
  visualTarget?: VisualTargetId;
};

function PatientCtaLayout({
  headingId,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: Pick<
  PatientCtaProps,
  | "headingId"
  | "eyebrow"
  | "title"
  | "description"
  | "primaryAction"
  | "secondaryAction"
>) {
  return (
    <div
      className="grid min-w-0 w-full grid-cols-1 items-center gap-8 py-1 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12"
      style={{ display: "grid", alignItems: "center" }}
    >
      <SectionHeading
        as="h2"
        id={headingId}
        eyebrow={eyebrow}
        title={title}
        description={description}
        className="min-w-0"
      />
      <ActionRow
        primary={primaryAction}
        secondary={secondaryAction}
        className="mt-0 flex min-w-0 shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap"
      />
    </div>
  );
}

export function PatientCta({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  headingId = "patients-cta-heading",
  tone = "default",
  visualTarget,
}: PatientCtaProps) {
  const layout = (
    <PatientCtaLayout
      headingId={headingId}
      eyebrow={eyebrow}
      title={title}
      description={description}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
    />
  );

  return (
    <Section tone={tone} aria-labelledby={headingId}>
      <Container>
        {visualTarget ? (
          <div className="min-w-0" data-visual-target={visualTarget}>
            {layout}
          </div>
        ) : (
          layout
        )}
      </Container>
    </Section>
  );
}
