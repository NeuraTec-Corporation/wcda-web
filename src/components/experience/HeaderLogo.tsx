"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useExperience } from "@/components/experience/useExperience";
import { useThemeLabPreview } from "@/components/experience/useThemeLabPreview";
import { composerCssVars, getComponentConfig } from "@/config/experience";
import { resolveComposerSource } from "@/config/media-assets";

const DEFAULT_LOGO_SRC = "/images/wcda/branding/wcda-logo.png";

export function HeaderLogo() {
  const experience = useExperience();
  const config = getComponentConfig(experience, "header-logo");
  const source = resolveComposerSource(config.assetId, DEFAULT_LOGO_SRC);
  const labPreview = useThemeLabPreview();
  const previewBg =
    labPreview && config.previewBackground !== "auto"
      ? config.previewBackground
      : undefined;

  return (
    <Link
      href="/"
      className="exp-logo flex items-center no-underline"
      data-visual-target="header-logo"
      data-exp-size={config.sizePreset}
      data-exp-pad={config.padding}
      data-exp-fit={config.fit}
      data-exp-align={config.alignment}
      data-media-style={config.mediaStyle}
      style={composerCssVars(config)}
    >
      <span className="exp-logo-frame" data-exp-bg={previewBg}>
        <span className="exp-logo-stage">
          {source.mode === "image" ? (
            <Image
              key={source.src}
              src={source.src}
              alt={siteConfig.name}
              fill
              sizes="(min-width: 64rem) 21rem, 58vw"
              className="exp-logo-img"
              priority
            />
          ) : null}
        </span>
      </span>
    </Link>
  );
}
