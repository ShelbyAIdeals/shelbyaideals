import type { Metadata } from 'next';
import Link from 'next/link';
import { Twitter, Linkedin, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frank Shelby \u2014 Lead Reviewer | ShelbyAI',
  description:
    'Meet Frank Shelby, the founder and lead reviewer at ShelbyAI. Every review on this site comes from hands-on testing with real projects.',
  openGraph: {
    title: 'Frank Shelby \u2014 Lead Reviewer | ShelbyAI',
    description:
      'Meet Frank Shelby, the founder and lead reviewer at ShelbyAI. Every review on this site comes from hands-on testing with real projects.',
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
    title: 'Frank Shelby \u2014 Lead Reviewer | ShelbyAI',
    description:
      'Meet Frank Shelby, the founder and lead reviewer at ShelbyAI. Every review on this site comes from hands-on testing with real projects.',
    images: ['https://www.shelby-ai.com/images/og-thumbnail.png'],
  },
};

const testingApproach = [
  'I sign up and pay with my own money',
  'Every tool gets 7\u201314 days of real-world testing',
  'I document specific results \u2014 not just features',
  'I compare against competitors in the same category',
] as const;

const latestReviews = [
  { name: 'Pictory', href: '/reviews/pictory-review/' },
  { name: 'ElevenLabs', href: '/reviews/elevenlabs-review/' },
  { name: 'Synthesia', href: '/reviews/synthesia-review/' },
] as const;

export default function FranShelbyPage() {
  return (
    <main className="min-h-screen">
      <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Header with avatar */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center bg-gradient-to-br from-signal-500 to-signal-700 text-void-50 font-heading font-bold text-3xl sm:text-4xl select-none shrink-0">
              FS
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-2">
                About Frank Shelby
              </h1>
              <p className="text-lg text-void-400">
                Founder & Lead Reviewer at ShelbyAI
              </p>
            </div>
          </div>

          {/* Bio */}
          <section className="mb-12">
            <div className="space-y-4 text-lg text-void-200 leading-relaxed">
              <p>
                I started ShelbyAI because I was tired of reading AI tool reviews
                that were obviously written by people who never used the product.
                Every review on this site comes from me personally signing up,
                paying for a plan, and using the tool on real projects for 7&ndash;14
                days.
              </p>
              <p>
                My focus is AI video, audio, and marketing tools for small
                businesses. I test tools the way a one-person marketing team would
                use them &mdash; not with synthetic benchmarks, but with real blog
                posts, real videos, and real deadlines.
              </p>
              <p>
                I&apos;ve tested 31 tools so far across 3 categories: AI Video &amp;
                Audio, AI Marketing &amp; SEO, and AI Content &amp; Productivity.
                If a tool is great, I say so. If it&apos;s mediocre, I say that too
                &mdash; even if they pay us a commission.
              </p>
            </div>
          </section>

          {/* Testing Approach */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-void-50 mb-5">
              My Testing Approach
            </h2>
            <ul className="space-y-3">
              {testingApproach.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-signal-400 mt-0.5 shrink-0"
                  />
                  <span className="text-void-200 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Connect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-void-50 mb-5">Connect</h2>
            <div className="bg-void-900/60 border border-void-700/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center gap-6">
                <a
                  href="https://x.com/shelbyaideals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-void-400 hover:text-signal-400 transition-colors no-underline"
                >
                  <Twitter size={18} />
                  @shelbyaideals
                </a>
                <a
                  href="https://www.linkedin.com/in/shelby-ai-1bb38a3b6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-void-400 hover:text-signal-400 transition-colors no-underline"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </a>
              </div>
            </div>
          </section>

          {/* Latest Reviews */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-void-50 mb-5">
              Read My Latest Reviews
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {latestReviews.map((review) => (
                <Link
                  key={review.href}
                  href={review.href}
                  className="flex items-center justify-between gap-2 bg-void-900/60 border border-void-700/50 rounded-lg px-4 py-3 text-sm font-medium text-void-200 hover:border-signal-500/40 hover:text-signal-400 transition-colors no-underline"
                >
                  {review.name} Review
                  <ArrowRight size={14} className="shrink-0 text-void-500" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
