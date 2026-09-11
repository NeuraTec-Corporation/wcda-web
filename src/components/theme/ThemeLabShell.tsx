"use client";

import type { ReactNode } from "react";

type ThemeLabShellProps = {
  navCollapsed: boolean;
  inspectorCollapsed: boolean;
  navDrawerOpen: boolean;
  inspectorDrawerOpen: boolean;
  onToggleNav: () => void;
  onToggleInspector: () => void;
  onOpenNavDrawer: () => void;
  onOpenInspectorDrawer: () => void;
  onCloseDrawers: () => void;
  nav: ReactNode;
  previewToolbar: ReactNode;
  preview: ReactNode;
  inspectorHeader: ReactNode;
  inspectorTabs: ReactNode;
  inspectorBody: ReactNode;
  inspectorActions: ReactNode;
  language: "en" | "es";
};

const btn =
  "inline-flex min-h-9 items-center justify-center rounded-md border border-zinc-700 px-2 text-[0.7rem] text-zinc-200 hover:border-zinc-500";

export function ThemeLabShell({
  navCollapsed,
  inspectorCollapsed,
  navDrawerOpen,
  inspectorDrawerOpen,
  onToggleNav,
  onToggleInspector,
  onOpenNavDrawer,
  onOpenInspectorDrawer,
  onCloseDrawers,
  nav,
  previewToolbar,
  preview,
  inspectorHeader,
  inspectorTabs,
  inspectorBody,
  inspectorActions,
  language,
}: ThemeLabShellProps) {
  const navLabel = language === "es" ? "Alcance" : "Scope";
  const inspectLabel = language === "es" ? "Inspector" : "Inspector";

  return (
    <div className="flex h-dvh min-h-0 flex-col bg-zinc-950 text-zinc-100">
      <div className="flex shrink-0 items-center gap-2 border-b border-zinc-800 px-3 py-2 lg:hidden">
        <button type="button" className={btn} onClick={onOpenNavDrawer}>
          {navLabel}
        </button>
        <button type="button" className={btn} onClick={onOpenInspectorDrawer}>
          {inspectLabel}
        </button>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside
          className={`hidden min-h-0 shrink-0 flex-col border-r border-zinc-800 lg:flex ${
            navCollapsed ? "w-11" : "w-[240px]"
          }`}
        >
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-zinc-800 px-2 py-2">
            <button
              type="button"
              className={btn}
              aria-label={
                navCollapsed
                  ? language === "es"
                    ? "Mostrar alcance"
                    : "Show scope"
                  : language === "es"
                    ? "Ocultar alcance"
                    : "Hide scope"
              }
              onClick={onToggleNav}
            >
              {navCollapsed ? "›" : "‹"}
            </button>
            {navCollapsed ? null : (
              <p className="min-w-0 truncate text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                {navLabel}
              </p>
            )}
          </div>
          {navCollapsed ? null : (
            <div className="min-h-0 flex-1 overflow-y-auto px-2 py-3">{nav}</div>
          )}
        </aside>

        <section className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="shrink-0 border-b border-zinc-800 px-3 py-2">
            {previewToolbar}
          </div>
          <div className="min-h-0 flex-1 overflow-auto bg-zinc-900 p-3">
            {preview}
          </div>
        </section>

        <aside
          className={`hidden min-h-0 shrink-0 flex-col border-l border-zinc-800 lg:flex ${
            inspectorCollapsed ? "w-11" : "w-[380px]"
          }`}
        >
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-zinc-800 px-2 py-2">
            {inspectorCollapsed ? null : (
              <p className="min-w-0 truncate text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                {inspectLabel}
              </p>
            )}
            <button
              type="button"
              className={btn}
              aria-label={
                inspectorCollapsed
                  ? language === "es"
                    ? "Mostrar inspector"
                    : "Show inspector"
                  : language === "es"
                    ? "Ocultar inspector"
                    : "Hide inspector"
              }
              onClick={onToggleInspector}
            >
              {inspectorCollapsed ? "‹" : "›"}
            </button>
          </div>
          {inspectorCollapsed ? null : (
            <>
              <div className="shrink-0 border-b border-zinc-800 px-3 py-3">
                {inspectorHeader}
              </div>
              {inspectorTabs ? (
                <div className="shrink-0 border-b border-zinc-800 px-3 py-2">
                  {inspectorTabs}
                </div>
              ) : null}
              <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
                {inspectorBody}
              </div>
              {inspectorActions ? (
                <div className="shrink-0 border-t border-zinc-800 px-3 py-3">
                  {inspectorActions}
                </div>
              ) : null}
            </>
          )}
        </aside>
      </div>

      {navDrawerOpen || inspectorDrawerOpen ? (
        <button
          type="button"
          aria-label={language === "es" ? "Cerrar panel" : "Close panel"}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onCloseDrawers}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(240px,86vw)] flex-col border-r border-zinc-800 bg-zinc-950 transition-transform duration-200 lg:hidden ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-400">
            {navLabel}
          </p>
          <button type="button" className={btn} onClick={onCloseDrawers}>
            {language === "es" ? "Cerrar" : "Close"}
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-2 py-3">{nav}</div>
      </aside>

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(380px,92vw)] flex-col border-l border-zinc-800 bg-zinc-950 transition-transform duration-200 lg:hidden ${
          inspectorDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-400">
            {inspectLabel}
          </p>
          <button type="button" className={btn} onClick={onCloseDrawers}>
            {language === "es" ? "Cerrar" : "Close"}
          </button>
        </div>
        <div className="shrink-0 border-b border-zinc-800 px-3 py-3">
          {inspectorHeader}
        </div>
        {inspectorTabs ? (
          <div className="shrink-0 border-b border-zinc-800 px-3 py-2">
            {inspectorTabs}
          </div>
        ) : null}
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
          {inspectorBody}
        </div>
        {inspectorActions ? (
          <div className="shrink-0 border-t border-zinc-800 px-3 py-3">
            {inspectorActions}
          </div>
        ) : null}
      </aside>
    </div>
  );
}
