import { notFound } from "next/navigation";
import { isThemeLabEnabled } from "@/config/theme";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Visual Experience Lab",
  description:
    "Internal visual experience controls for West Caldwell Dental Arts. This page is not part of the public site.",
  path: "/foundation/theme",
  index: false,
});

export default async function ThemeLabPage() {
  if (!isThemeLabEnabled()) {
    notFound();
  }

  const { ThemeLabLoader } = await import("@/components/theme/ThemeLabLoader");
  return <ThemeLabLoader />;
}
