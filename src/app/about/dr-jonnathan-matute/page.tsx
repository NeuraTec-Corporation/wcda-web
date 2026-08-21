import type { Metadata } from "next";
import { DoctorProfileSection } from "@/components/sections";
import { doctorProfile } from "@/data/doctor";
import { doctorPage } from "@/data/pages";

export const metadata: Metadata = {
  title: "Dr. Jonnathan Matute",
  description: doctorProfile.summary,
};

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
