import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface PricingSlideProps {
  toolName: string;
  pricing: string;
  vertical?: boolean;
}

export const PricingSlide: React.FC<PricingSlideProps> = ({ toolName, pricing, vertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [260, 300], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const priceScale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 10, stiffness: 60 } });
  const priceOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        justifyContent: 'center',
        alignItems: 'center',
        padding: vertical ? 60 : 100,
      }}
    >
      {/* Section label */}
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '0.15em',
          color: '#22d3ee',
          textTransform: 'uppercase',
          marginBottom: 20,
        }}
      >
        Pricing
      </div>

      <div
        style={{
          fontSize: vertical ? 28 : 36,
          fontWeight: 600,
          color: 'rgba(148,163,184,0.9)',
          marginBottom: 30,
          textAlign: 'center',
        }}
      >
        What does {toolName} cost?
      </div>

      {/* Big price display */}
      <div
        style={{
          opacity: priceOpacity,
          transform: `scale(${priceScale})`,
          padding: vertical ? '40px 50px' : '50px 80px',
          borderRadius: 24,
          border: '2px solid rgba(34,211,238,0.25)',
          background: 'linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(15,21,32,0.9) 100%)',
        }}
      >
        <div
          style={{
            fontSize: vertical ? 56 : 80,
            fontWeight: 800,
            color: '#f0f4f8',
            textAlign: 'center',
          }}
        >
          {pricing}
        </div>
        <div
          style={{
            fontSize: 20,
            color: 'rgba(148,163,184,0.7)',
            textAlign: 'center',
            marginTop: 10,
          }}
        >
          Starting price
        </div>
      </div>

      {/* Value indicator */}
      <div
        style={{
          marginTop: 40,
          opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: 'clamp' }),
          fontSize: 22,
          color: '#22d3ee',
          fontWeight: 600,
        }}
      >
        See full pricing breakdown at shelby-ai.com
      </div>
    </AbsoluteFill>
  );
};
