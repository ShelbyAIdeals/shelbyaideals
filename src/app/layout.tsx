import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/motion/ScrollProgress';
import MistEffect from '@/components/MistEffect';
import JsonLd from '@/components/JsonLd';
import Providers from '@/components/Providers';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import './globals.css';

/**
 * These three families used to arrive as a single render-blocking
 * <link rel="stylesheet"> to fonts.googleapis.com — a third-party round trip
 * on the critical path of every page. `next/font` subsets them and self-hosts
 * the files from our own origin at build time, so there is no extra
 * connection, no external dependency, and no chance of a font swap arriving
 * after the text has already painted.
 */
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.shelby-ai.com'),
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
  authors: [{ name: 'Frank Shelby' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.shelby-ai.com/',
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
    title: 'ShelbyAI',
    description:
      'Honest AI tool reviews for creators, freelancers, and small teams.',
    images: ['https://www.shelby-ai.com/images/og-thumbnail.png'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    languages: {
      en: 'https://www.shelby-ai.com/',
      es: 'https://www.shelby-ai.com/es/',
      de: 'https://www.shelby-ai.com/de/',
      'x-default': 'https://www.shelby-ai.com/',
    },
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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0KV9M45SQW"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-0KV9M45SQW');`}
        </Script>
        <meta name="impact-site-verification" content="34aa4c6e-1268-44c3-97fb-ef223f74b914" />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* `scrollRestoration="manual"` used to be set here alongside a
            `scrollTo(0,0)`, but nothing ever restored a position afterwards —
            so the browser's own restore was switched off and never replaced.
            Every back-navigation dumped the reader at the top of the article
            they had just been reading. Left on the default `auto`. */}
        <script dangerouslySetInnerHTML={{ __html: 'try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}' }} />
        {/* GA4 click tracking via event delegation. Tracked affiliate links fire
            affiliate_click; plain outbound CTAs (data-outbound, no commercial
            relationship) fire outbound_click so they stay measurable without
            polluting affiliate revenue metrics. */}
        <script dangerouslySetInnerHTML={{ __html: `document.addEventListener("click",function(e){var a=e.target.closest('a[rel*="sponsored"],a[data-outbound]');if(!a)return;var h=a.getAttribute("href")||"",t=a.textContent.trim()||"",s=(a.getAttribute("rel")||"").indexOf("sponsored")>-1;if(typeof gtag==="function"){gtag("event",s?"affiliate_click":"outbound_click",{event_category:s?"affiliate":"outbound",event_label:t,affiliate_url:h,page_location:window.location.href})}})` }} />
        {/* Microsoft Clarity heatmaps — guarded like the Meta and LinkedIn tags
            below. Without the guard this still ran with an empty id and
            requested https://www.clarity.ms/tag/, a 404 on every page view. */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <script dangerouslySetInnerHTML={{ __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}")` }} />
        )}
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
              alt="Meta Pixel"
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
              alt="LinkedIn Insight"
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
            {/* Was wrapped in <PageScaler>, a client component that applied
                `font-size: 90%` to every route except the homepage. Tailwind
                sizes are rem-based so most of the UI ignored it — but anything
                inheriting its size did not, and `.prose-article p` carries no
                size class. The net effect was 14.4px body copy on every review
                and guide, i.e. the reading pages were the smallest type on the
                site, while the marketing homepage stayed at 16px. */}
            <div className="flex-1">{children}</div>
            <Footer />
            <ExitIntentPopup />
          </div>
        </Providers>
      </body>
    </html>
  );
}
