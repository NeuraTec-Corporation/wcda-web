import Link from "next/link";
import { siteConfig } from "@/config/site";
import { headerCta, headerNav } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <Container className="flex min-w-0 flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link
          href="/"
          className="flex min-w-0 flex-col gap-1 rounded-sm text-foreground no-underline hover:text-primary"
        >
          <span className="text-base font-semibold tracking-tight sm:text-lg">
            {siteConfig.shortName}
          </span>
          <span className="text-sm font-normal leading-snug text-muted">
            {siteConfig.name}
          </span>
        </Link>
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:justify-end lg:gap-6">
          <nav aria-label="Primary" className="min-w-0">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {headerNav.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <TextLink href={item.href}>{item.label}</TextLink>
                </li>
              ))}
            </ul>
          </nav>
          <Button href={headerCta.href} className="self-start">
            {headerCta.label}
          </Button>
        </div>
      </Container>
    </header>
  );
}
