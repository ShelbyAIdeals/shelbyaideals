'use client';

import { Check } from 'lucide-react';

interface OnboardingCardProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export default function OnboardingCard({ label, selected, onToggle }: OnboardingCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-center ${
        selected
          ? 'border-2 border-signal-500 bg-signal-500/10 text-signal-400'
          : 'border border-void-700/40 bg-void-800/30 text-void-300 hover:border-signal-500/30 hover:text-void-100'
      }`}
    >
      {selected && (
        <Check size={14} className="shrink-0 text-signal-400" />
      )}
      {label}
    </button>
  );
}
