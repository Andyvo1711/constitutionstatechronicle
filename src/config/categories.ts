export interface Category {
  slug: string;
  label: string;
  intro: string;
}

export const CATEGORIES = [
  {
    slug: "education",
    label: "Education",
    intro:
      "Coverage of Connecticut's colleges, universities, technical schools, and K-12 systems — from campus research to classroom innovation.",
  },
  {
    slug: "healthcare",
    label: "Healthcare",
    intro:
      "News on Connecticut's hospitals, health systems, and medical research, with a focus on patient care and community health access.",
  },
  {
    slug: "business-leaders",
    label: "Business Leaders",
    intro:
      "Profiles of entrepreneurs and executives building companies across Hartford, New Haven, Stamford, and communities throughout Connecticut.",
  },
  {
    slug: "finance-economy",
    label: "Finance & Economy",
    intro:
      "Analysis of Connecticut's insurance, financial services, manufacturing, and regional economic trends shaping the state's outlook.",
  },
  {
    slug: "beauty-wellness",
    label: "Beauty & Wellness",
    intro:
      "Stories on spas, fitness studios, and wellness practitioners helping Connecticut communities look and feel their best.",
  },
] as const satisfies readonly Category[];

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

const CATEGORY_MAP = new Map<string, Category>(
  CATEGORIES.map((category) => [category.slug, category]),
);

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORY_MAP.get(slug);
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return CATEGORY_MAP.has(slug);
}

export function getCategoryLabel(slug: string): string {
  return CATEGORY_MAP.get(slug)?.label ?? slug;
}
