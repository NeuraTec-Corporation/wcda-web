import { ActionRow } from "@/components/ui/ActionRow";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CallToActionContent } from "@/types/content";

type PatientCtaProps = CallToActionContent & {
  headingId?: string;
};

export function PatientCta({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  headingId = "patients-cta-heading",
}: PatientCtaProps) {
  return (
    <Section aria-labelledby={headingId}>
      <Container>
        <Card className="bg-surface-muted p-6 sm:p-8">
          <SectionHeading
            as="h2"
            id={headingId}
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <ActionRow primary={primaryAction} secondary={secondaryAction} />
        </Card>
      </Container>
    </Section>
  );
}
