import { cn } from "@/lib/cn";
import type { SocialPlatform } from "@/types/contact";

type SocialIconLinkProps = {
  href: string;
  label: string;
  platform: SocialPlatform;
  className?: string;
};

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="16.7" cy="7.3" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SocialIconLink({
  href,
  label,
  platform,
  className,
}: SocialIconLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 text-sm font-medium text-current underline-offset-4 hover:text-accent hover:underline",
        className,
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      {platform === "instagram" ? <InstagramIcon /> : null}
      <span>{label}</span>
    </a>
  );
}
