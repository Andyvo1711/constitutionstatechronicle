import type { Metadata } from "next";
import { searchArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Constitution State Chronicle for Connecticut news, leadership, and community stories.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = query ? searchArticles(query) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-navy">Search Results</h1>

      {query && (
        <p className="mt-2 text-sm text-muted">
          Showing results for <span className="font-semibold text-charcoal">&ldquo;{query}&rdquo;</span>
        </p>
      )}

      {!query && (
        <p className="mt-6 text-base text-muted">Enter a keyword to search Connecticut stories.</p>
      )}

      {query && results.length === 0 && (
        <p className="mt-6 text-base text-muted">No articles matched your search.</p>
      )}

      {results.length > 0 && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
