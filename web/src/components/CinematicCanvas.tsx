import { useEffect, useRef } from 'react';
import { Cinematic3DEngine } from '../three/Cinematic3DEngine';

interface CinematicCanvasProps {
  progress: number;
  velocity: number;
}

export const CinematicCanvas = ({ progress, velocity }: CinematicCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Cinematic3DEngine | null>(null);

  // Initialize Three.js Engine
  useEffect(() => {
    if (!containerRef.current) return;
    const engine = new Cinematic3DEngine(containerRef.current);
    engineRef.current = engine;

    const handleResize = () => {
      engine.handleResize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      engine.dispose();
      engineRef.current = null;
    };
  }, []);

  // Update Three.js frame strictly with scroll progress & velocity
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.updateProgress(progress, velocity);
    }
  }, [progress, velocity]);

  return (
    <div
      ref={containerRef}
      className="cinematic-webgl-container"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    />
  );
};
