import {
  homeCareAreas,
  homeContact,
  homePatientCta,
  homeTrust,
} from "@/data/home";
import { ExperienceSlot } from "@/components/experience/ExperienceSlot";
import { ServiceMarquee } from "@/components/experience/ServiceMarquee";
import { CareAreaGrid } from "@/components/sections/CareAreaGrid";
import { ContactPreview } from "@/components/sections/ContactPreview";
import { HomeHero } from "@/components/content/HomeHero";
import { HomePractice } from "@/components/content/HomePractice";
import { HomeWhyChoose } from "@/components/content/HomeWhyChoose";
import { PatientCta } from "@/components/sections/PatientCta";
import { TrustIntro } from "@/components/sections/TrustIntro";
import { PublicationGate } from "@/components/content/PublicationGate";
import { getFeaturedCareAreas } from "@/data/services";

export function HomePage() {
  return (
    <>
      <PublicationGate page="home" section="hero">
        <HomeHero />
      </PublicationGate>
      <PublicationGate page="home" section="marquee">
        <ExperienceSlot feature="marquee">
          <ServiceMarquee />
        </ExperienceSlot>
      </PublicationGate>
      <PublicationGate page="home" section="trust">
        <TrustIntro {...homeTrust} />
      </PublicationGate>
      <PublicationGate page="home" section="careAreas">
        <CareAreaGrid
          headingId={homeCareAreas.headingId}
          eyebrow={homeCareAreas.eyebrow}
          title={homeCareAreas.title}
          description={homeCareAreas.description}
          categories={getFeaturedCareAreas()}
          cta={homeCareAreas.cta}
          tone="default"
          visualTarget="home-care-areas"
          layoutMode="carousel"
          itemsPerViewDesktop={3}
          itemsPerViewMobile={1}
        />
      </PublicationGate>
      <PublicationGate page="home" section="whyChoose">
        <HomeWhyChoose />
      </PublicationGate>
      <PublicationGate page="home" section="practice">
        <HomePractice />
      </PublicationGate>
      <PublicationGate page="home" section="patientCta">
        <PatientCta {...homePatientCta} tone="default" visualTarget="home-cta" />
      </PublicationGate>
      <PublicationGate page="home" section="contact">
        <ContactPreview {...homeContact} />
      </PublicationGate>
    </>
  );
}
