import type { Metadata } from "next";
import { ContactPreview, PageIntro } from "@/components/sections";
import { getPublicContactDetails } from "@/data/contact";
import { contactPage } from "@/data/pages";

export const metadata: Metadata = {
  title: "Contact",
  description: contactPage.description,
};

export default function Page() {
  return (
    <>
      <PageIntro {...contactPage} />
      <ContactPreview
        headingId="contact-details-heading"
        eyebrow="Office"
        title="Get in touch"
        description="Request an appointment to begin planning a visit with West Caldwell Dental Arts. Please do not send medical or dental history through this website."
        details={getPublicContactDetails()}
      />
    </>
  );
}
