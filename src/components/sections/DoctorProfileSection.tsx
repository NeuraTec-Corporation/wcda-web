import { Breadcrumb } from "@/components/editorial/Breadcrumb";
import { InfoCard, InfoCardGrid } from "@/components/editorial";
import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { ExperienceMedia } from "@/components/experience/ExperienceMedia";
import { ComposerStage } from "@/components/experience/ComposerStage";
import { CompositionOffset } from "@/components/experience/CompositionOffset";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PatientCta } from "@/components/sections/PatientCta";
import { headerCta } from "@/data/navigation";
import type { DoctorProfile } from "@/types/content";
import type { NavItem } from "@/types/navigation";
import { PublicationGate } from "@/components/content/PublicationGate";

type DoctorProfileSectionProps = {
  profile: DoctorProfile;
  headingId?: string;
  primaryAction?: NavItem;
  secondaryAction?: NavItem;
};

export function DoctorProfileSection({
  profile,
  headingId = "doctor-heading",
  primaryAction,
  secondaryAction,
}: DoctorProfileSectionProps) {
  return (
    <>
      <PublicationGate page="doctor" section="intro">
      <Section
        tone="default"
        className="py-10 md:py-16"
        aria-labelledby={headingId}
      >
        <Container>
          <Breadcrumb
            items={[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { label: profile.displayName },
            ]}
            className="mb-5"
          />
          <div className="grid min-w-0 items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(16rem,24rem)] lg:gap-16">
            <div className="min-w-0">
              <header className="flex min-w-0 flex-col gap-3">
                <p className="uppercase text-accent text-[length:var(--theme-eyebrow-size)] font-[var(--theme-eyebrow-weight)] tracking-[var(--theme-eyebrow-tracking)]">
                  {profile.role}
                </p>
                <h1
                  id={headingId}
                  className="max-w-[16ch] text-[length:calc(var(--theme-h1)*var(--theme-heading-scale,1))] font-semibold tracking-[var(--theme-h1-tracking)] leading-[var(--theme-h1-leading)] text-foreground sm:text-[length:calc(var(--theme-h1-lg)*var(--theme-heading-scale,1))] sm:leading-[var(--theme-h1-leading-lg)]"
                >
                  {profile.displayName}
                </h1>
              </header>
              <ActionRow
                primary={primaryAction}
                secondary={secondaryAction}
              />
            </div>
            <ComposerStage
              visualTarget="about-doctor-media"
              className="relative mx-auto w-full md:mx-0 md:max-w-none"
            >
              <CompositionOffset side="right" />
              <ExperienceMedia
                mediaKey={profile.mediaKey}
                visualTarget="about-doctor-media"
                aspectRatio="3 / 4"
                className="relative rounded-lg border border-border shadow-sm"
                sizes="(min-width: 64rem) 24rem, (min-width: 48rem) 20rem, 24rem"
              />
            </ComposerStage>
          </div>
        </Container>
      </Section>
      </PublicationGate>

      <PublicationGate page="doctor" section="biography">
      <Section tone="muted" aria-labelledby="about-doctor-heading">
        <Container>
          <SectionHeading
            as="h2"
            id="about-doctor-heading"
            title="About Dr. Matute"
          />
          <div className="mt-stack max-w-3xl space-y-5 text-[1.0625rem] leading-[1.8] text-foreground">
            {profile.biography.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </Section>
      </PublicationGate>

      <PublicationGate page="doctor" section="education">
      <Section aria-labelledby="doctor-education-heading">
        <Container>
          <SectionHeading
            as="h2"
            id="doctor-education-heading"
            title="Education & training"
          />
          <InfoCardGrid columns={2} className="mt-stack">
            {profile.education.map((item, index) => (
              <InfoCard
                key={item.title}
                headingId={`doctor-education-${index + 1}`}
                title={item.institution ?? item.title}
                index={index}
                headingLevel="h3"
              >
                {item.institution ? (
                  <p className="text-sm leading-snug text-muted">
                    {item.title}
                    {item.year ? `, ${item.year}` : ""}
                  </p>
                ) : item.year ? (
                  <p className="text-sm leading-snug text-muted">{item.year}</p>
                ) : null}
                {item.location ? (
                  <p className="mt-1 text-sm leading-snug text-muted">
                    {item.location}
                  </p>
                ) : null}
              </InfoCard>
            ))}
          </InfoCardGrid>
        </Container>
      </Section>
      </PublicationGate>

      <PublicationGate page="doctor" section="cta">
      <PatientCta
        headingId="doctor-appointment-heading"
        eyebrow="Next step"
        title="Plan a visit"
        description="Request an appointment, or read more about the practice before you come in."
        primaryAction={primaryAction ?? headerCta}
        secondaryAction={secondaryAction}
      />
      </PublicationGate>
    </>
  );
}
