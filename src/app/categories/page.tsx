import type { Metadata } from 'next';
import Link from 'next/link';
import { PenTool, Palette, Code, Zap, Search, Clock } from 'lucide-react';
import { CATEGORIES } from '@/lib/types';
import { getArticlesByCategory } from '@/lib/content';
import type { Category } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Categories',
  description:
    'Browse AI tools by category — writing, design, coding, automation, SEO, and productivity.',
  openGraph: {
    title: 'Categories',
    description:
      'Browse AI tools by category — writing, design, coding, automation, SEO, and productivity.',
    images: [
      {
        url: 'https://shelby-ai.com/images/og-thumbnail.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Categories',
    description:
      'Browse AI tools by category — writing, design, coding, automation, SEO, and productivity.',
    images: ['https://shelby-ai.com/images/og-thumbnail.png'],
  },
};

const iconMap: Record<string, React.ElementType> = {
  'pen-tool': PenTool,
  palette: Palette,
  code: Code,
  zap: Zap,
  search: Search,
  clock: Clock,
};

export default function CategoriesPage() {
  return (
    <main className="min-h-screen">
      <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4">
            Categories
          </h1>
          <p className="text-lg text-void-400 leading-relaxed">
            Browse AI tools by category. Every tool is tested and reviewed with
            real-world use cases.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const articles = getArticlesByCategory(cat.slug as Category);
            const Icon = iconMap[cat.icon] || Zap;

            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group card p-6 no-underline hover:border-accent-500/40 border border-void-700/50 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-500/10 flex items-center justify-center group-hover:bg-accent-500/20 transition-colors">
                    <Icon size={20} className="text-accent-400" />
                  </div>
                  <span className="text-xs font-medium text-void-400">
                    {articles.length} {articles.length === 1 ? 'article' : 'articles'}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-void-100 mb-2 group-hover:text-accent-400 transition-colors">
                  {cat.name}
                </h2>
                <p className="text-sm text-void-400 leading-relaxed">
                  {cat.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
