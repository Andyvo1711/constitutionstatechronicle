import Link from "next/link";
import { CATEGORIES } from "@/config/categories";
import SearchBar from "@/components/SearchBar";
import MobileNavigation from "@/components/MobileNavigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  ...CATEGORIES.map((category) => ({
    href: `/category/${category.slug}`,
    label: category.label,
  })),
];

export default function Header() {
  return (
    <header className="relative border-b border-slate">
      <div className="bg-colonial">
        <div className="mx-auto max-w-6xl px-4 py-1.5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-parchment sm:px-6 lg:px-8">
          Connecticut&rsquo;s Independent Newsroom
        </div>
      </div>

      <div className="border-b-2 border-copper bg-navy">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0">
            <span className="block font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Constitution State Chronicle
            </span>
            <span className="mt-1 block text-xs uppercase tracking-widest text-slate">
              Connecticut News, Leadership, Business, Health, and Community
            </span>
          </Link>

          <div className="hidden max-w-xs flex-1 md:block">
            <SearchBar />
          </div>

          <MobileNavigation navItems={NAV_ITEMS} />
        </div>

        <nav aria-label="Primary" className="hidden border-t border-white/10 md:block">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block border-b-2 border-transparent py-3 text-sm font-semibold uppercase tracking-wide text-white hover:border-copper hover:text-copper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
