"use client";

import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { PatientCta } from "@/components/sections/PatientCta";
import {
  BenefitStrip,
  EditorialHero,
  EditorialSplit,
  FAQAccordion,
  InfoCard,
  InfoCardGrid,
  OptionalMediaPanel,
  RelatedCareGrid,
  SectionCopy,
} from "@/components/editorial";
import { headerCta } from "@/data/navigation";
import { getPublishedTreatmentsBySlugs } from "@/data/services";
import { usePublicationPreview } from "@/components/content/PublicationGate";
import { resolveTreatmentSectionEnabled } from "@/config/content-publication";
import type {
  ServiceCategory,
  TreatmentRecord,
  TreatmentSection,
  TreatmentSectionId,
} from "@/types/content";

type TreatmentDetailPageProps = {
  category: ServiceCategory;
  treatment: TreatmentRecord;
};

const CORE_IDS = [
  "whyRecommended",
  "evaluation",
  "howItWorks",
] as const satisfies readonly TreatmentSectionId[];

const EXPERIENCE_IDS = [
  "whatToExpect",
  "benefits",
  "considerations",
  "recoveryAftercare",
] as const satisfies readonly TreatmentSectionId[];

const STRIP_IDS = [
  "overview",
  "whyRecommended",
  "evaluation",
  "howItWorks",
] as const satisfies readonly TreatmentSectionId[];

function hasSectionContent(section: TreatmentSection): boolean {
  return Boolean(
    (section.paragraphs && section.paragraphs.length > 0) ||
      (section.items && section.items.length > 0) ||
      (section.faqs && section.faqs.length > 0) ||
      (section.relatedSlugs && section.relatedSlugs.length > 0),
  );
}

export function TreatmentDetailPage({
  category,
  treatment,
}: TreatmentDetailPageProps) {
  const patch = usePublicationPreview();
  const categoryHref = `/services/${category.slug}`;
  const headingPrefix = treatment.slug;

  function visibleSection(
    id: TreatmentSectionId,
  ): TreatmentSection | undefined {
    const section = treatment.sections[id];

    if (!section || !hasSectionContent(section)) {
      return undefined;
    }

    if (
      !resolveTreatmentSectionEnabled(
        patch,
        treatment.categorySlug,
        treatment.slug,
        id,
        section.enabled,
      )
    ) {
      return undefined;
    }

    return section;
  }
  const overview = visibleSection("overview");
  const maintenance = visibleSection("maintenance");
  const alternatives = visibleSection("alternatives");
  const faq = visibleSection("faq");
  const clinicalNote = visibleSection("clinicalNote");
  const related = visibleSection("relatedTreatments");
  const relatedTreatments = related?.relatedSlugs
    ? getPublishedTreatmentsBySlugs(related.relatedSlugs)
    : [];

  const coreSections = CORE_IDS.flatMap((id) => {
    const section = visibleSection(id);
    return section ? [{ id, section }] : [];
  });
  const experienceSections = EXPERIENCE_IDS.flatMap((id) => {
    const section = visibleSection(id);
    return section ? [{ id, section }] : [];
  });
  const stripItems = STRIP_IDS.flatMap((id) => {
    const section = visibleSection(id);
    return section
      ? [
          {
            href: `#${headingPrefix}-${id}-heading`,
            label: section.heading,
            sectionId: id,
          },
        ]
      : [];
  }).slice(0, 4);

  const heroMediaKey = treatment.heroMediaKey ?? treatment.mediaKey;
  const supportingMediaKey = treatment.supportingMediaKey;

  return (
    <>
      <EditorialHero
        headingId="treatment-heading"
        eyebrow={category.title}
        title={treatment.title}
        description={treatment.summary}
        breadcrumb={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { href: categoryHref, label: category.title },
          { label: treatment.title },
        ]}
        primaryAction={headerCta}
        secondaryAction={{ href: categoryHref, label: category.title }}
        media={
          <OptionalMediaPanel
            mediaKey={heroMediaKey}
            visualTarget="services-treatment-media"
            aspectRatio="4 / 5"
            sizes="(min-width: 64rem) 28rem, 100vw"
          />
        }
      >
        <Prose className="mt-stack max-w-none">
          <p>{treatment.intro}</p>
        </Prose>
      </EditorialHero>

      {stripItems.length > 0 ? (
        <Section
          tone="muted"
          className="py-8 md:py-10"
          aria-label={treatment.title}
        >
          <Container>
            <BenefitStrip items={stripItems} />
          </Container>
        </Section>
      ) : null}

      {overview ? (
        <EditorialSplit
          headingId={`${headingPrefix}-overview-heading`}
          title={overview.heading}
          media={
            supportingMediaKey ? (
              <OptionalMediaPanel
                mediaKey={supportingMediaKey}
                visualTarget="services-treatment-media"
                aspectRatio="4 / 3"
                sizes="(min-width: 64rem) 24rem, 100vw"
              />
            ) : undefined
          }
        >
          <SectionCopy section={overview} />
        </EditorialSplit>
      ) : null}

      {coreSections.length > 0 ? (
        <Section
          aria-label={coreSections.map((item) => item.section.heading).join(", ")}
        >
          <Container>
            <InfoCardGrid columns={3}>
              {coreSections.map((item, index) => (
                <InfoCard
                  key={item.id}
                  headingId={`${headingPrefix}-${item.id}-heading`}
                  title={item.section.heading}
                  sectionId={item.id}
                  index={index}
                >
                  <SectionCopy section={item.section} />
                </InfoCard>
              ))}
            </InfoCardGrid>
          </Container>
        </Section>
      ) : null}

      {experienceSections.length > 0 ? (
        <Section
          tone="muted"
          aria-label={experienceSections
            .map((item) => item.section.heading)
            .join(", ")}
        >
          <Container>
            <InfoCardGrid columns={2}>
              {experienceSections.map((item, index) => (
                <InfoCard
                  key={item.id}
                  headingId={`${headingPrefix}-${item.id}-heading`}
                  title={item.section.heading}
                  sectionId={item.id}
                  index={index}
                >
                  <SectionCopy section={item.section} />
                </InfoCard>
              ))}
            </InfoCardGrid>
          </Container>
        </Section>
      ) : null}

      {maintenance || alternatives || faq ? (
        <Section
          aria-label={[
            maintenance?.heading,
            alternatives?.heading,
            faq?.heading,
          ]
            .filter(Boolean)
            .join(", ")}
        >
          <Container>
            <div className="grid min-w-0 items-start gap-4 md:gap-5 lg:grid-cols-3">
              {maintenance ? (
                <InfoCard
                  headingId={`${headingPrefix}-maintenance-heading`}
                  title={maintenance.heading}
                  sectionId="maintenance"
                >
                  <SectionCopy section={maintenance} />
                </InfoCard>
              ) : null}
              {alternatives ? (
                <InfoCard
                  headingId={`${headingPrefix}-alternatives-heading`}
                  title={alternatives.heading}
                  sectionId="alternatives"
                  index={1}
                >
                  <SectionCopy section={alternatives} />
                </InfoCard>
              ) : null}
              {faq?.faqs ? (
                <div className={faq && maintenance && alternatives ? "" : "lg:col-span-2"}>
                  <FAQAccordion
                    headingId={`${headingPrefix}-faq-heading`}
                    title={faq.heading}
                    items={faq.faqs}
                  />
                </div>
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}

      {clinicalNote ? (
        <Section tone="surface" aria-labelledby={`${headingPrefix}-clinicalNote-heading`}>
          <Container>
            <div
              className="editorial-card editorial-card-quiet mx-auto max-w-3xl p-6 md:p-8"
              data-visual-target="editorial-cards"
            >
              <h2
                id={`${headingPrefix}-clinicalNote-heading`}
                className="text-[length:calc(var(--theme-h3)*var(--theme-heading-scale,1))] font-semibold tracking-[var(--theme-h3-tracking)] leading-[var(--theme-h3-leading)] text-heading"
              >
                {clinicalNote.heading}
              </h2>
              <SectionCopy section={clinicalNote} className="mt-4" />
            </div>
          </Container>
        </Section>
      ) : null}

      {relatedTreatments.length > 0 && related ? (
        <Section
          tone="muted"
          aria-labelledby={`${headingPrefix}-relatedTreatments-heading`}
        >
          <Container>
            <RelatedCareGrid
              headingId={`${headingPrefix}-relatedTreatments-heading`}
              title={related.heading}
              treatments={relatedTreatments}
            />
          </Container>
        </Section>
      ) : null}

      <PatientCta
        headingId={`${treatment.slug}-appointment-heading`}
        eyebrow="Next step"
        title="Ask whether this visit is appropriate"
        description="Recommendations follow an exam. Request an appointment if you would like this type of care reviewed for your mouth."
        primaryAction={headerCta}
        secondaryAction={{ href: "/contact", label: "Contact" }}
        tone="surface"
      />
    </>
  );
}
