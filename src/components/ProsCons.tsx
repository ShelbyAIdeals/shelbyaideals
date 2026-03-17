'use client';

import { CheckCircle, CheckCircle2, XCircle } from 'lucide-react';
import { useTranslation } from '@/i18n/context';

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export default function ProsCons({ pros, cons }: ProsConsProps) {
  const { t } = useTranslation();
  const safeP = pros ?? [];
  const safeC = cons ?? [];
  if (safeP.length === 0 && safeC.length === 0) return null;

  return (
    <div className="pros-cons-grid">
      {/* Pros */}
      <div className="rounded-xl border border-void-800 overflow-hidden"
        style={{ background: 'rgba(16,185,129,0.03)' }}
      >
        <div className="flex items-center gap-2 px-6 pt-5 pb-3 border-b border-success-500/20">
          <CheckCircle size={20} className="text-success-500" />
          <h4 className="text-lg font-heading font-bold text-success-400">
            {t('article.pros', 'Pros')}
          </h4>
        </div>
        <ul className="divide-y divide-void-800/50">
          {safeP.map((pro, i) => (
            <li
              key={pro}
              className={`flex items-start gap-3 px-6 py-3 text-sm text-void-300 ${
                i % 2 === 1 ? 'bg-void-800/20' : ''
              }`}
            >
              <CheckCircle2
                size={16}
                className="mt-0.5 shrink-0 text-success-400 fill-success-400/20"
              />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="rounded-xl border border-void-800 overflow-hidden"
        style={{ background: 'rgba(244,63,94,0.03)' }}
      >
        <div className="flex items-center gap-2 px-6 pt-5 pb-3 border-b border-danger-500/20">
          <XCircle size={20} className="text-danger-500" />
          <h4 className="text-lg font-heading font-bold text-danger-400">
            {t('article.cons', 'Cons')}
          </h4>
        </div>
        <ul className="divide-y divide-void-800/50">
          {safeC.map((con, i) => (
            <li
              key={con}
              className={`flex items-start gap-3 px-6 py-3 text-sm text-void-300 ${
                i % 2 === 1 ? 'bg-void-800/20' : ''
              }`}
            >
              <XCircle
                size={16}
                className="mt-0.5 shrink-0 text-danger-400 fill-danger-400/20"
              />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
