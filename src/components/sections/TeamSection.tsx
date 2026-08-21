import { ActionRow } from "@/components/ui/ActionRow";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PageContent } from "@/types/content";
import type { TeamMember } from "@/types/content";
import type { NavItem } from "@/types/navigation";

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
        <SectionHeading
          as="h1"
          id={page.headingId}
          eyebrow={page.eyebrow}
          title={page.title}
          description={page.description}
        />
        {members.length > 0 ? (
          <ul className="mt-stack-lg grid min-w-0 gap-4 sm:grid-cols-2">
            {members.map((member) => (
              <li key={member.slug} className="min-w-0">
                <Card className="h-full bg-surface">
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
          <Card className="mt-stack-lg bg-surface">
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
        <ActionRow
          primary={relatedAction ?? page.primaryAction}
          secondary={page.secondaryAction}
        />
      </Container>
    </Section>
  );
}
