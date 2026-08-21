import type { Metadata } from "next";
import { PatientsHub } from "@/components/sections";
import { patientsPage } from "@/data/patients";

export const metadata: Metadata = {
  title: "Patients",
  description: patientsPage.description,
};

export default function Page() {
  return <PatientsHub />;
}
