"use client";

import { useSyncExternalStore } from "react";
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

function subscribe(onStoreChange: () => void) {
  if (!isThemeLabPreview()) {
    return () => {};
  }
  return subscribePreviewExperience(() => onStoreChange());
}

function getPreviewSnapshot() {
  return isThemeLabPreview() ? previewExperience : approvedExperience;
}

function getServerSnapshot() {
  return approvedExperience;
}

export function useExperience() {
  return useSyncExternalStore(
    subscribe,
    getPreviewSnapshot,
    getServerSnapshot,
  );
}
