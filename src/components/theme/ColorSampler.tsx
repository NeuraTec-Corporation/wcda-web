"use client";

import { useRef, useState } from "react";
import { LabControlHelp } from "@/components/theme/LabControlHelp";
import {
  colorChannelsFromHex,
  formatHsl,
  formatRgb,
} from "@/config/color-format";
import type { ColorApplyTarget } from "@/config/lab-color-scope";
import { parseHexColorInput } from "@/config/theme";
import { labText, type LabLanguage } from "@/config/lab-guide";

type PropertyOption = {
  id: string;
  label: { en: string; es: string };
};

type ColorSamplerStatus = "unsaved" | "ready" | "current";

type ColorSamplerProps = {
  language: LabLanguage;
  target: ColorApplyTarget;
  propertyOptions?: PropertyOption[];
  selectedProperty?: string;
  workingHex?: string;
  currentHex?: string;
  status: ColorSamplerStatus;
  onPropertyChange?: (id: string) => void;
  onPreview: (hex: string) => void;
  onApply: () => void;
};

export function ColorSampler({
  language,
  target,
  propertyOptions,
  selectedProperty,
  workingHex,
  currentHex,
  status,
  onPropertyChange,
  onPreview,
  onApply,
}: ColorSamplerProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const [picking, setPicking] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const nativePickerRef = useRef<HTMLInputElement>(null);
  const hex = draft ?? workingHex ?? "";
  const channels = hex ? colorChannelsFromHex(hex) : null;
  const canApply = status === "unsaved" && Boolean(parseHexColorInput(hex));

  function commitPreview(next: string) {
    const parsed = parseHexColorInput(next);
    if (!parsed) {
      setDraft(next);
      return;
    }
    setDraft(null);
    onPreview(parsed);
  }

  async function copyValue(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus(label);
    } catch {
      setCopyStatus("");
    }
  }

  async function pickColor() {
    setCopyStatus("");
    const EyeDropperCtor = (
      window as Window & {
        EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> };
      }
    ).EyeDropper;
    if (!EyeDropperCtor) {
      nativePickerRef.current?.click();
      return;
    }
    setPicking(true);
    try {
      const result = await new EyeDropperCtor().open();
      const parsed = parseHexColorInput(result.sRGBHex);
      if (parsed) {
        commitPreview(parsed);
      }
    } catch {
      /* user cancelled */
    } finally {
      setPicking(false);
    }
  }

  const scopeLine =
    target.kind === "system"
      ? "SYSTEM / GLOBAL"
      : target.kind === "page"
        ? "PAGE"
        : target.kind === "section"
          ? "SECTION"
          : "ELEMENT / CONTAINER";
  const statusLabel =
    status === "unsaved"
      ? labText({ en: "Unsaved", es: "Sin guardar" }, language)
      : status === "ready"
        ? labText({ en: "Ready to publish", es: "Listo para publicar" }, language)
        : labText({ en: "Current", es: "Current" }, language);
  const statusClass =
    status === "unsaved"
      ? "text-amber-300"
      : status === "ready"
        ? "text-cyan-300"
        : "text-zinc-500";

  return (
    <div className="min-w-0 rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
        {labText({ en: "Color Tools", es: "Herramientas de color" }, language)}
      </p>
      <p className="mt-2 text-[0.7rem] leading-relaxed text-zinc-500">
        {labText(
          {
            en: "Pick or type a color to preview immediately (Working). Apply saves that scope to Custom. Publish makes it Current.",
            es: "Elegir o escribir un color actualiza la vista previa de inmediato (Working). Aplicar lo guarda en Custom. Publicar lo convierte en Current.",
          },
          language,
        )}
      </p>

      {propertyOptions && onPropertyChange ? (
        <label className="mt-3 block text-sm text-zinc-200" htmlFor="color-sampler-property">
          {labText({ en: "Property", es: "Propiedad" }, language)}
          <select
            id="color-sampler-property"
            className="mt-1.5 min-h-11 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100"
            value={selectedProperty}
            onChange={(event) => onPropertyChange(event.target.value)}
          >
            {propertyOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {labText(option.label, language)}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => void pickColor()}
          disabled={picking}
          className="min-h-11 rounded-md border border-cyan-400/70 px-3 text-sm text-zinc-100 hover:bg-cyan-400/10 disabled:opacity-60"
        >
          {picking
            ? labText({ en: "Picking…", es: "Muestreando…" }, language)
            : labText({ en: "Pick Color", es: "Elegir color" }, language)}
        </button>
        <label className="inline-flex min-h-11 items-center gap-2 rounded-md border border-zinc-700 px-2 text-sm text-zinc-200">
          <span>{labText({ en: "Manual", es: "Manual" }, language)}</span>
          <input
            ref={nativePickerRef}
            type="color"
            value={channels?.hex ?? "#F1E8DC"}
            aria-label={labText({ en: "Native color picker", es: "Selector nativo de color" }, language)}
            onChange={(event) => commitPreview(event.target.value)}
            className="h-7 w-9 cursor-pointer rounded-sm border border-zinc-600 bg-zinc-900 p-0"
          />
        </label>
      </div>
      <LabControlHelp id="color-pick" compact />
      <LabControlHelp id="color-hex" compact />

      <div className="mt-4">
        <p className="text-[0.7rem] uppercase tracking-[0.12em] text-zinc-500">
          {labText({ en: "Color Preview", es: "Vista previa del color" }, language)}
        </p>
        <div className="mt-2 flex items-center gap-3">
          <span
            aria-hidden
            className="h-10 w-10 shrink-0 rounded-md border border-zinc-600"
            style={{ backgroundColor: channels?.hex ?? "transparent" }}
          />
          <input
            type="text"
            value={hex}
            spellCheck={false}
            placeholder="#RRGGBB"
            aria-label="HEX"
            onChange={(event) => {
              setDraft(event.target.value);
              const parsed = parseHexColorInput(event.target.value);
              if (parsed) {
                onPreview(parsed);
              }
            }}
            onBlur={() => {
              const parsed = parseHexColorInput(hex);
              if (parsed) {
                commitPreview(parsed);
              } else {
                setDraft(null);
              }
            }}
            className="min-h-11 min-w-0 flex-1 rounded-md border border-zinc-700 bg-zinc-900 px-3 font-mono text-sm text-zinc-100"
          />
        </div>
        {channels ? (
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-[0.75rem] text-zinc-300">
            <dt>HEX</dt>
            <dd>{channels.hex}</dd>
            <dt>RGB</dt>
            <dd>{formatRgb(channels)}</dd>
            <dt>HSL</dt>
            <dd>{formatHsl(channels)}</dd>
          </dl>
        ) : (
          <p className="mt-2 text-[0.7rem] text-zinc-500">
            {labText(
              {
                en: "Pick a pixel or enter #RGB / #RRGGBB.",
                es: "Elija un píxel o ingrese #RGB / #RRGGBB.",
              },
              language,
            )}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={!channels}
            onClick={() => channels && void copyValue(channels.hex, "HEX")}
            className="min-h-9 rounded-md border border-zinc-700 px-2 text-xs text-zinc-200 hover:border-zinc-500 disabled:opacity-40"
          >
            {labText({ en: "Copy HEX", es: "Copiar HEX" }, language)}
          </button>
          <button
            type="button"
            disabled={!channels}
            onClick={() => channels && void copyValue(formatRgb(channels), "RGB")}
            className="min-h-9 rounded-md border border-zinc-700 px-2 text-xs text-zinc-200 hover:border-zinc-500 disabled:opacity-40"
          >
            {labText({ en: "Copy RGB", es: "Copiar RGB" }, language)}
          </button>
          <button
            type="button"
            disabled={!channels}
            onClick={() => channels && void copyValue(formatHsl(channels), "HSL")}
            className="min-h-9 rounded-md border border-zinc-700 px-2 text-xs text-zinc-200 hover:border-zinc-500 disabled:opacity-40"
          >
            {labText({ en: "Copy HSL", es: "Copiar HSL" }, language)}
          </button>
        </div>
        {copyStatus ? (
          <p className="mt-1 text-[0.7rem] text-cyan-300">
            {labText({ en: `Copied ${copyStatus}`, es: `Copiado ${copyStatus}` }, language)}
          </p>
        ) : null}
      </div>

      <div className="mt-4 rounded-md border border-zinc-800 bg-zinc-950/60 px-3 py-3">
        <p className={`text-[0.65rem] font-medium uppercase tracking-[0.12em] ${statusClass}`}>
          ● {statusLabel}
        </p>
        <dl className="mt-3 space-y-2 text-[0.75rem] text-zinc-200">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-zinc-500">
              {labText({ en: "Working", es: "Working" }, language)}
            </dt>
            <dd className="flex items-center gap-2 font-mono">
              <span
                aria-hidden
                className="size-4 rounded-sm border border-zinc-600"
                style={{ backgroundColor: workingHex ?? "transparent" }}
              />
              {workingHex ?? "—"}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-zinc-500">
              {labText({ en: "Current", es: "Current" }, language)}
            </dt>
            <dd className="flex items-center gap-2 font-mono">
              <span
                aria-hidden
                className="size-4 rounded-sm border border-zinc-600"
                style={{ backgroundColor: currentHex ?? "transparent" }}
              />
              {currentHex ?? "—"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-4 rounded-md border border-cyan-400/25 bg-cyan-400/5 px-3 py-3">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cyan-300">
          {labText({ en: "Apply target", es: "Destino de aplicación" }, language)}
        </p>
        <dl className="mt-2 space-y-1 text-[0.75rem] text-zinc-200">
          <div>
            <dt className="inline text-zinc-500">
              {labText({ en: "Scope", es: "Alcance" }, language)}:{" "}
            </dt>
            <dd className="inline font-medium">{scopeLine}</dd>
          </div>
          {target.pageLabel ? (
            <div>
              <dt className="inline text-zinc-500">
                {labText({ en: "Page", es: "Página" }, language)}:{" "}
              </dt>
              <dd className="inline">{labText(target.pageLabel, language)}</dd>
            </div>
          ) : null}
          {target.sectionLabel ? (
            <div>
              <dt className="inline text-zinc-500">
                {labText({ en: "Section", es: "Sección" }, language)}:{" "}
              </dt>
              <dd className="inline">{labText(target.sectionLabel, language)}</dd>
            </div>
          ) : null}
          {target.elementLabel ? (
            <div>
              <dt className="inline text-zinc-500">
                {labText({ en: "Element", es: "Elemento" }, language)}:{" "}
              </dt>
              <dd className="inline">{labText(target.elementLabel, language)}</dd>
            </div>
          ) : null}
          <div>
            <dt className="inline text-zinc-500">
              {labText({ en: "Property", es: "Propiedad" }, language)}:{" "}
            </dt>
            <dd className="inline">{labText(target.propertyLabel, language)}</dd>
          </div>
          <div>
            <dt className="inline text-zinc-500">
              {labText({ en: "Result", es: "Resultado" }, language)}:{" "}
            </dt>
            <dd className="inline">{labText(target.resultLabel, language)}</dd>
          </div>
        </dl>
      </div>

      <button
        type="button"
        disabled={!canApply}
        onClick={onApply}
        className="mt-3 min-h-11 w-full rounded-md border border-cyan-400 bg-cyan-400/20 px-3 text-sm text-white hover:bg-cyan-400/30 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:bg-transparent disabled:text-zinc-600"
      >
        {labText(target.applyLabel, language)}
      </button>
      <LabControlHelp id="color-apply" compact />
    </div>
  );
}
