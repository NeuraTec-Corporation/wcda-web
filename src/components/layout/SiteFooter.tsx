import { siteConfig } from "@/config/site";
import { getPublicAddress, getPublicPhone } from "@/data/contact";
import { footerNav, headerCta } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const address = getPublicAddress();
  const phone = getPublicPhone();

  return (
    <footer className="mt-auto border-t border-border bg-surface-muted">
      <Container className="grid min-w-0 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div className="max-w-xs min-w-0">
          <p className="text-base font-semibold text-foreground">
            {siteConfig.name}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {siteConfig.footerNote}
          </p>
          {address ? (
            <p className="mt-3 text-sm text-muted">
              {address.line1}
              <br />
              {address.line2}
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted">
              {siteConfig.identity.label}
            </p>
          )}
          {phone ? (
            <p className="mt-2">
              <TextLink href={phone.href}>{phone.display}</TextLink>
            </p>
          ) : null}
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-semibold text-foreground">Explore</p>
          <ul className="mt-2 flex flex-col">
            {footerNav.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <TextLink href={item.href}>{item.label}</TextLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">Appointments</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Use the appointment page to start a visit request.
          </p>
          <div className="mt-4">
            <Button href={headerCta.href}>{headerCta.label}</Button>
          </div>
        </div>
      </Container>
      <Container>
        <p className="border-t border-border py-4 text-sm text-muted">
          © {year} {siteConfig.name}
        </p>
      </Container>
    </footer>
  );
}
