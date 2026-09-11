import { Prose } from "@/components/ui/Prose";
import type { TreatmentFaq, TreatmentSection } from "@/types/content";
import { cn } from "@/lib/cn";

export function SectionCopy({
  section,
  className,
}: {
  section: TreatmentSection;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      {section.paragraphs && section.paragraphs.length > 0 ? (
        <Prose className="max-w-none">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
      ) : null}
      {section.items && section.items.length > 0 ? (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted">
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

type FAQAccordionProps = {
  headingId: string;
  title: string;
  items: readonly TreatmentFaq[];
};

export function FAQAccordion({ headingId, title, items }: FAQAccordionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className="editorial-card editorial-faq min-w-0 p-5 md:p-6"
      data-visual-target="editorial-cards"
    >
      <h2
        id={headingId}
        className="text-[length:calc(var(--theme-h3)*var(--theme-heading-scale,1))] font-semibold tracking-[var(--theme-h3-tracking)] leading-[var(--theme-h3-leading)] text-heading"
      >
        {title}
      </h2>
      <div className="mt-4 divide-y divide-border border-y border-border">
        {items.map((item) => (
          <details key={item.question} className="group py-3.5">
            <summary className="flex min-h-11 list-none items-center justify-between gap-4 text-base font-semibold tracking-tight text-foreground">
              <span className="min-w-0">{item.question}</span>
              <span
                aria-hidden="true"
                className="shrink-0 text-lg font-normal leading-none text-muted group-open:hidden"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="hidden shrink-0 text-lg font-normal leading-none text-muted group-open:inline"
              >
                −
              </span>
            </summary>
            <p className="mt-2 pr-8 text-base leading-relaxed text-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
