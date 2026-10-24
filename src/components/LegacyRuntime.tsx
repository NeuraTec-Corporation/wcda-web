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
    const cleanupServices: Array<() => void> = [];

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
        // Smooth services carousel; keep the original cards and responsive counts.
        $('.services3 .owl-carousel').each(function (_index, element) {
          const carousel = $(element);
          const instance = carousel.data("owl.carousel") as {
            options: Record<string, unknown>;
          } | undefined;
          if (!instance) return;
          const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
          const configure = () => {
            Object.assign(instance.options, {
              autoplay: !motion.matches, autoplayTimeout: 6000,
              autoplaySpeed: motion.matches ? 0 : 1400,
              smartSpeed: motion.matches ? 0 : 1400,
              navSpeed: motion.matches ? 0 : 1400,
              dotsSpeed: motion.matches ? 0 : 1400,
              slideTransition: "ease-in-out", slideBy: 1,
              nav: true, autoplayHoverPause: true, rtl: false,
            });
            carousel.trigger("refresh.owl.carousel");
            carousel.find('.owl-prev').attr({ 'aria-label': 'Previous services', title: 'Previous services' });
            carousel.find('.owl-next').attr({ 'aria-label': 'Next services', title: 'Next services' });
            carousel.find('.owl-prev span, .owl-next span').attr('aria-hidden', 'true');
            if (motion.matches || element.contains(document.activeElement)) {
              carousel.trigger('stop.owl.autoplay');
            } else {
              carousel.trigger('play.owl.autoplay', [6000, 1400]);
            }
          };
          configure();
          carousel.on('focusin.wcdaServices', () => carousel.trigger('stop.owl.autoplay'));
          carousel.on('focusout.wcdaServices', (event) => {
            if (!motion.matches && !element.contains(event.relatedTarget as Node | null)) {
              carousel.trigger('play.owl.autoplay', [6000, 1400]);
            }
          });
          motion.addEventListener('change', configure);
          cleanupServices.push(() => {
            motion.removeEventListener('change', configure);
            carousel.off('.wcdaServices');
          });
        });
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
      cleanupServices.forEach((cleanup) => cleanup());
      $(".owl-carousel.owl-loaded").each(function destroyCarousel() {
        $(this).trigger("destroy.owl.carousel");
      });
      $(".mfp-wrap, .mfp-bg, .YouTubePopUp-Wrap").remove();
      loadedScripts.forEach((script) => script.remove());
    };
  }, []);

  return children;
}
