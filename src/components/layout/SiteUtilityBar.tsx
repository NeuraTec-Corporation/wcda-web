import Link from "next/link";
import { siteConfig } from "@/config/site";
import { utilityNav } from "@/data/navigation";
import { Container } from "@/components/ui/Container";

export function SiteUtilityBar() {
  return (
    <div className="border-b border-border bg-surface-muted">
      <Container className="flex min-w-0 flex-col gap-2 py-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">{siteConfig.location.label}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {utilityNav.map((item) => (
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
      </Container>
    </div>
  );
}
