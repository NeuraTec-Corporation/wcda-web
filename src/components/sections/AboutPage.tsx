import {
  aboutIndependence,
  aboutPage,
  aboutPhilosophy,
  aboutRelatedLinks,
  aboutWhyChoose,
  aboutWhyItems,
} from "@/data/about";
import { CardGridSection } from "@/components/sections/CardGridSection";
import { ContentBlockSection } from "@/components/sections/ContentBlockSection";
import { PageIntro } from "@/components/sections/PageIntro";
import { PatientCta } from "@/components/sections/PatientCta";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { headerCta } from "@/data/navigation";
import { PublicationGate } from "@/components/content/PublicationGate";

export function AboutPage() {
  return (
    <>
      <PublicationGate page="about" section="intro">
        <PageIntro
          {...aboutPage}
          breadcrumb={[
            { href: "/", label: "Home" },
            { label: "About" },
          ]}
        />
      </PublicationGate>
      <PublicationGate page="about" section="philosophy">
        <ContentBlockSection
          headingId={aboutPhilosophy.headingId}
          eyebrow={aboutPhilosophy.eyebrow}
          title={aboutPhilosophy.title}
          paragraphs={aboutPhilosophy.paragraphs}
          tone="muted"
          visualTarget="about-content"
          mediaKey="91"
        />
      </PublicationGate>
      <PublicationGate page="about" section="independence">
        <ContentBlockSection
          headingId={aboutIndependence.headingId}
          eyebrow={aboutIndependence.eyebrow}
          title={aboutIndependence.title}
          paragraphs={aboutIndependence.paragraphs}
          tone="surface"
        />
      </PublicationGate>
      <PublicationGate page="about" section="whyChoose">
        <CardGridSection
          headingId="why-choose-heading"
          eyebrow={aboutWhyChoose.eyebrow}
          title={aboutWhyChoose.title}
          description={aboutWhyChoose.description}
          items={[...aboutWhyItems]}
          tone="default"
          columns={3}
        />
      </PublicationGate>
      <PublicationGate page="about" section="links">
        <Section className="py-10 md:py-12" aria-labelledby="about-links-heading">
          <Container>
            <SectionHeading as="h2" id="about-links-heading" title="Learn more" />
            <ul className="mt-stack grid min-w-0 gap-3 sm:grid-cols-2">
              {aboutRelatedLinks.map((item) => (
                <li key={item.href} className="min-w-0">
                  <div className="editorial-card px-4 py-3" data-visual-target="editorial-cards">
                    <TextLink href={item.href}>{item.label}</TextLink>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      </PublicationGate>
      <PublicationGate page="about" section="cta">
        <PatientCta
          headingId="about-appointment-heading"
          eyebrow="Appointments"
          title="Request a visit"
          description="Request an appointment to choose a time that works for you."
          primaryAction={headerCta}
          secondaryAction={{ href: "/contact", label: "Contact the office" }}
        />
      </PublicationGate>
    </>
  );
}
