"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { MediaFrame } from "@/components/ui/MediaFrame";
import {
  InfoGlyph,
  PlayGlyph,
  YoutubeMark,
} from "@/components/experience/ExperienceGlyphs";
import { useExperience } from "@/components/experience/useExperience";
import type { AspectRatioPreset } from "@/config/experience";

type VideoPreviewCardProps = {
  title?: string;
  mediaKey?: string;
  youtubeUrl?: string;
  className?: string;
};

function aspectValue(value: AspectRatioPreset) {
  return value === "auto" ? "16 / 9" : value;
}

export function VideoPreviewCard({
  title = "Video preview",
  mediaKey,
  youtubeUrl,
  className,
}: VideoPreviewCardProps) {
  const experience = useExperience();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const configured = Boolean(youtubeUrl);
  const aspect = aspectValue(experience.video.aspectRatio);
  const posterKey =
    experience.video.poster === "approved" ? mediaKey : undefined;

  useEffect(() => {
    if (!open) {
      return;
    }

    lastFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lastFocus.current?.focus();
    };
  }, [open]);

  function activate() {
    if (experience.video.mode === "external") {
      if (youtubeUrl) {
        window.open(youtubeUrl, "_blank", "noopener,noreferrer");
      }
      return;
    }
    if (experience.video.mode === "embed" && !youtubeUrl) {
      return;
    }
    setOpen(true);
  }

  return (
    <>
      <div
        className={cn(
          "exp-video-card relative overflow-hidden rounded-2xl border border-border bg-placeholder shadow-sm",
          className,
        )}
        data-container-preset={experience.video.container}
      >
        <div className="relative" style={{ aspectRatio: aspect }}>
          <MediaFrame
            mediaKey={posterKey}
            decorative
            aspectRatio={aspect}
            className="rounded-none border-0 shadow-none"
          />
          {experience.video.overlay !== "none" ? (
            <span
              className={cn(
                "pointer-events-none absolute inset-0",
                experience.video.overlay === "light" && "bg-white/20",
                experience.video.overlay === "dark" && "bg-black/35",
                experience.video.overlay === "brand" && "bg-primary/25",
              )}
            />
          ) : null}
          <button
            type="button"
            onClick={activate}
            className={cn(
              "absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-primary-foreground",
              experience.video.playButton === "solid" && "bg-primary",
              experience.video.playButton === "outline" &&
                "border-2 border-white bg-black/20 text-white",
              experience.video.playButton === "minimal" &&
                "bg-white/90 text-primary",
            )}
            aria-label={configured ? `Play ${title}` : `${title}, source not configured`}
          >
            <PlayGlyph className="size-5" />
          </button>
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-white">
            <YoutubeMark className="size-3" />
            YouTube
          </span>
          {experience.video.cornerAction !== "none" ? (
            <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-surface text-foreground shadow-sm">
              {experience.video.cornerAction === "info" ? (
                <InfoGlyph className="size-4" />
              ) : (
                <PlayGlyph className="size-4" />
              )}
            </span>
          ) : null}
        </div>
        {title ? (
          <p className="px-4 py-3 text-sm font-medium text-foreground">{title}</p>
        ) : null}
      </div>

      {open && experience.video.mode !== "external" ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <div className="w-full max-w-3xl overflow-hidden rounded-xl bg-background shadow-lg">
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
              <h2 id={titleId} className="text-sm font-semibold text-foreground">
                {title}
              </h2>
              <button
                ref={closeRef}
                type="button"
                className="min-h-11 rounded-md px-3 text-sm text-foreground"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="relative bg-placeholder" style={{ aspectRatio: aspect }}>
              {experience.video.mode === "embed" && youtubeUrl ? (
                <iframe
                  title={title}
                  src={youtubeUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-muted">
                  A YouTube source is not configured for this preview.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
