"use client";

import { useEffect } from "react";
import { publishPreviewExperience } from "@/components/experience/useExperience";
import {
  applyExperienceToDocument,
  approvedExperience,
  clearExperienceFromDocument,
  type ExperienceValues,
  type VisualTargetId,
} from "@/config/experience";
import {
  THEME_LAB_MESSAGE,
  THEME_LAB_READY,
  applyThemeToElement,
  clearThemeFromElement,
  isThemeLabPreview,
  type ThemeValues,
} from "@/config/theme";

export function ThemePreviewBridge() {
  useEffect(() => {
    if (!isThemeLabPreview()) {
      return;
    }

    document.documentElement.dataset.themeLab = "1";

    function handleMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) {
        return;
      }

      if (event.data?.type !== THEME_LAB_MESSAGE) {
        return;
      }

      const theme = event.data.theme as ThemeValues | undefined;
      const experience = event.data.experience as ExperienceValues | undefined;
      const selectedTarget = event.data.selectedTarget as
        | VisualTargetId
        | undefined;

      if (theme) {
        applyThemeToElement(theme, document.documentElement);
      }

      if (experience) {
        publishPreviewExperience(experience);
        applyExperienceToDocument(
          experience,
          selectedTarget ?? "home-hero-media",
        );
      }
    }

    window.addEventListener("message", handleMessage);
    window.parent.postMessage({ type: THEME_LAB_READY }, window.location.origin);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearThemeFromElement(document.documentElement);
      clearExperienceFromDocument();
      delete document.documentElement.dataset.themeLab;
      publishPreviewExperience(approvedExperience);
    };
  }, []);

  return null;
}
