import {
  homeCareAreas,
  homeContact,
  homePatientCta,
  homePractice,
  homeTrust,
  homeWhyChoose,
} from "@/data/home";
import { ExperienceSlot } from "@/components/experience/ExperienceSlot";
import { ServiceMarquee } from "@/components/experience/ServiceMarquee";
import { CareAreaGrid } from "@/components/sections/CareAreaGrid";
import { ContactPreview } from "@/components/sections/ContactPreview";
import { HomeHero } from "@/components/content/HomeHero";
import { PatientCta } from "@/components/sections/PatientCta";
import { PracticeIntroduction } from "@/components/sections/PracticeIntroduction";
import { TrustIntro } from "@/components/sections/TrustIntro";
import { WhyChoose } from "@/components/sections/WhyChoose";
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
        />
      </PublicationGate>
      <PublicationGate page="home" section="whyChoose">
        <WhyChoose {...homeWhyChoose} />
      </PublicationGate>
      <PublicationGate page="home" section="practice">
        <PracticeIntroduction {...homePractice} />
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
