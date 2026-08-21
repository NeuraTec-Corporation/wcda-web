import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import {
  getGoogleReviewsCta,
  getMapsDirectionsCta,
  getPublicGoogleMaps,
} from "@/data/contact";

export function MapSection() {
  const maps = getPublicGoogleMaps();
  const directions = getMapsDirectionsCta();
  const reviews = getGoogleReviewsCta();
  const headingId = "contact-map-heading";
  const title = maps?.title ?? siteConfig.identity.label;
  const embedUrl = maps?.embedUrl;

  return (
    <section className="bg-surface-muted pt-section md:pt-section-lg" aria-labelledby={headingId}>
      <Container>
        <SectionHeading
          as="h2"
          id={headingId}
          eyebrow="Location"
          title={title}
        />
        {directions || reviews ? (
          <ActionRow primary={directions} secondary={reviews} />
        ) : null}
      </Container>
      <div className="relative mt-stack h-64 w-full overflow-hidden md:h-96 lg:h-[28rem]">
        {embedUrl ? (
          <iframe
            title={`Map of ${title}`}
            src={embedUrl}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="flex h-full min-h-0 items-center justify-center border-t border-border bg-surface px-gutter">
            <p className="text-center text-sm font-medium text-muted sm:text-base">
              {siteConfig.identity.label}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
