'use client';

import { useTranslation } from '@/i18n/context';

interface ToolsTabsProps {
  activeTab: 'popular' | 'recent';
  onTabChange: (tab: 'popular' | 'recent') => void;
  totalCount: number;
}

export default function ToolsTabs({
  activeTab,
  onTabChange,
  totalCount,
}: ToolsTabsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-6 border-b border-void-700/50 mb-6">
      <button
        onClick={() => onTabChange('popular')}
        className={`pb-3 text-sm font-medium transition-all cursor-pointer ${
          activeTab === 'popular'
            ? 'text-signal-400 border-b-2 border-signal-400'
            : 'text-void-400 hover:text-void-200 border-b-2 border-transparent'
        }`}
      >
        {t('tools.tab_popular', 'Popular Tools')}
      </button>
      <button
        onClick={() => onTabChange('recent')}
        className={`pb-3 text-sm font-medium transition-all cursor-pointer ${
          activeTab === 'recent'
            ? 'text-signal-400 border-b-2 border-signal-400'
            : 'text-void-400 hover:text-void-200 border-b-2 border-transparent'
        }`}
      >
        {t('tools.tab_recent', 'Recently Added')}
      </button>
      <span className="ml-auto text-xs text-void-500 pb-3">
        {totalCount} {t('tools.tools_count', 'tools')}
      </span>
    </div>
  );
}
