import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import type { ContainerWidth } from "@/types/ui";

const widthClasses: Record<ContainerWidth, string> = {
  narrow: "max-w-narrow",
  content: "max-w-content",
  wide: "max-w-wide",
};

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  width?: ContainerWidth;
};

export function Container({
  width = "content",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-gutter sm:px-gutter-lg",
        widthClasses[width],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
