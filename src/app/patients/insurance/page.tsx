import { ProsePage } from "@/components/sections";
import { insurancePage } from "@/data/patients";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Insurance",
  description: insurancePage.description,
  path: "/patients/insurance",
});

export default function Page() {
  return (
    <ProsePage page={insurancePage} detailsTitle="How dental benefits are reviewed" />
  );
}
