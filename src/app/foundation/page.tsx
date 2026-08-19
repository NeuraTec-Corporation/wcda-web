import type { Metadata } from "next";
import { FoundationPreview } from "@/components/sections";

export const metadata: Metadata = {
  title: "Design-system foundation",
  description:
    "Internal design-system verification for West Caldwell Dental Arts. This page is not part of the public site.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FoundationPage() {
  return <FoundationPreview />;
}
