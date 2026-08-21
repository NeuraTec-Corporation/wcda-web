import Link from "next/link";
import { siteConfig } from "@/config/site";
import { headerCta, headerNav } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";

function BrandMark() {
  return (
    <Link
      href="/"
      className="flex min-w-0 flex-col gap-0.5 rounded-sm text-foreground no-underline hover:text-primary"
    >
      <span className="text-base font-semibold tracking-tight sm:text-lg">
        {siteConfig.shortName}
      </span>
      <span className="hidden max-w-[13rem] text-xs font-normal leading-snug text-muted sm:block">
        {siteConfig.name}
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-sm">
      <Container className="flex min-w-0 items-center justify-between gap-4 py-3">
        <BrandMark />
        <nav aria-label="Primary" className="hidden min-w-0 lg:block">
          <ul className="flex flex-wrap items-center gap-x-5">
            {headerNav.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <TextLink href={item.href} className="min-h-10">
                  {item.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button href={headerCta.href} className="hidden shrink-0 lg:inline-flex">
          {headerCta.label}
        </Button>
        <details className="relative lg:hidden">
          <summary className="flex min-h-11 cursor-pointer items-center justify-center rounded-md border border-border bg-surface px-3 text-sm font-medium text-foreground">
            Menu
          </summary>
          <div className="absolute right-0 z-50 mt-2 w-[min(calc(100vw-2rem),18rem)] rounded-lg border border-border bg-surface p-4 shadow-md">
            <nav aria-label="Primary">
              <ul className="flex flex-col">
                {headerNav.map((item) => (
                  <li key={`${item.href}-${item.label}`}>
                    <TextLink href={item.href}>{item.label}</TextLink>
                  </li>
                ))}
              </ul>
            </nav>
            <Button href={headerCta.href} className="mt-3 w-full">
              {headerCta.label}
            </Button>
          </div>
        </details>
      </Container>
    </header>
  );
}
