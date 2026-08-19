import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CallToActionContent } from "@/types/content";

type TrustIntroProps = CallToActionContent & {
  headingId?: string;
};

export function TrustIntro({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  headingId = "intro-heading",
}: TrustIntroProps) {
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
        <div className="mt-stack-lg flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={primaryAction.href}>{primaryAction.label}</Button>
          {secondaryAction ? (
            <Button href={secondaryAction.href} variant="outline">
              {secondaryAction.label}
            </Button>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
