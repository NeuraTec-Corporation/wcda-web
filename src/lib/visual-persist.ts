import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  parseExperienceValues,
  pickExperienceValues,
  type ExperienceValues,
} from "@/config/experience";
import { parseThemeValues, pickThemeValues, type ThemeValues } from "@/config/theme";
import {
  EXPERIENCE_CONFIG_FILE,
  prepareApprovedExperienceSource,
} from "@/lib/experience-persist";
import { assertFactoryBlocksUnchanged } from "@/lib/factory-guard";
import {
  THEME_CONFIG_FILE,
  prepareApprovedThemeSource,
} from "@/lib/theme-persist";

/**
 * Atomic WCDA Current approval.
 * Validates Theme + Experience, prepares both file replacements, writes Theme,
 * writes Experience, and rolls Theme back if Experience fails. Factory blocks
 * are extracted before write and verified after both writes; any factory
 * mismatch rolls both files back.
 */
export async function writeApprovedVisualPlatform(
  theme: ThemeValues,
  experience: ExperienceValues,
) {
  const parsedTheme = parseThemeValues(theme);
  const parsedExperience = parseExperienceValues(experience);
  if (!parsedTheme || !parsedExperience) {
    throw new Error("Invalid theme or experience configuration");
  }

  const themePath = path.resolve(THEME_CONFIG_FILE);
  const experiencePath = path.resolve(EXPERIENCE_CONFIG_FILE);
  if (themePath !== THEME_CONFIG_FILE || experiencePath !== EXPERIENCE_CONFIG_FILE) {
    throw new Error("Refusing to write an unexpected path");
  }

  const themeCurrent = await readFile(themePath, "utf8");
  const experienceCurrent = await readFile(experiencePath, "utf8");

  const factoryBefore = assertFactoryBlocksUnchanged({
    themeBefore: themeCurrent,
    themeAfter: themeCurrent,
    experienceBefore: experienceCurrent,
    experienceAfter: experienceCurrent,
  });

  const themePrepared = prepareApprovedThemeSource(themeCurrent, parsedTheme);
  const experiencePrepared = prepareApprovedExperienceSource(
    experienceCurrent,
    parsedExperience,
  );

  if (
    themePrepared.factoryBlock !== factoryBefore.themeBlock ||
    experiencePrepared.factoryBlock !== factoryBefore.experienceBlock
  ) {
    throw new Error("Refusing to overwrite the WCDA Factory baselines");
  }

  await writeFile(themePath, themePrepared.next, "utf8");
  try {
    await writeFile(experiencePath, experiencePrepared.next, "utf8");
  } catch (error) {
    await writeFile(themePath, themeCurrent, "utf8");
    throw error;
  }

  const themeAfter = await readFile(themePath, "utf8");
  const experienceAfter = await readFile(experiencePath, "utf8");
  try {
    assertFactoryBlocksUnchanged({
      themeBefore: themeCurrent,
      themeAfter,
      experienceBefore: experienceCurrent,
      experienceAfter,
    });
  } catch (error) {
    await writeFile(themePath, themeCurrent, "utf8");
    await writeFile(experiencePath, experienceCurrent, "utf8");
    throw error;
  }

  return {
    theme: pickThemeValues(themePrepared.saved),
    version: themePrepared.version,
    experience: pickExperienceValues(experiencePrepared.saved),
  };
}
