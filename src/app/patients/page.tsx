import { PatientsHub } from "@/components/sections";
import { patientsPage } from "@/data/patients";
import { createPageMetadata } from "@/lib/metadata";
import { assertPagePublic } from "@/lib/publication-access";

export const metadata = createPageMetadata({
  title: "Patients",
  description: patientsPage.description,
  path: "/patients",
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  assertPagePublic("patients", await searchParams);
  return <PatientsHub />;
}
