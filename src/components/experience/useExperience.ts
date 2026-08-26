"use client";

import { useEffect, useState } from "react";
import {
  approvedExperience,
  type ExperienceValues,
} from "@/config/experience";
import { isThemeLabPreview } from "@/config/theme";

type Listener = (experience: ExperienceValues) => void;

let previewExperience: ExperienceValues = approvedExperience;
const listeners = new Set<Listener>();

export function publishPreviewExperience(experience: ExperienceValues) {
  previewExperience = experience;
  listeners.forEach((listener) => listener(experience));
}

export function subscribePreviewExperience(listener: Listener) {
  listeners.add(listener);
  listener(previewExperience);
  return () => {
    listeners.delete(listener);
  };
}

export function useExperience() {
  const [experience, setExperience] = useState(approvedExperience);

  useEffect(() => {
    if (!isThemeLabPreview()) {
      return;
    }

    return subscribePreviewExperience(setExperience);
  }, []);

  return experience;
}
