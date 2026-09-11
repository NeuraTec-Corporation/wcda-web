import { Breadcrumb } from "@/components/editorial/Breadcrumb";
import { InfoCard, InfoCardGrid } from "@/components/editorial";
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
import { PublicationGate } from "@/components/content/PublicationGate";

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
            <PublicationGate page="contact" section="intro">
              <Breadcrumb
                items={[
                  { href: "/", label: "Home" },
                  { label: contactIntro.title },
                ]}
                className="mb-5"
              />
              <SectionHeading
                as="h1"
                id={contactIntro.headingId}
                eyebrow={contactIntro.eyebrow}
                title={contactIntro.title}
                description={contactIntro.description}
                measure="column"
              />
            </PublicationGate>
            <PublicationGate page="contact" section="details">
            <InfoCardGrid columns={2} className="mt-stack-lg">
              {address ? (
                <InfoCard
                  headingId="contact-address-heading"
                  title="Address"
                  sectionId="overview"
                  headingLevel="h2"
                >
                  <p className="text-sm leading-relaxed text-muted">
                    <TextLink
                      href={address.mapsHref}
                      className="min-h-0 text-sm font-normal text-muted hover:text-primary"
                    >
                      {address.line1}
                      <br />
                      {address.line2}
                    </TextLink>
                  </p>
                </InfoCard>
              ) : null}
              {phone ? (
                <InfoCard
                  headingId="contact-phone-heading"
                  title="Phone"
                  sectionId="whatToExpect"
                  index={1}
                  headingLevel="h2"
                >
                  <p className="text-sm leading-relaxed text-muted">
                    <TextLink
                      href={phone.href}
                      className="min-h-0 text-sm font-normal text-muted hover:text-primary"
                    >
                      {phone.display}
                    </TextLink>
                  </p>
                </InfoCard>
              ) : null}
              {email ? (
                <InfoCard
                  headingId="contact-email-heading"
                  title="Email"
                  sectionId="maintenance"
                  index={2}
                  headingLevel="h2"
                >
                  <p className="break-words text-sm leading-relaxed text-muted">
                    <TextLink
                      href={email.href}
                      className="min-h-0 text-sm font-normal text-muted hover:text-primary"
                    >
                      {email.display}
                    </TextLink>
                  </p>
                </InfoCard>
              ) : null}
              {hours ? (
                <InfoCard
                  headingId="contact-hours-heading"
                  title="Hours"
                  sectionId="howItWorks"
                  index={3}
                  headingLevel="h2"
                >
                  <HoursList
                    entries={hours.entries}
                    lines={hours.lines}
                    summary={hours.summary}
                    className="grid min-w-0 gap-2 text-sm leading-relaxed text-muted"
                  />
                </InfoCard>
              ) : null}
              {socialLinks.length > 0 ? (
                <InfoCard
                  headingId="contact-social-heading"
                  title="Instagram"
                  sectionId="relatedTreatments"
                  index={4}
                  headingLevel="h2"
                >
                  <div className="flex min-w-0 flex-col">
                    {socialLinks.map((link) => (
                      <SocialIconLink
                        key={link.platform}
                        href={link.url}
                        label={link.label}
                        platform={link.platform}
                        className="min-h-0 text-sm font-normal text-muted"
                      />
                    ))}
                  </div>
                </InfoCard>
              ) : null}
            </InfoCardGrid>
            <ActionRow
              primary={headerCta}
              secondary={secondaryAction}
            />
        </PublicationGate>
          </div>
          <PublicationGate page="contact" section="form">
          <ContactForm />
          </PublicationGate>
        </div>
      </Container>
    </Section>
  );
}
