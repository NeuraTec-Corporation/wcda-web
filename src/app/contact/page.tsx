import type { Metadata } from "next";
import { ContactPreview, PageIntro } from "@/components/sections";
import { contactDetails } from "@/data/contact";
import { contactPage } from "@/data/pages";

export const metadata: Metadata = {
  title: "Contact",
  description: contactPage.description,
};

export default function ContactPage() {
  return (
    <>
      <PageIntro {...contactPage} />
      <ContactPreview
        headingId="contact-details-heading"
        eyebrow="Location"
        title="Practice location"
        description="Confirmed street address, phone number, and hours will replace these placeholders."
        details={contactDetails}
      />
    </>
  );
}
