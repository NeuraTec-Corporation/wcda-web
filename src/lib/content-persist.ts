import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  parseSiteContentPatch,
  pickSiteContentPatch,
  type SiteContentPatch,
} from "@/config/site-content";

export const SITE_CONTENT_CONFIG_FILE = path.resolve(
  process.cwd(),
  "src",
  "config",
  "site-content.ts",
);

const APPROVED_BLOCK_PATTERN =
  /^\/\* WCDA_APPROVED_SITE_CONTENT_START \*\/\r?\nexport const approvedSiteContent: SiteContentPatch = \{[\s\S]*?\n\/\* WCDA_APPROVED_SITE_CONTENT_END \*\//m;

function formatLiteral(value: unknown, indent: number): string {
  const pad = "  ".repeat(indent);
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return "{}";
  }
  const entries = Object.entries(value as Record<string, unknown>).filter(
    ([, item]) => typeof item === "string",
  );
  if (entries.length === 0) {
    return "{}";
  }
  const lines = entries.map(([key, item]) => {
    const safeKey = JSON.stringify(key);
    return `${pad}  ${safeKey}: ${formatLiteral(item, indent + 1)},`;
  });
  return `{\n${lines.join("\n")}\n${pad}}`;
}

export function formatApprovedSiteContentSource(patch: SiteContentPatch) {
  const value = pickSiteContentPatch(patch);
  return [
    "/* WCDA_APPROVED_SITE_CONTENT_START */",
    `export const approvedSiteContent: SiteContentPatch = ${formatLiteral(value, 0)};`,
    "/* WCDA_APPROVED_SITE_CONTENT_END */",
  ].join("\n");
}

export function prepareApprovedSiteContentSource(
  current: string,
  patch: SiteContentPatch,
) {
  const parsed = parseSiteContentPatch(patch);
  if (!parsed) {
    throw new Error("Invalid site content configuration");
  }
  if (!APPROVED_BLOCK_PATTERN.test(current)) {
    throw new Error("Approved site content block is missing or ambiguous");
  }
  const saved = pickSiteContentPatch(parsed);
  const replacement = formatApprovedSiteContentSource(saved);
  const next = current.replace(APPROVED_BLOCK_PATTERN, () => replacement);
  if (!APPROVED_BLOCK_PATTERN.test(next)) {
    throw new Error("Replacement did not produce a valid site content block");
  }
  return { next, saved };
}

export async function writeApprovedSiteContent(patch: SiteContentPatch) {
  const parsed = parseSiteContentPatch(patch);
  if (!parsed) {
    throw new Error("Invalid site content configuration");
  }
  const target = path.resolve(SITE_CONTENT_CONFIG_FILE);
  if (target !== SITE_CONTENT_CONFIG_FILE) {
    throw new Error("Refusing to write an unexpected path");
  }
  const current = await readFile(target, "utf8");
  const prepared = prepareApprovedSiteContentSource(current, parsed);
  await writeFile(target, prepared.next, "utf8");
  return { content: prepared.saved };
}
