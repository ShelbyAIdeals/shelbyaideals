import { Composition, registerRoot } from 'remotion';
import { ToolReview, type ToolReviewProps } from './compositions/ToolReview';

const defaultProps: ToolReviewProps = {
  toolName: 'Example Tool',
  toolSlug: 'example',
  tagline: 'The best tool for your workflow',
  rating: 4.2,
  bestFor: 'Content creators',
  pricing: '$19/mo',
  pros: ['Easy to use', 'Great value', 'Fast results'],
  cons: ['Limited free tier'],
  verdict: 'A solid tool that delivers on its promises.',
  affiliateUrl: 'https://www.shelby-ai.com',
  screenshots: [],
  voiceoverUrl: undefined,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ToolReview"
        component={ToolReview}
        durationInFrames={30 * 60} // 60 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultProps}
      />
      <Composition
        id="ToolReviewPinterest"
        component={ToolReview}
        durationInFrames={30 * 45} // 45 seconds at 30fps (shorter for Pinterest)
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ ...defaultProps, vertical: true }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
