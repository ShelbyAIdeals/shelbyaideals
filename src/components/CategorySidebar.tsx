'use client';

import { PenTool, Palette, Code, Zap, Search, Clock } from 'lucide-react';
import type { Category, CategoryInfo } from '@/lib/types';
import { useTranslation } from '@/i18n/context';

const iconMap: Record<string, React.ElementType> = {
  'pen-tool': PenTool,
  palette: Palette,
  code: Code,
  zap: Zap,
  search: Search,
  clock: Clock,
};

interface CategorySidebarProps {
  categories: Array<CategoryInfo & { articleCount: number }>;
  activeCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
}

export default function CategorySidebar({
  categories,
  activeCategory,
  onCategoryChange,
}: CategorySidebarProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-60 shrink-0">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-void-500 mb-4">
          {t('tools.categories_title', 'Most Popular Categories')}
        </h2>
        <nav className="flex flex-col gap-1">
          <button
            onClick={() => onCategoryChange('all')}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer text-left ${
              activeCategory === 'all'
                ? 'bg-signal-500/10 border-l-2 border-signal-400 text-signal-400'
                : 'text-void-400 hover:text-void-200 hover:bg-void-800/50 border-l-2 border-transparent'
            }`}
          >
            {t('tools.all_tools', 'All Tools')}
          </button>
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Zap;
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => onCategoryChange(cat.slug)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-signal-500/10 border-l-2 border-signal-400 text-signal-400 font-medium'
                    : 'text-void-400 hover:text-void-200 hover:bg-void-800/50 border-l-2 border-transparent'
                }`}
              >
                <Icon size={14} className="shrink-0" />
                <span className="truncate">{cat.name}</span>
                <span className="ml-auto text-[10px] text-void-600 tabular-nums">
                  {cat.articleCount}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile horizontal pills */}
      <div className="lg:hidden overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-signal-500/15 text-signal-400 border border-signal-500/30'
                : 'bg-void-800/50 text-void-400 border border-void-700/40 hover:text-void-200'
            }`}
          >
            {t('tools.all_tools', 'All Tools')}
          </button>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => onCategoryChange(cat.slug)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-signal-500/15 text-signal-400 border border-signal-500/30'
                    : 'bg-void-800/50 text-void-400 border border-void-700/40 hover:text-void-200'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
