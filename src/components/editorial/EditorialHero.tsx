import type { ReactNode } from "react";
import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Breadcrumb,
  type BreadcrumbItem,
} from "@/components/editorial/Breadcrumb";
import type { NavItem } from "@/types/navigation";
import type { SectionTone } from "@/types/ui";
import { cn } from "@/lib/cn";

type EditorialHeroProps = {
  headingId: string;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  primaryAction?: NavItem;
  secondaryAction?: NavItem;
  breadcrumb?: readonly BreadcrumbItem[];
  media?: ReactNode;
  tone?: SectionTone;
  mediaFirst?: boolean;
};

export function EditorialHero({
  headingId,
  eyebrow,
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
  breadcrumb,
  media,
  tone = "default",
  mediaFirst = false,
}: EditorialHeroProps) {
  return (
    <Section
      tone={tone}
      className="py-10 md:py-16"
      aria-labelledby={headingId}
    >
      <Container>
        <div
          className={cn(
            "grid min-w-0 items-center gap-10 lg:gap-16",
            media
              ? "lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,28rem)]"
              : undefined,
          )}
        >
          <div
            className={cn(
              "min-w-0",
              media && mediaFirst ? "lg:order-2" : undefined,
            )}
          >
            {breadcrumb ? <Breadcrumb items={breadcrumb} className="mb-5" /> : null}
            <SectionHeading
              as="h1"
              id={headingId}
              eyebrow={eyebrow}
              title={title}
              description={description}
              measure="column"
            />
            {children}
            <ActionRow primary={primaryAction} secondary={secondaryAction} />
          </div>
          {media ? (
            <div
              className={cn(
                "min-w-0",
                mediaFirst ? "lg:order-1" : undefined,
              )}
            >
              {media}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
