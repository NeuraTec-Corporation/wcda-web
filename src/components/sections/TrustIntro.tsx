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
    <Section tone="muted" className="py-10 md:py-16" aria-labelledby={headingId}>
      <Container>
        <div className="grid min-w-0 items-end gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <SectionHeading
            as="h2"
            id={headingId}
            eyebrow={eyebrow}
            title={title}
          />
          <div className="min-w-0 max-w-prose">
            <p className="text-base leading-[1.75] text-muted">{description}</p>
            <ActionRow primary={primaryAction} secondary={secondaryAction} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
