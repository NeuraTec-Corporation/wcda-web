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
import { ComposerStage } from "@/components/experience/ComposerStage";
import { CompositionOffset } from "@/components/experience/CompositionOffset";
import { Container } from "@/components/ui/Container";
import { ExperienceMedia } from "@/components/experience/ExperienceMedia";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PublicationGate } from "@/components/content/PublicationGate";

export function TechnologyPage() {
  const records = getConfirmedTechnology();

  return (
    <>
      <PublicationGate page="technology" section="intro">
        <PageIntro
          {...technologyPage}
          breadcrumb={[
            { href: "/", label: "Home" },
            { label: technologyPage.title },
          ]}
        />
      </PublicationGate>
      <PublicationGate page="technology" section="details">
        <ContentBlockSection
          headingId="technology-details-heading"
          title="How we use technology"
          paragraphs={technologyParagraphs}
          tone="muted"
          visualTarget={records.length > 0 ? "technology-media" : undefined}
          mediaKey={records.length > 0 ? "80" : undefined}
        />
      </PublicationGate>
      <PublicationGate page="technology" section="tools">
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
            <ComposerStage
              visualTarget="technology-media"
              className="relative mt-stack w-full"
            >
              <CompositionOffset side="right" />
              <ExperienceMedia
                mediaKey="80"
                visualTarget="technology-media"
                className="relative rounded-lg border border-border"
                sizes="(min-width: 64rem) 48rem, 100vw"
              />
            </ComposerStage>
          </Container>
        </Section>
      )}
      </PublicationGate>
      <PublicationGate page="technology" section="cta">
        <PatientCta
        headingId="technology-appointment-heading"
        eyebrow="Appointments"
        title="Questions about your visit"
        description="Request an appointment if you would like to know more about how a visit is planned."
        primaryAction={headerCta}
        secondaryAction={{ href: "/contact", label: "Contact the office" }}
      />
      </PublicationGate>
    </>
  );
}
