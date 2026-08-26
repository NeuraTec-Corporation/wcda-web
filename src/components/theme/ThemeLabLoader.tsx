"use client";

import dynamic from "next/dynamic";

export const ThemeLabLoader = dynamic(
  () => import("./ThemeLab").then((module) => module.ThemeLab),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-dvh items-center justify-center bg-zinc-950 text-sm text-zinc-400">
        Loading Visual Experience Lab…
      </div>
    ),
  },
);
