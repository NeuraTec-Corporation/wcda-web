"use client";

import { useEffect, useState } from "react";
import {
  approvedSiteContent,
  parseSiteContentPatch,
  pickSiteContentPatch,
  type SiteContentPatch,
} from "@/config/site-content";
import { isThemeLabPreview } from "@/config/theme";

type Listener = (content: SiteContentPatch) => void;

let previewContent: SiteContentPatch = pickSiteContentPatch(approvedSiteContent);
const listeners = new Set<Listener>();

export function publishPreviewSiteContent(content: SiteContentPatch) {
  previewContent = pickSiteContentPatch(content);
  listeners.forEach((listener) => listener(previewContent));
}

export function subscribePreviewSiteContent(listener: Listener) {
  listeners.add(listener);
  listener(previewContent);
  return () => {
    listeners.delete(listener);
  };
}

export function getActiveSiteContent(): SiteContentPatch {
  if (typeof window !== "undefined" && isThemeLabPreview()) {
    return previewContent;
  }
  return pickSiteContentPatch(approvedSiteContent);
}

export function useSiteContent() {
  const [content, setContent] = useState(() =>
    pickSiteContentPatch(approvedSiteContent),
  );

  useEffect(() => {
    if (!isThemeLabPreview()) {
      return;
    }
    return subscribePreviewSiteContent((next) => {
      setContent(parseSiteContentPatch(next) ?? {});
    });
  }, []);

  return content;
}
