import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import type { CardSectionContent } from "@/types/content";
import type { SectionTone } from "@/types/ui";

type CardGridSectionProps = CardSectionContent & {
  headingId: string;
  tone?: SectionTone;
  cardClassName?: string;
};

export function CardGridSection({
  eyebrow,
  title,
  description,
  items,
  cta,
  headingId,
  tone = "default",
  cardClassName,
}: CardGridSectionProps) {
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
          {items.map((item) => {
            const card = (
              <Card className={cn("h-full", cardClassName)}>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </Card>
            );

            return (
              <li key={item.href ?? item.title} className="min-w-0">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block h-full rounded-lg text-foreground no-underline"
                  >
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </li>
            );
          })}
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
