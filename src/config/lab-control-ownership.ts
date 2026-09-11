import type { LabControlFamily, LabDeclaredScope } from "@/config/lab-registry";

export type LabPersistenceDomain = "theme" | "experience" | "content" | "recovery";

export type LabControlOwnership = {
  id: string;
  group: "editor" | "system" | "approval" | "recovery";
  family: LabControlFamily | "approval";
  scope: LabDeclaredScope;
  domain: LabPersistenceDomain;
  apply: "element" | "section" | "system-family" | "none";
  reset: "element" | "section" | "system-family" | "none";
  promote: "element" | "section" | "system-family" | "all" | "none";
};

export const labControlOwnership: readonly LabControlOwnership[] = [
  { id: "publication-section", group: "editor", family: "publication", scope: "section", domain: "content", apply: "section", reset: "section", promote: "section" },
  { id: "media-element", group: "editor", family: "media", scope: "element", domain: "experience", apply: "element", reset: "element", promote: "element" },
  { id: "containers-element", group: "editor", family: "containers", scope: "element", domain: "experience", apply: "element", reset: "element", promote: "element" },
  { id: "effects-marquee", group: "editor", family: "effects", scope: "element", domain: "experience", apply: "element", reset: "element", promote: "element" },
  { id: "brand", group: "system", family: "brand", scope: "global", domain: "theme", apply: "system-family", reset: "system-family", promote: "system-family" },
  { id: "colors", group: "system", family: "colors", scope: "global", domain: "theme", apply: "system-family", reset: "system-family", promote: "system-family" },
  { id: "typography", group: "system", family: "typography", scope: "global", domain: "theme", apply: "system-family", reset: "system-family", promote: "system-family" },
  { id: "page-background", group: "system", family: "surfaces", scope: "global", domain: "theme", apply: "system-family", reset: "system-family", promote: "system-family" },
  { id: "header", group: "system", family: "header", scope: "global", domain: "theme", apply: "system-family", reset: "system-family", promote: "system-family" },
  { id: "footer", group: "system", family: "footer", scope: "global", domain: "theme", apply: "system-family", reset: "system-family", promote: "system-family" },
  { id: "editorial-cards", group: "system", family: "containers", scope: "global", domain: "experience", apply: "system-family", reset: "system-family", promote: "system-family" },
  { id: "motion", group: "system", family: "motion", scope: "global", domain: "experience", apply: "system-family", reset: "system-family", promote: "system-family" },
  { id: "cursor-companion", group: "system", family: "effects", scope: "global", domain: "experience", apply: "system-family", reset: "system-family", promote: "system-family" },
  { id: "color-tools", group: "system", family: "tools", scope: "global", domain: "theme", apply: "none", reset: "none", promote: "none" },
  { id: "promote-all", group: "approval", family: "approval", scope: "global", domain: "theme", apply: "none", reset: "none", promote: "all" },
  { id: "load-current", group: "recovery", family: "recovery", scope: "recovery", domain: "recovery", apply: "none", reset: "none", promote: "none" },
  { id: "load-factory", group: "recovery", family: "recovery", scope: "recovery", domain: "recovery", apply: "none", reset: "none", promote: "none" },
] as const;
