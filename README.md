# Constitution State Chronicle

A premium, production-ready local news website for the State of Connecticut — covering
education, healthcare, business leadership, finance & economy, and beauty & wellness across
Hartford, New Haven, Stamford, Bridgeport, Greenwich, Norwalk, Waterbury, Danbury, New London,
West Hartford, Fairfield County, and other Connecticut communities.

## Technology Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- Markdown files for article storage — **no database, no CMS, no external backend**
- [`gray-matter`](https://github.com/jonschlinkert/gray-matter) for frontmatter parsing
- [`remark`](https://github.com/remarkjs/remark) + [`remark-html`](https://github.com/remarkjs/remark-html) for Markdown → HTML rendering
- `next/font` (Playfair Display for headlines, Source Sans 3 for body/UI)

## Folder Structure

```text
constitution-state-chronicle/
├── content/
│   └── articles/            75 Markdown article files
├── public/
├── scripts/
│   └── validate-content.ts  Content validation script
├── src/
│   ├── app/
│   │   ├── article/[slug]/page.tsx
│   │   ├── category/[slug]/page.tsx
│   │   ├── search/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/          Header, Footer, SearchBar, MobileNavigation,
│   │                        HeroArticle, ArticleCard, CategorySection,
│   │                        Pagination, RelatedArticles, CategoryBadge
│   ├── config/
│   │   └── categories.ts    Centralized category configuration
│   ├── lib/
│   │   ├── articles.ts      Article loading/parsing/search utilities
│   │   └── date.ts
│   └── types/
│       └── article.ts       Strict Article TypeScript interface
├── next.config.ts
├── package.json
└── README.md
```

## Installation

```bash
npm install
```

## Local Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Content Validation

Validates that all 75 Markdown files exist, every category has exactly 15 articles, all required
frontmatter fields are present and well-formed, slugs match filenames and are unique, cover image
URLs are unique Unsplash/Pexels URLs, and `featured` values are booleans.

```bash
npm run validate:content
```

## Production Build

Content validation runs automatically before `next build` via the `prebuild` script.

```bash
npm run validate:content
npm run lint
npm run build
npm start
```

## Adding a New Markdown Article

Create a new file in `content/articles/` named after the article's slug, e.g.
`content/articles/connecticut-universities-expand-ai-programs.md`:

```yaml
---
title: "Article Title"
slug: "connecticut-universities-expand-ai-programs"
excerpt: "A concise summary of the article."
category: "education"
date: "2026-06-15"
coverImage: "https://images.unsplash.com/photo-XXXXXXX?q=80&w=1600&auto=format&fit=crop"
featured: false
imageCredit: "Photo: Unsplash/Photographer Name"
---

Article body in Markdown, starting with a paragraph (no top-level `#` heading — the page renders
the title separately). Include at least two `##` subheadings.
```

### Required Frontmatter Fields

| Field        | Type    | Notes                                                        |
| ------------ | ------- | ------------------------------------------------------------- |
| `title`      | string  | Article headline                                              |
| `slug`       | string  | Must exactly match the filename (without `.md`)                |
| `excerpt`    | string  | Short summary shown on cards and search results                |
| `category`   | string  | One of the five category slugs below                           |
| `date`       | string  | `YYYY-MM-DD`; used for sorting only — shown solely on the article page |
| `coverImage` | string  | A real, working `images.unsplash.com` or `images.pexels.com` URL, unique across all articles |
| `featured`   | boolean | Only one article site-wide should be `true` (homepage hero)    |
| `imageCredit`| string  | e.g. `Photo: Unsplash/Jane Smith`, shown beneath the cover image |

Do **not** add `description` or `author` fields.

### Category Slugs

| Label              | Slug               |
| ------------------ | ------------------- |
| Education           | `education`          |
| Healthcare           | `healthcare`          |
| Business Leaders     | `business-leaders`    |
| Finance & Economy    | `finance-economy`     |
| Beauty & Wellness    | `beauty-wellness`     |

### Image Requirements

- Real, high-resolution, working URLs from `images.unsplash.com` or `images.pexels.com` only.
- No placeholder services (`picsum.photos`, generated color blocks, local empty files, etc.).
- Each cover image URL must be unique — never reused across articles.
- Image content should clearly match the article's category and subject.

## Notes

- Publication dates appear **only** on `/article/[slug]` — never on the homepage, search page,
  category pages, related-article cards, header, or footer.
- Total article counts are never displayed anywhere on the site.
- Category pages display all articles in the category on a single page (no pagination).
