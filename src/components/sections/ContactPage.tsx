import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { HoursList } from "@/components/ui/HoursList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { ContactForm } from "@/components/sections/ContactForm";
import {
  contactIntro,
  getPublicAddress,
  getPublicEmail,
  getPublicHours,
  getPublicPhone,
  getPublicSocialLinks,
} from "@/data/contact";
import { headerCta } from "@/data/navigation";
import type { NavItem } from "@/types/navigation";

type ContactPageProps = {
  secondaryAction?: NavItem;
};

export function ContactPage({ secondaryAction }: ContactPageProps) {
  const address = getPublicAddress();
  const phone = getPublicPhone();
  const email = getPublicEmail();
  const hours = getPublicHours();
  const socialLinks = getPublicSocialLinks();

  return (
    <Section className="py-10 md:py-14" aria-labelledby={contactIntro.headingId}>
      <Container>
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <SectionHeading
              as="h1"
              id={contactIntro.headingId}
              eyebrow={contactIntro.eyebrow}
              title={contactIntro.title}
              description={contactIntro.description}
            />
            <dl className="mt-stack-lg grid min-w-0 gap-5">
              {address ? (
                <div className="min-w-0">
                  <dt className="text-sm font-medium text-foreground">
                    Address
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">
                    <TextLink
                      href={address.mapsHref}
                      className="min-h-0 text-sm font-normal text-muted hover:text-primary"
                    >
                      {address.line1}
                      <br />
                      {address.line2}
                    </TextLink>
                  </dd>
                </div>
              ) : null}
              {phone ? (
                <div className="min-w-0">
                  <dt className="text-sm font-medium text-foreground">Phone</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">
                    <TextLink
                      href={phone.href}
                      className="min-h-0 text-sm font-normal text-muted hover:text-primary"
                    >
                      {phone.display}
                    </TextLink>
                  </dd>
                </div>
              ) : null}
              {email ? (
                <div className="min-w-0">
                  <dt className="text-sm font-medium text-foreground">Email</dt>
                  <dd className="mt-1 break-words text-sm leading-relaxed text-muted">
                    <TextLink
                      href={email.href}
                      className="min-h-0 text-sm font-normal text-muted hover:text-primary"
                    >
                      {email.display}
                    </TextLink>
                  </dd>
                </div>
              ) : null}
              {hours ? (
                <div className="min-w-0">
                  <dt className="text-sm font-medium text-foreground">Hours</dt>
                  <dd>
                    <HoursList
                      entries={hours.entries}
                      lines={hours.lines}
                      summary={hours.summary}
                    />
                  </dd>
                </div>
              ) : null}
              {socialLinks.length > 0 ? (
                <div className="min-w-0">
                  <dt className="text-sm font-medium text-foreground">
                    Social
                  </dt>
                  <dd className="mt-1 flex min-w-0 flex-col">
                    {socialLinks.map((link) => (
                      <TextLink
                        key={link.platform}
                        href={link.url}
                        className="min-h-0 text-sm font-normal text-muted hover:text-primary"
                      >
                        {link.label}
                      </TextLink>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
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
