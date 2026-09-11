import { CareAreaGrid } from "@/components/sections/CareAreaGrid";
import { PageIntro } from "@/components/sections/PageIntro";
import { PatientCta } from "@/components/sections/PatientCta";
import { TreatmentGroups } from "@/components/sections/TreatmentGroups";
import { headerCta } from "@/data/navigation";
import { servicesPage } from "@/data/pages";
import {
  getConfirmedCategories,
  getConfirmedTreatmentGroups,
} from "@/data/services";
import { PublicationGate } from "@/components/content/PublicationGate";

export function ServicesHub() {
  const categories = getConfirmedCategories();
  const treatmentGroups = getConfirmedTreatmentGroups();

  return (
    <>
      <PublicationGate page="services" section="intro">
        <PageIntro
          {...servicesPage}
          breadcrumb={[
            { href: "/", label: "Home" },
            { label: "Services" },
          ]}
        />
      </PublicationGate>
      <PublicationGate page="services" section="areas">
        <CareAreaGrid
          headingId="areas-of-care-heading"
          eyebrow="Overview"
          title="Areas of Care"
          description="These are the major families of dental care. Choose an area to read a short overview and see related treatments."
          categories={categories}
          tone="default"
          visualTarget="services-care-cards"
        />
      </PublicationGate>
      <PublicationGate page="services" section="treatments">
        <TreatmentGroups
          headingId="treatments-heading"
          eyebrow="Catalog"
          title="Treatments & Services"
          description="Browse treatments by area of care. After an exam, we discuss what is appropriate for your oral health and goals."
          groups={treatmentGroups}
          tone="surface"
          visualTarget="services-treatment-media"
        />
      </PublicationGate>
      <PublicationGate page="services" section="cta">
        <PatientCta
          headingId="services-appointment-heading"
          eyebrow="Next step"
          title="Talk through the right visit"
          description="If you are unsure which type of appointment to request, use the appointment page and we can help you get started."
          primaryAction={headerCta}
          secondaryAction={{ href: "/contact", label: "Contact" }}
        />
      </PublicationGate>
    </>
  );
}
