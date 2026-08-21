import Image from "next/image";
import { getMediaAsset, isRenderableMedia } from "@/data/media";
import { cn } from "@/lib/cn";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

type MediaFrameProps = {
  mediaKey?: string;
  className?: string;
  sizes?: string;
  aspectRatio?: string;
  decorative?: boolean;
};

export function MediaFrame({
  mediaKey,
  className,
  sizes = "(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw",
  aspectRatio: aspectRatioOverride,
  decorative = false,
}: MediaFrameProps) {
  const asset = getMediaAsset(mediaKey);
  const renderable = isRenderableMedia(asset);
  const aspectRatio = aspectRatioOverride ?? asset?.aspectRatio ?? "4 / 3";
  const objectPosition = asset?.focalPoint
    ? `${asset.focalPoint.x}% ${asset.focalPoint.y}%`
    : undefined;
  const alt = decorative ? "" : (asset?.alt ?? "");

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-surface-muted", className)}
      style={{ aspectRatio }}
    >
      {renderable ? (
        <Image
          src={asset.src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
      ) : (
        <MediaPlaceholder />
      )}
    </div>
  );
}
