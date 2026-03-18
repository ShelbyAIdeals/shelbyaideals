import type { Metadata } from 'next';
import Link from 'next/link';
import { FlaskConical, Target, Users, DollarSign, ClipboardCheck, Twitter, Linkedin } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterSignup';

export const metadata: Metadata = {
  title: 'About ShelbyAI',
  description:
    'We test AI tools the way you actually use them. Learn about our hands-on testing methodology, honest reviews, and workflow-first approach.',
  openGraph: {
    title: 'About ShelbyAI',
    description:
      'We test AI tools the way you actually use them. Learn about our hands-on testing methodology, honest reviews, and workflow-first approach.',
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
    title: 'About ShelbyAI',
    description:
      'We test AI tools the way you actually use them. Learn about our hands-on testing methodology, honest reviews, and workflow-first approach.',
    images: ['https://www.shelby-ai.com/images/og-thumbnail.png'],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-6">
            About ShelbyAI
          </h1>

          {/* Mission Statement */}
          <section className="mb-12">
            <p className="text-lg text-void-50 leading-relaxed mb-4">
              We test AI tools the way you actually use them &mdash; not with
              scripted demos or cherry-picked examples, but with real tasks, real
              workflows, and real deadlines.
            </p>
            <p className="text-lg text-void-50 leading-relaxed">
              The AI tool market is overwhelming. New products launch daily, each
              claiming to be the best. We cut through the noise so you can spend
              less time evaluating tools and more time doing great work.
            </p>
          </section>

          {/* Our Approach */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-signal-500/15 text-signal-400 flex items-center justify-center">
                <Target size={20} />
              </div>
              <h2 className="text-2xl font-bold text-void-50">Our Approach</h2>
            </div>
            <div className="space-y-3 text-void-50 leading-relaxed">
              <p>
                <span className="font-semibold text-void-50">Hands-on testing.</span>{' '}
                Every tool we review gets put through real-world scenarios &mdash;
                creating videos, generating voiceovers, automating content distribution, optimizing
                content. We don't just read the feature list; we use the product.
              </p>
              <p>
                <span className="font-semibold text-void-50">Honest verdicts.</span>{' '}
                If a tool is great, we say so. If it falls short, we say that too.
                Our reviews are never pay-to-play, and no vendor gets to approve our
                content before publication.
              </p>
              <p>
                <span className="font-semibold text-void-50">Workflow-first thinking.</span>{' '}
                We don't just rate features in isolation. We evaluate how each tool
                fits into the way creators and small teams actually work &mdash;
                including integrations, learning curve, and total cost.
              </p>
            </div>
          </section>

          {/* Who We Help */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-signal-500/15 text-signal-400 flex items-center justify-center">
                <Users size={20} />
              </div>
              <h2 className="text-2xl font-bold text-void-50">Who We Help</h2>
            </div>
            <p className="text-void-50 leading-relaxed">
              Small business owners, freelancers, and lean marketing teams
              (1&ndash;10 people) who need to create more content across blog, video,
              social, and podcast channels without dedicated staff for each.
            </p>
          </section>

          {/* How We Make Money */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-signal-500/15 text-signal-400 flex items-center justify-center">
                <DollarSign size={20} />
              </div>
              <h2 className="text-2xl font-bold text-void-50">How We Make Money</h2>
            </div>
            <p className="text-void-50 leading-relaxed mb-4">
              We believe in full transparency. ShelbyAIDeals earns revenue through
              affiliate partnerships. When you click a link to a tool we
              recommend and make a purchase, we may earn a commission &mdash; at
              no extra cost to you.
            </p>
            <p className="text-void-50 leading-relaxed mb-4">
              This model lets us keep our content free and accessible. Importantly,
              affiliate relationships never influence our ratings, rankings, or
              recommendations. We review and recommend tools based on merit alone.
            </p>
            <p className="text-void-50 leading-relaxed">
              For full details, read our{' '}
              <Link
                href="/affiliate-disclosure"
                className="text-signal-400 hover:text-signal-300 underline"
              >
                Affiliate Disclosure
              </Link>
              .
            </p>
          </section>

          {/* Testing Methodology */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-signal-500/15 text-signal-400 flex items-center justify-center">
                <FlaskConical size={20} />
              </div>
              <h2 className="text-2xl font-bold text-void-50">
                Our Testing Methodology
              </h2>
            </div>
            <p className="text-void-50 leading-relaxed mb-4">
              Every review follows a consistent, repeatable process:
            </p>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal-500 text-xs font-bold text-void-50">
                  1
                </span>
                <div>
                  <span className="font-semibold text-void-50">Sign up and onboard.</span>
                  <p className="text-sm text-void-50/80 mt-0.5">
                    We create a real account, go through the onboarding flow, and
                    evaluate the first-run experience.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal-500 text-xs font-bold text-void-50">
                  2
                </span>
                <div>
                  <span className="font-semibold text-void-50">Test with real tasks.</span>
                  <p className="text-sm text-void-50/80 mt-0.5">
                    We run the tool through actual workflows &mdash; not toy
                    examples. Blog posts, ad copy, code snippets, design assets,
                    automation flows.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal-500 text-xs font-bold text-void-50">
                  3
                </span>
                <div>
                  <span className="font-semibold text-void-50">Compare output quality.</span>
                  <p className="text-sm text-void-50/80 mt-0.5">
                    We benchmark results against competitors and manual effort to
                    assess real value.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal-500 text-xs font-bold text-void-50">
                  4
                </span>
                <div>
                  <span className="font-semibold text-void-50">Document everything.</span>
                  <p className="text-sm text-void-50/80 mt-0.5">
                    Screenshots, scores, pros, cons, and a clear verdict with a
                    rating. We show our work.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* By the Numbers */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-signal-500/15 text-signal-400 flex items-center justify-center">
                <ClipboardCheck size={20} />
              </div>
              <h2 className="text-2xl font-bold text-void-50">By the Numbers</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: '31', label: 'Tools tested hands-on' },
                { value: '3', label: 'Categories covered' },
                { value: '$0', label: 'Cost to readers' },
                { value: '100%', label: 'Independent reviews' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-void-900/60 border border-void-700/50 backdrop-blur-sm rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-bold text-void-50">{stat.value}</div>
                  <div className="text-xs text-void-50/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* What We Cover */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-void-50 mb-4">What We Cover</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'AI Video & Audio', href: '/categories/ai-video-audio' },
                { name: 'AI Marketing & SEO', href: '/categories/ai-marketing-seo' },
                { name: 'AI Content & Productivity', href: '/categories/ai-content-productivity' },
              ].map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="flex items-center gap-2 bg-void-900/60 border border-void-700/50 rounded-lg px-4 py-3 text-sm font-medium text-void-200 hover:border-signal-500/40 hover:text-signal-400 transition-colors no-underline"
                >
                  <span className="w-2 h-2 rounded-full bg-void-50" />
                  {cat.name}
                </Link>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-void-50 mb-4">Get in Touch</h2>
            <div className="bg-void-900/60 border border-void-700/50 backdrop-blur-sm rounded-xl p-6">
              <p className="text-void-50 leading-relaxed mb-4">
                Have a question, tool suggestion, or partnership inquiry? We read every
                email.
              </p>
              <ul className="space-y-2 text-void-50 text-sm">
                <li>
                  <span className="font-semibold text-void-50">General inquiries: </span>
                  <span className="text-signal-400">support@shelby-ai.com</span>
                </li>
                <li>
                  <span className="font-semibold text-void-50">Affiliate partnerships: </span>
                  <span className="text-signal-400">partners@shelby-ai.com</span>
                </li>
                <li>
                  <span className="font-semibold text-void-50">Press & media: </span>
                  <span className="text-signal-400">press@shelby-ai.com</span>
                </li>
              </ul>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-void-700/50">
                <a
                  href="https://x.com/shelbyaideals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-void-400 hover:text-signal-400 transition-colors no-underline"
                >
                  <Twitter size={16} />
                  @shelbyaideals
                </a>
                <a
                  href="https://www.linkedin.com/in/shelby-ai-1bb38a3b6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-void-400 hover:text-signal-400 transition-colors no-underline"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section>
            <NewsletterSignup variant="section" />
          </section>
        </div>
      </div>
    </main>
  );
}
