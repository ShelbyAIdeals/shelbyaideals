import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Star, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import Hreflang from '@/components/Hreflang';

export const metadata: Metadata = {
  title: 'ShelbyAI — KI-Tools für Video, Audio & Marketing für Kleinunternehmen',
  description:
    'Wir testen KI-Tools für Video, Audio und Marketing, damit Kleinunternehmen mehr Inhalte produzieren können, ohne mehr Personal einzustellen. 31 Tools getestet. Keine gesponserten Rankings.',
  openGraph: {
    title: 'ShelbyAI — Ehrliche KI-Tool-Bewertungen',
    description:
      'Wir testen KI-Tools für Video, Audio und Marketing für Kleinunternehmen. 31 Tools praktisch getestet. Keine gesponserten Rankings.',
    locale: 'de_DE',
    images: [{ url: 'https://www.shelby-ai.com/images/og-thumbnail.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.shelby-ai.com/de/',
    languages: {
      en: 'https://www.shelby-ai.com/',
      es: 'https://www.shelby-ai.com/es/',
      de: 'https://www.shelby-ai.com/de/',
    },
  },
};

const trustStats = [
  { value: '31', label: 'Tools getestet' },
  { value: '0', label: 'gesponserte Rankings' },
  { value: '7-14', label: 'Testtage pro Tool' },
];

const categories = [
  {
    title: 'KI-Video & Audio',
    description: 'Erstellen Sie Videos, Voiceovers und Audioinhalte mit gründlich getesteten KI-Tools.',
    href: '/reviews/',
    tools: ['Pictory', 'ElevenLabs', 'Synthesia', 'Descript'],
  },
  {
    title: 'KI-Marketing & SEO',
    description: 'Optimieren Sie Inhalte für Suchmaschinen und automatisieren Sie Ihr Marketing mit KI.',
    href: '/reviews/',
    tools: ['Frase', 'Surfer SEO', 'Semrush', 'Mangools'],
  },
  {
    title: 'KI-Content & Produktivität',
    description: 'Schreiben, bearbeiten und produzieren Sie Inhalte schneller mit KI-Assistenten.',
    href: '/reviews/',
    tools: ['ChatGPT', 'Jasper', 'Copy.ai', 'Grammarly'],
  },
];

export default function GermanHomePage() {
  return (
    <main className="min-h-screen">
      <Hreflang path="/de/" />

      {/* Hero */}
      <section className="relative pt-44 sm:pt-52 pb-16 sm:pb-24">
        <div className="container-main text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-signal-500/10 border border-signal-500/20 text-signal-400 text-sm font-medium mb-6">
            <Zap size={14} />
            Ehrliche KI-Tool-Bewertungen
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-void-50 font-heading leading-tight mb-6">
            Verwandeln Sie ein Content-Stück in zehn mit{' '}
            <span className="text-signal-400">KI-Video</span>
          </h1>

          <p className="text-lg sm:text-xl text-void-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Wir testen KI-Tools für Video, Audio und Marketing, damit Kleinunternehmen mehr Inhalte produzieren können — ohne mehr Personal einzustellen.
          </p>

          {/* Trust stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-10">
            {trustStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-signal-400 font-heading">{stat.value}</div>
                <div className="text-xs sm:text-sm text-void-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/reviews/"
              className="btn-primary text-base px-8 py-3.5 no-underline"
            >
              Alle Tools ansehen <ArrowRight size={16} />
            </Link>
            <Link
              href="/how-we-review/"
              className="btn-secondary text-base px-8 py-3.5 no-underline"
            >
              Unsere Methodik
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-16 sm:pb-24">
        <div className="container-main max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-void-50 font-heading text-center mb-4">
            Tool-Kategorien
          </h2>
          <p className="text-void-400 text-center mb-10 max-w-2xl mx-auto">
            Jedes Tool wird 7-14 Tage lang mit echten Aufgaben getestet. Keine synthetischen Benchmarks.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="card p-6 no-underline group hover:-translate-y-1 transition-all"
              >
                <h3 className="text-lg font-semibold text-void-100 group-hover:text-signal-400 transition-colors mb-2">
                  {cat.title}
                </h3>
                <p className="text-sm text-void-400 mb-4 leading-relaxed">{cat.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.tools.map((tool) => (
                    <span key={tool} className="badge-void text-xs">{tool}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="pb-16 sm:pb-24 bg-void-900/30">
        <div className="container-main max-w-4xl mx-auto py-16">
          <div className="text-center mb-10">
            <Shield size={32} className="text-signal-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-void-50 font-heading mb-3">
              Warum Uns Vertrauen?
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { title: 'Echte Tests', desc: 'Jedes Tool wird 7-14 Tage mit echten Inhalten getestet, nicht mit vorbereiteten Demos.' },
              { title: 'Keine gesponserten Rankings', desc: 'Affiliate-Beziehungen beeinflussen niemals unsere Bewertungen.' },
              { title: 'Volle Ehrlichkeit', desc: 'Wenn ein kostenloses Tool ein kostenpflichtiges übertrifft, sagen wir das klar.' },
              { title: 'Für Kleinunternehmen', desc: 'Wir bewerten Tools aus der Perspektive kleiner Teams und realer Budgets.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <CheckCircle size={20} className="text-signal-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-void-100 mb-1">{item.title}</h3>
                  <p className="text-sm text-void-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 sm:pb-24">
        <div className="container-main max-w-3xl mx-auto text-center py-16">
          <Star size={32} className="text-ember-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-void-50 font-heading mb-4">
            Finden Sie das Perfekte KI-Tool
          </h2>
          <p className="text-void-400 mb-8 max-w-xl mx-auto">
            Entdecken Sie unsere 31 detaillierten Bewertungen, Vergleiche und Anleitungen. Alles von Hand getestet.
          </p>
          <Link href="/reviews/" className="btn-primary text-base px-8 py-3.5 no-underline">
            Tools Entdecken <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
