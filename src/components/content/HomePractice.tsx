"use client";

import { useSiteContent } from "@/components/content/useSiteContent";
import { PracticeIntroduction } from "@/components/sections/PracticeIntroduction";
import { resolveHomePractice } from "@/config/site-content";

export function HomePractice() {
  const patch = useSiteContent();
  const content = resolveHomePractice(patch);
  return <PracticeIntroduction {...content} />;
}
