import React, { useEffect, useRef, useState } from 'react';
import { VIDEO_CONFIG } from '../data/videoConfig';

interface VideoScrubberProps {
  progress: number; // 0.0 to 1.0 (continuous smoothed scroll progress)
  opacity?: number;
  onDurationChange?: (dur: number) => void;
  onTimeUpdate?: (time: number) => void;
  customVideoUrl?: string | null;
}

export const VideoScrubber: React.FC<VideoScrubberProps> = ({
  progress,
  opacity = 1.0,
  onDurationChange,
  onTimeUpdate,
  customVideoUrl,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const durationRef = useRef<number>(VIDEO_CONFIG.duration);
  const seekingRef = useRef<boolean>(false);
  const lastTargetTimeRef = useRef<number>(0);

  const videoSrc = customVideoUrl || VIDEO_CONFIG.src;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        durationRef.current = video.duration;
        onDurationChange?.(video.duration);
      }
      setIsLoaded(true);
    };

    const handleSeeked = () => {
      seekingRef.current = false;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeked', handleSeeked);

    // Initial preload and pause
    video.currentTime = 0.001;
    video.pause();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [videoSrc, onDurationChange]);

  // Scrub video whenever smooth progress updates
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const duration = durationRef.current || VIDEO_CONFIG.duration;
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const targetTime = clampedProgress * duration;

    onTimeUpdate?.(targetTime);

    // Skip redundant seeks if change is under 16ms (1 frame @ 60fps)
    if (Math.abs(targetTime - lastTargetTimeRef.current) < 0.012) {
      return;
    }
    lastTargetTimeRef.current = targetTime;

    // Use fastSeek if available (hardware-accelerated keyframe seek in Chrome/Safari/Edge/Firefox)
    if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
      try {
        (video as any).fastSeek(targetTime);
        return;
      } catch {
        // Fallback to currentTime
      }
    }

    if (!seekingRef.current) {
      seekingRef.current = true;
      video.currentTime = targetTime;
    }
  }, [progress, onTimeUpdate]);

  return (
    <div
      className="video-scrubber-layer"
      style={{
        opacity: isLoaded ? opacity : 0,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        transition: 'opacity 0.6s ease',
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        className="video-scrubber-player"
        playsInline
        muted
        preload="auto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transform: 'scale(1.02)', // eliminates edge bleed
        }}
      />
      {/* Cinematic subtle film grain & lighting wash */}
      <div
        className="video-cinematic-wash"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, rgba(49,89,69,0.08) 70%, rgba(18,36,28,0.2) 100%)',
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
