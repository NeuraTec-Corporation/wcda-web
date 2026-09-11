"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { useExperience } from "@/components/experience/useExperience";
import { useThemeLabPreview } from "@/components/experience/useThemeLabPreview";
import { IntegratedCutout } from "@/components/experience/IntegratedCutout";
import {
  composerCssVars,
  getComponentConfig,
  insetBadgeSizePx,
  isInsetBadgeCutoutPreset,
} from "@/config/experience";
import { resolveComposerSource } from "@/config/media-assets";

type ContactMediaStageProps = {
  className?: string;
  children: ReactNode;
};

export function ContactMediaStage({
  className,
  children,
}: ContactMediaStageProps) {
  const experience = useExperience();
  const config = getComponentConfig(experience, "contact-media");
  const source = resolveComposerSource(config.assetId);
  const labPreview = useThemeLabPreview();
  const useCutout = isInsetBadgeCutoutPreset(config.containerPreset);
  const frameProps = {
    className: cn(className, "exp-media bg-placeholder"),
    "data-visual-target": "contact-media",
    "data-container-preset": config.containerPreset,
    "data-media-style": config.mediaStyle,
    "data-exp-size": config.sizePreset,
    "data-exp-pad": config.padding,
    "data-exp-fit": config.fit,
    "data-exp-bg": labPreview ? config.previewBackground : undefined,
    style: composerCssVars(config),
  };

  const frame =
    source.mode === "image" ? (
      <div {...frameProps}>
        <div className="exp-media-stage">
          <Image
            key={source.src}
            src={source.src}
            alt=""
            fill
            sizes="100vw"
            unoptimized={source.src.endsWith(".svg")}
            className="exp-media-img"
            style={{
              objectFit: config.fit,
              objectPosition: `${config.positionX}% ${config.positionY}%`,
              transform: `scale(${config.scale})`,
              transformOrigin: "center",
            }}
          />
        </div>
      </div>
    ) : source.mode === "placeholder" ? (
      <div {...frameProps}>
        <MediaPlaceholder label="Contact media" />
      </div>
    ) : (
      <div {...frameProps} className={cn(className, "exp-media")}>
        {children}
      </div>
    );

  if (useCutout) {
    return (
      <IntegratedCutout
        className="block w-full min-w-0"
        anchor="bottom-left"
        circleSize={insetBadgeSizePx(config)}
      >
        {frame}
      </IntegratedCutout>
    );
  }

  return frame;
}
