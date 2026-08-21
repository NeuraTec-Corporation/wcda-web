import type { Metadata } from "next";
import { TechnologyPage } from "@/components/sections";
import { technologyPage } from "@/data/technology";

export const metadata: Metadata = {
  title: "Technology",
  description: technologyPage.description,
};

export default function Page() {
  return <TechnologyPage />;
}
