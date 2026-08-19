import Link from "next/link";
import { siteConfig } from "@/config/site";
import { headerNav } from "@/data/navigation";
import { Container } from "@/components/ui/Container";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <Container className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="rounded-sm text-foreground no-underline hover:text-primary"
        >
          <span className="block text-base font-semibold tracking-tight sm:text-lg">
            {siteConfig.shortName}
          </span>
          <span className="block text-sm font-normal text-muted">
            {siteConfig.name}
          </span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {headerNav.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
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
