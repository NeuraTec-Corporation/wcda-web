import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { isNativeHref } from "@/lib/href";

const defaultClassName =
  "inline-flex min-h-11 items-center text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function TextLink({ href, children, className }: TextLinkProps) {
  const classes = cn(defaultClassName, className);

  if (isNativeHref(href)) {
    const isExternal = /^https?:/i.test(href);

    return (
      <a
        href={href}
        className={classes}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
