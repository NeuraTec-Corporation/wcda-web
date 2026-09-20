import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import type { LabIconColorMode } from "@/config/lab-icon-library";

export function EditorialIconAsset({
  src,
  colorMode,
  className,
}: {
  src: string;
  colorMode: LabIconColorMode;
  className?: string;
}) {
  if (colorMode === "fixed") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        className={cn("editorial-icon-asset-fixed", className)}
      />
    );
  }
  return (
    <span
      className={cn("editorial-icon-asset", className)}
      style={
        {
          ["--exp-editorial-icon-mask"]: `url("${src}")`,
        } as CSSProperties
      }
    />
  );
}
