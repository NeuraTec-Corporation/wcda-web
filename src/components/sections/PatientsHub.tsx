import { patientResourceCards, patientsPage } from "@/data/patients";
import { CardGridSection } from "@/components/sections/CardGridSection";
import { PageIntro } from "@/components/sections/PageIntro";
import { PatientCta } from "@/components/sections/PatientCta";
import { headerCta } from "@/data/navigation";
import { PublicationGate } from "@/components/content/PublicationGate";

export function PatientsHub() {
  return (
    <>
      <PublicationGate page="patients" section="intro">
        <PageIntro
          {...patientsPage}
          breadcrumb={[
            { href: "/", label: "Home" },
            { label: "Patients" },
          ]}
        />
      </PublicationGate>
      <PublicationGate page="patients" section="resources">
        <CardGridSection
          headingId="patient-resources-heading"
          title="Patient resources"
          description="Start with the topic that matches your question. Each page uses clear, practical language."
          items={patientResourceCards}
          columns={2}
          tone="muted"
          visualTarget="patients-resource-cards"
          surfaceFill="var(--wcda-surface)"
        />
      </PublicationGate>
      <PublicationGate page="patients" section="cta">
        <PatientCta
          headingId="patients-appointment-heading"
          eyebrow="Appointments"
          title="Ready to visit?"
          description="Request an appointment to visit West Caldwell Dental Arts."
          primaryAction={headerCta}
          secondaryAction={{ href: "/contact", label: "Contact the office" }}
        />
      </PublicationGate>
    </>
  );
}
