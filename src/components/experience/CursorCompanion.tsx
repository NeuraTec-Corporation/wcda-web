"use client";

import { useEffect, useRef } from "react";
import { useExperience } from "@/components/experience/useExperience";

export function CursorCompanion() {
  const experience = useExperience();
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot || experience.cursorCompanion !== "subtle") {
      return;
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(pointer: fine)");
    if (motion.matches || !pointer.matches) {
      return;
    }

    let x = 0;
    let y = 0;
    let nextX = 0;
    let nextY = 0;
    let frame = 0;
    let armed = false;

    function tick() {
      x += (nextX - x) * 0.22;
      y += (nextY - y) * 0.22;
      if (dot) {
        dot.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      }
      frame = window.requestAnimationFrame(tick);
    }

    function onMove(event: PointerEvent) {
      nextX = event.clientX;
      nextY = event.clientY;
      if (!armed && dot) {
        armed = true;
        dot.style.opacity = "1";
      }
    }

    function onOver(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const interactive = target.closest("a, button, summary, input, select");
      dot?.toggleAttribute("data-active", Boolean(interactive));
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.cancelAnimationFrame(frame);
    };
  }, [experience.cursorCompanion]);

  if (experience.cursorCompanion !== "subtle") {
    return null;
  }

  return (
    <span
      ref={dotRef}
      className="exp-cursor pointer-events-none fixed left-0 top-0 z-[80] hidden size-2 rounded-full bg-accent/70 opacity-0 shadow-sm transition-[width,height] duration-150 data-[active]:size-4 md:block"
      aria-hidden="true"
    />
  );
}
