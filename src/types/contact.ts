import type { ContactStatus } from "@/types/navigation";

export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "youtube"
  | "linkedin"
  | "tiktok";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  url?: string;
  status: ContactStatus;
};

export type GoogleMapsConfig = {
  status: ContactStatus;
  placeId?: string;
  embedUrl?: string;
  directionsUrl?: string;
  reviewsUrl?: string;
  businessProfileUrl?: string;
  title?: string;
};

export type EmailChannel = {
  status: ContactStatus;
  display?: string;
  href?: string;
};

export type OfficeHoursEntry = {
  label: string;
  value: string;
};

export type OfficeHours = {
  status: ContactStatus;
  summary?: string;
  lines?: readonly string[];
  entries?: readonly OfficeHoursEntry[];
};

export type SiteCredits = {
  status: ContactStatus;
  developerName?: string;
  developerUrl?: string;
  partnerName?: string;
  partnerUrl?: string;
};

export type PublicAddress = {
  formatted: string;
  line1: string;
  line2: string;
  mapsHref: string;
};

export type PublicPhone = {
  display: string;
  href: string;
};

export type PublicEmail = {
  display: string;
  href: string;
};

export type PublicHours = {
  summary?: string;
  lines?: readonly string[];
  entries?: readonly OfficeHoursEntry[];
};

export type PublicGoogleMaps = {
  title: string;
  embedUrl?: string;
  directionsUrl?: string;
  reviewsUrl?: string;
  businessProfileUrl?: string;
};
