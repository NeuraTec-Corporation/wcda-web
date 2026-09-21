import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ProseProps = {
  children: ReactNode;
  className?: string;
  contentTarget?: string;
};

export function Prose({ children, className, contentTarget }: ProseProps) {
  return (
    <div
      className={cn(
        "max-w-narrow space-y-5 text-base leading-[1.75] text-muted",
        className,
      )}
      data-content-target={contentTarget}
    >
      {children}
    </div>
  );
}
