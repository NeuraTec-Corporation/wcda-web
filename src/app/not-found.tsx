import type { Metadata } from "next";
import { ActionRow } from "@/components/ui/ActionRow";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you requested is not available. Return home or contact West Caldwell Dental Arts.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <Section aria-labelledby="not-found-heading">
      <Container>
        <SectionHeading
          as="h1"
          id="not-found-heading"
          eyebrow="404"
          title="Page not found"
          description="The page you requested is not available. It may have been moved, or the address may be incorrect."
        />
        <ActionRow
          primary={{ href: "/", label: "Home" }}
          secondary={{ href: "/contact", label: "Contact" }}
        />
      </Container>
    </Section>
  );
}
