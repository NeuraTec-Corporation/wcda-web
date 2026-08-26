"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  containerGuides,
  labControlIds,
  labControls,
  labTargetLabels,
  labText,
  selectedElementMatrix,
  type LabControlId,
  type LabLanguage,
} from "@/config/lab-guide";
import type { LabSectionId } from "@/config/lab-ui";
import type { VisualTargetId } from "@/config/experience";

const LabUiContext = createContext<LabLanguage>("en");

export function LabUiProvider({
  language,
  children,
}: {
  language: LabLanguage;
  children: ReactNode;
}) {
  return (
    <LabUiContext.Provider value={language}>{children}</LabUiContext.Provider>
  );
}

export function useLabLanguage() {
  return useContext(LabUiContext);
}

export function LabControlHelp({
  id,
  compact = false,
}: {
  id: LabControlId;
  compact?: boolean;
}) {
  const language = useLabLanguage();
  const item = labControls[id];
  const help = item.help;
  const term = help.termNote ? labText(help.termNote, language) : "";

  if (compact) {
    return (
      <p className="mt-1 text-[0.7rem] leading-relaxed text-zinc-500">
        {labText(help.what, language)}
        {term ? ` ${term}` : ""}
      </p>
    );
  }

  return (
    <div className="mt-1.5 space-y-1 text-[0.7rem] leading-relaxed text-zinc-500">
      {term ? <p>{term}</p> : null}
      <p>{labText(help.what, language)}</p>
      <p>{labText(help.see, language)}</p>
      <p>{labText(help.where, language)}</p>
      <p>{labText(help.compatible, language)}</p>
      <p>{labText(help.incompatible, language)}</p>
      <p>{labText(help.persist, language)}</p>
    </div>
  );
}

export function LabUnavailableNote({
  message,
}: {
  message: { en: string; es: string };
}) {
  const language = useLabLanguage();
  return (
    <p className="mt-2 rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-xs leading-relaxed text-zinc-400">
      {labText(message, language)}
    </p>
  );
}

const sectionToCategory: Record<LabSectionId, LabControlId[] | "all"> = {
  brand: [
    "slider-radius",
    "slider-shadowIntensity",
    "slider-cardDensity",
    "slider-sectionSpacing",
    "slider-contentWidth",
    "slider-headerDensity",
    "preset-factory",
    "preset-current",
    "preset-inspired",
    "preset-custom",
  ],
  colors: [
    "color-primary",
    "color-secondary",
    "color-accent",
    "color-background",
    "color-surface",
    "color-surfaceMuted",
    "color-surfaceStrong",
    "color-foreground",
    "color-muted",
    "color-border",
  ],
  typography: [
    "font-heading",
    "font-body",
    "slider-headingScale",
    "slider-bodyScale",
  ],
  media: [
    "media-asset",
    "media-scale",
    "media-x",
    "media-y",
    "media-fit",
    "media-size",
    "media-logo-width",
    "media-padding",
    "media-align",
    "media-preview-bg",
    "media-style",
    "media-aspect",
    "media-radius",
    "media-overlay",
  ],
  containers: ["container-preset", "container-circle-size"],
  motion: [
    "motion-entrance",
    "motion-duration",
    "motion-intensity",
    "motion-delay",
  ],
  effects: labControlIds.filter(
    (id) => labControls[id].category === "effects" && id !== "beforeafter",
  ),
  recovery: [
    "recovery-undo",
    "recovery-load-current",
    "recovery-load-factory",
    "recovery-load-inspired",
    "recovery-apply",
    "recovery-copy-theme",
    "recovery-copy-experience",
  ],
};

export function LabGuidePanel({
  selectedTarget,
  section,
}: {
  selectedTarget: VisualTargetId;
  section: LabSectionId;
}) {
  const language = useLabLanguage();
  const row = selectedElementMatrix.find((item) => item.id === selectedTarget);
  const ids = sectionToCategory[section];
  const list = ids === "all" ? labControlIds : ids;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
          {language === "es" ? "Ayuda" : "Help"}
        </p>
        <p className="mt-2 text-sm text-zinc-200">
          {labTargetLabels[language][selectedTarget]}
        </p>
        {row ? (
          <p className="mt-1 text-[0.7rem] leading-relaxed text-zinc-500">
            {row.component}
            {". "}
            {language === "es" ? "Tema global" : "Global theme"}
            {": "}
            {row.colors ? (language === "es" ? "sí" : "yes") : "—"}
            {". Media: "}
            {row.media ? (language === "es" ? "sí" : "yes") : "—"}
            {". "}
            {language === "es" ? "Contenedores" : "Containers"}
            {": "}
            {row.containers ? (language === "es" ? "sí" : "yes") : "—"}
            {". "}
            {language === "es" ? "Efectos" : "Effects"}
            {": "}
            {language === "es" ? row.effects.es : row.effects.en}
            {"."}
          </p>
        ) : null}
      </div>
      {section === "containers"
        ? containerGuides.map((item) => (
            <div
              key={item.id}
              className="rounded-md border border-zinc-800 px-3 py-2"
            >
              <p className="text-xs font-semibold text-zinc-200">{item.id}</p>
              <p className="mt-1 text-[0.7rem] leading-relaxed text-zinc-500">
                {labText(item.purpose, language)}
              </p>
              <p className="mt-1 text-[0.7rem] leading-relaxed text-zinc-500">
                {labText(item.compatible, language)}
              </p>
              <p className="mt-1 text-[0.7rem] leading-relaxed text-zinc-500">
                {labText(item.incompatible, language)}
              </p>
            </div>
          ))
        : list.map((id) => {
            const item = labControls[id];
            return (
              <div key={id} className="rounded-md border border-zinc-800 px-3 py-2">
                <p className="text-xs font-semibold text-zinc-200">
                  {labText(item.help.label, language)}
                </p>
                <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.12em] text-zinc-500">
                  {item.layer === "theme"
                    ? language === "es"
                      ? "Tema"
                      : "Theme"
                    : item.layer === "experience"
                      ? language === "es"
                        ? "Experiencia"
                        : "Experience"
                      : language === "es"
                        ? "Laboratorio"
                        : "Lab"}
                </p>
                <LabControlHelp id={id} />
              </div>
            );
          })}
    </div>
  );
}
