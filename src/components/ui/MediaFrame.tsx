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
};

export function MediaFrame({
  mediaKey,
  className,
  sizes = "(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw",
  aspectRatio: aspectRatioOverride,
  decorative = false,
  visualTarget,
  composerTarget,
}: MediaFrameProps) {
  const experience = useExperience();
  const target = composerTarget ?? visualTarget;
  const config = getComponentConfig(experience, target);
  const asset = getMediaAsset(mediaKey);
  const renderable = isRenderableMedia(asset);
  const source = resolveComposerSource(
    config.assetId,
    renderable ? asset.src : undefined,
  );
  const showImage = source.mode === "image";
  const aspectRatio = aspectRatioOverride ?? asset?.aspectRatio ?? "4 / 3";
  const alt = decorative ? "" : (asset?.alt ?? "");
  const placeholderLabel = decorative
    ? undefined
    : (asset?.title ?? asset?.alt ?? undefined);
  const labPreview = useThemeLabPreview();

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
      data-container-preset={visualTarget ? config.containerPreset : undefined}
      data-media-style={visualTarget ? config.mediaStyle : undefined}
      data-exp-size={config.sizePreset}
      data-exp-pad={config.padding}
      data-exp-fit={config.fit}
      data-exp-bg={labPreview ? config.previewBackground : undefined}
    >
      {showImage ? (
        <div className="exp-media-stage">
          <Image
            key={source.src}
            src={source.src}
            alt={alt}
            fill
            sizes={sizes}
            className="exp-media-img"
            style={{
              objectFit: config.fit,
              objectPosition: `${config.positionX}% ${config.positionY}%`,
              transform: `scale(${config.scale})`,
              transformOrigin: "center",
            }}
          />
        </div>
      ) : (
        <MediaPlaceholder compact={decorative} label={placeholderLabel} />
      )}
    </div>
  );
}
