"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useExperience } from "@/components/experience/useExperience";
import { IntegratedCutout } from "@/components/experience/IntegratedCutout";
import {
  getComponentConfig,
  insetBadgeSizePx,
  isInsetBadgeCutoutPreset,
  type VisualTargetId,
} from "@/config/experience";

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
  const container = (
    <div
      className={cn("exp-container", className)}
      data-visual-target={visualTarget}
      data-container-preset={config.containerPreset}
      data-media-style={config.mediaStyle}
      data-scoped-fill={
        experience.scopedColors?.elements?.[visualTarget] ? "1" : undefined
      }
      style={
        experience.scopedColors?.elements?.[visualTarget]
          ? {
              ["--exp-surface-fill" as string]:
                experience.scopedColors.elements[visualTarget],
              ["--exp-surface-keep" as string]: "100%",
            }
          : undefined
      }
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
