import type { CategorySlug } from "@/config/categories";

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  category: CategorySlug;
  date: string;
  coverImage: string;
  featured: boolean;
  imageCredit: string;
}

export interface Article extends ArticleFrontmatter {
  body: string;
}

export interface ArticleWithHtml extends Article {
  contentHtml: string;
}
