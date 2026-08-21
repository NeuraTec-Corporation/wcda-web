import { cn } from "@/lib/cn";

type MediaPlaceholderProps = {
  className?: string;
};

export function MediaPlaceholder({ className }: MediaPlaceholderProps) {
  return (
    <div
      className={cn("absolute inset-0 bg-surface-muted", className)}
      aria-hidden="true"
    />
  );
}
