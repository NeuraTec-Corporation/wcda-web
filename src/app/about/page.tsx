import type { Metadata } from "next";
import { PageIntro } from "@/components/sections";
import { aboutPage } from "@/data/pages";

export const metadata: Metadata = {
  title: "About",
  description: aboutPage.description,
};

export default function AboutPage() {
  return <PageIntro {...aboutPage} />;
}
