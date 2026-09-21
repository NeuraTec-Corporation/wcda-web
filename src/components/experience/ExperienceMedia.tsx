"use client";

import { MediaFrame } from "@/components/ui/MediaFrame";
import { IntegratedCutout } from "@/components/experience/IntegratedCutout";
import { useExperience } from "@/components/experience/useExperience";
import {
  BADGE_COMPATIBLE_TARGETS,
  badgeTypeFromStyle,
  getComponentConfig,
  HOME_PRACTICE_BADGE_CENTER_KEY,
  insetBadgeSizePx,
  isInsetBadgeCutoutPreset,
  resolveEditorialIcon,
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

  const practiceOwnerBadge = visualTarget === "home-doctor-media";
  const practiceBadgeCenter = practiceOwnerBadge
    ? resolveEditorialIcon(experience, HOME_PRACTICE_BADGE_CENTER_KEY)
    : undefined;

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
        labItemKey={
          practiceOwnerBadge ? HOME_PRACTICE_BADGE_CENTER_KEY : undefined
        }
        labVisualTarget={practiceOwnerBadge ? "editorial-cards" : undefined}
        centerAssetSrc={practiceBadgeCenter?.assetSrc}
        centerAssetColorMode={practiceBadgeCenter?.assetColorMode}
        centerGraphicSize={
          practiceOwnerBadge
            ? experience.editorialIcons.items?.[HOME_PRACTICE_BADGE_CENTER_KEY]
                ?.graphicSize
            : undefined
        }
      >
        {media}
      </IntegratedCutout>
    );
  }

  return media;
}
