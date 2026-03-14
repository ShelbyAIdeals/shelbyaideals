import type { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterSignup';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'FAQ — ShelbyAIDeals',
  description:
    'Frequently asked questions about ShelbyAIDeals — how we review tools, how we make money, and how to get the most from our content.',
  openGraph: {
    title: 'FAQ — ShelbyAIDeals',
    description:
      'Frequently asked questions about ShelbyAIDeals — how we review tools, how we make money, and how to get the most from our content.',
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
    title: 'FAQ — ShelbyAIDeals',
    description:
      'Frequently asked questions about ShelbyAIDeals — how we review tools, how we make money, and how to get the most from our content.',
    images: ['https://shelby-ai.com/images/og-thumbnail.png'],
  },
};

const faqs = [
  {
    question: 'How do you test and review AI tools?',
    answer:
      'Every tool goes through a hands-on testing process. We create real accounts, complete the onboarding, and run actual tasks — writing copy, generating images, building automations, optimizing content. We benchmark results against competitors and document everything with screenshots, scores, and clear verdicts. No scripted demos or cherry-picked examples.',
  },
  {
    question: 'How does ShelbyAIDeals make money?',
    answer:
      'We earn revenue through affiliate partnerships. When you click a link to a tool we recommend and make a purchase, we may earn a commission at no extra cost to you. This keeps our content free. Affiliate relationships never influence our ratings, rankings, or recommendations — we review tools based on merit alone.',
  },
  {
    question: 'Are your reviews biased because of affiliate commissions?',
    answer:
      'No. We review tools we genuinely believe are worth your time and money. We regularly feature tools where we have no affiliate relationship, and we point out significant flaws even in tools we recommend. Our reputation depends on honest, accurate reviews — gaming recommendations for short-term commissions would destroy that.',
  },
  {
    question: 'How often are reviews updated?',
    answer:
      'We aim to update reviews when tools release major updates or pricing changes. AI tools evolve quickly, so we prioritize keeping our most popular reviews current. Each review shows its publication and last-updated date so you always know how fresh the information is.',
  },
  {
    question: 'Can I suggest a tool for review?',
    answer:
      'Yes! Use our Submit a Tool page to suggest any AI tool you would like us to review. We prioritize tools based on reader interest, market relevance, and category coverage. If we review your suggestion, we will notify you if you leave your email.',
  },
  {
    question: 'Who is ShelbyAIDeals for?',
    answer:
      'We write for creators, freelancers, and small teams (1-10 people) who want to use AI tools effectively without spending hours researching every option. If you need practical, workflow-focused recommendations rather than feature-list comparisons, you are in the right place.',
  },
  {
    question: 'What categories do you cover?',
    answer:
      'We cover six main categories: AI Writing Tools, AI Design & Video, AI SEO Tools, AI Automation, AI Coding Tools, and AI Productivity. Each category focuses on tools that are practical and affordable for independent professionals and small teams.',
  },
  {
    question: 'How is this different from other AI tool directories?',
    answer:
      'Most AI directories just list tools with surface-level descriptions. We go deeper — testing each tool with real workflows, comparing head-to-head performance, and giving honest verdicts. We focus on quality over quantity, reviewing fewer tools but in much greater depth.',
  },
  {
    question: 'Do you offer sponsored reviews or paid placements?',
    answer:
      'No. We do not accept payment for reviews or rankings. Every review is editorially independent. Tools cannot pay for a higher rating or a more favorable review. If a link is an affiliate link, it is clearly disclosed.',
  },
  {
    question: 'How can I contact you?',
    answer:
      'Reach us at support@shelby-ai.com for general inquiries, partners@shelby-ai.com for affiliate partnerships, or use our Contact page. We read every email.',
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      <JsonLd
        type="faq"
        data={{
          questions: faqs.map((f) => ({
            question: f.question,
            answer: f.answer,
          })),
        }}
      />

      <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-signal-500/15 text-signal-400 flex items-center justify-center">
              <HelpCircle size={20} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-void-50">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-void-400 mb-12 leading-relaxed">
            Everything you need to know about ShelbyAIDeals, our reviews, and how we work.
          </p>

          {/* FAQ Items */}
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-void-900/60 border border-void-700/50 backdrop-blur-sm rounded-xl p-6"
              >
                <h2 className="text-lg font-bold text-void-50 mb-3">
                  {faq.question}
                </h2>
                <p className="text-void-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-12 bg-void-900/60 border border-void-700/50 backdrop-blur-sm rounded-xl p-8 text-center">
            <h2 className="text-xl font-bold text-void-50 mb-3">
              Still have questions?
            </h2>
            <p className="text-void-300 mb-4">
              We are happy to help. Reach out anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="btn-primary text-sm no-underline"
              >
                Contact Us
              </Link>
              <Link
                href="/submit-tool"
                className="btn-outline text-sm no-underline"
              >
                Submit a Tool
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <section className="mt-12">
            <NewsletterSignup variant="section" />
          </section>
        </div>
      </div>
    </main>
  );
}
