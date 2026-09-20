"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  isAllowedIconUploadFile,
  LAB_ICON_API_PATH,
  operatorIconError,
  sanitizeIconFileName,
  type LabIconAsset,
} from "@/config/lab-icon-library";
import {
  editorialIconCssVars,
  type EditorialIconColor,
} from "@/config/experience";
import { EditorialIconAsset } from "@/components/editorial/EditorialIconAsset";
import { cn } from "@/lib/cn";
import type { LabLanguage } from "@/config/lab-guide";

type IconAssetGalleryProps = {
  language: LabLanguage;
  title: string;
  value?: string;
  color: EditorialIconColor;
  size: number;
  open: boolean;
  onClose: () => void;
  onSelect: (asset: LabIconAsset) => void;
};

type ConflictState = {
  file: File;
  fileName: string;
};

export function IconAssetGallery({
  language,
  title,
  value,
  color,
  size,
  open,
  onClose,
  onSelect,
}: IconAssetGalleryProps) {
  const [assets, setAssets] = useState<LabIconAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [conflict, setConflict] = useState<ConflictState | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [wasOpen, setWasOpen] = useState(open);
  const fileInputRef = useRef<HTMLInputElement>(null);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setQuery("");
      setError("");
      setConflict(null);
      setPendingFile(null);
    }
  }

  async function refreshIcons() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(LAB_ICON_API_PATH, {
        method: "GET",
        cache: "no-store",
      });
      if (!response.ok) {
        setError(operatorIconError("unable", language));
        return;
      }
      const payload = (await response.json()) as { assets?: LabIconAsset[] };
      setAssets(payload.assets ?? []);
    } catch {
      setError(operatorIconError("unable", language));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!open) {
      return;
    }
    let cancelled = false;
    void fetch(LAB_ICON_API_PATH, { method: "GET", cache: "no-store" })
      .then(async (response) => {
        if (cancelled) {
          return;
        }
        if (!response.ok) {
          setError(operatorIconError("unable", language));
          return;
        }
        const payload = (await response.json()) as { assets?: LabIconAsset[] };
        if (!cancelled) {
          setAssets(payload.assets ?? []);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(operatorIconError("unable", language));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [open, language]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return assets;
    }
    return assets.filter((asset) =>
      `${asset.label} ${asset.fileName}`.toLowerCase().includes(needle),
    );
  }, [assets, query]);

  async function importFile(file: File, conflictMode?: "replace" | "keep-both") {
    const problem = isAllowedIconUploadFile(file);
    if (problem) {
      setError(operatorIconError(problem, language));
      return;
    }
    const safe = sanitizeIconFileName(file.name);
    if (!safe) {
      setError(operatorIconError("unsupported", language));
      return;
    }
    setError("");
    setLoading(true);
    try {
      const body = new FormData();
      body.set("file", file, safe);
      if (conflictMode) {
        body.set("conflict", conflictMode);
      }
      const response = await fetch(LAB_ICON_API_PATH, {
        method: "POST",
        body,
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        code?: string;
        fileName?: string;
        asset?: LabIconAsset;
      };
      if (response.status === 409) {
        setConflict({ file, fileName: payload.fileName ?? safe });
        return;
      }
      if (!response.ok || !payload.asset) {
        setError(operatorIconError(payload.code ?? "unable", language));
        return;
      }
      setConflict(null);
      setPendingFile(null);
      onSelect(payload.asset);
      await refreshIcons();
      onClose();
    } catch {
      setError(operatorIconError("unable", language));
    } finally {
      setLoading(false);
    }
  }

  function takeFiles(files: FileList | File[] | null) {
    const file = files && files[0] ? files[0] : null;
    if (!file) {
      return;
    }
    const problem = isAllowedIconUploadFile(file);
    if (problem) {
      setError(operatorIconError(problem, language));
      return;
    }
    setPendingFile(file);
    void importFile(file);
  }

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-icon-title"
      onClick={onClose}
    >
      <div
        className="my-6 w-full max-w-lg rounded-lg border border-zinc-700 bg-zinc-950 p-4 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="change-icon-title" className="text-sm font-semibold text-white">
              {language === "es" ? "Cambiar icono" : "Change Icon"}
            </h2>
            <p className="mt-1 text-[0.7rem] text-zinc-400">{title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-9 rounded-md px-2 text-sm text-zinc-400 hover:text-white"
          >
            {language === "es" ? "Cerrar" : "Close"}
          </button>
        </div>

        <div
          className={`mt-4 rounded-md border border-dashed px-4 py-8 text-center ${
            dragOver
              ? "border-cyan-400 bg-cyan-400/10"
              : "border-zinc-600 bg-zinc-900"
          }`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragOver(false);
            takeFiles(event.dataTransfer.files);
          }}
        >
          <p className="text-sm text-zinc-200">
            {language === "es"
              ? "Suelta el icono SVG o PNG aquí"
              : "Drop SVG or PNG icon here"}
          </p>
          <p className="mt-1 text-[0.7rem] text-zinc-500">
            {language === "es" ? "o" : "or"}
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 min-h-11 rounded-md border border-zinc-600 px-3 text-sm text-zinc-100 hover:border-zinc-400"
          >
            {language === "es" ? "Elegir archivo" : "Choose File"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/svg+xml,.svg,image/png,.png"
            className="hidden"
            onChange={(event) => {
              takeFiles(event.target.files);
              event.target.value = "";
            }}
          />
          {pendingFile ? (
            <p className="mt-3 text-[0.7rem] text-zinc-400">{pendingFile.name}</p>
          ) : (
            <p className="mt-3 text-[0.7rem] text-zinc-500">SVG, PNG · max 2 MB</p>
          )}
        </div>

        {conflict ? (
          <div className="mt-4 rounded-md border border-amber-500/40 bg-amber-400/10 p-3">
            <p className="text-sm text-amber-100">
              {language === "es"
                ? `Ya existe un archivo llamado ${conflict.fileName}.`
                : `A file named ${conflict.fileName} already exists.`}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void importFile(conflict.file, "replace")}
                className="min-h-10 rounded-md border border-zinc-600 px-3 text-sm text-white"
              >
                {language === "es" ? "Reemplazar existente" : "Replace Existing"}
              </button>
              <button
                type="button"
                onClick={() => void importFile(conflict.file, "keep-both")}
                className="min-h-10 rounded-md border border-zinc-600 px-3 text-sm text-white"
              >
                {language === "es" ? "Conservar ambos" : "Keep Both"}
              </button>
              <button
                type="button"
                onClick={() => setConflict(null)}
                className="min-h-10 rounded-md px-3 text-sm text-zinc-400"
              >
                {language === "es" ? "Cancelar" : "Cancel"}
              </button>
            </div>
          </div>
        ) : null}

        {error ? (
          <p role="status" className="mt-3 text-sm text-rose-300">
            {error}
          </p>
        ) : null}

        <div className="mt-5 flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
            {language === "es" ? "Biblioteca de iconos" : "Icon Library"}
          </p>
          <button
            type="button"
            onClick={() => void refreshIcons()}
            disabled={loading}
            className="min-h-9 rounded-md px-2 text-[0.7rem] text-cyan-300 hover:text-white disabled:text-zinc-600"
          >
            {language === "es" ? "Actualizar" : "Refresh"}
          </button>
        </div>

        <label className="mt-3 block">
          <span className="sr-only">
            {language === "es" ? "Buscar iconos" : "Search icons"}
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={language === "es" ? "Buscar" : "search"}
            className="min-h-11 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100"
          />
        </label>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {visible.map((asset) => {
            const selected = value === asset.src;
            return (
              <button
                key={asset.src}
                type="button"
                title={asset.label}
                onClick={() => {
                  onSelect(asset);
                  onClose();
                }}
                className={cn(
                  "min-w-0 overflow-hidden rounded-md border p-2 text-center",
                  selected
                    ? "border-cyan-400 bg-cyan-400/15"
                    : "border-zinc-700 hover:border-zinc-500",
                )}
              >
                <span
                  className="mx-auto flex size-10 items-center justify-center"
                  style={
                    {
                      ...editorialIconCssVars(color, size),
                      color: "var(--exp-editorial-icon-color)",
                    } as CSSProperties
                  }
                >
                  <EditorialIconAsset
                    src={asset.src}
                    colorMode={
                      asset.kind === "png" ? "fixed" : asset.colorMode
                    }
                  />
                </span>
                <span className="mt-1 block truncate text-[0.65rem] text-zinc-200">
                  {asset.label}
                </span>
              </button>
            );
          })}
        </div>
        {visible.length === 0 && !loading ? (
          <p className="mt-3 text-[0.7rem] text-zinc-500">
            {language === "es"
              ? "No hay iconos en la biblioteca todavía."
              : "No icons are in the library yet."}
          </p>
        ) : null}

        <button
          type="button"
          onClick={onClose}
          className="mt-4 min-h-11 w-full rounded-md border border-zinc-700 px-3 text-sm text-zinc-200 hover:border-zinc-500"
        >
          {language === "es" ? "Cancelar" : "Cancel"}
        </button>
      </div>
    </div>
  );
}
