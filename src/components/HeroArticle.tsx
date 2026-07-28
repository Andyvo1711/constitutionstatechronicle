import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/article";
import CategoryBadge from "@/components/CategoryBadge";

export default function HeroArticle({ article }: { article: Article }) {
  return (
    <section className="relative border-b border-slate">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate sm:aspect-[16/8] lg:aspect-[16/6]">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:px-6 lg:max-w-3xl lg:px-8 lg:py-12">
            <CategoryBadge category={article.category} className="!text-copper" />
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              <Link href={`/article/${article.slug}`} className="hover:text-slate">
                {article.title}
              </Link>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate">{article.excerpt}</p>
            <Link
              href={`/article/${article.slug}`}
              className="inline-block w-fit border border-copper bg-navy/40 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-copper backdrop-blur-sm transition-colors hover:bg-copper hover:text-navy"
            >
              Read Full Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
