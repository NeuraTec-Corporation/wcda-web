import Link from "next/link";
import { EditorialGlyph } from "@/components/editorial/EditorialGlyph";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  isSurfaceIntensityTarget,
  type VisualTargetId,
} from "@/config/experience";
import { cn } from "@/lib/cn";
import type { CardSectionContent } from "@/types/content";
import type { SectionTone } from "@/types/ui";

type CardGridSectionProps = CardSectionContent & {
  headingId: string;
  tone?: SectionTone;
  cardClassName?: string;
  columns?: 2 | 3;
  variant?: "cards" | "ruled";
  visualTarget?: VisualTargetId;
  surfaceFill?: string;
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
  variant = "cards",
  visualTarget,
  surfaceFill,
}: CardGridSectionProps) {
  const mixSurface = isSurfaceIntensityTarget(visualTarget);
  const editorialSurface = variant === "cards" && !mixSurface;
  const cardTarget = visualTarget ?? (editorialSurface ? "editorial-cards" : undefined);
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
            "mt-stack-lg grid min-w-0",
            variant === "ruled"
              ? "gap-8 sm:grid-cols-2 lg:grid-cols-3"
              : cn(
                  "gap-4 sm:grid-cols-2",
                  columns === 3 && "lg:grid-cols-3",
                ),
          )}
        >
          {items.map((item, index) => {
            if (variant === "ruled") {
              const body = (
                <>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </>
              );

              return (
                <li
                  key={item.href ?? item.title}
                  className="min-w-0 border-t border-border pt-4"
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block text-foreground no-underline hover:text-primary"
                    >
                      {body}
                    </Link>
                  ) : (
                    body
                  )}
                </li>
              );
            }

            const card = (
              <Card
                className={cn(
                  "h-full transition-shadow group-hover:shadow-md",
                  cardClassName,
                )}
                data-visual-target={cardTarget}
                data-surface-mix={mixSurface || editorialSurface ? "" : undefined}
                style={
                  mixSurface || editorialSurface
                    ? {
                        ["--exp-surface-fill" as string]: mixSurface
                          ? (surfaceFill ?? "var(--wcda-surface)")
                          : "var(--wcda-surface)",
                      }
                    : undefined
                }
              >
                <div className="flex min-w-0 items-start gap-3">
                  <EditorialGlyph index={index} />
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
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
