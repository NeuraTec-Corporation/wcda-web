import { cn } from "@/lib/cn";

type MediaPlaceholderProps = {
  className?: string;
};

export function MediaPlaceholder({ className }: MediaPlaceholderProps) {
  return (
    <div
      className={cn("absolute inset-0 bg-placeholder", className)}
      aria-hidden="true"
    >
      <span className="absolute inset-3 rounded-sm border border-border/70" />
    </div>
  );
}
