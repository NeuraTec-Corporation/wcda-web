import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { HeadingAlign, HeadingLevel } from "@/types/ui";

const headingClasses: Record<HeadingLevel, string> = {
  h1: "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
  h2: "text-2xl font-semibold tracking-tight text-foreground sm:text-3xl",
  h3: "text-xl font-semibold tracking-tight text-foreground sm:text-2xl",
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
        <p className="text-sm font-medium uppercase tracking-wider text-accent">
          {eyebrow}
        </p>
      ) : null}
      <Heading id={id} className={headingClasses[Heading]}>
        {title}
      </Heading>
      {description ? (
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
