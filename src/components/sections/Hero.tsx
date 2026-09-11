import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ComposerStage } from "@/components/experience/ComposerStage";
import { HeroContentStage } from "@/components/experience/HeroContentStage";
import { HeroMedia } from "@/components/experience/HeroMedia";
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
  pillars,
  headingId = "home-heading",
}: HeroProps) {
  return (
    <section
      className="wcda-scope-surface home-hero-cinematic relative isolate flex w-full flex-col overflow-hidden border-b border-border"
      aria-labelledby={headingId}
    >
      {mediaKey ? (
        <ComposerStage
          visualTarget="home-hero-media"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <HeroMedia mediaKey={mediaKey} visualTarget="home-hero-media" />
        </ComposerStage>
      ) : null}
      <div className="home-hero-cinematic__veil" aria-hidden="true" />
      <Container className="home-hero-cinematic__content relative z-10 flex flex-1 flex-col justify-start">
        <HeroContentStage className="min-w-0" contentScope="home.hero">
          <div data-hero-module="content" className="bg-transparent">
            <SectionHeading
              as="h1"
              id={headingId}
              eyebrow={eyebrow}
              title={title}
              description={description}
              measure="column"
              className="bg-transparent"
              titleContentTarget="home.hero.heading"
              descriptionContentTarget="home.hero.description"
            />
          </div>
          <div data-hero-module="cta">
            <ActionRow
              primary={primaryAction}
              secondary={secondaryAction}
              primaryContentTarget="home.hero.primaryCta"
              secondaryContentTarget="home.hero.secondaryCta"
            />
          </div>
          <ul
            data-hero-module="benefits"
            data-content-target="home.hero.pillars"
            className="mt-8 flex min-w-0 flex-wrap gap-x-6 gap-y-2 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-heading sm:text-xs"
          >
            {pillars.map((label, index) => (
              <li
                key={`${index}-${label}`}
                data-content-target={`home.hero.pillar${index + 1}`}
              >
                {label}
              </li>
            ))}
          </ul>
        </HeroContentStage>
      </Container>
    </section>
  );
}
