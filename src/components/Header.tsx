'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Zap, Sun, Moon, CloudFog, CloudOff, Command } from 'lucide-react';
import CommandPalette from './CommandPalette';

const navLinks = [
  { label: 'Tools', href: '/reviews' },
  { label: 'Comparisons', href: '/comparisons' },
  { label: 'Deals', href: '/deals', hasBadge: true },
  { label: 'Guides', href: '/guides' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [mistOn, setMistOn] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);

  /* ── Scroll listener for glassmorphic transition ─────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // set initial state
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close mobile menu on desktop resize ─────────────────── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Restore theme & mist from localStorage ──────────────── */
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

  /* ── Cmd+K / Ctrl+K shortcut ─────────────────────────────── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = useCallback(() => {
    setLightMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.dataset.theme = 'light';
        localStorage.setItem('theme', 'light');
      } else {
        delete document.documentElement.dataset.theme;
        localStorage.setItem('theme', 'dark');
      }
      window.dispatchEvent(new CustomEvent('themeChange', { detail: next ? 'light' : 'dark' }));
      return next;
    });
  }, []);

  const toggleMist = useCallback(() => {
    setMistOn((prev) => {
      const next = !prev;
      localStorage.setItem('mistOff', next ? 'false' : 'true');
      window.dispatchEvent(new CustomEvent('mistDensity', { detail: next ? 40 : 0 }));
      return next;
    });
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen ? 'header-glass-solid' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1940px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* ── Logo ─────────────────────────────────────────── */}
            <Link href="/" className="flex items-center gap-3 no-underline group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-signal-500 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(10,209,200,0.4)] transition-shadow">
                <Zap size={20} className="text-void-950" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-heading font-bold text-void-50 tracking-tight">
                Shelby<span className="text-signal-400">AI</span>
                <span className="text-void-300 font-medium">Deals</span>
              </span>
            </Link>

            {/* ── Desktop nav ──────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-[0.95rem] font-semibold rounded-lg no-underline transition-all duration-200 ${
                      active
                        ? 'text-signal-300 bg-signal-500/10'
                        : 'text-void-200 hover:text-void-50 hover:bg-void-700/40'
                    }`}
                  >
                    {link.label}
                    {/* Ember badge dot for Deals */}
                    {link.hasBadge && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-ember-400 ring-2 ring-void-950" />
                    )}
                    {/* Active underline indicator */}
                    {active && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-signal-400" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right side controls ──────────────────────────── */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Search / Cmd+K button */}
              <button
                onClick={() => setPaletteOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-void-700/50 bg-void-800/40 text-void-400 hover:text-void-200 hover:border-void-600 hover:bg-void-800/70 transition-all cursor-pointer"
                aria-label="Search (Cmd+K)"
              >
                <Search size={15} />
                <span className="text-sm">Search</span>
                <kbd className="hidden xl:inline-flex items-center gap-0.5 ml-1 px-1.5 py-0.5 text-[10px] font-mono font-medium text-void-500 bg-void-900/80 border border-void-700/60 rounded">
                  <Command size={10} />K
                </kbd>
              </button>

              {/* Divider */}
              <div className="w-px h-5 bg-void-700/50 mx-1" />

              {/* Mist toggle */}
              <button
                onClick={toggleMist}
                className="p-2 rounded-lg text-void-300 hover:text-signal-300 hover:bg-void-700/40 transition-all cursor-pointer"
                aria-label={mistOn ? 'Hide mist' : 'Show mist'}
                title={mistOn ? 'Hide mist' : 'Show mist'}
              >
                {mistOn ? <CloudOff size={18} /> : <CloudFog size={18} />}
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-void-300 hover:text-signal-300 hover:bg-void-700/40 transition-all cursor-pointer"
                aria-label={lightMode ? 'Switch to dark mode' : 'Switch to light mode'}
                title={lightMode ? 'Dark mode' : 'Light mode'}
              >
                {lightMode ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              {/* About */}
              <Link
                href="/about"
                className={`ml-1 px-4 py-2 text-sm font-semibold rounded-lg no-underline transition-all duration-200 ${
                  isActive('/about')
                    ? 'text-signal-300 bg-signal-500/10 border border-signal-500/30'
                    : 'text-void-200 border border-void-600/50 hover:text-signal-300 hover:bg-void-700/40 hover:border-void-500/50'
                }`}
              >
                About
              </Link>
            </div>

            {/* ── Mobile hamburger ─────────────────────────────── */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Mobile search button */}
              <button
                onClick={() => setPaletteOpen(true)}
                className="p-2 rounded-lg text-void-200 hover:text-signal-300 hover:bg-void-700/40 transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search size={22} />
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-void-200 hover:bg-void-800 transition-colors cursor-pointer"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {/* ── Mobile menu ──────────────────────────────────── */}
          {mobileOpen && (
            <nav className="lg:hidden pb-4 pt-2 animate-[fadeInUp_0.2s_ease-out]">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`relative flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-semibold no-underline transition-colors ${
                          active
                            ? 'text-signal-300 bg-signal-500/10'
                            : 'text-void-100 hover:bg-void-700/40 hover:text-signal-300'
                        }`}
                      >
                        {link.label}
                        {link.hasBadge && (
                          <span className="w-2 h-2 rounded-full bg-ember-400" />
                        )}
                      </Link>
                    </li>
                  );
                })}

                <li>
                  <Link
                    href="/about"
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-base font-semibold no-underline transition-colors ${
                      isActive('/about')
                        ? 'text-signal-300 bg-signal-500/10'
                        : 'text-void-100 hover:bg-void-700/40 hover:text-signal-300'
                    }`}
                  >
                    About
                  </Link>
                </li>

                <li>
                  <hr className="border-void-700/50 my-2 mx-3" />
                </li>

                <li>
                  <button
                    onClick={toggleMist}
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-base font-semibold text-void-100 hover:bg-void-700/40 hover:text-signal-300 transition-colors cursor-pointer"
                  >
                    {mistOn ? <CloudOff size={18} /> : <CloudFog size={18} />}
                    {mistOn ? 'Hide Mist' : 'Show Mist'}
                  </button>
                </li>

                <li>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-base font-semibold text-void-100 hover:bg-void-700/40 hover:text-signal-300 transition-colors cursor-pointer"
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

      {/* Command Palette (rendered outside header for proper z-index stacking) */}
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
