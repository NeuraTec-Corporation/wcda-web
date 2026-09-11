import { DoctorProfileSection } from "@/components/sections";
import { doctorProfile } from "@/data/doctor";
import { doctorPage } from "@/data/pages";
import { createPageMetadata } from "@/lib/metadata";
import { assertPagePublic } from "@/lib/publication-access";

export const metadata = createPageMetadata({
  title: "Dr. Jonnathan Matute",
  description: doctorProfile.summary,
  path: "/about/dr-jonnathan-matute",
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  assertPagePublic("doctor", await searchParams);
  return (
    <DoctorProfileSection
      profile={doctorProfile}
      headingId={doctorPage.headingId}
      primaryAction={doctorPage.primaryAction}
      secondaryAction={doctorPage.secondaryAction}
    />
  );
}
