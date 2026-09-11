import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb, type BreadcrumbItem } from "@/components/editorial/Breadcrumb";
import type { PageContent } from "@/types/content";
import type { SectionTone } from "@/types/ui";

type PageIntroProps = PageContent & {
  tone?: SectionTone;
  breadcrumb?: readonly BreadcrumbItem[];
};

export function PageIntro({
  headingId,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  tone = "default",
  breadcrumb,
}: PageIntroProps) {
  return (
    <Section
      tone={tone}
      className="py-10 md:py-16"
      aria-labelledby={headingId}
    >
      <Container>
        {breadcrumb ? <Breadcrumb items={breadcrumb} className="mb-5" /> : null}
        <SectionHeading
          as="h1"
          id={headingId}
          eyebrow={eyebrow}
          title={title}
          description={description}
          measure="column"
          className="max-w-3xl"
        />
        <ActionRow primary={primaryAction} secondary={secondaryAction} />
      </Container>
    </Section>
  );
}
