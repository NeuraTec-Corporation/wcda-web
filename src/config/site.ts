import type { ContactStatus } from "@/types/navigation";

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
    status: "pendingVerification" as ContactStatus,
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
    status: "pendingVerification" as ContactStatus,
    display: "(973) 575-1507",
    href: "tel:+19735751507",
  },
  fax: {
    status: "pendingVerification" as ContactStatus,
    display: "(973) 575-1077",
    publicDisplay: false,
  },
  appointmentHref: "/request-appointment",
  footerNote:
    "An independent dental practice in West Caldwell, New Jersey, owned by Dr. Jonnathan Matute, DMD.",
} as const;

export type SiteConfig = typeof siteConfig;
