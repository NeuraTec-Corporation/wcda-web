import Link from "next/link";
import { ArrowGlyph, ArrowUpRightGlyph } from "@/components/experience/ExperienceGlyphs";
import { MediaFrame } from "@/components/ui/MediaFrame";
import {
  isMediaCardModernPreset,
  type ContainerPresetId,
  type VisualTargetId,
} from "@/config/experience";
import type { ServiceCategory } from "@/types/content";

type CareAreaCardProps = {
  category: ServiceCategory;
  linked?: boolean;
  visualTarget?: VisualTargetId;
  composerTarget?: VisualTargetId;
  containerPreset?: ContainerPresetId;
  sizes?: string;
};

function LearnMoreAction({ title }: { title: string }) {
  return (
    <p className="mt-2.5 flex items-center gap-2 text-sm font-medium tracking-tight text-primary">
      <span className="sr-only">{title}. </span>
      Learn more
      <span
        aria-hidden="true"
        className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transform-none"
      >
        <ArrowGlyph className="size-3.5" />
      </span>
    </p>
  );
}

function MediaCardModern({
  category,
  visualTarget,
  composerTarget,
  containerPreset,
  sizes,
  linked,
}: CareAreaCardProps) {
  const href = `/services/${category.slug}`;
  const viewLabel = `View ${category.title}`;
  const mediaInner = (
    <>
      <MediaFrame
        mediaKey={category.mediaKey}
        visualTarget={composerTarget}
        composerTarget={composerTarget}
        itemKey={category.slug}
        aspectRatio="1 / 1"
        sizes={sizes}
        className="care-modern-card__photo w-full"
      />
      <div className="care-modern-card__scrim" aria-hidden="true" />
      <p className="care-modern-card__title">{category.title}</p>
    </>
  );

  return (
    <div
      className="care-modern-card group relative min-w-0"
      data-visual-target={visualTarget}
      data-lab-item-id={category.slug}
      data-container-preset={containerPreset}
    >
      {linked ? (
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="care-modern-card__media"
        >
          {mediaInner}
        </Link>
      ) : (
        <div className="care-modern-card__media">{mediaInner}</div>
      )}
      {linked ? (
        <Link
          href={href}
          className="care-modern-card__action"
          aria-label={viewLabel}
        >
          <ArrowUpRightGlyph className="care-modern-card__glyph" />
        </Link>
      ) : (
        <span className="care-modern-card__action" aria-hidden="true">
          <ArrowUpRightGlyph className="care-modern-card__glyph" />
        </span>
      )}
    </div>
  );
}

export function CareAreaCard({
  category,
  linked = true,
  visualTarget,
  composerTarget,
  containerPreset,
  sizes = "(min-width: 40rem) 50vw, 100vw",
}: CareAreaCardProps) {
  if (containerPreset && isMediaCardModernPreset(containerPreset)) {
    return (
      <MediaCardModern
        category={category}
        linked={linked}
        visualTarget={visualTarget}
        composerTarget={composerTarget}
        containerPreset={containerPreset}
        sizes={sizes}
      />
    );
  }

  const content = (
    <div
      className="flex min-w-0 flex-col bg-transparent p-0 shadow-none"
      data-visual-target={visualTarget}
      data-lab-item-id={category.slug}
      data-container-preset={containerPreset}
    >
      <MediaFrame
        mediaKey={category.mediaKey}
        visualTarget={composerTarget}
        composerTarget={composerTarget}
        itemKey={category.slug}
        aspectRatio="3 / 2"
        sizes={sizes}
        className="w-full rounded-md"
      />
      <LearnMoreAction title={category.title} />
    </div>
  );

  if (!linked) {
    return <div className="group min-w-0">{content}</div>;
  }

  return (
    <Link
      href={`/services/${category.slug}`}
      className="group block min-w-0 text-primary no-underline"
    >
      {content}
    </Link>
  );
}
