import type { Metadata } from "next";
import AboutServicesHomologation from "@/components/AboutServicesHomologation";

export const metadata: Metadata = {
  title: "WCDA | About and Services homologation",
  description: "Exact React migration of the verified WCDA About and Services sections.",
};

export default function AboutServicesPage() {
  return <AboutServicesHomologation />;
}
