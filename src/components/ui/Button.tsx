import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import type { ButtonSize, ButtonVariant } from "@/types/ui";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
  outline:
    "border border-border bg-surface text-foreground hover:bg-surface-muted",
  ghost: "bg-transparent text-foreground hover:bg-surface-muted",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 gap-1.5 px-3 text-sm",
  md: "min-h-11 gap-2 px-4 text-sm",
  lg: "min-h-12 gap-2 px-5 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-50";

type ButtonSharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsButtonProps = ButtonSharedProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonSharedProps> & {
    href?: undefined;
  };

type ButtonAsLinkProps = ButtonSharedProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonSharedProps> & {
    href: ComponentPropsWithoutRef<typeof Link>["href"];
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ("href" in props && props.href !== undefined) {
    return <Link className={classes} {...props} />;
  }

  const { type = "button", ...buttonProps } = props;

  return <button type={type} className={classes} {...buttonProps} />;
}
