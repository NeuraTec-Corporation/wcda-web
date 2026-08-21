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
    <div className="min-w-0 border-t border-border pt-3">
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
        className="bg-background py-10 md:py-12"
        aria-labelledby={headingId}
      >
        <Container>
          <div className="grid min-w-0 items-center gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(14rem,20rem)] lg:gap-12">
            <div className="min-w-0">
              <header className="flex min-w-0 flex-col gap-2.5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                  {profile.role}
                </p>
                <h1
                  id={headingId}
                  className="max-w-[18ch] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
                >
                  {profile.displayName}
                </h1>
              </header>
              <ActionRow
                primary={primaryAction}
                secondary={secondaryAction}
              />
            </div>
            <div className="mx-auto w-full max-w-xs md:mx-0 md:max-w-none">
              <MediaFrame
                mediaKey={profile.mediaKey}
                aspectRatio="3 / 4"
                className="rounded-lg border border-border shadow-sm"
                sizes="(min-width: 64rem) 20rem, (min-width: 48rem) 16rem, 20rem"
              />
            </div>
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
          <div className="mt-stack max-w-narrow space-y-5 text-base leading-[1.75] text-foreground">
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
          <Card className="mt-stack bg-background p-card-lg">
            <ul className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {profile.education.map((item) => (
                <li key={item.title} className="min-w-0">
                  <EducationCard item={item} />
                </li>
              ))}
            </ul>
          </Card>
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
