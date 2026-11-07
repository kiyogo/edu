import { useState, useEffect, useRef, useCallback } from 'react';
import { MasterCinematicCanvas } from './components/MasterCinematicCanvas';
import { CinematicStoryOverlay } from './components/CinematicStoryOverlay';
import { CinematicHUD } from './components/CinematicHUD';
import { ambientAudio } from './audio/ambientAudio';
import './styles/cinematic.css';

export default function App() {
  const [renderedProgress, setRenderedProgress] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const lastProgressRef = useRef<number>(0);
  const rAFRef = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isAutoPlayingRef = useRef<boolean>(false);

  isAutoPlayingRef.current = isAutoPlaying;

  // Native scroll listener to update target progress strictly and reversibly
  const updateScrollProgress = useCallback(() => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    const rawProgress = scrollY / maxScroll;
    targetProgressRef.current = Math.max(0, Math.min(1, rawProgress));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, [updateScrollProgress]);

  // RequestAnimationFrame continuous scrubbing loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Handle auto-play tour mode if activated
      if (isAutoPlayingRef.current && maxScroll > 0) {
        const autoSpeed = 1.0 / 75.0; // 75 seconds for a complete, luxurious expanded tour
        targetProgressRef.current += autoSpeed * dt;
        if (targetProgressRef.current > 1.0) {
          targetProgressRef.current = 0.0;
        }
        window.scrollTo(0, targetProgressRef.current * maxScroll);
      }

      // Smooth damped lerp for cinematic camera momentum
      const lerpFactor = 0.12;
      currentProgressRef.current +=
        (targetProgressRef.current - currentProgressRef.current) * lerpFactor;

      // Compute scrub velocity for audio modulation
      const vel = (currentProgressRef.current - lastProgressRef.current) / (dt || 0.016);
      lastProgressRef.current = currentProgressRef.current;
      ambientAudio.updateVelocity(vel);

      // Push progress to render state
      const p = Math.max(0, Math.min(1, currentProgressRef.current));
      setRenderedProgress(p);

      rAFRef.current = requestAnimationFrame(loop);
    };

    rAFRef.current = requestAnimationFrame(loop);

    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, []);

  // Handle direct scrub jump (from HUD timeline or Act bookmark buttons)
  const handleScrubTo = useCallback((targetP: number) => {
    const clamped = Math.max(0, Math.min(1, targetP));
    targetProgressRef.current = clamped;
    currentProgressRef.current = clamped;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll > 0) {
      window.scrollTo({
        top: clamped * maxScroll,
        behavior: 'instant' as ScrollBehavior,
      });
    }
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsAutoPlaying((prev) => !prev);
      } else if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
        e.preventDefault();
        handleScrubTo(targetProgressRef.current + 0.03);
      } else if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') {
        e.preventDefault();
        handleScrubTo(targetProgressRef.current - 0.03);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleScrubTo]);

  return (
    <div className="cinematic-scroll-container">
      {/* 
        Single Continuous Scroll Track:
        2400vh total height creates a long, continuous, luxurious film experience.
        No scroll-snap, no fragmented sections.
      */}
      <div
        ref={trackRef}
        className="cinematic-scroll-track"
        style={{ height: '4800vh' }}
      >
        {/* 
          Single Fullscreen Sticky Viewport:
          Contains the persistent real-time Three.js WebGL canvas and synchronized DOM story layers.
        */}
        <div className="cinematic-viewport-sticky">
          {/* Layer 1: Real-Time Persistent Three.js WebGL 3D World */}
          <MasterCinematicCanvas progress={renderedProgress} />

          {/* Layer 2: Subtle Film Grain, Vignette & Cyber Laser Scanline */}
          <div className="cinematic-grain-overlay" />
          <div className="cinematic-vignette" />
          <div className="laser-scanline" />

          {/* Layer 3: Editorial Typographic & Real Product Showcase Overlay */}
          <CinematicStoryOverlay
            progress={renderedProgress}
            onReset={() => handleScrubTo(0)}
            onScrubTo={handleScrubTo}
          />

          {/* Layer 4: Minimalist Apple-Style Cinematic HUD */}
          <CinematicHUD
            progress={renderedProgress}
            onScrubTo={handleScrubTo}
            isAutoPlaying={isAutoPlaying}
            onToggleAutoPlay={() => setIsAutoPlaying((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
}
