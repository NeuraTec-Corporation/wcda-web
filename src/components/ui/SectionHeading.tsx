import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { HeadingAlign, HeadingLevel } from "@/types/ui";

const headingClasses: Record<HeadingLevel, string> = {
  h1: "max-w-[22ch] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
  h2: "max-w-[28ch] text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]",
  h3: "text-xl font-semibold tracking-tight text-foreground",
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
        "flex max-w-narrow flex-col gap-2.5",
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
            Heading === "h1" ? "text-base sm:text-lg" : "text-base",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
