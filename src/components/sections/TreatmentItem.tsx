import Link from "next/link";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { cn } from "@/lib/cn";
import type { VisualTargetId } from "@/config/experience";
import type { PublicationStatus } from "@/types/navigation";

type TreatmentItemProps = {
  title: string;
  mediaKey?: string;
  href?: string;
  status?: PublicationStatus;
  composerTarget?: VisualTargetId;
  visualTarget?: VisualTargetId;
};

export function TreatmentItem({
  title,
  mediaKey,
  href,
  composerTarget,
  visualTarget,
}: TreatmentItemProps) {
  const content = (
    <>
      <div className="size-6 shrink-0 overflow-visible sm:size-7 lg:size-8">
        <MediaFrame
          mediaKey={mediaKey}
          composerTarget={composerTarget}
          visualTarget={visualTarget}
          decorative
          aspectRatio="1 / 1"
          className="rounded-sm"
          sizes="32px"
        />
      </div>
      <span className="min-w-0 text-sm font-medium leading-snug text-foreground">
        {title}
      </span>
    </>
  );

  const className = cn(
    "flex min-w-0 items-center gap-2 rounded-sm px-1 py-1.5 text-foreground no-underline",
    href ? "hover:bg-surface-muted hover:text-primary" : undefined,
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
