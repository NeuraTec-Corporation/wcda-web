import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceCategoryPage } from "@/components/sections";
import {
  getCategoryBySlug,
  getConfirmedCategories,
  getConfirmedCategoryBySlug,
  getConfirmedServicesByCategory,
  getManagedTreatmentsByCategory,
} from "@/data/services";
import { createPageMetadata } from "@/lib/metadata";
import { isLabPreviewSearch } from "@/lib/publication-access";
import { isThemeLabEnabled } from "@/config/theme";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export function generateStaticParams() {
  return getConfirmedCategories().map((category) => ({
    category: category.slug,
  }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getConfirmedCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Services",
    };
  }

  return createPageMetadata({
    title: category.title,
    description: category.metaDescription ?? category.summary,
    path: `/services/${category.slug}`,
  });
}

export default async function Page({ params, searchParams }: CategoryPageProps) {
  const { category: slug } = await params;
  const lab = isLabPreviewSearch(await searchParams) && isThemeLabEnabled();
  const category = lab ? getCategoryBySlug(slug) : getConfirmedCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <ServiceCategoryPage
      category={category}
      treatments={
        lab
          ? getManagedTreatmentsByCategory(category.slug)
          : getConfirmedServicesByCategory(category.slug)
      }
    />
  );
}
