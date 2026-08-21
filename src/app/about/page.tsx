import type { Metadata } from "next";
import { AboutPage } from "@/components/sections";
import { aboutPage } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description: aboutPage.description,
};

export default function Page() {
  return <AboutPage />;
}
