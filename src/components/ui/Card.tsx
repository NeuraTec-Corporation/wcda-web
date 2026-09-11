import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  "data-visual-target"?: string;
};

export function Card({ className, children, ...props }: CardProps) {
  const labSurface = Boolean(props["data-visual-target"]);
  return (
    <div
      className={cn(
        "rounded-lg border border-border p-card shadow-xs",
        !labSurface && "bg-surface",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
