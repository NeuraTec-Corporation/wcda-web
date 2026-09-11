import { ServicesHub } from "@/components/sections";
import { servicesPage } from "@/data/pages";
import { createPageMetadata } from "@/lib/metadata";
import { assertPagePublic } from "@/lib/publication-access";

export const metadata = createPageMetadata({
  title: "Services",
  description: servicesPage.description,
  path: "/services",
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  assertPagePublic("services", await searchParams);
  return <ServicesHub />;
}
