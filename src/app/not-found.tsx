import Link from 'next/link';
import type { Metadata } from 'next';
import { Search, ArrowRight, Compass } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'That page does not exist. Browse our tested AI tool reviews, comparisons and guides instead.',
  robots: { index: false, follow: true },
};

/**
 * Without this file Next serves its built-in error page, which paints its own
 * white background while the heading still inherits `--color-void-50` from our
 * base layer — near-white text on white, measured at 1.1:1. The 404 was
 * effectively blank.
 *
 * A dead end on an affiliate site is also a lost reader, so this one routes
 * onward rather than apologising.
 */
const destinations = [
  { href: '/reviews/', label: 'All tool reviews', detail: '31 tools tested hands-on' },
  { href: '/comparisons/', label: 'Comparisons', detail: 'Side-by-side, no sponsored placements' },
  { href: '/best/', label: 'Best-of guides', detail: 'Our picks per category' },
  { href: '/guides/', label: 'Workflow guides', detail: 'Step-by-step, start to finish' },
];

export default function NotFound() {
  return (
    <main className="container-main flex flex-col items-center py-24 sm:py-32 text-center">
      <span className="badge-signal mb-6">Error 404</span>

      <h1 className="font-heading text-4xl sm:text-5xl font-bold text-void-50 tracking-[-0.02em]">
        This page doesn&rsquo;t exist
      </h1>

      <p className="mt-4 max-w-md text-void-300 leading-relaxed">
        The link may be out of date, or the page may have moved. Everything we&rsquo;ve
        tested is still one step away.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <Link href="/" className="btn-primary no-underline">
          Back to homepage
          <ArrowRight size={16} aria-hidden="true" className="ml-2" />
        </Link>
        <Link href="/search/" className="btn-ghost no-underline">
          <Search size={16} aria-hidden="true" className="mr-2" />
          Search the site
        </Link>
      </div>

      <nav aria-label="Popular sections" className="mt-16 w-full max-w-3xl">
        <h2 className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-void-400">
          <Compass size={14} aria-hidden="true" />
          Try one of these
        </h2>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {destinations.map((destination) => (
            <li key={destination.href}>
              <Link
                href={destination.href}
                className="card group flex h-full flex-col items-start p-5 text-left no-underline"
              >
                <span className="font-heading font-semibold text-void-50 group-hover:text-signal-400 transition-colors">
                  {destination.label}
                </span>
                <span className="mt-1 text-sm text-void-400">{destination.detail}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
