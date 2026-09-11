"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { useExperience } from "@/components/experience/useExperience";
import {
  applyScopedElementFills,
  scopedElementFillCss,
} from "@/config/scoped-colors";

export function ScopedColorRuntime() {
  const pathname = usePathname();
  const experience = useExperience();
  const scopedColors = experience.scopedColors;

  useLayoutEffect(() => {
    let frame = 0;
    const paint = () => applyScopedElementFills(scopedColors);
    const schedule = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(paint);
    };

    paint();
    schedule();

    const root = document.getElementById("main-content") ?? document.body;
    const observer = new MutationObserver(schedule);
    observer.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [pathname, scopedColors]);

  return (
    <style
      id="wcda-scoped-element-fills"
      dangerouslySetInnerHTML={{
        __html: scopedElementFillCss(scopedColors),
      }}
    />
  );
}
