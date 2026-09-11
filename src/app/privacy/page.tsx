import { ContentBlockSection } from "@/components/sections/ContentBlockSection";
import { PageIntro } from "@/components/sections/PageIntro";
import { privacyPage, privacySections } from "@/data/legal";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy",
  description: privacyPage.description,
  path: "/privacy",
});

export default function Page() {
  return (
    <>
      <PageIntro
        {...privacyPage}
        breadcrumb={[
          { href: "/", label: "Home" },
          { label: "Privacy" },
        ]}
      />
      {privacySections.map((section, index) => (
        <ContentBlockSection
          key={section.headingId}
          headingId={section.headingId}
          title={section.title}
          paragraphs={section.paragraphs}
          tone={index % 2 === 0 ? "muted" : "default"}
        />
      ))}
    </>
  );
}
