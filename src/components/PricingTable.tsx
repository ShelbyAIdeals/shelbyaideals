import { Check } from 'lucide-react';
import type { PricingTier } from '@/lib/types';
import CTAButton from './CTAButton';

interface PricingTableProps {
  plans: PricingTier[];
  toolName: string;
}

export default function PricingTable({ plans, toolName }: PricingTableProps) {
  return (
    <section className="my-10">
      <h3 className="text-xl font-bold text-void-50 mb-6">
        {toolName} Pricing
      </h3>

      {/* Desktop: columns layout */}
      <div className="hidden md:grid gap-6" style={{ gridTemplateColumns: `repeat(${plans.length}, minmax(0, 1fr))` }}>
        {plans.map((tier) => (
          <div
            key={tier.plan}
            className={`relative flex flex-col rounded-xl border bg-void-900/60 backdrop-blur-md p-6 ${
              tier.highlighted
                ? 'border-accent-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                : 'border-void-700/50'
            }`}
          >
            {tier.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-500 px-4 py-1 text-xs font-semibold text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                Most Popular
              </span>
            )}

            <div className="mb-6 text-center">
              <h4 className="text-lg font-bold text-void-50">{tier.plan}</h4>
              <p className="mt-2">
                <span className="text-3xl font-extrabold text-void-100">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-sm text-void-500">/{tier.period}</span>
                )}
              </p>
            </div>

            <ul className="mb-8 flex-1 space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-void-300">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex justify-center">
              {tier.affiliateUrl ? (
                <CTAButton
                  href={tier.affiliateUrl}
                  label={`Get ${tier.plan}`}
                  variant={tier.highlighted ? 'primary' : 'outline'}
                  size="sm"
                />
              ) : (
                <CTAButton
                  href="#"
                  label={`Get ${tier.plan}`}
                  variant={tier.highlighted ? 'primary' : 'outline'}
                  size="sm"
                  external={false}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: stacked rows */}
      <div className="flex flex-col gap-6 md:hidden">
        {plans.map((tier) => (
          <div
            key={tier.plan}
            className={`relative rounded-xl border bg-void-900/60 backdrop-blur-md p-5 ${
              tier.highlighted
                ? 'border-accent-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                : 'border-void-700/50'
            }`}
          >
            {tier.highlighted && (
              <span className="absolute -top-3 left-4 rounded-full bg-accent-500 px-3 py-0.5 text-xs font-semibold text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                Most Popular
              </span>
            )}

            <div className="mb-4 flex items-baseline justify-between">
              <h4 className="text-lg font-bold text-void-50">{tier.plan}</h4>
              <p>
                <span className="text-2xl font-extrabold text-void-100">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-sm text-void-500">/{tier.period}</span>
                )}
              </p>
            </div>

            <ul className="mb-5 space-y-2">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-void-300">
                  <Check size={14} className="mt-0.5 shrink-0 text-accent-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {tier.affiliateUrl ? (
              <CTAButton
                href={tier.affiliateUrl}
                label={`Get ${tier.plan}`}
                variant={tier.highlighted ? 'primary' : 'outline'}
                size="sm"
              />
            ) : (
              <CTAButton
                href="#"
                label={`Get ${tier.plan}`}
                variant={tier.highlighted ? 'primary' : 'outline'}
                size="sm"
                external={false}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
