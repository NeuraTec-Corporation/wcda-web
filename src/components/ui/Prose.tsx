import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ProseProps = {
  children: ReactNode;
  className?: string;
};

export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "max-w-narrow space-y-4 text-base leading-relaxed text-muted",
        className,
      )}
    >
      {children}
    </div>
  );
}
