'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [demisterOn, setDemisterOn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('demister', { detail: demisterOn }));
  }, [demisterOn]);

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
      <div className="container-main">
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

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2.5 text-base font-semibold text-white/90 hover:text-accent-300 rounded-lg hover:bg-void-700/60 no-underline transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Search + About + Demister */}
          <div className="hidden lg:flex items-center gap-4 mr-[-3.5rem]">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AI tools..."
                  autoFocus
                  className="w-64 px-4 py-2.5 text-base rounded-lg bg-void-800 border border-void-700 text-void-100 placeholder:text-void-500 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  className="p-2 text-void-400 hover:text-void-200 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-lg text-white hover:text-accent-300 hover:bg-void-700/50 transition-all cursor-pointer"
                aria-label="Search"
              >
                <Search size={22} />
              </button>
            )}
            {/* Demister toggle */}
            <button
              onClick={() => setDemisterOn(!demisterOn)}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg transition-all cursor-pointer"
            >
              <span className="text-[0.938rem] font-semibold text-white">Demister</span>
              <div className={`relative w-10 h-[22px] rounded-full transition-colors ${demisterOn ? 'bg-accent-500' : 'bg-void-600'}`}>
                <div className={`absolute top-[3px] w-4 h-4 rounded-full bg-white transition-transform ${demisterOn ? 'translate-x-[22px]' : 'translate-x-[3px]'}`} />
              </div>
            </button>

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
            {/* Mobile demister toggle */}
            <div className="px-3 mt-3">
              <button
                onClick={() => setDemisterOn(!demisterOn)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="text-sm font-semibold text-white">Demister</span>
                <div className={`relative w-9 h-5 rounded-full transition-colors ${demisterOn ? 'bg-accent-500' : 'bg-void-600'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${demisterOn ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </div>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
