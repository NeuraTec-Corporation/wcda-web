"use client";

import { useSyncExternalStore } from "react";
import { isThemeLabPreview } from "@/config/theme";

function subscribe() {
  return () => {};
}

function getLabPreviewSnapshot() {
  return isThemeLabPreview();
}

function getLabPreviewServerSnapshot() {
  return false;
}

export function useThemeLabPreview() {
  return useSyncExternalStore(
    subscribe,
    getLabPreviewSnapshot,
    getLabPreviewServerSnapshot,
  );
}
