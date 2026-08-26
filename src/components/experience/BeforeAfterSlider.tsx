"use client";

/* EXPERIMENTAL / NOT CERTIFIED
   Incomplete placeholder. Hidden from Theme Lab user-facing controls.
   Do not treat as a production before/after feature. */

import { useId, useState } from "react";

type BeforeAfterSliderProps = {
  beforeLabel?: string;
  afterLabel?: string;
};

export function BeforeAfterSlider({
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const id = useId();
  const [value, setValue] = useState(50);

  return (
    <div
      className="relative max-w-3xl overflow-hidden rounded-lg border border-border bg-placeholder"
      style={{ aspectRatio: "16 / 9" }}
    >
      <div className="media-placeholder-panel absolute inset-0" aria-hidden="true">
        <span className="absolute inset-4 rounded-sm border border-border/60" />
        <span className="absolute left-4 top-4 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-placeholder-ink">
          {beforeLabel}
        </span>
      </div>
      <div
        className="media-placeholder-panel absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${value}%)` }}
        aria-hidden="true"
      >
        <span className="absolute inset-4 rounded-sm border border-dashed border-border/80" />
        <span className="absolute right-4 top-4 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-placeholder-ink">
          {afterLabel}
        </span>
      </div>
      <div
        className="absolute inset-y-0 z-10 w-px bg-foreground"
        style={{ left: `${value}%` }}
        aria-hidden="true"
      />
      <label className="sr-only" htmlFor={id}>
        Compare before and after
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        className="absolute inset-0 z-20 cursor-ew-resize opacity-0"
      />
    </div>
  );
}
