import { TechnologyPage } from "@/components/sections";
import { technologyPage } from "@/data/technology";
import { createPageMetadata } from "@/lib/metadata";
import { assertPagePublic } from "@/lib/publication-access";

export const metadata = createPageMetadata({
  title: "Technology",
  description: technologyPage.description,
  path: "/technology",
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  assertPagePublic("technology", await searchParams);
  return <TechnologyPage />;
}
