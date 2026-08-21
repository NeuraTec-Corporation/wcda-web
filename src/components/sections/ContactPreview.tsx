import { ActionRow } from "@/components/ui/ActionRow";
import { Card } from "@/components/ui/Card";
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
        <SectionHeading
          as="h2"
          id={headingId}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        {previewDetails.length > 0 || hours ? (
          <Card className="mt-stack-lg bg-background">
            <dl className="grid min-w-0 gap-5 sm:grid-cols-2">
              {previewDetails.map((detail) => (
                <div key={detail.label} className="min-w-0">
                  <dt className="text-sm font-medium text-foreground">
                    {detail.label}
                  </dt>
                  <dd className="mt-1 break-words text-sm leading-relaxed text-muted">
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
                <div className="min-w-0 sm:col-span-2">
                  <dt className="text-sm font-medium text-foreground">
                    Office hours
                  </dt>
                  <dd>
                    <HoursList
                      entries={hours.entries}
                      lines={hours.lines}
                      summary={hours.summary}
                    />
                  </dd>
                </div>
              ) : null}
            </dl>
          </Card>
        ) : null}
        <ActionRow primary={primaryAction} secondary={secondaryAction} />
      </Container>
    </Section>
  );
}
