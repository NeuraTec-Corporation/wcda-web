import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ComposerStage } from "@/components/experience/ComposerStage";
import { siteConfig } from "@/config/site";
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
    <Section className="py-10 md:py-16" aria-labelledby={headingId}>
      <Container>
        <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,30rem)] lg:gap-16">
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
            <ComposerStage
              visualTarget="home-hero-media"
              className="relative mx-auto w-full lg:mx-0 lg:max-w-none"
            >
              <MediaFrame
                mediaKey={mediaKey}
                visualTarget="home-hero-media"
                className="relative rounded-lg border border-border shadow-sm"
                sizes="(min-width: 64rem) 30rem, 100vw"
              />
              <p className="mt-3 text-xs tracking-[0.04em] text-muted">
                {siteConfig.identity.label}
              </p>
            </ComposerStage>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
