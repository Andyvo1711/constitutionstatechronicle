import Link from "next/link";
import { CATEGORIES } from "@/config/categories";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate bg-navy text-slate">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <span className="block font-headline text-xl font-bold text-white">
              Constitution State Chronicle
            </span>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate">
              Independent coverage of education, healthcare, business leadership, finance, and
              wellness across Connecticut communities.
            </p>
          </div>
          <nav aria-label="Footer categories">
            <span className="block text-sm font-semibold uppercase tracking-wider text-white">
              Categories
            </span>
            <ul className="mt-3 flex flex-col gap-2">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-sm text-slate hover:text-copper"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-sm text-slate">
          © {year} Constitution State Chronicle. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
