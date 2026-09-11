import { notFound } from "next/navigation";
import {
  getActivePublicationPatch,
  isPubliclyVisible,
  resolvePageEnabled,
  type ContentPageId,
} from "@/config/content-publication";
import { getContentPageByPath } from "@/config/publication-catalog";
import { THEME_LAB_QUERY, isThemeLabEnabled } from "@/config/theme";

export function isLabPreviewSearch(
  searchParams?: Record<string, string | string[] | undefined>,
) {
  if (!isThemeLabEnabled()) {
    return false;
  }
  const value = searchParams?.[THEME_LAB_QUERY];
  const token = Array.isArray(value) ? value[0] : value;
  return token === "1";
}

export function isPagePublic(pageId: ContentPageId) {
  return isPubliclyVisible({
    enabled: resolvePageEnabled(getActivePublicationPatch(), pageId),
    status: "published",
  });
}

export function isPathPublic(path: string) {
  const page = getContentPageByPath(path);
  if (!page) {
    return true;
  }
  return isPagePublic(page.id);
}

export function assertPagePublic(
  pageId: ContentPageId,
  searchParams?: Record<string, string | string[] | undefined>,
) {
  if (isLabPreviewSearch(searchParams)) {
    return;
  }
  if (!isPagePublic(pageId)) {
    notFound();
  }
}
