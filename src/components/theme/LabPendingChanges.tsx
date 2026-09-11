"use client";

import type { LabLanguage } from "@/config/lab-ui";
import { labLabel, type LabBi } from "@/config/lab-registry";
import type { PendingCustomScope } from "@/config/lab-scoped-merge";

type LabPendingListProps = {
  language: LabLanguage;
  items: PendingCustomScope[];
  status: "unsaved" | "ready";
  heading: string;
  reviewLabel: string;
  applyLabel: string;
  discardLabel: string;
  publishLabel: string;
  restoreLabel: string;
  onReview: (item: PendingCustomScope) => void;
  onApply?: (item: PendingCustomScope) => void;
  onDiscard?: (item: PendingCustomScope) => void;
  onPublish?: (item: PendingCustomScope) => void;
  onRestore?: (item: PendingCustomScope) => void;
};

function groupKey(label: LabBi) {
  return `${label.en}|${label.es}`;
}

export function LabPendingList({
  language,
  items,
  status,
  heading,
  reviewLabel,
  applyLabel,
  discardLabel,
  publishLabel,
  restoreLabel,
  onReview,
  onApply,
  onDiscard,
  onPublish,
  onRestore,
}: LabPendingListProps) {
  if (items.length === 0) {
    return null;
  }

  const byRoot = new Map<string, { label: LabBi; items: PendingCustomScope[] }>();
  for (const item of items) {
    const root = item.groups[0] ?? { en: "Other", es: "Otros" };
    const key = groupKey(root);
    const current = byRoot.get(key) ?? { label: root, items: [] };
    current.items.push(item);
    byRoot.set(key, current);
  }

  return (
    <section className="space-y-2">
      <h3
        className={`text-xs font-semibold uppercase tracking-[0.14em] ${
          status === "unsaved" ? "text-amber-300" : "text-cyan-300"
        }`}
      >
        {heading} — {items.length}
      </h3>
      <div className="space-y-2">
        {[...byRoot.values()].map((root) => (
          <details key={groupKey(root.label)} open className="rounded-md border border-zinc-800">
            <summary className="cursor-pointer px-2 py-1.5 text-sm text-zinc-100">
              {labLabel(root.label, language)}
            </summary>
            <div className="space-y-2 border-t border-zinc-800 px-2 py-2">
              {root.items.map((item) => (
                <div key={item.id} className="rounded-md bg-zinc-900/70 px-2 py-2">
                  <p className="text-[0.7rem] leading-relaxed text-zinc-400">
                    {item.groups
                      .slice(1)
                      .map((group) => labLabel(group, language))
                      .join(" / ")}
                  </p>
                  <p className="text-sm text-zinc-100">
                    {labLabel(item.property, language)}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <button
                      type="button"
                      onClick={() => onReview(item)}
                      className="min-h-8 rounded-md border border-zinc-700 px-2 text-[0.65rem] text-zinc-200 hover:border-zinc-500"
                    >
                      {reviewLabel}
                    </button>
                    {status === "unsaved" ? (
                      <>
                        <button
                          type="button"
                          onClick={() => onApply?.(item)}
                          className="min-h-8 rounded-md border border-cyan-400/70 px-2 text-[0.65rem] text-zinc-100 hover:bg-cyan-400/10"
                        >
                          {applyLabel}
                        </button>
                        <button
                          type="button"
                          onClick={() => onDiscard?.(item)}
                          className="min-h-8 rounded-md border border-zinc-700 px-2 text-[0.65rem] text-zinc-200 hover:border-zinc-500"
                        >
                          {discardLabel}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => onPublish?.(item)}
                          className="min-h-8 rounded-md border border-cyan-400/70 px-2 text-[0.65rem] text-zinc-100 hover:bg-cyan-400/10"
                        >
                          {publishLabel}
                        </button>
                        <button
                          type="button"
                          onClick={() => onRestore?.(item)}
                          className="min-h-8 rounded-md border border-zinc-700 px-2 text-[0.65rem] text-zinc-200 hover:border-zinc-500"
                        >
                          {restoreLabel}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function LabStatusDots({
  unsaved,
  ready,
  onUnsaved,
  onReady,
}: {
  unsaved: boolean;
  ready: boolean;
  onUnsaved?: () => void;
  onReady?: () => void;
}) {
  if (!unsaved && !ready) {
    return null;
  }
  return (
    <span className="ml-auto flex shrink-0 items-center gap-0.5 pl-1">
      {unsaved ? (
        <button
          type="button"
          aria-label="Unsaved"
          onClick={(event) => {
            event.stopPropagation();
            onUnsaved?.();
          }}
          className="text-[0.7rem] leading-none"
        >
          🟠
        </button>
      ) : null}
      {ready ? (
        <button
          type="button"
          aria-label="Ready to publish"
          onClick={(event) => {
            event.stopPropagation();
            onReady?.();
          }}
          className="text-[0.7rem] leading-none"
        >
          🔵
        </button>
      ) : null}
    </span>
  );
}

export function LabChangeActionBar({
  unsavedCount,
  readyCount,
  unsavedLabel,
  readyLabel,
  publishedLabel,
  applyAllLabel,
  publishAllLabel,
  applyPublishAllLabel,
  saving,
  onApplyAll,
  onPublishAll,
  onApplyPublishAll,
}: {
  unsavedCount: number;
  readyCount: number;
  unsavedLabel: string;
  readyLabel: string;
  publishedLabel: string;
  applyAllLabel: string;
  publishAllLabel: string;
  applyPublishAllLabel: string;
  saving: boolean;
  onApplyAll: () => void;
  onPublishAll: () => void;
  onApplyPublishAll: () => void;
}) {
  const total = unsavedCount + readyCount;
  return (
    <div className="space-y-2">
      <p className="text-[0.7rem]">
        {unsavedCount > 0 ? (
          <span className="text-amber-300">
            🟠 {unsavedCount} {unsavedLabel}
          </span>
        ) : null}
        {unsavedCount > 0 && readyCount > 0 ? " · " : null}
        {readyCount > 0 ? (
          <span className="text-cyan-300">
            🔵 {readyCount} {readyLabel}
          </span>
        ) : null}
        {total === 0 ? (
          <span className="text-emerald-300">🟢 {publishedLabel}</span>
        ) : null}
      </p>
      <div className="flex flex-col gap-2">
        {unsavedCount > 0 ? (
          <button
            type="button"
            onClick={onApplyAll}
            disabled={saving}
            className="min-h-11 rounded-md border border-cyan-400/70 px-3 text-sm text-zinc-100 hover:bg-cyan-400/10 disabled:opacity-60"
          >
            {applyAllLabel}
          </button>
        ) : null}
        {readyCount > 0 ? (
          <button
            type="button"
            onClick={onPublishAll}
            disabled={saving}
            className="min-h-11 rounded-md border border-cyan-400 bg-cyan-400/20 px-3 text-sm text-white hover:bg-cyan-400/30 disabled:opacity-60"
          >
            {publishAllLabel}
          </button>
        ) : null}
        {unsavedCount > 0 && readyCount > 0 ? (
          <button
            type="button"
            onClick={onApplyPublishAll}
            disabled={saving}
            className="min-h-11 rounded-md border border-cyan-400 bg-cyan-400/20 px-3 text-sm text-white hover:bg-cyan-400/30 disabled:opacity-60"
          >
            {applyPublishAllLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
