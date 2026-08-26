import { cn } from "@/lib/cn";

type MediaPlaceholderProps = {
  className?: string;
  compact?: boolean;
  label?: string;
};

export function MediaPlaceholder({
  className,
  compact = false,
  label,
}: MediaPlaceholderProps) {
  return (
    <div
      className={cn("media-placeholder-panel absolute inset-0", className)}
      aria-hidden="true"
    >
      {compact ? (
        <span className="absolute inset-[18%] rounded-[1px] border border-border/50" />
      ) : (
        <>
          <span className="absolute inset-4 rounded-sm border border-border/60 sm:inset-5" />
          {label ? (
            <span className="absolute inset-0 flex items-center justify-center px-4">
              <span className="max-w-[12rem] text-center text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-placeholder-ink">
                {label}
              </span>
            </span>
          ) : null}
        </>
      )}
    </div>
  );
}
