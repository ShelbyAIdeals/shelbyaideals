'use client';

import { Play, ArrowRight } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

interface ToolProfileVideoProps {
  toolName: string;
  videoSrc: string;
  posterSrc?: string;
  affiliateUrl?: string;
  affiliateLabel?: string;
}

export default function ToolProfileVideo({
  toolName,
  videoSrc,
  posterSrc,
  affiliateUrl,
  affiliateLabel,
}: ToolProfileVideoProps) {
  return (
    <section className="mb-10">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-signal-500/10 border border-signal-500/20 flex items-center justify-center shrink-0">
          <Play size={14} className="text-signal-400 ml-0.5" fill="currentColor" />
        </div>
        <div>
          <h2 className="text-lg font-heading font-bold text-void-50">
            See {toolName} in Action
          </h2>
          <p className="text-xs text-void-500">
            Full product walkthrough — recorded with real workflows
          </p>
        </div>
      </div>

      {/* Video player */}
      <VideoPlayer
        src={videoSrc}
        poster={posterSrc}
        title={`${toolName} — Product Walkthrough`}
      />

      {/* Optional CTA below video */}
      {affiliateUrl && (
        <div className="mt-4 flex items-center justify-between p-4 rounded-xl border border-void-700/30 bg-void-800/20">
          <p className="text-sm text-void-400">
            Like what you see? Try {toolName} yourself.
          </p>
          <a
            href={affiliateUrl}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="btn-accent text-sm !py-2 !px-4 gap-1.5 shrink-0"
          >
            {affiliateLabel || `Try ${toolName}`} <ArrowRight size={14} />
          </a>
        </div>
      )}
    </section>
  );
}
