"use client";

import { useLabLanguage } from "@/components/theme/LabControlHelp";
import {
  contentFieldSchema,
  contentFieldsAreProtected,
  defaultContentValue,
  resolveContentValue,
  type ContentFieldId,
  type SiteContentPatch,
} from "@/config/site-content";

type ContentEditorProps = {
  fieldIds: readonly ContentFieldId[];
  working: SiteContentPatch;
  custom: SiteContentPatch;
  current: SiteContentPatch;
  onChange: (id: ContentFieldId, value: string) => void;
  onRestoreOriginal: (ids: readonly ContentFieldId[]) => void;
};

function statusForField(
  id: ContentFieldId,
  working: SiteContentPatch,
  custom: SiteContentPatch,
  current: SiteContentPatch,
) {
  const live = resolveContentValue(id, working, custom, current);
  const staged = resolveContentValue(id, custom, current);
  const published = resolveContentValue(id, current);
  if (live !== staged) {
    return "unsaved";
  }
  if (live !== published) {
    return "custom";
  }
  return "current";
}

export function ContentEditor({
  fieldIds,
  working,
  custom,
  current,
  onChange,
  onRestoreOriginal,
}: ContentEditorProps) {
  const language = useLabLanguage();
  const editableIds = fieldIds.filter(
    (id) => contentFieldSchema[id].governance !== "protected",
  );
  const protectedIds = fieldIds.filter(
    (id) => contentFieldSchema[id].governance === "protected",
  );

  if (fieldIds.length === 0) {
    return (
      <p className="text-sm leading-relaxed text-zinc-400">
        {language === "es"
          ? "Este alcance no tiene texto gobernado todavía."
          : "This scope has no governed text fields yet."}
      </p>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-400">
        {language === "es" ? "Contenido" : "Content"}
      </p>
      {editableIds.map((id) => {
        const schema = contentFieldSchema[id];
        const value = resolveContentValue(id, working, custom, current);
        const status = statusForField(id, working, custom, current);
        const over =
          schema.recommendedMax != null && value.length > schema.recommendedMax;
        return (
          <div key={id} className="min-w-0">
            {schema.governance === "editable-with-warning" ? (
              <p className="mb-2 text-[0.7rem] leading-relaxed text-amber-200/90">
                {schema.warning?.[language] ??
                  (language === "es"
                    ? "Este contenido puede afectar el significado clínico o profesional."
                    : "This content may affect clinical/professional meaning.")}
              </p>
            ) : null}
            <label
              htmlFor={`copy-${id}`}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300"
            >
              {schema.label[language]}
            </label>
            {schema.multiline ? (
              <textarea
                id={`copy-${id}`}
                rows={5}
                value={value}
                onChange={(event) => onChange(id, event.target.value)}
                className="mt-2 min-h-24 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
              />
            ) : (
              <input
                id={`copy-${id}`}
                type="text"
                value={value}
                onChange={(event) => onChange(id, event.target.value)}
                className="mt-2 min-h-11 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100"
              />
            )}
            <p
              className={`mt-1 text-[0.65rem] ${
                over ? "text-amber-300" : "text-zinc-500"
              }`}
            >
              {value.length}
              {schema.recommendedMax
                ? ` / ${schema.recommendedMax} ${language === "es" ? "recomendados" : "recommended"}`
                : ""}
            </p>
            {schema.guidance ? (
              <p className="mt-1 text-[0.7rem] leading-relaxed text-zinc-500">
                {schema.guidance[language]}
              </p>
            ) : null}
            <p
              className={`mt-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] ${
                status === "unsaved"
                  ? "text-amber-300"
                  : status === "custom"
                    ? "text-cyan-300"
                    : "text-zinc-500"
              }`}
            >
              {status === "unsaved"
                ? language === "es"
                  ? "Sin guardar"
                  : "Unsaved"
                : status === "custom"
                  ? language === "es"
                    ? "Listo para publicar"
                    : "Ready to publish"
                  : language === "es"
                    ? "Current / publicado"
                    : "Current / published"}
            </p>
          </div>
        );
      })}
      {editableIds.length > 0 ? (
        <details className="rounded-md border border-zinc-800 bg-zinc-900/40 px-3 py-2">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            {language === "es"
              ? "Avanzado / recuperación"
              : "Advanced / Recovery"}
          </summary>
          <p className="mt-2 text-[0.7rem] leading-relaxed text-zinc-500">
            {language === "es"
              ? "Restaura el texto original del código. No cambia Custom, Current ni Factory hasta que aplique y publique."
              : "Restores original/default copy. Does not change Custom, Current, or Factory until you Apply and Publish."}
          </p>
          <button
            type="button"
            onClick={() => onRestoreOriginal(editableIds)}
            className="mt-2 min-h-11 w-full rounded-md border border-zinc-700 px-3 text-left text-xs text-zinc-200 hover:border-zinc-500"
          >
            {language === "es"
              ? "Restaurar original / predeterminado"
              : "Restore original / default"}
          </button>
        </details>
      ) : null}
      {protectedIds.length > 0 || contentFieldsAreProtected(fieldIds) ? (
        <div className="rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            {language === "es" ? "Contenido protegido" : "Protected content"}
          </p>
          <p className="mt-2 text-[0.7rem] leading-relaxed text-zinc-500">
            {language === "es"
              ? "El contenido clínico, legal o de identidad no se edita en el modo simple."
              : "Clinical, legal, or identity copy is not editable in Simple Mode."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex min-h-9 items-center rounded-md border border-zinc-700 px-3 text-xs text-zinc-200">
              {language === "es" ? "Ver" : "View"}
            </span>
            <span className="inline-flex min-h-9 items-center rounded-md border border-zinc-800 px-3 text-xs text-zinc-500">
              {language === "es"
                ? "Avanzado / flujo gobernado"
                : "Advanced / governed workflow"}
            </span>
          </div>
          {protectedIds.map((id) => (
            <p key={id} className="mt-2 text-sm text-zinc-300">
              <span className="text-zinc-500">
                {contentFieldSchema[id].label[language]}:{" "}
              </span>
              {resolveContentValue(id, working, custom, current) ||
                defaultContentValue(id)}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
