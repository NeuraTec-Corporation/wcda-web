import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { HoursList } from "@/components/ui/HoursList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { getPublicHours } from "@/data/contact";
import type { ContactPreviewContent } from "@/types/content";
import type { SectionTone } from "@/types/ui";

type ContactPreviewProps = ContactPreviewContent & {
  headingId?: string;
  tone?: SectionTone;
};

export function ContactPreview({
  eyebrow,
  title,
  description,
  details,
  primaryAction,
  secondaryAction,
  headingId = "contact-preview-heading",
  tone = "surface",
}: ContactPreviewProps) {
  const hours = getPublicHours();
  const previewDetails = details.filter(
    (detail) => detail.label !== "Office hours",
  );

  return (
    <Section tone={tone} aria-labelledby={headingId}>
      <Container>
        <div className="grid min-w-0 items-start gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <SectionHeading
            as="h2"
            id={headingId}
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <div className="min-w-0">
            {previewDetails.length > 0 || hours ? (
              <dl className="divide-y divide-border border-y border-border">
                {previewDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className="grid min-w-0 gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6"
                  >
                    <dt className="text-sm font-medium text-foreground">
                      {detail.label}
                    </dt>
                    <dd className="break-words text-sm leading-relaxed text-muted">
                      {detail.href ? (
                        <TextLink
                          href={detail.href}
                          className="min-h-0 text-sm font-normal text-muted hover:text-primary"
                        >
                          {detail.value}
                        </TextLink>
                      ) : (
                        detail.value
                      )}
                    </dd>
                  </div>
                ))}
                {hours ? (
                  <div className="grid min-w-0 gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <dt className="text-sm font-medium text-foreground">
                      Office hours
                    </dt>
                    <dd>
                      <HoursList
                        entries={hours.entries}
                        lines={hours.lines}
                        summary={hours.summary}
                        className="grid min-w-0 gap-2 text-sm leading-relaxed text-muted"
                      />
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
            <ActionRow primary={primaryAction} secondary={secondaryAction} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
