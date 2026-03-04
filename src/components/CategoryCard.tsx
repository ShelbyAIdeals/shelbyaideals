'use client';

import Link from 'next/link';
import { PenTool, Palette, Code, Zap, Search, Clock, ArrowRight, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, LucideIcon> = {
  'pen-tool': PenTool,
  palette: Palette,
  code: Code,
  zap: Zap,
  search: Search,
  clock: Clock,
};

interface CategoryCardProps {
  name: string;
  slug: string;
  description: string;
  icon: string;
  articleCount: number;
}

export default function CategoryCard({
  name,
  slug,
  description,
  icon,
  articleCount,
}: CategoryCardProps) {
  const IconComponent = iconMap[icon] || Zap;

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 0 24px rgba(119,126,73,0.1)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <Link
        href={`/categories/${slug}`}
        className="card group p-5 flex items-start gap-4 no-underline transition-all block"
      >
        {/* Icon */}
        <div className="w-11 h-11 rounded-lg bg-accent-500/10 border border-accent-500/15 text-accent-400 flex items-center justify-center shrink-0 group-hover:bg-accent-500/15 group-hover:shadow-[0_0_16px_rgba(119,126,73,0.15)] transition-all">
          <IconComponent size={20} strokeWidth={2} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Name + count */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-sm font-heading font-bold text-void-100 group-hover:text-accent-400 transition-colors truncate">
              {name}
            </h3>
            <span className="text-xs font-medium text-void-500 bg-void-800 px-2 py-0.5 rounded-full shrink-0">
              {articleCount}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-void-500 leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Explore link */}
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent-400 opacity-0 group-hover:opacity-100 transition-opacity">
            Explore
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
