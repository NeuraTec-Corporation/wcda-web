import { siteConfig } from "@/config/site";
import { getUtilityLinks } from "@/data/navigation";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";

export function SiteUtilityBar() {
  return (
    <div className="border-b border-border bg-surface-muted">
      <Container className="flex min-w-0 items-center justify-between gap-3 py-2">
        <p className="min-w-0 text-[0.6875rem] tracking-[0.04em] text-muted sm:text-xs">
          {siteConfig.identity.label}
        </p>
        <ul className="flex min-w-0 flex-wrap justify-end gap-x-4 gap-y-1">
          {getUtilityLinks().map((item) => (
            <li key={`${item.href}-${item.label}`}>
              <TextLink
                href={item.href}
                className="min-h-9 text-xs font-medium sm:text-sm"
              >
                {item.label}
              </TextLink>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
