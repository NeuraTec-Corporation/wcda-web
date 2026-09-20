"use client";

import { useSiteContent } from "@/components/content/useSiteContent";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { resolveHomeWhyChoose } from "@/config/site-content";

export function HomeWhyChoose() {
  const patch = useSiteContent();
  const content = resolveHomeWhyChoose(patch);
  return <WhyChoose {...content} />;
}
