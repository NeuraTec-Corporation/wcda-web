import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegacyRuntime from "@/components/LegacyRuntime";
import { originalPageNames, originalPages } from "@/generated/page-registry";

export const dynamicParams = false;

export function generateStaticParams() {
  return originalPageNames
    .filter((legacyPage) => legacyPage !== "404.html" && legacyPage !== "index.html")
    .map((legacyPage) => ({ legacyPage }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ legacyPage: string }>;
}): Promise<Metadata> {
  const { legacyPage } = await params;
  const page = originalPages[legacyPage];
  return page ? { title: page.title } : {};
}

export default async function OriginalPageRoute({
  params,
}: {
  params: Promise<{ legacyPage: string }>;
}) {
  const { legacyPage } = await params;
  const page = originalPages[legacyPage];
  if (!page) notFound();
  const PageComponent = page.component;

  return (
    <LegacyRuntime>
      <PageComponent />
    </LegacyRuntime>
  );
}
