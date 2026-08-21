import { ContactPage, MapSection } from "@/components/sections";
import { contactIntro, getCallOfficeCta } from "@/data/contact";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description: contactIntro.description,
  path: "/contact",
});

export default function Page() {
  return (
    <>
      <ContactPage secondaryAction={getCallOfficeCta()} />
      <MapSection />
    </>
  );
}
