import { headerCta } from "@/data/navigation";
import {
  getConfirmedTechnology,
  technologyPage,
  technologyParagraphs,
} from "@/data/technology";
import { CardGridSection } from "@/components/sections/CardGridSection";
import { ContentBlockSection } from "@/components/sections/ContentBlockSection";
import { PageIntro } from "@/components/sections/PageIntro";
import { PatientCta } from "@/components/sections/PatientCta";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TechnologyPage() {
  const records = getConfirmedTechnology();

  return (
    <>
      <PageIntro {...technologyPage} />
      <ContentBlockSection
        headingId="technology-details-heading"
        title="How we use technology"
        paragraphs={technologyParagraphs}
        tone="muted"
      />
      {records.length > 0 ? (
        <CardGridSection
          headingId="technology-records-heading"
          title="Tools we may use during a visit"
          description="When a tool is used during your appointment, we can explain why it is part of the visit."
          items={records.map((record) => ({
            title: record.title,
            description: record.summary,
          }))}
          tone="surface"
          cardClassName="bg-background"
        />
      ) : (
        <Section tone="surface" aria-labelledby="technology-media-heading">
          <Container>
            <SectionHeading
              as="h2"
              id="technology-media-heading"
              title="At the practice"
              description="Imaging and other tools are selected for the needs of the visit. Confirmed equipment will appear here as it is published."
            />
            <MediaFrame
              mediaKey="80"
              className="mt-stack max-w-3xl rounded-lg border border-border"
              sizes="(min-width: 64rem) 48rem, 100vw"
            />
          </Container>
        </Section>
      )}
      <PatientCta
        headingId="technology-appointment-heading"
        eyebrow="Appointments"
        title="Questions about your visit"
        description="Request an appointment if you would like to know more about how a visit is planned."
        primaryAction={headerCta}
        secondaryAction={{ href: "/contact", label: "Contact the office" }}
      />
    </>
  );
}
