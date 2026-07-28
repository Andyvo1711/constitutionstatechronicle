import type { Metadata } from "next";
import { CATEGORIES } from "@/config/categories";
import { getArticlesByCategory, getFeaturedArticle } from "@/lib/articles";
import HeroArticle from "@/components/HeroArticle";
import CategorySection from "@/components/CategorySection";

export const metadata: Metadata = {
  title: "Constitution State Chronicle | Connecticut News and Local Leadership",
  description:
    "Independent coverage of education, healthcare, business leadership, finance, wellness, and community life across Connecticut.",
};

export default function Home() {
  const featured = getFeaturedArticle();

  return (
    <div>
      {featured && <HeroArticle article={featured} />}

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {CATEGORIES.map((category) => {
          const articles = getArticlesByCategory(category.slug).filter(
            (article) => article.slug !== featured?.slug,
          );
          if (articles.length === 0) return null;

          const [primary, ...rest] = articles;
          const secondary = rest.slice(0, 4);

          return (
            <CategorySection
              key={category.slug}
              category={category}
              primary={primary}
              secondary={secondary}
            />
          );
        })}
      </div>
    </div>
  );
}
