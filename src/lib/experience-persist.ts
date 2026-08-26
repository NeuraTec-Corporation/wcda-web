import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  formatApprovedExperienceSource,
  parseExperienceValues,
  pickExperienceValues,
  type ExperienceValues,
} from "@/config/experience";
import { extractFactoryExperienceBlock } from "@/lib/factory-guard";

export const EXPERIENCE_CONFIG_FILE = path.resolve(
  process.cwd(),
  "src",
  "config",
  "experience.ts",
);

const APPROVED_BLOCK_PATTERN =
  /^\/\* WCDA_APPROVED_EXPERIENCE_START \*\/\r?\nexport const approvedExperience: ExperienceValues = \{[\s\S]*?\n\/\* WCDA_APPROVED_EXPERIENCE_END \*\//m;

function extractSingleBlock(source: string, pattern: RegExp, label: string) {
  const matches = source.match(pattern);
  if (!matches || matches.length !== 1) {
    throw new Error(`${label} is missing or ambiguous`);
  }
  return matches[0];
}

export function prepareApprovedExperienceSource(
  current: string,
  experience: ExperienceValues,
) {
  const parsed = parseExperienceValues(experience);
  if (!parsed) {
    throw new Error("Invalid experience configuration");
  }

  const factoryBlock = extractFactoryExperienceBlock(current);
  extractSingleBlock(
    current,
    APPROVED_BLOCK_PATTERN,
    "Approved experience block",
  );

  const saved = pickExperienceValues(parsed);
  const replacement = formatApprovedExperienceSource(saved);
  const next = current.replace(APPROVED_BLOCK_PATTERN, () => replacement);

  if (next.includes('*/";') || next.includes("*/';")) {
    throw new Error("Refusing to write malformed TypeScript");
  }

  if (!APPROVED_BLOCK_PATTERN.test(next)) {
    throw new Error("Replacement did not produce a valid approved experience block");
  }

  const factoryAfter = extractFactoryExperienceBlock(next);
  if (factoryAfter !== factoryBlock) {
    throw new Error("Refusing to overwrite the WCDA Factory experience baseline");
  }

  return { next, saved, factoryBlock };
}

export async function writeApprovedExperience(experience: ExperienceValues) {
  const parsed = parseExperienceValues(experience);
  if (!parsed) {
    throw new Error("Invalid experience configuration");
  }

  const target = path.resolve(EXPERIENCE_CONFIG_FILE);
  if (target !== EXPERIENCE_CONFIG_FILE) {
    throw new Error("Refusing to write an unexpected path");
  }

  const current = await readFile(target, "utf8");
  const prepared = prepareApprovedExperienceSource(current, parsed);
  await writeFile(target, prepared.next, "utf8");
  return prepared.saved;
}
