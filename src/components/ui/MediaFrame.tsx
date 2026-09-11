"use client";

import Image from "next/image";
import { getMediaAsset, isRenderableMedia } from "@/data/media";
import { cn } from "@/lib/cn";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { useExperience } from "@/components/experience/useExperience";
import { useThemeLabPreview } from "@/components/experience/useThemeLabPreview";
import {
  composerCssVars,
  getComponentConfig,
  resolveItemMedia,
  resolveMediaPan,
  resolveSlotAssetId,
  type VisualTargetId,
} from "@/config/experience";
import { resolveComposerSource } from "@/config/media-assets";

type MediaFrameProps = {
  mediaKey?: string;
  className?: string;
  sizes?: string;
  aspectRatio?: string;
  decorative?: boolean;
  visualTarget?: VisualTargetId;
  composerTarget?: VisualTargetId;
  itemKey?: string;
};

export function MediaFrame({
  mediaKey,
  className,
  sizes = "(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw",
  aspectRatio: aspectRatioOverride,
  decorative = false,
  visualTarget,
  composerTarget,
  itemKey,
}: MediaFrameProps) {
  const experience = useExperience();
  const target = composerTarget ?? visualTarget;
  const config = resolveItemMedia(
    getComponentConfig(experience, target),
    itemKey,
  );
  const asset = getMediaAsset(mediaKey);
  const renderable = isRenderableMedia(asset);
  const source = resolveComposerSource(
    resolveSlotAssetId(config, itemKey),
    renderable ? asset.src : undefined,
  );
  const showImage = source.mode === "image";
  const aspectRatio = aspectRatioOverride ?? asset?.aspectRatio ?? "4 / 3";
  const alt = decorative ? "" : (asset?.alt ?? "");
  const placeholderLabel = decorative
    ? undefined
    : (asset?.title ?? asset?.alt ?? undefined);
  const labPreview = useThemeLabPreview();
  const pan = resolveMediaPan(config);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-placeholder exp-media",
        className,
      )}
      style={{
        aspectRatio: `var(--exp-media-aspect, ${aspectRatio})`,
        ["--exp-media-aspect-fallback" as string]: aspectRatio,
        ...composerCssVars(config),
      }}
      data-visual-target={visualTarget}
      data-lab-item-id={itemKey}
      data-lab-media="1"
      data-container-preset={visualTarget ? config.containerPreset : undefined}
      data-media-style={visualTarget ? config.mediaStyle : undefined}
      data-exp-size={config.sizePreset}
      data-exp-pad={config.padding}
      data-exp-fit={config.fit}
      data-exp-x={String(config.positionX)}
      data-exp-y={String(config.positionY)}
      data-exp-scale={String(config.scale)}
      data-exp-pan-x={String(pan.panX)}
      data-exp-pan-y={String(pan.panY)}
      data-exp-pan-free={pan.allowFreeOverflow ? "1" : "0"}
      data-exp-bg={labPreview ? config.previewBackground : undefined}
    >
      {showImage ? (
        <div className="exp-media-stage">
          <div className="exp-media-transform">
            <Image
              key={source.src}
              src={source.src}
              alt={alt}
              fill
              sizes={sizes}
              unoptimized={source.src.endsWith(".svg")}
              className="exp-media-img"
              style={{
                objectPosition:
                  "var(--exp-media-x, 50%) var(--exp-media-y, 50%)",
              }}
            />
          </div>
        </div>
      ) : (
        <MediaPlaceholder compact={decorative} label={placeholderLabel} />
      )}
    </div>
  );
}
