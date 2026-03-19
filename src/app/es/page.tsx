import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Star, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import Hreflang from '@/components/Hreflang';

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: 'ShelbyAI — Herramientas de IA para Video, Audio y Marketing para Pequeñas Empresas',
  description:
    'Probamos herramientas de IA de video, audio y marketing para que las pequeñas empresas puedan producir más contenido sin contratar más personal. 31 herramientas probadas. Sin clasificaciones patrocinadas.',
  openGraph: {
    title: 'ShelbyAI — Reseñas Honestas de Herramientas de IA',
    description:
      'Probamos herramientas de IA de video, audio y marketing para pequeñas empresas. 31 herramientas probadas a fondo. Sin clasificaciones patrocinadas.',
    locale: 'es_ES',
    images: [{ url: 'https://www.shelby-ai.com/images/og-thumbnail.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.shelby-ai.com/es/',
    languages: {
      en: 'https://www.shelby-ai.com/',
      es: 'https://www.shelby-ai.com/es/',
      de: 'https://www.shelby-ai.com/de/',
    },
  },
};

const trustStats = [
  { value: '31', label: 'herramientas probadas' },
  { value: '0', label: 'clasificaciones patrocinadas' },
  { value: '7-14', label: 'días de prueba por herramienta' },
];

const categories = [
  {
    title: 'IA de Video y Audio',
    description: 'Crea videos, voces en off y contenido de audio con herramientas de IA probadas a fondo.',
    href: '/reviews/',
    tools: ['Pictory', 'ElevenLabs', 'Synthesia', 'Descript'],
  },
  {
    title: 'IA de Marketing y SEO',
    description: 'Optimiza tu contenido para buscadores y automatiza tu marketing con IA.',
    href: '/reviews/',
    tools: ['Frase', 'Surfer SEO', 'Semrush', 'Mangools'],
  },
  {
    title: 'IA de Contenido y Productividad',
    description: 'Escribe, edita y produce contenido más rápido con asistentes de IA.',
    href: '/reviews/',
    tools: ['ChatGPT', 'Jasper', 'Copy.ai', 'Grammarly'],
  },
];

export default function SpanishHomePage() {
  return (
    <main className="min-h-screen">
      <Hreflang path="/es/" />

      {/* Hero */}
      <section className="relative pt-44 sm:pt-52 pb-16 sm:pb-24">
        <div className="container-main text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-signal-500/10 border border-signal-500/20 text-signal-400 text-sm font-medium mb-6">
            <Zap size={14} />
            Reseñas honestas de herramientas de IA
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-void-50 font-heading leading-tight mb-6">
            Convierte Una Pieza de Contenido en Diez con{' '}
            <span className="text-signal-400">IA de Video</span>
          </h1>

          <p className="text-lg sm:text-xl text-void-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Probamos herramientas de IA de video, audio y marketing para que las pequeñas empresas puedan producir más contenido sin contratar más personal.
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
              Ver Todas las Herramientas <ArrowRight size={16} />
            </Link>
            <Link
              href="/how-we-review/"
              className="btn-secondary text-base px-8 py-3.5 no-underline"
            >
              Cómo Evaluamos
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-16 sm:pb-24">
        <div className="container-main max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-void-50 font-heading text-center mb-4">
            Categorías de Herramientas
          </h2>
          <p className="text-void-400 text-center mb-10 max-w-2xl mx-auto">
            Cada herramienta se prueba durante 7-14 días con tareas reales. Sin benchmarks sintéticos.
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
              ¿Por Qué Confiar en Nosotros?
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { title: 'Pruebas Reales', desc: 'Cada herramienta se prueba 7-14 días con contenido real, no demos preparadas.' },
              { title: 'Sin Rankings Patrocinados', desc: 'Las relaciones de afiliación nunca influyen en nuestras puntuaciones.' },
              { title: 'Honestidad Total', desc: 'Si una herramienta gratuita supera a una de pago, lo decimos claramente.' },
              { title: 'Para Pequeñas Empresas', desc: 'Evaluamos herramientas desde la perspectiva de equipos pequeños y presupuestos reales.' },
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
            Encuentra la Herramienta de IA Perfecta
          </h2>
          <p className="text-void-400 mb-8 max-w-xl mx-auto">
            Explora nuestras 31 reseñas detalladas, comparativas y guías. Todo probado a mano.
          </p>
          <Link href="/reviews/" className="btn-primary text-base px-8 py-3.5 no-underline">
            Explorar Herramientas <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
