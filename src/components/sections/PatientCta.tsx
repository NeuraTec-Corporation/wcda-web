import { Button } from "@/components/ui/Button";
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
          <div className="mt-stack-lg flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={primaryAction.href}>{primaryAction.label}</Button>
            {secondaryAction ? (
              <Button href={secondaryAction.href} variant="outline">
                {secondaryAction.label}
              </Button>
            ) : null}
          </div>
        </Card>
      </Container>
    </Section>
  );
}
