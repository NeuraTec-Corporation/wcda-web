import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  CareAreaCollection,
  type CareAreaLayoutMode,
} from "@/components/sections/CareAreaCollection";
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
  layoutMode?: CareAreaLayoutMode;
  itemsPerViewDesktop?: 1 | 2 | 3;
  itemsPerViewMobile?: 1 | 2;
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
  layoutMode = "grid",
  itemsPerViewDesktop,
  itemsPerViewMobile,
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
          layoutMode={layoutMode}
          itemsPerViewDesktop={itemsPerViewDesktop}
          itemsPerViewMobile={itemsPerViewMobile}
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
