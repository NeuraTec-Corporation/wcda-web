import {
  themePresets,
  themeValuesEqual,
  wcdaDesignerTheme,
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
  | "surfaces"
  | "header"
  | "footer"
  | "media"
  | "position"
  | "containers"
  | "motion"
  | "effects"
  | "content"
  | "copy"
  | "approval"
  | "recovery"
  | "tools";

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
  "surfaces",
  "header",
  "footer",
  "media",
  "containers",
  "motion",
  "effects",
  "content",
  "copy",
  "approval",
  "recovery",
  "tools",
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
  surfaces: string;
  header: string;
  footer: string;
  media: string;
  position: string;
  containers: string;
  motion: string;
    effects: string;
    content: string;
    copy: string;
  approval: string;
  recovery: string;
  tools: string;
  presets: string;
  previewPage: string;
  previewSection: string;
  selectedElement: string;
  viewport: string;
  editorMode: string;
  systemMode: string;
  approvalMode: string;
  recoveryMode: string;
  areaEditorHelp: string;
  areaSystemHelp: string;
  areaApprovalHelp: string;
  areaRecoveryHelp: string;
  isolateSection: string;
  isolateSectionHint: string;
  sectionItself: string;
  context: string;
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
  loadedDesigner: string;
  confirmLoadDesignerTitle: string;
  confirmLoadDesignerBody: string;
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
  applySection: string;
  resetSection: string;
  applySectionHint: string;
  applyElement: string;
  resetElement: string;
  applyElementHint: string;
  elementAppliedMessage: string;
  elementResetMessage: string;
  elementUnsaved: string;
  pageUnsaved: string;
  systemUnsaved: string;
  sectionNoChanges: string;
  sectionUnsaved: string;
  sectionAppliedToCustom: string;
  unsavedChanges: string;
  appliedToCustomNotCurrent: string;
  promotedToCurrent: string;
  allCustomPromoted: string;
  scopeLabel: string;
  pathLabel: string;
  stateLabel: string;
  pendingCustomScopes: string;
  noPendingCustom: string;
  promoteElement: string;
  promoteSection: string;
  promoteSystem: string;
  promoteDisabledUnsaved: string;
  restoreCurrent: string;
  unsavedNavTitle: string;
  unsavedNavBody: string;
  unsavedNavStay: string;
  unsavedNavDiscard: string;
  unsavedNavApply: string;
  pendingChangesTitle: string;
  applyAllUnsaved: string;
  publishReady: string;
  applyAndPublishAll: string;
  publishedStatus: string;
  pendingNone: string;
  pendingReview: string;
  pendingUnsavedHeading: string;
  pendingReadyHeading: string;
  discardChange: string;
  appliedUnsavedSummary: string;
  confirmApplyPublishTitle: string;
  confirmApplyPublishBody: string;
  confirmApplyPublishAction: string;
  confirmCopyWarningTitle: string;
  confirmCopyWarningBody: string;
  confirmPromoteElementTitle: string;
  confirmPromoteElementBody: string;
  confirmPromoteSectionTitle: string;
  confirmPromoteSectionBody: string;
  confirmPromoteSystemTitle: string;
  confirmPromoteSystemBody: string;
  applyAllAsCurrent: string;
  applyAllAsCurrentHint: string;
  resetAllToCurrent: string;
  resetAllToCurrentHint: string;
  confirmApplyAllTitle: string;
  confirmApplyAllBody: string;
  confirmResetAllTitle: string;
  confirmResetAllBody: string;
  sectionAppliedMessage: string;
  sectionResetMessage: string;
  resetAllDone: string;
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
    unsavedChanges: "Unsaved changes",
    saved: "Saved",
    entireSite: "Entire website",
    globalTheme: "Global theme",
    theme: "Theme",
    brand: "Brand",
    colors: "Colors",
    typography: "Typography",
    surfaces: "Global Surfaces",
    header: "Header",
    footer: "Footer",
    media: "Media",
    position: "Position / Crop",
    containers: "Containers",
    motion: "Motion",
    effects: "Special Effects",
    content: "Publication",
    copy: "Content",
    approval: "Approval & Publish",
    recovery: "Recovery",
    tools: "Color Tools",
    presets: "Presets",
    previewPage: "Preview page",
    previewSection: "Section",
    selectedElement: "Selected element",
    viewport: "Viewport",
    editorMode: "Editor",
    systemMode: "System",
    approvalMode: "Approval & Publish",
    recoveryMode: "Recovery",
    areaEditorHelp:
      "Edit a page, section, or element. Apply saves the selected scope. Publish makes ready changes live.",
    areaSystemHelp: "Manage website-wide design and experience settings.",
    areaApprovalHelp:
      "Review Unsaved and Ready to publish changes. Apply All Unsaved does not publish. Publish All Ready publishes only already-applied changes.",
    areaRecoveryHelp:
      "Load or restore known Current or Factory states. Recovery does not publish new changes.",
    isolateSection: "Isolate Section",
    isolateSectionHint:
      "Editor view only. Hides other sections in the Lab preview. Does not change publication, Current, or Factory.",
    sectionItself: "Section itself",
    context: "Context",
    desktop: "Desktop",
    tablet: "Tablet",
    mobile: "Mobile",
    headingFont: "Heading font",
    bodyFont: "Body font",
    shapeDensity: "Shape and density",
    undoUnsaved: "Undo unsaved changes",
    undoUnsavedHint:
      "Return unsaved section drafts to the last Applied-to-Custom snapshot. Does not change Current or Factory.",
    loadCurrent: "Load Current",
    loadCurrentHint:
      "Load Current into the Lab working preview. This is a recovery/reference operation. It does not publish anything.",
    loadFactory: "Load Factory",
    loadFactoryHint:
      "Load the immutable Factory configuration into the Lab working preview. Factory itself is never modified. Later edits become Custom working state.",
    loadInspired: "Load Inspired",
    loadInspiredHint:
      "Load the WCDA Inspired reference into Custom. Does not save.",
    designerNotApplied:
      "WCDA Designer is recorded and not applied. Factory and Current are unchanged.",
    loadedDesigner:
      "Designer colors loaded into preview. Factory and Current are unchanged.",
    confirmLoadDesignerTitle: "Load WCDA Designer?",
    confirmLoadDesignerBody:
      "Custom preview will use Designer Brand Canon colors. Unsaved Custom work will be discarded. Factory and Current are not modified. Nothing is saved to the public site.",
    applyCustom: "Publish All Ready",
    applyCustomHint:
      "Publishes every Ready change. Unsaved changes are not published. Factory is never overwritten.",
    copyTheme: "Copy theme config",
    copyExperience: "Copy experience config",
    copied: "Copied",
    saving: "Saving…",
    noEffects: "No special effects apply to this element.",
    hiddenControls:
      "Only controls for the selected element are shown. Hidden systems remain available on their own elements.",
    confirmUndoTitle: "Undo unsaved changes?",
    confirmUndoBody:
      "Unsaved section drafts will return to the last Applied-to-Custom snapshot. Staged Custom, Factory, and Current stay unchanged.",
    confirmLoadCurrentTitle: "Load WCDA Current?",
    confirmLoadCurrentBody:
      "Custom will be replaced with the approved public configuration. Unsaved Custom work will be discarded. Nothing is saved.",
    confirmLoadFactoryTitle: "Load WCDA Factory?",
    confirmLoadFactoryBody:
      "Custom will be replaced with the immutable Factory configuration. Factory itself is not modified. Current is not modified until you apply.",
    confirmLoadInspiredTitle: "Load WCDA Inspired?",
    confirmLoadInspiredBody:
      "Custom will be replaced with the Inspired reference. Unsaved Custom work will be discarded. Nothing is saved.",
    confirmApplyTitle: "Promote ALL approved Custom changes to Current?",
    confirmApplyBody:
      "This will update Current with every approved Custom change.\nWCDA Factory will remain unchanged.",
    cancel: "Cancel",
    confirm: "Promote All",
    applied:
      "All approved Custom changes promoted to Current",
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
    applySection: "Apply Section",
    resetSection: "Reset Section",
    applySectionHint:
      "Section Apply saves this page section (and its elements) to Custom only. It does not change WCDA Current.",
    applyElement: "Apply",
    resetElement: "Reset",
    applyElementHint:
      "Element Apply saves only the selected element to Custom. It does not change Current, other elements, or Factory.",
    elementAppliedMessage: "Applied — ready to publish",
    elementResetMessage: "Working restored from last applied state",
    elementUnsaved: "Unsaved changes",
    pageUnsaved: "Page — Unsaved",
    systemUnsaved: "Unsaved changes",
    sectionNoChanges: "Current",
    sectionUnsaved: "Unsaved",
    sectionAppliedToCustom: "Ready to publish",
    appliedToCustomNotCurrent: "Ready to publish",
    promotedToCurrent: "Published",
    allCustomPromoted: "All ready changes published",
    scopeLabel: "Scope",
    pathLabel: "Path",
    stateLabel: "State",
    pendingCustomScopes: "Pending changes",
    noPendingCustom: "No pending changes.",
    promoteElement: "Publish",
    promoteSection: "Publish Section",
    promoteSystem: "Publish",
    promoteDisabledUnsaved:
      "Apply these changes before publishing.",
    restoreCurrent: "Restore",
    unsavedNavTitle: "Unsaved changes",
    unsavedNavBody:
      "These changes have not been applied.",
    unsavedNavStay: "Stay Here",
    unsavedNavDiscard: "Discard",
    unsavedNavApply: "Apply & Continue",
    pendingChangesTitle: "Pending changes",
    applyAllUnsaved: "Apply All Unsaved",
    publishReady: "Publish All Ready",
    applyAndPublishAll: "Apply & Publish All",
    publishedStatus: "Published",
    pendingNone: "No pending changes",
    pendingReview: "Review",
    pendingUnsavedHeading: "Unsaved",
    pendingReadyHeading: "Ready to publish",
    discardChange: "Discard",
    appliedUnsavedSummary:
      "✓ {applied} changes applied. {ready} changes ready to publish.",
    confirmApplyPublishTitle: "Apply & Publish all changes?",
    confirmApplyPublishBody:
      "{unsaved} Unsaved changes will first be Applied.\n{ready} already-applied changes are ready to publish.\n\nTotal after Apply:\n{total} changes will be published.",
    confirmApplyPublishAction: "Apply & Publish {total} Changes",
    confirmCopyWarningTitle: "Clinical / professional meaning",
    confirmCopyWarningBody:
      "This content may affect clinical/professional meaning.",
    confirmPromoteElementTitle: "Publish this change?",
    confirmPromoteElementBody:
      "Only this change will be published.\nOther ready changes stay unpublished.",
    confirmPromoteSectionTitle: "Publish this section?",
    confirmPromoteSectionBody:
      "Only this section will be published.\nOther ready changes stay unpublished.",
    confirmPromoteSystemTitle: "Publish this System change?",
    confirmPromoteSystemBody:
      "Only this System change will be published.\nOther ready changes stay unpublished.",
    applyAllAsCurrent: "Publish All Ready",
    applyAllAsCurrentHint:
      "Publishes every Ready change. Unsaved changes are not published. Factory is never overwritten.",
    resetAllToCurrent: "Reset All to Current",
    resetAllToCurrentHint:
      "Discards Custom and unsaved drafts and restores the latest WCDA Current. Does not change Current or Factory.",
    confirmApplyAllTitle: "Publish all ready changes?",
    confirmApplyAllBody:
      "Ready changes will become Published.\nUnsaved changes will not be published.\nFactory remains unchanged.",
    confirmResetAllTitle: "Reset All to Current?",
    confirmResetAllBody:
      "All Custom and unsaved changes will be discarded and restored to the latest WCDA Current.",
    sectionAppliedMessage: "Applied — ready to publish",
    sectionResetMessage: "Working restored from last applied state",
    resetAllDone: "Restored to published state",
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
    unsavedChanges: "Cambios sin guardar",
    saved: "Guardado",
    entireSite: "Todo el sitio",
    globalTheme: "Tema global",
    theme: "Tema",
    brand: "Marca",
    colors: "Colores",
    typography: "Tipografía",
    surfaces: "Superficies globales",
    header: "Cabecera",
    footer: "Pie de página",
    media: "Imágenes",
    position: "Posición / recorte",
    containers: "Contenedores",
    motion: "Movimiento",
    effects: "Efectos especiales",
    content: "Publicación",
    copy: "Contenido",
    approval: "Aprobación y publicación",
    recovery: "Recuperación",
    tools: "Herramientas de color",
    presets: "Preajustes",
    previewPage: "Página de vista previa",
    previewSection: "Sección",
    selectedElement: "Elemento seleccionado",
    viewport: "Dispositivo",
    editorMode: "Editor",
    systemMode: "Sistema",
    approvalMode: "Aprobación y publicación",
    recoveryMode: "Recuperación",
    areaEditorHelp:
      "Edite una página, sección o elemento. Aplicar guarda el alcance seleccionado. Publicar hace vivos los cambios listos.",
    areaSystemHelp:
      "Administre configuraciones globales de diseño y experiencia del sitio.",
    areaApprovalHelp:
      "Revise cambios Sin guardar y Listos para publicar. Aplicar todos no publica. Publicar listos publica solo cambios ya aplicados.",
    areaRecoveryHelp:
      "Cargue o restaure estados conocidos de Current o Factory. Recovery no publica cambios nuevos.",
    isolateSection: "Aislar sección",
    isolateSectionHint:
      "Solo vista del Editor. Oculta otras secciones en la vista previa del Lab. No cambia publicación, Current ni Factory.",
    sectionItself: "La sección",
    context: "Contexto",
    desktop: "Escritorio",
    tablet: "Tablet",
    mobile: "Móvil",
    headingFont: "Fuente de títulos",
    bodyFont: "Fuente de cuerpo",
    shapeDensity: "Forma y densidad",
    undoUnsaved: "Deshacer cambios no guardados",
    undoUnsavedHint:
      "Devuelve los borradores de sección al último Aplicado a Custom. No cambia Current ni Factory.",
    loadCurrent: "Cargar versión actual",
    loadCurrentHint:
      "Carga Current en la vista previa de trabajo del Lab. Es una operación de recuperación/referencia. No publica nada.",
    loadFactory: "Cargar WCDA Factory",
    loadFactoryHint:
      "Carga Factory inmutable en la vista previa de trabajo del Lab. Factory no se modifica. Los cambios posteriores crean estado Custom.",
    loadInspired: "Cargar Inspired",
    loadInspiredHint:
      "Carga la referencia WCDA Inspired en Custom. No guarda nada.",
    designerNotApplied:
      "WCDA Designer está registrado y no aplicado. Factory y Current no cambian.",
    loadedDesigner:
      "Colores de Designer cargados en la vista previa. Factory y Current no cambian.",
    confirmLoadDesignerTitle: "¿Cargar WCDA Designer?",
    confirmLoadDesignerBody:
      "La vista previa Custom usará los colores del Brand Canon del diseñador. Se descartará el trabajo no guardado. Factory y Current no se modifican. No se guarda nada en el sitio público.",
    applyCustom: "Publicar todos los listos",
    applyCustomHint:
      "Publica todos los cambios Listos. Los cambios sin guardar no se publican. Factory no se sobrescribe.",
    copyTheme: "Copiar configuración de tema",
    copyExperience: "Copiar configuración de experiencia",
    copied: "Copiado",
    saving: "Guardando…",
    noEffects: "Este elemento no tiene efectos especiales.",
    hiddenControls:
      "Solo se muestran controles del elemento seleccionado. Los demás sistemas siguen en sus propios elementos.",
    confirmUndoTitle: "¿Deshacer cambios no guardados?",
    confirmUndoBody:
      "Los borradores de sección sin guardar volverán al último Aplicado a Custom. Custom preparado, Factory y Current no cambian.",
    confirmLoadCurrentTitle: "¿Cargar WCDA Current?",
    confirmLoadCurrentBody:
      "Custom se reemplazará con la configuración pública aprobada. Se descartará el trabajo no guardado. No se guarda nada.",
    confirmLoadFactoryTitle: "¿Cargar WCDA Factory?",
    confirmLoadFactoryBody:
      "Custom se reemplazará con Factory inmutable. Factory no se modifica. Current no cambia hasta aplicar.",
    confirmLoadInspiredTitle: "¿Cargar WCDA Inspired?",
    confirmLoadInspiredBody:
      "Custom se reemplazará con la referencia Inspired. Se descartará el trabajo no guardado. No se guarda nada.",
    confirmApplyTitle: "¿Promover TODOS los cambios aprobados en Custom a Current?",
    confirmApplyBody:
      "Esto actualizará Current con todos los cambios aprobados en Custom.\nWCDA Factory permanecerá sin cambios.",
    cancel: "Cancelar",
    confirm: "Promover todo",
    applied:
      "Todos los cambios aprobados en Custom fueron promovidos a Current",
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
    applySection: "Aplicar sección",
    resetSection: "Restablecer sección",
    applySectionHint:
      "Aplicar sección guarda esta sección de página (y sus elementos) en Custom. No cambia WCDA Current.",
    applyElement: "Aplicar",
    resetElement: "Restablecer",
    applyElementHint:
      "Aplicar elemento guarda solo el elemento seleccionado en Custom. No cambia WCDA Current, otros elementos ni Factory.",
    elementAppliedMessage: "Aplicado — listo para publicar",
    elementResetMessage: "Working restaurado desde el último estado aplicado",
    elementUnsaved: "Cambios sin guardar",
    pageUnsaved: "Página — Sin guardar",
    systemUnsaved: "Cambios sin guardar",
    sectionNoChanges: "Current",
    sectionUnsaved: "Sin guardar",
    sectionAppliedToCustom: "Listo para publicar",
    appliedToCustomNotCurrent: "Listo para publicar",
    promotedToCurrent: "Publicado",
    allCustomPromoted: "Todos los cambios listos fueron publicados",
    scopeLabel: "Alcance",
    pathLabel: "Ruta",
    stateLabel: "Estado",
    pendingCustomScopes: "Cambios pendientes",
    noPendingCustom: "No hay cambios pendientes.",
    promoteElement: "Publicar",
    promoteSection: "Publicar sección",
    promoteSystem: "Publicar",
    promoteDisabledUnsaved:
      "Aplique estos cambios antes de publicar.",
    restoreCurrent: "Restaurar",
    unsavedNavTitle: "Cambios sin guardar",
    unsavedNavBody:
      "Estos cambios no se han aplicado.",
    unsavedNavStay: "Permanecer aquí",
    unsavedNavDiscard: "Descartar",
    unsavedNavApply: "Aplicar y continuar",
    pendingChangesTitle: "Cambios pendientes",
    applyAllUnsaved: "Aplicar todos los no guardados",
    publishReady: "Publicar todos los listos",
    applyAndPublishAll: "Aplicar y publicar todo",
    publishedStatus: "Publicado",
    pendingNone: "No hay cambios pendientes",
    pendingReview: "Revisar",
    pendingUnsavedHeading: "Sin guardar",
    pendingReadyHeading: "Listo para publicar",
    discardChange: "Descartar",
    appliedUnsavedSummary:
      "✓ {applied} cambios aplicados. {ready} cambios listos para publicar.",
    confirmApplyPublishTitle: "¿Aplicar y publicar todos los cambios?",
    confirmApplyPublishBody:
      "{unsaved} cambios sin guardar se Aplicarán primero.\n{ready} cambios ya aplicados están listos para publicar.\n\nTotal después de Aplicar:\n{total} cambios se publicarán.",
    confirmApplyPublishAction: "Aplicar y publicar {total} cambios",
    confirmCopyWarningTitle: "Significado clínico o profesional",
    confirmCopyWarningBody:
      "Este contenido puede afectar el significado clínico o profesional.",
    confirmPromoteElementTitle: "¿Publicar este cambio?",
    confirmPromoteElementBody:
      "Solo se publicará este cambio.\nLos demás cambios listos permanecerán sin publicar.",
    confirmPromoteSectionTitle: "¿Publicar esta sección?",
    confirmPromoteSectionBody:
      "Solo se publicará esta sección.\nLos demás cambios listos permanecerán sin publicar.",
    confirmPromoteSystemTitle: "¿Publicar este cambio de Sistema?",
    confirmPromoteSystemBody:
      "Solo se publicará este cambio de Sistema.\nLos demás cambios listos permanecerán sin publicar.",
    applyAllAsCurrent: "Publicar todos los listos",
    applyAllAsCurrentHint:
      "Publica todos los cambios Listos. Los cambios sin guardar no se publican. Factory no se sobrescribe.",
    resetAllToCurrent: "Restablecer todo a Current",
    resetAllToCurrentHint:
      "Descarta Custom y los borradores sin guardar y restaura la última versión de WCDA Current. No cambia Current ni Factory.",
    confirmApplyAllTitle: "¿Publicar todos los cambios listos?",
    confirmApplyAllBody:
      "Los cambios listos se convertirán en Publicados.\nLos cambios sin guardar no se publicarán.\nFactory permanece sin cambios.",
    confirmResetAllTitle: "¿Restablecer todo a Current?",
    confirmResetAllBody:
      "Todos los cambios de Custom y los cambios sin guardar se descartarán y se restaurará la última versión de WCDA Current.",
    sectionAppliedMessage: "Aplicado — listo para publicar",
    sectionResetMessage: "Working restaurado desde el último estado aplicado",
    resetAllDone: "Restaurado al estado publicado",
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
  if (themeValuesEqual(theme, wcdaDesignerTheme)) {
    return "designer";
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
    cursor: true,
  };

  switch (target) {
    case "header-logo":
      return { ...empty, containers: false, motion: false };
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
        cursor: true,
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
    case "patients-resource-cards":
    case "editorial-cards":
      return { ...empty, media: false, motion: false };
    case "home-hero-media":
      return { ...empty, video: true };
    case "home-hero-content":
      return {
        media: false,
        containers: false,
        motion: false,
        marquee: false,
        badges: false,
        cornerAction: false,
        carousel: false,
        video: false,
        beforeAfter: false,
        cursor: false,
      };
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
  if (section === "tools") return true;
  return true;
}
