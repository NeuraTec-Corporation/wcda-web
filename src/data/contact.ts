import { siteConfig } from "@/config/site";
import type { ContactPreviewContent } from "@/types/content";

export const contactDetails: ContactPreviewContent["details"] = [
  { label: "Area", value: siteConfig.location.label },
  { label: "Street address", value: "To be published" },
  { label: "Phone", value: "To be published" },
  { label: "Office hours", value: "To be published" },
];
