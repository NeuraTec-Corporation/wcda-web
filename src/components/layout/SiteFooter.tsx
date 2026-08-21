import { siteConfig } from "@/config/site";
import {
  getCopyrightYear,
  getPublicAddress,
  getPublicEmail,
  getPublicHours,
  getPublicPhone,
  getPublicSiteCredits,
  getPublicSocialLinks,
} from "@/data/contact";
import { footerNav, headerCta } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HoursList } from "@/components/ui/HoursList";
import { TextLink } from "@/components/ui/TextLink";

export function SiteFooter() {
  const year = getCopyrightYear();
  const address = getPublicAddress();
  const phone = getPublicPhone();
  const hours = getPublicHours();
  const email = getPublicEmail();
  const socialLinks = getPublicSocialLinks();
  const credits = getPublicSiteCredits();
  const showOffice = Boolean(address || phone || hours || email);

  return (
    <footer className="mt-auto border-t border-border bg-surface-muted">
      <Container
        className={
          showOffice
            ? "grid min-w-0 gap-8 py-10 sm:grid-cols-2 xl:grid-cols-4"
            : "grid min-w-0 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        <div className="min-w-0 max-w-xs">
          <p className="text-base font-semibold tracking-tight text-foreground">
            {siteConfig.shortName}
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {siteConfig.name}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {siteConfig.footerNote}
          </p>
          {socialLinks.length > 0 ? (
            <ul className="mt-4 flex min-w-0 flex-col">
              {socialLinks.map((link) => (
                <li key={link.platform}>
                  <TextLink href={link.url}>{link.label}</TextLink>
                </li>
              ))}
            </ul>
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
        {showOffice ? (
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">Office</p>
            <ul className="mt-2 flex flex-col gap-3 text-sm leading-relaxed text-muted">
              {address ? (
                <li>
                  {address.line1}
                  <br />
                  {address.line2}
                </li>
              ) : null}
              {phone ? (
                <li>
                  <TextLink href={phone.href}>{phone.display}</TextLink>
                </li>
              ) : null}
              {email ? (
                <li className="break-words">
                  <TextLink href={email.href}>{email.display}</TextLink>
                </li>
              ) : null}
              {hours ? (
                <li>
                  <HoursList
                    entries={hours.entries}
                    lines={hours.lines}
                    className="grid min-w-0 gap-2 text-sm leading-relaxed text-muted"
                  />
                </li>
              ) : null}
            </ul>
          </div>
        ) : null}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">Appointments</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {siteConfig.footerAppointmentNote}
          </p>
          <div className="mt-4">
            <Button href={headerCta.href}>{headerCta.label}</Button>
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex min-w-0 flex-col gap-2 border-t border-border py-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}
          </p>
          {credits ? (
            <p>
              {credits.developerName && credits.developerUrl ? (
                <TextLink href={credits.developerUrl} className="min-h-0">
                  {credits.developerName}
                </TextLink>
              ) : credits.developerName ? (
                credits.developerName
              ) : null}
              {credits.partnerName ? (
                <>
                  {credits.developerName ? " · " : null}
                  {credits.partnerUrl ? (
                    <TextLink href={credits.partnerUrl} className="min-h-0">
                      {credits.partnerName}
                    </TextLink>
                  ) : (
                    credits.partnerName
                  )}
                </>
              ) : null}
            </p>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
