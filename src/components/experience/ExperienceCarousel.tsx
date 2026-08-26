"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { ArrowGlyph } from "@/components/experience/ExperienceGlyphs";
import { useExperience } from "@/components/experience/useExperience";

type ExperienceCarouselProps = {
  children: ReactNode[];
  label: string;
};

export function ExperienceCarousel({ children, label }: ExperienceCarouselProps) {
  const experience = useExperience();
  const items = children.filter(Boolean);
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(experience.carousel.cardsPerView);
  const startX = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const id = useId();
  const maxIndex = Math.max(0, count - perView);
  const safeIndex = Math.min(index, maxIndex);
  const showArrows =
    experience.carousel.navigation === "arrows" ||
    experience.carousel.navigation === "both";
  const showDots =
    experience.carousel.navigation === "dots" ||
    experience.carousel.navigation === "both";

  useEffect(() => {
    const requested = experience.carousel.cardsPerView;

    function update() {
      const width = window.innerWidth;
      if (width < 640) {
        setPerView(1);
        return;
      }
      if (width < 1024) {
        setPerView(Math.min(requested, 2) as 1 | 2 | 3);
        return;
      }
      setPerView(requested);
    }

    const frame = window.requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
    };
  }, [experience.carousel.cardsPerView]);

  const go = useCallback(
    (next: number) => {
      const clamped = Math.min(maxIndex, Math.max(0, next));
      setIndex(clamped);
    },
    [maxIndex],
  );

  useEffect(() => {
    if (experience.carousel.autoplay !== "slow" || count <= perView) {
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      return;
    }

    const timer = window.setInterval(() => {
      if (pausedRef.current || document.hidden) {
        return;
      }
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 6000);

    function onVisibility() {
      pausedRef.current = document.hidden;
    }

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count, experience.carousel.autoplay, maxIndex, perView]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(safeIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(safeIndex - 1);
    }
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    startX.current = event.clientX;
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (startX.current === null) {
      return;
    }
    const delta = event.clientX - startX.current;
    startX.current = null;
    if (delta > 40) {
      go(safeIndex - 1);
    }
    if (delta < -40) {
      go(safeIndex + 1);
    }
  }

  if (count === 0) {
    return null;
  }

  return (
    <div
      className="exp-carousel min-w-0"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className="overflow-hidden">
        <ul
          className="flex min-w-0 transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{
            transform: `translateX(-${(100 / perView) * safeIndex}%)`,
          }}
        >
          {items.map((child, itemIndex) => (
            <li
              key={itemIndex}
              className="min-w-0 shrink-0 grow-0 px-1.5"
              style={{ width: `${100 / perView}%` }}
              aria-hidden={itemIndex < safeIndex || itemIndex >= safeIndex + perView}
            >
              {child}
            </li>
          ))}
        </ul>
      </div>
      {showArrows ? (
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-border bg-surface text-foreground"
            onClick={() => go(safeIndex - 1)}
            aria-label="Previous"
            disabled={safeIndex === 0}
          >
            <ArrowGlyph className="size-4 rotate-180" />
          </button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-border bg-surface text-foreground"
            onClick={() => go(safeIndex + 1)}
            aria-label="Next"
            disabled={safeIndex >= maxIndex}
          >
            <ArrowGlyph className="size-4" />
          </button>
        </div>
      ) : null}
      {showDots ? (
        <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Slides">
          {Array.from({ length: maxIndex + 1 }, (_, dot) => (
            <button
              key={dot}
              type="button"
              role="tab"
              aria-selected={dot === safeIndex}
              aria-controls={id}
              className={cn(
                "size-2.5 rounded-full border border-border",
                dot === safeIndex ? "bg-primary" : "bg-transparent",
              )}
              onClick={() => go(dot)}
            >
              <span className="sr-only">Slide {dot + 1}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
