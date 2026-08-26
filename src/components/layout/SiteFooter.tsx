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
import { footerLegalNav, footerNav, headerCta } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HoursList } from "@/components/ui/HoursList";
import { SocialIconLink } from "@/components/experience/SocialIconLink";
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
            ? "grid min-w-0 gap-10 py-12 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8"
            : "grid min-w-0 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        <div className="min-w-0 max-w-xs">
          <p className="text-sm font-semibold tracking-[0.22em] text-foreground">
            {siteConfig.shortName}
          </p>
          <p className="mt-2 text-sm font-medium leading-snug text-foreground">
            {siteConfig.name}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {siteConfig.footerNote}
          </p>
          {socialLinks.length > 0 ? (
            <ul className="mt-5 flex min-w-0 flex-col">
              {socialLinks.map((link) => (
                <li key={link.platform}>
                  <SocialIconLink
                    href={link.url}
                    label={link.label}
                    platform={link.platform}
                    className="min-h-10 text-muted"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <nav aria-label="Footer">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-foreground">
            Explore
          </p>
          <ul className="mt-3 flex flex-col">
            {footerNav.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <TextLink href={item.href}>{item.label}</TextLink>
              </li>
            ))}
          </ul>
        </nav>
        {showOffice ? (
          <div className="min-w-0">
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-foreground">
              Office
            </p>
            <ul className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-muted">
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
            </ul>
            {hours ? (
              <div className="mt-8">
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-foreground">
                  Hours
                </p>
                <HoursList
                  entries={hours.entries}
                  lines={hours.lines}
                  className="mt-3 grid min-w-0 gap-2.5 text-sm leading-relaxed text-muted"
                />
              </div>
            ) : null}
          </div>
        ) : null}
        <div className="min-w-0">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-foreground">
            Appointments
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {siteConfig.footerAppointmentNote}
          </p>
          <div className="mt-5">
            <Button href={headerCta.href}>{headerCta.label}</Button>
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex min-w-0 flex-col gap-3 border-t border-border py-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}
          </p>
          <div className="flex min-w-0 flex-col gap-2 sm:items-end">
            <nav aria-label="Legal">
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                {footerLegalNav.map((item) => (
                  <li key={item.href}>
                    <TextLink href={item.href} className="min-h-0 text-sm">
                      {item.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </nav>
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
        </div>
      </Container>
    </footer>
  );
}
