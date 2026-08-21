import { DoctorProfileSection } from "@/components/sections";
import { doctorProfile } from "@/data/doctor";
import { doctorPage } from "@/data/pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Dr. Jonnathan Matute",
  description: doctorProfile.summary,
  path: "/about/dr-jonnathan-matute",
});

export default function Page() {
  return (
    <DoctorProfileSection
      profile={doctorProfile}
      headingId={doctorPage.headingId}
      primaryAction={doctorPage.primaryAction}
      secondaryAction={doctorPage.secondaryAction}
    />
  );
}
