import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CATEGORIES, isCategorySlug } from "../src/config/categories";

const ARTICLES_DIRECTORY = path.join(process.cwd(), "content", "articles");

const REQUIRED_FIELDS = [
  "title",
  "slug",
  "excerpt",
  "category",
  "date",
  "coverImage",
  "featured",
  "imageCredit",
] as const;

const errors: string[] = [];

function isValidImageUrl(url: string): boolean {
  return (
    /^https:\/\/images\.unsplash\.com\//.test(url) ||
    /^https:\/\/images\.pexels\.com\//.test(url)
  );
}

function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
}

if (!fs.existsSync(ARTICLES_DIRECTORY)) {
  console.error(`Articles directory not found: ${ARTICLES_DIRECTORY}`);
  process.exit(1);
}

const fileNames = fs
  .readdirSync(ARTICLES_DIRECTORY)
  .filter((name) => name.endsWith(".md"));



const seenSlugs = new Map<string, string>();
const seenImages = new Map<string, string>();
const categoryCounts = new Map<string, number>(
  CATEGORIES.map((category) => [category.slug, 0]),
);

for (const fileName of fileNames) {
  const fullPath = path.join(ARTICLES_DIRECTORY, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(raw);

  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      errors.push(`${fileName}: missing required field "${field}".`);
    }
  }

  if (typeof data.title !== "string" || data.title.trim() === "") {
    errors.push(`${fileName}: "title" must be a non-empty string.`);
  }

  if (typeof data.slug === "string") {
    const expectedSlug = fileName.replace(/\.md$/, "");
    if (data.slug !== expectedSlug) {
      errors.push(
        `${fileName}: slug "${data.slug}" does not match filename "${expectedSlug}".`,
      );
    }
    if (seenSlugs.has(data.slug)) {
      errors.push(
        `${fileName}: duplicate slug "${data.slug}" also used by "${seenSlugs.get(data.slug)}".`,
      );
    } else {
      seenSlugs.set(data.slug, fileName);
    }
  }

  if (typeof data.category === "string") {
    if (!isCategorySlug(data.category)) {
      errors.push(`${fileName}: invalid category "${data.category}".`);
    } else {
      categoryCounts.set(data.category, (categoryCounts.get(data.category) ?? 0) + 1);
    }
  }

  if (typeof data.date !== "string" || !isValidDate(data.date)) {
    errors.push(`${fileName}: invalid "date" (expected YYYY-MM-DD), got "${data.date}".`);
  }

  if (typeof data.coverImage !== "string" || !isValidImageUrl(data.coverImage)) {
    errors.push(
      `${fileName}: "coverImage" must be a valid Unsplash or Pexels URL, got "${data.coverImage}".`,
    );
  } else {
    if (seenImages.has(data.coverImage)) {
      errors.push(
        `${fileName}: duplicate coverImage also used by "${seenImages.get(data.coverImage)}".`,
      );
    } else {
      seenImages.set(data.coverImage, fileName);
    }
  }

  if (typeof data.imageCredit !== "string" || data.imageCredit.trim() === "") {
    errors.push(`${fileName}: missing "imageCredit".`);
  }

  if (typeof data.featured !== "boolean") {
    errors.push(`${fileName}: "featured" must be a boolean.`);
  }
}


if (errors.length > 0) {
  console.error(`Content validation failed with ${errors.length} error(s):\n`);
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log(`Content validation passed: ${fileNames.length} articles across ${CATEGORIES.length} categories.`);
for (const category of CATEGORIES) {
  console.log(`  ${category.label}: ${categoryCounts.get(category.slug)}`);
}
