"use client";

import { usePathname } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import {
  SiteFooter,
  SiteHeader,
  SiteUtilityBar,
  SkipToContent,
} from "@/components/layout";
import { useExperience } from "@/components/experience/useExperience";
import { ScopedColorRuntime } from "@/components/experience/ScopedColorRuntime";
import { resolveLabPage } from "@/config/lab-registry";
import { scopedCanvasStyle } from "@/config/scoped-colors";

type AppChromeProps = {
  children: ReactNode;
};

export function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname();
  const isThemeLab = pathname.startsWith("/foundation/theme");
  const experience = useExperience();
  const page = resolveLabPage(pathname);
  const pageHex = page
    ? experience.scopedColors?.pages?.[page.id]
    : undefined;

  if (isThemeLab) {
    return children;
  }

  return (
    <>
      <ScopedColorRuntime />
      <SkipToContent />
      <SiteUtilityBar />
      <SiteHeader />
      <main
        id="main-content"
        className="min-w-0 flex-1"
        data-content-page={page?.id}
        style={scopedCanvasStyle(pageHex) as CSSProperties | undefined}
      >
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
