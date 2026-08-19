import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
  cta,
  headingId = "contact-preview-heading",
  tone = "surface",
}: ContactPreviewProps) {
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
        <Card className="mt-stack-lg bg-background">
          <dl className="grid min-w-0 gap-4 sm:grid-cols-2">
            {details.map((detail) => (
              <div key={detail.label} className="min-w-0">
                <dt className="text-sm font-medium text-foreground">
                  {detail.label}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
        {cta ? (
          <div className="mt-stack-lg">
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
