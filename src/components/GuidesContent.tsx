'use client';

import Link from 'next/link';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { useTranslation } from '@/i18n/context';
import type { GuideMeta } from '@/lib/types';

interface GuidesContentProps {
  guides: GuideMeta[];
}

export default function GuidesContent({ guides }: GuidesContentProps) {
  const { t } = useTranslation();

  return (
    <div className="container-main pt-24 sm:pt-28 pb-12 sm:pb-16">
      {/* Page Header */}
      <ScrollReveal>
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4">
            {t('guides.title', 'AI Guides & Tutorials')}
          </h1>
          <p className="text-lg text-void-400 leading-relaxed">
            {t('guides.description', 'Step-by-step guides to building AI-powered workflows that save time and grow your business.')}
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
                className="card p-6 no-underline hover:border-signal-500/40 border border-void-700/50 transition-all hover:-translate-y-1 flex flex-col h-full"
              >
                <span className="badge-void mb-3 inline-block">{t('guides.badge', 'Guide')}</span>

                <h2 className="text-lg font-bold text-void-100 mb-2 line-clamp-2">
                  {guide.title}
                </h2>

                <p className="text-sm text-void-400 leading-relaxed mb-4 line-clamp-2 flex-1">
                  {guide.excerpt}
                </p>

                {/* Recommended tools preview */}
                <div className="min-h-[2rem] mb-4">
                  {guide.recommendedTools.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {guide.recommendedTools.slice(0, 3).map((tool) => (
                        <span
                          key={tool.name}
                          className="rounded-full bg-signal-500/15 px-2.5 py-0.5 text-xs font-medium text-signal-300"
                        >
                          {tool.name}
                        </span>
                      ))}
                      {guide.recommendedTools.length > 3 && (
                        <span className="rounded-full bg-void-700/50 px-2.5 py-0.5 text-xs font-medium text-void-500">
                          +{guide.recommendedTools.length - 3} {t('guides.more', 'more')}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-auto pt-4">
                  {guide.readingTime && (
                    <span className="text-xs text-void-400">
                      {guide.readingTime}
                    </span>
                  )}
                  <span className="inline-flex items-center text-sm font-semibold text-signal-400">
                    {t('guides.read_guide', 'Read Guide')} <span className="ml-1">&rarr;</span>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="text-center py-20">
          <p className="text-void-500 text-lg">
            {t('guides.empty', 'No guides published yet. Check back soon.')}
          </p>
        </div>
      )}
    </div>
  );
}
