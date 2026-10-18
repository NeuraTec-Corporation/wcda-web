import type { Metadata } from "next";
import LegacyRuntime from "@/components/LegacyRuntime";
import Page404OriginalPage from "@/generated/pages/Page404OriginalPage";

export const metadata: Metadata = {
  title: "Denart - Dentist & Dental Clinic HTML Template",
};

export default function NotFoundPage() {
  return (
    <LegacyRuntime>
      <Page404OriginalPage />
    </LegacyRuntime>
  );
}
