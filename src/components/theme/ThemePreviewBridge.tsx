"use client";

import { useEffect } from "react";
import { publishPreviewExperience } from "@/components/experience/useExperience";
import {
  applyExperienceToDocument,
  approvedExperience,
  clearExperienceFromDocument,
  isPerItemMediaTarget,
  mediaPanLimit,
  updateItemMedia,
  type ExperienceValues,
  type VisualTargetId,
} from "@/config/experience";
import {
  parseContentPublicationPatch,
  setPublicationPreviewOverride,
} from "@/config/content-publication";
import {
  applyLabPreviewFocus,
  clearLabPreviewFocus,
  THEME_LAB_FOCUS,
  type LabPreviewFocus,
} from "@/config/lab-preview-focus";
import { applyScopedElementFills } from "@/config/scoped-colors";
import {
  parseSiteContentPatch,
  approvedSiteContent,
} from "@/config/site-content";
import { publishPreviewSiteContent } from "@/components/content/useSiteContent";
import {
  THEME_LAB_MEDIA_PAN,
  THEME_LAB_MESSAGE,
  THEME_LAB_READY,
  THEME_LAB_SELECT,
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
    let focusTimer = 0;
    let pendingFocus: LabPreviewFocus | null = null;
    let lastExperience: ExperienceValues = approvedExperience;

    function applyFocus(focus: LabPreviewFocus | null) {
      pendingFocus = focus;
      window.clearTimeout(focusTimer);
      let attempts = 0;
      const run = () => {
        const ok = applyLabPreviewFocus(pendingFocus);
        applyScopedElementFills(lastExperience.scopedColors);
        attempts += 1;
        if (!ok && pendingFocus?.mode === "editor" && attempts < 24) {
          focusTimer = window.setTimeout(run, 50);
        }
      };
      run();
    }

    function resolvePreviewTarget(event: Event) {
      const node = event.target;
      if (!(node instanceof Element)) {
        return null;
      }
      const media = node.closest("[data-lab-media]");
      const item = node.closest("[data-lab-item-id]");
      const visual = node.closest("[data-visual-target]");
      const section = node.closest("[data-lab-page-id][data-lab-section-id]");
      if (!visual && !section && !item) {
        return null;
      }
      const visualEl = visual as HTMLElement | null;
      const itemEl = item as HTMLElement | null;
      const sectionEl = section as HTMLElement | null;
      return {
        visualTarget: visualEl?.dataset.visualTarget,
        itemKey: itemEl?.dataset.labItemId,
        pageId: sectionEl?.dataset.labPageId,
        sectionId: sectionEl?.dataset.labSectionId,
        media: Boolean(media || node.closest("img, .exp-media")),
      };
    }

    function postSelect(
      kind: "click" | "contextmenu",
      event: MouseEvent,
      target: NonNullable<ReturnType<typeof resolvePreviewTarget>>,
    ) {
      window.parent.postMessage(
        {
          type: THEME_LAB_SELECT,
          kind,
          clientX: event.clientX,
          clientY: event.clientY,
          pageId: target.pageId,
          sectionId: target.sectionId,
          visualTarget: target.visualTarget,
          itemKey: target.itemKey,
          media: target.media,
        },
        window.location.origin,
      );
    }

    function handleClick(event: MouseEvent) {
      if (drag?.moved) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      const target = resolvePreviewTarget(event);
      if (!target) {
        return;
      }
      const node = event.target;
      if (node instanceof Element && node.closest("a")) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      postSelect("click", event, target);
    }

    function handleContextMenu(event: MouseEvent) {
      const target = resolvePreviewTarget(event);
      if (!target) {
        return;
      }
      event.preventDefault();
      postSelect("contextmenu", event, target);
    }

    type MediaDrag = {
      node: HTMLElement;
      pointerId: number;
      startX: number;
      startY: number;
      startPanX: number;
      startPanY: number;
      width: number;
      height: number;
      scale: number;
      free: boolean;
      visualTarget: VisualTargetId;
      itemKey: string;
      moved: boolean;
      panX: number;
      panY: number;
    };
    let drag: MediaDrag | null = null;
    let panFrame = 0;

    function selectedPanMedia(event: Event) {
      const node = event.target;
      if (!(node instanceof Element)) {
        return null;
      }
      const media = node.closest("[data-lab-media]");
      if (!(media instanceof HTMLElement)) {
        return null;
      }
      if (media.dataset.labElementActive === undefined) {
        return null;
      }
      const visualTarget = media.dataset.visualTarget;
      const itemKey = media.dataset.labItemId;
      if (!isPerItemMediaTarget(visualTarget) || !itemKey) {
        return null;
      }
      return { media, visualTarget, itemKey };
    }

    function readPan(node: HTMLElement, axis: "x" | "y") {
      const css = Number.parseFloat(
        node.style.getPropertyValue(
          axis === "x" ? "--exp-media-pan-x" : "--exp-media-pan-y",
        ),
      );
      if (Number.isFinite(css)) {
        return css;
      }
      const data = Number.parseFloat(
        axis === "x" ? (node.dataset.expPanX ?? "") : (node.dataset.expPanY ?? ""),
      );
      return Number.isFinite(data) ? data : 0;
    }

    function paintPan(node: HTMLElement, panX: number, panY: number) {
      node.style.setProperty("--exp-media-pan-x", String(panX));
      node.style.setProperty("--exp-media-pan-y", String(panY));
      node.dataset.expPanX = String(Math.round(panX));
      node.dataset.expPanY = String(Math.round(panY));
    }

    function postPan(
      visualTarget: VisualTargetId,
      itemKey: string,
      panX: number,
      panY: number,
    ) {
      window.parent.postMessage(
        {
          type: THEME_LAB_MEDIA_PAN,
          visualTarget,
          itemKey,
          panX,
          panY,
        },
        window.location.origin,
      );
    }

    function commitDragPan(next: MediaDrag, panX: number, panY: number) {
      const limit = mediaPanLimit(next.scale, next.free);
      const clampedX = Math.min(limit, Math.max(-limit, panX));
      const clampedY = Math.min(limit, Math.max(-limit, panY));
      next.panX = clampedX;
      next.panY = clampedY;
      paintPan(next.node, clampedX, clampedY);
      window.cancelAnimationFrame(panFrame);
      panFrame = window.requestAnimationFrame(() => {
        postPan(next.visualTarget, next.itemKey, clampedX, clampedY);
      });
    }

    function handlePointerDown(event: PointerEvent) {
      if (event.button !== 0) {
        return;
      }
      const selected = selectedPanMedia(event);
      if (!selected) {
        return;
      }
      event.preventDefault();
      const rect = selected.media.getBoundingClientRect();
      selected.media.setPointerCapture(event.pointerId);
      selected.media.dataset.expPanning = "";
      const panX = readPan(selected.media, "x");
      const panY = readPan(selected.media, "y");
      drag = {
        node: selected.media,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startPanX: panX,
        startPanY: panY,
        width: Math.max(1, rect.width),
        height: Math.max(1, rect.height),
        scale: Number.parseFloat(selected.media.dataset.expScale ?? "1") || 1,
        free: selected.media.dataset.expPanFree === "1",
        visualTarget: selected.visualTarget,
        itemKey: selected.itemKey,
        moved: false,
        panX,
        panY,
      };
    }

    function handlePointerMove(event: PointerEvent) {
      if (!drag || event.pointerId !== drag.pointerId) {
        return;
      }
      const panX =
        drag.startPanX + ((event.clientX - drag.startX) / drag.width) * 100;
      const panY =
        drag.startPanY + ((event.clientY - drag.startY) / drag.height) * 100;
      if (
        Math.abs(event.clientX - drag.startX) > 2 ||
        Math.abs(event.clientY - drag.startY) > 2
      ) {
        drag.moved = true;
      }
      commitDragPan(drag, panX, panY);
    }

    function endDrag(event: PointerEvent) {
      if (!drag || event.pointerId !== drag.pointerId) {
        return;
      }
      const finished = drag;
      try {
        finished.node.releasePointerCapture(event.pointerId);
      } catch {
        /* capture already released */
      }
      delete finished.node.dataset.expPanning;
      window.cancelAnimationFrame(panFrame);
      postPan(
        finished.visualTarget,
        finished.itemKey,
        finished.panX,
        finished.panY,
      );
      lastExperience = updateItemMedia(
        lastExperience,
        finished.visualTarget,
        finished.itemKey,
        { panX: finished.panX, panY: finished.panY },
      );
      publishPreviewExperience(lastExperience);
      window.setTimeout(() => {
        drag = null;
      }, 0);
    }

    function handleMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) {
        return;
      }

      if (event.data?.type === THEME_LAB_FOCUS) {
        applyFocus((event.data.focus as LabPreviewFocus | null) ?? null);
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
      const publication = parseContentPublicationPatch(event.data.publication);
      const siteContent = parseSiteContentPatch(event.data.siteContent);
      const focus = event.data.focus as LabPreviewFocus | undefined;

      if (theme) {
        applyThemeToElement(theme, document.documentElement);
      }

      if (experience) {
        lastExperience = experience;
        publishPreviewExperience(experience);
        if (!drag) {
          applyExperienceToDocument(
            experience,
            selectedTarget ?? "home-hero-media",
          );
        }
      }

      if (publication) {
        setPublicationPreviewOverride(publication);
      }

      if (siteContent) {
        publishPreviewSiteContent(siteContent);
      }

      if (focus) {
        applyFocus(focus);
      }
    }

    window.addEventListener("message", handleMessage);
    window.addEventListener("click", handleClick, true);
    window.addEventListener("contextmenu", handleContextMenu, true);
    window.addEventListener("pointerdown", handlePointerDown, true);
    window.addEventListener("pointermove", handlePointerMove, true);
    window.addEventListener("pointerup", endDrag, true);
    window.addEventListener("pointercancel", endDrag, true);
    window.parent.postMessage({ type: THEME_LAB_READY }, window.location.origin);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("click", handleClick, true);
      window.removeEventListener("contextmenu", handleContextMenu, true);
      window.removeEventListener("pointerdown", handlePointerDown, true);
      window.removeEventListener("pointermove", handlePointerMove, true);
      window.removeEventListener("pointerup", endDrag, true);
      window.removeEventListener("pointercancel", endDrag, true);
      window.cancelAnimationFrame(panFrame);
      window.clearTimeout(focusTimer);
      clearThemeFromElement(document.documentElement);
      clearExperienceFromDocument();
      setPublicationPreviewOverride(null);
      publishPreviewSiteContent(approvedSiteContent);
      clearLabPreviewFocus();
      delete document.documentElement.dataset.themeLab;
      publishPreviewExperience(approvedExperience);
    };
  }, []);

  return null;
}
