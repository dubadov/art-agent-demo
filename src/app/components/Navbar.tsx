"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/museums", label: "Museums Module" },
  { href: "/galleries", label: "Galleries Module" },
  { href: "/exhibitions", label: "Exhibitions Module" },
  { href: "/artists", label: "Artists Module" },
  { href: "/outreach", label: "Email Engine" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#06080d] text-white sticky top-0 z-50 border-b border-[var(--engine-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/art-agent-logo.png"
              alt="ArtAgent logo"
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="text-lg font-bold tracking-tight">
              Art<span className="text-[var(--color-accent)]">Agent</span>
            </span>
            <span className="hidden sm:inline font-mono text-[0.55rem] text-[var(--engine-text)] opacity-50 border border-[var(--engine-border)] px-1.5 py-0.5 rounded ml-1">
              ENGINE v2.1
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5" dir="ltr">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-1.5 rounded text-xs font-mono transition-colors ${
                  pathname === link.href
                    ? "bg-[var(--engine-cyan)]/10 text-[var(--engine-cyan)] border border-[var(--engine-cyan)]/20"
                    : "text-[var(--engine-text)] hover:text-[var(--engine-text-bright)] hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 font-mono text-[0.6rem]" dir="ltr">
            <span className="flex items-center gap-1.5">
              <span className="status-dot status-dot-online" />
              <span className="text-[var(--engine-text-bright)]">7 Engines</span>
            </span>
            <span className="text-[var(--engine-border)]">|</span>
            <span className="text-[var(--engine-amber)]">847 Records</span>
            <span className="text-[var(--engine-border)]">|</span>
            <span className="text-[var(--engine-green)]">99.2% Uptime</span>
          </div>

          <div className="lg:hidden">
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
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <div className="absolute left-0 mt-2 w-56 bg-[var(--engine-panel)] border border-[var(--engine-border)] rounded-lg shadow-2xl p-1.5 z-50" dir="ltr">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-3 py-2 rounded text-xs font-mono ${
              pathname === link.href
                ? "bg-[var(--engine-cyan)]/10 text-[var(--engine-cyan)]"
                : "text-[var(--engine-text)] hover:text-[var(--engine-text-bright)] hover:bg-white/5"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
