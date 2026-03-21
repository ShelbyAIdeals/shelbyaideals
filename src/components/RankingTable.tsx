import Link from 'next/link';
import { Star, ArrowRight, Award } from 'lucide-react';

interface ToolRow {
  name: string;
  rating: number;
  bestFor: string;
  startingPrice: string;
  affiliateUrl?: string;
  reviewSlug?: string;
  editorsPick?: boolean;
}

export default function RankingTable({
  tools,
  title = 'Quick Comparison',
}: {
  tools: ToolRow[];
  title?: string;
}) {
  if (tools.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-lg font-bold text-void-50 font-heading mb-4">
        {title}
      </h2>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-void-700/50">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-void-800/60 text-void-300 text-left">
              <th className="px-4 py-3 font-semibold">Tool</th>
              <th className="px-4 py-3 font-semibold">Rating</th>
              <th className="px-4 py-3 font-semibold">Best For</th>
              <th className="px-4 py-3 font-semibold">Starting Price</th>
              <th className="px-4 py-3 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool, i) => (
              <tr
                key={tool.name}
                className={`border-t border-void-700/40 ${
                  tool.editorsPick
                    ? 'bg-signal-500/5 border-l-2 border-l-signal-500'
                    : i % 2 === 0
                      ? 'bg-void-900/30'
                      : 'bg-void-900/10'
                }`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-void-50">
                      {tool.name}
                    </span>
                    {tool.editorsPick && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-signal-500/15 text-signal-400 border border-signal-500/25">
                        <Award size={10} />
                        Pick
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star size={12} fill="currentColor" />
                    {tool.rating}
                  </span>
                </td>
                <td className="px-4 py-3 text-void-300">{tool.bestFor}</td>
                <td className="px-4 py-3 text-void-300">{tool.startingPrice}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {tool.reviewSlug && (
                      <Link
                        href={`/reviews/${tool.reviewSlug}`}
                        className="text-xs font-semibold text-signal-400 hover:text-signal-300 no-underline inline-flex items-center gap-1"
                      >
                        Review <ArrowRight size={10} />
                      </Link>
                    )}
                    {tool.affiliateUrl && (
                      <a
                        href={tool.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="px-2.5 py-1 text-xs font-semibold rounded-md bg-signal-500 text-void-950 hover:bg-signal-400 transition-colors no-underline"
                      >
                        Try It
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className={`p-4 rounded-xl border ${
              tool.editorsPick
                ? 'border-signal-500/30 bg-signal-500/5'
                : 'border-void-700/40 bg-void-900/30'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-void-50 text-sm">{tool.name}</span>
                {tool.editorsPick && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-signal-500/15 text-signal-400">
                    <Award size={10} /> Pick
                  </span>
                )}
              </div>
              <span className="flex items-center gap-0.5 text-xs text-amber-400">
                <Star size={11} fill="currentColor" /> {tool.rating}
              </span>
            </div>
            <p className="text-xs text-void-400 mb-1">Best for: {tool.bestFor}</p>
            <p className="text-xs text-void-500 mb-3">From {tool.startingPrice}</p>
            <div className="flex items-center gap-2">
              {tool.reviewSlug && (
                <Link href={`/reviews/${tool.reviewSlug}`} className="text-xs font-semibold text-signal-400 no-underline">
                  Read Review
                </Link>
              )}
              {tool.affiliateUrl && (
                <a
                  href={tool.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="ml-auto px-3 py-1.5 text-xs font-semibold rounded-md bg-signal-500 text-void-950 hover:bg-signal-400 transition-colors no-underline"
                >
                  Try It
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
