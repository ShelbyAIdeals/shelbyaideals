import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import AffiliateDisclosure from './AffiliateDisclosure';
import NewsletterSignup from './NewsletterSignup';
import type { ArticleMeta, Category } from '@/lib/types';

const categoryLabels: Record<Category, string> = {
  'ai-writing-tools': 'AI Writing Tools',
  'ai-design-tools': 'AI Design & Video',
  'ai-coding-tools': 'AI Coding Tools',
  'ai-automation': 'AI Automation',
  'ai-seo-tools': 'AI SEO Tools',
  'ai-productivity': 'AI Productivity',
};

interface ArticleLayoutProps {
  meta: ArticleMeta;
  backLink: { href: string; label: string };
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export default function ArticleLayout({ meta, backLink, children, sidebar }: ArticleLayoutProps) {
  return (
    <main className="min-h-screen">
      <div className="container-main py-8">
        {/* Breadcrumb */}
        <Link
          href={backLink.href}
          className="inline-flex items-center gap-2 text-sm text-void-500 hover:text-accent-400 mb-6"
        >
          <ArrowLeft size={16} />
          {backLink.label}
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href={`/categories/${meta.category}`}
              className="badge-accent"
            >
              {categoryLabels[meta.category]}
            </Link>
            <span className="badge-void capitalize">{meta.type}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-void-50 leading-tight mb-4">
            {meta.title}
          </h1>

          <p className="text-lg text-void-400 mb-4">{meta.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-void-500">
            <span className="flex items-center gap-1">
              <User size={14} />
              {meta.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              Last updated: {meta.lastUpdated}
            </span>
            {meta.readingTime && (
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {meta.readingTime}
              </span>
            )}
          </div>
        </header>

        <AffiliateDisclosure />

        {/* Content Area */}
        <div className="flex gap-10">
          {/* Main Content */}
          <article className="flex-1 min-w-0">
            {children}
            <div className="mt-12">
              <NewsletterSignup variant="section" />
            </div>
          </article>

          {/* Sidebar */}
          {sidebar && (
            <aside className="hidden lg:block w-64 shrink-0">
              {sidebar}
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
