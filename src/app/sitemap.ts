import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import {
  getConfirmedCategories,
  getPublishedTreatments,
} from "@/data/services";
import { isPathPublic } from "@/lib/publication-access";

const publicPaths = [
  "/",
  "/about",
  "/about/dr-jonnathan-matute",
  "/about/team",
  "/services",
  "/patients",
  "/patients/first-visit",
  "/patients/financial-options",
  "/patients/insurance",
  "/patients/forms",
  "/technology",
  "/contact",
  "/request-appointment",
  "/privacy",
  "/accessibility",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const categoryPaths = getConfirmedCategories().map(
    (category) => `/services/${category.slug}`,
  );
  const treatmentPaths = getPublishedTreatments().map(
    (treatment) => `/services/${treatment.categorySlug}/${treatment.slug}`,
  );

  return [...publicPaths, ...categoryPaths, ...treatmentPaths]
    .filter(isPathPublic)
    .map((path) => ({
      url: new URL(path, `${siteConfig.url}/`).toString(),
    }));
}
