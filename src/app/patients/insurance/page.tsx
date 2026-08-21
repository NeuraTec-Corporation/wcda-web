import type { Metadata } from "next";
import { ProsePage } from "@/components/sections";
import { insurancePage } from "@/data/patients";

export const metadata: Metadata = {
  title: "Insurance",
  description: insurancePage.description,
};

export default function Page() {
  return (
    <ProsePage page={insurancePage} detailsTitle="How dental benefits are reviewed" />
  );
}
