import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TreatmentItem } from "@/components/sections/TreatmentItem";
import { getTreatmentHref } from "@/data/services";
import type { ServiceCategory, ServiceRecord } from "@/types/content";
import type { SectionTone } from "@/types/ui";

export type TreatmentGroup = {
  category: ServiceCategory;
  treatments: readonly ServiceRecord[];
};

type TreatmentGroupsProps = {
  headingId: string;
  eyebrow?: string;
  title: string;
  description?: string;
  groups: readonly TreatmentGroup[];
  tone?: SectionTone;
};

export function TreatmentGroups({
  headingId,
  eyebrow,
  title,
  description,
  groups,
  tone = "default",
}: TreatmentGroupsProps) {
  if (groups.length === 0) {
    return null;
  }

  return (
    <Section tone={tone} aria-labelledby={headingId}>
      <Container>
        <SectionHeading
          as="h2"
          id={headingId}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="mt-stack-lg grid min-w-0 grid-cols-1 items-start gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <section
              key={group.category.slug}
              aria-labelledby={`${group.category.slug}-treatments-heading`}
              className="min-w-0"
            >
              <h3
                id={`${group.category.slug}-treatments-heading`}
                className="border-b border-border pb-2 text-base font-semibold tracking-tight text-foreground"
              >
                <Link
                  href={`/services/${group.category.slug}`}
                  className="text-foreground no-underline hover:text-primary"
                >
                  {group.category.title}
                </Link>
              </h3>
              <ul className="mt-3 flex flex-col">
                {group.treatments.map((treatment) => (
                  <li
                    key={treatment.slug}
                    className="min-w-0 border-t border-border"
                  >
                    <TreatmentItem
                      title={treatment.title}
                      mediaKey={treatment.mediaKey}
                      href={getTreatmentHref(treatment)}
                      status={treatment.status}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
}
