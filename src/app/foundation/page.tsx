import { FoundationPreview } from "@/components/sections";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Design-system foundation",
  description:
    "Internal design-system verification for West Caldwell Dental Arts. This page is not part of the public site.",
  path: "/foundation",
  index: false,
});

export default function FoundationPage() {
  return <FoundationPreview />;
}
