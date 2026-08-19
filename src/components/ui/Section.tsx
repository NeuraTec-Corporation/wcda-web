import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import type { SectionTone } from "@/types/ui";

const toneClasses: Record<SectionTone, string> = {
  default: "bg-background",
  muted: "bg-surface-muted",
  surface: "bg-surface",
};

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: SectionTone;
};

export function Section({
  tone = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-section md:py-section-lg",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
