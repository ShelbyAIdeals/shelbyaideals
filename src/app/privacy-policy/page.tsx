import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how ShelbyAIDeals collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <div className="container-main py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-void-500 mb-10">
            Last updated: March 3, 2026
          </p>

          <div className="space-y-8 text-void-300 leading-relaxed">
            {/* Introduction */}
            <section>
              <p>
                ShelbyAIDeals (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                &ldquo;our&rdquo;) is committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website.
              </p>
            </section>

            {/* Data Collection */}
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                Information We Collect
              </h2>

              <h3 className="text-lg font-semibold text-void-100 mt-4 mb-2">
                Information You Provide
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-void-100">Email address</span>{' '}
                    &mdash; when you sign up for our newsletter or download a
                    free resource.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-void-100">Contact information</span>{' '}
                    &mdash; if you reach out to us via email.
                  </span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-void-100 mt-4 mb-2">
                Information Collected Automatically
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-void-100">Analytics data</span>{' '}
                    &mdash; page views, session duration, referral sources, and
                    general geographic location via Google Analytics (GA4).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-void-100">Cookies and similar technologies</span>{' '}
                    &mdash; to understand how visitors interact with our site and
                    to improve user experience.
                  </span>
                </li>
              </ul>
            </section>

            {/* How We Use Data */}
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                How We Use Your Information
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-void-100">Improve our content</span>{' '}
                    &mdash; analytics help us understand which topics, tools, and
                    formats resonate with our audience.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-void-100">Deliver our newsletter</span>{' '}
                    &mdash; if you subscribe, we use your email to send weekly AI
                    tool recommendations, workflow tips, and exclusive deals.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-void-100">Respond to inquiries</span>{' '}
                    &mdash; if you email us, we use your contact information to
                    reply.
                  </span>
                </li>
              </ul>
              <p className="mt-3">
                We do not sell, rent, or trade your personal information to third
                parties for marketing purposes.
              </p>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                Third-Party Services
              </h2>
              <p className="mb-3">
                We use the following third-party services that may collect or
                process data on our behalf:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-void-100">Google Analytics (GA4)</span>{' '}
                    &mdash; for website traffic analysis and audience insights.
                    Google&apos;s privacy policy applies to their processing of this
                    data.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-void-100">Affiliate networks</span>{' '}
                    &mdash; when you click an affiliate link, the affiliate
                    network (e.g., Impact, ShareASale, or direct programs) may
                    place a cookie to track the referral. These networks have
                    their own privacy policies.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-void-100">Email service provider</span>{' '}
                    &mdash; we use a third-party email platform to manage our
                    newsletter. Your email address is stored securely with this
                    provider and used only for newsletter delivery.
                  </span>
                </li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">Cookies</h2>
              <p>
                Our site uses cookies for analytics and affiliate tracking. You
                can control cookie preferences through your browser settings.
                Disabling cookies may affect certain functionality of the site.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-void-100">Unsubscribe</span>{' '}
                    from our newsletter at any time using the unsubscribe link in
                    every email we send.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-void-100">Request data deletion</span>{' '}
                    &mdash; you can contact us to have your personal data removed
                    from our systems.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-void-100">Access your data</span>{' '}
                    &mdash; you can request a copy of the personal information we
                    hold about you.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-void-100">Opt out of analytics</span>{' '}
                    &mdash; you can use browser extensions like Google Analytics
                    Opt-out to prevent analytics tracking.
                  </span>
                </li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                Children&apos;s Privacy
              </h2>
              <p>
                Our site is not directed at children under 13 years of age. We do
                not knowingly collect personal information from children. If you
                believe we have inadvertently collected data from a child, please
                contact us so we can promptly delete it.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. When we do,
                we will revise the &ldquo;Last updated&rdquo; date at the top of
                this page. We encourage you to review this policy periodically to
                stay informed about how we protect your information.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or your
                personal data, please contact us at{' '}
                <a
                  href="mailto:hello@shelby-ai.com"
                  className="text-accent-400 hover:text-accent-300 underline"
                >
                  hello@shelby-ai.com
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
