import type { Metadata } from 'next';
import { Mail, MessageSquare, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the ShelbyAIDeals team. Questions, feedback, partnership inquiries, and corrections.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <div className="container-main pt-44 sm:pt-48 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4">
            Contact Us
          </h1>
          <p className="text-void-400 mb-10 leading-relaxed">
            Have a question, feedback, or business inquiry? We&apos;d love to
            hear from you.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 mb-12">
            {/* Email card */}
            <div className="rounded-xl border border-void-700/50 bg-void-900/60 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent-500/10 flex items-center justify-center">
                  <Mail size={20} className="text-accent-400" />
                </div>
                <h2 className="text-lg font-bold text-void-100">Email</h2>
              </div>
              <p className="text-sm text-void-400 mb-3">
                For general questions, feedback, and corrections.
              </p>
              <a
                href="mailto:support@shelby-ai.com"
                className="text-accent-400 hover:text-accent-300 text-sm font-semibold underline"
              >
                support@shelby-ai.com
              </a>
            </div>

            {/* Response time card */}
            <div className="rounded-xl border border-void-700/50 bg-void-900/60 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent-500/10 flex items-center justify-center">
                  <Clock size={20} className="text-accent-400" />
                </div>
                <h2 className="text-lg font-bold text-void-100">Response Time</h2>
              </div>
              <p className="text-sm text-void-400">
                We typically respond within 24&ndash;48 hours on business days.
              </p>
            </div>
          </div>

          <div className="space-y-8 text-void-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3 flex items-center gap-2">
                <MessageSquare size={20} className="text-accent-400" />
                What You Can Reach Out About
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-void-100">Tool review requests</span>{' '}
                    &mdash; want us to review a specific AI tool? Let us know.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-void-100">Corrections &amp; updates</span>{' '}
                    &mdash; spotted outdated pricing, a broken link, or incorrect
                    information? We want to fix it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-void-100">Partnership &amp; advertising</span>{' '}
                    &mdash; interested in working with us? We&apos;re open to
                    partnerships that align with our editorial standards.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-void-100">General feedback</span>{' '}
                    &mdash; suggestions on how we can improve the site, content
                    ideas, or anything else.
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-void-100 mb-3">
                Affiliate Program Owners
              </h2>
              <p>
                If you run an AI tool and would like to be featured or have your
                listing updated, email us at{' '}
                <a
                  href="mailto:support@shelby-ai.com"
                  className="text-accent-400 hover:text-accent-300 underline"
                >
                  support@shelby-ai.com
                </a>{' '}
                with the subject line &ldquo;Tool Submission&rdquo;. Please note
                that inclusion on our site does not guarantee a positive review
                &mdash; we maintain editorial independence on all content.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
