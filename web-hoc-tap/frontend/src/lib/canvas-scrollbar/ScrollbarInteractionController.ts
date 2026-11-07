/**
 * ScrollbarInteractionController
 * Handles all mouse and pointer interactions: dragging thumbs, clicking tracks,
 * hover states, and smooth real-time scroll synchronization without layout or selection interference.
 */

import {
  ScrollbarMetrics,
  ScrollbarGeometryEngine,
} from './ScrollbarGeometryEngine';

export class ScrollbarInteractionController {
  private activeMetricsList: ScrollbarMetrics[] = [];
  private onRequestRender: () => void;

  // Active Drag State
  private isDragging: boolean = false;
  private dragMetrics: ScrollbarMetrics | null = null;
  private dragAxis: 'v' | 'h' | null = null;
  private dragStartPointerPos: number = 0;
  private dragStartScrollPos: number = 0;

  // Hover State
  private hoveredMetrics: ScrollbarMetrics | null = null;
  private hoveredAxis: 'v' | 'h' | null = null;

  constructor(onRequestRender: () => void) {
    this.onRequestRender = onRequestRender;
  }

  /**
   * Updates reference to active metrics list
   */
  public setMetricsList(list: ScrollbarMetrics[]): void {
    this.activeMetricsList = list;
  }

  /**
   * Initializes pointer event listeners
   */
  public init(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('pointerdown', this.handlePointerDown, { capture: true });
    window.addEventListener('pointermove', this.handlePointerMove, { passive: true });
    window.addEventListener('pointerup', this.handlePointerUp, { capture: true });
    window.addEventListener('pointercancel', this.handlePointerUp, { capture: true });
  }

  /**
   * Finds the topmost scrollbar matching the point (x, y)
   */
  private findHit(x: number, y: number): {
    metrics: ScrollbarMetrics;
    axis: 'v' | 'h';
    isThumb: boolean;
  } | null {
    // Reverse iterate so top-most / nested containers take priority over window
    for (let i = this.activeMetricsList.length - 1; i >= 0; i--) {
      const m = this.activeMetricsList[i];
      if (!m.isVisible) continue;

      // 1. Check Vertical
      if (m.hasVertical) {
        // First check thumb hit
        if (ScrollbarGeometryEngine.isPointInRect(x, y, m.vThumbRect)) {
          return { metrics: m, axis: 'v', isThumb: true };
        }
        // Then check track/hitbox hit
        if (ScrollbarGeometryEngine.isPointInRect(x, y, m.vHitboxRect)) {
          return { metrics: m, axis: 'v', isThumb: false };
        }
      }

      // 2. Check Horizontal
      if (m.hasHorizontal) {
        // First check thumb hit
        if (ScrollbarGeometryEngine.isPointInRect(x, y, m.hThumbRect)) {
          return { metrics: m, axis: 'h', isThumb: true };
        }
        // Then check track/hitbox hit
        if (ScrollbarGeometryEngine.isPointInRect(x, y, m.hHitboxRect)) {
          return { metrics: m, axis: 'h', isThumb: false };
        }
      }
    }

    return null;
  }

  private handlePointerDown = (e: PointerEvent): void => {
    if (e.button !== 0) return; // Only primary button

    const hit = this.findHit(e.clientX, e.clientY);
    if (!hit) return;

    // We hit a scrollbar! Prevent default text selection or click stealing
    e.preventDefault();
    e.stopPropagation();

    this.isDragging = true;
    this.dragMetrics = hit.metrics;
    this.dragAxis = hit.axis;

    if (hit.axis === 'v') {
      hit.metrics.vDragging = true;
      this.dragStartPointerPos = e.clientY;

      if (hit.metrics.isWindow) {
        this.dragStartScrollPos = window.scrollY || document.documentElement.scrollTop;
      } else if (hit.metrics.element) {
        this.dragStartScrollPos = hit.metrics.element.scrollTop;
      }

      // If clicked on track (not directly on thumb), jump or page scroll
      if (!hit.isThumb) {
        ScrollbarGeometryEngine.handleTrackClick(hit.metrics, 'v', e.clientY);
        // Refresh start scroll pos after jump so immediate drag is seamless
        if (hit.metrics.isWindow) {
          this.dragStartScrollPos = window.scrollY || document.documentElement.scrollTop;
        } else if (hit.metrics.element) {
          this.dragStartScrollPos = hit.metrics.element.scrollTop;
        }
      }
    } else {
      hit.metrics.hDragging = true;
      this.dragStartPointerPos = e.clientX;

      if (hit.metrics.isWindow) {
        this.dragStartScrollPos = window.scrollX || document.documentElement.scrollLeft;
      } else if (hit.metrics.element) {
        this.dragStartScrollPos = hit.metrics.element.scrollLeft;
      }

      if (!hit.isThumb) {
        ScrollbarGeometryEngine.handleTrackClick(hit.metrics, 'h', e.clientX);
        if (hit.metrics.isWindow) {
          this.dragStartScrollPos = window.scrollX || document.documentElement.scrollLeft;
        } else if (hit.metrics.element) {
          this.dragStartScrollPos = hit.metrics.element.scrollLeft;
        }
      }
    }

    document.body.style.userSelect = 'none';
    this.onRequestRender();
  };

  private handlePointerMove = (e: PointerEvent): void => {
    // If currently dragging
    if (this.isDragging && this.dragMetrics && this.dragAxis) {
      if (this.dragAxis === 'v') {
        ScrollbarGeometryEngine.applyVerticalDrag(
          this.dragMetrics,
          this.dragStartScrollPos,
          this.dragStartPointerPos,
          e.clientY
        );
      } else {
        ScrollbarGeometryEngine.applyHorizontalDrag(
          this.dragMetrics,
          this.dragStartScrollPos,
          this.dragStartPointerPos,
          e.clientX
        );
      }
      this.onRequestRender();
      return;
    }

    // Hover state tracking when not dragging
    const hit = this.findHit(e.clientX, e.clientY);
    let changed = false;

    if (hit) {
      if (this.hoveredMetrics !== hit.metrics || this.hoveredAxis !== hit.axis) {
        this.clearHoverState();
        this.hoveredMetrics = hit.metrics;
        this.hoveredAxis = hit.axis;
        if (hit.axis === 'v') hit.metrics.vHovered = true;
        else hit.metrics.hHovered = true;
        changed = true;
      }
    } else {
      if (this.hoveredMetrics !== null) {
        this.clearHoverState();
        changed = true;
      }
    }

    if (changed) {
      this.onRequestRender();
    }
  };

  private handlePointerUp = (e: PointerEvent): void => {
    if (!this.isDragging) return;

    this.isDragging = false;
    if (this.dragMetrics) {
      this.dragMetrics.vDragging = false;
      this.dragMetrics.hDragging = false;
      this.dragMetrics = null;
    }
    this.dragAxis = null;

    document.body.style.userSelect = '';
    this.onRequestRender();
  };

  private clearHoverState(): void {
    if (this.hoveredMetrics) {
      this.hoveredMetrics.vHovered = false;
      this.hoveredMetrics.hHovered = false;
      this.hoveredMetrics = null;
    }
    this.hoveredAxis = null;
  }

  /**
   * Destroys event listeners
   */
  public destroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('pointerdown', this.handlePointerDown, { capture: true });
      window.removeEventListener('pointermove', this.handlePointerMove);
      window.removeEventListener('pointerup', this.handlePointerUp, { capture: true });
      window.removeEventListener('pointercancel', this.handlePointerUp, { capture: true });
    }
    this.clearHoverState();
    this.isDragging = false;
    this.dragMetrics = null;
  }
}
