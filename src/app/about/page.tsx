import { AboutPage } from "@/components/sections";
import { aboutPage } from "@/data/about";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description: aboutPage.description,
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}
