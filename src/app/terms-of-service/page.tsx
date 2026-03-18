import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms and conditions for using the ShelbyAIDeals website.',
  openGraph: {
    title: 'Terms of Service',
    description:
      'Terms and conditions for using the ShelbyAIDeals website.',
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
    title: 'Terms of Service',
    description:
      'Terms and conditions for using the ShelbyAIDeals website.',
    images: ['https://www.shelby-ai.com/images/og-thumbnail.png'],
  },
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen">
      <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-void-500 mb-10">
            Last updated: March 4, 2026
          </p>

          <div className="space-y-8 text-void-300 leading-relaxed">
            <section>
              <p>
                Welcome to ShelbyAIDeals. By accessing or using our website at
                shelby-ai.com (&ldquo;the Site&rdquo;), you agree to be bound
                by these Terms of Service. If you do not agree, please do not
                use the Site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                Use of the Site
              </h2>
              <p>
                You may use the Site for lawful purposes only. You agree not to:
              </p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-400 mt-2.5 shrink-0" />
                  <span>Copy, reproduce, or redistribute our content without written permission.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-400 mt-2.5 shrink-0" />
                  <span>Use automated tools to scrape or harvest content from the Site.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-400 mt-2.5 shrink-0" />
                  <span>Attempt to interfere with the Site&apos;s functionality or security.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-400 mt-2.5 shrink-0" />
                  <span>Use the Site in any way that violates applicable laws or regulations.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                Content &amp; Intellectual Property
              </h2>
              <p>
                All content on this Site &mdash; including reviews, comparisons,
                guides, graphics, and code &mdash; is the property of
                ShelbyAIDeals and is protected by copyright law. You may share
                links to our content, but reproducing or republishing full
                articles requires our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                Affiliate Links &amp; Revenue
              </h2>
              <p>
                Some links on this Site are affiliate links. When you click an
                affiliate link and make a purchase, we may earn a commission at
                no additional cost to you. This does not influence our reviews
                or ratings. See our{' '}
                <a href="/affiliate-disclosure" className="text-signal-400 hover:text-signal-300 underline">
                  Affiliate Disclosure
                </a>{' '}
                for full details.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                Accuracy of Information
              </h2>
              <p>
                We strive to provide accurate and up-to-date information about
                AI tools. However, features, pricing, and availability of
                third-party tools may change without notice. We recommend
                verifying current details directly with the tool provider before
                making a purchase decision. ShelbyAIDeals is not responsible for
                changes made by third-party services after our reviews are
                published.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                Disclaimer of Warranties
              </h2>
              <p>
                The Site and its content are provided &ldquo;as is&rdquo; and
                &ldquo;as available&rdquo; without any warranties, express or
                implied. We do not guarantee that the Site will be
                uninterrupted, error-free, or free of harmful components. Your
                use of the Site is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, ShelbyAIDeals shall not
                be liable for any indirect, incidental, special, or
                consequential damages arising from your use of or inability to
                use the Site, including but not limited to damages resulting
                from purchasing third-party products or services based on our
                reviews.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                Third-Party Links
              </h2>
              <p>
                The Site contains links to third-party websites and services. We
                are not responsible for the content, privacy practices, or
                availability of those external sites. Visiting third-party links
                is at your own discretion and risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                Changes to These Terms
              </h2>
              <p>
                We may update these Terms of Service at any time. Changes take
                effect immediately upon posting to the Site. Continued use of
                the Site after changes are posted constitutes your acceptance of
                the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">Contact</h2>
              <p>
                If you have questions about these terms, contact us at{' '}
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
        </div>
      </div>
    </main>
  );
}
