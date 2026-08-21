import { Button } from "@/components/ui/Button";
import type { NavItem } from "@/types/navigation";

type ActionRowProps = {
  primary?: NavItem;
  secondary?: NavItem;
  className?: string;
};

export function ActionRow({
  primary,
  secondary,
  className = "mt-stack flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap",
}: ActionRowProps) {
  if (!primary && !secondary) {
    return null;
  }

  return (
    <div className={className}>
      {primary ? <Button href={primary.href}>{primary.label}</Button> : null}
      {secondary ? (
        <Button href={secondary.href} variant="outline">
          {secondary.label}
        </Button>
      ) : null}
    </div>
  );
}
