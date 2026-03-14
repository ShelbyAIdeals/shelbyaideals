import type { Metadata } from 'next';
import { Search, TestTube, Scale, Star, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How We Review',
  description:
    'Our editorial process and review methodology at ShelbyAIDeals. Learn how we test, score, and recommend AI tools.',
  openGraph: {
    title: 'How We Review',
    description:
      'Our editorial process and review methodology at ShelbyAIDeals. Learn how we test, score, and recommend AI tools.',
    images: [
      {
        url: 'https://shelby-ai.com/images/og-thumbnail.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How We Review',
    description:
      'Our editorial process and review methodology at ShelbyAIDeals. Learn how we test, score, and recommend AI tools.',
    images: ['https://shelby-ai.com/images/og-thumbnail.png'],
  },
};

export default function HowWeReviewPage() {
  return (
    <main className="min-h-screen">
      <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4">
            How We Review AI Tools
          </h1>
          <p className="text-void-400 mb-10 leading-relaxed">
            Transparency matters. Here&apos;s exactly how we evaluate, score,
            and recommend the AI tools on our site.
          </p>

          <div className="space-y-10 text-void-300 leading-relaxed">
            {/* Process steps */}
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-6">
                Our Review Process
              </h2>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-signal-500/10 flex items-center justify-center shrink-0">
                    <Search size={20} className="text-signal-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-void-100 mb-1">
                      1. Research
                    </h3>
                    <p>
                      Before testing, we research the tool&apos;s background,
                      funding, user reviews, competitors, and market position.
                      We read documentation, community forums, and existing
                      reviews to understand the full picture.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-signal-500/10 flex items-center justify-center shrink-0">
                    <TestTube size={20} className="text-signal-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-void-100 mb-1">
                      2. Hands-On Testing
                    </h3>
                    <p>
                      We sign up and use the tool on real tasks &mdash; not
                      synthetic benchmarks. We test free tiers, paid plans, and
                      edge cases. We evaluate the actual output quality, not
                      just the feature list.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-signal-500/10 flex items-center justify-center shrink-0">
                    <Scale size={20} className="text-signal-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-void-100 mb-1">
                      3. Comparison
                    </h3>
                    <p>
                      Every tool is evaluated in the context of its competitors.
                      We compare pricing, features, output quality, and
                      ease of use against similar tools in the same category.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-signal-500/10 flex items-center justify-center shrink-0">
                    <Star size={20} className="text-signal-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-void-100 mb-1">
                      4. Scoring
                    </h3>
                    <p>
                      We assign a score out of 10 based on the criteria below.
                      Scores reflect overall value &mdash; a tool with a lower
                      price and solid performance can score higher than an
                      expensive tool with marginal improvements.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Scoring criteria */}
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-4">
                Scoring Criteria
              </h2>
              <p className="mb-4">
                Each tool is scored on a 0&ndash;10 scale across these factors:
              </p>

              <div className="rounded-xl border border-void-700/50 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-void-800 text-void-200">
                      <th className="text-left px-4 py-3 font-semibold">Factor</th>
                      <th className="text-left px-4 py-3 font-semibold">Weight</th>
                      <th className="text-left px-4 py-3 font-semibold">What We Evaluate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-void-700/50">
                    <tr className="bg-void-950">
                      <td className="px-4 py-3 font-medium text-void-200">Output Quality</td>
                      <td className="px-4 py-3 text-signal-400">30%</td>
                      <td className="px-4 py-3">Accuracy, usefulness, and readiness of the AI output</td>
                    </tr>
                    <tr className="bg-void-900/50">
                      <td className="px-4 py-3 font-medium text-void-200">Ease of Use</td>
                      <td className="px-4 py-3 text-signal-400">20%</td>
                      <td className="px-4 py-3">Interface design, learning curve, and onboarding experience</td>
                    </tr>
                    <tr className="bg-void-950">
                      <td className="px-4 py-3 font-medium text-void-200">Value for Money</td>
                      <td className="px-4 py-3 text-signal-400">25%</td>
                      <td className="px-4 py-3">Pricing, free tiers, and ROI compared to alternatives</td>
                    </tr>
                    <tr className="bg-void-900/50">
                      <td className="px-4 py-3 font-medium text-void-200">Features</td>
                      <td className="px-4 py-3 text-signal-400">15%</td>
                      <td className="px-4 py-3">Breadth and depth of features, integrations, and flexibility</td>
                    </tr>
                    <tr className="bg-void-950">
                      <td className="px-4 py-3 font-medium text-void-200">Support &amp; Docs</td>
                      <td className="px-4 py-3 text-signal-400">10%</td>
                      <td className="px-4 py-3">Documentation quality, customer support, and community</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Editorial independence */}
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3 flex items-center gap-2">
                <ShieldCheck size={22} className="text-signal-400" />
                Editorial Independence
              </h2>
              <p className="mb-3">
                Our reviews are editorially independent. While we earn affiliate
                commissions on some tools we recommend, this never influences
                our scores or opinions. Here&apos;s what that means in practice:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-400 mt-2.5 shrink-0" />
                  <span>We give low scores to tools with affiliate programs if they deserve it.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-400 mt-2.5 shrink-0" />
                  <span>We recommend free tools over paid ones when they&apos;re genuinely better.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-400 mt-2.5 shrink-0" />
                  <span>We clearly disclose affiliate relationships on every review page.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-400 mt-2.5 shrink-0" />
                  <span>No tool company has editorial input or approval over our content.</span>
                </li>
              </ul>
            </section>

            {/* Updates */}
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                Keeping Reviews Updated
              </h2>
              <p>
                AI tools evolve quickly. We revisit and update our reviews when
                tools release major updates, change pricing, or add significant
                new features. Every review shows a &ldquo;Last updated&rdquo;
                date so you know how current the information is. If you spot
                something outdated, please{' '}
                <a href="/contact" className="text-signal-400 hover:text-signal-300 underline">
                  let us know
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
