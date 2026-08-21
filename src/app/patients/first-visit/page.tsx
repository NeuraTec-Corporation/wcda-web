import type { Metadata } from "next";
import { ProsePage } from "@/components/sections";
import { firstVisitPage } from "@/data/patients";

export const metadata: Metadata = {
  title: "First visit",
  description: firstVisitPage.description,
};

export default function Page() {
  return (
    <ProsePage
      page={firstVisitPage}
      detailsTitle="What a first visit may include"
    />
  );
}
