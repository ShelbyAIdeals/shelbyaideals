import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Star, BarChart3, Twitter, Github } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { getAllArticles } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Frank Shelby — Founder & Lead Reviewer',
  description:
    'Frank Shelby is the founder and lead reviewer at ShelbyAI. He tests every AI tool hands-on for 7-14 days, covering video, audio, marketing, and productivity tools for small businesses.',
  openGraph: {
    title: 'Frank Shelby — Founder & Lead Reviewer at ShelbyAI',
    description:
      'Frank Shelby tests AI tools for small businesses. 31+ tools reviewed hands-on with real workflows.',
    type: 'profile',
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
    title: 'Frank Shelby — ShelbyAI',
    description: '31+ AI tools tested hands-on. Founder & Lead Reviewer at ShelbyAI.',
    images: ['https://www.shelby-ai.com/images/og-thumbnail.png'],
  },
  alternates: {
    canonical: 'https://www.shelby-ai.com/author/frank-shelby/',
  },
};

// Person schema is static trusted content — safe for JSON serialization
const personSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Frank Shelby',
  url: 'https://www.shelby-ai.com/author/frank-shelby/',
  jobTitle: 'Founder & Lead Reviewer',
  worksFor: {
    '@type': 'Organization',
    name: 'ShelbyAIDeals',
    url: 'https://www.shelby-ai.com',
  },
  knowsAbout: [
    'AI Tools',
    'AI Video Creation',
    'AI Audio Generation',
    'Content Marketing',
    'SEO Tools',
    'Small Business Technology',
    'SaaS Product Reviews',
  ],
  sameAs: [
    'https://x.com/ShelbyAIDeals',
    'https://www.pinterest.com/shelbyaideals/',
    'https://github.com/ShelbyAIdeals',
  ],
  description:
    'Frank Shelby is the founder and lead reviewer at ShelbyAI, where he tests AI video, audio, marketing, and productivity tools hands-on for 7-14 days each. His reviews focus on real workflows for creators, freelancers, and small teams.',
});

export default function AuthorPage() {
  const articles = getAllArticles();
  const reviews = articles.filter((a) => a.type === 'review');
  const comparisons = articles.filter((a) => a.type === 'comparison');
  const guides = articles.filter((a) => a.type === 'guide');
  const bestOf = articles.filter((a) => a.type === 'best');

  return (
    <main className="min-h-screen">
      <script type="application/ld+json">{personSchema}</script>
      <JsonLd
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.shelby-ai.com/' },
          { name: 'Frank Shelby', url: 'https://www.shelby-ai.com/author/frank-shelby/' },
        ]}
      />

      <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4">
              Frank Shelby
            </h1>
            <p className="text-lg text-signal-400 font-medium mb-4">
              Founder & Lead Reviewer at ShelbyAI
            </p>
            <p className="text-void-300 leading-relaxed mb-6">
              I started ShelbyAI because I was tired of &ldquo;reviews&rdquo; that were barely-disguised sales pages.
              Every tool on this site gets tested for 7-14 days with real content workflows before I write a single word.
              I focus on AI video, audio, marketing, and productivity tools — the ones that actually matter for small
              businesses trying to produce more content without hiring more people.
            </p>
            <p className="text-void-300 leading-relaxed mb-6">
              My testing process is simple: I use each tool the way a real small business owner would. I create real
              videos, generate real voiceovers, write real blog posts, and run real SEO campaigns. Then I document what
              works, what doesn&apos;t, and whether the price is worth it. No affiliate relationship has ever changed a rating.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              <a
                href="https://x.com/ShelbyAIDeals"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-void-400 hover:text-signal-400 transition-colors"
              >
                <Twitter size={16} /> @ShelbyAIDeals
              </a>
              <a
                href="https://github.com/ShelbyAIdeals"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-void-400 hover:text-signal-400 transition-colors"
              >
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              { icon: BookOpen, label: 'Reviews', value: reviews.length },
              { icon: BarChart3, label: 'Comparisons', value: comparisons.length },
              { icon: Star, label: 'Guides', value: guides.length },
              { icon: Star, label: 'Best-Of Lists', value: bestOf.length },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="card p-4 text-center">
                <Icon size={20} className="text-signal-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-void-50">{value}</div>
                <div className="text-xs text-void-400">{label}</div>
              </div>
            ))}
          </div>

          {/* Testing Methodology */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-void-50 mb-4">How I Test</h2>
            <div className="card p-6">
              <div className="space-y-4 text-void-300">
                <p>
                  <strong className="text-void-100">Duration:</strong> Every tool gets 7-14 days of hands-on testing.
                  No &ldquo;tried it for 20 minutes&rdquo; reviews.
                </p>
                <p>
                  <strong className="text-void-100">Real workflows:</strong> I test tools with actual content tasks —
                  converting blog posts to videos, generating voiceovers for YouTube, writing SEO-optimized articles,
                  and automating marketing workflows.
                </p>
                <p>
                  <strong className="text-void-100">Scoring:</strong> Output Quality (30%), Value for Money (25%),
                  Ease of Use (20%), Features (15%), Support (10%). Every score is earned, not assigned.
                </p>
                <p>
                  <strong className="text-void-100">Independence:</strong> Zero sponsored rankings. Affiliate links
                  exist (that&apos;s how the site earns revenue), but they never influence scores or recommendations.
                </p>
              </div>
              <div className="mt-4">
                <Link
                  href="/how-we-review/"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-400 hover:text-signal-300 transition-colors"
                >
                  Full methodology <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>

          {/* Recent Reviews */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-void-50 mb-4">Recent Reviews</h2>
            <div className="space-y-3">
              {reviews.slice(0, 10).map((review) => (
                <Link
                  key={review.slug}
                  href={`/reviews/${review.slug}/`}
                  className="card p-4 flex items-center justify-between no-underline group hover:-translate-y-0.5 transition-all"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-void-100 group-hover:text-signal-400 transition-colors">
                      {review.title}
                    </h3>
                    <span className="text-xs text-void-500">{review.date}</span>
                  </div>
                  {'rating' in review && (
                    <span className="badge-score text-xs w-8 h-8">
                      {(review as { rating: number }).rating.toFixed(1)}
                    </span>
                  )}
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/reviews/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-400 hover:text-signal-300 transition-colors"
              >
                All reviews <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          {/* Recent Comparisons */}
          <section>
            <h2 className="text-xl font-bold text-void-50 mb-4">Recent Comparisons</h2>
            <div className="space-y-3">
              {comparisons.slice(0, 5).map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/comparisons/${comp.slug}/`}
                  className="card p-4 flex items-center justify-between no-underline group hover:-translate-y-0.5 transition-all"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-void-100 group-hover:text-signal-400 transition-colors">
                      {comp.title}
                    </h3>
                    <span className="text-xs text-void-500">{comp.date}</span>
                  </div>
                  <ArrowRight size={14} className="text-void-500 group-hover:text-signal-400 transition-colors" />
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/comparisons/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-400 hover:text-signal-300 transition-colors"
              >
                All comparisons <ArrowRight size={14} />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
