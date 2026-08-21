import type { Metadata } from "next";
import { ServicesHub } from "@/components/sections";
import { servicesPage } from "@/data/pages";

export const metadata: Metadata = {
  title: "Services",
  description: servicesPage.description,
};

export default function Page() {
  return <ServicesHub />;
}
