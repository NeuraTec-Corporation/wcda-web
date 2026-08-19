import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const tokenSwatches = [
  { name: "Background", className: "bg-background" },
  { name: "Foreground", className: "bg-foreground" },
  { name: "Surface", className: "bg-surface" },
  { name: "Surface muted", className: "bg-surface-muted" },
  { name: "Primary", className: "bg-primary" },
  { name: "Primary hover", className: "bg-primary-hover" },
  { name: "Secondary", className: "bg-secondary" },
  { name: "Accent", className: "bg-accent" },
  { name: "Border", className: "bg-border" },
  { name: "Muted text", className: "bg-muted" },
  { name: "Success", className: "bg-success" },
  { name: "Warning", className: "bg-warning" },
  { name: "Error", className: "bg-error" },
  { name: "Focus", className: "bg-focus" },
] as const;

export function FoundationPreview() {
  return (
    <>
      <Section aria-labelledby="foundation-heading">
        <Container>
          <SectionHeading
            as="h1"
            id="foundation-heading"
            eyebrow="Internal"
            title="Design-system foundation"
            description="Internal verification for tokens, layout primitives, and interaction states. This route is not the public homepage."
          />
          <div className="mt-stack-lg flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="#components">View components</Button>
            <Button href="#tokens" variant="outline">
              View tokens
            </Button>
          </div>
          <p className="mt-stack text-sm leading-relaxed text-muted">
            Route: /foundation. Use this page to verify the design system. It is
            not linked from public navigation.
          </p>
        </Container>
      </Section>

      <Section id="components" tone="surface" aria-labelledby="components-heading">
        <Container>
          <SectionHeading
            as="h2"
            id="components-heading"
            eyebrow="Components"
            title="Reusable controls"
            description="Buttons keep semantic color tokens, visible focus, and usable disabled states."
          />
          <div className="mt-stack-lg grid gap-stack md:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground">Variants</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground">Sizes and states</h3>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted" aria-labelledby="structure-heading">
        <Container>
          <SectionHeading
            as="h2"
            id="structure-heading"
            eyebrow="Structure"
            title="Section and heading rhythm"
            description="Section, Container, and SectionHeading are the layout primitives later pages should compose."
          />
          <div className="mt-stack-lg rounded-lg border border-border bg-surface p-6 shadow-xs">
            <p className="text-sm leading-relaxed text-muted">
              Mobile-first spacing uses gutter and section tokens. Wider gutters and
              section padding apply from the small breakpoint up.
            </p>
          </div>
        </Container>
      </Section>

      <Section id="tokens" aria-labelledby="tokens-heading">
        <Container>
          <SectionHeading
            as="h2"
            id="tokens-heading"
            eyebrow="Tokens"
            title="Semantic color map"
            description="Components should reference these names rather than hard-coded hex values."
          />
          <ul className="mt-stack-lg grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {tokenSwatches.map((swatch) => (
              <li
                key={swatch.name}
                className="overflow-hidden rounded-md border border-border bg-surface shadow-xs"
              >
                <div className={`h-16 border-b border-border ${swatch.className}`} />
                <p className="px-3 py-2 text-sm text-foreground">{swatch.name}</p>
              </li>
            ))}
          </ul>
          <div className="mt-stack flex flex-wrap gap-3">
            <span className="rounded-md bg-success px-3 py-1 text-sm font-medium text-success-foreground">
              Success
            </span>
            <span className="rounded-md bg-warning px-3 py-1 text-sm font-medium text-warning-foreground">
              Warning
            </span>
            <span className="rounded-md bg-error px-3 py-1 text-sm font-medium text-error-foreground">
              Error
            </span>
          </div>
        </Container>
      </Section>
    </>
  );
}
