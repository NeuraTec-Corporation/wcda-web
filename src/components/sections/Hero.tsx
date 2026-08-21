import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
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
  mediaKey,
  headingId = "home-heading",
}: HeroProps) {
  return (
    <Section className="py-10 md:py-14" aria-labelledby={headingId}>
      <Container>
        <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] lg:gap-12">
          <div className="min-w-0">
            <SectionHeading
              as="h1"
              id={headingId}
              eyebrow={eyebrow}
              title={title}
              description={description}
            />
            <ActionRow primary={primaryAction} secondary={secondaryAction} />
          </div>
          {mediaKey ? (
            <MediaFrame
              mediaKey={mediaKey}
              className="rounded-lg border border-border shadow-sm"
              sizes="(min-width: 64rem) 28rem, 100vw"
            />
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
