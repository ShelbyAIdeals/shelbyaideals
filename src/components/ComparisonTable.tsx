import { Check, X } from 'lucide-react';
import CTAButton from './CTAButton';

interface ComparisonTool {
  name: string;
  features: Record<string, string | boolean>;
  affiliateUrl: string;
}

interface ComparisonTableProps {
  tools: ComparisonTool[];
}

export default function ComparisonTable({ tools }: ComparisonTableProps) {
  if (!tools || tools.length === 0) return null;

  // Collect all unique feature names across tools, preserving insertion order
  const featureNames = Array.from(
    new Set(tools.flatMap((tool) => Object.keys(tool.features ?? {})))
  );

  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-void-700/50">
      <table className="w-full border-collapse text-sm">
        {/* Header row: tool names + CTAs */}
        <thead>
          <tr className="bg-signal-500/10 text-void-50">
            <th className="sticky left-0 z-10 bg-signal-500/10 px-4 py-4 text-left text-sm font-semibold min-w-[140px]">
              Feature
            </th>
            {tools.map((tool) => (
              <th
                key={tool.name}
                className="px-4 py-4 text-center text-sm font-semibold min-w-[160px]"
              >
                {tool.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {featureNames.map((feature, idx) => (
            <tr
              key={feature}
              className={idx % 2 === 0 ? 'bg-void-950' : 'bg-void-900'}
            >
              <td
                className={`sticky left-0 z-10 px-4 py-3 font-medium text-void-200 border-b border-void-700/50 ${
                  idx % 2 === 0 ? 'bg-void-950' : 'bg-void-900'
                }`}
              >
                {feature}
              </td>
              {tools.map((tool) => {
                const value = tool.features[feature];
                return (
                  <td
                    key={`${tool.name}-${feature}`}
                    className="border-b border-void-700/50 px-4 py-3 text-center text-void-300"
                  >
                    {typeof value === 'boolean' ? (
                      value ? (
                        <Check
                          size={18}
                          className="mx-auto text-signal-500"
                        />
                      ) : (
                        <X size={18} className="mx-auto text-void-400" />
                      )
                    ) : value !== undefined ? (
                      <span>{value}</span>
                    ) : (
                      <span className="text-void-600">&mdash;</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}

          {/* CTA row */}
          <tr className="bg-void-950">
            <td className="sticky left-0 z-10 bg-void-950 px-4 py-5" />
            {tools.map((tool) => (
              <td key={`cta-${tool.name}`} className="px-4 py-5 text-center">
                <CTAButton
                  href={tool.affiliateUrl}
                  label={`Try ${tool.name}`}
                  variant="primary"
                  size="sm"
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
