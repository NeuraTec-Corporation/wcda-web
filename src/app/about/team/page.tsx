import { TeamSection } from "@/components/sections";
import { doctorProfile } from "@/data/doctor";
import { teamPage } from "@/data/pages";
import { getConfirmedTeamMembers } from "@/data/team";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "The practice team",
  description: teamPage.description,
  path: "/about/team",
});

export default function Page() {
  return (
    <TeamSection
      page={teamPage}
      members={getConfirmedTeamMembers()}
      emptyState={[
        `West Caldwell Dental Arts is owned by ${doctorProfile.displayName}. He provides dental care in our West Caldwell office, supported by the practice team that helps with each visit.`,
        "You can read Dr. Matute's background on his profile page, then request an appointment to visit the practice.",
      ]}
      relatedAction={{ href: doctorProfile.href, label: "Meet Dr. Matute" }}
    />
  );
}
