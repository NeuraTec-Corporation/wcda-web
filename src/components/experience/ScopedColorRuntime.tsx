"use client";

import { useLayoutEffect } from "react";
import { useExperience } from "@/components/experience/useExperience";
import { applyScopedElementFills } from "@/config/scoped-colors";

export function ScopedColorRuntime() {
  const experience = useExperience();

  useLayoutEffect(() => {
    applyScopedElementFills(experience.scopedColors);
    const frame = window.requestAnimationFrame(() => {
      applyScopedElementFills(experience.scopedColors);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [experience]);

  return null;
}
