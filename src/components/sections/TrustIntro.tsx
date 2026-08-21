import { ActionRow } from "@/components/ui/ActionRow";
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
    <Section tone="muted" className="py-10 md:py-14" aria-labelledby={headingId}>
      <Container>
        <div className="max-w-narrow">
          <SectionHeading
            as="h2"
            id={headingId}
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <ActionRow primary={primaryAction} secondary={secondaryAction} />
        </div>
      </Container>
    </Section>
  );
}
