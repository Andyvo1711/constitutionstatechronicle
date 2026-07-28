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
    <header className="relative border-b border-slate bg-navy">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <span className="block font-headline text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Constitution State Chronicle
          </span>
          <span className="block text-xs uppercase tracking-widest text-slate">
            Connecticut News, Leadership, Business, Health, and Community
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-white hover:text-copper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden max-w-xs flex-1 md:block">
          <SearchBar />
        </div>

        <MobileNavigation navItems={NAV_ITEMS} />
      </div>
    </header>
  );
}
