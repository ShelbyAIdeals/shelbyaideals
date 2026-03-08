import type { Metadata } from 'next';
import SubmitToolForm from './SubmitToolForm';

export const metadata: Metadata = {
  title: 'Submit a Tool',
  description:
    'Suggest an AI tool for us to review. We test every submission with real-world workflows and publish honest, in-depth reviews.',
  openGraph: {
    title: 'Submit a Tool',
    description:
      'Suggest an AI tool for us to review. We test every submission with real-world workflows and publish honest, in-depth reviews.',
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
    title: 'Submit a Tool',
    description:
      'Suggest an AI tool for us to review. We test every submission with real-world workflows and publish honest, in-depth reviews.',
    images: ['https://shelby-ai.com/images/og-thumbnail.png'],
  },
};

export default function SubmitToolPage() {
  return (
    <main className="min-h-screen">
      <div className="container-main pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4">
            Submit a Tool
          </h1>
          <p className="text-lg text-void-300 mb-8 leading-relaxed">
            Know an AI tool we should review? Tell us about it and we'll add it to our testing queue.
          </p>

          <SubmitToolForm />
        </div>
      </div>
    </main>
  );
}
