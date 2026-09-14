"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  galleryGroupsForTarget,
  getRegisteredAsset,
  type ComposerAssetId,
  type RegisteredMediaAsset,
} from "@/config/media-assets";
import {
  destinationForTarget,
  isAllowedUploadFile,
  isApprovedPublicMediaSrc,
  LAB_MEDIA_API_PATH,
  operatorMediaError,
  sanitizeMediaFileName,
  type LabMediaDestination,
  type LabMediaListAsset,
} from "@/config/lab-media-library";
import { labText, type LabLanguage } from "@/config/lab-guide";

type MediaAssetGalleryProps = {
  id?: string;
  language: LabLanguage;
  target?: string;
  itemKey?: string;
  value: ComposerAssetId;
  currentValue?: ComposerAssetId;
  onSelect: (assetId: ComposerAssetId) => void;
  openSignal?: number;
};

type DiskGroups = {
  thisTarget: LabMediaListAsset[];
  related: LabMediaListAsset[];
  all: LabMediaListAsset[];
  destination: LabMediaDestination | null;
};

type ConflictState = {
  file: File;
  fileName: string;
};

function mergeBySrc(
  primary: readonly RegisteredMediaAsset[],
  extra: readonly RegisteredMediaAsset[],
) {
  const next: RegisteredMediaAsset[] = [];
  const seen = new Set<string>();
  for (const asset of [...extra, ...primary]) {
    if (seen.has(asset.src) || seen.has(asset.id)) {
      continue;
    }
    seen.add(asset.src);
    seen.add(asset.id);
    next.push(asset);
  }
  return next;
}

function currentPreview(value: ComposerAssetId) {
  if (value === "default" || value === "placeholder") {
    return null;
  }
  return getRegisteredAsset(value);
}

function composerIdForSelection(asset: RegisteredMediaAsset): ComposerAssetId {
  const registered = getRegisteredAsset(asset.id);
  if (registered && registered.src === asset.src) {
    return registered.id;
  }
  if (isApprovedPublicMediaSrc(asset.src)) {
    return asset.src;
  }
  return asset.id;
}

export function MediaAssetGallery({
  id,
  language,
  target,
  itemKey,
  value,
  currentValue,
  onSelect,
  openSignal = 0,
}: MediaAssetGalleryProps) {
  const staticGroups = galleryGroupsForTarget(target, itemKey);
  const destination = destinationForTarget(target, itemKey);
  const [open, setOpen] = useState(() => openSignal > 0);
  const [tab, setTab] = useState(staticGroups[0]?.id ?? "priority");
  const [disk, setDisk] = useState<DiskGroups | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingPreview, setPendingPreview] = useState("");
  const [conflict, setConflict] = useState<ConflictState | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selected = currentPreview(value);
  const current = currentPreview(currentValue ?? value);
  const workingDiffers =
    currentValue !== undefined && value !== currentValue;

  const groups = useMemo(() => {
    return staticGroups.map((group) => {
      const extra =
        group.id === "priority"
          ? (disk?.thisTarget ?? [])
          : group.id === "related"
            ? (disk?.related ?? [])
            : (disk?.all ?? []);
      return {
        ...group,
        assets: mergeBySrc(group.assets, extra),
      };
    });
  }, [disk, staticGroups]);

  const active = groups.find((group) => group.id === tab) ?? groups[0];

  async function refreshMedia() {
    if (!target) {
      return;
    }
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ target });
      if (itemKey) {
        params.set("itemKey", itemKey);
      }
      const response = await fetch(`${LAB_MEDIA_API_PATH}?${params}`, {
        method: "GET",
        cache: "no-store",
      });
      if (!response.ok) {
        setError(operatorMediaError("unable", language));
        return;
      }
      const payload = (await response.json()) as DiskGroups;
      setDisk(payload);
    } catch {
      setError(operatorMediaError("unable", language));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!open || !target) {
      return;
    }
    const params = new URLSearchParams({ target });
    if (itemKey) {
      params.set("itemKey", itemKey);
    }
    let cancelled = false;
    void fetch(`${LAB_MEDIA_API_PATH}?${params}`, {
      method: "GET",
      cache: "no-store",
    })
      .then(async (response) => {
        if (cancelled) {
          return;
        }
        if (!response.ok) {
          setError(operatorMediaError("unable", language));
          return;
        }
        const payload = (await response.json()) as DiskGroups;
        if (!cancelled) {
          setDisk(payload);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(operatorMediaError("unable", language));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [open, target, itemKey, language]);

  function clearPendingPreview() {
    setPendingPreview((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return "";
    });
  }

  async function importFile(file: File, conflictMode?: "replace" | "keep-both") {
    const problem = isAllowedUploadFile(file);
    if (problem) {
      setError(operatorMediaError(problem, language));
      return;
    }
    if (!destination) {
      setError(operatorMediaError("noDestination", language));
      return;
    }
    const safe = sanitizeMediaFileName(file.name);
    if (!safe) {
      setError(operatorMediaError("unsupported", language));
      return;
    }
    setError("");
    setLoading(true);
    try {
      const body = new FormData();
      body.set("file", file, safe);
      body.set("target", target ?? "");
      if (itemKey) {
        body.set("itemKey", itemKey);
      }
      if (conflictMode) {
        body.set("conflict", conflictMode);
      }
      const response = await fetch(LAB_MEDIA_API_PATH, {
        method: "POST",
        body,
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        code?: string;
        fileName?: string;
        asset?: RegisteredMediaAsset;
      };
      if (response.status === 409) {
        setConflict({ file, fileName: payload.fileName ?? safe });
        return;
      }
      if (!response.ok || !payload.asset) {
        setError(
          operatorMediaError(payload.code ?? "unable", language),
        );
        return;
      }
      setConflict(null);
      setPendingFile(null);
      clearPendingPreview();
      onSelect(composerIdForSelection(payload.asset));
      await refreshMedia();
      setOpen(false);
    } catch {
      setError(operatorMediaError("unable", language));
    } finally {
      setLoading(false);
    }
  }

  function closePicker() {
    setOpen(false);
    setConflict(null);
    setPendingFile(null);
    clearPendingPreview();
    setError("");
  }

  function takeFiles(files: FileList | File[] | null) {
    const file = files && files[0] ? files[0] : null;
    if (!file) {
      return;
    }
    const problem = isAllowedUploadFile(file);
    if (problem) {
      setError(operatorMediaError(problem, language));
      return;
    }
    setPendingFile(file);
    setPendingPreview((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return URL.createObjectURL(file);
    });
    void importFile(file);
  }

  const destLabel = destination
    ? labText(destination.label, language)
    : "";

  return (
    <div id={id} className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
        {workingDiffers
          ? language === "es"
            ? "Imagen de trabajo"
            : "Working image"
          : language === "es"
            ? "Imagen actual"
            : "Current image"}
      </p>
      <div className="mt-2 overflow-hidden rounded-md border border-zinc-700">
        {selected ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={selected.src}
            alt=""
            className="h-28 w-full bg-zinc-900 object-cover"
          />
        ) : (
          <div className="flex h-28 items-center justify-center bg-zinc-900 text-[0.7rem] text-zinc-500">
            {value === "placeholder"
              ? language === "es"
                ? "Marcador"
                : "Placeholder"
              : language === "es"
                ? "Imagen original"
                : "Original"}
          </div>
        )}
        <p className="truncate px-2 py-1.5 text-[0.7rem] text-zinc-300">
          {selected?.fileName ??
            (language === "es" ? "Imagen original" : "Original")}
        </p>
      </div>
      {workingDiffers ? (
        <p className="truncate text-[0.7rem] text-zinc-500">
          {language === "es" ? "Actual: " : "Current: "}
          {current?.fileName ??
            (language === "es" ? "Imagen original" : "Original")}
        </p>
      ) : null}
      <button
        type="button"
        onClick={() => {
          setTab("priority");
          setOpen(true);
        }}
        className="mt-3 min-h-11 w-full rounded-md border border-cyan-400/50 bg-cyan-400/10 px-3 text-sm text-white hover:bg-cyan-400/20"
      >
        {language === "es" ? "Cambiar imagen" : "Change Image"}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="change-image-title"
          onClick={closePicker}
        >
          <div
            className="my-6 w-full max-w-lg rounded-lg border border-zinc-700 bg-zinc-950 p-4 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2
                  id="change-image-title"
                  className="text-sm font-semibold text-white"
                >
                  {language === "es" ? "Cambiar imagen" : "Change Image"}
                </h2>
                {destLabel ? (
                  <p className="mt-1 text-[0.7rem] text-zinc-400">
                    {destLabel}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={closePicker}
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
                  ? "Suelta la imagen aquí"
                  : "Drop image here"}
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
                accept="image/png,image/jpeg,image/webp,image/svg+xml,.png,.jpg,.jpeg,.webp,.svg"
                className="hidden"
                onChange={(event) => takeFiles(event.target.files)}
              />
              {pendingFile ? (
                <div className="mt-3 flex flex-col items-center gap-1">
                  {pendingPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={pendingPreview}
                      alt=""
                      className="h-16 w-24 rounded-sm object-cover"
                    />
                  ) : null}
                  <p className="text-[0.7rem] text-zinc-400">
                    {pendingFile.name}
                  </p>
                  {destLabel ? (
                    <p className="text-[0.7rem] text-zinc-500">{destLabel}</p>
                  ) : null}
                </div>
              ) : destLabel ? (
                <p className="mt-3 text-[0.7rem] text-zinc-500">{destLabel}</p>
              ) : null}
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
                    {language === "es"
                      ? "Reemplazar existente"
                      : "Replace Existing"}
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
                {language === "es" ? "Imágenes existentes" : "Existing images"}
              </p>
              <button
                type="button"
                onClick={() => void refreshMedia()}
                disabled={loading}
                className="min-h-9 rounded-md px-2 text-[0.7rem] text-cyan-300 hover:text-white disabled:text-zinc-600"
              >
                {language === "es" ? "Actualizar media" : "Refresh Media"}
              </button>
            </div>

            <div className="mt-2 flex flex-wrap gap-1">
              {groups.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setTab(group.id)}
                  className={`min-h-9 rounded-md px-2 text-[0.7rem] ${
                    group.id === active?.id
                      ? "bg-cyan-400/20 text-white"
                      : "text-zinc-400 hover:bg-zinc-800"
                  }`}
                >
                  {labText(group.label, language)}
                </button>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  onSelect("default");
                  setOpen(false);
                }}
                className={`min-h-24 rounded-md border p-2 text-left text-[0.7rem] ${
                  value === "default"
                    ? "border-cyan-400 bg-cyan-400/15 text-white"
                    : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
                }`}
              >
                {language === "es" ? "Original" : "Original"}
              </button>
              {active?.assets.map((asset) => {
                const selectedCard =
                  value === composerIdForSelection(asset) ||
                  value === asset.id ||
                  value === asset.src;
                return (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => {
                      onSelect(composerIdForSelection(asset));
                      setOpen(false);
                    }}
                    className={`min-w-0 overflow-hidden rounded-md border text-left ${
                      selectedCard
                        ? "border-cyan-400 bg-cyan-400/15"
                        : "border-zinc-700 hover:border-zinc-500"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset.src}
                      alt=""
                      className="h-20 w-full bg-zinc-900 object-cover"
                    />
                    <span className="block truncate px-2 py-1.5 text-[0.65rem] text-zinc-200">
                      {asset.fileName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
