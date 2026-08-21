import {
  appointmentCallTips,
  appointmentIntake,
  appointmentPage,
  appointmentParagraphs,
} from "@/data/appointment";
import { homeContact } from "@/data/home";
import { ContactPreview } from "@/components/sections/ContactPreview";
import { ContentBlockSection } from "@/components/sections/ContentBlockSection";
import { PageIntro } from "@/components/sections/PageIntro";

export function AppointmentShell() {
  const showOnlineForm = appointmentIntake.acceptsOnlineSubmission;

  return (
    <>
      <PageIntro {...appointmentPage} />
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
        description={homeContact.description}
        details={homeContact.details}
        primaryAction={homeContact.primaryAction}
        secondaryAction={homeContact.secondaryAction}
        tone="surface"
      />
    </>
  );
}
