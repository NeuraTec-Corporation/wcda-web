"use client";

import type { ComponentType, CSSProperties, SVGProps } from "react";
import {
  CalendarGlyph,
  CheckGlyph,
  HeartGlyph,
  HomeGlyph,
  IndependentOwnershipGlyph,
  InfoGlyph,
  MagnifierGlyph,
  QuestionGlyph,
  ShieldGlyph,
  SparkleGlyph,
  TargetGlyph,
  ToothGlyph,
} from "@/components/experience/ExperienceGlyphs";
import { EditorialIconAsset } from "@/components/editorial/EditorialIconAsset";
import { useExperience } from "@/components/experience/useExperience";
import {
  editorialIconCssVars,
  resolveEditorialIcon,
  type EditorialIconId,
} from "@/config/experience";
import { isApprovedIconSrc } from "@/config/lab-icon-library";
import type { TreatmentSectionId } from "@/types/content";
import { cn } from "@/lib/cn";

type IconProps = SVGProps<SVGSVGElement>;

const sectionGlyphs: Record<TreatmentSectionId, ComponentType<IconProps>> = {
  overview: ToothGlyph,
  whyRecommended: TargetGlyph,
  evaluation: MagnifierGlyph,
  howItWorks: CalendarGlyph,
  whatToExpect: InfoGlyph,
  benefits: SparkleGlyph,
  considerations: ShieldGlyph,
  recoveryAftercare: HeartGlyph,
  maintenance: HomeGlyph,
  alternatives: CheckGlyph,
  faq: QuestionGlyph,
  clinicalNote: InfoGlyph,
  relatedTreatments: ToothGlyph,
};

const namedGlyphs: Record<EditorialIconId, ComponentType<IconProps>> = {
  "independent-ownership": IndependentOwnershipGlyph,
  "west-caldwell-community": HeartGlyph,
  "clear-next-steps": CheckGlyph,
  tooth: ToothGlyph,
  shield: ShieldGlyph,
  heart: HeartGlyph,
  home: HomeGlyph,
  check: CheckGlyph,
  target: TargetGlyph,
  sparkle: SparkleGlyph,
  calendar: CalendarGlyph,
  info: InfoGlyph,
};

const fallbackGlyphs = [
  ToothGlyph,
  ShieldGlyph,
  HeartGlyph,
  CalendarGlyph,
  TargetGlyph,
  MagnifierGlyph,
  SparkleGlyph,
  HomeGlyph,
] as const;

export function EditorialIconMark({
  id,
  className,
}: {
  id: EditorialIconId;
  className?: string;
}) {
  const Icon = namedGlyphs[id];
  return <Icon className={className} />;
}

export function EditorialGlyph({
  sectionId,
  index = 0,
  itemKey,
  className,
}: {
  sectionId?: TreatmentSectionId;
  index?: number;
  itemKey?: string;
  className?: string;
}) {
  const experience = useExperience();
  const resolved = resolveEditorialIcon(experience, itemKey);
  const assetSrc =
    resolved.assetSrc && isApprovedIconSrc(resolved.assetSrc)
      ? resolved.assetSrc
      : undefined;
  const Icon = sectionId
    ? sectionGlyphs[sectionId]
    : !assetSrc && resolved.icon
      ? namedGlyphs[resolved.icon]
      : fallbackGlyphs[index % fallbackGlyphs.length];

  return (
    <span
      className={cn("editorial-icon", className)}
      data-icon-background={resolved.background}
      data-presentation={resolved.presentationMode}
      data-graphic-align={resolved.graphicAlign}
      style={
        editorialIconCssVars(
          resolved.color,
          resolved.size,
          resolved.graphicSize,
        ) as CSSProperties
      }
    >
      {assetSrc ? (
        <EditorialIconAsset
          src={assetSrc}
          colorMode={resolved.assetColorMode}
        />
      ) : (
        <Icon />
      )}
    </span>
  );
}
