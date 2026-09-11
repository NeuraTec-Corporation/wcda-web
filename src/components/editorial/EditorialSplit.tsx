import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SectionTone } from "@/types/ui";
import { cn } from "@/lib/cn";

type EditorialSplitProps = {
  headingId: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  media?: ReactNode;
  tone?: SectionTone;
  mediaFirst?: boolean;
};

export function EditorialSplit({
  headingId,
  eyebrow,
  title,
  children,
  media,
  tone = "muted",
  mediaFirst = false,
}: EditorialSplitProps) {
  return (
    <Section tone={tone} aria-labelledby={headingId}>
      <Container>
        <div
          className={cn(
            "grid min-w-0 items-start gap-10 lg:gap-16",
            media ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(14rem,24rem)]" : undefined,
          )}
        >
          <div
            className={cn(
              "min-w-0",
              media && mediaFirst ? "lg:order-2" : undefined,
            )}
          >
            <SectionHeading
              as="h2"
              id={headingId}
              eyebrow={eyebrow}
              title={title}
              measure="column"
            />
            <div className="mt-stack min-w-0">{children}</div>
          </div>
          {media ? (
            <div
              className={cn(
                "min-w-0 lg:sticky lg:top-28",
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
