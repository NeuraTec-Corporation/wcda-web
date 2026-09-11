import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TreatmentDetailPage } from "@/components/sections/TreatmentDetailPage";
import {
  getCategoryBySlug,
  getConfirmedCategoryBySlug,
  getPublishedTreatment,
  getPublishedTreatments,
  getTreatmentBySlugs,
} from "@/data/services";
import { createPageMetadata } from "@/lib/metadata";
import { isLabPreviewSearch } from "@/lib/publication-access";
import { isThemeLabEnabled } from "@/config/theme";

type TreatmentPageProps = {
  params: Promise<{ category: string; treatment: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export function generateStaticParams() {
  return getPublishedTreatments().map((treatment) => ({
    category: treatment.categorySlug,
    treatment: treatment.slug,
  }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: TreatmentPageProps): Promise<Metadata> {
  const { category, treatment: treatmentSlug } = await params;
  const treatment = getPublishedTreatment(category, treatmentSlug);

  if (!treatment) {
    return {
      title: "Services",
      robots: { index: false, follow: false },
    };
  }

  return createPageMetadata({
    title: treatment.metaTitle ?? treatment.title,
    description: treatment.metaDescription,
    path: `/services/${treatment.categorySlug}/${treatment.slug}`,
  });
}

export default async function Page({ params, searchParams }: TreatmentPageProps) {
  const { category: categorySlug, treatment: treatmentSlug } = await params;
  const lab = isLabPreviewSearch(await searchParams) && isThemeLabEnabled();
  const category = lab
    ? getCategoryBySlug(categorySlug)
    : getConfirmedCategoryBySlug(categorySlug);
  const treatment = lab
    ? getTreatmentBySlugs(categorySlug, treatmentSlug)
    : getPublishedTreatment(categorySlug, treatmentSlug);

  if (!category || !treatment) {
    notFound();
  }

  return <TreatmentDetailPage category={category} treatment={treatment} />;
}
