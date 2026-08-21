import type { Metadata } from "next";
import { ProsePage } from "@/components/sections";
import { financialPage } from "@/data/patients";

export const metadata: Metadata = {
  title: "Financial options",
  description: financialPage.description,
};

export default function Page() {
  return <ProsePage page={financialPage} detailsTitle="Talking about fees" />;
}
