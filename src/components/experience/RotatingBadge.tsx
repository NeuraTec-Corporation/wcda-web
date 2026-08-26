import { useId } from "react";
import { cn } from "@/lib/cn";
import { BadgeCenterGlyph } from "@/components/experience/ExperienceGlyphs";
import type {
  BadgeDiameter,
  BadgeIconId,
  BadgeTextColor,
  MarqueeDirection,
  MarqueeSurface,
  BadgeRotationSpeed,
} from "@/config/experience";

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
}: RotatingBadgeProps) {
  const pathId = useId().replace(/:/g, "");
  const ring = `${text.trim()} · ${text.trim()} · `;

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
      <svg viewBox="0 0 100 100" className="exp-rotating-badge-ring absolute inset-0">
        <defs>
          <path
            id={pathId}
            d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          />
        </defs>
        <text className={cn("text-[9px] uppercase tracking-[0.18em]", textColorClasses[textColor])}>
          <textPath href={`#${pathId}`}>{ring}</textPath>
        </text>
      </svg>
      <span className="relative z-10 grid size-[42%] place-items-center rounded-full bg-background/15">
        <BadgeCenterGlyph name={icon} className="size-4 sm:size-5" />
      </span>
    </span>
  );
}
