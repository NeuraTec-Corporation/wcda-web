import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { HeadingAlign, HeadingLevel } from "@/types/ui";

const headingClasses: Record<HeadingLevel, string> = {
  h1: "max-w-[18ch] text-[length:calc(var(--theme-h1)*var(--theme-heading-scale,1))] font-semibold tracking-tight text-foreground sm:text-[length:calc(var(--theme-h1-lg)*var(--theme-heading-scale,1))] sm:leading-tight",
  h2: "max-w-[24ch] text-[length:calc(var(--theme-h2)*var(--theme-heading-scale,1))] font-semibold tracking-tight text-foreground sm:text-[length:calc(var(--theme-h2-lg)*var(--theme-heading-scale,1))] sm:leading-tight",
  h3: "text-[length:calc(var(--theme-h3)*var(--theme-heading-scale,1))] font-semibold tracking-tight text-foreground",
};

type SectionHeadingProps = {
  as?: HeadingLevel;
  id?: string;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: HeadingAlign;
  className?: string;
};

export function SectionHeading({
  as: Heading = "h2",
  id,
  eyebrow,
  title,
  description,
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "flex max-w-narrow flex-col gap-3",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <Heading id={id} className={headingClasses[Heading]}>
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "max-w-prose leading-relaxed text-muted",
            Heading === "h1" ? "text-base sm:text-[1.0625rem]" : "text-base",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
