import { TreatmentList } from "@/components/sections/TreatmentList";
import { EditorialHero, OptionalMediaPanel } from "@/components/editorial";
import { Prose } from "@/components/ui/Prose";
import { headerCta } from "@/data/navigation";
import type { ServiceCategory, ServiceRecord } from "@/types/content";

type ServiceCategoryPageProps = {
  category: ServiceCategory;
  treatments: readonly ServiceRecord[];
};

export function ServiceCategoryPage({
  category,
  treatments,
}: ServiceCategoryPageProps) {
  return (
    <>
      <EditorialHero
        headingId="category-heading"
        eyebrow="Areas of Care"
        title={category.title}
        description={category.summary}
        breadcrumb={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { label: category.title },
        ]}
        primaryAction={headerCta}
        secondaryAction={{ href: "/services", label: "All services" }}
        media={
          <OptionalMediaPanel
            mediaKey={category.mediaKey}
            visualTarget="services-care-cards"
            aspectRatio="4 / 3"
            sizes="(min-width: 64rem) 28rem, 100vw"
          />
        }
        mediaFirst
      >
        <Prose className="mt-stack max-w-none">
          <p>{category.description}</p>
        </Prose>
      </EditorialHero>
      <TreatmentList
        headingId="category-treatments-heading"
        title="Treatments & services"
        description="Treatments in this area. After an exam, we discuss what is appropriate for your care."
        treatments={treatments}
      />
    </>
  );
}
