import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { HoursList } from "@/components/ui/HoursList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialIconLink } from "@/components/experience/SocialIconLink";
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
    <Section className="py-10 md:py-16" aria-labelledby={contactIntro.headingId}>
      <Container>
        <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)] lg:items-start lg:gap-16">
          <div className="min-w-0">
            <SectionHeading
              as="h1"
              id={contactIntro.headingId}
              eyebrow={contactIntro.eyebrow}
              title={contactIntro.title}
              description={contactIntro.description}
            />
            <dl className="mt-stack-lg divide-y divide-border border-y border-border">
              {address ? (
                <div className="grid min-w-0 gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <dt className="text-sm font-medium text-foreground">
                    Address
                  </dt>
                  <dd className="text-sm leading-relaxed text-muted">
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
                <div className="grid min-w-0 gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <dt className="text-sm font-medium text-foreground">Phone</dt>
                  <dd className="text-sm leading-relaxed text-muted">
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
                <div className="grid min-w-0 gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <dt className="text-sm font-medium text-foreground">Email</dt>
                  <dd className="break-words text-sm leading-relaxed text-muted">
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
                <div className="grid min-w-0 gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <dt className="text-sm font-medium text-foreground">Hours</dt>
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
              {socialLinks.length > 0 ? (
                <div className="grid min-w-0 gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <dt className="text-sm font-medium text-foreground">
                    Instagram
                  </dt>
                  <dd className="flex min-w-0 flex-col">
                    {socialLinks.map((link) => (
                      <SocialIconLink
                        key={link.platform}
                        href={link.url}
                        label={link.label}
                        platform={link.platform}
                        className="min-h-0 text-sm font-normal text-muted"
                      />
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
