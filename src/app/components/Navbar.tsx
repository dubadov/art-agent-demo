"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "ראשי", labelEn: "Home" },
  { href: "/museums", label: "מוזיאונים", labelEn: "Museums" },
  { href: "/galleries", label: "גלריות", labelEn: "Galleries" },
  { href: "/exhibitions", label: "תערוכות", labelEn: "Exhibitions" },
  { href: "/artists", label: "אמנים", labelEn: "Artists" },
  { href: "/outreach", label: "פנייה לאמנים", labelEn: "Outreach" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="gradient-hero text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            <span className="text-xl font-bold tracking-tight">
              Art<span className="text-[var(--color-accent)]">Agent</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-white/15 text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <span className="text-xs text-gray-400 bg-white/10 px-3 py-1 rounded-full">
              🤖 מופעל על ידי AI
            </span>
          </div>

          <div className="md:hidden">
            <MobileMenu pathname={pathname} />
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  return (
    <details className="relative">
      <summary className="list-none cursor-pointer p-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <div className="absolute left-0 mt-2 w-56 bg-[var(--color-surface)] rounded-xl shadow-2xl p-2 z-50">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2.5 rounded-lg text-sm ${
              pathname === link.href
                ? "bg-white/15 text-white"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
