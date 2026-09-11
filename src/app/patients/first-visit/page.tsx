import { ProsePage } from "@/components/sections";
import { firstVisitPage } from "@/data/patients";
import { createPageMetadata } from "@/lib/metadata";
import { assertPagePublic } from "@/lib/publication-access";

export const metadata = createPageMetadata({
  title: "First visit",
  description: firstVisitPage.description,
  path: "/patients/first-visit",
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  assertPagePublic("patients-first-visit", await searchParams);
  return (
    <ProsePage
      page={firstVisitPage}
      pageId="patients-first-visit"
      detailsTitle="What a first visit may include"
      breadcrumb={[
        { href: "/", label: "Home" },
        { href: "/patients", label: "Patients" },
        { label: "First visit" },
      ]}
    />
  );
}
