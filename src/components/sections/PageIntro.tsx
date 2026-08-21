import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PageContent } from "@/types/content";
import type { SectionTone } from "@/types/ui";

type PageIntroProps = PageContent & {
  tone?: SectionTone;
};

export function PageIntro({
  headingId,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  tone = "default",
}: PageIntroProps) {
  return (
    <Section tone={tone} aria-labelledby={headingId}>
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
