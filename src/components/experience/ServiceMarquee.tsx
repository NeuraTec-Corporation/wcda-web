"use client";

import { getMarqueeServices } from "@/data/services";
import { cn } from "@/lib/cn";
import { ServiceGlyph } from "@/components/experience/ExperienceGlyphs";
import { useExperience } from "@/components/experience/useExperience";

const surfaceClasses = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
  dark: "bg-surface-strong text-on-strong",
} as const;

const spacingClasses = {
  compact: "gap-5 px-4",
  comfortable: "gap-10 px-6",
  wide: "gap-16 px-8",
} as const;

const heightClasses = {
  compact: "py-2 text-[0.6875rem]",
  standard: "py-3 text-[0.75rem]",
  large: "py-4 text-sm",
} as const;

export function ServiceMarquee() {
  const experience = useExperience();
  const services = getMarqueeServices();

  if (services.length === 0) {
    return null;
  }

  const items = [...services, ...services];
  const duration = experience.marquee.speed === "slow" ? "48s" : "28s";
  const names = services.map((item) => item.title);

  return (
    <div
      className={cn(
        "exp-marquee border-y border-border",
        surfaceClasses[experience.marquee.surface],
      )}
      data-visual-target="home-marquee"
      data-marquee-dir={experience.marquee.direction}
      data-marquee-pause={experience.marquee.pauseOnHover ? "true" : "false"}
      style={{ ["--exp-marquee-duration" as string]: duration }}
    >
      <p className="sr-only">{names.join(", ")}</p>
      <div
        className={cn(
          "exp-marquee-track items-center",
          spacingClasses[experience.marquee.spacing],
          heightClasses[experience.marquee.height],
        )}
        aria-hidden="true"
      >
        {items.map((item, index) => (
          <p
            key={`${item.slug}-${index}`}
            className="flex shrink-0 items-center gap-2 font-medium uppercase tracking-[0.18em]"
          >
            {experience.marquee.layout === "icon-text" ? (
              <ServiceGlyph slug={item.slug} className="size-4 shrink-0" />
            ) : null}
            <span>{item.title}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
