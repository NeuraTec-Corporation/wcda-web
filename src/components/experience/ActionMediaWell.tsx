"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CornerGlyph } from "@/components/experience/ExperienceGlyphs";
import { useExperience } from "@/components/experience/useExperience";
import type {
  ContainerPresetId,
  CornerActionGlyph,
  CornerActionMorph,
  CornerActionPosition,
} from "@/config/experience";

type ActionMediaWellProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  preset: Extract<
    ContainerPresetId,
    "corner-action" | "top-action" | "bottom-action"
  >;
  position?: CornerActionPosition;
  glyph?: CornerActionGlyph;
  morph?: CornerActionMorph;
  label?: string;
};

function morphTarget(
  glyph: CornerActionGlyph,
  morph: CornerActionMorph,
): CornerActionGlyph {
  if (morph === "info-arrow") {
    return "arrow";
  }
  return glyph;
}

function resolveAnchor(
  preset: ActionMediaWellProps["preset"],
  position: CornerActionPosition,
): CornerActionPosition {
  if (preset === "top-action") {
    return "top-right";
  }
  if (preset === "bottom-action") {
    return "bottom-left";
  }
  return position;
}

export function ActionMediaWell({
  children,
  href,
  className,
  preset,
  position,
  glyph,
  morph,
  label = "Open",
}: ActionMediaWellProps) {
  const experience = useExperience();
  const resolvedPosition = resolveAnchor(
    preset,
    position ?? experience.cornerAction.position,
  );
  const resolvedGlyph = glyph ?? experience.cornerAction.glyph;
  const resolvedMorph = morph ?? experience.cornerAction.morph;
  const hoverGlyph = morphTarget(resolvedGlyph, resolvedMorph);
  const emphasize = resolvedMorph === "emphasize";

  const classes = cn("exp-action-well block min-w-0", className);

  if (!href) {
    return (
      <div className={classes} data-action-preset={preset}>
        {children}
      </div>
    );
  }

  const control = (
    <span
      className={cn(
        "exp-action-control exp-corner-action",
        emphasize && "exp-corner-action-emphasize",
      )}
      data-morph={resolvedMorph}
      aria-hidden="true"
    >
      <span className="exp-corner-action-from grid place-items-center">
        <CornerGlyph name={resolvedGlyph} className="size-4" />
      </span>
      <span className="exp-corner-action-to absolute grid place-items-center">
        <CornerGlyph name={hoverGlyph} className="size-4" />
      </span>
    </span>
  );

  return (
    <a
      href={href}
      className={classes}
      data-action-preset={preset}
      data-action-anchor={resolvedPosition}
    >
      {children}
      {control}
      <span className="sr-only">{label}</span>
    </a>
  );
}
