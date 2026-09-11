"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useExperience } from "@/components/experience/useExperience";
import {
  getComponentConfig,
  heroContentCssVars,
} from "@/config/experience";

type HeroContentStageProps = {
  className?: string;
  children: ReactNode;
  contentScope?: string;
};

export function HeroContentStage({
  className,
  children,
  contentScope,
}: HeroContentStageProps) {
  const experience = useExperience();
  const config = getComponentConfig(experience, "home-hero-content");

  return (
    <div
      className={cn("home-hero-cinematic__group bg-transparent", className)}
      data-visual-target="home-hero-content"
      data-hero-module="group"
      data-content-scope={contentScope}
      style={heroContentCssVars(config) as CSSProperties}
    >
      {children}
    </div>
  );
}
