import type { LabEditorElementId, LabMode } from "@/config/lab-registry";
import {
  CONTENT_ELEMENT_FIELDS,
  isContentElementId,
} from "@/config/site-content";

export const THEME_LAB_FOCUS = "wcda-theme-lab-focus";

export type LabPreviewFocus = {
  mode: LabMode;
  pageId: string;
  sectionId: string;
  elementId: LabEditorElementId;
  isolateSection: boolean;
  sectionLabel: string;
  elementLabel: string;
  visualTarget?: string;
  itemKey?: string;
};

const SECTION_ACTIVE = "labSectionActive";
const ELEMENT_ACTIVE = "labElementActive";
const ELEMENT_ATTR = "labElementId";
const ELEMENT_BADGE = "labElementBadge";
const SECTION_BADGE = "labSectionBadge";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function querySection(pageId: string, sectionId: string) {
  if (!pageId || !sectionId) {
    return null;
  }
  return document.querySelector<HTMLElement>(
    `[data-lab-page-id="${pageId}"][data-lab-section-id="${sectionId}"]`,
  );
}

function stampElementIds() {
  document.querySelectorAll<HTMLElement>("[data-visual-target]").forEach((node) => {
    const target = node.dataset.visualTarget;
    if (target) {
      node.dataset[ELEMENT_ATTR] = target;
    }
  });
}

function clearLabFocusDom() {
  const root = document.documentElement;
  delete root.dataset.labMode;
  delete root.dataset.labIsolate;
  delete root.dataset.labPage;
  delete root.dataset.labSection;
  delete root.dataset.labElement;

  document.querySelectorAll<HTMLElement>("[data-lab-section-active]").forEach((node) => {
    delete node.dataset[SECTION_ACTIVE];
    delete node.dataset[SECTION_BADGE];
  });
  document.querySelectorAll<HTMLElement>("[data-lab-element-active]").forEach((node) => {
    delete node.dataset[ELEMENT_ACTIVE];
    delete node.dataset[ELEMENT_BADGE];
  });
  document.querySelectorAll<HTMLElement>("[data-lab-element-id]").forEach((node) => {
    delete node.dataset[ELEMENT_ATTR];
  });
}

function scrollToTarget(node: HTMLElement, block: ScrollLogicalPosition) {
  node.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block,
    inline: "nearest",
  });
}

function contentSelectorFor(elementId: string) {
  if (elementId === "home-hero-content") {
    return '[data-content-scope="home.hero"]';
  }
  if (elementId === "home-practice-content") {
    return '[data-content-scope="home.practice"]';
  }
  if (elementId === "home-hero-pillars") {
    return '[data-content-target="home.hero.pillars"]';
  }
  if (isContentElementId(elementId)) {
    const field = CONTENT_ELEMENT_FIELDS[elementId][0];
    return field ? `[data-content-target="${field}"]` : null;
  }
  return null;
}

export function applyLabPreviewFocus(focus: LabPreviewFocus | null): boolean {
  const root = document.documentElement;
  if (!root.dataset.themeLab) {
    return false;
  }

  clearLabFocusDom();

  if (!focus || focus.mode !== "editor" || !focus.sectionId) {
    root.dataset.labMode = focus?.mode ?? "system";
    return true;
  }

  stampElementIds();
  document.querySelectorAll<HTMLElement>("[data-content-target]").forEach((node) => {
    const target = node.dataset.contentTarget;
    if (target) {
      node.dataset[ELEMENT_ATTR] = target;
    }
  });
  root.dataset.labMode = "editor";
  root.dataset.labPage = focus.pageId;
  root.dataset.labSection = focus.sectionId;
  root.dataset.labElement = String(focus.elementId);
  if (focus.isolateSection) {
    root.dataset.labIsolate = "section";
  }

  const section = querySection(focus.pageId, focus.sectionId);
  if (!section) {
    return false;
  }

  section.dataset[SECTION_ACTIVE] = "";
  if (focus.sectionLabel) {
    section.dataset[SECTION_BADGE] = focus.sectionLabel;
  }

  const highlightElement =
    focus.elementId !== "section" && Boolean(focus.elementId);
  if (highlightElement) {
    const itemMembers =
      focus.itemKey
        ? section.querySelectorAll<HTMLElement>(
            `[data-lab-item-id="${focus.itemKey}"]`,
          )
        : [];
    const visualMembers = section.querySelectorAll<HTMLElement>(
      `[data-visual-target="${focus.visualTarget ?? focus.elementId}"]`,
    );
    const contentSelector = contentSelectorFor(focus.elementId);
    const contentMembers = contentSelector
      ? section.querySelectorAll<HTMLElement>(contentSelector)
      : [];
    const members =
      itemMembers.length > 0
        ? itemMembers
        : visualMembers.length > 0
          ? visualMembers
          : contentMembers;
    members.forEach((node, index) => {
      node.dataset[ELEMENT_ACTIVE] = "";
      if (index === 0 && focus.elementLabel) {
        node.dataset[ELEMENT_BADGE] = focus.elementLabel;
      }
    });
    scrollToTarget(section, focus.isolateSection ? "start" : "center");
    const first = members[0];
    if (first && first !== section) {
      window.setTimeout(
        () => scrollToTarget(first, "nearest"),
        prefersReducedMotion() ? 0 : 180,
      );
    }
  } else {
    scrollToTarget(section, focus.isolateSection ? "start" : "center");
  }

  return true;
}

export function clearLabPreviewFocus() {
  clearLabFocusDom();
}
