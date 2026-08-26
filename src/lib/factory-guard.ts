/**
 * Deterministic WCDA Factory protection.
 * Approved writes may replace Current blocks only. Factory blocks are byte-locked.
 */

export const FACTORY_THEME_BLOCK_PATTERN =
  /^\/\* WCDA_FACTORY_THEME_START \*\/\r?\nexport const wcdaFactoryTheme: ThemeValues = \{[\s\S]*?\n\/\* WCDA_FACTORY_THEME_END \*\//m;

export const FACTORY_EXPERIENCE_BLOCK_PATTERN =
  /^\/\* WCDA_FACTORY_EXPERIENCE_START \*\/\r?\nexport function createFactoryExperience\(\): ExperienceValues \{[\s\S]*?\n\/\* WCDA_FACTORY_EXPERIENCE_END \*\//m;

function extractSingleBlock(source: string, pattern: RegExp, label: string) {
  const matches = source.match(pattern);
  if (!matches || matches.length !== 1) {
    throw new Error(`${label} is missing or ambiguous`);
  }
  return matches[0];
}

export function extractFactoryThemeBlock(source: string) {
  return extractSingleBlock(
    source,
    FACTORY_THEME_BLOCK_PATTERN,
    "WCDA Factory theme block",
  );
}

export function extractFactoryExperienceBlock(source: string) {
  return extractSingleBlock(
    source,
    FACTORY_EXPERIENCE_BLOCK_PATTERN,
    "WCDA Factory experience block",
  );
}

export function assertFactoryBlocksUnchanged(input: {
  themeBefore: string;
  themeAfter: string;
  experienceBefore: string;
  experienceAfter: string;
}) {
  const themeBefore = extractFactoryThemeBlock(input.themeBefore);
  const themeAfter = extractFactoryThemeBlock(input.themeAfter);
  const experienceBefore = extractFactoryExperienceBlock(input.experienceBefore);
  const experienceAfter = extractFactoryExperienceBlock(input.experienceAfter);

  if (themeBefore !== themeAfter || experienceBefore !== experienceAfter) {
    throw new Error("Refusing to leave Factory baselines mutated");
  }

  return {
    themeBlock: themeBefore,
    experienceBlock: experienceBefore,
  };
}
