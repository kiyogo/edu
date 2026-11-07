import React, { useEffect, useRef } from 'react';
import { MasterCinematic3DWorld } from '../three/MasterCinematic3DWorld';

interface MasterCinematicCanvasProps {
  progress: number;
}

export const MasterCinematicCanvas: React.FC<MasterCinematicCanvasProps> = ({ progress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<MasterCinematic3DWorld | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const world = new MasterCinematic3DWorld(containerRef.current);
    worldRef.current = world;

    const onResize = () => {
      world.handleResize();
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      world.dispose();
      worldRef.current = null;
    };
  }, []);

  // Update render state whenever progress changes
  useEffect(() => {
    if (worldRef.current) {
      worldRef.current.renderAtProgress(progress);
    }
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className="cinematic-webgl-container"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};
