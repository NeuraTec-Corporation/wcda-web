"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useExperience } from "@/components/experience/useExperience";
import { composerCssVars, getComponentConfig } from "@/config/experience";
import { resolveComposerSource } from "@/config/media-assets";

const DEFAULT_LOGO_SRC = "/images/wcda/branding/wcda-logo-symbol-blue.png";
const LOGO_INTRINSIC_WIDTH = 1536;
const LOGO_INTRINSIC_HEIGHT = 1024;

export function HeaderLogo() {
  const experience = useExperience();
  const config = getComponentConfig(experience, "header-logo");
  const source = resolveComposerSource(config.assetId, DEFAULT_LOGO_SRC);

  return (
    <Link
      href="/"
      className="exp-logo flex items-center no-underline"
      data-visual-target="header-logo"
      data-exp-size={config.sizePreset}
      data-exp-pad={config.padding}
      data-exp-fit="contain"
      data-exp-align={config.alignment}
      style={composerCssVars(config)}
    >
      {source.mode === "image" ? (
        <Image
          key={source.src}
          src={source.src}
          alt={siteConfig.name}
          width={LOGO_INTRINSIC_WIDTH}
          height={LOGO_INTRINSIC_HEIGHT}
          sizes="(min-width: 64rem) 8rem, 30vw"
          className="exp-logo-img"
          style={{ width: "auto", height: "auto" }}
          priority
        />
      ) : null}
    </Link>
  );
}
