import { cn } from "@/lib/cn";

type CompositionOffsetProps = {
  side: "left" | "right";
};

export function CompositionOffset({ side }: CompositionOffsetProps) {
  return (
    <div
      className={cn(
        "exp-composition-offset pointer-events-none absolute inset-0 rounded-lg border border-border",
        side === "left"
          ? "exp-composition-offset-left hidden lg:block"
          : "exp-composition-offset-right hidden md:block",
      )}
      aria-hidden="true"
    />
  );
}
