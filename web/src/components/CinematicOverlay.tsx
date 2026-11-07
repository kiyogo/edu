import React from 'react';
import { CHAPTERS_V2 } from '../data/chapters';

interface CinematicOverlayProps {
  progress: number;
  onReset: () => void;
}

export const CinematicOverlay: React.FC<CinematicOverlayProps> = ({
  progress,
  onReset,
}) => {
  return (
    <div
      className="cinematic-overlay-layer"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 clamp(24px, 7vw, 120px)',
        zIndex: 20,
      }}
    >
      {/* 15 Chapter Typography Cards */}
      {CHAPTERS_V2.map((ch) => {
        const [start, end] = ch.range;
        // Check visibility in active range
        if (progress < start - 0.02 || progress > end + 0.02) return null;

        // Smooth opacity ramp
        const span = end - start;
        const localP = (progress - start) / span;
        let opacity = 1;
        if (localP < 0.22) {
          opacity = Math.max(0, localP / 0.22);
        } else if (localP > 0.78) {
          opacity = Math.max(0, (1 - localP) / 0.22);
        }

        const translateY = (1 - opacity) * 24;

        // Alignment: Alternate left / right for visual balance across chapters
        const isAlternate = parseInt(ch.index, 10) % 2 === 0;
        const isEnding = ch.id === 'future';

        return (
          <div
            key={ch.id}
            className={`cinematic-chapter-card cinematic-chapter-card--${ch.id}`}
            style={{
              position: 'absolute',
              top: isEnding ? 'auto' : '22%',
              bottom: isEnding ? '15%' : 'auto',
              left: isEnding ? '50%' : isAlternate ? 'auto' : 'clamp(24px, 7vw, 100px)',
              right: isEnding ? 'auto' : isAlternate ? 'clamp(24px, 7vw, 100px)' : 'auto',
              transform: isEnding
                ? `translate3d(-50%, ${translateY}px, 0)`
                : `translate3d(0, ${translateY}px, 0)`,
              maxWidth: isEnding ? '720px' : '560px',
              textAlign: isEnding ? 'center' : isAlternate ? 'right' : 'left',
              opacity,
              transition: 'none',
              pointerEvents: isEnding ? 'auto' : 'none',
              willChange: 'transform, opacity',
            }}
          >
            {/* Kicker & Chapter Index */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                color: '#315945',
                textTransform: 'uppercase',
                marginBottom: '14px',
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(8px)',
                padding: '4px 12px',
                borderRadius: '16px',
                border: '1px solid rgba(49, 89, 69, 0.15)',
              }}
            >
              <span>{ch.kicker}</span>
            </div>

            {/* Main Editorial Title */}
            <h2
              style={{
                fontSize: 'clamp(2.4rem, 4.6vw, 4.2rem)',
                lineHeight: 1.08,
                fontWeight: 400,
                letterSpacing: '-0.03em',
                color: '#1a2e22',
                margin: '0 0 14px 0',
                fontFamily: 'serif',
                textShadow: '0 1px 2px rgba(255,255,255,0.8)',
              }}
            >
              {ch.title}{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: '#315945',
                  display: 'inline-block',
                }}
              >
                {ch.highlight}
              </em>
            </h2>

            {/* Explanatory Subtitle */}
            <p
              style={{
                fontSize: 'clamp(14px, 1.4vw, 17px)',
                lineHeight: 1.6,
                color: '#4a6052',
                maxWidth: '480px',
                margin: isEnding || isAlternate ? '0 auto 18px auto' : '0 0 18px 0',
                fontWeight: 400,
                textShadow: '0 1px 2px rgba(255,255,255,0.8)',
              }}
            >
              {ch.subtitle}
            </p>

            {/* Status Badge */}
            {ch.status && (
              <div
                style={{
                  display: 'inline-block',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#1e5235',
                  background: 'rgba(215, 240, 225, 0.85)',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  border: '1px solid rgba(49, 89, 69, 0.2)',
                  marginBottom: '12px',
                }}
              >
                ● {ch.status}
              </div>
            )}

            {/* Ending CTA & Real Links */}
            {isEnding && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '14px',
                  marginTop: '22px',
                  flexWrap: 'wrap',
                }}
              >
                <a
                  href="https://github.com/0kiyo/kiyoedu"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#315945',
                    color: '#ffffff',
                    padding: '12px 26px',
                    borderRadius: '24px',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(49, 89, 69, 0.25)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>Khám phá Nền tảng (GitHub)</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <button
                  onClick={onReset}
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#315945',
                    border: '1px solid rgba(49, 89, 69, 0.3)',
                    padding: '12px 22px',
                    borderRadius: '24px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  ↺ Xem lại từ đầu
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
