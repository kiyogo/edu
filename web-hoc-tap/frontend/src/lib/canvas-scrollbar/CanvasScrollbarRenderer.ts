/**
 * CanvasScrollbarRenderer
 * High-performance HTML5 Canvas 2D renderer for all application scrollbars.
 * Handles Retina/High-DPI display scaling, clipping masks, and dynamic light/dark theme adaptation.
 */

import { ScrollbarMetrics, SCROLLBAR_CONFIG } from './ScrollbarGeometryEngine';

export class CanvasScrollbarRenderer {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private dpr: number = 1;
  private currentWidth: number = 0;
  private currentHeight: number = 0;

  /**
   * Initializes the overlay canvas element
   */
  public init(): boolean {
    if (typeof window === 'undefined' || typeof document === 'undefined') return false;

    // Check if canvas already exists
    let existingCanvas = document.getElementById('canvas-scrollbar-overlay') as HTMLCanvasElement;
    if (existingCanvas) {
      this.canvas = existingCanvas;
    } else {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'canvas-scrollbar-overlay';
      this.canvas.setAttribute('aria-hidden', 'true');
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100vw';
      this.canvas.style.height = '100vh';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '999999';
      this.canvas.style.display = 'block';

      document.body.appendChild(this.canvas);
    }

    this.ctx = this.canvas.getContext('2d', { alpha: true });
    if (!this.ctx) return false;

    this.updateDimensions();
    return true;
  }

  /**
   * Synchronizes Canvas dimensions with viewport & Device Pixel Ratio
   */
  public updateDimensions(): boolean {
    if (!this.canvas || !this.ctx || typeof window === 'undefined') return false;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    if (this.currentWidth !== width || this.currentHeight !== height || this.dpr !== dpr) {
      this.currentWidth = width;
      this.currentHeight = height;
      this.dpr = dpr;

      this.canvas.width = Math.round(width * dpr);
      this.canvas.height = Math.round(height * dpr);
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;

      // Scale context coordinate system to match CSS pixels
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
      return true;
    }

    return false;
  }

  /**
   * Helper to draw a rounded rectangle with cross-browser fallback
   */
  private drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    radius: number
  ): void {
    const r = Math.min(radius, w / 2, h / 2);
    if ((ctx as any).roundRect) {
      ctx.beginPath();
      (ctx as any).roundRect(x, y, w, h, r);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
    }
  }

  /**
   * Checks if a point on a background scrollbar is occluded by an open modal/dialog
   */
  private isPointOccluded(x: number, y: number, container: HTMLElement | null): boolean {
    if (typeof document === 'undefined') return false;
    if (!container) return false;

    try {
      const topEl = document.elementFromPoint(x, y);
      if (!topEl) return false;
      // If the top element is inside the container or is the container itself, it's not occluded
      if (container === topEl || container.contains(topEl)) return false;

      // Check if topEl is part of a modal or portal that sits on top
      const modalAncestor = topEl.closest('[role="dialog"], [aria-modal="true"], .fixed, .portal');
      if (modalAncestor && !container.contains(modalAncestor)) {
        return true;
      }
    } catch {}

    return false;
  }

  /**
   * Main render pass for all active scrollbars
   */
  public render(metricsList: ScrollbarMetrics[]): void {
    if (!this.canvas || !this.ctx) return;

    this.updateDimensions();

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.currentWidth, this.currentHeight);

    if (metricsList.length === 0) return;

    const isDark =
      typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark');

    // Color definitions
    const colors = isDark
      ? {
          vTrack: 'rgba(255, 255, 255, 0.04)',
          hTrack: 'rgba(255, 255, 255, 0.04)',
          thumbIdle: 'rgba(148, 163, 184, 0.35)',
          thumbHover: 'rgba(148, 163, 184, 0.65)',
          thumbActive: 'rgba(203, 213, 225, 0.9)',
        }
      : {
          vTrack: 'rgba(0, 0, 0, 0.04)',
          hTrack: 'rgba(0, 0, 0, 0.04)',
          thumbIdle: 'rgba(148, 163, 184, 0.5)',
          thumbHover: 'rgba(100, 116, 139, 0.8)',
          thumbActive: 'rgba(71, 85, 105, 0.95)',
        };

    const cornerRadius = SCROLLBAR_CONFIG.CORNER_RADIUS;

    for (const m of metricsList) {
      if (!m.isVisible) continue;

      // Check occlusion for non-window containers
      if (!m.isWindow && m.element) {
        if (m.hasVertical) {
          const testX = m.vThumbRect.left + m.vThumbRect.width / 2;
          const testY = m.vThumbRect.top + m.vThumbRect.height / 2;
          if (this.isPointOccluded(testX, testY, m.element)) {
            continue;
          }
        }
      }

      ctx.save();

      // Apply clipping mask so scrollbar never bleeds outside valid container boundaries
      ctx.beginPath();
      ctx.rect(m.clipRect.left, m.clipRect.top, m.clipRect.width, m.clipRect.height);
      ctx.clip();

      // 1. RENDER VERTICAL SCROLLBAR
      if (m.hasVertical && m.vThumbRect.height > 0) {
        // Track background on hover or drag
        if (m.vHovered || m.vDragging) {
          ctx.fillStyle = colors.vTrack;
          this.drawRoundedRect(
            ctx,
            m.vTrackRect.left,
            m.vTrackRect.top,
            m.vTrackRect.width,
            m.vTrackRect.height,
            cornerRadius
          );
        }

        // Thumb
        ctx.fillStyle = m.vDragging
          ? colors.thumbActive
          : m.vHovered
          ? colors.thumbHover
          : colors.thumbIdle;

        this.drawRoundedRect(
          ctx,
          m.vThumbRect.left,
          m.vThumbRect.top,
          m.vThumbRect.width,
          m.vThumbRect.height,
          cornerRadius
        );
      }

      // 2. RENDER HORIZONTAL SCROLLBAR
      if (m.hasHorizontal && m.hThumbRect.width > 0) {
        // Track background on hover or drag
        if (m.hHovered || m.hDragging) {
          ctx.fillStyle = colors.hTrack;
          this.drawRoundedRect(
            ctx,
            m.hTrackRect.left,
            m.hTrackRect.top,
            m.hTrackRect.width,
            m.hTrackRect.height,
            cornerRadius
          );
        }

        // Thumb
        ctx.fillStyle = m.hDragging
          ? colors.thumbActive
          : m.hHovered
          ? colors.thumbHover
          : colors.thumbIdle;

        this.drawRoundedRect(
          ctx,
          m.hThumbRect.left,
          m.hThumbRect.top,
          m.hThumbRect.width,
          m.hThumbRect.height,
          cornerRadius
        );
      }

      ctx.restore();
    }
  }

  /**
   * Cleans up canvas from DOM
   */
  public destroy(): void {
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    this.canvas = null;
    this.ctx = null;
  }
}
