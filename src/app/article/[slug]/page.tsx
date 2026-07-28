import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { formatDate } from "@/lib/date";
import CategoryBadge from "@/components/CategoryBadge";
import RelatedArticles from "@/components/RelatedArticles";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3);

  return (
    <article>
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:px-8">
        <CategoryBadge category={article.category} />
        <h1 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-3 text-sm text-muted">{formatDate(article.date)}</p>
      </div>

      <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-video w-full overflow-hidden bg-slate">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
        <p className="mt-2 text-xs text-muted">{article.imageCredit}</p>
      </div>

      <div
        className="prose prose-neutral mx-auto mt-8 max-w-3xl px-4 pb-6 leading-relaxed prose-headings:font-headline prose-headings:text-navy prose-a:text-sound sm:px-6 lg:px-8"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      <RelatedArticles articles={related} />
    </article>
  );
}
