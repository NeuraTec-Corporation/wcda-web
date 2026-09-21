import {
  isContentPageId,
  type ContentPageId,
} from "@/config/content-publication";
import { isHexColor, parseHexColorInput } from "@/config/theme";

export type ScopedColors = {
  pages?: Partial<Record<ContentPageId, string>>;
  sections?: Partial<Record<string, string>>;
  elements?: Partial<Record<string, string>>;
};

export function sectionColorKey(pageId: string, sectionId: string) {
  return `${pageId}/${sectionId}`;
}

export const ELEMENT_INSTANCE_KEY_SEP = "__";

export function elementScopedColorKey(visualTarget: string, itemKey?: string) {
  if (!itemKey) {
    return visualTarget;
  }
  return `${visualTarget}${ELEMENT_INSTANCE_KEY_SEP}${itemKey}`;
}

export function parseElementScopedColorKey(key: string): {
  visualTarget: string;
  itemKey?: string;
} {
  const index = key.indexOf(ELEMENT_INSTANCE_KEY_SEP);
  if (index <= 0) {
    return { visualTarget: key };
  }
  const visualTarget = key.slice(0, index);
  const itemKey = key.slice(index + ELEMENT_INSTANCE_KEY_SEP.length);
  if (!visualTarget || !itemKey) {
    return { visualTarget: key };
  }
  return { visualTarget, itemKey };
}

function isSafeScopedSelectorToken(value: string) {
  return /^[a-zA-Z0-9_-]+$/.test(value);
}

function parseHexMap(
  input: unknown,
  allowKey: (key: string) => boolean,
): Record<string, string> | undefined {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return undefined;
  }
  const next: Record<string, string> = {};
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (!allowKey(key) || typeof value !== "string") {
      continue;
    }
    const hex = parseHexColorInput(value);
    if (!hex) {
      continue;
    }
    next[key] = hex;
  }
  return Object.keys(next).length > 0 ? next : undefined;
}

export function parseScopedColors(input: unknown): ScopedColors | undefined {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return undefined;
  }
  const record = input as Record<string, unknown>;
  const pages = parseHexMap(record.pages, isContentPageId) as ScopedColors["pages"];
  const sections = parseHexMap(record.sections, (key) => key.includes("/"));
  const elements = parseHexMap(record.elements, (key) => key.length > 0);
  if (!pages && !sections && !elements) {
    return undefined;
  }
  return { pages, sections, elements };
}

export function compactScopedColors(
  value: ScopedColors | undefined,
): ScopedColors | undefined {
  if (!value) {
    return undefined;
  }
  const pages = value.pages && Object.keys(value.pages).length > 0 ? value.pages : undefined;
  const sections =
    value.sections && Object.keys(value.sections).length > 0 ? value.sections : undefined;
  const elements =
    value.elements && Object.keys(value.elements).length > 0 ? value.elements : undefined;
  if (!pages && !sections && !elements) {
    return undefined;
  }
  return { pages, sections, elements };
}

export function setPageScopedColor(
  map: ScopedColors | undefined,
  pageId: ContentPageId,
  hex: string,
): ScopedColors {
  const parsed = parseHexColorInput(hex);
  const pages = { ...(map?.pages ?? {}) };
  if (!parsed) {
    delete pages[pageId];
  } else {
    pages[pageId] = parsed;
  }
  return compactScopedColors({ ...map, pages }) ?? {};
}

export function setSectionScopedColor(
  map: ScopedColors | undefined,
  pageId: ContentPageId,
  sectionId: string,
  hex: string,
): ScopedColors {
  const parsed = parseHexColorInput(hex);
  const key = sectionColorKey(pageId, sectionId);
  const sections = { ...(map?.sections ?? {}) };
  if (!parsed) {
    delete sections[key];
  } else {
    sections[key] = parsed;
  }
  return compactScopedColors({ ...map, sections }) ?? {};
}

export function setElementScopedColor(
  map: ScopedColors | undefined,
  target: string,
  hex: string,
): ScopedColors {
  const parsed = parseHexColorInput(hex);
  const elements = { ...(map?.elements ?? {}) };
  if (!parsed) {
    delete elements[target];
  } else {
    elements[target] = parsed;
  }
  return compactScopedColors({ ...map, elements }) ?? {};
}

export function copyElementScopedColor(
  target: string,
  destination: ScopedColors | undefined,
  source: ScopedColors | undefined,
): ScopedColors | undefined {
  const elements = { ...(destination?.elements ?? {}) };
  const value = source?.elements?.[target];
  if (!value || !isHexColor(value)) {
    delete elements[target];
  } else {
    elements[target] = value;
  }
  return compactScopedColors({ ...destination, elements });
}

export function copySectionScopedColor(
  pageId: ContentPageId,
  sectionId: string,
  destination: ScopedColors | undefined,
  source: ScopedColors | undefined,
): ScopedColors | undefined {
  const key = sectionColorKey(pageId, sectionId);
  const sections = { ...(destination?.sections ?? {}) };
  const value = source?.sections?.[key];
  if (!value || !isHexColor(value)) {
    delete sections[key];
  } else {
    sections[key] = value;
  }
  return compactScopedColors({ ...destination, sections });
}

export function copyPageScopedColor(
  pageId: ContentPageId,
  destination: ScopedColors | undefined,
  source: ScopedColors | undefined,
): ScopedColors | undefined {
  const pages = { ...(destination?.pages ?? {}) };
  const value = source?.pages?.[pageId];
  if (!value || !isHexColor(value)) {
    delete pages[pageId];
  } else {
    pages[pageId] = value;
  }
  return compactScopedColors({ ...destination, pages });
}

export const SCOPED_BACKGROUND_VAR = "--wcda-scoped-background";
export const SCOPE_TONE_VAR = "--wcda-scope-tone";

export function scopedSurfaceStyle(
  hex: string | undefined,
  options?: { isolate?: boolean },
) {
  const parsed = hex && isHexColor(hex) ? hex : undefined;
  if (options?.isolate) {
    return {
      [SCOPED_BACKGROUND_VAR]: parsed ?? "initial",
    } as const;
  }
  if (!parsed) {
    return undefined;
  }
  return {
    backgroundColor: parsed,
    "--color-background": parsed,
    "--theme-page-background": parsed,
    "--wcda-canvas": parsed,
  } as const;
}

export function scopedCanvasStyle(hex: string | undefined) {
  return scopedSurfaceStyle(hex);
}

export function resolveScopedElementFill(
  map: ScopedColors | undefined,
  target: string | undefined,
  itemKey?: string,
) {
  if (!target) {
    return undefined;
  }
  if (itemKey) {
    const instance = map?.elements?.[elementScopedColorKey(target, itemKey)];
    if (instance && isHexColor(instance)) {
      return instance;
    }
  }
  const family = map?.elements?.[target];
  return family && isHexColor(family) ? family : undefined;
}

export function scopedElementFillStyle(hex: string | undefined) {
  if (!hex) {
    return undefined;
  }
  return {
    ["--exp-surface-fill" as string]: hex,
    ["--exp-surface-keep" as string]: "100%",
  };
}

export function scopedElementFillCss(map: ScopedColors | undefined) {
  const fills = map?.elements ?? {};
  const familyRules: string[] = [];
  const instanceRules: string[] = [];
  for (const [target, hex] of Object.entries(fills)) {
    if (!hex || !isHexColor(hex)) {
      continue;
    }
    const parsed = parseElementScopedColorKey(target);
    if (parsed.itemKey) {
      if (
        !isSafeScopedSelectorToken(parsed.visualTarget) ||
        !isSafeScopedSelectorToken(parsed.itemKey)
      ) {
        continue;
      }
      instanceRules.push(
        `html [data-visual-target="${parsed.visualTarget}"][data-lab-item-id="${parsed.itemKey}"]{--exp-surface-fill:${hex};--exp-surface-keep:100%;}`,
      );
      continue;
    }
    if (!isSafeScopedSelectorToken(target)) {
      continue;
    }
    familyRules.push(
      `html [data-visual-target="${target}"]{--exp-surface-fill:${hex};--exp-surface-keep:100%;}`,
    );
  }
  return [...familyRules, ...instanceRules].join("");
}

export function applyScopedElementFills(map: ScopedColors | undefined) {
  if (typeof document === "undefined") {
    return;
  }
  document.querySelectorAll("[data-visual-target]").forEach((node) => {
    if (!(node instanceof HTMLElement)) {
      return;
    }
    const target = node.dataset.visualTarget;
    const itemKey = node.dataset.labItemId;
    const hex = resolveScopedElementFill(map, target, itemKey);
    if (hex && isHexColor(hex)) {
      node.style.setProperty("--exp-surface-fill", hex);
      node.style.setProperty("--exp-surface-keep", "100%");
      node.dataset.scopedFill = "1";
      return;
    }
    if (node.dataset.scopedFill === "1") {
      node.style.removeProperty("--exp-surface-fill");
      node.style.removeProperty("--exp-surface-keep");
      delete node.dataset.scopedFill;
    }
  });
}

export function clearScopedElementFills() {
  if (typeof document === "undefined") {
    return;
  }
  document.querySelectorAll("[data-scoped-fill]").forEach((node) => {
    if (!(node instanceof HTMLElement)) {
      return;
    }
    node.style.removeProperty("--exp-surface-fill");
    node.style.removeProperty("--exp-surface-keep");
    delete node.dataset.scopedFill;
  });
}
