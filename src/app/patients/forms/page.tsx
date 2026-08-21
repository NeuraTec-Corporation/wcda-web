import type { Metadata } from "next";
import { ProsePage } from "@/components/sections";
import { formsPage } from "@/data/patients";

export const metadata: Metadata = {
  title: "Patient forms",
  description: formsPage.description,
};

export default function Page() {
  return <ProsePage page={formsPage} detailsTitle="Completing forms" />;
}
