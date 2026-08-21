import { ActionRow } from "@/components/ui/ActionRow";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
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

function EducationCard({ item }: { item: EducationItem }) {
  const heading = item.institution ?? item.title;

  return (
    <Card className="flex h-full min-w-0 flex-col bg-background p-5">
      <h3 className="text-base font-semibold tracking-tight text-foreground">
        {heading}
      </h3>
      {item.institution ? (
        <p className="mt-2 text-sm leading-snug text-muted">
          {item.title}
          {item.year ? `, ${item.year}` : ""}
        </p>
      ) : item.year ? (
        <p className="mt-2 text-sm leading-snug text-muted">{item.year}</p>
      ) : null}
      {item.location ? (
        <p className="mt-1 text-sm leading-snug text-muted">{item.location}</p>
      ) : null}
    </Card>
  );
}

export function DoctorProfileSection({
  profile,
  headingId = "doctor-heading",
  primaryAction,
  secondaryAction,
}: DoctorProfileSectionProps) {
  const biographyMidpoint = Math.ceil(profile.biography.length / 2);
  const biographyStart = profile.biography.slice(0, biographyMidpoint);
  const biographyEnd = profile.biography.slice(biographyMidpoint);

  return (
    <>
      <section
        className="bg-background py-10 md:py-12 lg:py-16"
        aria-labelledby={headingId}
      >
        <Container>
          <div className="grid min-w-0 items-center gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(16rem,22.5rem)] lg:grid-cols-[minmax(0,1.65fr)_minmax(22.5rem,26.25rem)] lg:gap-12">
            <div className="min-w-0">
              <header className="flex min-w-0 flex-col gap-3">
                <p className="text-sm font-medium uppercase tracking-wider text-accent">
                  {profile.role}
                </p>
                <h1
                  id={headingId}
                  className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                >
                  {profile.displayName}
                </h1>
              </header>
              <ActionRow
                primary={primaryAction}
                secondary={secondaryAction}
                className="mt-6 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap"
              />
            </div>
            <div className="mx-auto w-full max-w-[26.25rem] md:mx-0 md:max-w-none">
              <MediaFrame
                mediaKey={profile.mediaKey}
                aspectRatio="3 / 4"
                className="rounded-lg border border-border shadow-md"
                sizes="(min-width: 64rem) 420px, (min-width: 48rem) 360px, 100vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <Section tone="muted" aria-labelledby="about-doctor-heading">
        <Container>
          <SectionHeading as="h2" id="about-doctor-heading" title="About Dr. Matute" />
          <div className="mt-stack grid min-w-0 gap-6 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-0">
            <div className="min-w-0 space-y-6 text-base leading-7 text-foreground">
              {biographyStart.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="min-w-0 space-y-6 text-base leading-7 text-foreground">
              {biographyEnd.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
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
          <ul className="mt-stack grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {profile.education.map((item) => (
              <li key={item.title} className="min-w-0">
                <EducationCard item={item} />
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
