import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, HardDrive } from 'lucide-react';
import { FILE_TOOLS } from '@/lib/file-tools-data';
import ScrollReveal from '@/components/motion/ScrollReveal';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';
import ExploreMore from '@/components/ExploreMore';
import JsonLd from '@/components/JsonLd';

const PAGE_URL = 'https://www.shelby-ai.com/free-file-tools/';
const PAGE_TITLE = 'Free File Tools That Run in Your Browser';
const PAGE_DESCRIPTION =
  'Four free browser tools for files your OS cannot open — CAD parts, Parquet datasets, crash dumps and multi-gigabyte transfers. No install, no account, no size cap.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: 'website',
    url: PAGE_URL,
    images: [{ url: 'https://www.shelby-ai.com/images/og-thumbnail.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function FreeFileToolsPage() {
  return (
    <main className="min-h-screen">
      <JsonLd
        type="collectionpage"
        data={{
          name: PAGE_TITLE,
          description: PAGE_DESCRIPTION,
          url: PAGE_URL,
        }}
      />
      <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
        <ScrollReveal>
          <nav className="flex items-center gap-2 text-sm text-void-500 mb-8">
            <Link href="/" className="hover:text-signal-400 no-underline transition-colors text-void-500">Home</Link>
            <span>/</span>
            <span className="text-void-300">Free File Tools</span>
          </nav>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-signal-500/15 border border-signal-500/25">
                <HardDrive size={20} className="text-signal-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-void-50 font-heading">
                Free File Tools That Run in Your Browser
              </h1>
            </div>
            <p className="text-lg text-void-300 leading-relaxed">
              Most free online converters work by sending your file to someone else&apos;s server. For a
              holiday photo that is fine. For a client&apos;s CAD part, a customer dataset or a crash dump
              off a production machine, it is a disclosure you probably are not allowed to make.
            </p>
            <p className="mt-4 text-lg text-void-300 leading-relaxed">
              Three of the four below never upload at all — the heavy engines are compiled to WebAssembly
              and run in the tab, so there is no size cap, no queue and no account. The fourth,
              DumpReader, does upload, and says so. None of them pay us a referral fee; they are here
              because they are the tools we reach for.
            </p>
            <p className="mt-4 text-sm text-void-500 leading-relaxed">
              Where a tool claims to be local, you can check it in under a minute: load the page once,
              disconnect the network, then convert anyway. A tool that quietly uploads cannot pass that
              test.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {FILE_TOOLS.map((tool) => (
            <StaggerItem key={tool.name}>
              <div className="card flex flex-col p-6 border border-void-700/50 rounded-xl h-full">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h2 className="text-lg font-bold text-void-50 font-heading">{tool.name}</h2>
                  <span
                    className={`text-xs shrink-0 ${tool.localOnly ? 'text-signal-400' : 'text-void-500'}`}
                  >
                    {tool.localOnly ? 'Nothing uploaded' : 'Uploads, then discards'}
                  </span>
                </div>

                <p className="text-sm text-void-400 leading-relaxed mb-4 flex-1">{tool.summary}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.formats.map((format) => (
                    <span
                      key={format}
                      className="text-xs bg-void-800/80 border border-void-700/50 rounded-full px-2.5 py-0.5 text-void-300"
                    >
                      {format}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 border-t border-void-800/60">
                  <Link
                    href={`/guides/${tool.guideSlug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-signal-400 hover:text-signal-300 no-underline transition-colors"
                  >
                    Read the guide <ArrowRight size={14} />
                  </Link>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-void-400 hover:text-void-200 no-underline transition-colors"
                  >
                    {tool.displayUrl} <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal>
          <p className="mt-10 max-w-3xl text-sm text-void-500 leading-relaxed">
            Each guide covers the limits as well as the workflow — where a browser runs out of memory, what
            an STL to STEP conversion really returns, why a crash dump can name the wrong driver, and when a
            plain cloud link is still the better answer.
          </p>
        </ScrollReveal>

        <ExploreMore variant="static" />
      </div>
    </main>
  );
}
