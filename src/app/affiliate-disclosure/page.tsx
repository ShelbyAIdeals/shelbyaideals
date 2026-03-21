import type { Metadata } from 'next';
import ExploreMore from '@/components/ExploreMore';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description:
    'Learn how ShelbyAIDeals earns revenue through affiliate partnerships and how it affects (and does not affect) our reviews.',
  openGraph: {
    title: 'Affiliate Disclosure',
    description:
      'Learn how ShelbyAIDeals earns revenue through affiliate partnerships and how it affects (and does not affect) our reviews.',
    images: [
      {
        url: 'https://www.shelby-ai.com/images/og-thumbnail.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Affiliate Disclosure',
    description:
      'Learn how ShelbyAIDeals earns revenue through affiliate partnerships and how it affects (and does not affect) our reviews.',
    images: ['https://www.shelby-ai.com/images/og-thumbnail.png'],
  },
  alternates: {
    canonical: 'https://www.shelby-ai.com/affiliate-disclosure/',
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <main className="min-h-screen">
      <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-8">
            Affiliate Disclosure
          </h1>

          <div className="space-y-8 text-void-300 leading-relaxed">
            {/* What are affiliate links */}
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                How We Earn Revenue
              </h2>
              <p>
                ShelbyAIDeals participates in affiliate programs with various AI
                tool providers. This means that when you click on certain links on
                our site and make a purchase, we may earn a commission from the
                sale &mdash; at absolutely no extra cost to you.
              </p>
              <p className="mt-3">
                These commissions help us cover the costs of running this site,
                purchasing tool subscriptions for testing, and producing free,
                high-quality content for our readers.
              </p>
            </section>

            {/* How this affects reviews */}
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                How This Affects Our Reviews
              </h2>
              <p>
                <span className="font-semibold text-void-100">It does not.</span>{' '}
                Our editorial process is completely independent from our affiliate
                partnerships. No tool vendor can pay for a higher rating, a more
                favorable review, or placement in our rankings.
              </p>
              <p className="mt-3">
                We review tools based on their merits: quality, ease of use,
                value for money, and how well they fit into real workflows. If a
                tool has an affiliate program and we genuinely recommend it, we
                will use an affiliate link. If we do not recommend a tool, we will
                not link to it regardless of affiliate availability.
              </p>
            </section>

            {/* Which links are affiliate */}
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                Which Links Are Affiliate Links?
              </h2>
              <p>
                Affiliate links on our site are clearly identified. You will find
                them in:
              </p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-400 mt-2.5 shrink-0" />
                  <span>
                    Call-to-action buttons (e.g., &ldquo;Try [Tool Name]&rdquo;)
                    that link to external tool websites
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-400 mt-2.5 shrink-0" />
                  <span>
                    Links marked with an &ldquo;Affiliate link&rdquo; label
                    beneath them
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-400 mt-2.5 shrink-0" />
                  <span>
                    Comparison tables and best-of lists where each tool has a
                    direct link to its website
                  </span>
                </li>
              </ul>
              <p className="mt-3">
                Internal links to our own content (reviews, guides, comparisons)
                are never affiliate links.
              </p>
            </section>

            {/* Editorial process */}
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                Our Editorial Process
              </h2>
              <p>Every piece of content on ShelbyAIDeals follows this process:</p>
              <ol className="mt-3 space-y-2 list-decimal list-inside">
                <li>
                  <span className="font-semibold text-void-100">Test first.</span>{' '}
                  We sign up for the tool, use it with real tasks, and document our
                  experience before writing a single word.
                </li>
                <li>
                  <span className="font-semibold text-void-100">Write honestly.</span>{' '}
                  We cover both strengths and weaknesses. Every review includes
                  clear pros, cons, and a verdict.
                </li>
                <li>
                  <span className="font-semibold text-void-100">Recommend genuinely.</span>{' '}
                  We only recommend tools we believe provide real value. If a tool
                  is not worth your money, we will say so plainly.
                </li>
              </ol>
            </section>

            {/* FTC Compliance */}
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                FTC Compliance
              </h2>
              <p>
                This disclosure is provided in accordance with the Federal Trade
                Commission&apos;s guidelines on endorsements and testimonials. We are
                committed to transparency and honesty in all our content.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                Questions?
              </h2>
              <p>
                If you have any questions about our affiliate relationships or
                editorial process, please reach out to us at{' '}
                <a
                  href="mailto:support@shelby-ai.com"
                  className="text-signal-400 hover:text-signal-300 underline"
                >
                  support@shelby-ai.com
                </a>
                .
              </p>
            </section>
          </div>

          <ExploreMore variant="legal" />
        </div>
      </div>
    </main>
  );
}
