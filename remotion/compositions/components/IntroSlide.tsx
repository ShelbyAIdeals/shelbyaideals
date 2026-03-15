import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface IntroSlideProps {
  toolName: string;
  tagline: string;
  vertical?: boolean;
}

export const IntroSlide: React.FC<IntroSlideProps> = ({ toolName, tagline, vertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  const taglineOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });
  const taglineY = interpolate(frame, [20, 40], [30, 0], { extrapolateRight: 'clamp' });

  const badgeOpacity = interpolate(frame, [40, 55], [0, 1], { extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 10, stiffness: 100 } });

  // Fade out at end
  const fadeOut = interpolate(frame, [120, 150], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeOut,
        padding: vertical ? 60 : 0,
      }}
    >
      {/* "REVIEW" badge */}
      <div
        style={{
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
          marginBottom: 30,
          padding: '8px 24px',
          borderRadius: 999,
          border: '1px solid rgba(34,211,238,0.3)',
          background: 'rgba(34,211,238,0.08)',
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.15em',
          color: '#22d3ee',
          textTransform: 'uppercase',
        }}
      >
        Honest Review
      </div>

      {/* Tool name */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          fontSize: vertical ? 72 : 96,
          fontWeight: 800,
          color: '#f0f4f8',
          textAlign: 'center',
          lineHeight: 1.1,
          maxWidth: vertical ? '90%' : '80%',
        }}
      >
        {toolName}
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          marginTop: 24,
          fontSize: vertical ? 28 : 32,
          color: 'rgba(148,163,184,0.9)',
          textAlign: 'center',
          maxWidth: vertical ? '85%' : '60%',
        }}
      >
        {tagline}
      </div>

      {/* Decorative line */}
      <div
        style={{
          marginTop: 40,
          width: interpolate(frame, [30, 60], [0, 120], { extrapolateRight: 'clamp' }),
          height: 3,
          borderRadius: 2,
          background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)',
        }}
      />
    </AbsoluteFill>
  );
};
