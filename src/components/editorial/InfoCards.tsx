import type { ReactNode } from "react";
import { EditorialGlyph } from "@/components/editorial/EditorialGlyph";
import type { TreatmentSectionId } from "@/types/content";
import { cn } from "@/lib/cn";

type BenefitStripItem = {
  href: string;
  label: string;
  sectionId?: TreatmentSectionId;
};

type BenefitStripProps = {
  items: readonly BenefitStripItem[];
  className?: string;
};

export function BenefitStrip({ items, className }: BenefitStripProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul
      className={cn(
        "grid min-w-0 gap-3 sm:grid-cols-2",
        items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item, index) => (
        <li key={item.href} className="min-w-0">
          <a
            href={item.href}
            className="editorial-card flex h-full min-w-0 items-start gap-3 px-4 py-3.5 text-foreground no-underline hover:border-primary/30"
            data-visual-target="editorial-cards"
          >
            <EditorialGlyph sectionId={item.sectionId} index={index} />
            <span className="min-w-0 pt-0.5 text-sm font-semibold leading-snug tracking-tight">
              {item.label}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

type InfoCardProps = {
  headingId: string;
  title: string;
  sectionId?: TreatmentSectionId;
  index?: number;
  children: ReactNode;
  headingLevel?: "h2" | "h3";
};

export function InfoCard({
  headingId,
  title,
  sectionId,
  index = 0,
  children,
  headingLevel = "h2",
}: InfoCardProps) {
  const Heading = headingLevel;

  return (
    <article
      className="editorial-card flex h-full min-w-0 flex-col gap-4 p-5 md:p-6"
      data-visual-target="editorial-cards"
    >
      <div className="flex min-w-0 items-start gap-3">
        <EditorialGlyph sectionId={sectionId} index={index} />
        <Heading
          id={headingId}
          className="min-w-0 scroll-mt-28 text-[length:calc(var(--theme-h3)*var(--theme-heading-scale,1))] font-semibold tracking-[var(--theme-h3-tracking)] leading-[var(--theme-h3-leading)] text-heading"
        >
          {title}
        </Heading>
      </div>
      <div className="min-w-0">{children}</div>
    </article>
  );
}

type InfoCardGridProps = {
  columns?: 2 | 3;
  children: ReactNode;
  className?: string;
};

export function InfoCardGrid({
  columns = 2,
  children,
  className,
}: InfoCardGridProps) {
  return (
    <div
      className={cn(
        "grid min-w-0 items-stretch gap-4 md:gap-5",
        columns === 3
          ? "sm:grid-cols-2 lg:grid-cols-3"
          : "sm:grid-cols-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
