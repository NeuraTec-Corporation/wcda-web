"use client";

import { useState, type CSSProperties } from "react";
import {
  containerPresetsForTarget,
  containerToMediaStyle,
  getComponentConfig,
  getContainerSurfaceIntensity,
  HEADER_LOGO_STYLE_IDS,
  HERO_CONTENT_OFFSET_MAX,
  HERO_CONTENT_OFFSET_MIN,
  HERO_CONTENT_WIDTH_MAX,
  HERO_CONTENT_WIDTH_MIN,
  heroContentLayout,
  INSET_BADGE_SIZE_MAX,
  INSET_BADGE_SIZE_MIN,
  insetBadgeSizePx,
  isActionCompatibleTarget,
  isCarouselChromeTarget,
  isMediaComposerTarget,
  isPerItemMediaTarget,
  isSurfaceIntensityControlVisible,
  isSurfaceIntensityTarget,
  isVideoChromeTarget,
  labVisibleContainerPreset,
  MEDIA_PAN_MAX,
  MEDIA_PAN_MIN,
  mediaStylesForTarget,
  mediaStyleToContainer,
  resolveItemMedia,
  resolveMediaPan,
  SURFACE_LIGHTNESS_MAX,
  SURFACE_LIGHTNESS_MIN,
  updateComponentConfig,
  updateContainerSurfaceIntensity,
  updateItemAsset,
  updateItemMedia,
  type AspectRatioPreset,
  type BadgeDiameter,
  type BadgeIconId,
  type BadgePosition,
  type BadgeRotationSpeed,
  type BadgeTextColor,
  type BadgeType,
  CAROUSEL_TRANSITION_DURATION_DEFAULT,
  CAROUSEL_TRANSITION_DURATION_MAX,
  CAROUSEL_TRANSITION_DURATION_MIN,
  CAROUSEL_TRANSITION_DURATION_STEP,
  clampCarouselTransitionDuration,
  clampEditorialGraphicSize,
  clampEditorialIconSize,
  badgeCenterGraphicFillPercent,
  graphicSizeFromBadgeCenterFillPercent,
  BADGE_CENTER_GRAPHIC_FILL_MAX,
  BADGE_CENTER_GRAPHIC_FILL_MIN,
  EDITORIAL_GRAPHIC_ALIGNS,
  EDITORIAL_GRAPHIC_SIZE_MAX,
  EDITORIAL_GRAPHIC_SIZE_MIN,
  EDITORIAL_ICON_BACKGROUNDS,
  EDITORIAL_ICON_COLORS,
  EDITORIAL_ICON_SIZE_MAX,
  EDITORIAL_ICON_SIZE_MIN,
  EDITORIAL_PRESENTATION_MODES,
  editorialIconCssVars,
  resolveEditorialIcon,
  updateEditorialIconItem,
  type CarouselAutoplay,
  type CarouselCardsPerView,
  type CarouselNavigation,
  type ComponentSlotConfig,
  type ContainerPresetId,
  type CornerActionGlyph,
  type CornerActionMorph,
  type CornerActionPosition,
  type CursorCompanionMode,
  type EditorialGraphicAlign,
  type EditorialIconBackground,
  type EditorialIconColor,
  type EditorialPresentationMode,
  type ExperienceValues,
  type MarqueeDirection,
  type MarqueeHeight,
  type MarqueeLayout,
  type MarqueeSpacing,
  type MarqueeSpeed,
  type MarqueeSurface,
  type MediaContainerStyleId,
  type MediaFit,
  type MediaSourceMode,
  type MotionDelay,
  type MotionDuration,
  type MotionEntrance,
  type MotionIntensity,
  type OverlayPreset,
  type PlayButtonStyle,
  type VideoCornerAction,
  type VideoMode,
  type VisualTargetId,
} from "@/config/experience";
import { labControlScope } from "@/config/lab-ui";
import {
  labControls,
  labText,
  labWords,
  unavailableNotes,
  containerGuides,
  type LabControlId,
} from "@/config/lab-guide";
import {
  LabControlHelp,
  LabUnavailableNote,
  useLabLanguage,
} from "@/components/theme/LabControlHelp";
import {
  getContrastWarning,
  logoWidthPresets,
  mediaPaddingPresets,
  previewBackgrounds,
  scaleRangeForTarget,
  sizePresetsForTarget,
  type ComposerAssetId,
  type MediaAlignment,
  type MediaPaddingPreset,
  type MediaSizePreset,
  type PreviewBackgroundId,
} from "@/config/media-assets";
import { MediaAssetGallery } from "@/components/theme/MediaAssetGallery";
import { IconAssetGallery } from "@/components/theme/IconAssetGallery";
import { EditorialIconAsset } from "@/components/editorial/EditorialIconAsset";
import { EditorialIconMark } from "@/components/editorial/EditorialGlyph";
import { ToothGlyph } from "@/components/experience/ExperienceGlyphs";
import { editorialIconColorEnabled, isApprovedIconSrc } from "@/config/lab-icon-library";

type LabTab = "theme" | "media" | "containers" | "motion" | "effects";

type ThemeLabExperienceProps = {
  experience: ExperienceValues;
  selectedTarget: VisualTargetId;
  itemKey?: string;
  onChange: (experience: ExperienceValues) => void;
};

const selectClass =
  "mt-1.5 min-h-11 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100";

function useWord() {
  const language = useLabLanguage();
  return (key: string) => labWords[language][key] ?? key;
}

function wordOrLabel(w: (key: string) => string, id: string, fallback: string) {
  const translated = w(id);
  return translated === id ? fallback : translated;
}

export function ThemeLabEditorialIconPanel({
  experience,
  itemKey,
  itemLabel,
  onChange,
  openSignal = 0,
  variant = "editorial",
}: {
  experience: ExperienceValues;
  itemKey: string;
  itemLabel?: string;
  onChange: (experience: ExperienceValues) => void;
  openSignal?: number;
  variant?: "editorial" | "badge-center";
}) {
  const w = useWord();
  const language = useLabLanguage();
  const editorialIcon = resolveEditorialIcon(experience, itemKey);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [seenOpenSignal, setSeenOpenSignal] = useState(openSignal);
  if (openSignal !== seenOpenSignal) {
    setSeenOpenSignal(openSignal);
    if (openSignal > 0) {
      setLibraryOpen(true);
    }
  }
  const assetSrc =
    editorialIcon.assetSrc && isApprovedIconSrc(editorialIcon.assetSrc)
      ? editorialIcon.assetSrc
      : undefined;
  const glyphId = editorialIcon.icon;
  const colorEnabled = editorialIconColorEnabled(
    assetSrc,
    editorialIcon.assetColorMode,
  );
  const pngAsset = Boolean(assetSrc?.toLowerCase().endsWith(".png"));
  const featureMode = editorialIcon.presentationMode === "feature-graphic";
  const badgeCenter = variant === "badge-center";
  const badgeFillPercent = badgeCenterGraphicFillPercent(
    experience.editorialIcons.items?.[itemKey]?.graphicSize,
  );

  return (
    <fieldset className="min-w-0">
      <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
        {language === "es" ? "Icono" : "Icon"}
      </legend>
      <div className="mt-3 flex flex-col gap-3">
        {!badgeCenter ? (
          <>
            <FieldLabel htmlFor="exp-editorial-presentation" helpId="editorial-presentation">
              {controlLabel("editorial-presentation", language)}
            </FieldLabel>
            <select
              id="exp-editorial-presentation"
              className={selectClass}
              value={editorialIcon.presentationMode}
              onChange={(event) =>
                onChange(
                  updateEditorialIconItem(experience, itemKey, {
                    presentationMode: event.target.value as EditorialPresentationMode,
                  }),
                )
              }
            >
              {EDITORIAL_PRESENTATION_MODES.map((id) => (
                <option key={id} value={id}>
                  {id === "compact-icon" ? w("compactIcon") : w("featureGraphic")}
                </option>
              ))}
            </select>
          </>
        ) : null}
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-400">
          {language === "es" ? "Icono actual" : "Current Icon"}
        </p>
        <div
          className={`flex items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 ${
            badgeCenter || featureMode ? "min-h-28" : "min-h-16"
          }`}
        >
          {badgeCenter ? (
            <span className="exp-badge-center-preview grid size-20 place-items-center rounded-full bg-zinc-800 text-zinc-200">
              <span className="exp-badge-center-preview-well" />
              {assetSrc ? (
                <span
                  className="exp-badge-center-overlay"
                  style={
                    {
                      ["--exp-badge-center-graphic-size"]: `${badgeFillPercent}%`,
                    } as CSSProperties
                  }
                >
                  <EditorialIconAsset
                    src={assetSrc}
                    colorMode={editorialIcon.assetColorMode}
                    className="exp-badge-center-asset"
                  />
                </span>
              ) : glyphId ? (
                <EditorialIconMark id={glyphId} className="size-8" />
              ) : (
                <ToothGlyph className="size-8 text-zinc-200" />
              )}
            </span>
          ) : (
          <span
            className="editorial-icon"
            data-icon-background={editorialIcon.background}
            data-presentation={editorialIcon.presentationMode}
            data-graphic-align={editorialIcon.graphicAlign}
            style={
              editorialIconCssVars(
                editorialIcon.color,
                editorialIcon.size,
                editorialIcon.graphicSize,
              ) as CSSProperties
            }
          >
            {assetSrc ? (
              <EditorialIconAsset
                src={assetSrc}
                colorMode={editorialIcon.assetColorMode}
              />
            ) : glyphId ? (
              <EditorialIconMark id={glyphId} />
            ) : (
              <span className="text-[0.7rem] text-zinc-500">
                {language === "es" ? "Sin icono" : "No icon"}
              </span>
            )}
          </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setLibraryOpen(true)}
          className="min-h-11 w-full rounded-md border border-cyan-400/50 bg-cyan-400/10 px-3 text-sm text-white hover:bg-cyan-400/20"
        >
          {language === "es" ? "Cambiar icono / gráfico" : "Change Icon / Graphic"}
        </button>
        {pngAsset ? (
          <p className="text-[0.7rem] leading-relaxed text-amber-200/90">
            {language === "es"
              ? "Este PNG conserva sus colores incrustados. Icon Color no se aplica."
              : "This PNG keeps its embedded colors. Icon Color is not applied."}
          </p>
        ) : assetSrc && editorialIcon.assetColorMode === "fixed" ? (
          <p className="text-[0.7rem] leading-relaxed text-amber-200/90">
            {language === "es"
              ? "Este SVG usa colores fijos. Icon Color no lo recolorea."
              : "This SVG uses fixed colors. Icon Color does not recolor it."}
          </p>
        ) : null}
        <IconAssetGallery
          language={language}
          title={itemLabel || itemKey}
          value={assetSrc}
          color={editorialIcon.color}
          size={editorialIcon.size}
          open={libraryOpen}
          onClose={() => setLibraryOpen(false)}
          onSelect={(asset) =>
            onChange(
              updateEditorialIconItem(experience, itemKey, {
                assetSrc: asset.src,
                assetColorMode:
                  asset.kind === "png" || asset.src.toLowerCase().endsWith(".png")
                    ? "fixed"
                    : asset.colorMode,
                icon: undefined,
              }),
            )
          }
        />
        {badgeCenter ? (
          <>
            <FieldLabel
              htmlFor="exp-badge-center-graphic-size"
              helpId="badge-center-graphic-size"
            >
              {controlLabel("badge-center-graphic-size", language)}
            </FieldLabel>
            <div className="mt-1.5 flex items-center gap-3">
              <input
                id="exp-badge-center-graphic-size"
                type="range"
                min={BADGE_CENTER_GRAPHIC_FILL_MIN}
                max={BADGE_CENTER_GRAPHIC_FILL_MAX}
                step={1}
                value={badgeFillPercent}
                onChange={(event) =>
                  onChange(
                    updateEditorialIconItem(experience, itemKey, {
                      graphicSize: graphicSizeFromBadgeCenterFillPercent(
                        Number(event.target.value),
                      ),
                    }),
                  )
                }
                className="w-full"
              />
              <span className="w-16 shrink-0 text-right font-mono text-xs text-zinc-400">
                {badgeFillPercent}%
              </span>
            </div>
          </>
        ) : null}
        {!badgeCenter ? (
          featureMode ? (
          <>
            <FieldLabel htmlFor="exp-editorial-graphic-size" helpId="editorial-graphic-size">
              {controlLabel("editorial-graphic-size", language)}
            </FieldLabel>
            <div className="mt-1.5 flex items-center gap-3">
              <input
                id="exp-editorial-graphic-size"
                type="range"
                min={EDITORIAL_GRAPHIC_SIZE_MIN}
                max={EDITORIAL_GRAPHIC_SIZE_MAX}
                step={1}
                value={editorialIcon.graphicSize}
                onChange={(event) =>
                  onChange(
                    updateEditorialIconItem(experience, itemKey, {
                      graphicSize: clampEditorialGraphicSize(
                        Number(event.target.value),
                      ),
                    }),
                  )
                }
                className="w-full"
              />
              <span className="w-16 shrink-0 text-right font-mono text-xs text-zinc-400">
                {editorialIcon.graphicSize} px
              </span>
            </div>
            <FieldLabel htmlFor="exp-editorial-graphic-align" helpId="editorial-graphic-align">
              {controlLabel("editorial-graphic-align", language)}
            </FieldLabel>
            <select
              id="exp-editorial-graphic-align"
              className={selectClass}
              value={editorialIcon.graphicAlign}
              onChange={(event) =>
                onChange(
                  updateEditorialIconItem(experience, itemKey, {
                    graphicAlign: event.target.value as EditorialGraphicAlign,
                  }),
                )
              }
            >
              {EDITORIAL_GRAPHIC_ALIGNS.map((id) => (
                <option key={id} value={id}>
                  {w(id)}
                </option>
              ))}
            </select>
          </>
        ) : (
          <>
            <FieldLabel htmlFor="exp-editorial-icon-background" helpId="editorial-icon-background">
              {controlLabel("editorial-icon-background", language)}
            </FieldLabel>
            <select
              id="exp-editorial-icon-background"
              className={selectClass}
              value={editorialIcon.background}
              onChange={(event) =>
                onChange(
                  updateEditorialIconItem(experience, itemKey, {
                    background: event.target.value as EditorialIconBackground,
                  }),
                )
              }
            >
              {EDITORIAL_ICON_BACKGROUNDS.map((id) => (
                <option key={id} value={id}>
                  {id === "none" ? w("none") : w("circle")}
                </option>
              ))}
            </select>
            <FieldLabel htmlFor="exp-editorial-icon-size" helpId="editorial-icon-size">
              {controlLabel("editorial-icon-size", language)}
            </FieldLabel>
            <div className="mt-1.5 flex items-center gap-3">
              <input
                id="exp-editorial-icon-size"
                type="range"
                min={EDITORIAL_ICON_SIZE_MIN}
                max={EDITORIAL_ICON_SIZE_MAX}
                step={1}
                value={editorialIcon.size}
                onChange={(event) =>
                  onChange(
                    updateEditorialIconItem(experience, itemKey, {
                      size: clampEditorialIconSize(Number(event.target.value)),
                    }),
                  )
                }
                className="w-full"
              />
              <span className="w-16 shrink-0 text-right font-mono text-xs text-zinc-400">
                {editorialIcon.size} px
              </span>
            </div>
          </>
        )
        ) : null}
        {!badgeCenter || (assetSrc && colorEnabled) ? (
        <>
        <FieldLabel htmlFor="exp-editorial-icon-color" helpId="editorial-icon-color">
          {controlLabel("editorial-icon-color", language)}
        </FieldLabel>
        <select
          id="exp-editorial-icon-color"
          className={selectClass}
          value={editorialIcon.color}
          disabled={!colorEnabled}
          onChange={(event) =>
            onChange(
              updateEditorialIconItem(experience, itemKey, {
                color: event.target.value as EditorialIconColor,
              }),
            )
          }
        >
          {EDITORIAL_ICON_COLORS.map((id) => (
            <option key={id} value={id}>
              {id === "cyan" ? w("cyan") : wordOrLabel(w, id, id)}
            </option>
          ))}
        </select>
        </>
        ) : null}
      </div>
    </fieldset>
  );
}

function FieldLabel({
  htmlFor,
  children,
  helpId,
}: {
  htmlFor: string;
  children: string;
  helpId?: LabControlId;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={htmlFor} className="block text-sm text-zinc-200">
        {children}
      </label>
      {helpId ? <LabControlHelp id={helpId} /> : null}
    </div>
  );
}

function controlLabel(id: LabControlId, language: ReturnType<typeof useLabLanguage>) {
  const item = labControls[id];
  if (!item) {
    throw new Error(
      `Lab control "${id}" is not registered in labControls.`,
    );
  }
  return labText(item.help.label, language);
}

function GlobalMediaScopeNote() {
  const language = useLabLanguage();
  return (
    <p className="rounded-md border border-amber-500/30 bg-amber-400/10 px-3 py-2 text-[0.7rem] leading-relaxed text-amber-100/90">
      {language === "es"
        ? "CONFIGURACIÓN GLOBAL DE IMÁGENES. Este control afecta todos los elementos de imagen compatibles, no solamente el elemento seleccionado actualmente."
        : "GLOBAL MEDIA SETTING. This control affects all compatible media elements, not only the currently selected element."}
    </p>
  );
}

function GlobalCursorScopeNote() {
  const language = useLabLanguage();
  return (
    <p className="rounded-md border border-amber-500/30 bg-amber-400/10 px-3 py-2 text-[0.7rem] leading-relaxed text-amber-100/90">
      {language === "es"
        ? "Efecto global de interacción del cursor. Afecta la vista previa del sitio de forma global, no solo el elemento de media seleccionado."
        : "Global cursor interaction effect. It affects the website preview globally, not only the selected media element."}
    </p>
  );
}

export function ThemeLabMediaPanel({
  experience,
  selectedTarget,
  itemKey,
  onChange,
  openPickerSignal = 0,
  baseline,
}: ThemeLabExperienceProps & {
  openPickerSignal?: number;
  baseline?: ExperienceValues;
}) {
  const w = useWord();
  const language = useLabLanguage();
  const media = experience.media;
  const slot = getComponentConfig(experience, selectedTarget);
  const currentSlot = getComponentConfig(
    baseline ?? experience,
    selectedTarget,
  );
  const isLogo = selectedTarget === "header-logo";
  const composerEnabled = isMediaComposerTarget(selectedTarget);
  const perItemPosition = Boolean(
    itemKey && isPerItemMediaTarget(selectedTarget),
  );
  const scaleRange = scaleRangeForTarget(selectedTarget);
  const sizeOptions = sizePresetsForTarget(selectedTarget);
  const widthOptions = logoWidthPresets();
  const assetValue: ComposerAssetId = itemKey
    ? (slot.itemAssets?.[itemKey] ?? "default")
    : slot.assetId;
  const currentAssetValue: ComposerAssetId = itemKey
    ? (currentSlot.itemAssets?.[itemKey] ?? "default")
    : currentSlot.assetId;
  const contrastWarning = getContrastWarning({
    assetId: assetValue,
    previewBackground: slot.previewBackground,
    target: selectedTarget,
  });
  const scalePercent = Math.round(slot.scale * 100);

  function updateMedia<K extends keyof ExperienceValues["media"]>(
    key: K,
    value: ExperienceValues["media"][K],
  ) {
    onChange({ ...experience, media: { ...media, [key]: value } });
  }

  function patchSlot(patch: Partial<ComponentSlotConfig>) {
    onChange(updateComponentConfig(experience, selectedTarget, patch));
  }

  const sizeValue = sizeOptions.some((item) => item.id === slot.sizePreset)
    ? slot.sizePreset
    : sizeOptions[0]?.id ?? "standard";
  const availableMediaStyles = mediaStylesForTarget(selectedTarget);
  const mediaStyleValue =
    isLogo && !HEADER_LOGO_STYLE_IDS.includes(slot.mediaStyle)
      ? "transparent-strip"
      : availableMediaStyles.some((item) => item.id === slot.mediaStyle)
        ? slot.mediaStyle
        : (availableMediaStyles[0]?.id ?? slot.mediaStyle);
  const widthSelectOptions = widthOptions.some(
    (item) => item.id === slot.sizePreset,
  )
    ? widthOptions
    : [
        {
          id: slot.sizePreset,
          label: slot.sizePreset === "large" ? "Large" : slot.sizePreset,
        },
        ...widthOptions,
      ];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs leading-relaxed text-zinc-500">
        {w("mediaIntro")}
      </p>
      {composerEnabled ? (
        <>
          <MediaAssetGallery
            id="exp-asset"
            language={language}
            target={selectedTarget}
            itemKey={itemKey}
            value={assetValue}
            currentValue={baseline ? currentAssetValue : undefined}
            openSignal={openPickerSignal}
            onSelect={(assetId) => {
              if (itemKey) {
                onChange(
                  updateItemAsset(
                    experience,
                    selectedTarget,
                    itemKey,
                    assetId,
                  ),
                );
                return;
              }
              patchSlot({ assetId });
            }}
          />
          <LabControlHelp id="media-asset" />
          {contrastWarning ? (
            <p
              role="status"
              className="rounded-md border border-amber-500/40 bg-amber-400/10 px-3 py-2 text-xs text-amber-200"
            >
              ⚠ {w("lowContrast")}
            </p>
          ) : null}
          {perItemPosition ? null : (
            <>
          <label
            className="flex items-center justify-between text-sm text-zinc-200"
            htmlFor="exp-scale"
          >
            <span>{labText(labControls["media-scale"].help.label, language)}</span>
            <span className="font-mono text-xs text-zinc-400">
              {scalePercent}%
            </span>
          </label>
          <input
            id="exp-scale"
            type="range"
            min={scaleRange.min}
            max={scaleRange.max}
            step={scaleRange.step}
            value={slot.scale}
            onChange={(event) =>
              patchSlot({ scale: Number(event.target.value) })
            }
          />
          <LabControlHelp id="media-scale" />
          <label
            className="flex items-center justify-between text-sm text-zinc-200"
            htmlFor="exp-x"
          >
            <span>{labText(labControls["media-x"].help.label, language)}</span>
            <span className="font-mono text-xs text-zinc-400">
              {slot.positionX}
            </span>
          </label>
          <input
            id="exp-x"
            type="range"
            min={0}
            max={100}
            value={slot.positionX}
            onChange={(event) =>
              patchSlot({ positionX: Number(event.target.value) })
            }
          />
          <LabControlHelp id="media-x" />
          <label
            className="flex items-center justify-between text-sm text-zinc-200"
            htmlFor="exp-y"
          >
            <span>{labText(labControls["media-y"].help.label, language)}</span>
            <span className="font-mono text-xs text-zinc-400">
              {slot.positionY}
            </span>
          </label>
          <input
            id="exp-y"
            type="range"
            min={0}
            max={100}
            value={slot.positionY}
            onChange={(event) =>
              patchSlot({ positionY: Number(event.target.value) })
            }
          />
          <LabControlHelp id="media-y" />
          <FieldLabel htmlFor="exp-fit" helpId="media-fit">
            {labText(labControls["media-fit"].help.label, language)}
          </FieldLabel>
          <select
            id="exp-fit"
            className={selectClass}
            value={slot.fit}
            onChange={(event) =>
              patchSlot({ fit: event.target.value as MediaFit })
            }
          >
            <option value="contain">{w("contain")}</option>
            <option value="cover">{w("cover")}</option>
          </select>
          <div className="flex flex-wrap gap-1">
            {(
              [
                ["center", 50, 50],
                ["top", 50, 0],
                ["bottom", 50, 100],
                ["left", 0, 50],
                ["right", 100, 50],
              ] as const
            ).map(([id, x, y]) => (
              <button
                key={id}
                type="button"
                onClick={() => patchSlot({ positionX: x, positionY: y })}
                className={`min-h-9 rounded-md border px-2 text-[0.7rem] ${
                  slot.positionX === x && slot.positionY === y
                    ? "border-cyan-400 text-white"
                    : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
                }`}
              >
                {id === "center"
                  ? language === "es"
                    ? "Centro"
                    : "Center"
                  : id === "top"
                    ? language === "es"
                      ? "Arriba"
                      : "Top"
                    : id === "bottom"
                      ? language === "es"
                        ? "Abajo"
                        : "Bottom"
                      : id === "left"
                        ? language === "es"
                          ? "Izquierda"
                          : "Left"
                        : language === "es"
                          ? "Derecha"
                          : "Right"}
              </button>
            ))}
          </div>
          {isLogo ? (
            <>
              <FieldLabel htmlFor="exp-logo-width" helpId="media-logo-width">
                {labText(labControls["media-logo-width"].help.label, language)}
              </FieldLabel>
              <select
                id="exp-logo-width"
                className={selectClass}
                value={
                  widthSelectOptions.some((item) => item.id === slot.sizePreset)
                    ? slot.sizePreset
                    : "wide"
                }
                onChange={(event) =>
                  patchSlot({
                    sizePreset: event.target.value as MediaSizePreset,
                  })
                }
              >
                {widthSelectOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {wordOrLabel(w, item.id, item.label)}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <FieldLabel htmlFor="exp-size" helpId="media-size">
                {labText(labControls["media-size"].help.label, language)}
              </FieldLabel>
              <select
                id="exp-size"
                className={selectClass}
                value={sizeValue}
                onChange={(event) =>
                  patchSlot({ sizePreset: event.target.value as MediaSizePreset })
                }
              >
                {sizeOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {wordOrLabel(w, item.id, item.label)}
                  </option>
                ))}
              </select>
            </>
          )}
          <FieldLabel htmlFor="exp-padding" helpId="media-padding">
            {isLogo
              ? language === "es"
                ? "Relleno de logo"
                : "Logo padding"
              : labText(labControls["media-padding"].help.label, language)}
          </FieldLabel>
          <select
            id="exp-padding"
            className={selectClass}
            value={slot.padding}
            onChange={(event) =>
              patchSlot({ padding: event.target.value as MediaPaddingPreset })
            }
          >
            {mediaPaddingPresets.map((item) => (
              <option key={item.id} value={item.id}>
                {wordOrLabel(w, item.id, item.label)}
              </option>
            ))}
          </select>
          {isLogo ? (
            <>
              <FieldLabel htmlFor="exp-align" helpId="media-align">
                {labText(labControls["media-align"].help.label, language)}
              </FieldLabel>
              <select
                id="exp-align"
                className={selectClass}
                value={slot.alignment}
                onChange={(event) =>
                  patchSlot({
                    alignment: event.target.value as MediaAlignment,
                    positionX: event.target.value === "center" ? 50 : 0,
                  })
                }
              >
                <option value="left">{w("left")}</option>
                <option value="center">{w("center")}</option>
              </select>
            </>
          ) : null}
          <FieldLabel htmlFor="exp-preview-bg" helpId="media-preview-bg">
            {labText(labControls["media-preview-bg"].help.label, language)}
          </FieldLabel>
          <select
            id="exp-preview-bg"
            className={selectClass}
            value={slot.previewBackground}
            onChange={(event) =>
              patchSlot({
                previewBackground: event.target.value as PreviewBackgroundId,
              })
            }
          >
            {previewBackgrounds.map((item) => (
              <option key={item.id} value={item.id}>
                {wordOrLabel(w, item.id, item.label)}
              </option>
            ))}
          </select>
            </>
          )}
        </>
      ) : (
        <p className="text-xs leading-relaxed text-zinc-500">
          {w("noComposer")}
        </p>
      )}
      {perItemPosition || mediaStylesForTarget(selectedTarget).length === 0 ? null : (
        <>
          <FieldLabel htmlFor="exp-media-style" helpId="media-style">
            {isLogo
              ? language === "es"
                ? "Estilo de contenedor"
                : "Container style"
              : labText(labControls["media-style"].help.label, language)}
          </FieldLabel>
          <select
            id="exp-media-style"
            className={selectClass}
            value={mediaStyleValue}
            onChange={(event) => {
              const mediaStyle = event.target.value as MediaContainerStyleId;
              onChange(
                updateComponentConfig(experience, selectedTarget, {
                  mediaStyle,
                  containerPreset: mediaStyleToContainer[mediaStyle],
                }),
              );
            }}
          >
            {mediaStylesForTarget(selectedTarget).map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </>
      )}
      {composerEnabled && !isLogo && !perItemPosition ? (
        <details
          id="lab-media-advanced"
          className="rounded-md border border-zinc-800 bg-zinc-950/60 px-3 py-2"
        >
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            {language === "es" ? "Avanzado" : "Advanced"}
          </summary>
          <div className="mt-3 flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-200/90">
            {language === "es"
              ? "Configuración global de imágenes"
              : "Global media setting"}
          </p>
          <GlobalMediaScopeNote />
          <p className="text-[0.7rem] leading-relaxed text-zinc-500">
            {language === "es"
              ? "Alcance: Global. Compatible: héroe, doctor, about, tarjetas, tratamientos, tecnología y contacto. Incompatible: logo, marquee y CTA. Resultado visual: cambia todas las fotos compatibles. Persistencia: Aplicar Custom como versión actual."
              : "Scope: Global. Compatible: hero, doctor, about, cards, treatments, technology, contact. Incompatible: logo, marquee, CTA. Visual result: changes all compatible photos. Persistence: Apply Custom as Current."}
          </p>
          <FieldLabel htmlFor="exp-aspect" helpId="media-aspect">
            {labText(labControls["media-aspect"].help.label, language)}
          </FieldLabel>
          <select
            id="exp-aspect"
            className={selectClass}
            value={media.aspectRatio}
            onChange={(event) =>
              updateMedia("aspectRatio", event.target.value as AspectRatioPreset)
            }
          >
            <option value="auto">{w("auto")}</option>
            <option value="1 / 1">1:1</option>
            <option value="4 / 3">4:3</option>
            <option value="3 / 4">3:4</option>
            <option value="16 / 9">16:9</option>
          </select>
          <label
            className="flex items-center justify-between text-sm text-zinc-200"
            htmlFor="exp-radius"
          >
            <span>{labText(labControls["media-radius"].help.label, language)}</span>
            <span className="font-mono text-xs text-zinc-400">
              {media.radius}
            </span>
          </label>
          <input
            id="exp-radius"
            type="range"
            min={0}
            max={24}
            value={media.radius}
            onChange={(event) =>
              updateMedia("radius", Number(event.target.value))
            }
          />
          <LabControlHelp id="media-radius" />
          <FieldLabel htmlFor="exp-overlay" helpId="media-overlay">
            {labText(labControls["media-overlay"].help.label, language)}
          </FieldLabel>
          <select
            id="exp-overlay"
            className={selectClass}
            value={media.overlay}
            onChange={(event) =>
              updateMedia("overlay", event.target.value as OverlayPreset)
            }
          >
            <option value="none">{w("none")}</option>
            <option value="light">{w("light")}</option>
            <option value="dark">{w("dark")}</option>
            <option value="brand">{w("brandTint")}</option>
          </select>
          </div>
        </details>
      ) : null}
    </div>
  );
}

export function ThemeLabContainersPanel({
  experience,
  selectedTarget,
  onChange,
}: ThemeLabExperienceProps) {
  const w = useWord();
  const language = useLabLanguage();
  const slot = getComponentConfig(experience, selectedTarget);
  const isLogo = selectedTarget === "header-logo";
  const availablePresets = isLogo
    ? []
    : containerPresetsForTarget(selectedTarget);
  const current = labVisibleContainerPreset(slot.containerPreset, selectedTarget);
  const currentListed = availablePresets.some((preset) => preset.id === current);
  const showActionNote =
    !isLogo &&
    availablePresets.length > 0 &&
    !isActionCompatibleTarget(selectedTarget);
  const showCarouselNote =
    !isLogo &&
    availablePresets.length > 0 &&
    !isCarouselChromeTarget(selectedTarget);
  const showVideoNote =
    !isLogo &&
    availablePresets.length > 0 &&
    !isVideoChromeTarget(selectedTarget);
  return (
    <fieldset className="min-w-0">
      <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
        {labText(labControls["container-preset"].help.label, language)}
      </legend>
      <LabControlHelp id="container-preset" />
      <p className="mt-2 text-xs leading-relaxed text-zinc-500">
        {availablePresets.length === 0
          ? isSurfaceIntensityTarget(selectedTarget)
            ? language === "es"
              ? "Este destino no tiene preajustes de contenedor. La claridad del fondo aplica a esta familia de tarjetas."
              : "This target has no container presets. Surface lightness applies to this card family."
            : w("noContainer")
          : language === "es"
            ? "Aplica solo al componente seleccionado. Los colores de tema siguen siendo globales. Cambiar preajustes no guarda hasta Aplicar."
            : "Applies to the selected media or card only. Theme colors stay global. Cycling presets is unsaved until Apply."}
      </p>
      {availablePresets.some(
        (preset) =>
          preset.id === "carousel-card" ||
          preset.id === "media-card-modern" ||
          preset.id === "video-card" ||
          preset.id === "media-overlay",
      ) ? (
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          {w("chromeOnly")}
        </p>
      ) : null}
      {current === "inset-badge-cutout" ? (
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          {w("cutoutNote")}
        </p>
      ) : null}
      {showActionNote ? (
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          {w("unavailableActions")}
        </p>
      ) : null}
      {showCarouselNote ? (
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          {w("unavailableCarousel")}
        </p>
      ) : null}
      {showVideoNote ? (
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          {w("unavailableVideo")}
        </p>
      ) : null}
      {!isLogo && !currentListed && availablePresets.length > 0 ? (
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          {language === "es"
            ? "El preajuste guardado no se ofrece para este destino. Elija un contenedor de la lista. Acción, carrusel y video solo aparecen donde tienen sentido."
            : "The saved preset is not offered for this target. Choose a listed container. Action, carousel, and video chrome appear only where they are meaningful."}
        </p>
      ) : null}
      <div className="mt-3 grid grid-cols-1 gap-2">
        {availablePresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() =>
                  onChange(
                    updateComponentConfig(experience, selectedTarget, {
                      containerPreset: preset.id,
                      mediaStyle: containerToMediaStyle[preset.id],
                    }),
                  )
                }
                className={`min-h-11 rounded-md border px-3 text-left text-sm ${
                  current === preset.id
                    ? "border-cyan-400 bg-cyan-400/10 text-white"
                    : "border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-zinc-500"
                }`}
              >
                {preset.number}{" "}
                {language === "es" && preset.labelEs
                  ? preset.labelEs
                  : preset.label}
              </button>
            ))}
      </div>
      {current === "inset-badge-cutout" ? (
        <div className="mt-3">
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor="exp-c05-circle-size"
              className="text-sm text-zinc-200"
            >
              {controlLabel("container-circle-size", language)}
            </label>
            <span className="flex items-center gap-1">
              <input
                id="exp-c05-circle-size-number"
                type="number"
                min={INSET_BADGE_SIZE_MIN}
                max={INSET_BADGE_SIZE_MAX}
                step={1}
                value={insetBadgeSizePx(slot)}
                onChange={(event) =>
                  onChange(
                    updateComponentConfig(experience, selectedTarget, {
                      insetBadgeSize: insetBadgeSizePx({
                        ...slot,
                        insetBadgeSize: Number(event.target.value),
                      }),
                    }),
                  )
                }
                className="h-9 w-16 rounded-md border border-zinc-700 bg-zinc-900 px-2 text-right font-mono text-sm text-zinc-100"
              />
              <span className="text-xs text-zinc-400">px</span>
            </span>
          </div>
          <input
            id="exp-c05-circle-size"
            type="range"
            min={INSET_BADGE_SIZE_MIN}
            max={INSET_BADGE_SIZE_MAX}
            step={1}
            value={insetBadgeSizePx(slot)}
            onChange={(event) =>
              onChange(
                updateComponentConfig(experience, selectedTarget, {
                  insetBadgeSize: Number(event.target.value),
                }),
              )
            }
            className="mt-2 w-full"
          />
          <LabControlHelp id="container-circle-size" />
        </div>
      ) : null}
      {isSurfaceIntensityControlVisible(selectedTarget, current) ? (
        <div className="mt-3">
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor="exp-surface-intensity"
              className="text-sm text-zinc-200"
            >
              {controlLabel("container-surface-intensity", language)}
            </label>
            <span className="font-mono text-sm text-zinc-400">
              {(() => {
                const pct = Math.round(
                  getContainerSurfaceIntensity(experience, selectedTarget) *
                    100,
                );
                return `${pct > 0 ? "+" : ""}${pct}%`;
              })()}
            </span>
          </div>
          <input
            id="exp-surface-intensity"
            type="range"
            min={SURFACE_LIGHTNESS_MIN * 100}
            max={SURFACE_LIGHTNESS_MAX * 100}
            step={1}
            value={Math.round(
              getContainerSurfaceIntensity(experience, selectedTarget) * 100,
            )}
            onChange={(event) =>
              onChange(
                updateContainerSurfaceIntensity(
                  experience,
                  selectedTarget,
                  Number(event.target.value) / 100,
                ),
              )
            }
            className="mt-2 w-full"
          />
          <LabControlHelp id="container-surface-intensity" />
        </div>
      ) : null}
      {(() => {
        const guide = currentListed
          ? containerGuides.find((item) => item.id === current)
          : undefined;
        if (!guide || isLogo) return null;
        return (
          <div className="mt-3 space-y-1 rounded-md border border-zinc-800 px-3 py-2 text-[0.7rem] leading-relaxed text-zinc-500">
            <p>{labText(guide.purpose, language)}</p>
            <p>{labText(guide.shape, language)}</p>
            <p>{labText(guide.compatible, language)}</p>
            <p>{labText(guide.incompatible, language)}</p>
            <p>{labText(guide.badge, language)}</p>
            <p>{labText(guide.clip, language)}</p>
            <p>{labText(guide.radius, language)}</p>
            <p>{labText(guide.globalRadius, language)}</p>
            <p>{labText(guide.overlay, language)}</p>
            <p>{labText(guide.externalSpace, language)}</p>
            <p>{labText(guide.motion, language)}</p>
            <p>{labText(guide.effects, language)}</p>
          </div>
        );
      })()}
    </fieldset>
  );
}

export function ThemeLabMotionPanel({
  experience,
  onChange,
}: Omit<ThemeLabExperienceProps, "selectedTarget">) {
  const w = useWord();
  const language = useLabLanguage();
  const motion = experience.motion;

  function update<K extends keyof ExperienceValues["motion"]>(
    key: K,
    value: ExperienceValues["motion"][K],
  ) {
    onChange({ ...experience, motion: { ...motion, [key]: value } });
  }

  return (
    <div className="flex flex-col gap-4">
      <FieldLabel htmlFor="exp-entrance" helpId="motion-entrance">
        {controlLabel("motion-entrance", language)}
      </FieldLabel>
      <select
        id="exp-entrance"
        className={selectClass}
        value={motion.entrance}
        onChange={(event) =>
          update("entrance", event.target.value as MotionEntrance)
        }
      >
        <option value="none">{w("none")}</option>
        <option value="fade">{w("fade")}</option>
        <option value="fade-up">{w("fadeUp")}</option>
        <option value="fade-down">{w("fadeDown")}</option>
        <option value="slide-left">{w("slideLeft")}</option>
        <option value="slide-right">{w("slideRight")}</option>
        <option value="scale-in">{w("scaleIn")}</option>
        <option value="reveal">{w("reveal")}</option>
      </select>
      <FieldLabel htmlFor="exp-duration" helpId="motion-duration">
        {controlLabel("motion-duration", language)}
      </FieldLabel>
      <select
        id="exp-duration"
        className={selectClass}
        value={motion.duration}
        onChange={(event) =>
          update("duration", event.target.value as MotionDuration)
        }
      >
        <option value="fast">{w("fast")}</option>
        <option value="medium">{w("medium")}</option>
        <option value="slow">{w("slow")}</option>
      </select>
      <FieldLabel htmlFor="exp-intensity" helpId="motion-intensity">
        {controlLabel("motion-intensity", language)}
      </FieldLabel>
      <select
        id="exp-intensity"
        className={selectClass}
        value={motion.intensity}
        onChange={(event) =>
          update("intensity", event.target.value as MotionIntensity)
        }
      >
        <option value="subtle">{w("subtle")}</option>
        <option value="normal">{w("normal")}</option>
      </select>
      <FieldLabel htmlFor="exp-delay" helpId="motion-delay">
        {controlLabel("motion-delay", language)}
      </FieldLabel>
      <select
        id="exp-delay"
        className={selectClass}
        value={motion.delay}
        onChange={(event) => update("delay", event.target.value as MotionDelay)}
      >
        <option value="0">{w("delay0")}</option>
        <option value="short">{w("short")}</option>
        <option value="medium">{w("medium")}</option>
      </select>
    </div>
  );
}

export function ThemeLabEffectsPanel({
  experience,
  selectedTarget,
  itemKey,
  onChange,
  variant = "editor",
}: ThemeLabExperienceProps & { variant?: "editor" | "system" }) {
  const w = useWord();
  const language = useLabLanguage();
  const base = labControlScope(selectedTarget);
  const scope =
    variant === "system"
      ? {
          ...base,
          marquee: false,
          badges: true,
          cornerAction: true,
          carousel: true,
          video: true,
          beforeAfter: true,
          cursor: true,
        }
      : {
          ...base,
          badges: false,
          cornerAction: false,
          carousel: false,
          video: false,
          beforeAfter: false,
          cursor: false,
        };
  const showCursor = variant === "system";
  const showEditorialIcons = Boolean(
    variant === "editor" && base.editorialIcons && itemKey,
  );
  const showElementEffects = true;
  return (
    <div className="flex flex-col gap-5">
      {showCursor ? (
      <fieldset className="min-w-0">
        <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
          {language === "es" ? "Compañero de cursor" : "Cursor companion"}
        </legend>
        <div className="mt-3 flex flex-col gap-3">
          <GlobalCursorScopeNote />
          {variant === "system" ? (
            <p className="rounded-md border border-amber-500/30 bg-amber-400/10 px-3 py-2 text-[0.7rem] leading-relaxed text-amber-100/90">
              {language === "es"
                ? "Badges, video, carrusel y acciones de esquina son Experience globales. No pertenecen al elemento seleccionado en Editor."
                : "Badges, video, carousel, and corner actions are global Experience settings. They do not belong to the selected Editor element."}
            </p>
          ) : null}
          <FieldLabel htmlFor="exp-cursor" helpId="cursor">
            {controlLabel("cursor", language)}
          </FieldLabel>
          <select
            id="exp-cursor"
            className={selectClass}
            value={experience.cursorCompanion}
            onChange={(event) =>
              onChange({
                ...experience,
                cursorCompanion: event.target.value as CursorCompanionMode,
              })
            }
          >
            <option value="off">{w("off")}</option>
            <option value="subtle">{w("subtle")}</option>
          </select>
        </div>
      </fieldset>
      ) : null}
      {showEditorialIcons && itemKey ? (
        <ThemeLabEditorialIconPanel
          experience={experience}
          itemKey={itemKey}
          itemLabel={itemKey}
          openSignal={0}
          onChange={onChange}
        />
      ) : null}
      {showElementEffects ? (
      <>
      {scope.marquee ? (
      <fieldset className="min-w-0">
        <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
          {language === "es" ? "Marquee de servicios" : "Service marquee"}
        </legend>
        <div className="mt-3 flex flex-col gap-3">
          <label className="flex min-h-11 items-center gap-2 text-sm text-zinc-200">
            <input
              type="checkbox"
              checked={experience.marquee.enabled}
              onChange={(event) =>
                onChange({
                  ...experience,
                  marquee: { ...experience.marquee, enabled: event.target.checked },
                })
              }
            />
            {w("enabled")}
          </label>
          <LabControlHelp id="marquee-enabled" />
          {!experience.marquee.enabled ? (
            <LabUnavailableNote message={unavailableNotes.marqueeDisabled} />
          ) : null}
          <div
            className={
              experience.marquee.enabled ? undefined : "pointer-events-none opacity-50"
            }
          >
          <FieldLabel htmlFor="exp-marquee-layout" helpId="marquee-layout">
            {controlLabel("marquee-layout", language)}
          </FieldLabel>
          <select
            id="exp-marquee-layout"
            className={selectClass}
            value={experience.marquee.layout}
            onChange={(event) =>
              onChange({
                ...experience,
                marquee: {
                  ...experience.marquee,
                  layout: event.target.value as MarqueeLayout,
                },
              })
            }
          >
            <option value="text">{w("textOnly")}</option>
            <option value="icon-text">{w("iconText")}</option>
          </select>
          <FieldLabel htmlFor="exp-marquee-spacing" helpId="marquee-spacing">
            {controlLabel("marquee-spacing", language)}
          </FieldLabel>
          <select
            id="exp-marquee-spacing"
            className={selectClass}
            value={experience.marquee.spacing}
            onChange={(event) =>
              onChange({
                ...experience,
                marquee: {
                  ...experience.marquee,
                  spacing: event.target.value as MarqueeSpacing,
                },
              })
            }
          >
            <option value="compact">{w("compact")}</option>
            <option value="comfortable">{w("comfortable")}</option>
            <option value="wide">{w("wide")}</option>
          </select>
          <FieldLabel htmlFor="exp-marquee-height" helpId="marquee-height">
            {controlLabel("marquee-height", language)}
          </FieldLabel>
          <select
            id="exp-marquee-height"
            className={selectClass}
            value={experience.marquee.height}
            onChange={(event) =>
              onChange({
                ...experience,
                marquee: {
                  ...experience.marquee,
                  height: event.target.value as MarqueeHeight,
                },
              })
            }
          >
            <option value="compact">{w("compact")}</option>
            <option value="standard">{w("standard")}</option>
            <option value="large">{w("large")}</option>
          </select>
          <FieldLabel htmlFor="exp-marquee-speed" helpId="marquee-speed">
            {controlLabel("marquee-speed", language)}
          </FieldLabel>
          <select
            id="exp-marquee-speed"
            className={selectClass}
            value={experience.marquee.speed}
            onChange={(event) =>
              onChange({
                ...experience,
                marquee: {
                  ...experience.marquee,
                  speed: event.target.value as MarqueeSpeed,
                },
              })
            }
          >
            <option value="slow">{w("slow")}</option>
            <option value="medium">{w("medium")}</option>
          </select>
          <FieldLabel htmlFor="exp-marquee-dir" helpId="marquee-dir">
            {controlLabel("marquee-dir", language)}
          </FieldLabel>
          <select
            id="exp-marquee-dir"
            className={selectClass}
            value={experience.marquee.direction}
            onChange={(event) =>
              onChange({
                ...experience,
                marquee: {
                  ...experience.marquee,
                  direction: event.target.value as MarqueeDirection,
                },
              })
            }
          >
            <option value="left">{w("left")}</option>
            <option value="right">{w("right")}</option>
          </select>
          <label className="flex min-h-11 items-center gap-2 text-sm text-zinc-200">
            <input
              type="checkbox"
              checked={experience.marquee.pauseOnHover}
              onChange={(event) =>
                onChange({
                  ...experience,
                  marquee: {
                    ...experience.marquee,
                    pauseOnHover: event.target.checked,
                  },
                })
              }
            />
            {w("pauseHover")}
          </label>
          <LabControlHelp id="marquee-pause" />
          <FieldLabel htmlFor="exp-marquee-surface" helpId="marquee-surface">
            {controlLabel("marquee-surface", language)}
          </FieldLabel>
          <select
            id="exp-marquee-surface"
            className={selectClass}
            value={experience.marquee.surface}
            onChange={(event) =>
              onChange({
                ...experience,
                marquee: {
                  ...experience.marquee,
                  surface: event.target.value as MarqueeSurface,
                },
              })
            }
          >
            <option value="primary">{w("primary")}</option>
            <option value="secondary">{w("secondary")}</option>
            <option value="accent">{w("accent")}</option>
            <option value="dark">{w("dark")}</option>
          </select>
          </div>
        </div>
      </fieldset>
      ) : null}

      {scope.video ? (
      <fieldset className="min-w-0">
        <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
          {language === "es" ? "Vista previa de video" : "Video preview"}
        </legend>
        <div className="mt-3 flex flex-col gap-3">
          <label className="flex min-h-11 items-center gap-2 text-sm text-zinc-200">
            <input
              type="checkbox"
              checked={experience.video.enabled}
              onChange={(event) =>
                onChange({
                  ...experience,
                  video: { ...experience.video, enabled: event.target.checked },
                })
              }
            />
            {w("enabled")}
          </label>
          <LabControlHelp id="video-enabled" />
          {!experience.video.enabled ? (
            <LabUnavailableNote message={unavailableNotes.videoDisabled} />
          ) : null}
          <div
            className={
              experience.video.enabled ? undefined : "pointer-events-none opacity-50"
            }
          >
          <FieldLabel htmlFor="exp-video-mode" helpId="video-mode">
            {controlLabel("video-mode", language)}
          </FieldLabel>
          <select
            id="exp-video-mode"
            className={selectClass}
            value={experience.video.mode}
            onChange={(event) =>
              onChange({
                ...experience,
                video: { ...experience.video, mode: event.target.value as VideoMode },
              })
            }
          >
            <option value="modal">{w("modal")}</option>
            <option value="external">{w("external")}</option>
            <option value="embed">{w("embed")}</option>
          </select>
          <FieldLabel htmlFor="exp-video-poster" helpId="video-poster">
            {controlLabel("video-poster", language)}
          </FieldLabel>
          <select
            id="exp-video-poster"
            className={selectClass}
            value={experience.video.poster}
            onChange={(event) =>
              onChange({
                ...experience,
                video: {
                  ...experience.video,
                  poster: event.target.value as MediaSourceMode,
                },
              })
            }
          >
            <option value="approved">{w("approved")}</option>
            <option value="placeholder">{w("placeholder")}</option>
          </select>
          <FieldLabel htmlFor="exp-video-play" helpId="video-play">
            {controlLabel("video-play", language)}
          </FieldLabel>
          <select
            id="exp-video-play"
            className={selectClass}
            value={experience.video.playButton}
            onChange={(event) =>
              onChange({
                ...experience,
                video: {
                  ...experience.video,
                  playButton: event.target.value as PlayButtonStyle,
                },
              })
            }
          >
            <option value="solid">{w("solid")}</option>
            <option value="outline">{w("outline")}</option>
            <option value="minimal">{w("minimal")}</option>
          </select>
          <FieldLabel htmlFor="exp-video-overlay" helpId="video-overlay">
            {controlLabel("video-overlay", language)}
          </FieldLabel>
          <select
            id="exp-video-overlay"
            className={selectClass}
            value={experience.video.overlay}
            onChange={(event) =>
              onChange({
                ...experience,
                video: {
                  ...experience.video,
                  overlay: event.target.value as OverlayPreset,
                },
              })
            }
          >
            <option value="none">{w("none")}</option>
            <option value="light">{w("light")}</option>
            <option value="dark">{w("dark")}</option>
            <option value="brand">{w("brandTint")}</option>
          </select>
          <FieldLabel htmlFor="exp-video-container" helpId="video-container">
            {controlLabel("video-container", language)}
          </FieldLabel>
          <select
            id="exp-video-container"
            className={selectClass}
            value={experience.video.container}
            onChange={(event) =>
              onChange({
                ...experience,
                video: {
                  ...experience.video,
                  container: event.target.value as ContainerPresetId,
                },
              })
            }
          >
            <option value="video-card">{w("videoCard")}</option>
            <option value="media-overlay">{w("mediaOverlay")}</option>
            <option value="clean">{w("clean")}</option>
          </select>
          <FieldLabel htmlFor="exp-video-corner" helpId="video-corner">
            {controlLabel("video-corner", language)}
          </FieldLabel>
          <select
            id="exp-video-corner"
            className={selectClass}
            value={experience.video.cornerAction}
            onChange={(event) =>
              onChange({
                ...experience,
                video: {
                  ...experience.video,
                  cornerAction: event.target.value as VideoCornerAction,
                },
              })
            }
          >
            <option value="none">{w("none")}</option>
            <option value="info">{w("info")}</option>
            <option value="play">{w("play")}</option>
          </select>
          <FieldLabel htmlFor="exp-video-aspect" helpId="video-aspect">
            {controlLabel("video-aspect", language)}
          </FieldLabel>
          <select
            id="exp-video-aspect"
            className={selectClass}
            value={experience.video.aspectRatio}
            onChange={(event) =>
              onChange({
                ...experience,
                video: {
                  ...experience.video,
                  aspectRatio: event.target.value as AspectRatioPreset,
                },
              })
            }
          >
            <option value="16 / 9">16:9</option>
            <option value="4 / 3">4:3</option>
            <option value="1 / 1">1:1</option>
          </select>
          </div>
        </div>
      </fieldset>
      ) : null}

      {scope.carouselMotion ? (
      <fieldset className="min-w-0">
        <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
          {language === "es" ? "Movimiento del carrusel" : "Carousel Motion"}
        </legend>
        <div className="mt-3 flex flex-col gap-3">
          <label
            className="flex items-center justify-between text-sm text-zinc-200"
            htmlFor="exp-carousel-transition"
          >
            <span>
              {controlLabel("carousel-transition", language)}
              <span className="mt-0.5 block text-[0.7rem] font-normal text-zinc-400">
                {language === "es"
                  ? "Duración de la transición"
                  : "Transition duration"}
              </span>
            </span>
            <span className="font-mono text-xs text-zinc-400">
              {clampCarouselTransitionDuration(
                experience.carousel.transitionDuration,
              )}{" "}
              ms
            </span>
          </label>
          <input
            id="exp-carousel-transition"
            type="range"
            min={CAROUSEL_TRANSITION_DURATION_MIN}
            max={CAROUSEL_TRANSITION_DURATION_MAX}
            step={CAROUSEL_TRANSITION_DURATION_STEP}
            value={clampCarouselTransitionDuration(
              experience.carousel.transitionDuration ??
                CAROUSEL_TRANSITION_DURATION_DEFAULT,
            )}
            onChange={(event) =>
              onChange({
                ...experience,
                carousel: {
                  ...experience.carousel,
                  transitionDuration: Number(event.target.value),
                },
              })
            }
          />
          <p className="text-[0.7rem] leading-relaxed text-zinc-500">
            {language === "es"
              ? "Menor = más rápido · Mayor = más lento"
              : "Lower = faster · Higher = slower"}
          </p>
          <LabControlHelp id="carousel-transition" compact />
        </div>
      </fieldset>
      ) : null}

      {scope.carousel ? (
      <fieldset className="min-w-0">
        <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
          {language === "es" ? "Carrusel" : "Carousel"}
        </legend>
        <div className="mt-3 flex flex-col gap-3">
          <label className="flex min-h-11 items-center gap-2 text-sm text-zinc-200">
            <input
              type="checkbox"
              checked={experience.carousel.enabled}
              onChange={(event) =>
                onChange({
                  ...experience,
                  carousel: {
                    ...experience.carousel,
                    enabled: event.target.checked,
                  },
                })
              }
            />
            {w("enabled")}
          </label>
          <LabControlHelp id="carousel-enabled" />
          {!experience.carousel.enabled ? (
            <LabUnavailableNote message={unavailableNotes.carouselDisabled} />
          ) : null}
          <div
            className={
              experience.carousel.enabled
                ? undefined
                : "pointer-events-none opacity-50"
            }
          >
          <FieldLabel htmlFor="exp-carousel-view" helpId="carousel-view">
            {controlLabel("carousel-view", language)}
          </FieldLabel>
          <select
            id="exp-carousel-view"
            className={selectClass}
            value={String(experience.carousel.cardsPerView)}
            onChange={(event) =>
              onChange({
                ...experience,
                carousel: {
                  ...experience.carousel,
                  cardsPerView: Number(event.target.value) as CarouselCardsPerView,
                },
              })
            }
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <FieldLabel htmlFor="exp-carousel-nav" helpId="carousel-nav">
            {controlLabel("carousel-nav", language)}
          </FieldLabel>
          <select
            id="exp-carousel-nav"
            className={selectClass}
            value={experience.carousel.navigation}
            onChange={(event) =>
              onChange({
                ...experience,
                carousel: {
                  ...experience.carousel,
                  navigation: event.target.value as CarouselNavigation,
                },
              })
            }
          >
            <option value="dots">{w("dots")}</option>
            <option value="arrows">{w("arrows")}</option>
            <option value="both">{w("both")}</option>
          </select>
          <FieldLabel htmlFor="exp-carousel-auto" helpId="carousel-auto">
            {controlLabel("carousel-auto", language)}
          </FieldLabel>
          <select
            id="exp-carousel-auto"
            className={selectClass}
            value={experience.carousel.autoplay}
            onChange={(event) =>
              onChange({
                ...experience,
                carousel: {
                  ...experience.carousel,
                  autoplay: event.target.value as CarouselAutoplay,
                },
              })
            }
          >
            <option value="off">{w("off")}</option>
            <option value="slow">{w("slow")}</option>
          </select>
          </div>
        </div>
      </fieldset>
      ) : null}

      {scope.badges ? (
      <fieldset className="min-w-0">
        <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
          {language === "es" ? "Insignia rotatoria" : "Rotating badge"}
        </legend>
        <div className="mt-3 flex flex-col gap-3">
          <FieldLabel htmlFor="exp-rotating-text" helpId="rotating-text">
            {controlLabel("rotating-text", language)}
          </FieldLabel>
          <input
            id="exp-rotating-text"
            className={selectClass}
            value={experience.rotatingBadge.text}
            maxLength={48}
            onChange={(event) =>
              onChange({
                ...experience,
                rotatingBadge: {
                  ...experience.rotatingBadge,
                  text: event.target.value,
                },
              })
            }
          />
          <FieldLabel htmlFor="exp-rotating-icon" helpId="rotating-icon">
            {controlLabel("rotating-icon", language)}
          </FieldLabel>
          <select
            id="exp-rotating-icon"
            className={selectClass}
            value={experience.rotatingBadge.icon}
            onChange={(event) =>
              onChange({
                ...experience,
                rotatingBadge: {
                  ...experience.rotatingBadge,
                  icon: event.target.value as BadgeIconId,
                },
              })
            }
          >
            <option value="tooth">{w("tooth")}</option>
            <option value="sparkle">{w("sparkle")}</option>
            <option value="plus">{w("plus")}</option>
          </select>
          <FieldLabel htmlFor="exp-rotating-size" helpId="rotating-size">
            {controlLabel("rotating-size", language)}
          </FieldLabel>
          <select
            id="exp-rotating-size"
            className={selectClass}
            value={experience.rotatingBadge.diameter}
            onChange={(event) =>
              onChange({
                ...experience,
                rotatingBadge: {
                  ...experience.rotatingBadge,
                  diameter: event.target.value as BadgeDiameter,
                },
              })
            }
          >
            <option value="small">{w("small")}</option>
            <option value="medium">{w("medium")}</option>
            <option value="large">{w("large")}</option>
          </select>
          <FieldLabel htmlFor="exp-rotating-speed" helpId="rotating-speed">
            {controlLabel("rotating-speed", language)}
          </FieldLabel>
          <select
            id="exp-rotating-speed"
            className={selectClass}
            value={experience.rotatingBadge.speed}
            onChange={(event) =>
              onChange({
                ...experience,
                rotatingBadge: {
                  ...experience.rotatingBadge,
                  speed: event.target.value as BadgeRotationSpeed,
                },
              })
            }
          >
            <option value="slow">{w("slow")}</option>
            <option value="very-slow">{w("verySlow")}</option>
          </select>
          <FieldLabel htmlFor="exp-rotating-dir" helpId="rotating-dir">
            {controlLabel("rotating-dir", language)}
          </FieldLabel>
          <select
            id="exp-rotating-dir"
            className={selectClass}
            value={experience.rotatingBadge.direction}
            onChange={(event) =>
              onChange({
                ...experience,
                rotatingBadge: {
                  ...experience.rotatingBadge,
                  direction: event.target.value as MarqueeDirection,
                },
              })
            }
          >
            <option value="left">{w("left")}</option>
            <option value="right">{w("right")}</option>
          </select>
          <FieldLabel htmlFor="exp-rotating-surface" helpId="rotating-surface">
            {controlLabel("rotating-surface", language)}
          </FieldLabel>
          <select
            id="exp-rotating-surface"
            className={selectClass}
            value={experience.rotatingBadge.surface}
            onChange={(event) =>
              onChange({
                ...experience,
                rotatingBadge: {
                  ...experience.rotatingBadge,
                  surface: event.target.value as MarqueeSurface,
                },
              })
            }
          >
            <option value="primary">{w("primary")}</option>
            <option value="secondary">{w("secondary")}</option>
            <option value="accent">{w("accent")}</option>
            <option value="dark">{w("dark")}</option>
          </select>
          <FieldLabel htmlFor="exp-rotating-color" helpId="rotating-color">
            {controlLabel("rotating-color", language)}
          </FieldLabel>
          <select
            id="exp-rotating-color"
            className={selectClass}
            value={experience.rotatingBadge.textColor}
            onChange={(event) =>
              onChange({
                ...experience,
                rotatingBadge: {
                  ...experience.rotatingBadge,
                  textColor: event.target.value as BadgeTextColor,
                },
              })
            }
          >
            <option value="inverse">{w("inverse")}</option>
            <option value="accent">{w("accent")}</option>
            <option value="muted">{w("muted")}</option>
          </select>
          <FieldLabel htmlFor="exp-rotating-pos" helpId="rotating-pos">
            {controlLabel("rotating-pos", language)}
          </FieldLabel>
          <select
            id="exp-rotating-pos"
            className={selectClass}
            value={experience.rotatingBadge.position}
            onChange={(event) =>
              onChange({
                ...experience,
                rotatingBadge: {
                  ...experience.rotatingBadge,
                  position: event.target.value as BadgePosition,
                },
              })
            }
          >
            <option value="bottom-left">{w("bottomLeft")}</option>
            <option value="bottom-right">{w("bottomRight")}</option>
          </select>
        </div>
      </fieldset>
      ) : null}

      {scope.cornerAction ? (
      <fieldset className="min-w-0">
        <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
          {language === "es" ? "Acción de esquina" : "Corner action"}
        </legend>
        <div className="mt-3 flex flex-col gap-3">
          <label className="flex min-h-11 items-center gap-2 text-sm text-zinc-200">
            <input
              type="checkbox"
              checked={experience.cornerAction.enabled}
              onChange={(event) =>
                onChange({
                  ...experience,
                  cornerAction: {
                    ...experience.cornerAction,
                    enabled: event.target.checked,
                  },
                })
              }
            />
            {w("enabled")}
          </label>
          <LabControlHelp id="corner-enabled" />
          {!experience.cornerAction.enabled ? (
            <LabUnavailableNote message={unavailableNotes.cornerDisabled} />
          ) : null}
          <div
            className={
              experience.cornerAction.enabled
                ? undefined
                : "pointer-events-none opacity-50"
            }
          >
          <FieldLabel htmlFor="exp-corner-pos" helpId="corner-pos">
            {controlLabel("corner-pos", language)}
          </FieldLabel>
          <select
            id="exp-corner-pos"
            className={selectClass}
            value={experience.cornerAction.position}
            onChange={(event) =>
              onChange({
                ...experience,
                cornerAction: {
                  ...experience.cornerAction,
                  position: event.target.value as CornerActionPosition,
                },
              })
            }
          >
            <option value="top-right">{w("topRight")}</option>
            <option value="bottom-right">{w("bottomRight")}</option>
            <option value="bottom-left">{w("bottomLeft")}</option>
          </select>
          <FieldLabel htmlFor="exp-corner-glyph" helpId="corner-glyph">
            {controlLabel("corner-glyph", language)}
          </FieldLabel>
          <select
            id="exp-corner-glyph"
            className={selectClass}
            value={experience.cornerAction.glyph}
            onChange={(event) =>
              onChange({
                ...experience,
                cornerAction: {
                  ...experience.cornerAction,
                  glyph: event.target.value as CornerActionGlyph,
                },
              })
            }
          >
            <option value="info">{w("info")}</option>
            <option value="arrow">{w("arrow")}</option>
            <option value="play">{w("play")}</option>
            <option value="plus">{w("plus")}</option>
          </select>
          <FieldLabel htmlFor="exp-corner-morph" helpId="corner-morph">
            {controlLabel("corner-morph", language)}
          </FieldLabel>
          <select
            id="exp-corner-morph"
            className={selectClass}
            value={experience.cornerAction.morph}
            onChange={(event) =>
              onChange({
                ...experience,
                cornerAction: {
                  ...experience.cornerAction,
                  morph: event.target.value as CornerActionMorph,
                },
              })
            }
          >
            <option value="none">{w("none")}</option>
            <option value="info-arrow">{w("infoArrow")}</option>
            <option value="emphasize">{w("emphasize")}</option>
          </select>
          </div>
        </div>
      </fieldset>
      ) : null}

      {scope.badges ? (
      <fieldset className="min-w-0">
        <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
          {language === "es" ? "Insignia flotante" : "Floating badge"}
        </legend>
        <div className="mt-3 flex flex-col gap-3">
          <FieldLabel htmlFor="exp-badge-type" helpId="float-type">
            {controlLabel("float-type", language)}
          </FieldLabel>
          <select
            id="exp-badge-type"
            className={selectClass}
            value={experience.floatingBadge.type}
            onChange={(event) =>
              onChange({
                ...experience,
                floatingBadge: {
                  ...experience.floatingBadge,
                  type: event.target.value as BadgeType,
                },
              })
            }
          >
            <option value="static">{w("staticBadge")}</option>
            <option value="rotating">{w("rotatingBadge")}</option>
            <option value="action">{w("actionBadge")}</option>
          </select>
          <FieldLabel htmlFor="exp-badge-pos" helpId="float-pos">
            {controlLabel("float-pos", language)}
          </FieldLabel>
          <select
            id="exp-badge-pos"
            className={selectClass}
            value={experience.floatingBadge.position}
            onChange={(event) =>
              onChange({
                ...experience,
                floatingBadge: {
                  ...experience.floatingBadge,
                  position: event.target.value as BadgePosition,
                },
              })
            }
          >
            <option value="bottom-left">{w("bottomLeft")}</option>
            <option value="bottom-right">{w("bottomRight")}</option>
          </select>
          <label className="flex items-center justify-between text-sm text-zinc-200" htmlFor="exp-badge-overlap">
            <span>{controlLabel("float-overlap", language)}</span>
            <span className="font-mono text-xs text-zinc-400">
              {experience.floatingBadge.overlap.toFixed(2)}
            </span>
          </label>
          <input
            id="exp-badge-overlap"
            type="range"
            min={0.12}
            max={0.36}
            step={0.01}
            value={experience.floatingBadge.overlap}
            onChange={(event) =>
              onChange({
                ...experience,
                floatingBadge: {
                  ...experience.floatingBadge,
                  overlap: Number(event.target.value),
                },
              })
            }
          />
          <LabControlHelp id="float-overlap" />
        </div>
      </fieldset>
      ) : null}
      </>
      ) : null}
    </div>
  );
}

export function ThemeLabPositionPanel({
  experience,
  selectedTarget,
  itemKey,
  baseline,
  onChange,
}: ThemeLabExperienceProps & { baseline: ExperienceValues }) {
  const language = useLabLanguage();
  const perItemPosition = Boolean(
    itemKey && isPerItemMediaTarget(selectedTarget),
  );

  if (perItemPosition && itemKey) {
    const mediaItemKey = itemKey;
    const scaleRange = scaleRangeForTarget(selectedTarget);
    const live = resolveItemMedia(
      getComponentConfig(experience, selectedTarget),
      mediaItemKey,
    );
    const approved = resolveItemMedia(
      getComponentConfig(baseline, selectedTarget),
      mediaItemKey,
    );
    const scalePercent = Math.round(live.scale * 100);

    function patchMedia(patch: {
      scale?: number;
      positionX?: number;
      positionY?: number;
      panX?: number;
      panY?: number;
      allowFreeOverflow?: boolean;
    }) {
      onChange(updateItemMedia(experience, selectedTarget, mediaItemKey, patch));
    }

    function resetPosition() {
      patchMedia({
        scale: approved.scale,
        positionX: approved.positionX,
        positionY: approved.positionY,
      });
    }

    const pan = resolveMediaPan(live);
    const approvedPan = resolveMediaPan(approved);

    function resetPan() {
      patchMedia({
        panX: approvedPan.panX,
        panY: approvedPan.panY,
      });
    }

    function formatPan(value: number) {
      const rounded = Math.round(value);
      return rounded > 0 ? `+${rounded}` : String(rounded);
    }

    return (
      <div className="flex flex-col gap-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
          {language === "es" ? "Posición / recorte" : "Position / Crop"}
        </p>
        <div>
          <FieldLabel htmlFor="service-card-fit" helpId="media-fit">
            {controlLabel("media-fit", language)}
          </FieldLabel>
          <select
            id="service-card-fit"
            className={selectClass}
            value={live.fit}
            onChange={(event) =>
              onChange(
                updateComponentConfig(experience, selectedTarget, {
                  fit: event.target.value as MediaFit,
                }),
              )
            }
          >
            <option value="contain">
              {labWords[language].contain ?? "Contain"}
            </option>
            <option value="cover">
              {labWords[language].cover ?? "Cover"}
            </option>
          </select>
        </div>
        <div>
          <label
            className="flex items-center justify-between text-sm text-zinc-200"
            htmlFor="service-card-x"
          >
            <span>{controlLabel("media-position-x", language)}</span>
            <span className="font-mono text-xs text-zinc-400">
              {live.positionX}
            </span>
          </label>
          <input
            id="service-card-x"
            type="range"
            min={0}
            max={100}
            value={live.positionX}
            onChange={(event) =>
              patchMedia({ positionX: Number(event.target.value) })
            }
            className="mt-1.5 w-full"
          />
          <LabControlHelp id="media-position-x" />
        </div>
        <div>
          <label
            className="flex items-center justify-between text-sm text-zinc-200"
            htmlFor="service-card-y"
          >
            <span>{controlLabel("media-position-y", language)}</span>
            <span className="font-mono text-xs text-zinc-400">
              {live.positionY}
            </span>
          </label>
          <input
            id="service-card-y"
            type="range"
            min={0}
            max={100}
            value={live.positionY}
            onChange={(event) =>
              patchMedia({ positionY: Number(event.target.value) })
            }
            className="mt-1.5 w-full"
          />
          <LabControlHelp id="media-position-y" />
        </div>
        <div>
          <label
            className="flex items-center justify-between text-sm text-zinc-200"
            htmlFor="service-card-zoom"
          >
            <span>{controlLabel("media-position-zoom", language)}</span>
            <span className="font-mono text-xs text-zinc-400">
              {scalePercent}%
            </span>
          </label>
          <input
            id="service-card-zoom"
            type="range"
            min={scaleRange.min}
            max={scaleRange.max}
            step={scaleRange.step}
            value={live.scale}
            onChange={(event) =>
              patchMedia({ scale: Number(event.target.value) })
            }
            className="mt-1.5 w-full"
          />
          <LabControlHelp id="media-position-zoom" />
        </div>
        <button
          type="button"
          onClick={resetPosition}
          disabled={
            live.scale === approved.scale &&
            live.positionX === approved.positionX &&
            live.positionY === approved.positionY
          }
          className="min-h-11 rounded-md border border-zinc-700 px-3 text-sm text-zinc-200 hover:border-zinc-500 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:text-zinc-600"
        >
          {controlLabel("media-position-reset", language)}
        </button>
        <p className="text-[0.7rem] leading-relaxed text-zinc-500">
          {language === "es"
            ? "Mueve la imagen dentro del recuadro. El tamaño del recuadro no cambia. Aplicar guarda solo esta imagen en Custom."
            : "Moves the image inside the existing media area. The frame size does not change. Apply saves only this image to Custom."}
        </p>
        <div
          id="lab-free-pan"
          className="flex flex-col gap-5 border-t border-zinc-800 pt-5"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
            {language === "es" ? "Pan libre" : "Free Pan"}
          </p>
          <p className="text-[0.7rem] leading-relaxed text-zinc-500">
            {language === "es"
              ? "Arrastra la imagen directamente en Preview para posicionarla libremente."
              : "Drag the image directly in Preview for free positioning."}
          </p>
          <div>
            <label
              className="flex items-center justify-between text-sm text-zinc-200"
              htmlFor="service-card-pan-x"
            >
              <span>{controlLabel("media-pan-x", language)}</span>
              <span className="font-mono text-xs text-zinc-400">
                {formatPan(pan.panX)}
              </span>
            </label>
            <input
              id="service-card-pan-x"
              type="range"
              min={MEDIA_PAN_MIN}
              max={MEDIA_PAN_MAX}
              step={1}
              value={pan.panX}
              onChange={(event) =>
                patchMedia({ panX: Number(event.target.value) })
              }
              className="mt-1.5 w-full"
            />
            <LabControlHelp id="media-pan-x" />
          </div>
          <div>
            <label
              className="flex items-center justify-between text-sm text-zinc-200"
              htmlFor="service-card-pan-y"
            >
              <span>{controlLabel("media-pan-y", language)}</span>
              <span className="font-mono text-xs text-zinc-400">
                {formatPan(pan.panY)}
              </span>
            </label>
            <input
              id="service-card-pan-y"
              type="range"
              min={MEDIA_PAN_MIN}
              max={MEDIA_PAN_MAX}
              step={1}
              value={pan.panY}
              onChange={(event) =>
                patchMedia({ panY: Number(event.target.value) })
              }
              className="mt-1.5 w-full"
            />
            <LabControlHelp id="media-pan-y" />
          </div>
          <button
            type="button"
            onClick={resetPan}
            disabled={
              pan.panX === approvedPan.panX && pan.panY === approvedPan.panY
            }
            className="min-h-11 rounded-md border border-zinc-700 px-3 text-sm text-zinc-200 hover:border-zinc-500 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:text-zinc-600"
          >
            {controlLabel("media-pan-reset", language)}
          </button>
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-zinc-500">
              {language === "es" ? "Avanzado" : "Advanced"}
            </p>
            <label
              htmlFor="service-card-pan-overflow"
              className="mt-2 flex min-h-11 items-center gap-2 text-sm text-zinc-200"
            >
              <input
                id="service-card-pan-overflow"
                type="checkbox"
                checked={pan.allowFreeOverflow}
                onChange={(event) =>
                  patchMedia({ allowFreeOverflow: event.target.checked })
                }
              />
              {controlLabel("media-pan-overflow", language)}
            </label>
            <LabControlHelp id="media-pan-overflow" />
          </div>
        </div>
      </div>
    );
  }

  if (selectedTarget !== "home-hero-content") {
    return (
      <p className="text-sm leading-relaxed text-zinc-400">
        {language === "es"
          ? "Estos controles aplican a Inicio > Héroe > Contenido del héroe, o a Media de tarjetas de servicio."
          : "These controls apply to Home > Hero > Hero Content, or to Service Card Media."}
      </p>
    );
  }

  const slot = getComponentConfig(experience, selectedTarget);
  const layout = heroContentLayout(slot);
  const baselineLayout = heroContentLayout(
    getComponentConfig(baseline, selectedTarget),
  );

  function patchLayout(patch: {
    layoutOffsetX?: number;
    layoutOffsetY?: number;
    layoutMaxWidth?: number;
  }) {
    onChange(updateComponentConfig(experience, selectedTarget, patch));
  }

  function resetPosition() {
    patchLayout({
      layoutOffsetX: baselineLayout.offsetX,
      layoutOffsetY: baselineLayout.offsetY,
      layoutMaxWidth: baselineLayout.maxWidth,
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
        {language === "es" ? "Posición" : "Position"}
      </p>
      <div>
        <FieldLabel htmlFor="hero-content-offset-y" helpId="hero-content-offset-y">
          {controlLabel("hero-content-offset-y", language)}
        </FieldLabel>
        <div className="mt-1.5 flex items-center gap-3">
          <input
            id="hero-content-offset-y"
            type="range"
            min={HERO_CONTENT_OFFSET_MIN}
            max={HERO_CONTENT_OFFSET_MAX}
            step={1}
            value={layout.offsetY}
            onChange={(event) =>
              patchLayout({ layoutOffsetY: Number(event.target.value) })
            }
            className="w-full"
          />
          <span className="w-12 shrink-0 text-right font-mono text-xs text-zinc-400">
            {layout.offsetY}
          </span>
        </div>
      </div>
      <div>
        <FieldLabel htmlFor="hero-content-offset-x" helpId="hero-content-offset-x">
          {controlLabel("hero-content-offset-x", language)}
        </FieldLabel>
        <div className="mt-1.5 flex items-center gap-3">
          <input
            id="hero-content-offset-x"
            type="range"
            min={HERO_CONTENT_OFFSET_MIN}
            max={HERO_CONTENT_OFFSET_MAX}
            step={1}
            value={layout.offsetX}
            onChange={(event) =>
              patchLayout({ layoutOffsetX: Number(event.target.value) })
            }
            className="w-full"
          />
          <span className="w-12 shrink-0 text-right font-mono text-xs text-zinc-400">
            {layout.offsetX}
          </span>
        </div>
      </div>
      <div>
        <FieldLabel htmlFor="hero-content-max-width" helpId="hero-content-max-width">
          {controlLabel("hero-content-max-width", language)}
        </FieldLabel>
        <div className="mt-1.5 flex items-center gap-3">
          <input
            id="hero-content-max-width"
            type="range"
            min={HERO_CONTENT_WIDTH_MIN}
            max={HERO_CONTENT_WIDTH_MAX}
            step={0.5}
            value={layout.maxWidth}
            onChange={(event) =>
              patchLayout({ layoutMaxWidth: Number(event.target.value) })
            }
            className="w-full"
          />
          <span className="w-16 shrink-0 text-right font-mono text-xs text-zinc-400">
            {layout.maxWidth.toFixed(1)}rem
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={resetPosition}
        disabled={
          layout.offsetX === baselineLayout.offsetX &&
          layout.offsetY === baselineLayout.offsetY &&
          layout.maxWidth === baselineLayout.maxWidth
        }
        className="min-h-11 rounded-md border border-zinc-700 px-3 text-sm text-zinc-200 hover:border-zinc-500 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:text-zinc-600"
      >
        {controlLabel("hero-content-reset", language)}
      </button>
      <p className="text-[0.7rem] leading-relaxed text-zinc-500">
        {language === "es"
          ? "0 / 34rem es la base aprobada. Aplicar elemento guarda solo estos valores en Custom. El sitio público no cambia hasta promover a Current."
          : "0 / 34rem is the approved baseline. Apply Element saves only these values to Custom. The public site does not change until promoted to Current."}
      </p>
    </div>
  );
}

export const labTabs: Array<{ id: LabTab; label: string }> = [
  { id: "theme", label: "Theme" },
  { id: "media", label: "Media" },
  { id: "containers", label: "Containers" },
  { id: "motion", label: "Motion" },
  { id: "effects", label: "Special Effects" },
];

export type { LabTab };
