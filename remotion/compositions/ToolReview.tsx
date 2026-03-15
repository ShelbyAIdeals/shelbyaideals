import { AbsoluteFill, Sequence, Audio, useVideoConfig } from 'remotion';
import { IntroSlide } from './components/IntroSlide';
import { FeaturesSlide } from './components/FeaturesSlide';
import { PricingSlide } from './components/PricingSlide';
import { ProsConsSlide } from './components/ProsConsSlide';
import { VerdictSlide } from './components/VerdictSlide';

export interface ToolReviewProps {
  toolName: string;
  toolSlug: string;
  tagline: string;
  rating: number;
  bestFor: string;
  pricing: string;
  pros: string[];
  cons: string[];
  verdict: string;
  affiliateUrl: string;
  screenshots: string[];
  voiceoverUrl?: string;
  vertical?: boolean;
}

export const ToolReview: React.FC<ToolReviewProps> = (props) => {
  const { fps } = useVideoConfig();
  const {
    toolName,
    tagline,
    rating,
    bestFor,
    pricing,
    pros,
    cons,
    verdict,
    affiliateUrl,
    voiceoverUrl,
    vertical = false,
  } = props;

  // Timing (in frames) — 60 seconds total at 30fps
  const introStart = 0;
  const introDuration = 5 * fps;        // 0-5s
  const featuresStart = introDuration;
  const featuresDuration = 20 * fps;     // 5-25s
  const pricingStart = featuresStart + featuresDuration;
  const pricingDuration = 10 * fps;      // 25-35s
  const prosConsStart = pricingStart + pricingDuration;
  const prosConsDuration = 12 * fps;     // 35-47s
  const verdictStart = prosConsStart + prosConsDuration;
  const verdictDuration = 13 * fps;      // 47-60s

  const bg = vertical
    ? 'bg-gradient-to-b from-[#0b0e17] via-[#0f1520] to-[#0b0e17]'
    : 'bg-gradient-to-br from-[#0b0e17] via-[#0f1520] to-[#0b0e17]';

  return (
    <AbsoluteFill className={`${bg} text-white font-sans`}>
      {/* Background grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(34,211,238,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow effect */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Intro: tool name + tagline */}
      <Sequence from={introStart} durationInFrames={introDuration}>
        <IntroSlide toolName={toolName} tagline={tagline} vertical={vertical} />
      </Sequence>

      {/* Features: key highlights */}
      <Sequence from={featuresStart} durationInFrames={featuresDuration}>
        <FeaturesSlide
          toolName={toolName}
          bestFor={bestFor}
          pros={pros}
          vertical={vertical}
        />
      </Sequence>

      {/* Pricing */}
      <Sequence from={pricingStart} durationInFrames={pricingDuration}>
        <PricingSlide
          toolName={toolName}
          pricing={pricing}
          vertical={vertical}
        />
      </Sequence>

      {/* Pros & Cons */}
      <Sequence from={prosConsStart} durationInFrames={prosConsDuration}>
        <ProsConsSlide pros={pros} cons={cons} vertical={vertical} />
      </Sequence>

      {/* Final Verdict */}
      <Sequence from={verdictStart} durationInFrames={verdictDuration}>
        <VerdictSlide
          toolName={toolName}
          rating={rating}
          verdict={verdict}
          affiliateUrl={affiliateUrl}
          vertical={vertical}
        />
      </Sequence>

      {/* Voiceover audio */}
      {voiceoverUrl && (
        <Audio src={voiceoverUrl} />
      )}

      {/* Watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: vertical ? 40 : 20,
          right: vertical ? '50%' : 30,
          transform: vertical ? 'translateX(50%)' : 'none',
          fontSize: 14,
          color: 'rgba(34,211,238,0.4)',
          fontWeight: 600,
          letterSpacing: '0.05em',
        }}
      >
        shelby-ai.com
      </div>
    </AbsoluteFill>
  );
};
