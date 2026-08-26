"use client";

import type { ReactNode } from "react";
import { useExperience } from "@/components/experience/useExperience";

type ExperienceFeature = "marquee" | "beforeAfter" | "video";

type ExperienceSlotProps = {
  feature: ExperienceFeature;
  children: ReactNode;
};

export function ExperienceSlot({ feature, children }: ExperienceSlotProps) {
  const experience = useExperience();
  const visible =
    feature === "marquee"
      ? experience.marquee.enabled
      : feature === "beforeAfter"
        ? experience.beforeAfter.enabled
        : experience.video.enabled;

  if (!visible) {
    return null;
  }

  return children;
}
