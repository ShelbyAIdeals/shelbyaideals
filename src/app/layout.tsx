import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/motion/ScrollProgress';
import MistEffect from '@/components/MistEffect';
import PageScaler from '@/components/PageScaler';
import JsonLd from '@/components/JsonLd';
import Providers from '@/components/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ShelbyAI — AI Video, Audio & Marketing Tools for Small Business',
    template: '%s | ShelbyAI',
  },
  description:
    'We test AI video, audio, and marketing tools so small businesses can produce more content without hiring more people. 31 tools reviewed hands-on. No sponsored rankings.',
  keywords: [
    'AI video tools',
    'AI audio tools',
    'AI tools for small business',
    'AI marketing tools',
    'AI SEO tools',
    'content repurposing AI',
    'AI tool reviews',
    'best AI tools small business',
  ],
  authors: [{ name: 'Fran Shelby' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'ShelbyAI',
    title: 'ShelbyAI — AI Video, Audio & Marketing Tools for Small Business',
    description:
      'We test AI video, audio, and marketing tools so small businesses can produce more content without hiring more people. 31 tools reviewed hands-on. No sponsored rankings.',
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
    title: 'ShelbyAIDeals',
    description:
      'Honest AI tool reviews for creators, freelancers, and small teams.',
    images: ['https://www.shelby-ai.com/images/og-thumbnail.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.shelby-ai.com',
    types: {
      'application/rss+xml': 'https://www.shelby-ai.com/feed.xml',
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
        <meta name="impact-site-verification" content="34aa4c6e-1268-44c3-97fb-ef223f74b914" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: 'window.history.scrollRestoration="manual";window.scrollTo(0,0);try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}' }} />
        {/* GA4 affiliate click tracking via event delegation */}
        <script dangerouslySetInnerHTML={{ __html: `document.addEventListener("click",function(e){var a=e.target.closest('a[rel*="sponsored"]');if(!a)return;var h=a.getAttribute("href")||"",t=a.textContent.trim()||"";if(typeof gtag==="function"){gtag("event","affiliate_click",{event_category:"affiliate",event_label:t,affiliate_url:h,page_location:window.location.href})}})` }} />
        {/* Microsoft Clarity heatmaps */}
        <script dangerouslySetInnerHTML={{ __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID||""}")` }} />
        {/* Meta Pixel */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID}');fbq('track','PageView');` }} />
        )}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
        {/* LinkedIn Insight Tag */}
        {process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID && (
          <script dangerouslySetInnerHTML={{ __html: `_linkedin_partner_id="${process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s)})(window.lintrk);` }} />
        )}
        {process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://px.ads.linkedin.com/collect/?pid=${process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID}&fmt=gif`}
              alt=""
            />
          </noscript>
        )}
        <JsonLd type="website" />
        <JsonLd type="organization" />
        <MistEffect />
        <Providers>
          <div className="relative z-[2] isolate flex flex-col min-h-screen">
            <ScrollProgress />
            <Header />
            <PageScaler>{children}</PageScaler>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
