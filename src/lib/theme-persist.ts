import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  THEME_VALUE_KEYS,
  nextApprovedThemeVersion,
  parseThemeValues,
  pickThemeValues,
  type ThemeValues,
} from "@/config/theme";
import { extractFactoryThemeBlock } from "@/lib/factory-guard";

export const THEME_CONFIG_FILE = path.resolve(
  process.cwd(),
  "src",
  "config",
  "theme.ts",
);

const APPROVED_BLOCK_PATTERN =
  /^\/\* WCDA_APPROVED_THEME_START \*\/\r?\nexport const approvedThemeVersion = "[^"]+";\r?\nexport const approvedTheme: ThemeValues = \{[\s\S]*?\n\/\* WCDA_APPROVED_THEME_END \*\//m;

const APPROVED_VERSION_PATTERN =
  /export const approvedThemeVersion = "([^"]+)";/;

function extractSingleBlock(source: string, pattern: RegExp, label: string) {
  const matches = source.match(pattern);
  if (!matches || matches.length !== 1) {
    throw new Error(`${label} is missing or ambiguous`);
  }
  return matches[0];
}

function formatApprovedThemeSource(theme: ThemeValues, version: string) {
  const lines = THEME_VALUE_KEYS.map((key) => {
    const value = theme[key];
    const literal =
      typeof value === "string" ? JSON.stringify(value) : String(value);
    return `  ${key}: ${literal},`;
  });

  if (typeof theme.chromeWarmth === "number" && Number.isFinite(theme.chromeWarmth)) {
    lines.push(`  chromeWarmth: ${Math.round(theme.chromeWarmth)},`);
  }

  for (const key of ["pageBackground", "headerBackground", "footerBackground"] as const) {
    const value = theme[key];
    if (typeof value === "string" && /^#[0-9A-Fa-f]{6}$/.test(value)) {
      lines.push(`  ${key}: ${JSON.stringify(value.toUpperCase())},`);
    }
  }

  return [
    "/* WCDA_APPROVED_THEME_START */",
    `export const approvedThemeVersion = ${JSON.stringify(version)};`,
    "export const approvedTheme: ThemeValues = {",
    ...lines,
    "};",
    "/* WCDA_APPROVED_THEME_END */",
  ].join("\n");
}

export function prepareApprovedThemeSource(current: string, theme: ThemeValues) {
  const parsed = parseThemeValues(theme);
  if (!parsed) {
    throw new Error("Invalid theme configuration");
  }

  const originalBlock = extractFactoryThemeBlock(current);
  extractSingleBlock(current, APPROVED_BLOCK_PATTERN, "Approved theme block");

  const currentVersion =
    current.match(APPROVED_VERSION_PATTERN)?.[1] ?? "2026.08.22-00";
  const version = nextApprovedThemeVersion(currentVersion);
  const saved = pickThemeValues(parsed);
  const replacement = formatApprovedThemeSource(saved, version);
  const next = current.replace(APPROVED_BLOCK_PATTERN, () => replacement);

  if (next.includes('*/";') || next.includes("*/';")) {
    throw new Error("Refusing to write malformed TypeScript");
  }

  if (!APPROVED_BLOCK_PATTERN.test(next)) {
    throw new Error("Replacement did not produce a valid approved theme block");
  }

  const originalAfter = extractFactoryThemeBlock(next);
  if (originalAfter !== originalBlock) {
    throw new Error("Refusing to overwrite the WCDA Factory theme baseline");
  }

  return { next, saved, version, factoryBlock: originalBlock };
}

export async function writeApprovedTheme(theme: ThemeValues) {
  const parsed = parseThemeValues(theme);
  if (!parsed) {
    throw new Error("Invalid theme configuration");
  }

  const target = path.resolve(THEME_CONFIG_FILE);
  if (target !== THEME_CONFIG_FILE) {
    throw new Error("Refusing to write an unexpected path");
  }

  const current = await readFile(target, "utf8");
  const prepared = prepareApprovedThemeSource(current, parsed);
  await writeFile(target, prepared.next, "utf8");
  return { theme: prepared.saved, version: prepared.version };
}
