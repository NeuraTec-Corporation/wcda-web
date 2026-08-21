import { ProsePage } from "@/components/sections";
import { financialPage } from "@/data/patients";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Financial options",
  description: financialPage.description,
  path: "/patients/financial-options",
});

export default function Page() {
  return <ProsePage page={financialPage} detailsTitle="Talking about fees" />;
}
