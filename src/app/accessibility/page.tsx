import { ContentBlockSection } from "@/components/sections/ContentBlockSection";
import { PageIntro } from "@/components/sections/PageIntro";
import { accessibilityPage, accessibilitySections } from "@/data/legal";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Accessibility",
  description: accessibilityPage.description,
  path: "/accessibility",
});

export default function Page() {
  return (
    <>
      <PageIntro
        {...accessibilityPage}
        breadcrumb={[
          { href: "/", label: "Home" },
          { label: "Accessibility" },
        ]}
      />
      {accessibilitySections.map((section, index) => (
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
