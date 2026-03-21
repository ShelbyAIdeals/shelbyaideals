'use client';

import Link from 'next/link';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { useTranslation } from '@/i18n/context';
import type { ComparisonMeta } from '@/lib/types';

interface ComparisonsContentProps {
  comparisons: ComparisonMeta[];
}

export default function ComparisonsContent({ comparisons }: ComparisonsContentProps) {
  const { t } = useTranslation();

  return (
    <div className="container-main pt-24 sm:pt-28 pb-12 sm:pb-16">
      {/* Page Header */}
      <ScrollReveal>
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4">
            {t('comparisons.title', 'AI Tool Comparisons')}
          </h1>
          <p className="text-lg text-void-400 leading-relaxed">
            {t('comparisons.description', 'Head-to-head comparisons with real testing, side-by-side features, and clear winners by scenario.')}
          </p>
        </div>
      </ScrollReveal>

      {/* Comparisons Grid */}
      {comparisons.length > 0 ? (
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((comp) => (
            <StaggerItem key={comp.slug}>
              <Link
                href={`/comparisons/${comp.slug}`}
                className="card p-6 no-underline hover:border-signal-500/40 border border-void-700/50 transition-all hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Tools involved */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {comp.tools.map((tool) => (
                    <span key={tool} className="badge-signal">
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-void-100 mb-2 line-clamp-2">
                  {comp.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-void-400 leading-relaxed mb-4 line-clamp-3 flex-1">
                  {comp.excerpt}
                </p>

                {/* Winner count + link */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-void-400">
                    {comp.winners.length}{' '}
                    {comp.winners.length === 1
                      ? t('comparisons.scenario_singular', 'scenario compared')
                      : t('comparisons.scenario_plural', 'scenarios compared')}
                  </span>
                  <span className="inline-flex items-center text-sm font-semibold text-signal-400">
                    {t('comparisons.read_comparison', 'Read Comparison')} <span className="ml-1">&rarr;</span>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="text-center py-20">
          <p className="text-void-500 text-lg">
            {t('comparisons.empty', 'No comparisons published yet. Check back soon.')}
          </p>
        </div>
      )}
    </div>
  );
}
