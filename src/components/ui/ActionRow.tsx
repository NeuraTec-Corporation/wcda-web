import { Button } from "@/components/ui/Button";
import type { NavItem } from "@/types/navigation";

type ActionRowProps = {
  primary?: NavItem;
  secondary?: NavItem;
  className?: string;
  primaryContentTarget?: string;
  secondaryContentTarget?: string;
};

export function ActionRow({
  primary,
  secondary,
  className = "mt-stack flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap",
  primaryContentTarget,
  secondaryContentTarget,
}: ActionRowProps) {
  if (!primary && !secondary) {
    return null;
  }

  return (
    <div className={className}>
      {primary ? (
        <span data-content-target={primaryContentTarget}>
          <Button href={primary.href}>{primary.label}</Button>
        </span>
      ) : null}
      {secondary ? (
        <span data-content-target={secondaryContentTarget}>
          <Button href={secondary.href} variant="outline">
            {secondary.label}
          </Button>
        </span>
      ) : null}
    </div>
  );
}
