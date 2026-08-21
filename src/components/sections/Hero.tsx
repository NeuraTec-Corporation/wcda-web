import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HeroContent } from "@/types/content";

type HeroProps = HeroContent & {
  headingId?: string;
};

export function Hero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  headingId = "home-heading",
}: HeroProps) {
  return (
    <Section aria-labelledby={headingId}>
      <Container>
        <SectionHeading
          as="h1"
          id={headingId}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <ActionRow primary={primaryAction} secondary={secondaryAction} />
      </Container>
    </Section>
  );
}
