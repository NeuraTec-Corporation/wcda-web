"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { BadgeCenterGlyph } from "@/components/experience/ExperienceGlyphs";
import { RotatingBadge } from "@/components/experience/RotatingBadge";
import type {
  BadgeIconId,
  CornerActionPosition,
  ExperienceValues,
  VisualTargetId,
} from "@/config/experience";
import type { LabIconColorMode } from "@/config/lab-icon-library";

type IntegratedCutoutProps = {
  children: ReactNode;
  anchor?: CornerActionPosition;
  href?: string;
  label?: string;
  rotating?: ExperienceValues["rotatingBadge"];
  showRotating?: boolean;
  icon?: BadgeIconId;
  circleSize?: number;
  className?: string;
  labItemKey?: string;
  labVisualTarget?: VisualTargetId;
  centerAssetSrc?: string;
  centerAssetColorMode?: LabIconColorMode;
  centerGraphicSize?: number;
};

const CutoutAppliedContext = createContext(false);

export function IntegratedCutout({
  children,
  anchor = "bottom-left",
  href,
  label,
  rotating,
  showRotating = false,
  icon,
  circleSize = 96,
  className,
  labItemKey,
  labVisualTarget,
  centerAssetSrc,
  centerAssetColorMode,
  centerGraphicSize,
}: IntegratedCutoutProps) {
  const nested = useContext(CutoutAppliedContext);
  if (nested) {
    return children;
  }

  const badgeIcon = icon ?? rotating?.icon ?? "tooth";
  const action = (
    <span className="exp-cutout-action" aria-hidden="true">
      {showRotating && rotating ? (
        <RotatingBadge
          text={rotating.text}
          icon={rotating.icon}
          diameter="small"
          speed={rotating.speed}
          direction={rotating.direction}
          surface={rotating.surface}
          textColor={rotating.textColor}
          fillParent
          labItemKey={labItemKey}
          labVisualTarget={labVisualTarget}
          centerAssetSrc={centerAssetSrc}
          centerAssetColorMode={centerAssetColorMode}
          centerGraphicSize={centerGraphicSize}
        />
      ) : (
        <BadgeCenterGlyph name={badgeIcon} className="size-4" />
      )}
    </span>
  );

  const body = (
    <div className="exp-cutout-stage">
      <div className="exp-cutout-shadow">
        <div className="exp-cutout-body">{children}</div>
      </div>
      {action}
    </div>
  );

  const classes = cn("exp-cutout", className);
  const circleStyle = {
    ["--exp-c05-size-user" as string]: String(circleSize),
  };

  const tree = href ? (
    <a
      href={href}
      className={classes}
      data-cutout-anchor={anchor}
      data-container-preset="inset-badge-cutout"
      style={circleStyle}
      aria-label={label}
    >
      {body}
    </a>
  ) : (
    <div
      className={classes}
      data-cutout-anchor={anchor}
      data-container-preset="inset-badge-cutout"
      style={circleStyle}
    >
      {body}
    </div>
  );

  return (
    <CutoutAppliedContext.Provider value={true}>
      {tree}
    </CutoutAppliedContext.Provider>
  );
}
