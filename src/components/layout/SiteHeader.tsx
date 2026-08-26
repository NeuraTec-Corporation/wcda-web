import { headerCta, headerNav } from "@/data/navigation";
import { HeaderLogo } from "@/components/experience/HeaderLogo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 text-foreground backdrop-blur-md">
      <Container className="flex min-w-0 items-center justify-between gap-4 py-[length:var(--theme-header-padding)] sm:py-[length:calc(var(--theme-header-padding)+0.125rem)]">
        <HeaderLogo />
        <nav aria-label="Primary" className="hidden min-w-0 lg:block">
          <ul className="flex flex-wrap items-center gap-x-6">
            {headerNav.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <TextLink
                  href={item.href}
                  className="min-h-10 text-[0.9375rem] font-medium tracking-tight text-foreground"
                >
                  {item.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button href={headerCta.href} className="hidden shrink-0 lg:inline-flex">
          {headerCta.label}
        </Button>
        <details className="lg:hidden">
          <summary className="flex min-h-11 cursor-pointer items-center justify-center rounded-md border border-border bg-surface px-3.5 text-sm font-medium text-foreground">
            Menu
          </summary>
          <div className="absolute left-0 right-0 top-full z-50 border-b border-border bg-surface shadow-md">
            <Container className="py-4">
              <nav aria-label="Primary">
                <ul className="flex flex-col">
                  {headerNav.map((item) => (
                    <li key={`${item.href}-${item.label}`}>
                      <TextLink href={item.href}>{item.label}</TextLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <Button href={headerCta.href} className="mt-4 w-full sm:w-auto">
                {headerCta.label}
              </Button>
            </Container>
          </div>
        </details>
      </Container>
    </header>
  );
}
