import React, { useEffect, useRef, useState } from 'react';
import { MASTER_VIDEO_CONFIG } from '../data/storyboard';

interface MasterFilmScrubberProps {
  progress: number; // 0.000 to 1.000 (continuous smoothed scroll progress)
  onDurationDetected?: (dur: number) => void;
}

export const MasterFilmScrubber: React.FC<MasterFilmScrubberProps> = ({
  progress,
  onDurationDetected,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const durationRef = useRef<number>(MASTER_VIDEO_CONFIG.duration);
  const seekingRef = useRef<boolean>(false);
  const lastTargetTimeRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        durationRef.current = video.duration;
        onDurationDetected?.(video.duration);
      }
      setIsReady(true);
    };

    const handleSeeked = () => {
      seekingRef.current = false;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeked', handleSeeked);

    // Initial preload
    video.currentTime = 0.001;
    video.pause();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [onDurationDetected]);

  // Frame-accurate video seek loop driven by progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const dur = durationRef.current || MASTER_VIDEO_CONFIG.duration;
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const targetTime = clampedProgress * dur;

    // Skip redundant seeks within single-frame delta
    if (Math.abs(targetTime - lastTargetTimeRef.current) < 0.015) {
      return;
    }
    lastTargetTimeRef.current = targetTime;

    // Use hardware fastSeek when available (All-Intra makes seeking instantaneous)
    if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
      try {
        (video as any).fastSeek(targetTime);
        return;
      } catch {
        // Fallback
      }
    }

    if (!seekingRef.current) {
      seekingRef.current = true;
      video.currentTime = targetTime;
    }
  }, [progress]);

  return (
    <div
      className="master-film-viewport"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        background: '#0d1612',
      }}
    >
      {/* The Master Film Player */}
      <video
        ref={videoRef}
        src={MASTER_VIDEO_CONFIG.src}
        className="master-film-player"
        playsInline
        muted
        preload="auto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.8s ease',
          transform: 'scale(1.02)', // eliminates edge bleed
          filter: 'contrast(1.05) brightness(1.02) saturate(1.10)',
        }}
      />

      {/* Cinematic Color Wash & Gradient Grading */}
      <div
        className="master-film-color-wash"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.04) 0%, rgba(49,89,69,0.08) 60%, rgba(13,22,18,0.45) 100%)',
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }}
      />

      {/* Optical Vignette */}
      <div
        className="master-film-vignette"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 55%, rgba(13,22,18,0.35) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* 35mm Analog Film Grain Texture */}
      <div className="cinematic-grain-overlay" />
    </div>
  );
};
