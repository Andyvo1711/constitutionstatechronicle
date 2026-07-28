import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { getCategoryLabel, isCategorySlug, type CategorySlug } from "@/config/categories";
import type { Article, ArticleFrontmatter, ArticleWithHtml } from "@/types/article";

const ARTICLES_DIRECTORY = path.join(process.cwd(), "content", "articles");

function isValidDate(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function validateFrontmatter(
  data: Record<string, unknown>,
  fileName: string,
): ArticleFrontmatter | null {
  const requiredStringFields = [
    "title",
    "slug",
    "excerpt",
    "category",
    "date",
    "coverImage",
    "imageCredit",
  ] as const;

  for (const field of requiredStringFields) {
    if (typeof data[field] !== "string" || data[field].trim() === "") {
      console.error(
        `[articles] Skipping "${fileName}": missing or invalid field "${field}".`,
      );
      return null;
    }
  }

  if (typeof data.featured !== "boolean") {
    console.error(
      `[articles] Skipping "${fileName}": "featured" must be a boolean.`,
    );
    return null;
  }

  if (!isValidDate(data.date)) {
    console.error(`[articles] Skipping "${fileName}": invalid "date".`);
    return null;
  }

  if (!isCategorySlug(data.category as string)) {
    console.error(
      `[articles] Skipping "${fileName}": unknown category "${String(data.category)}".`,
    );
    return null;
  }

  const expectedSlug = fileName.replace(/\.md$/, "");
  if (data.slug !== expectedSlug) {
    console.error(
      `[articles] Skipping "${fileName}": slug "${String(data.slug)}" does not match filename.`,
    );
    return null;
  }

  return {
    title: data.title as string,
    slug: data.slug as string,
    excerpt: data.excerpt as string,
    category: data.category as CategorySlug,
    date: data.date as string,
    coverImage: data.coverImage as string,
    featured: data.featured as boolean,
    imageCredit: data.imageCredit as string,
  };
}

let cachedArticles: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (cachedArticles) return cachedArticles;

  if (!fs.existsSync(ARTICLES_DIRECTORY)) {
    console.error(`[articles] Articles directory not found: ${ARTICLES_DIRECTORY}`);
    cachedArticles = [];
    return cachedArticles;
  }

  const fileNames = fs
    .readdirSync(ARTICLES_DIRECTORY)
    .filter((name) => name.endsWith(".md"));

  const articles: Article[] = [];

  for (const fileName of fileNames) {
    try {
      const fullPath = path.join(ARTICLES_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const frontmatter = validateFrontmatter(data, fileName);
      if (!frontmatter) continue;

      articles.push({ ...frontmatter, body: content });
    } catch (error) {
      console.error(`[articles] Failed to parse "${fileName}":`, error);
    }
  }

  articles.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  cachedArticles = articles;
  return cachedArticles;
}

export function getArticleBySlug(slug: string): ArticleWithHtml | null {
  const article = getAllArticles().find((item) => item.slug === slug);
  if (!article) return null;

  const processedContent = remark().use(remarkHtml).processSync(article.body);
  const contentHtml = processedContent.toString();

  return { ...article, contentHtml };
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((article) => article.category === category);
}

export function getFeaturedArticle(): Article | null {
  const featured = getAllArticles().filter((article) => article.featured);
  return featured[0] ?? getAllArticles()[0] ?? null;
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const others = getAllArticles().filter((item) => item.slug !== article.slug);

  const sameCategory = others.filter((item) => item.category === article.category);
  const rest = others.filter((item) => item.category !== article.category);

  return [...sameCategory, ...rest].slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  return getAllArticles().filter((article) => {
    const categoryLabel = getCategoryLabel(article.category);
    const haystack = [
      article.title,
      article.excerpt,
      article.body,
      article.category,
      categoryLabel,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(trimmed);
  });
}
