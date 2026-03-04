import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides } from '@/lib/content';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';
import ScrollReveal from '@/components/motion/ScrollReveal';

export const metadata: Metadata = {
  title: 'AI Guides & Tutorials',
  description:
    'Step-by-step guides to building AI-powered workflows that save time and grow your business.',
};

export default async function GuidesPage() {
  const guides = getAllGuides();

  return (
    <main className="min-h-screen">
      <div className="container-main py-12 sm:py-16">
        {/* Page Header */}
        <ScrollReveal>
          <div className="max-w-2xl mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4">
              AI Guides &amp; Tutorials
            </h1>
            <p className="text-lg text-void-400 leading-relaxed">
              Step-by-step guides to building AI-powered workflows that save time
              and grow your business.
            </p>
          </div>
        </ScrollReveal>

        {/* Guides Grid */}
        {guides.length > 0 ? (
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <StaggerItem key={guide.slug}>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="card p-6 no-underline hover:border-accent-500/40 border border-void-700/50 transition-all hover:-translate-y-1 block"
                >
                  <span className="badge-void mb-3 inline-block">Guide</span>

                  <h2 className="text-lg font-bold text-void-100 mb-2">
                    {guide.title}
                  </h2>

                  <p className="text-sm text-void-400 leading-relaxed mb-4">
                    {guide.excerpt}
                  </p>

                  {/* Recommended tools preview */}
                  {guide.recommendedTools.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {guide.recommendedTools.slice(0, 3).map((tool) => (
                        <span
                          key={tool.name}
                          className="rounded-full bg-accent-500/15 px-2.5 py-0.5 text-xs font-medium text-accent-300"
                        >
                          {tool.name}
                        </span>
                      ))}
                      {guide.recommendedTools.length > 3 && (
                        <span className="rounded-full bg-void-700/50 px-2.5 py-0.5 text-xs font-medium text-void-500">
                          +{guide.recommendedTools.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    {guide.readingTime && (
                      <span className="text-xs text-void-400">
                        {guide.readingTime}
                      </span>
                    )}
                    <span className="inline-flex items-center text-sm font-semibold text-accent-400">
                      Read Guide <span className="ml-1">&rarr;</span>
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-20">
            <p className="text-void-500 text-lg">
              No guides published yet. Check back soon.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
