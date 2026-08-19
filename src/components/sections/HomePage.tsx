import {
  homeContact,
  homeHero,
  homePatientCta,
  homePractice,
  homeServices,
  homeTrust,
  homeWhyChoose,
} from "@/data/home";
import { ContactPreview } from "@/components/sections/ContactPreview";
import { Hero } from "@/components/sections/Hero";
import { PatientCta } from "@/components/sections/PatientCta";
import { PracticeIntroduction } from "@/components/sections/PracticeIntroduction";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { TrustIntro } from "@/components/sections/TrustIntro";
import { WhyChoose } from "@/components/sections/WhyChoose";

export function HomePage() {
  return (
    <>
      <Hero {...homeHero} />
      <TrustIntro {...homeTrust} />
      <ServicesOverview {...homeServices} />
      <WhyChoose {...homeWhyChoose} />
      <PracticeIntroduction {...homePractice} />
      <PatientCta {...homePatientCta} />
      <ContactPreview {...homeContact} />
    </>
  );
}
