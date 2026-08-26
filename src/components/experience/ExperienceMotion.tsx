"use client";

import { useEffect } from "react";
import { useExperience } from "@/components/experience/useExperience";
import { isMotionTarget } from "@/config/experience";

function motionNodes() {
  return Array.from(document.querySelectorAll("[data-visual-target]")).filter(
    (node): node is HTMLElement =>
      node instanceof HTMLElement && isMotionTarget(node.dataset.visualTarget),
  );
}

function clearMotion(node: HTMLElement) {
  node.classList.remove("exp-await", "exp-in");
  node.removeAttribute("data-exp-motion-target");
}

export function ExperienceMotion() {
  const experience = useExperience();

  useEffect(() => {
    const nodes = motionNodes();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    nodes.forEach(clearMotion);

    if (reduced.matches || experience.motion.entrance === "none") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!(entry.target instanceof HTMLElement)) {
            return;
          }

          const el = entry.target;
          if (entry.isIntersecting) {
            if (el.classList.contains("exp-await")) {
              el.classList.add("exp-in");
            } else {
              clearMotion(el);
            }
            observer.unobserve(el);
            return;
          }

          el.dataset.expMotionTarget = "";
          el.classList.remove("exp-in");
          el.classList.add("exp-await");
        });
      },
      { threshold: 0, rootMargin: "0px" },
    );

    nodes.forEach((node) => observer.observe(node));

    function onReduceChange() {
      if (reduced.matches) {
        observer.disconnect();
        motionNodes().forEach(clearMotion);
      }
    }

    reduced.addEventListener("change", onReduceChange);
    return () => {
      reduced.removeEventListener("change", onReduceChange);
      observer.disconnect();
      motionNodes().forEach(clearMotion);
    };
  }, [experience]);

  return null;
}
