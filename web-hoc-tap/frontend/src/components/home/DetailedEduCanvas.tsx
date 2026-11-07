'use client';

import React, { useEffect, useRef } from 'react';

// Setup high-DPI sharp canvas
function setupCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.scale(dpr, dpr);
  }
  return ctx;
}

// ============================================================================
// LEFT CANVAS: Cute Smart Book & Smiling Pencil (Clean, Minimalist & Symmetrical)
// ============================================================================
export const SimpleQuizCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, 320, 220);
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      ctx.clearRect(0, 0, 320, 220);
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // --- Floating Smart Book (Pastel Cyan / Blue) ---
      const bookBob = Math.sin(t) * 4;
      const bx = 110;
      const by = 55 + bookBob;

      ctx.save();
      // Book Cover (Thick rounded rectangle - sắc nét, không viền mờ)
      ctx.fillStyle = '#0ea5e9';
      ctx.beginPath();
      ctx.roundRect(bx, by, 76, 92, 10);
      ctx.fill();

      // White Pages edge on the right
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.roundRect(bx + 62, by + 4, 10, 84, [0, 4, 4, 0]);
      ctx.fill();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner Book Cover Plate
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.roundRect(bx + 6, by + 6, 54, 80, 6);
      ctx.fill();

      // Cute Smiley Face on Book! (Matching trophy style)
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(bx + 24, by + 36, 3.5, 0, Math.PI * 2);
      ctx.arc(bx + 42, by + 36, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Smile
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(bx + 33, by + 44, 5, 0.1, Math.PI - 0.1);
      ctx.stroke();

      // Blush
      ctx.fillStyle = '#fb7185';
      ctx.beginPath();
      ctx.arc(bx + 18, by + 42, 3, 0, Math.PI * 2);
      ctx.arc(bx + 48, by + 42, 3, 0, Math.PI * 2);
      ctx.fill();

      // Cute Bookmark ribbon hanging from bottom
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.moveTo(bx + 28, by + 92);
      ctx.lineTo(bx + 38, by + 92);
      ctx.lineTo(bx + 38, by + 108);
      ctx.lineTo(bx + 33, by + 103);
      ctx.lineTo(bx + 28, by + 108);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // --- Cute Smiling Pencil Companion (Left of Book) ---
      const pencilBob = Math.sin(t * 1.2 + 1) * 5;
      const px = 50;
      const py = 75 + pencilBob;

      ctx.save();
      ctx.translate(px + 14, py + 35);
      ctx.rotate(-0.15 + Math.sin(t) * 0.05);
      ctx.translate(-(px + 14), -(py + 35));

      // Pencil Body (Warm Yellow)
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.roundRect(px, py + 16, 28, 48, 4);
      ctx.fill();

      // Eraser (Pink) at top
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.roundRect(px, py + 4, 28, 12, [6, 6, 0, 0]);
      ctx.fill();

      // Metal band between eraser & body
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(px, py + 14, 28, 4);

      // Wood Cone sharpened tip at bottom
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.moveTo(px, py + 64);
      ctx.lineTo(px + 28, py + 64);
      ctx.lineTo(px + 14, py + 78);
      ctx.closePath();
      ctx.fill();

      // Graphite Tip
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.moveTo(px + 10, py + 74);
      ctx.lineTo(px + 18, py + 74);
      ctx.lineTo(px + 14, py + 78);
      ctx.closePath();
      ctx.fill();

      // Cute Pencil Face
      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.arc(px + 9, py + 34, 2.5, 0, Math.PI * 2);
      ctx.arc(px + 19, py + 34, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(px + 14, py + 40, 3.5, 0.1, Math.PI - 0.1);
      ctx.stroke();

      // Blush
      ctx.fillStyle = '#fb7185';
      ctx.beginPath();
      ctx.arc(px + 5, py + 38, 2, 0, Math.PI * 2);
      ctx.arc(px + 23, py + 38, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // --- Pill Badge at Top Left (Symmetrical to 10.0 ĐIỂM on the right) ---
      ctx.save();
      const bY = 25 + Math.sin(t * 0.8) * 3;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(65, bY, 110, 28, 14);
      ctx.fill();
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('✨ ĐIỂM A+', 92, bY + 18);
      ctx.restore();

      // --- Subtle Floating Cyan Dots ---
      const dots = [
        { x: 210, y: 55, r: 4 },
        { x: 235, y: 135, r: 3 },
        { x: 45, y: 155, r: 3.5 },
      ];
      dots.forEach((d, idx) => {
        const floatY = d.y + Math.sin(t + idx) * 4;
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(d.x, floatY, d.r + Math.sin(t * 2 + idx) * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className={`w-[320px] h-[220px] max-w-full ${className}`} />;
};

// ============================================================================
// RIGHT CANVAS: Simple, Cute, Clean Golden Trophy & Star Celebration
// ============================================================================
export const SimpleTrophyCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, 320, 220);
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      ctx.clearRect(0, 0, 320, 220);
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // --- Floating Golden Trophy in Center ---
      const trophyBob = Math.sin(t) * 4;
      const tx = 110;
      const ty = 50 + trophyBob;

      ctx.save();
      // Trophy Cup Body (Sắc nét, không viền mờ)
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx + 80, ty);
      ctx.lineTo(tx + 65, ty + 60);
      ctx.quadraticCurveTo(tx + 40, ty + 78, tx + 15, ty + 60);
      ctx.closePath();
      ctx.fill();

      // Trophy Handles
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(tx - 4, ty + 24, 15, Math.PI * 0.5, Math.PI * 1.6);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(tx + 84, ty + 24, 15, Math.PI * 1.4, Math.PI * 0.5);
      ctx.stroke();

      // Trophy Stem
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(tx + 34, ty + 72, 12, 22);

      // Trophy Base
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.roundRect(tx + 16, ty + 92, 48, 16, 4);
      ctx.fill();

      // Cute Smiley Face on Trophy!
      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.arc(tx + 30, ty + 30, 3.5, 0, Math.PI * 2);
      ctx.arc(tx + 50, ty + 30, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(tx + 40, ty + 38, 5, 0.1, Math.PI - 0.1);
      ctx.stroke();

      // Blush
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(tx + 23, ty + 36, 3, 0, Math.PI * 2);
      ctx.arc(tx + 57, ty + 36, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // --- Cute Bouncy Mascot Beside Trophy (Right) ---
      const mascotBob = Math.sin(t * 1.2 + 1) * 5;
      const mx = 205;
      const my = 85 + mascotBob;

      ctx.save();
      // Round Soft Body (Pastel Yellow / Gold)
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(mx + 30, my + 30, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Cute Eyes
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(mx + 22, my + 26, 3.5, 0, Math.PI * 2);
      ctx.arc(mx + 38, my + 26, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Happy curved mouth
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(mx + 30, my + 32, 4.5, 0.1, Math.PI - 0.1);
      ctx.stroke();

      // Blush
      ctx.fillStyle = '#fb7185';
      ctx.beginPath();
      ctx.arc(mx + 16, my + 32, 3, 0, Math.PI * 2);
      ctx.arc(mx + 44, my + 32, 3, 0, Math.PI * 2);
      ctx.fill();

      // Little Star in Hand
      ctx.fillStyle = '#f59e0b';
      ctx.font = '16px sans-serif';
      ctx.fillText('★', mx + 46, my + 18);
      ctx.restore();

      // --- Score Badge at Top Right ---
      ctx.save();
      const bY = 25 + Math.sin(t * 0.8) * 3;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(190, bY, 110, 28, 14);
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('⭐ 10.0 ĐIỂM', 208, bY + 18);
      ctx.restore();

      // --- Subtle Floating Sparkles ---
      const stars = [
        { x: 75, y: 45, r: 4 },
        { x: 55, y: 140, r: 3 },
        { x: 260, y: 155, r: 4 },
      ];
      stars.forEach((s, idx) => {
        const floatY = s.y + Math.sin(t + idx) * 4;
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(s.x, floatY, s.r + Math.sin(t * 2 + idx) * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className={`w-[320px] h-[220px] max-w-full ${className}`} />;
};
