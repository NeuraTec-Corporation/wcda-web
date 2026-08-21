import { ProsePage } from "@/components/sections";
import { firstVisitPage } from "@/data/patients";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "First visit",
  description: firstVisitPage.description,
  path: "/patients/first-visit",
});

export default function Page() {
  return (
    <ProsePage
      page={firstVisitPage}
      detailsTitle="What a first visit may include"
    />
  );
}
