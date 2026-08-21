import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CareAreaCard } from "@/components/sections/CareAreaCard";
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
};

export function CareAreaGrid({
  headingId,
  eyebrow,
  title,
  description,
  categories,
  cta,
  tone = "muted",
}: CareAreaGridProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <Section tone={tone} aria-labelledby={headingId}>
      <Container>
        <SectionHeading
          as="h2"
          id={headingId}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <ul className="mt-stack-lg grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <li key={category.slug} className="min-w-0">
              <CareAreaCard category={category} />
            </li>
          ))}
        </ul>
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
