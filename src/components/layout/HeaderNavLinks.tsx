"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { headerNav } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { usePublicationPreview } from "@/components/content/PublicationGate";
import { resolvePageEnabled } from "@/config/content-publication";
import { getContentPageByPath } from "@/config/publication-catalog";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function suppressMouseFocus(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
}

export function HeaderNavLinks({ stacked = false }: { stacked?: boolean }) {
  const pathname = usePathname();
  const publication = usePublicationPreview();
  const items = headerNav.filter((item) => {
    const page = getContentPageByPath(item.href);
    if (!page) {
      return true;
    }
    return resolvePageEnabled(publication, page.id);
  });

  return (
    <ul
      className={
        stacked ? "flex flex-col" : "flex flex-wrap items-center gap-x-6"
      }
    >
      {items.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <li key={`${item.href}-${item.label}`}>
            <Link
              href={item.href}
              onMouseDown={suppressMouseFocus}
              className={cn(
                "inline-flex items-center rounded-md px-2 -mx-2 font-medium tracking-tight no-underline transition-colors duration-200 motion-reduce:transition-none visited:no-underline focus:no-underline focus-visible:no-underline active:no-underline hover:[text-decoration-line:var(--theme-nav-hover-decoration)!important]",
                stacked ? "min-h-11 text-sm" : "min-h-10 text-[0.9375rem]",
                active
                  ? "bg-transparent text-nav-active hover:bg-transparent hover:!text-nav-active"
                  : "text-foreground hover:!text-nav-hover hover:bg-nav-halo-active",
              )}
            >
              <span
                className={
                  active
                    ? "shadow-[0_1.5px_0_0_var(--color-nav-underline)]"
                    : undefined
                }
              >
                {item.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
