import { TreatmentItem } from "@/components/sections/TreatmentItem";
import { getTreatmentHref } from "@/data/services";
import type { ServiceRecord } from "@/types/content";
import type { VisualTargetId } from "@/config/experience";

type RelatedCareGridProps = {
  headingId: string;
  title: string;
  treatments: readonly ServiceRecord[];
  visualTarget?: VisualTargetId;
};

export function RelatedCareGrid({
  headingId,
  title,
  treatments,
  visualTarget = "services-treatment-media",
}: RelatedCareGridProps) {
  if (treatments.length === 0) {
    return null;
  }

  return (
    <div className="min-w-0">
      <h2
        id={headingId}
        className="text-[length:calc(var(--theme-h2)*var(--theme-heading-scale,1))] font-semibold tracking-[var(--theme-h2-tracking)] leading-[var(--theme-h2-leading)] text-heading sm:text-[length:calc(var(--theme-h2-lg)*var(--theme-heading-scale,1))]"
      >
        {title}
      </h2>
      <ul className="mt-stack grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {treatments.map((treatment) => (
          <li key={`${treatment.categorySlug}-${treatment.slug}`} className="min-w-0">
            <div className="editorial-card px-2" data-visual-target="editorial-cards">
              <TreatmentItem
                title={treatment.title}
                mediaKey={treatment.mediaKey}
                href={getTreatmentHref(treatment)}
                status={treatment.status}
                composerTarget={visualTarget}
                visualTarget={visualTarget}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
