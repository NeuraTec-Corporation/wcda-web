import { ProsePage } from "@/components/sections";
import { financialPage } from "@/data/patients";
import { createPageMetadata } from "@/lib/metadata";
import { assertPagePublic } from "@/lib/publication-access";

export const metadata = createPageMetadata({
  title: "Financial options",
  description: financialPage.description,
  path: "/patients/financial-options",
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  assertPagePublic("patients-financial-options", await searchParams);
  return (
    <ProsePage
      page={financialPage}
      pageId="patients-financial-options"
      detailsTitle="Talking about fees"
      breadcrumb={[
        { href: "/", label: "Home" },
        { href: "/patients", label: "Patients" },
        { label: "Financial options" },
      ]}
    />
  );
}
