import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface FeaturesSlideProps {
  toolName: string;
  bestFor: string;
  pros: string[];
  vertical?: boolean;
}

export const FeaturesSlide: React.FC<FeaturesSlideProps> = ({ toolName, bestFor, pros, vertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [560, 600], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const headerY = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        padding: vertical ? 60 : 100,
        justifyContent: 'center',
      }}
    >
      {/* Section header */}
      <div
        style={{
          transform: `translateY(${headerY}px)`,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '0.15em',
          color: '#22d3ee',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}
      >
        Key Features
      </div>

      <div
        style={{
          fontSize: vertical ? 36 : 44,
          fontWeight: 700,
          color: '#f0f4f8',
          marginBottom: 12,
        }}
      >
        What makes {toolName} stand out
      </div>

      <div
        style={{
          fontSize: vertical ? 20 : 24,
          color: 'rgba(148,163,184,0.8)',
          marginBottom: 50,
        }}
      >
        Best for: {bestFor}
      </div>

      {/* Feature cards */}
      <div
        style={{
          display: 'flex',
          flexDirection: vertical ? 'column' : 'row',
          gap: vertical ? 20 : 30,
          flexWrap: 'wrap',
        }}
      >
        {pros.slice(0, vertical ? 4 : 3).map((pro, i) => {
          const delay = 30 + i * 20;
          const cardOpacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: 'clamp' });
          const cardX = interpolate(frame, [delay, delay + 20], [60, 0], { extrapolateRight: 'clamp' });
          const cardScale = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 12, stiffness: 80 } });

          return (
            <div
              key={i}
              style={{
                opacity: cardOpacity,
                transform: `translateX(${cardX}px) scale(${cardScale})`,
                flex: vertical ? 'none' : 1,
                padding: vertical ? '24px 30px' : 30,
                borderRadius: 16,
                border: '1px solid rgba(34,211,238,0.15)',
                background: 'rgba(15,21,32,0.8)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Number badge */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(34,211,238,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#22d3ee',
                  marginBottom: 16,
                }}
              >
                {i + 1}
              </div>

              <div
                style={{
                  fontSize: vertical ? 20 : 22,
                  fontWeight: 600,
                  color: '#e2e8f0',
                  lineHeight: 1.4,
                }}
              >
                {pro}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
