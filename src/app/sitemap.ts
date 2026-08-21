import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getConfirmedCategories } from "@/data/services";

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

  return [...publicPaths, ...categoryPaths].map((path) => ({
    url: new URL(path, `${siteConfig.url}/`).toString(),
  }));
}
