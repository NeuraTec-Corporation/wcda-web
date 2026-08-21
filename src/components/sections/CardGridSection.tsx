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
  columns?: 2 | 3;
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
  columns = 3,
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
        <ul
          className={cn(
            "mt-stack-lg grid min-w-0 gap-4 sm:grid-cols-2",
            columns === 3 && "lg:grid-cols-3",
          )}
        >
          {items.map((item) => {
            const card = (
              <Card
                className={cn(
                  "h-full transition-shadow group-hover:shadow-md",
                  cardClassName,
                )}
              >
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
                    className="group block h-full rounded-lg text-foreground no-underline"
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
