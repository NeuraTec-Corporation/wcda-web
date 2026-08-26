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

export function AboutPage() {
  return (
    <>
      <PageIntro {...aboutPage} />
      <ContentBlockSection
        headingId={aboutPhilosophy.headingId}
        eyebrow={aboutPhilosophy.eyebrow}
        title={aboutPhilosophy.title}
        paragraphs={aboutPhilosophy.paragraphs}
        tone="muted"
        visualTarget="about-content"
      />
      <ContentBlockSection
        headingId={aboutIndependence.headingId}
        eyebrow={aboutIndependence.eyebrow}
        title={aboutIndependence.title}
        paragraphs={aboutIndependence.paragraphs}
        tone="surface"
      />
      <CardGridSection
        headingId="why-choose-heading"
        eyebrow={aboutWhyChoose.eyebrow}
        title={aboutWhyChoose.title}
        description={aboutWhyChoose.description}
        items={[...aboutWhyItems]}
        tone="default"
        variant="ruled"
      />
      <Section className="py-10 md:py-12" aria-labelledby="about-links-heading">
        <Container>
          <SectionHeading as="h2" id="about-links-heading" title="Learn more" />
          <ul className="mt-stack flex min-w-0 flex-col border-b border-border">
            {aboutRelatedLinks.map((item) => (
              <li key={item.href} className="border-t border-border">
                <TextLink href={item.href}>{item.label}</TextLink>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <PatientCta
        headingId="about-appointment-heading"
        eyebrow="Appointments"
        title="Request a visit"
        description="Request an appointment to choose a time that works for you."
        primaryAction={headerCta}
        secondaryAction={{ href: "/contact", label: "Contact the office" }}
      />
    </>
  );
}
