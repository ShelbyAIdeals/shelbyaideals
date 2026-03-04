import { CheckCircle, XCircle } from 'lucide-react';

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export default function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="pros-cons-grid">
      {/* Pros */}
      <div className="rounded-xl bg-accent-500/5 border border-accent-500/15 p-6">
        <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-accent-400 font-heading">
          <CheckCircle size={20} className="text-accent-500" />
          Pros
        </h4>
        <ul className="space-y-3">
          {pros.map((pro) => (
            <li key={pro} className="flex items-start gap-2 text-sm text-void-300">
              <CheckCircle
                size={16}
                className="mt-0.5 shrink-0 text-accent-500"
              />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="rounded-xl bg-red-500/5 border border-red-500/15 p-6">
        <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-red-400 font-heading">
          <XCircle size={20} className="text-red-400" />
          Cons
        </h4>
        <ul className="space-y-3">
          {cons.map((con) => (
            <li key={con} className="flex items-start gap-2 text-sm text-void-300">
              <XCircle
                size={16}
                className="mt-0.5 shrink-0 text-red-400"
              />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
