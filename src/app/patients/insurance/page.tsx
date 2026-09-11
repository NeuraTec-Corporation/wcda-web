import { ProsePage } from "@/components/sections";
import { insurancePage } from "@/data/patients";
import { createPageMetadata } from "@/lib/metadata";
import { assertPagePublic } from "@/lib/publication-access";

export const metadata = createPageMetadata({
  title: "Insurance",
  description: insurancePage.description,
  path: "/patients/insurance",
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  assertPagePublic("patients-insurance", await searchParams);
  return (
    <ProsePage
      page={insurancePage}
      pageId="patients-insurance"
      detailsTitle="How dental benefits are reviewed"
      breadcrumb={[
        { href: "/", label: "Home" },
        { href: "/patients", label: "Patients" },
        { label: "Insurance" },
      ]}
    />
  );
}
