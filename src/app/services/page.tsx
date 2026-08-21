import { ServicesHub } from "@/components/sections";
import { servicesPage } from "@/data/pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Services",
  description: servicesPage.description,
  path: "/services",
});

export default function Page() {
  return <ServicesHub />;
}
