import { useId } from "react";
import { cn } from "@/lib/cn";
import { BadgeCenterGlyph } from "@/components/experience/ExperienceGlyphs";
import { EditorialIconAsset } from "@/components/editorial/EditorialIconAsset";
import {
  badgeCenterGraphicFillPercent,
  type BadgeDiameter,
  type BadgeIconId,
  type BadgeTextColor,
  type MarqueeDirection,
  type MarqueeSurface,
  type BadgeRotationSpeed,
  type VisualTargetId,
} from "@/config/experience";
import type { LabIconColorMode } from "@/config/lab-icon-library";

type RotatingBadgeProps = {
  text: string;
  icon?: BadgeIconId;
  diameter?: BadgeDiameter;
  speed?: BadgeRotationSpeed;
  direction?: MarqueeDirection;
  surface?: MarqueeSurface;
  textColor?: BadgeTextColor;
  fillParent?: boolean;
  className?: string;
  labItemKey?: string;
  labVisualTarget?: VisualTargetId;
  centerAssetSrc?: string;
  centerAssetColorMode?: LabIconColorMode;
  centerGraphicSize?: number;
};

const diameterClasses: Record<BadgeDiameter, string> = {
  small: "size-16 sm:size-[4.5rem]",
  medium: "size-20 sm:size-24",
  large: "size-24 sm:size-28",
};

const surfaceClasses: Record<MarqueeSurface, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
  dark: "bg-surface-strong text-on-strong",
};

const textColorClasses: Record<BadgeTextColor, string> = {
  inverse: "fill-current",
  accent: "fill-accent",
  muted: "fill-current opacity-80",
};

export function RotatingBadge({
  text,
  icon = "tooth",
  diameter = "medium",
  speed = "slow",
  direction = "left",
  surface = "primary",
  textColor = "inverse",
  fillParent = false,
  className,
  labItemKey,
  labVisualTarget,
  centerAssetSrc,
  centerAssetColorMode = "fixed",
  centerGraphicSize,
}: RotatingBadgeProps) {
  const pathId = useId().replace(/:/g, "");
  const phrase = text.trim();
  const fillPercent = badgeCenterGraphicFillPercent(centerGraphicSize);
  const ringRadius = 36;
  const ringLength = 2 * Math.PI * ringRadius;
  const ringGap = ringLength * 0.04;
  const textLength = ringLength - ringGap;

  return (
    <span
      className={cn(
        "exp-rotating-badge pointer-events-none relative grid place-items-center overflow-hidden rounded-full shadow-sm",
        fillParent ? "size-full" : diameterClasses[diameter],
        surfaceClasses[surface],
        className,
      )}
      data-badge-dir={direction}
      data-badge-speed={speed}
      aria-hidden="true"
    >
      <span
        className={cn(
          "relative z-0 grid size-[42%] place-items-center rounded-full bg-background/15",
          labItemKey && !centerAssetSrc ? "pointer-events-auto" : null,
        )}
        data-lab-item-id={labItemKey}
        data-visual-target={labVisualTarget}
        data-lab-icon={labItemKey ? "1" : undefined}
      >
        {centerAssetSrc ? null : (
          <BadgeCenterGlyph name={icon} className="size-4 sm:size-5" />
        )}
      </span>
      {centerAssetSrc ? (
        <span
          className="exp-badge-center-overlay"
          style={{
            ["--exp-badge-center-graphic-size" as string]: `${fillPercent}%`,
          }}
          data-lab-item-id={labItemKey}
          data-visual-target={labVisualTarget}
          data-lab-icon={labItemKey ? "1" : undefined}
        >
          <EditorialIconAsset
            src={centerAssetSrc}
            colorMode={centerAssetColorMode}
            className="exp-badge-center-asset"
          />
        </span>
      ) : null}
      <svg
        viewBox="0 0 100 100"
        className="exp-rotating-badge-ring pointer-events-none absolute inset-0 z-20"
      >
        <defs>
          <path
            id={pathId}
            d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          />
        </defs>
        <text className={cn("text-[9px] uppercase", textColorClasses[textColor])}>
          <textPath
            href={`#${pathId}`}
            startOffset="0%"
            textLength={textLength}
            lengthAdjust="spacing"
          >
            {phrase}
          </textPath>
        </text>
      </svg>
    </span>
  );
}
