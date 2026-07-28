import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/article";
import CategoryBadge from "@/components/CategoryBadge";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="flex flex-col border border-slate bg-white">
      <Link
        href={`/article/${article.slug}`}
        className="relative block aspect-video w-full overflow-hidden bg-slate"
      >
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <CategoryBadge category={article.category} />
        <h3 className="text-lg font-bold leading-snug text-navy">
          <Link href={`/article/${article.slug}`} className="hover:text-sound">
            {article.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-muted">{article.excerpt}</p>
        <Link
          href={`/article/${article.slug}`}
          className="mt-auto pt-2 text-sm font-semibold text-sound hover:text-navy"
        >
          Read Full Story →
        </Link>
      </div>
    </article>
  );
}
