import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceCategoryPage } from "@/components/sections";
import {
  getConfirmedCategories,
  getConfirmedCategoryBySlug,
  getConfirmedServicesByCategory,
} from "@/data/services";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return getConfirmedCategories().map((category) => ({
    category: category.slug,
  }));
}

export const dynamicParams = false;

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

  return {
    title: category.title,
    description: category.summary,
  };
}

export default async function Page({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getConfirmedCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <ServiceCategoryPage
      category={category}
      treatments={getConfirmedServicesByCategory(category.slug)}
    />
  );
}
