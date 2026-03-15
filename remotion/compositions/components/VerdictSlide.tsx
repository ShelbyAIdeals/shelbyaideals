import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface VerdictSlideProps {
  toolName: string;
  rating: number;
  verdict: string;
  affiliateUrl: string;
  vertical?: boolean;
}

export const VerdictSlide: React.FC<VerdictSlideProps> = ({
  toolName,
  rating,
  verdict,
  affiliateUrl,
  vertical,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Animated rating counter
  const ratingDisplay = interpolate(frame, [20, 60], [0, rating], { extrapolateRight: 'clamp' });
  const ratingScale = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 8, stiffness: 60 } });

  // Stars animation
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starDelay = 30 + i * 8;
      const starOpacity = interpolate(frame, [starDelay, starDelay + 10], [0, 1], { extrapolateRight: 'clamp' });
      const starScale = spring({ frame: Math.max(0, frame - starDelay), fps, config: { damping: 10, stiffness: 120 } });
      const isFilled = i < Math.round(rating);

      stars.push(
        <div
          key={i}
          style={{
            opacity: starOpacity,
            transform: `scale(${starScale})`,
            fontSize: vertical ? 36 : 44,
            color: isFilled ? '#fbbf24' : 'rgba(148,163,184,0.3)',
          }}
        >
          ★
        </div>
      );
    }
    return stars;
  };

  const verdictOpacity = interpolate(frame, [70, 90], [0, 1], { extrapolateRight: 'clamp' });
  const verdictY = interpolate(frame, [70, 90], [30, 0], { extrapolateRight: 'clamp' });

  const ctaOpacity = interpolate(frame, [100, 120], [0, 1], { extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 10, stiffness: 80 } });

  // Pulse animation for CTA
  const ctaPulse = interpolate(
    frame % 60,
    [0, 30, 60],
    [1, 1.03, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn,
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
          marginBottom: 30,
        }}
      >
        Final Verdict
      </div>

      {/* Rating number */}
      <div
        style={{
          transform: `scale(${ratingScale})`,
          fontSize: vertical ? 80 : 110,
          fontWeight: 800,
          color: '#f0f4f8',
          lineHeight: 1,
        }}
      >
        {ratingDisplay.toFixed(1)}
      </div>

      {/* Stars */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          marginTop: 16,
          marginBottom: 30,
        }}
      >
        {renderStars()}
      </div>

      {/* Verdict text */}
      <div
        style={{
          opacity: verdictOpacity,
          transform: `translateY(${verdictY}px)`,
          fontSize: vertical ? 22 : 28,
          color: 'rgba(226,232,240,0.9)',
          textAlign: 'center',
          maxWidth: vertical ? '90%' : '65%',
          lineHeight: 1.5,
          marginBottom: 40,
        }}
      >
        {verdict}
      </div>

      {/* CTA button */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale * ctaPulse})`,
          padding: '18px 50px',
          borderRadius: 14,
          background: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)',
          fontSize: 22,
          fontWeight: 700,
          color: '#0b0e17',
          boxShadow: '0 0 40px rgba(34,211,238,0.2)',
        }}
      >
        Read Full {toolName} Review
      </div>

      {/* URL display */}
      <div
        style={{
          opacity: ctaOpacity,
          marginTop: 16,
          fontSize: 16,
          color: 'rgba(34,211,238,0.5)',
        }}
      >
        shelby-ai.com
      </div>
    </AbsoluteFill>
  );
};
