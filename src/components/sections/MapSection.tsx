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

export function MapSection() {
  const maps = getPublicGoogleMaps();
  const address = getPublicAddress();
  const directions = getMapsDirectionsCta();
  const reviews = getGoogleReviewsCta();
  const headingId = "contact-map-heading";
  const title = maps?.title ?? siteConfig.name;
  const embedUrl = maps?.embedUrl;

  return (
    <section
      className="bg-surface-muted pt-section md:pt-section-lg"
      aria-labelledby={headingId}
    >
      <Container>
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
          <ActionRow primary={directions} secondary={reviews} />
        ) : null}
      </Container>
      <div className="relative mt-stack h-64 w-full overflow-hidden md:h-80 lg:h-[26rem]">
        {embedUrl ? (
          <iframe
            title={`Map of ${title}`}
            src={embedUrl}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="flex h-full min-h-0 items-center justify-center border-t border-border bg-placeholder px-gutter">
            <div className="max-w-sm text-center">
              <p className="text-sm font-medium text-foreground sm:text-base">
                {address ? address.line1 : siteConfig.identity.label}
              </p>
              {address ? (
                <p className="mt-1 text-sm text-muted">{address.line2}</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
