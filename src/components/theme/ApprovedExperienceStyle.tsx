import {
  approvedExperience,
  approvedExperienceStyleText,
} from "@/config/experience";

export function ApprovedExperienceStyle() {
  return (
    <style
      id="wcda-approved-experience"
      dangerouslySetInnerHTML={{
        __html: approvedExperienceStyleText(approvedExperience),
      }}
    />
  );
}
