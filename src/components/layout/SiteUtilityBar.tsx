import { siteConfig } from "@/config/site";
import { getUtilityLinks } from "@/data/navigation";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";

export function SiteUtilityBar() {
  return (
    <div className="border-b border-border bg-surface-muted">
      <Container className="flex min-w-0 flex-col gap-2 py-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">{siteConfig.identity.label}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {getUtilityLinks().map((item) => (
            <li key={`${item.href}-${item.label}`}>
              <TextLink href={item.href}>{item.label}</TextLink>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
