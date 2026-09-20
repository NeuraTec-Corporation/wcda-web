import {
  pickExperienceValues,
  type ExperienceValues,
  type VisualTargetId,
} from "@/config/experience";
import { pickThemeValues, type ThemeValues } from "@/config/theme";
import {
  resolvePageSectionFlag,
  setPageSectionEnabled,
  type ContentPageId,
  type ContentPublicationPatch,
} from "@/config/content-publication";
import {
  applyElementSlice,
  applyLabSectionSlice,
  isLabStagedSection,
  labSectionSliceEqual,
  promoteElementEqual,
  promoteElementExperience,
  type LabStagedSectionId,
} from "@/config/lab-section-state";
import {
  isGlobalVisualTarget,
  labGlobalElements,
  labPages,
  type LabBi,
  type LabPageSectionDef,
} from "@/config/lab-registry";
import type { LabSectionId } from "@/config/lab-ui";
import {
  copyPageScopedColor,
  copySectionScopedColor,
  sectionColorKey,
} from "@/config/scoped-colors";
import {
  applyContentSlice,
  listPendingContentScopes,
  type ContentFieldId,
  type SiteContentPatch,
} from "@/config/site-content";

export type PendingScopeKind = "element" | "section" | "system";
export type PendingDomain = "theme" | "experience" | "content" | "copy";

export type LabPendingNav = {
  mode: "editor" | "system";
  pagePath?: string;
  pageId?: string;
  sectionId?: string;
  elementId?: string;
  labSection: LabSectionId;
};

export type PendingCustomScope = {
  id: string;
  kind: PendingScopeKind;
  domain: PendingDomain;
  path: LabBi;
  groups: LabBi[];
  property: LabBi;
  nav: LabPendingNav;
  visualTarget?: VisualTargetId;
  itemKey?: string;
  family?: LabStagedSectionId;
  pageId?: ContentPageId;
  sectionId?: string;
  copyFieldIds?: readonly ContentFieldId[];
};

export type LabChangeBundle = {
  theme: ThemeValues;
  experience: ExperienceValues;
  publication: ContentPublicationPatch;
  content: SiteContentPatch;
};

export type VisualMerge = {
  theme: ThemeValues;
  experience: ExperienceValues;
};

const SYSTEM_PENDING_FAMILIES: readonly LabStagedSectionId[] = [
  "brand",
  "colors",
  "typography",
  "surfaces",
  "header",
  "footer",
  "motion",
  "effects",
];

export function mergeElementIntoCurrent(
  currentTheme: ThemeValues,
  currentExperience: ExperienceValues,
  customExperience: ExperienceValues,
  target: VisualTargetId,
  itemKey?: string,
): VisualMerge {
  return {
    theme: pickThemeValues(currentTheme),
    experience: promoteElementExperience(
      target,
      currentExperience,
      customExperience,
      itemKey,
    ),
  };
}

export function mergeSectionVisualIntoCurrent(
  currentTheme: ThemeValues,
  currentExperience: ExperienceValues,
  customExperience: ExperienceValues,
  section: LabPageSectionDef,
  pageId?: ContentPageId,
): VisualMerge {
  let experience = pickExperienceValues(currentExperience);
  for (const element of section.elements) {
    if (element.visualTarget) {
      experience = promoteElementExperience(
        element.visualTarget,
        experience,
        customExperience,
        element.itemKey,
      );
    }
  }
  if (pageId) {
    experience = pickExperienceValues({
      ...experience,
      scopedColors: copySectionScopedColor(
        pageId,
        section.id,
        experience.scopedColors,
        customExperience.scopedColors,
      ),
    });
  }
  return {
    theme: pickThemeValues(currentTheme),
    experience,
  };
}

export function mergeSectionPublicationIntoCurrent(
  currentPublication: ContentPublicationPatch,
  customPublication: ContentPublicationPatch,
  pageId: ContentPageId,
  sectionId: string,
): ContentPublicationPatch {
  return setPageSectionEnabled(
    currentPublication,
    pageId,
    sectionId,
    resolvePageSectionFlag(customPublication, pageId, sectionId),
  );
}

export function mergeSystemFamilyIntoCurrent(
  family: LabStagedSectionId,
  currentTheme: ThemeValues,
  currentExperience: ExperienceValues,
  customTheme: ThemeValues,
  customExperience: ExperienceValues,
): VisualMerge {
  if (family === "containers") {
    return {
      theme: pickThemeValues(currentTheme),
      experience: applyElementSlice(
        "editorial-cards",
        currentExperience,
        customExperience,
      ),
    };
  }
  return applyLabSectionSlice(
    family,
    currentTheme,
    currentExperience,
    customTheme,
    customExperience,
  );
}

export function listPendingCustomScopes(
  customTheme: ThemeValues,
  customExperience: ExperienceValues,
  customPublication: ContentPublicationPatch,
  currentTheme: ThemeValues,
  currentExperience: ExperienceValues,
  currentPublication: ContentPublicationPatch,
  customContent: SiteContentPatch = {},
  currentContent: SiteContentPatch = {},
  contentFallback: SiteContentPatch = currentContent,
): PendingCustomScope[] {
  const pending: PendingCustomScope[] = [];
  const systemGroup: LabBi = { en: "System", es: "Sistema" };

  for (const family of SYSTEM_PENDING_FAMILIES) {
    if (
      !labSectionSliceEqual(
        family,
        customTheme,
        customExperience,
        currentTheme,
        currentExperience,
      )
    ) {
      const property = systemFamilyProperty(family);
      pending.push({
        id: `system:${family}`,
        kind: "system",
        domain: family === "motion" || family === "effects" ? "experience" : "theme",
        path: systemFamilyPath(family),
        groups: [systemGroup],
        property,
        nav: { mode: "system", labSection: family },
        family,
      });
    }
  }

  if (
    !promoteElementEqual(
      "editorial-cards",
      customExperience,
      currentExperience,
    )
  ) {
    pending.push({
      id: "system:containers",
      kind: "system",
      domain: "experience",
      path: { en: "System / Editorial Cards", es: "Sistema / Tarjetas editoriales" },
      groups: [systemGroup],
      property: { en: "Editorial Cards", es: "Tarjetas editoriales" },
      nav: { mode: "system", labSection: "containers" },
      visualTarget: "editorial-cards",
    });
  }

  for (const page of labPages) {
    if (
      (customExperience.scopedColors?.pages?.[page.id] ?? "") !==
      (currentExperience.scopedColors?.pages?.[page.id] ?? "")
    ) {
      pending.push({
        id: `page-color:${page.id}`,
        kind: "section",
        domain: "experience",
        path: {
          en: `${page.label.en} / Page Background`,
          es: `${page.label.es} / Fondo de página`,
        },
        groups: [page.label],
        property: { en: "Page Background", es: "Fondo de página" },
        nav: {
          mode: "editor",
          pagePath: page.path,
          pageId: page.id,
          labSection: "tools",
        },
        pageId: page.id,
      });
    }
    for (const section of page.sections) {
      const sectionKey = sectionColorKey(page.id, section.id);
      if (
        (customExperience.scopedColors?.sections?.[sectionKey] ?? "") !==
        (currentExperience.scopedColors?.sections?.[sectionKey] ?? "")
      ) {
        pending.push({
          id: `section-color:${sectionKey}`,
          kind: "section",
          domain: "experience",
          path: {
            en: `${page.label.en} / ${section.label.en} / Section Background`,
            es: `${page.label.es} / ${section.label.es} / Fondo de sección`,
          },
          groups: [page.label, section.label],
          property: { en: "Section Background", es: "Fondo de sección" },
          nav: {
            mode: "editor",
            pagePath: page.path,
            pageId: page.id,
            sectionId: section.id,
            elementId: "section",
            labSection: "tools",
          },
          pageId: page.id,
          sectionId: section.id,
        });
      }
      if (
        resolvePageSectionFlag(customPublication, page.id, section.id) !==
        resolvePageSectionFlag(currentPublication, page.id, section.id)
      ) {
        pending.push({
          id: `section:${page.id}/${section.id}`,
          kind: "section",
          domain: "content",
          path: {
            en: `${page.label.en} / ${section.label.en}`,
            es: `${page.label.es} / ${section.label.es}`,
          },
          groups: [page.label, section.label],
          property: { en: "Publication", es: "Publicación" },
          nav: {
            mode: "editor",
            pagePath: page.path,
            pageId: page.id,
            sectionId: section.id,
            elementId: "section",
            labSection: "content",
          },
          pageId: page.id,
          sectionId: section.id,
        });
      }
      for (const element of section.elements) {
        if (!element.visualTarget) {
          continue;
        }
        if (isGlobalVisualTarget(element.visualTarget) && !element.itemKey) {
          continue;
        }
        if (
          !promoteElementEqual(
            element.visualTarget,
            customExperience,
            currentExperience,
            element.itemKey,
          )
        ) {
          const parent = element.parentId
            ? section.elements.find((item) => item.id === element.parentId)
            : undefined;
          const groups = parent
            ? [page.label, section.label, parent.label]
            : [page.label, section.label];
          pending.push({
            id: `element:${element.id}`,
            kind: "element",
            domain: "experience",
            path: {
              en: `${page.label.en} / ${section.label.en} / ${element.label.en}`,
              es: `${page.label.es} / ${section.label.es} / ${element.label.es}`,
            },
            groups,
            property: element.label,
            nav: {
              mode: "editor",
              pagePath: page.path,
              pageId: page.id,
              sectionId: section.id,
              elementId: element.id,
              labSection: elementLabSection(element.families),
            },
            visualTarget: element.visualTarget,
            itemKey: element.itemKey,
            pageId: page.id,
            sectionId: section.id,
          });
        }
      }
    }
  }

  if (
    !promoteElementEqual(
      labGlobalElements.headerLogo.visualTarget as VisualTargetId,
      customExperience,
      currentExperience,
    )
  ) {
    const already = pending.some((item) => item.id === "system:header");
    if (!already) {
      pending.push({
        id: "system:header-logo",
        kind: "system",
        domain: "experience",
        path: { en: "System / Header Logo", es: "Sistema / Logo del encabezado" },
        groups: [systemGroup],
        property: { en: "Header Logo", es: "Logo del encabezado" },
        nav: { mode: "system", labSection: "header" },
        visualTarget: "header-logo",
      });
    }
  }

  for (const item of listPendingContentScopes(
    customContent,
    currentContent,
    contentFallback,
  )) {
    const home = labPages.find((page) => page.id === "home");
    const section = home?.sections.find((entry) => entry.id === item.sectionId);
    const element = section?.elements.find((entry) => entry.id === item.elementId);
    const isHero = item.id === "copy:home.hero";
    pending.push({
      id: item.id,
      kind: "element",
      domain: "copy",
      path: item.path,
      groups: isHero
        ? [
            { en: "Home", es: "Inicio" },
            { en: "Hero", es: "Héroe" },
            { en: "Hero Content", es: "Contenido del héroe" },
          ]
        : [
            { en: "Home", es: "Inicio" },
            section?.label ?? { en: "Why this practice", es: "Por qué este consultorio" },
            element?.label ?? { en: "Editorial Card", es: "Tarjeta editorial" },
          ],
      property: { en: "Content", es: "Contenido" },
      nav: {
        mode: "editor",
        pagePath: home?.path ?? "/",
        pageId: item.pageId,
        sectionId: item.sectionId,
        elementId: item.elementId as never,
        labSection: "copy",
      },
      copyFieldIds: item.ids,
      pageId: item.pageId,
      sectionId: item.sectionId,
    });
  }

  return pending;
}

function systemFamilyPath(family: LabStagedSectionId): LabBi {
  const labels: Record<string, LabBi> = {
    brand: { en: "System / Brand", es: "Sistema / Marca" },
    colors: { en: "System / Global Colors", es: "Sistema / Colores globales" },
    typography: { en: "System / Typography", es: "Sistema / Tipografía" },
    surfaces: { en: "System / Page Background", es: "Sistema / Fondo de página" },
    header: { en: "System / Header", es: "Sistema / Encabezado" },
    footer: { en: "System / Footer", es: "Sistema / Pie" },
    motion: { en: "System / Motion", es: "Sistema / Motion" },
    effects: { en: "System / Special Effects", es: "Sistema / Efectos especiales" },
  };
  return labels[family] ?? { en: family, es: family };
}

function systemFamilyProperty(family: LabStagedSectionId): LabBi {
  const labels: Record<string, LabBi> = {
    brand: { en: "Brand", es: "Marca" },
    colors: { en: "Global Colors", es: "Colores globales" },
    typography: { en: "Typography", es: "Tipografía" },
    surfaces: { en: "Page Background", es: "Fondo de página" },
    header: { en: "Header", es: "Encabezado" },
    footer: { en: "Footer", es: "Pie" },
    motion: { en: "Motion", es: "Motion" },
    effects: { en: "Special Effects", es: "Efectos especiales" },
  };
  return labels[family] ?? { en: family, es: family };
}

function elementLabSection(families: readonly string[]): LabSectionId {
  const family = families.find((item) => item !== "tools") ?? "media";
  if (family === "publication") {
    return "content";
  }
  return family as LabSectionId;
}

export function applyPendingScope(
  item: PendingCustomScope,
  dest: LabChangeBundle,
  source: LabChangeBundle,
): LabChangeBundle {
  if (item.family && isLabStagedSection(item.family)) {
    const next = applyLabSectionSlice(
      item.family,
      dest.theme,
      dest.experience,
      source.theme,
      source.experience,
    );
    return { ...dest, theme: next.theme, experience: next.experience };
  }
  if (item.visualTarget) {
    return {
      ...dest,
      experience: applyElementSlice(
        item.visualTarget,
        dest.experience,
        source.experience,
        item.itemKey,
      ),
    };
  }
  if (item.id.startsWith("page-color:") && item.pageId) {
    return {
      ...dest,
      experience: pickExperienceValues({
        ...dest.experience,
        scopedColors: copyPageScopedColor(
          item.pageId,
          dest.experience.scopedColors,
          source.experience.scopedColors,
        ),
      }),
    };
  }
  if (item.id.startsWith("section-color:") && item.pageId && item.sectionId) {
    return {
      ...dest,
      experience: pickExperienceValues({
        ...dest.experience,
        scopedColors: copySectionScopedColor(
          item.pageId,
          item.sectionId,
          dest.experience.scopedColors,
          source.experience.scopedColors,
        ),
      }),
    };
  }
  if (item.kind === "section" && item.domain === "content" && item.pageId && item.sectionId) {
    return {
      ...dest,
      publication: setPageSectionEnabled(
        dest.publication,
        item.pageId,
        item.sectionId,
        resolvePageSectionFlag(source.publication, item.pageId, item.sectionId),
      ),
    };
  }
  if (item.copyFieldIds) {
    return {
      ...dest,
      content: applyContentSlice(
        dest.content,
        source.content,
        item.copyFieldIds,
        dest.content,
      ),
    };
  }
  return dest;
}

export function pendingSectionKey(pageId?: string, sectionId?: string) {
  if (!pageId || !sectionId) {
    return "";
  }
  return `${pageId}/${sectionId}`;
}

export function isPromotableStagedFamily(
  value: string,
): value is LabStagedSectionId {
  return isLabStagedSection(value as LabStagedSectionId);
}
