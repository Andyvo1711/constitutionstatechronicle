import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-navy">Story Not Found</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        The page you requested may have moved or is no longer available.
      </p>
      <Link
        href="/"
        className="mt-8 border border-navy px-6 py-2 text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-navy hover:text-white"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
