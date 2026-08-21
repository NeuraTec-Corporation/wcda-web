import { TechnologyPage } from "@/components/sections";
import { technologyPage } from "@/data/technology";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Technology",
  description: technologyPage.description,
  path: "/technology",
});

export default function Page() {
  return <TechnologyPage />;
}
