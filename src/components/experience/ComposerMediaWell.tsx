"use client";

import { ExperienceMedia } from "@/components/experience/ExperienceMedia";
import { ComposerStage } from "@/components/experience/ComposerStage";
import { useExperience } from "@/components/experience/useExperience";
import { useThemeLabPreview } from "@/components/experience/useThemeLabPreview";
import {
  getComponentConfig,
  type VisualTargetId,
} from "@/config/experience";

type ComposerMediaWellProps = {
  visualTarget: VisualTargetId;
  mediaKey?: string;
};

export function ComposerMediaWell({
  visualTarget,
  mediaKey = "90",
}: ComposerMediaWellProps) {
  const experience = useExperience();
  const config = getComponentConfig(experience, visualTarget);
  const labPreview = useThemeLabPreview();

  if (config.assetId === "default" && !labPreview) {
    return null;
  }

  return (
    <ComposerStage visualTarget={visualTarget} className="mt-stack w-full">
      <ExperienceMedia
        mediaKey={mediaKey}
        visualTarget={visualTarget}
        className="rounded-lg border border-border"
        sizes="(min-width: 64rem) 36rem, 100vw"
      />
    </ComposerStage>
  );
}
