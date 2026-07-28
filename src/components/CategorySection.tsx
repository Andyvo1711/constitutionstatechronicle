import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/article";
import type { Category } from "@/config/categories";

export default function CategorySection({
  category,
  primary,
  secondary,
}: {
  category: Category;
  primary: Article;
  secondary: Article[];
}) {
  return (
    <section className="border-t border-slate py-10">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-navy">{category.label}</h2>
        <Link
          href={`/category/${category.slug}`}
          className="text-sm font-semibold text-sound hover:text-navy"
        >
          View All →
        </Link>
      </div>
      <div className="grid gap-8 lg:grid-cols-12">
        <article className="lg:col-span-7">
          <Link
            href={`/article/${primary.slug}`}
            className="relative block aspect-video w-full overflow-hidden bg-slate"
          >
            <Image
              src={primary.coverImage}
              alt={primary.title}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </Link>
          <h3 className="mt-4 text-2xl font-bold leading-snug text-navy">
            <Link href={`/article/${primary.slug}`} className="hover:text-sound">
              {primary.title}
            </Link>
          </h3>
          <p className="mt-2 text-base leading-relaxed text-muted">{primary.excerpt}</p>
        </article>

        <div className="flex flex-col divide-y divide-slate lg:col-span-5">
          {secondary.map((article) => (
            <article key={article.slug} className="flex gap-4 py-4 first:pt-0">
              <Link
                href={`/article/${article.slug}`}
                className="relative block aspect-square w-24 shrink-0 overflow-hidden bg-slate sm:w-28"
              >
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-col justify-center gap-1">
                <h4 className="text-base font-bold leading-snug text-navy">
                  <Link href={`/article/${article.slug}`} className="hover:text-sound">
                    {article.title}
                  </Link>
                </h4>
                <p className="line-clamp-2 text-sm leading-relaxed text-muted">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
