import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  parseContentPublicationPatch,
  pickContentPublicationPatch,
  type ContentPublicationPatch,
} from "@/config/content-publication";

export const PUBLICATION_CONFIG_FILE = path.resolve(
  process.cwd(),
  "src",
  "config",
  "content-publication.ts",
);

const APPROVED_BLOCK_PATTERN =
  /^\/\* WCDA_APPROVED_PUBLICATION_START \*\/\r?\nexport const approvedContentPublication: ContentPublicationPatch = \{[\s\S]*?\n\/\* WCDA_APPROVED_PUBLICATION_END \*\//m;

function formatLiteral(value: unknown, indent: number): string {
  const pad = "  ".repeat(indent);
  if (typeof value === "boolean") {
    return String(value);
  }
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return "undefined";
  }
  const entries = Object.entries(value as Record<string, unknown>).filter(
    ([, item]) => item !== undefined,
  );
  if (entries.length === 0) {
    return "{}";
  }
  const lines = entries.map(([key, item]) => {
    const safeKey = /^[A-Za-z_][A-Za-z0-9_]*$/.test(key)
      ? key
      : JSON.stringify(key);
    return `${pad}  ${safeKey}: ${formatLiteral(item, indent + 1)},`;
  });
  return `{\n${lines.join("\n")}\n${pad}}`;
}

export function formatApprovedPublicationSource(patch: ContentPublicationPatch) {
  const value = pickContentPublicationPatch(patch);
  return [
    "/* WCDA_APPROVED_PUBLICATION_START */",
    `export const approvedContentPublication: ContentPublicationPatch = ${formatLiteral(value, 0)};`,
    "/* WCDA_APPROVED_PUBLICATION_END */",
  ].join("\n");
}

export function prepareApprovedPublicationSource(
  current: string,
  patch: ContentPublicationPatch,
) {
  const parsed = parseContentPublicationPatch(patch);
  if (!parsed) {
    throw new Error("Invalid content publication configuration");
  }
  if (!APPROVED_BLOCK_PATTERN.test(current)) {
    throw new Error("Approved publication block is missing or ambiguous");
  }
  const saved = pickContentPublicationPatch(parsed);
  const replacement = formatApprovedPublicationSource(saved);
  const next = current.replace(APPROVED_BLOCK_PATTERN, () => replacement);
  if (!APPROVED_BLOCK_PATTERN.test(next)) {
    throw new Error("Replacement did not produce a valid publication block");
  }
  return { next, saved };
}

export async function writeApprovedPublication(patch: ContentPublicationPatch) {
  const parsed = parseContentPublicationPatch(patch);
  if (!parsed) {
    throw new Error("Invalid content publication configuration");
  }
  const target = path.resolve(PUBLICATION_CONFIG_FILE);
  if (target !== PUBLICATION_CONFIG_FILE) {
    throw new Error("Refusing to write an unexpected path");
  }
  const current = await readFile(target, "utf8");
  const prepared = prepareApprovedPublicationSource(current, parsed);
  await writeFile(target, prepared.next, "utf8");
  return { publication: prepared.saved };
}
