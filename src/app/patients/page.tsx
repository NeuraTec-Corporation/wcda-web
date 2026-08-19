import type { Metadata } from "next";
import { PageIntro } from "@/components/sections";
import { patientsPage } from "@/data/pages";

export const metadata: Metadata = {
  title: "Patients",
  description: patientsPage.description,
};

export default function PatientsPage() {
  return <PageIntro {...patientsPage} />;
}
