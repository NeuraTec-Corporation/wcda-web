import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { ContainerPresetId, VisualTargetId } from "@/config/experience";
import type { ServiceCategory } from "@/types/content";

type CareAreaCardProps = {
  category: ServiceCategory;
  linked?: boolean;
  visualTarget?: VisualTargetId;
  composerTarget?: VisualTargetId;
  containerPreset?: ContainerPresetId;
};

export function CareAreaCard({
  category,
  linked = true,
  visualTarget,
  composerTarget,
  containerPreset,
}: CareAreaCardProps) {
  const content = (
    <Card
      className="exp-container flex h-full min-w-0 flex-col overflow-hidden p-0 shadow-xs transition-shadow group-hover:shadow-md group-focus-visible:shadow-md"
      data-visual-target={visualTarget}
      data-container-preset={containerPreset}
    >
      <MediaFrame
        mediaKey={category.mediaKey}
        composerTarget={composerTarget}
        className="rounded-none"
      />
      <div className="flex flex-1 flex-col gap-2 px-5 py-4">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {category.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">
          {category.summary}
        </p>
      </div>
    </Card>
  );

  if (!linked) {
    return <div className="group h-full min-w-0">{content}</div>;
  }

  return (
    <Link
      href={`/services/${category.slug}`}
      className="group block h-full min-w-0 rounded-lg text-foreground no-underline"
    >
      {content}
    </Link>
  );
}
