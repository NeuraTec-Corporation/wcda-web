import Link from "next/link";
import { siteConfig } from "@/config/site";
import { headerNav } from "@/data/navigation";
import { Container } from "@/components/ui/Container";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <Container className="flex min-w-0 flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="min-w-0 rounded-sm text-foreground no-underline hover:text-primary"
        >
          <span className="block text-base font-semibold tracking-tight sm:text-lg">
            {siteConfig.shortName}
          </span>
          <span className="block text-sm font-normal text-muted">
            {siteConfig.name}
          </span>
        </Link>
        <nav aria-label="Primary" className="min-w-0">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 sm:justify-end">
            {headerNav.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
