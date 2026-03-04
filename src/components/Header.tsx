'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Reviews', href: '/reviews' },
  { label: 'Comparisons', href: '/comparisons' },
  { label: 'Best Of', href: '/best' },
  { label: 'Guides', href: '/guides' },
  { label: 'Categories', href: '/categories' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-void-950/90 backdrop-blur-xl border-b border-void-800/80">
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center group-hover:shadow-[0_0_16px_rgba(6,182,212,0.4)] transition-shadow">
              <Zap size={16} className="text-void-950" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-heading font-bold text-void-50 tracking-tight">
              Shelby<span className="text-accent-400">AI</span>Deals
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold text-void-200 hover:text-white rounded-lg hover:bg-void-700/60 no-underline transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Search + About */}
          <div className="hidden lg:flex items-center gap-3">
            {searchOpen ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search AI tools..."
                  autoFocus
                  className="w-56 px-3 py-1.5 text-sm rounded-lg bg-void-800 border border-void-700 text-void-100 placeholder:text-void-500 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-transparent"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 text-void-400 hover:text-void-200 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg text-void-400 hover:text-accent-400 hover:bg-void-800/50 transition-all cursor-pointer"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            )}
            <Link
              href="/about"
              className="px-4 py-2 text-sm font-semibold text-accent-400 border border-accent-500/30 rounded-lg hover:bg-accent-500/10 hover:border-accent-400/50 no-underline transition-all"
            >
              About
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-void-300 hover:bg-void-800 transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 border-t border-void-800 mt-1 pt-3">
            {/* Mobile search */}
            <div className="px-3 mb-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-void-500" />
                <input
                  type="text"
                  placeholder="Search AI tools..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg bg-void-800 border border-void-700 text-void-100 placeholder:text-void-500 focus:outline-none focus:ring-2 focus:ring-accent-500/40"
                />
              </div>
            </div>
            <ul className="flex flex-col gap-1">
              {[...navLinks, { label: 'About', href: '/about' }].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-void-200 hover:bg-void-700/60 hover:text-white no-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
