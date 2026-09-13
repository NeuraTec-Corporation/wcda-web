"use client";

import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type TransitionEvent,
} from "react";
import { cn } from "@/lib/cn";
import { ArrowGlyph } from "@/components/experience/ExperienceGlyphs";
import { useExperience } from "@/components/experience/useExperience";

export type CarouselPresentation = {
  perViewDesktop?: 1 | 2 | 3;
  perViewMobile?: 1 | 2;
  step?: "item" | "page";
  loop?: boolean;
  autoplay?: boolean;
  arrows?: boolean;
  indicators?: boolean;
  variant?: "default" | "premium";
};

type ExperienceCarouselProps = {
  children: ReactNode[];
  label: string;
  presentation?: CarouselPresentation;
};

const PREMIUM_MOTION_MS = 650;
const PREMIUM_MOTION_EASE = "cubic-bezier(0.33, 1, 0.68, 1)";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function groupPages(items: ReactNode[], perView: number) {
  const pages: ReactNode[][] = [];
  for (let i = 0; i < items.length; i += perView) {
    pages.push(items.slice(i, i + perView));
  }
  return pages;
}

function PremiumCarouselSlide({
  items,
  perView,
  gap,
  listId,
  inert,
}: {
  items: ReactNode[];
  perView: number;
  gap: string;
  listId?: string;
  inert?: boolean;
}) {
  return (
    <ul
      id={listId}
      className="care-area-carousel-slide m-0 grid min-w-0 list-none p-0"
      inert={inert ? true : undefined}
      style={{
        gridTemplateColumns: `repeat(${perView}, minmax(0, 1fr))`,
        columnGap: gap,
      }}
    >
      {items.map((child, offset) => (
        <li key={offset} className="min-w-0">
          {isValidElement(child) ? cloneElement(child) : child}
        </li>
      ))}
    </ul>
  );
}

export function ExperienceCarousel({
  children,
  label,
  presentation,
}: ExperienceCarouselProps) {
  const experience = useExperience();
  const items = children.filter(Boolean);
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const [trackIndex, setTrackIndex] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(0);
  const startX = useRef<number | null>(null);
  const swipedRef = useRef(false);
  const pausedRef = useRef(false);
  const busyRef = useRef(false);
  const instantRef = useRef(false);
  const trackIndexRef = useRef(1);
  const indexRef = useRef(0);
  const lockTimer = useRef(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const id = useId();
  const statusId = `${id}-status`;
  const premium = presentation?.variant === "premium";
  const step = presentation?.step ?? "item";
  const loop = presentation?.loop ?? false;
  const requestedDesktop =
    presentation?.perViewDesktop ?? experience.carousel.cardsPerView;
  const requestedMobile = presentation?.perViewMobile ?? 1;
  const [perView, setPerView] = useState(requestedDesktop);
  const pageStep = step === "page" ? perView : 1;
  const maxIndex =
    step === "page"
      ? Math.max(0, (Math.ceil(count / Math.max(perView, 1)) - 1) * perView)
      : Math.max(0, count - perView);
  const pageCount = maxIndex / pageStep + 1;
  const safeIndex =
    step === "page"
      ? Math.min(Math.floor(index / pageStep) * pageStep, maxIndex)
      : Math.min(index, maxIndex);
  const page = Math.floor(safeIndex / pageStep);
  const pages = groupPages(items, perView);
  const showArrows =
    presentation?.arrows ??
    (experience.carousel.navigation === "arrows" ||
      experience.carousel.navigation === "both");
  const showDots =
    presentation?.indicators ??
    (experience.carousel.navigation === "dots" ||
      experience.carousel.navigation === "both");
  const autoplayOn =
    presentation?.autoplay === false
      ? false
      : experience.carousel.autoplay === "slow";

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    return () => window.clearTimeout(lockTimer.current);
  }, []);

  const setTrack = useCallback((next: number, withoutMotion = false) => {
    trackIndexRef.current = next;
    if (withoutMotion) {
      instantRef.current = true;
      setInstant(true);
    }
    setTrackIndex(next);
  }, []);

  const finishPremiumMotion = useCallback(() => {
    if (!busyRef.current) {
      return;
    }
    window.clearTimeout(lockTimer.current);
    const visual = trackIndexRef.current;
    if (loop && visual === 0) {
      setTrack(pageCount, true);
    } else if (loop && visual === pageCount + 1) {
      setTrack(1, true);
    }
    window.requestAnimationFrame(() => {
      instantRef.current = false;
      setInstant(false);
      busyRef.current = false;
    });
  }, [loop, pageCount, setTrack]);

  useEffect(() => {
    function update() {
      const width = window.innerWidth;
      if (premium) {
        setPerView(width < 768 ? requestedMobile : requestedDesktop);
        return;
      }
      if (width < 640) {
        setPerView(1);
        return;
      }
      if (width < 1024) {
        setPerView(Math.min(requestedDesktop, 2) as 1 | 2 | 3);
        return;
      }
      setPerView(requestedDesktop);
    }

    const frame = window.requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
    };
  }, [premium, requestedDesktop, requestedMobile]);

  useEffect(() => {
    if (!premium) {
      return;
    }
    const node = viewportRef.current;
    if (!node) {
      return;
    }
    const update = () => setViewportWidth(node.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [premium]);

  useEffect(() => {
    if (!premium) {
      return;
    }
    const logical = Math.min(
      Math.max(0, Math.floor(indexRef.current / pageStep)),
      Math.max(0, pageCount - 1),
    );
    const nextTrack = loop ? logical + 1 : logical;
    setTrack(nextTrack, true);
    const frame = window.requestAnimationFrame(() => {
      instantRef.current = false;
      setInstant(false);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [loop, pageCount, pageStep, perView, premium, setTrack]);

  const goToStart = useCallback(
    (nextStart: number, wraps = false, dir?: 1 | -1) => {
      if (premium && busyRef.current) {
        return;
      }
      const nextPage = Math.round(nextStart / pageStep);
      const bounded = loop
        ? (((nextPage % pageCount) + pageCount) % pageCount) * pageStep
        : Math.min(maxIndex, Math.max(0, nextStart));

      if (premium && bounded !== safeIndex) {
        const destLogical = Math.floor(bounded / pageStep);
        let nextVisual = loop ? destLogical + 1 : destLogical;
        if (wraps && dir === 1) {
          nextVisual = trackIndexRef.current + 1;
        } else if (wraps && dir === -1) {
          nextVisual = trackIndexRef.current - 1;
        }
        if (reduceMotion) {
          busyRef.current = false;
          setIndex(bounded);
          setTrack(loop ? destLogical + 1 : destLogical, true);
          window.requestAnimationFrame(() => {
            instantRef.current = false;
            setInstant(false);
          });
          return;
        }
        busyRef.current = true;
        window.clearTimeout(lockTimer.current);
        setIndex(bounded);
        setTrack(nextVisual);
        lockTimer.current = window.setTimeout(
          finishPremiumMotion,
          PREMIUM_MOTION_MS + 100,
        );
        return;
      }

      if (wraps && loop) {
        setInstant(true);
        setIndex(bounded);
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => setInstant(false));
        });
        return;
      }
      setIndex(bounded);
    },
    [finishPremiumMotion, loop, maxIndex, pageCount, pageStep, premium, reduceMotion, safeIndex, setTrack],
  );

  const goBy = useCallback(
    (deltaPages: number) => {
      const currentPage = Math.floor(safeIndex / pageStep);
      const nextPage = currentPage + deltaPages;
      const wraps = loop && (nextPage < 0 || nextPage >= pageCount);
      goToStart(
        (currentPage + deltaPages) * pageStep,
        wraps,
        deltaPages < 0 ? -1 : 1,
      );
    },
    [goToStart, loop, pageCount, pageStep, safeIndex],
  );

  function onPremiumTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (event.propertyName !== "transform") {
      return;
    }
    if (instantRef.current) {
      return;
    }
    finishPremiumMotion();
  }

  useEffect(() => {
    if (!autoplayOn || count <= perView) {
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
      setIndex((current) => (current >= maxIndex ? 0 : current + pageStep));
    }, 6000);

    function onVisibility() {
      pausedRef.current = document.hidden;
    }

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [autoplayOn, count, maxIndex, pageStep, perView]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goBy(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goBy(-1);
    }
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }
    swipedRef.current = false;
    startX.current = event.clientX;
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (startX.current === null) {
      return;
    }
    const delta = event.clientX - startX.current;
    startX.current = null;
    if (delta > 40) {
      swipedRef.current = true;
      goBy(-1);
    }
    if (delta < -40) {
      swipedRef.current = true;
      goBy(1);
    }
  }

  function onPointerCancel() {
    startX.current = null;
  }

  function onSwipeClickCapture(event: { preventDefault: () => void; stopPropagation: () => void }) {
    if (!swipedRef.current) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    swipedRef.current = false;
  }

  if (count === 0) {
    return null;
  }

  const gap = premium ? "1.5rem" : "0px";
  const trackStyle = {
    transform: `translateX(-${(100 / perView) * safeIndex}%)`,
  };
  const slideWidth = viewportWidth;
  const premiumTrackStyle: CSSProperties | undefined =
    slideWidth > 0
      ? {
          transform: `translate3d(${-trackIndex * slideWidth}px, 0, 0)`,
          transition:
            instant || reduceMotion
              ? "none"
              : `transform ${PREMIUM_MOTION_MS}ms ${PREMIUM_MOTION_EASE}`,
        }
      : undefined;

  const prevDisabled = !loop && safeIndex === 0;
  const nextDisabled = !loop && safeIndex >= maxIndex;
  const arrowClass = premium
    ? "grid size-10 shrink-0 place-items-center rounded-full border border-primary/35 bg-background text-primary transition-[color,background-color,border-color,transform] duration-100 ease-out hover:border-primary hover:bg-primary hover:text-primary-foreground active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-40 motion-reduce:transform-none sm:size-11"
    : "grid size-11 place-items-center rounded-full border border-border bg-surface text-foreground";
  const prevLabel = premium
    ? "Previous dental care services"
    : "Previous";
  const nextLabel = premium ? "Next dental care services" : "Next";

  const prevButton = showArrows ? (
    <button
      type="button"
      className={arrowClass}
      onClick={() => goBy(-1)}
      aria-label={prevLabel}
      disabled={prevDisabled}
    >
      <ArrowGlyph className="size-4 rotate-180" />
    </button>
  ) : (
    <span />
  );
  const nextButton = showArrows ? (
    <button
      type="button"
      className={arrowClass}
      onClick={() => goBy(1)}
      aria-label={nextLabel}
      disabled={nextDisabled}
    >
      <ArrowGlyph className="size-4" />
    </button>
  ) : (
    <span />
  );

  const dots = showDots ? (
    <div
      className={cn("flex justify-center gap-2", premium ? "mt-5" : "mt-4")}
      role={premium ? "group" : "tablist"}
      aria-label={premium ? "Carousel pages" : "Slides"}
    >
      {Array.from({ length: pageCount }, (_, dot) => (
        <button
          key={dot}
          type="button"
          role={premium ? undefined : "tab"}
          aria-current={dot === page ? "true" : undefined}
          aria-selected={premium ? undefined : dot === page}
          aria-controls={id}
          className={cn(
            premium
              ? "size-1.5 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              : "size-2.5 rounded-full border border-border",
            dot === page
              ? "bg-primary"
              : premium
                ? "bg-primary/25"
                : "bg-transparent",
          )}
          onClick={() => goToStart(dot * pageStep)}
        >
          <span className="sr-only">
            {premium ? `Page ${dot + 1} of ${pageCount}` : `Slide ${dot + 1}`}
          </span>
        </button>
      ))}
    </div>
  ) : null;

  const defaultTrack = (
    <div className="min-w-0 overflow-hidden">
      <ul
        id={premium ? undefined : id}
        className={cn(
          "flex min-w-0 transition-transform duration-500 ease-out motion-reduce:transition-none",
          instant && "transition-none",
        )}
        style={trackStyle}
      >
        {items.map((child, itemIndex) => {
          const hidden =
            itemIndex < safeIndex || itemIndex >= safeIndex + perView;
          return (
            <li
              key={itemIndex}
              className="min-w-0 shrink-0 grow-0 px-1.5"
              style={{ width: `${100 / perView}%` }}
              aria-hidden={hidden}
            >
              {child}
            </li>
          );
        })}
      </ul>
    </div>
  );

  const slideStyle: CSSProperties | undefined =
    slideWidth > 0
      ? { flex: `0 0 ${slideWidth}px`, width: slideWidth }
      : { flex: "0 0 100%", width: "100%" };

  function renderSlide(pageItems: ReactNode[], key: string, active: boolean) {
    return (
      <div key={key} className="min-w-0" style={slideStyle} aria-hidden={!active}>
        <PremiumCarouselSlide
          items={pageItems}
          perView={perView}
          gap={gap}
          listId={active ? id : undefined}
          inert={!active}
        />
      </div>
    );
  }

  const lastPage = pages[pages.length - 1] ?? [];
  const firstPage = pages[0] ?? [];
  const premiumTrack = (
    <div
      ref={viewportRef}
      className="care-area-carousel-viewport relative isolate min-w-0 overflow-hidden"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onClickCapture={onSwipeClickCapture}
      style={{ touchAction: "pan-y" }}
    >
      <div
        className="care-area-carousel-track"
        data-instant={instant || reduceMotion ? "1" : "0"}
        style={premiumTrackStyle}
        onTransitionEnd={onPremiumTransitionEnd}
      >
        {loop ? renderSlide(lastPage, "clone-last", false) : null}
        {pages.map((pageItems, pageIndex) =>
          renderSlide(pageItems, `page-${pageIndex}`, pageIndex === page),
        )}
        {loop ? renderSlide(firstPage, "clone-first", false) : null}
      </div>
    </div>
  );

  const track = premium ? premiumTrack : defaultTrack;

  return (
    <div
      className={cn(
        "min-w-0 overflow-x-clip",
        premium ? "care-area-carousel" : "exp-carousel",
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      aria-describedby={statusId}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={premium ? undefined : onPointerDown}
      onPointerUp={premium ? undefined : onPointerUp}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <p id={statusId} className="sr-only" aria-live="polite">
        Page {page + 1} of {pageCount}
      </p>
      {premium ? (
        <>
          <div className="grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] items-center gap-2 sm:grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] sm:gap-4">
            {prevButton}
            {track}
            {nextButton}
          </div>
          {dots}
        </>
      ) : (
        <>
          {track}
          {showArrows ? (
            <div className="mt-4 flex items-center justify-end gap-2">
              {prevButton}
              {nextButton}
            </div>
          ) : null}
          {dots}
        </>
      )}
    </div>
  );
}
