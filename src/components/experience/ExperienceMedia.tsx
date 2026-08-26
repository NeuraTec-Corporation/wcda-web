"use client";

import { MediaFrame } from "@/components/ui/MediaFrame";
import { IntegratedCutout } from "@/components/experience/IntegratedCutout";
import { useExperience } from "@/components/experience/useExperience";
import {
  BADGE_COMPATIBLE_TARGETS,
  badgeTypeFromStyle,
  getComponentConfig,
  insetBadgeSizePx,
  isInsetBadgeCutoutPreset,
  usesBadgeStyle,
  type VisualTargetId,
} from "@/config/experience";

type ExperienceMediaProps = {
  mediaKey?: string;
  visualTarget?: VisualTargetId;
  className?: string;
  sizes?: string;
  aspectRatio?: string;
  allowBadge?: boolean;
};

export function ExperienceMedia({
  mediaKey,
  visualTarget,
  className,
  sizes,
  aspectRatio,
  allowBadge = true,
}: ExperienceMediaProps) {
  const experience = useExperience();
  const config = getComponentConfig(experience, visualTarget);
  const badgeFromStyle = usesBadgeStyle(config.mediaStyle);
  const badgeCompatible = visualTarget
    ? BADGE_COMPATIBLE_TARGETS.includes(visualTarget)
    : false;
  const useCutout = isInsetBadgeCutoutPreset(config.containerPreset);
  const showRotating =
    allowBadge &&
    badgeCompatible &&
    useCutout &&
    (badgeFromStyle
      ? badgeTypeFromStyle(config.mediaStyle) === "rotating"
      : experience.floatingBadge.type === "rotating");

  const media = (
    <MediaFrame
      mediaKey={mediaKey}
      visualTarget={visualTarget}
      className={className}
      sizes={sizes}
      aspectRatio={aspectRatio}
    />
  );

  if (useCutout) {
    return (
      <IntegratedCutout
        className="block w-full min-w-0"
        anchor="bottom-left"
        rotating={experience.rotatingBadge}
        showRotating={showRotating}
        icon={experience.rotatingBadge.icon}
        circleSize={insetBadgeSizePx(config)}
      >
        {media}
      </IntegratedCutout>
    );
  }

  return media;
}
