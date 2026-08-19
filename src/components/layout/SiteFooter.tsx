import Link from "next/link";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/data/navigation";
import { Container } from "@/components/ui/Container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface-muted">
      <Container className="flex min-w-0 flex-col gap-8 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs min-w-0">
          <p className="text-base font-semibold text-foreground">
            {siteConfig.name}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {siteConfig.footerNote}
          </p>
          <p className="mt-3 text-sm text-muted">{siteConfig.location.label}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-col gap-1">
            {footerNav.map((item) => (
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
      <Container>
        <p className="border-t border-border py-4 text-sm text-muted">
          © {year} {siteConfig.name}
        </p>
      </Container>
    </footer>
  );
}
