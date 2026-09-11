"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { getMediaAsset, isRenderableMedia } from "@/data/media";
import { cn } from "@/lib/cn";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { useExperience } from "@/components/experience/useExperience";
import { useThemeLabPreview } from "@/components/experience/useThemeLabPreview";
import { HOME_HERO_MEDIA } from "@/config/home-hero-media";
import {
  composerCssVars,
  getComponentConfig,
  type VisualTargetId,
} from "@/config/experience";
import { resolveComposerSource } from "@/config/media-assets";

type HeroMediaProps = {
  mediaKey?: string;
  visualTarget?: VisualTargetId;
};

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

export function HeroMedia({
  mediaKey = HOME_HERO_MEDIA.mediaKey,
  visualTarget = "home-hero-media",
}: HeroMediaProps) {
  const experience = useExperience();
  const config = getComponentConfig(experience, visualTarget);
  const asset = getMediaAsset(mediaKey);
  const renderable = isRenderableMedia(asset);
  const source = resolveComposerSource(
    config.assetId,
    renderable ? asset.src : HOME_HERO_MEDIA.poster,
  );
  const showImage = source.mode === "image";
  const poster = showImage ? source.src : HOME_HERO_MEDIA.poster;
  const reducedMotion = usePrefersReducedMotion();
  const playVideo =
    HOME_HERO_MEDIA.video.enabled && !reducedMotion && Boolean(poster);
  const cinematicDefault = config.positionX === 50 && config.positionY === 50;
  const labPreview = useThemeLabPreview();
  const alt = asset?.alt ?? "Dr. Jonnathan Matute examining a patient at West Caldwell Dental Arts";

  return (
    <div
      className={cn(
        "home-hero-media relative h-full min-h-0 w-full overflow-hidden bg-placeholder exp-media",
      )}
      style={{
        ...composerCssVars(config),
        ...(cinematicDefault
          ? {
              ["--exp-media-x" as string]: "var(--home-hero-focus-x)",
              ["--exp-media-y" as string]: "var(--home-hero-focus-y)",
            }
          : {}),
      }}
      data-visual-target={visualTarget}
      data-container-preset={config.containerPreset}
      data-media-style={config.mediaStyle}
      data-exp-size={config.sizePreset}
      data-exp-pad={config.padding}
      data-exp-fit={config.fit}
      data-exp-bg={labPreview ? config.previewBackground : undefined}
      data-cinematic-default={cinematicDefault ? "" : undefined}
    >
      {playVideo ? (
        <div className="exp-media-stage">
          <video
            className="exp-media-img"
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
            aria-hidden="true"
          >
            <source src={HOME_HERO_MEDIA.video.webm} type="video/webm" />
            <source src={HOME_HERO_MEDIA.video.mp4} type="video/mp4" />
          </video>
        </div>
      ) : showImage ? (
        <div className="exp-media-stage">
          <Image
            key={poster}
            src={poster}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="exp-media-img"
            style={{
              objectFit: config.fit,
              objectPosition: cinematicDefault
                ? "var(--home-hero-focus-x) var(--home-hero-focus-y)"
                : `${config.positionX}% ${config.positionY}%`,
              transform: `scale(${config.scale})`,
              transformOrigin: "center",
            }}
          />
        </div>
      ) : (
        <MediaPlaceholder label={asset?.title ?? asset?.alt} />
      )}
    </div>
  );
}
