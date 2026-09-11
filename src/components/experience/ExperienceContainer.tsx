"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useExperience } from "@/components/experience/useExperience";
import { IntegratedCutout } from "@/components/experience/IntegratedCutout";
import {
  getComponentConfig,
  insetBadgeSizePx,
  isInsetBadgeCutoutPreset,
  type VisualTargetId,
} from "@/config/experience";
import {
  resolveScopedElementFill,
  scopedElementFillStyle,
} from "@/config/scoped-colors";

type ExperienceContainerProps = {
  visualTarget: VisualTargetId;
  className?: string;
  children: ReactNode;
};

export function ExperienceContainer({
  visualTarget,
  className,
  children,
}: ExperienceContainerProps) {
  const experience = useExperience();
  const config = getComponentConfig(experience, visualTarget);
  const fillHex = resolveScopedElementFill(
    experience.scopedColors,
    visualTarget,
  );
  const container = (
    <div
      className={cn("exp-container", className)}
      data-visual-target={visualTarget}
      data-container-preset={config.containerPreset}
      data-media-style={config.mediaStyle}
      data-scoped-fill={fillHex ? "1" : undefined}
      style={scopedElementFillStyle(fillHex) as CSSProperties | undefined}
    >
      {children}
    </div>
  );

  if (isInsetBadgeCutoutPreset(config.containerPreset)) {
    return (
      <IntegratedCutout
        className="block min-w-0"
        anchor="bottom-left"
        circleSize={insetBadgeSizePx(config)}
      >
        {container}
      </IntegratedCutout>
    );
  }

  return container;
}
