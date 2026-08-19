export const siteConfig = {
  name: "West Caldwell Dental Arts",
  shortName: "WCDA",
  description:
    "West Caldwell Dental Arts is a dental practice in West Caldwell, New Jersey.",
  location: {
    locality: "West Caldwell",
    region: "New Jersey",
    label: "West Caldwell, New Jersey",
  },
  footerNote:
    "A dental practice in West Caldwell, New Jersey. Additional practice details will be published as they are confirmed.",
} as const;

export type SiteConfig = typeof siteConfig;
