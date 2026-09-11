import {
  appointmentCallTips,
  appointmentIntake,
  appointmentPage,
  appointmentParagraphs,
} from "@/data/appointment";
import { homeContact } from "@/data/home";
import { getCallOfficeCta } from "@/data/contact";
import { ContactPreview } from "@/components/sections/ContactPreview";
import { ContentBlockSection } from "@/components/sections/ContentBlockSection";
import { PageIntro } from "@/components/sections/PageIntro";

export function AppointmentShell() {
  const showOnlineForm = appointmentIntake.acceptsOnlineSubmission;
  const callOffice = getCallOfficeCta();

  return (
    <>
      <PageIntro
        {...appointmentPage}
        breadcrumb={[
          { href: "/", label: "Home" },
          { label: appointmentPage.title },
        ]}
      />
      <ContentBlockSection
        headingId="appointment-details-heading"
        title={
          showOnlineForm ? "Request a visit online" : "How to request a visit"
        }
        paragraphs={appointmentParagraphs}
        steps={appointmentCallTips}
        tone="muted"
      />
      <ContactPreview
        headingId="appointment-contact-heading"
        eyebrow={homeContact.eyebrow}
        title={homeContact.title}
        description="Use the confirmed office details below to reach West Caldwell Dental Arts. Online appointment requests are not sent from this website yet."
        details={homeContact.details}
        primaryAction={callOffice}
        secondaryAction={{ href: "/contact", label: "Contact the office" }}
        tone="surface"
      />
    </>
  );
}
