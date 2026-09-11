import { AboutPage } from "@/components/sections";
import { aboutPage } from "@/data/about";
import { createPageMetadata } from "@/lib/metadata";
import { assertPagePublic } from "@/lib/publication-access";

export const metadata = createPageMetadata({
  title: "About",
  description: aboutPage.description,
  path: "/about",
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  assertPagePublic("about", await searchParams);
  return <AboutPage />;
}
