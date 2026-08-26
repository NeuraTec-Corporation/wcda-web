import { ContactPage, MapSection } from "@/components/sections";
import { BeforeAfterSlider } from "@/components/experience/BeforeAfterSlider";
import { ExperienceSlot } from "@/components/experience/ExperienceSlot";
import { VideoPreviewCard } from "@/components/experience/VideoPreviewCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { contactIntro, getCallOfficeCta } from "@/data/contact";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description: contactIntro.description,
  path: "/contact",
});

export default function Page() {
  return (
    <>
      <ContactPage secondaryAction={getCallOfficeCta()} />
      <MapSection />
      <ExperienceSlot feature="video">
        <Section className="py-10 md:py-16" aria-labelledby="contact-video-heading">
          <Container>
            <h2 id="contact-video-heading" className="sr-only">
              Video preview
            </h2>
            <VideoPreviewCard title="Practice video preview" />
          </Container>
        </Section>
      </ExperienceSlot>
      <ExperienceSlot feature="beforeAfter">
        <Section className="py-10 md:py-16" aria-labelledby="contact-compare-heading">
          <Container>
            <h2 id="contact-compare-heading" className="sr-only">
              Visual comparison
            </h2>
            <BeforeAfterSlider />
          </Container>
        </Section>
      </ExperienceSlot>
    </>
  );
}
