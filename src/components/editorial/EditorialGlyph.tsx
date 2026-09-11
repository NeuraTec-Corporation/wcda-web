import type { ComponentType, SVGProps } from "react";
import {
  CalendarGlyph,
  CheckGlyph,
  HeartGlyph,
  HomeGlyph,
  InfoGlyph,
  MagnifierGlyph,
  QuestionGlyph,
  ShieldGlyph,
  SparkleGlyph,
  TargetGlyph,
  ToothGlyph,
} from "@/components/experience/ExperienceGlyphs";
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

export function EditorialGlyph({
  sectionId,
  index = 0,
  className,
}: {
  sectionId?: TreatmentSectionId;
  index?: number;
  className?: string;
}) {
  const Icon = sectionId
    ? sectionGlyphs[sectionId]
    : fallbackGlyphs[index % fallbackGlyphs.length];

  return (
    <span className={cn("editorial-icon", className)}>
      <Icon className="size-4" />
    </span>
  );
}
