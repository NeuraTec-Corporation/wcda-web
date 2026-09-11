import { ProsePage } from "@/components/sections";
import { formsPage } from "@/data/patients";
import { createPageMetadata } from "@/lib/metadata";
import { assertPagePublic } from "@/lib/publication-access";

export const metadata = createPageMetadata({
  title: "Patient forms",
  description: formsPage.description,
  path: "/patients/forms",
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  assertPagePublic("patients-forms", await searchParams);
  return (
    <ProsePage
      page={formsPage}
      pageId="patients-forms"
      detailsTitle="Completing forms"
      breadcrumb={[
        { href: "/", label: "Home" },
        { href: "/patients", label: "Patients" },
        { label: "Patient forms" },
      ]}
    />
  );
}
