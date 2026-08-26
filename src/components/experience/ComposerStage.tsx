"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useExperience } from "@/components/experience/useExperience";
import {
  getComponentConfig,
  type VisualTargetId,
} from "@/config/experience";
import { composerStageClass } from "@/config/media-assets";

type ComposerStageProps = {
  visualTarget: VisualTargetId;
  className?: string;
  children: ReactNode;
};

export function ComposerStage({
  visualTarget,
  className,
  children,
}: ComposerStageProps) {
  const experience = useExperience();
  const config = getComponentConfig(experience, visualTarget);

  return (
    <div
      className={cn(
        "exp-shell",
        className,
        composerStageClass(visualTarget, config.sizePreset),
      )}
      data-exp-size={config.sizePreset}
    >
      {children}
    </div>
  );
}
