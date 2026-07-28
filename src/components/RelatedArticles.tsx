import type { Article } from "@/types/article";
import ArticleCard from "@/components/ArticleCard";

export default function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="mb-6 border-b border-slate pb-3 text-2xl font-bold text-navy">
        Related Articles
      </h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
