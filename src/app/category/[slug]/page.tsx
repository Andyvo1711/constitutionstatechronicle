import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategoryBySlug } from "@/config/categories";
import { getArticlesByCategory } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";

const ARTICLES_PER_PAGE = 6;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.label,
    description: category.intro,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const { page } = await searchParams;
  const articles = getArticlesByCategory(category.slug);
  const totalPages = Math.max(1, Math.ceil(articles.length / ARTICLES_PER_PAGE));

  const requestedPage = Number(page);
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= totalPages
      ? requestedPage
      : 1;

  const start = (currentPage - 1) * ARTICLES_PER_PAGE;
  const pageArticles = articles.slice(start, start + ARTICLES_PER_PAGE);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-navy">{category.label}</h1>
      <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">{category.intro}</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pageArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/category/${category.slug}`}
      />
    </div>
  );
}
