import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { ServiceCategory } from "@/types/content";

type CareAreaCardProps = {
  category: ServiceCategory;
};

export function CareAreaCard({ category }: CareAreaCardProps) {
  return (
    <Link
      href={`/services/${category.slug}`}
      className="group block h-full min-w-0 rounded-lg text-foreground no-underline"
    >
      <Card className="flex h-full min-w-0 flex-col overflow-hidden p-0 shadow-xs transition-shadow group-hover:shadow-md group-focus-visible:shadow-md">
        <MediaFrame mediaKey={category.mediaKey} className="rounded-none" />
        <div className="flex flex-1 flex-col gap-2 p-card">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {category.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted">
            {category.summary}
          </p>
        </div>
      </Card>
    </Link>
  );
}
