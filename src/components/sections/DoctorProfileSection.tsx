import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { ExperienceMedia } from "@/components/experience/ExperienceMedia";
import { ComposerStage } from "@/components/experience/ComposerStage";
import { CompositionOffset } from "@/components/experience/CompositionOffset";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PatientCta } from "@/components/sections/PatientCta";
import { headerCta } from "@/data/navigation";
import type { DoctorProfile, EducationItem } from "@/types/content";
import type { NavItem } from "@/types/navigation";

type DoctorProfileSectionProps = {
  profile: DoctorProfile;
  headingId?: string;
  primaryAction?: NavItem;
  secondaryAction?: NavItem;
};

function EducationItemRow({ item }: { item: EducationItem }) {
  const heading = item.institution ?? item.title;

  return (
    <div className="min-w-0 border-t border-border pt-4">
      <h3 className="text-sm font-semibold tracking-tight text-foreground">
        {heading}
      </h3>
      {item.institution ? (
        <p className="mt-1 text-sm leading-snug text-muted">
          {item.title}
          {item.year ? `, ${item.year}` : ""}
        </p>
      ) : item.year ? (
        <p className="mt-1 text-sm leading-snug text-muted">{item.year}</p>
      ) : null}
      {item.location ? (
        <p className="mt-1 text-sm leading-snug text-muted">{item.location}</p>
      ) : null}
    </div>
  );
}

export function DoctorProfileSection({
  profile,
  headingId = "doctor-heading",
  primaryAction,
  secondaryAction,
}: DoctorProfileSectionProps) {
  return (
    <>
      <section
        className="bg-background py-10 md:py-16"
        aria-labelledby={headingId}
      >
        <Container>
          <div className="grid min-w-0 items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(16rem,24rem)] lg:gap-16">
            <div className="min-w-0">
              <header className="flex min-w-0 flex-col gap-3">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                  {profile.role}
                </p>
                <h1
                  id={headingId}
                  className="max-w-[16ch] text-[length:calc(var(--theme-h1)*var(--theme-heading-scale,1))] font-semibold tracking-tight text-foreground sm:text-[length:calc(var(--theme-h1-lg)*var(--theme-heading-scale,1))] sm:leading-tight"
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
      </section>

      <Section tone="muted" aria-labelledby="about-doctor-heading">
        <Container>
          <SectionHeading
            as="h2"
            id="about-doctor-heading"
            title="About Dr. Matute"
          />
          <div className="mt-stack max-w-narrow space-y-5 text-[1.0625rem] leading-[1.8] text-foreground">
            {profile.biography.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="doctor-education-heading">
        <Container>
          <SectionHeading
            as="h2"
            id="doctor-education-heading"
            title="Education & training"
          />
          <ul className="mt-stack grid min-w-0 gap-x-10 gap-y-2 sm:grid-cols-2">
            {profile.education.map((item) => (
              <li key={item.title} className="min-w-0">
                <EducationItemRow item={item} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <PatientCta
        headingId="doctor-appointment-heading"
        eyebrow="Next step"
        title="Plan a visit"
        description="Request an appointment, or read more about the practice before you come in."
        primaryAction={primaryAction ?? headerCta}
        secondaryAction={secondaryAction}
      />
    </>
  );
}
