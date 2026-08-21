import type { Metadata } from "next";
import { ContactPage, MapSection } from "@/components/sections";
import { contactIntro, getCallOfficeCta } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: contactIntro.description,
};

export default function Page() {
  return (
    <>
      <ContactPage secondaryAction={getCallOfficeCta()} />
      <MapSection />
    </>
  );
}
