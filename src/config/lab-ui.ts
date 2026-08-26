import {
  themePresets,
  themeValuesEqual,
  wcdaFactoryTheme,
  type ThemePresetId,
  type ThemeValues,
} from "@/config/theme";
import {
  experienceValuesEqual,
  wcdaFactoryExperience,
  type ExperienceValues,
  type VisualTargetId,
} from "@/config/experience";

export const LAB_LANGUAGE_STORAGE_KEY = "wcda-lab-ui-language";

export type LabLanguage = "en" | "es";
export type LabSourceId = "factory" | "current" | "designer" | "inspired" | "custom";
export type LabSectionId =
  | "brand"
  | "colors"
  | "typography"
  | "media"
  | "containers"
  | "motion"
  | "effects"
  | "recovery";

export const labSources: LabSourceId[] = [
  "factory",
  "current",
  "designer",
  "inspired",
  "custom",
];

export const labSections: LabSectionId[] = [
  "brand",
  "colors",
  "typography",
  "media",
  "containers",
  "motion",
  "effects",
  "recovery",
];

export const wcdaInspiredTheme: ThemeValues = themePresets["wcda-inspired"];

export type LabCopy = {
  labTitle: string;
  language: string;
  spanish: string;
  english: string;
  factory: string;
  current: string;
  designer: string;
  inspired: string;
  custom: string;
  factoryHint: string;
  currentHint: string;
  designerHint: string;
  inspiredHint: string;
  customHint: string;
  factoryImmutable: string;
  editing: string;
  approved: string;
  unsaved: string;
  saved: string;
  entireSite: string;
  globalTheme: string;
  theme: string;
  brand: string;
  colors: string;
  typography: string;
  media: string;
  containers: string;
  motion: string;
  effects: string;
  recovery: string;
  presets: string;
  previewPage: string;
  selectedElement: string;
  viewport: string;
  desktop: string;
  tablet: string;
  mobile: string;
  headingFont: string;
  bodyFont: string;
  shapeDensity: string;
  undoUnsaved: string;
  undoUnsavedHint: string;
  loadCurrent: string;
  loadCurrentHint: string;
  loadFactory: string;
  loadFactoryHint: string;
  loadInspired: string;
  loadInspiredHint: string;
  designerNotApplied: string;
  applyCustom: string;
  applyCustomHint: string;
  copyTheme: string;
  copyExperience: string;
  copied: string;
  saving: string;
  noEffects: string;
  hiddenControls: string;
  confirmUndoTitle: string;
  confirmUndoBody: string;
  confirmLoadCurrentTitle: string;
  confirmLoadCurrentBody: string;
  confirmLoadFactoryTitle: string;
  confirmLoadFactoryBody: string;
  confirmLoadInspiredTitle: string;
  confirmLoadInspiredBody: string;
  confirmApplyTitle: string;
  confirmApplyBody: string;
  cancel: string;
  confirm: string;
  applied: string;
  applyFailed: string;
  loadedFactory: string;
  loadedCurrent: string;
  loadedInspired: string;
  undone: string;
  saveError: string;
  colorsBrand: string;
  colorsSurfaces: string;
  colorsText: string;
  colorsStructure: string;
};

export const labCopy: Record<LabLanguage, LabCopy> = {
  en: {
    labTitle: "WCDA Visual Experience Lab",
    language: "Language / Idioma",
    spanish: "Español",
    english: "English",
    factory: "WCDA Factory",
    current: "WCDA Current",
    designer: "WCDA Designer",
    inspired: "WCDA Inspired",
    custom: "Custom",
    factoryHint:
      "Immutable recovery baseline captured from the approved site before Designer changes.",
    currentHint: "Current approved public configuration.",
    designerHint: "Official designer-based visual proposal.",
    inspiredHint: "Alternative WCDA visual proposal.",
    customHint: "Editable working configuration.",
    factoryImmutable:
      "WCDA Factory is immutable and cannot be overwritten.",
    editing: "Editing",
    approved: "Approved",
    unsaved: "Unsaved",
    saved: "Saved",
    entireSite: "Entire website",
    globalTheme: "Global theme",
    theme: "Theme",
    brand: "Brand",
    colors: "Colors",
    typography: "Typography",
    media: "Media",
    containers: "Containers",
    motion: "Motion",
    effects: "Special Effects",
    recovery: "Recovery",
    presets: "Presets",
    previewPage: "Preview page",
    selectedElement: "Selected element",
    viewport: "Viewport",
    desktop: "Desktop",
    tablet: "Tablet",
    mobile: "Mobile",
    headingFont: "Heading font",
    bodyFont: "Body font",
    shapeDensity: "Shape and density",
    undoUnsaved: "Undo unsaved changes",
    undoUnsavedHint:
      "Return Custom to the state this editing session started from. Does not save.",
    loadCurrent: "Load Current",
    loadCurrentHint:
      "Load the approved WCDA Current state into Custom. Does not save.",
    loadFactory: "Load Factory",
    loadFactoryHint:
      "Load the immutable Factory configuration into Custom. Does not change Factory or Current until you apply.",
    loadInspired: "Load Inspired",
    loadInspiredHint:
      "Load the WCDA Inspired reference into Custom. Does not save.",
    designerNotApplied:
      "WCDA Designer is recorded and not applied. Factory and Current are unchanged.",
    applyCustom: "Apply Custom as Current",
    applyCustomHint:
      "Writes Theme and Experience together as WCDA Current. If either part fails, nothing is applied. Factory cannot be overwritten.",
    copyTheme: "Copy theme config",
    copyExperience: "Copy experience config",
    copied: "Copied",
    saving: "Saving…",
    noEffects: "No special effects apply to this element.",
    hiddenControls:
      "Only controls for the selected element are shown. Hidden systems remain available on their own elements.",
    confirmUndoTitle: "Undo unsaved changes?",
    confirmUndoBody:
      "Custom will return to the state loaded at the start of this session. Nothing is saved. Factory and Current stay unchanged.",
    confirmLoadCurrentTitle: "Load WCDA Current?",
    confirmLoadCurrentBody:
      "Custom will be replaced with the approved public configuration. Unsaved Custom work will be discarded. Nothing is saved.",
    confirmLoadFactoryTitle: "Load WCDA Factory?",
    confirmLoadFactoryBody:
      "Custom will be replaced with the immutable Factory configuration. Factory itself is not modified. Current is not modified until you apply.",
    confirmLoadInspiredTitle: "Load WCDA Inspired?",
    confirmLoadInspiredBody:
      "Custom will be replaced with the Inspired reference. Unsaved Custom work will be discarded. Nothing is saved.",
    confirmApplyTitle: "Apply Custom as Current?",
    confirmApplyBody:
      "This writes Custom Theme and Experience together as public WCDA Current. If either write fails, Current stays unchanged. Factory cannot be overwritten.",
    cancel: "Cancel",
    confirm: "Continue",
    applied:
      "WCDA Current updated successfully. Theme and Experience are synchronized.",
    applyFailed: "Nothing was applied. WCDA Current remains unchanged.",
    loadedFactory: "Factory loaded into Custom",
    loadedCurrent: "Current loaded into Custom",
    loadedInspired: "Inspired loaded into Custom",
    undone: "Unsaved changes discarded",
    saveError: "Unable to save WCDA Current",
    colorsBrand: "Brand",
    colorsSurfaces: "Surfaces",
    colorsText: "Text",
    colorsStructure: "Structure",
  },
  es: {
    labTitle: "Laboratorio de experiencia visual WCDA",
    language: "Language / Idioma",
    spanish: "Español",
    english: "English",
    factory: "WCDA Factory",
    current: "WCDA Current",
    designer: "WCDA Designer",
    inspired: "WCDA Inspired",
    custom: "Custom",
    factoryHint:
      "Punto de recuperación inmutable capturado del sitio aprobado antes de los cambios del diseñador.",
    currentHint: "Configuración pública aprobada actualmente.",
    designerHint: "Propuesta visual basada en la identidad oficial del diseñador.",
    inspiredHint: "Propuesta visual alternativa de WCDA.",
    customHint: "Configuración de trabajo editable.",
    factoryImmutable:
      "WCDA Factory es inmutable y no puede ser sobrescrito.",
    editing: "Editando",
    approved: "Aprobado",
    unsaved: "No guardado",
    saved: "Guardado",
    entireSite: "Todo el sitio",
    globalTheme: "Tema global",
    theme: "Tema",
    brand: "Marca",
    colors: "Colores",
    typography: "Tipografía",
    media: "Imágenes",
    containers: "Contenedores",
    motion: "Movimiento",
    effects: "Efectos especiales",
    recovery: "Recuperación",
    presets: "Preajustes",
    previewPage: "Página de vista previa",
    selectedElement: "Elemento seleccionado",
    viewport: "Dispositivo",
    desktop: "Escritorio",
    tablet: "Tablet",
    mobile: "Móvil",
    headingFont: "Fuente de títulos",
    bodyFont: "Fuente de cuerpo",
    shapeDensity: "Forma y densidad",
    undoUnsaved: "Deshacer cambios no guardados",
    undoUnsavedHint:
      "Devuelve Custom al estado con el que comenzó esta sesión. No guarda nada.",
    loadCurrent: "Cargar versión actual",
    loadCurrentHint:
      "Carga WCDA Current aprobado en Custom. No guarda nada.",
    loadFactory: "Cargar WCDA Factory",
    loadFactoryHint:
      "Carga Factory inmutable en Custom. No modifica Factory ni Current hasta aplicar.",
    loadInspired: "Cargar Inspired",
    loadInspiredHint:
      "Carga la referencia WCDA Inspired en Custom. No guarda nada.",
    designerNotApplied:
      "WCDA Designer está registrado y no aplicado. Factory y Current no cambian.",
    applyCustom: "Aplicar Custom como versión actual",
    applyCustomHint:
      "Escribe Tema y Experiencia juntos como WCDA Current. Si una parte falla, no se aplica nada. Factory no se sobrescribe.",
    copyTheme: "Copiar configuración de tema",
    copyExperience: "Copiar configuración de experiencia",
    copied: "Copiado",
    saving: "Guardando…",
    noEffects: "Este elemento no tiene efectos especiales.",
    hiddenControls:
      "Solo se muestran controles del elemento seleccionado. Los demás sistemas siguen en sus propios elementos.",
    confirmUndoTitle: "¿Deshacer cambios no guardados?",
    confirmUndoBody:
      "Custom volverá al estado cargado al inicio de esta sesión. No se guarda nada. Factory y Current no cambian.",
    confirmLoadCurrentTitle: "¿Cargar WCDA Current?",
    confirmLoadCurrentBody:
      "Custom se reemplazará con la configuración pública aprobada. Se descartará el trabajo no guardado. No se guarda nada.",
    confirmLoadFactoryTitle: "¿Cargar WCDA Factory?",
    confirmLoadFactoryBody:
      "Custom se reemplazará con Factory inmutable. Factory no se modifica. Current no cambia hasta aplicar.",
    confirmLoadInspiredTitle: "¿Cargar WCDA Inspired?",
    confirmLoadInspiredBody:
      "Custom se reemplazará con la referencia Inspired. Se descartará el trabajo no guardado. No se guarda nada.",
    confirmApplyTitle: "¿Aplicar Custom como versión actual?",
    confirmApplyBody:
      "Esto escribe Tema y Experiencia Custom juntos como WCDA Current público. Si una parte falla, Current no cambia. Factory no puede sobrescribirse.",
    cancel: "Cancelar",
    confirm: "Continuar",
    applied:
      "WCDA Current se actualizó correctamente. Tema y Experiencia están sincronizados.",
    applyFailed:
      "No se aplicó ningún cambio. WCDA Current permanece sin modificaciones.",
    loadedFactory: "Factory cargado en Custom",
    loadedCurrent: "Current cargado en Custom",
    loadedInspired: "Inspired cargado en Custom",
    undone: "Cambios no guardados descartados",
    saveError: "No se pudo guardar WCDA Current",
    colorsBrand: "Marca",
    colorsSurfaces: "Superficies",
    colorsText: "Texto",
    colorsStructure: "Estructura",
  },
};

export function parseLabLanguage(value: string | null): LabLanguage {
  return value === "es" ? "es" : "en";
}

export function detectLabSource(
  theme: ThemeValues,
  experience: ExperienceValues,
  approvedTheme: ThemeValues,
  approvedExperience: ExperienceValues,
): LabSourceId {
  const matchesFactory =
    themeValuesEqual(theme, wcdaFactoryTheme) &&
    experienceValuesEqual(experience, wcdaFactoryExperience);
  const matchesCurrent =
    themeValuesEqual(theme, approvedTheme) &&
    experienceValuesEqual(experience, approvedExperience);

  if (matchesCurrent) {
    return "current";
  }
  if (matchesFactory) {
    return "factory";
  }
  if (
    themeValuesEqual(theme, themePresets["wcda-inspired"]) ||
    themeValuesEqual(theme, themePresets["jc-dental"]) ||
    themeValuesEqual(theme, themePresets["wcda-jc-mix"])
  ) {
    return "inspired";
  }
  return "custom";
}

export function sourceToThemePreset(
  source: LabSourceId,
): ThemePresetId {
  if (source === "factory") return "wcda-factory";
  if (source === "designer") return "wcda-designer";
  if (source === "inspired") return "wcda-inspired";
  if (source === "current") return "custom";
  return "custom";
}

export type LabControlScope = {
  media: boolean;
  containers: boolean;
  motion: boolean;
  marquee: boolean;
  badges: boolean;
  cornerAction: boolean;
  carousel: boolean;
  video: boolean;
  beforeAfter: boolean;
  cursor: boolean;
};

export function labControlScope(target: VisualTargetId): LabControlScope {
  const empty: LabControlScope = {
    media: true,
    containers: true,
    motion: true,
    marquee: false,
    badges: false,
    cornerAction: false,
    carousel: false,
    video: false,
    beforeAfter: false,
    cursor: false,
  };

  switch (target) {
    case "header-logo":
      return { ...empty, motion: false, cursor: true };
    case "home-marquee":
      return {
        media: false,
        containers: false,
        motion: false,
        marquee: true,
        badges: false,
        cornerAction: false,
        carousel: false,
        video: false,
        beforeAfter: false,
        cursor: false,
      };
    case "home-doctor-media":
    case "about-doctor-media":
      return { ...empty, badges: true };
    case "about-content":
      return { ...empty, badges: true };
    case "home-care-areas":
    case "services-care-cards":
      return { ...empty, cornerAction: true, carousel: true };
    case "home-cta":
      return { ...empty, media: false };
    case "home-hero-media":
      return { ...empty, video: true };
    case "technology-media":
      return { ...empty, video: true, badges: true, beforeAfter: false };
    default:
      return empty;
  }
}

export function sectionVisible(
  section: LabSectionId,
  scope: LabControlScope,
) {
  if (section === "media") return scope.media;
  if (section === "containers") return scope.containers;
  if (section === "motion") return scope.motion;
  if (section === "effects") {
    return (
      scope.marquee ||
      scope.badges ||
      scope.cornerAction ||
      scope.carousel ||
      scope.video ||
      scope.beforeAfter ||
      scope.cursor
    );
  }
  return true;
}
