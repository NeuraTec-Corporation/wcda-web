"use client";

import { useSiteContent } from "@/components/content/useSiteContent";
import { Hero } from "@/components/sections/Hero";
import { resolveHomeHero } from "@/config/site-content";

export function HomeHero() {
  const patch = useSiteContent();
  const hero = resolveHomeHero(patch);
  return <Hero {...hero} />;
}
