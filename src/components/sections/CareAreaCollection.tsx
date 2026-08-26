"use client";

import { CareAreaCard } from "@/components/sections/CareAreaCard";
import { CornerActionCard } from "@/components/experience/CornerActionCard";
import { IntegratedCutout } from "@/components/experience/IntegratedCutout";
import { ExperienceCarousel } from "@/components/experience/ExperienceCarousel";
import { useExperience } from "@/components/experience/useExperience";
import {
  getComponentConfig,
  insetBadgeSizePx,
  isCornerContainerPreset,
  isInsetBadgeCutoutPreset,
  type VisualTargetId,
} from "@/config/experience";
import type { ServiceCategory } from "@/types/content";

type CareAreaCollectionProps = {
  categories: readonly ServiceCategory[];
  visualTarget?: VisualTargetId;
  label: string;
};

export function CareAreaCollection({
  categories,
  visualTarget,
  label,
}: CareAreaCollectionProps) {
  const experience = useExperience();
  const config = getComponentConfig(experience, visualTarget);
  const cornerPreset =
    isCornerContainerPreset(config.containerPreset) ||
    config.mediaStyle === "corner-action" ||
    config.mediaStyle === "bottom-action";
  const useCutout = isInsetBadgeCutoutPreset(config.containerPreset);
  const useCorner = !useCutout && (experience.cornerAction.enabled || cornerPreset);
  const position =
    config.containerPreset === "top-action"
      ? "top-right"
      : config.containerPreset === "bottom-action" ||
          config.mediaStyle === "bottom-action"
        ? "bottom-left"
        : experience.cornerAction.position;

  const cards = categories.map((category) =>
    useCutout ? (
      <IntegratedCutout
        key={category.slug}
        href={`/services/${category.slug}`}
        label={category.title}
        anchor="bottom-left"
        className="block h-full min-w-0"
        rotating={experience.rotatingBadge}
        showRotating={experience.floatingBadge.type === "rotating"}
        icon={experience.rotatingBadge.icon}
        circleSize={insetBadgeSizePx(config)}
      >
        <CareAreaCard
          category={category}
          linked={false}
          visualTarget={visualTarget}
          composerTarget={visualTarget}
          containerPreset={config.containerPreset}
        />
      </IntegratedCutout>
    ) : useCorner ? (
      <CornerActionCard
        key={category.slug}
        href={`/services/${category.slug}`}
        label={category.title}
        preset={
          config.containerPreset === "top-action" ||
          config.containerPreset === "bottom-action" ||
          config.containerPreset === "corner-action"
            ? config.containerPreset
            : "corner-action"
        }
        position={position}
      >
        <CareAreaCard
          category={category}
          linked={false}
          visualTarget={visualTarget}
          composerTarget={visualTarget}
          containerPreset={config.containerPreset}
        />
      </CornerActionCard>
    ) : (
      <CareAreaCard
        key={category.slug}
        category={category}
        visualTarget={visualTarget}
        composerTarget={visualTarget}
        containerPreset={config.containerPreset}
      />
    ),
  );

  if (experience.carousel.enabled) {
    return (
      <div className="mt-stack-lg">
        <ExperienceCarousel label={label}>{cards}</ExperienceCarousel>
      </div>
    );
  }

  return (
    <ul className="mt-stack-lg grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <li key={categories[index]?.slug ?? index} className="min-w-0 overflow-visible p-2">
          {card}
        </li>
      ))}
    </ul>
  );
}
