import type { TeamMember } from "@/types/content";

export const teamMembers: readonly TeamMember[] = [];

export function getConfirmedTeamMembers(): readonly TeamMember[] {
  return teamMembers.filter((member) => member.status === "confirmed");
}
