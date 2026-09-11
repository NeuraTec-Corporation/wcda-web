import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { HeadingAlign, HeadingLevel } from "@/types/ui";

const headingClasses: Record<HeadingLevel, string> = {
  h1: "max-w-[18ch] text-[length:calc(var(--theme-h1)*var(--theme-heading-scale,1))] font-semibold tracking-[var(--theme-h1-tracking)] leading-[var(--theme-h1-leading)] text-heading sm:text-[length:calc(var(--theme-h1-lg)*var(--theme-heading-scale,1))] sm:leading-[var(--theme-h1-leading-lg)]",
  h2: "max-w-[24ch] text-[length:calc(var(--theme-h2)*var(--theme-heading-scale,1))] font-semibold tracking-[var(--theme-h2-tracking)] leading-[var(--theme-h2-leading)] text-heading sm:text-[length:calc(var(--theme-h2-lg)*var(--theme-heading-scale,1))] sm:leading-[var(--theme-h2-leading-lg)]",
  h3: "text-[length:calc(var(--theme-h3)*var(--theme-heading-scale,1))] font-semibold tracking-[var(--theme-h3-tracking)] leading-[var(--theme-h3-leading)] text-foreground",
};

type SectionHeadingProps = {
  as?: HeadingLevel;
  id?: string;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: HeadingAlign;
  measure?: "narrow" | "column";
  className?: string;
  titleContentTarget?: string;
  descriptionContentTarget?: string;
};

export function SectionHeading({
  as: Heading = "h2",
  id,
  eyebrow,
  title,
  description,
  align = "start",
  measure = "narrow",
  className,
  titleContentTarget,
  descriptionContentTarget,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-3",
        measure === "narrow" ? "max-w-narrow" : "max-w-none",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="uppercase text-accent text-[length:var(--theme-eyebrow-size)] font-[var(--theme-eyebrow-weight)] tracking-[var(--theme-eyebrow-tracking)]">
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={headingClasses[Heading]}
        data-content-target={titleContentTarget}
      >
        {title}
      </Heading>
      {description ? (
        <p
          data-content-target={descriptionContentTarget}
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
