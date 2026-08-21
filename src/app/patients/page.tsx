import { PatientsHub } from "@/components/sections";
import { patientsPage } from "@/data/patients";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Patients",
  description: patientsPage.description,
  path: "/patients",
});

export default function Page() {
  return <PatientsHub />;
}
