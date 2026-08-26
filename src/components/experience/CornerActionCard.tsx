"use client";

import type { ReactNode } from "react";
import { ActionMediaWell } from "@/components/experience/ActionMediaWell";
import type {
  ContainerPresetId,
  CornerActionGlyph,
  CornerActionMorph,
  CornerActionPosition,
} from "@/config/experience";

type CornerActionCardProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  preset?: Extract<
    ContainerPresetId,
    "corner-action" | "top-action" | "bottom-action"
  >;
  position?: CornerActionPosition;
  glyph?: CornerActionGlyph;
  morph?: CornerActionMorph;
  label?: string;
};

export function CornerActionCard({
  children,
  href,
  className,
  preset = "corner-action",
  position,
  glyph,
  morph,
  label = "Open",
}: CornerActionCardProps) {
  return (
    <ActionMediaWell
      href={href}
      className={className}
      preset={preset}
      position={position}
      glyph={glyph}
      morph={morph}
      label={label}
    >
      {children}
    </ActionMediaWell>
  );
}
