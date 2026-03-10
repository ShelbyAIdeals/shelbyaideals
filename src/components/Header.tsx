'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Search, Zap, Sun, Moon, CloudFog, CloudOff } from 'lucide-react';

const navLinks = [
  { label: 'Tools', href: '/reviews' },
  { label: 'Categories', href: '/categories' },
  { label: 'FAQ', href: '/faq' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lightMode, setLightMode] = useState(false);
  const [mistOn, setMistOn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setLightMode(true);
      document.documentElement.dataset.theme = 'light';
      window.dispatchEvent(new CustomEvent('themeChange', { detail: 'light' }));
    }
    const savedMist = localStorage.getItem('mistOff') === 'true';
    if (savedMist) {
      setMistOn(false);
      window.dispatchEvent(new CustomEvent('mistDensity', { detail: 0 }));
    } else {
      window.dispatchEvent(new CustomEvent('mistDensity', { detail: 40 }));
    }
  }, []);

  const toggleTheme = () => {
    const next = !lightMode;
    setLightMode(next);
    if (next) {
      document.documentElement.dataset.theme = 'light';
      localStorage.setItem('theme', 'light');
    } else {
      delete document.documentElement.dataset.theme;
      localStorage.setItem('theme', 'dark');
    }
    window.dispatchEvent(new CustomEvent('themeChange', { detail: next ? 'light' : 'dark' }));
  };

  const toggleMist = () => {
    const next = !mistOn;
    setMistOn(next);
    localStorage.setItem('mistOff', next ? 'false' : 'true');
    window.dispatchEvent(new CustomEvent('mistDensity', { detail: next ? 40 : 0 }));
  };

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
    <header className={`absolute top-0 left-0 right-0 z-50 transition-colors ${mobileOpen ? 'bg-void-950/95 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="max-w-[1940px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3.5 no-underline group shrink-0">
            <div className="w-11 h-11 rounded-xl bg-accent-500 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(5,160,186,0.4)] transition-shadow">
              <Zap size={22} className="text-void-950" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-heading font-bold text-void-50 tracking-tight">
              Shelby<span className="text-accent-400">AI</span>Deals
            </span>
          </Link>

          {/* Desktop nav + Search */}
          <nav className="hidden lg:flex items-center gap-2 relative">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2.5 text-[1.05rem] font-bold text-white hover:text-accent-300 rounded-lg hover:bg-void-700/60 no-underline transition-all"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-lg text-void-50 hover:text-accent-300 hover:bg-void-700/50 transition-all cursor-pointer ml-1"
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

          {/* Right side: Theme toggle + About */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleMist}
              className="p-2.5 rounded-lg text-void-50 hover:text-accent-300 hover:bg-void-700/50 transition-all cursor-pointer"
              aria-label={mistOn ? 'Hide mist' : 'Show mist'}
            >
              {mistOn ? <CloudOff size={20} /> : <CloudFog size={20} />}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg text-void-50 hover:text-accent-300 hover:bg-void-700/50 transition-all cursor-pointer"
              aria-label={lightMode ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {lightMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Link
              href="/about"
              className="px-5 py-2.5 text-base font-semibold text-void-50 border border-void-500/40 rounded-lg hover:text-accent-300 hover:bg-void-700/40 hover:border-void-400/50 no-underline transition-all"
            >
              About
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-void-50 hover:bg-void-800 transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 mt-1 pt-3 bg-void-950/95 backdrop-blur-md border border-void-700/50 rounded-xl shadow-2xl">
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
                    className="block px-3 py-2.5 rounded-lg text-base font-semibold text-void-50 hover:bg-void-700/60 hover:text-accent-300 no-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li><hr className="border-void-700/50 my-1 mx-3" /></li>
              <li>
                <button
                  onClick={toggleMist}
                  className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-base font-semibold text-void-50 hover:bg-void-700/60 hover:text-accent-300 transition-colors cursor-pointer"
                >
                  {mistOn ? <CloudOff size={18} /> : <CloudFog size={18} />}
                  {mistOn ? 'Hide Mist' : 'Show Mist'}
                </button>
              </li>
              <li>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-base font-semibold text-void-50 hover:bg-void-700/60 hover:text-accent-300 transition-colors cursor-pointer"
                >
                  {lightMode ? <Moon size={18} /> : <Sun size={18} />}
                  {lightMode ? 'Dark Mode' : 'White Mode'}
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
