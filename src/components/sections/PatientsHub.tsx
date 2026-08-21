import { patientResourceCards, patientsPage } from "@/data/patients";
import { CardGridSection } from "@/components/sections/CardGridSection";
import { PageIntro } from "@/components/sections/PageIntro";
import { PatientCta } from "@/components/sections/PatientCta";
import { headerCta } from "@/data/navigation";

export function PatientsHub() {
  return (
    <>
      <PageIntro {...patientsPage} />
      <CardGridSection
        headingId="patient-resources-heading"
        title="Patient resources"
        description="Start with the topic that matches your question. Each page uses clear, practical language."
        items={patientResourceCards}
        tone="muted"
        cardClassName="bg-background"
      />
      <PatientCta
        headingId="patients-appointment-heading"
        eyebrow="Appointments"
        title="Ready to visit?"
        description="Request an appointment to visit West Caldwell Dental Arts."
        primaryAction={headerCta}
        secondaryAction={{ href: "/contact", label: "Contact the office" }}
      />
    </>
  );
}
