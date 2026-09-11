import { MediaFrame } from "@/components/ui/MediaFrame";
import type { VisualTargetId } from "@/config/experience";
import { cn } from "@/lib/cn";

type OptionalMediaPanelProps = {
  mediaKey?: string;
  visualTarget?: VisualTargetId;
  aspectRatio?: string;
  sizes?: string;
  className?: string;
  decorative?: boolean;
};

export function OptionalMediaPanel({
  mediaKey,
  visualTarget = "services-treatment-media",
  aspectRatio = "4 / 3",
  sizes = "(min-width: 64rem) 28rem, 100vw",
  className,
  decorative = false,
}: OptionalMediaPanelProps) {
  if (!mediaKey) {
    return null;
  }

  return (
    <div className={cn("editorial-media min-w-0", className)}>
      <MediaFrame
        mediaKey={mediaKey}
        visualTarget={visualTarget}
        composerTarget={visualTarget}
        aspectRatio={aspectRatio}
        sizes={sizes}
        decorative={decorative}
        className="relative rounded-lg border border-border shadow-xs"
      />
    </div>
  );
}
