import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/motion/ScrollProgress';
import MistEffect from '@/components/MistEffect';
import PageScaler from '@/components/PageScaler';
import JsonLd from '@/components/JsonLd';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ShelbyAIDeals — Honest AI Tool Reviews for Creators & Small Teams',
    template: '%s | ShelbyAIDeals',
  },
  description:
    'We test AI tools the way you actually use them. Honest reviews, real comparisons, and workflow-first recommendations for creators, freelancers, and small teams.',
  keywords: [
    'AI tools',
    'AI tool reviews',
    'best AI tools',
    'AI writing tools',
    'AI productivity',
    'AI for freelancers',
    'AI for small teams',
  ],
  authors: [{ name: 'ShelbyAIDeals' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'ShelbyAIDeals',
    title: 'ShelbyAIDeals — Honest AI Tool Reviews for Creators & Small Teams',
    description:
      'We test AI tools the way you actually use them. Honest reviews, real comparisons, and workflow-first recommendations.',
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
    title: 'ShelbyAIDeals',
    description:
      'Honest AI tool reviews for creators, freelancers, and small teams.',
    images: ['https://shelby-ai.com/images/og-thumbnail.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://shelby-ai.com',
    types: {
      'application/rss+xml': 'https://shelby-ai.com/feed.xml',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0KV9M45SQW"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-0KV9M45SQW');`}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: 'window.history.scrollRestoration="manual";window.scrollTo(0,0);try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}' }} />
        {/* GA4 affiliate click tracking via event delegation */}
        <script dangerouslySetInnerHTML={{ __html: `document.addEventListener("click",function(e){var a=e.target.closest('a[rel*="sponsored"]');if(!a)return;var h=a.getAttribute("href")||"",t=a.textContent.trim()||"";if(typeof gtag==="function"){gtag("event","affiliate_click",{event_category:"affiliate",event_label:t,affiliate_url:h,page_location:window.location.href})}})` }} />
        {/* Microsoft Clarity heatmaps */}
        <script dangerouslySetInnerHTML={{ __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID||""}")` }} />
        <JsonLd type="website" />
        <MistEffect />
        <div className="relative z-[2] isolate flex flex-col min-h-screen">
          <ScrollProgress />
          <Header />
          <PageScaler>{children}</PageScaler>
          <Footer />
          <ExitIntentPopup />
        </div>
      </body>
    </html>
  );
}
