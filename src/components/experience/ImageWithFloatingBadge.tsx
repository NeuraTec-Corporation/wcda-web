import { MediaFrame } from "@/components/ui/MediaFrame";
import { cn } from "@/lib/cn";
import { PlusGlyph } from "@/components/experience/ExperienceGlyphs";
import { RotatingBadge } from "@/components/experience/RotatingBadge";
import type {
  BadgePosition,
  BadgeType,
  ExperienceValues,
  VisualTargetId,
} from "@/config/experience";

type ImageWithFloatingBadgeProps = {
  mediaKey?: string;
  visualTarget?: VisualTargetId;
  position?: BadgePosition;
  overlap?: number;
  badgeType?: BadgeType;
  rotating?: ExperienceValues["rotatingBadge"];
  compose?: "float" | "card";
  className?: string;
  sizes?: string;
  aspectRatio?: string;
};

export function ImageWithFloatingBadge({
  mediaKey,
  visualTarget,
  position = "bottom-left",
  overlap = 0.22,
  badgeType = "static",
  rotating,
  compose = "float",
  className,
  sizes,
  aspectRatio,
}: ImageWithFloatingBadgeProps) {
  const inset = `${Math.round(overlap * 100)}%`;
  const resolvedPosition = rotating?.position ?? position;

  return (
    <div
      className={cn("exp-badge-compose relative max-w-full min-w-0", className)}
      data-exp-compose={compose}
      data-badge-anchor={resolvedPosition}
      style={{ ["--exp-badge-overlap" as string]: inset }}
    >
      <MediaFrame
        mediaKey={mediaKey}
        visualTarget={visualTarget}
        aspectRatio={aspectRatio}
        sizes={sizes}
      />
      <span className="exp-badge-mark" aria-hidden="true">
        {badgeType === "rotating" && rotating ? (
          <RotatingBadge
            text={rotating.text}
            icon={rotating.icon}
            diameter={compose === "card" ? "small" : rotating.diameter}
            speed={rotating.speed}
            direction={rotating.direction}
            surface={rotating.surface}
            textColor={rotating.textColor}
          />
        ) : badgeType === "action" ? (
          <span
            className={cn(
              "grid place-items-center rounded-full border border-border bg-primary text-primary-foreground shadow-sm",
              compose === "card" ? "size-12 sm:size-14" : "size-14 sm:size-16",
            )}
          >
            <PlusGlyph className="size-5" />
          </span>
        ) : (
          <span
            className={cn(
              "relative grid place-items-center rounded-full border border-border bg-surface shadow-sm",
              compose === "card" ? "size-14 sm:size-16" : "size-16 sm:size-20",
            )}
          >
            <span className="absolute inset-[18%] rounded-full border border-border/60 bg-placeholder" />
          </span>
        )}
      </span>
    </div>
  );
}
