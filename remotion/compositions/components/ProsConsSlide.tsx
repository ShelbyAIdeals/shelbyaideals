import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface ProsConsSlideProps {
  pros: string[];
  cons: string[];
  vertical?: boolean;
}

export const ProsConsSlide: React.FC<ProsConsSlideProps> = ({ pros, cons, vertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [330, 360], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const renderItem = (text: string, index: number, isPro: boolean) => {
    const delay = 20 + index * 15 + (isPro ? 0 : pros.length * 15);
    const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: 'clamp' });
    const x = interpolate(frame, [delay, delay + 15], [isPro ? -40 : 40, 0], { extrapolateRight: 'clamp' });
    const scale = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 12, stiffness: 100 } });

    return (
      <div
        key={`${isPro ? 'pro' : 'con'}-${index}`}
        style={{
          opacity,
          transform: `translateX(${x}px) scale(${scale})`,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 14,
          padding: '14px 20px',
          borderRadius: 12,
          background: isPro ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)',
          border: `1px solid ${isPro ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'}`,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            flexShrink: 0,
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: isPro ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 700,
            color: isPro ? '#22c55e' : '#ef4444',
            marginTop: 2,
          }}
        >
          {isPro ? '+' : '-'}
        </div>
        <div style={{ fontSize: vertical ? 18 : 20, color: '#e2e8f0', lineHeight: 1.4 }}>
          {text}
        </div>
      </div>
    );
  };

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        padding: vertical ? 60 : 100,
        justifyContent: 'center',
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '0.15em',
          color: '#22d3ee',
          textTransform: 'uppercase',
          marginBottom: 40,
        }}
      >
        Pros & Cons
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: vertical ? 'column' : 'row',
          gap: vertical ? 30 : 50,
        }}
      >
        {/* Pros column */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#22c55e',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 26 }}>+</span> What we liked
          </div>
          {pros.slice(0, 4).map((pro, i) => renderItem(pro, i, true))}
        </div>

        {/* Cons column */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#ef4444',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 26 }}>-</span> What could improve
          </div>
          {cons.slice(0, 4).map((con, i) => renderItem(con, i, false))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
