import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import AffiliateDisclosure from './AffiliateDisclosure';
import CTAButton from './CTAButton';
import PricingTable from './PricingTable';
import ProsCons from './ProsCons';
import VerdictBox from './VerdictBox';
import ComparisonTable from './ComparisonTable';
import WinnerBox from './WinnerBox';
import QuickVerdict from './QuickVerdict';
import StarRating from './StarRating';
import ToolCard from './ToolCard';
import ToolImage from './ToolImage';
import ScreenshotGallery from './ScreenshotGallery';
import NewsletterSignup from './NewsletterSignup';
import InlineNewsletterCTA from './InlineNewsletterCTA';

const components = {
  AffiliateDisclosure,
  CTAButton,
  PricingTable,
  ProsCons,
  VerdictBox,
  ComparisonTable,
  WinnerBox,
  QuickVerdict,
  StarRating,
  ToolCard,
  ToolImage,
  ScreenshotGallery,
  NewsletterSignup,
  InlineNewsletterCTA,
  h2: (props: React.ComponentProps<'h2'>) => {
    const id = props.children
      ?.toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return <h2 id={id} {...props} />;
  },
  h3: (props: React.ComponentProps<'h3'>) => {
    const id = props.children
      ?.toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return <h3 id={id} {...props} />;
  },
  table: (props: React.ComponentProps<'table'>) => (
    <div className="overflow-x-auto my-6">
      <table {...props} />
    </div>
  ),
  a: (props: React.ComponentProps<'a'>) => {
    const isExternal = props.href?.startsWith('http');
    if (isExternal) {
      return (
        <a
          {...props}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-accent-400 hover:text-accent-300 underline underline-offset-2"
        />
      );
    }
    return <a {...props} className="text-accent-400 hover:text-accent-300 underline underline-offset-2" />;
  },
};

interface MDXContentProps {
  source: string;
}

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose-article">
      <MDXRemote source={source} components={components} options={{ mdxOptions: { development: false, remarkPlugins: [remarkGfm] }, blockJS: false }} />
    </div>
  );
}
