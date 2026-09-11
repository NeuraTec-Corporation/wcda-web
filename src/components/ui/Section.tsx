import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import type { SectionTone } from "@/types/ui";

const toneSurface: Record<SectionTone, string> = {
  default: "var(--color-background)",
  muted: "var(--color-surface-muted)",
  surface: "var(--color-section-surface)",
};

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: SectionTone;
};

export function Section({
  tone = "default",
  className,
  children,
  style,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "wcda-scope-surface py-section md:py-section-lg",
        className,
      )}
      style={{
        ["--wcda-scope-tone" as string]: toneSurface[tone],
        ["--exp-section-surface" as string]: toneSurface[tone],
        ...style,
      }}
      {...props}
    >
      {children}
    </section>
  );
}
