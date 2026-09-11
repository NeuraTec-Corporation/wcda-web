import { ActionRow } from "@/components/ui/ActionRow";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/editorial/Breadcrumb";
import type { PageContent } from "@/types/content";
import type { TeamMember } from "@/types/content";
import type { NavItem } from "@/types/navigation";
import { PublicationGate } from "@/components/content/PublicationGate";

type TeamSectionProps = {
  page: PageContent;
  members: readonly TeamMember[];
  emptyState: readonly string[];
  relatedAction?: NavItem;
};

export function TeamSection({
  page,
  members,
  emptyState,
  relatedAction,
}: TeamSectionProps) {
  return (
    <Section aria-labelledby={page.headingId}>
      <Container>
        <PublicationGate page="team" section="intro">
        <Breadcrumb
          items={[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { label: page.title },
          ]}
          className="mb-5"
        />
        <SectionHeading
          as="h1"
          id={page.headingId}
          eyebrow={page.eyebrow}
          title={page.title}
          description={page.description}
          measure="column"
        />
        </PublicationGate>
        <PublicationGate page="team" section="members">
        {members.length > 0 ? (
          <ul className="mt-stack-lg grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <li key={member.slug} className="min-w-0">
                <Card className="h-full bg-editorial-surface">
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">
                    {member.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-accent">
                    {member.role}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {member.bio}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <Card className="mt-stack-lg bg-editorial-surface">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Meet the dentist
            </h2>
            <Prose className="mt-3">
              {emptyState.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
          </Card>
        )}
        </PublicationGate>
        <PublicationGate page="team" section="cta">
        <ActionRow
          primary={relatedAction ?? page.primaryAction}
          secondary={page.secondaryAction}
        />
        </PublicationGate>
      </Container>
    </Section>
  );
}
