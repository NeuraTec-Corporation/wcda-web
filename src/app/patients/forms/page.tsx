import { ProsePage } from "@/components/sections";
import { formsPage } from "@/data/patients";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Patient forms",
  description: formsPage.description,
  path: "/patients/forms",
});

export default function Page() {
  return <ProsePage page={formsPage} detailsTitle="Completing forms" />;
}
