export type NavItem = {
  href: string;
  label: string;
};

export type ContactStatus = "confirmed" | "pendingVerification" | "disabled";

export type ServiceStatus = "confirmed" | "notOffered" | "disabled";

export type PublicationStatus = "draft" | "review" | "approved" | "published";

export type RecordStatus = "confirmed" | "disabled";
