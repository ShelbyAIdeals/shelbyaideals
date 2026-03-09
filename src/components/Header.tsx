'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Search, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Tools', href: '/reviews' },
  { label: 'Categories', href: '/categories' },
  { label: 'FAQ', href: '/faq' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('mistDensity', { detail: 40 }));
    }, 50);
    return () => clearTimeout(t);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false);
    setSearchQuery('');
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setMobileOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-[1940px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3.5 no-underline group shrink-0">
            <div className="w-11 h-11 rounded-xl bg-accent-500 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(5,160,186,0.4)] transition-shadow">
              <Zap size={22} className="text-void-950" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-heading font-bold text-white tracking-tight">
              Shelby<span className="text-accent-400">AI</span>Deals
            </span>
          </Link>

          {/* Desktop nav + Search */}
          <nav className="hidden lg:flex items-center gap-2 relative">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2.5 text-base font-semibold text-white/90 hover:text-accent-300 rounded-lg hover:bg-void-700/60 no-underline transition-all"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-lg text-white hover:text-accent-300 hover:bg-void-700/50 transition-all cursor-pointer ml-1"
              aria-label="Search"
            >
              {searchOpen ? <X size={22} /> : <Search size={22} />}
            </button>
            {searchOpen && (
              <form onSubmit={handleSearch} className="absolute left-full ml-2 top-1/2 -translate-y-1/2 flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AI tools..."
                  autoFocus
                  className="w-64 px-4 py-2.5 text-base rounded-lg bg-void-800 border border-void-700 text-void-100 placeholder:text-void-500 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-transparent"
                />
              </form>
            )}
          </nav>

          {/* Right side: About */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/about"
              className="px-5 py-2.5 text-base font-semibold text-white border border-void-500/40 rounded-lg hover:text-accent-300 hover:bg-void-700/40 hover:border-void-400/50 no-underline transition-all"
            >
              About
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-void-800 transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 mt-1 pt-3">
            {/* Mobile search */}
            <div className="px-3 mb-3">
              <form onSubmit={handleMobileSearch} className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-void-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AI tools..."
                  className="w-full pl-10 pr-4 py-2.5 text-base rounded-lg bg-void-800 border border-void-700 text-void-100 placeholder:text-void-500 focus:outline-none focus:ring-2 focus:ring-accent-500/40"
                />
              </form>
            </div>
            <ul className="flex flex-col gap-1">
              {[...navLinks, { label: 'About', href: '/about' }].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-semibold text-white hover:bg-void-700/60 hover:text-accent-300 no-underline transition-colors"
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
