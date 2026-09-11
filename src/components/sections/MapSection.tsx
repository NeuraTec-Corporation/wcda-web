import { Section } from "@/components/ui/Section";
import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import {
  getGoogleReviewsCta,
  getMapsDirectionsCta,
  getPublicAddress,
  getPublicGoogleMaps,
} from "@/data/contact";
import { ContactMediaStage } from "@/components/experience/ContactMediaStage";

export function MapSection() {
  const maps = getPublicGoogleMaps();
  const address = getPublicAddress();
  const directions = getMapsDirectionsCta();
  const reviews = getGoogleReviewsCta();
  const headingId = "contact-map-heading";
  const title = maps?.title ?? siteConfig.name;
  const embedUrl = maps?.embedUrl;
  const mapTitle = address
    ? `Google Map of ${title} at ${address.formatted}`
    : `Google Map of ${title}`;

  return (
    <Section tone="muted" aria-labelledby={headingId}>
      <Container>
        <div className="grid min-w-0 items-end gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
          <SectionHeading
            as="h2"
            id={headingId}
            eyebrow="Location"
            title={title}
            description={
              address
                ? `${address.line1}, ${address.line2}`
                : siteConfig.identity.label
            }
          />
          {directions || reviews ? (
            <ActionRow
              primary={directions}
              secondary={reviews}
              className="mt-0 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap"
            />
          ) : null}
        </div>
        <ContactMediaStage className="relative mt-stack h-72 w-full overflow-hidden rounded-lg border border-border md:h-96 lg:h-[28rem]">
          {embedUrl ? (
            <iframe
              title={mapTitle}
              src={embedUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="media-placeholder-panel flex h-full min-h-0 items-center justify-center px-gutter">
              <div className="max-w-sm border border-border/70 px-6 py-5 text-center">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-placeholder-ink">
                  {siteConfig.shortName}
                </p>
                <p className="mt-3 text-sm font-medium text-foreground sm:text-base">
                  {address ? address.line1 : siteConfig.identity.label}
                </p>
                {address ? (
                  <p className="mt-1 text-sm text-muted">{address.line2}</p>
                ) : null}
              </div>
            </div>
          )}
        </ContactMediaStage>
      </Container>
    </Section>
  );
}
