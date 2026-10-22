"use client";

import $ from "jquery";
import { useEffect, type ReactNode } from "react";

const originalScripts = [
  "jquery-migrate-3.5.0.min.js",
  "popper.min.js",
  "bootstrap.min.js",
  "modernizr-2.6.2.min.js",
  "imagesloaded.pkgd.min.js",
  "jquery.isotope.v3.0.2.js",
  "scrollIt.min.js",
  "jquery.waypoints.min.js",
  "owl.carousel.min.js",
  "jquery.stellar.min.js",
  "jquery.magnific-popup.js",
  "YouTubePopUp.js",
  "smooth-scroll.min.js",
  "wow.min.js",
  "custom.js",
] as const;

function loadScript(fileName: string) {
  return new Promise<HTMLScriptElement>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `/wcda-assets/js/${fileName}`;
    script.dataset.wcdaOriginalScript = fileName;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Could not load original script: ${fileName}`));
    document.body.appendChild(script);
  });
}

export default function LegacyRuntime({ children }: { children: ReactNode }) {
  useEffect(() => {
    let disposed = false;
    const loadedScripts: HTMLScriptElement[] = [];

    window.$ = $;
    window.jQuery = $;

    void (async () => {
      for (const fileName of originalScripts) {
        const script = await loadScript(fileName);
        loadedScripts.push(script);
        if (disposed) break;
      }
      // H07/A04: the approved teams have three cards, not four visible slots.
      // Run after the original ready handler; preserve its mobile behavior.
      $(() => {
        if (disposed) return;
        $('.team[data-approved-team="three"] .owl-carousel').each(function () {
          const carousel = $(this);
          const instance = carousel.data("owl.carousel") as {
            options: { responsive: Record<number, { items: number }> };
          } | undefined;
          if (instance?.options.responsive[1000]) {
            instance.options.responsive[1000].items = 3;
            carousel.trigger("refresh.owl.carousel");
          }
        });
      });
    })().catch((error: unknown) => {
      console.error(error);
    });

    return () => {
      disposed = true;
      $(".owl-carousel.owl-loaded").each(function destroyCarousel() {
        $(this).trigger("destroy.owl.carousel");
      });
      $(".mfp-wrap, .mfp-bg, .YouTubePopUp-Wrap").remove();
      loadedScripts.forEach((script) => script.remove());
    };
  }, []);

  return children;
}
