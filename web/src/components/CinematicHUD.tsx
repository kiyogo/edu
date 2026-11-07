import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { ambientAudio } from '../audio/ambientAudio';

interface CinematicHUDProps {
  progress: number; // 0.000 to 1.000
  onScrubTo: (targetProgress: number) => void;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
}

export const CinematicHUD: React.FC<CinematicHUDProps> = ({
  progress,
  onScrubTo,
  isAutoPlaying,
  onToggleAutoPlay,
}) => {
  const [audioActive, setAudioActive] = useState(false);
  const scrubberTrackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Current Act name based on progress
  let currentActTitle = 'HỒI I · KHỞI NGUỒN TRI THỨC';
  if (progress >= 0.25 && progress < 0.60) {
    currentActTitle = 'HỒI II · KHÁM PHÁ KIYOEDU';
  } else if (progress >= 0.60 && progress < 0.80) {
    currentActTitle = 'HỒI III · ĐỒNG HÀNH & KẾT NỐI';
  } else if (progress >= 0.80) {
    currentActTitle = 'HỒI IV · TƯƠNG LAI & KIẾN TẠO';
  }

  const handleAudioToggle = () => {
    const state = ambientAudio.toggle();
    setAudioActive(state);
  };

  const handleScrubberEvent = (clientX: number) => {
    if (!scrubberTrackRef.current) return;
    const rect = scrubberTrackRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const targetP = clickX / rect.width;
    onScrubTo(targetP);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleScrubberEvent(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleScrubberEvent(e.clientX);
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="cinematic-hud"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px clamp(20px, 4vw, 40px)',
        zIndex: 30,
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'auto',
        }}
      >
        {/* Brandmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '9px',
              backgroundColor: '#245b45',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '18px',
              boxShadow: '0 4px 12px rgba(36, 91, 69, 0.3)',
            }}
          >
            K
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#172b23', letterSpacing: '-0.02em' }}>
              Kiyo<span style={{ color: '#245b45' }}>Edu</span>
            </div>
            <div style={{ fontSize: '10px', color: '#688073', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              3D Cinematic Continuous WebGL
            </div>
          </div>
        </div>

        {/* Act Quick-Jump Navigation & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(14px)',
              padding: '4px',
              borderRadius: '9999px',
              border: '1px solid rgba(23, 43, 35, 0.1)',
            }}
          >
            {[
              { label: 'I. Khởi nguồn', target: 0.04 },
              { label: 'II. Khám phá', target: 0.30 },
              { label: 'III. Đồng hành', target: 0.65 },
              { label: 'IV. Tương lai', target: 0.85 },
            ].map((btn, idx) => (
              <button
                key={idx}
                onClick={() => onScrubTo(btn.target)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#172b23',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#edf5f0')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Auto Tour Play/Pause Toggle */}
          <button
            onClick={onToggleAutoPlay}
            title={isAutoPlaying ? 'Tạm dừng chuyến tham quan tự động' : 'Bắt đầu chuyến tham quan điện ảnh tự động'}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: isAutoPlaying ? '#245b45' : 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(23, 43, 35, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isAutoPlaying ? '#ffffff' : '#172b23',
              cursor: 'pointer',
            }}
          >
            {isAutoPlaying ? <Pause size={15} /> : <Play size={15} />}
          </button>

          {/* Sound Toggle & Live Audio Visualizer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(14px)',
              padding: '0 8px 0 2px',
              borderRadius: '9999px',
              border: '1px solid rgba(23, 43, 35, 0.1)',
            }}
          >
            <button
              onClick={handleAudioToggle}
              title={audioActive ? 'Tắt âm thanh môi trường' : 'Bật âm thanh môi trường'}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#172b23',
                cursor: 'pointer',
              }}
            >
              {audioActive ? <Volume2 size={15} color="#059669" /> : <VolumeX size={15} />}
            </button>
            {/* Live Audio Visualizer Bars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '16px' }}>
              <div
                className={audioActive ? 'audio-bar-1' : ''}
                style={{ width: '3px', height: audioActive ? '8px' : '4px', backgroundColor: audioActive ? '#059669' : '#94a3b8', borderRadius: '1px' }}
              />
              <div
                className={audioActive ? 'audio-bar-2' : ''}
                style={{ width: '3px', height: audioActive ? '12px' : '4px', backgroundColor: audioActive ? '#059669' : '#94a3b8', borderRadius: '1px' }}
              />
              <div
                className={audioActive ? 'audio-bar-3' : ''}
                style={{ width: '3px', height: audioActive ? '15px' : '4px', backgroundColor: audioActive ? '#059669' : '#94a3b8', borderRadius: '1px' }}
              />
              <div
                className={audioActive ? 'audio-bar-4' : ''}
                style={{ width: '3px', height: audioActive ? '10px' : '4px', backgroundColor: audioActive ? '#059669' : '#94a3b8', borderRadius: '1px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scrubber & Progress Indicator */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          pointerEvents: 'auto',
          maxWidth: '680px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            fontSize: '11px',
            fontWeight: 800,
            color: '#2e4a3b',
            letterSpacing: '0.06em',
          }}
        >
          <span>{currentActTitle}</span>
          <div style={{ display: 'flex', gap: '12px', color: '#059669', fontSize: '10px', textTransform: 'uppercase' }}>
            <span>CAM_Z: -{(progress * 135).toFixed(1)}m</span>
            <span>·</span>
            <span>60 FPS</span>
            <span>·</span>
            <span>{Math.round(progress * 100)}% TIẾN TRÌNH</span>
          </div>
        </div>

        {/* Scrubber Track */}
        <div
          ref={scrubberTrackRef}
          onMouseDown={handleMouseDown}
          style={{
            width: '100%',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'ew-resize',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '4px',
              backgroundColor: 'rgba(23, 43, 35, 0.15)',
              borderRadius: '2px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Filled Progress */}
            <div
              style={{
                width: `${progress * 100}%`,
                height: '100%',
                backgroundColor: '#059669',
                borderRadius: '2px',
                boxShadow: '0 0 10px rgba(5, 150, 105, 0.5)',
              }}
            />
            {/* Draggable Dot */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: `${progress * 100}%`,
                transform: 'translate(-50%, -50%)',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#059669',
                boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.95), 0 0 12px rgba(5, 150, 105, 0.7)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
