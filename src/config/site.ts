import type { ContactStatus } from "@/types/navigation";
import type {
  EmailChannel,
  GoogleMapsConfig,
  OfficeHours,
  SiteCredits,
  SocialLink,
} from "@/types/contact";

export const siteConfig = {
  name: "West Caldwell Dental Arts",
  shortName: "WCDA",
  description:
    "West Caldwell Dental Arts is an independent dental practice in West Caldwell, New Jersey, owned by Dr. Jonnathan Matute, DMD.",
  owner: {
    name: "Jonnathan Matute",
    honorific: "Dr. Jonnathan Matute",
    credential: "DMD",
    displayName: "Dr. Jonnathan Matute, DMD",
  },
  identity: {
    locality: "West Caldwell",
    regionName: "New Jersey",
    label: "West Caldwell, New Jersey",
  },
  location: {
    status: "confirmed" as ContactStatus,
    streetAddress: "555 Passaic Ave",
    suite: "Suite 203",
    locality: "West Caldwell",
    region: "NJ",
    regionName: "New Jersey",
    postalCode: "07006",
    line1: "555 Passaic Ave, Suite 203",
    line2: "West Caldwell, NJ 07006",
    formatted: "555 Passaic Ave, Suite 203, West Caldwell, NJ 07006",
    mapsHref:
      "https://maps.google.com/?q=555+Passaic+Ave+Suite+203+West+Caldwell+NJ+07006",
  },
  phone: {
    status: "confirmed" as ContactStatus,
    display: "(973) 575-1507",
    href: "tel:+19735751507",
  },
  fax: {
    status: "pendingVerification" as ContactStatus,
    display: "(973) 575-1077",
    publicDisplay: false,
  },
  email: {
    status: "confirmed",
    display: "frontdesk@wcaldwelldentalarts.com",
    href: "mailto:frontdesk@wcaldwelldentalarts.com",
  } as EmailChannel,
  hours: {
    status: "confirmed",
    summary:
      "Tue 8:00 AM–5:00 PM; Thu 9:00 AM–6:00 PM; first Saturday 8:00 AM–1:00 PM. Selected Wednesdays and Fridays — contact the office for current availability.",
    entries: [
      { label: "Tuesday", value: "8:00 AM – 5:00 PM" },
      { label: "Thursday", value: "9:00 AM – 6:00 PM" },
      {
        label: "First Saturday of each month",
        value: "8:00 AM – 1:00 PM",
      },
      {
        label: "Selected Wednesdays and Fridays",
        value: "Contact the office for current availability",
      },
    ],
  } as OfficeHours,
  googleMaps: {
    status: "pendingVerification",
    title: "West Caldwell Dental Arts",
  } as GoogleMapsConfig,
  socialLinks: [
    {
      platform: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/westcaldwelldentalarts?igsi=MWJrNzFveHlkempoZw%3D%3D&utm_source=qr",
      status: "confirmed",
    },
    { platform: "facebook", label: "Facebook", status: "disabled" },
    { platform: "youtube", label: "YouTube", status: "disabled" },
    { platform: "linkedin", label: "LinkedIn", status: "disabled" },
    { platform: "tiktok", label: "TikTok", status: "disabled" },
  ] as readonly SocialLink[],
  siteCredits: {
    status: "disabled",
  } as SiteCredits,
  appointmentHref: "/request-appointment",
  footerNote:
    "An independent dental practice in West Caldwell, New Jersey, owned by Dr. Jonnathan Matute, DMD.",
  footerAppointmentNote:
    "Request an appointment to begin planning a visit with our team.",
} as const;

export type SiteConfig = typeof siteConfig;
