import {
  homeCareAreas,
  homeContact,
  homeHero,
  homePatientCta,
  homePractice,
  homeTrust,
  homeWhyChoose,
} from "@/data/home";
import { CareAreaGrid } from "@/components/sections/CareAreaGrid";
import { ContactPreview } from "@/components/sections/ContactPreview";
import { Hero } from "@/components/sections/Hero";
import { PatientCta } from "@/components/sections/PatientCta";
import { PracticeIntroduction } from "@/components/sections/PracticeIntroduction";
import { TrustIntro } from "@/components/sections/TrustIntro";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { getFeaturedCareAreas } from "@/data/services";

export function HomePage() {
  return (
    <>
      <Hero {...homeHero} />
      <TrustIntro {...homeTrust} />
      <CareAreaGrid
        headingId={homeCareAreas.headingId}
        eyebrow={homeCareAreas.eyebrow}
        title={homeCareAreas.title}
        description={homeCareAreas.description}
        categories={getFeaturedCareAreas()}
        cta={homeCareAreas.cta}
      />
      <WhyChoose {...homeWhyChoose} />
      <PracticeIntroduction {...homePractice} />
      <PatientCta {...homePatientCta} />
      <ContactPreview {...homeContact} />
    </>
  );
}
