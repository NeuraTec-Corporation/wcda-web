import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig } from "@/config/site";
import { contactIntro, getPublicContactDetails } from "@/data/contact";
import { headerCta } from "@/data/navigation";
import type { NavItem } from "@/types/navigation";

type ContactPageProps = {
  secondaryAction?: NavItem;
};

export function ContactPage({ secondaryAction }: ContactPageProps) {
  const details = getPublicContactDetails();

  return (
    <Section aria-labelledby={contactIntro.headingId}>
      <Container>
        <div className="grid min-w-0 gap-stack lg:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] lg:items-start">
          <div className="min-w-0">
            <SectionHeading
              as="h1"
              id={contactIntro.headingId}
              eyebrow={contactIntro.eyebrow}
              title={contactIntro.title}
              description={contactIntro.description}
            />
            <p className="mt-stack text-sm font-medium text-foreground">
              {siteConfig.identity.label}
            </p>
            {details.length > 0 ? (
              <dl className="mt-stack grid min-w-0 gap-4">
                {details.map((detail) => (
                  <div key={detail.label} className="min-w-0">
                    <dt className="text-sm font-medium text-foreground">
                      {detail.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted">
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
              </dl>
            ) : null}
            <ActionRow
              primary={headerCta}
              secondary={secondaryAction}
            />
          </div>
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
