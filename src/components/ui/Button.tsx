import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { isNativeHref } from "@/lib/href";
import type { ButtonSize, ButtonVariant } from "@/types/ui";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-cta text-cta-foreground hover:bg-cta-hover active:bg-cta-active",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
  outline:
    "border border-border bg-outline text-outline-foreground hover:bg-outline-hover",
  ghost: "bg-transparent text-foreground hover:bg-surface-muted",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 gap-1.5 px-3 text-sm",
  md: "min-h-11 gap-2 px-4 text-sm",
  lg: "min-h-12 gap-2 px-5 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-md font-[var(--theme-weight-button)] tracking-tight transition-colors motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-50";

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
    if (typeof props.href === "string" && isNativeHref(props.href)) {
      return (
        <a href={props.href} className={classes}>
          {props.children}
        </a>
      );
    }

    return <Link className={classes} {...props} />;
  }

  const { type = "button", ...buttonProps } = props;

  return <button type={type} className={classes} {...buttonProps} />;
}
