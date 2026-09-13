import Link from "next/link";
import { ArrowGlyph } from "@/components/experience/ExperienceGlyphs";
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { ContainerPresetId, VisualTargetId } from "@/config/experience";
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

export function CareAreaCard({
  category,
  linked = true,
  visualTarget,
  composerTarget,
  containerPreset,
  sizes = "(min-width: 40rem) 50vw, 100vw",
}: CareAreaCardProps) {
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
