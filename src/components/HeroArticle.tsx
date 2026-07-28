import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/article";
import CategoryBadge from "@/components/CategoryBadge";

export default function HeroArticle({ article }: { article: Article }) {
  return (
    <section className="border-b border-slate bg-navy">
      <div className="mx-auto grid max-w-6xl gap-0 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-12">
        <Link
          href={`/article/${article.slug}`}
          className="relative block aspect-video w-full overflow-hidden bg-slate lg:aspect-auto"
        >
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Link>
        <div className="flex flex-col justify-center gap-4 py-6 lg:py-0">
          <CategoryBadge category={article.category} className="!text-copper" />
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            <Link href={`/article/${article.slug}`} className="hover:text-slate">
              {article.title}
            </Link>
          </h1>
          <p className="text-base leading-relaxed text-slate">{article.excerpt}</p>
          <Link
            href={`/article/${article.slug}`}
            className="inline-block w-fit border border-copper px-5 py-2 text-sm font-semibold uppercase tracking-wide text-copper transition-colors hover:bg-copper hover:text-navy"
          >
            Read Full Story
          </Link>
        </div>
      </div>
    </section>
  );
}
