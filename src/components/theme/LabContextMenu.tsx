"use client";

import type { LabLanguage } from "@/config/lab-guide";
import { labText } from "@/config/lab-guide";

export type LabContextMenuAction =
  | "change-image"
  | "position"
  | "free-pan"
  | "restore-current"
  | "restore-default"
  | "open-inspector"
  | "advanced";

type LabContextMenuProps = {
  language: LabLanguage;
  x: number;
  y: number;
  title: string;
  subtitle: string;
  media: boolean;
  onAction: (action: LabContextMenuAction) => void;
  onClose: () => void;
};

export function LabContextMenu({
  language,
  x,
  y,
  title,
  subtitle,
  media,
  onAction,
  onClose,
}: LabContextMenuProps) {
  const items: Array<{
    id: LabContextMenuAction;
    label: { en: string; es: string };
    divider?: boolean;
  }> = media
      ? [
          { id: "change-image", label: { en: "Change Image", es: "Cambiar imagen" } },
          { id: "position", label: { en: "Position / Crop", es: "Posición / recorte" } },
          { id: "free-pan", label: { en: "Free Pan", es: "Pan libre" } },
          { id: "restore-current", label: { en: "Restore Current", es: "Restaurar Current" } },
          { id: "restore-default", label: { en: "Restore Default", es: "Restaurar predeterminado" } },
          {
            id: "open-inspector",
            label: { en: "Open Inspector", es: "Abrir Inspector" },
            divider: true,
          },
          { id: "advanced", label: { en: "Advanced", es: "Avanzado" } },
        ]
      : [
          { id: "open-inspector", label: { en: "Open Inspector", es: "Abrir Inspector" } },
          { id: "advanced", label: { en: "Advanced", es: "Avanzado" } },
        ];

  return (
    <div
      className="fixed inset-0 z-[80]"
      role="presentation"
      onClick={onClose}
      onContextMenu={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div
        role="menu"
        className="absolute min-w-56 overflow-hidden rounded-md border border-zinc-700 bg-zinc-950 py-1 shadow-xl"
        style={{ left: x, top: y }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-zinc-800 px-3 py-2">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-zinc-300">
            {title}
          </p>
          <p className="mt-0.5 text-[0.65rem] text-zinc-500">{subtitle}</p>
        </div>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="menuitem"
            onClick={() => onAction(item.id)}
            className={`flex min-h-10 w-full items-center px-3 text-left text-sm text-zinc-100 hover:bg-cyan-400/10 ${
              item.divider ? "mt-1 border-t border-zinc-800" : ""
            }`}
          >
            {labText(item.label, language)}
          </button>
        ))}
      </div>
    </div>
  );
}
