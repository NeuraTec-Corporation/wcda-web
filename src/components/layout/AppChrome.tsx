"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  SiteFooter,
  SiteHeader,
  SiteUtilityBar,
  SkipToContent,
} from "@/components/layout";

type AppChromeProps = {
  children: ReactNode;
};

export function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname();
  const isThemeLab = pathname.startsWith("/foundation/theme");

  if (isThemeLab) {
    return children;
  }

  return (
    <>
      <SkipToContent />
      <SiteUtilityBar />
      <SiteHeader />
      <main id="main-content" className="min-w-0 flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
