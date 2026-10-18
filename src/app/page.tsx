import type { Metadata } from "next";
import LegacyRuntime from "@/components/LegacyRuntime";
import IndexOriginalPage from "@/generated/pages/IndexOriginalPage";

export const metadata: Metadata = {
  title: "Denart - Dentist & Dental Clinic HTML Template",
};

export default function IndexPage() {
  return (
    <LegacyRuntime>
      <IndexOriginalPage />
    </LegacyRuntime>
  );
}
