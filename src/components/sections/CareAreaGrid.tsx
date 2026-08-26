import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CareAreaCollection } from "@/components/sections/CareAreaCollection";
import type { VisualTargetId } from "@/config/experience";
import type { ServiceCategory } from "@/types/content";
import type { NavItem } from "@/types/navigation";
import type { SectionTone } from "@/types/ui";

type CareAreaGridProps = {
  headingId: string;
  eyebrow?: string;
  title: string;
  description?: string;
  categories: readonly ServiceCategory[];
  cta?: NavItem;
  tone?: SectionTone;
  visualTarget?: VisualTargetId;
};

export function CareAreaGrid({
  headingId,
  eyebrow,
  title,
  description,
  categories,
  cta,
  tone = "muted",
  visualTarget,
}: CareAreaGridProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <Section
      tone={tone}
      aria-labelledby={headingId}
    >
      <Container>
        <SectionHeading
          as="h2"
          id={headingId}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <CareAreaCollection
          categories={categories}
          visualTarget={visualTarget}
          label={title}
        />
        {cta ? (
          <div className="mt-stack-lg">
            <Button href={cta.href} variant="outline">
              {cta.label}
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
