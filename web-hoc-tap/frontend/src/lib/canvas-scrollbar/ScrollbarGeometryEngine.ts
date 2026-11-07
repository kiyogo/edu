/**
 * ScrollbarGeometryEngine
 * Performs all geometric calculations, clipping boundary checks,
 * hit testing, and scroll offset translations with subpixel precision.
 */

export interface Rect {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export interface ScrollbarMetrics {
  target: HTMLElement | 'window';
  element: HTMLElement | null; // null for window
  isWindow: boolean;
  
  // Container viewport bounds & clipping
  containerRect: Rect;
  clipRect: Rect;
  isVisible: boolean;

  // Vertical scrollbar metrics
  hasVertical: boolean;
  vTrackRect: Rect;
  vThumbRect: Rect;
  vHitboxRect: Rect;
  vScrollProgress: number;

  // Horizontal scrollbar metrics
  hasHorizontal: boolean;
  hTrackRect: Rect;
  hThumbRect: Rect;
  hHitboxRect: Rect;
  hScrollProgress: number;

  // Interactive states
  vHovered: boolean;
  vDragging: boolean;
  hHovered: boolean;
  hDragging: boolean;
}

export const SCROLLBAR_CONFIG = {
  THUMB_THICKNESS: 6,
  HITBOX_THICKNESS: 12,
  MIN_THUMB_LENGTH: 24,
  CORNER_RADIUS: 3,
  EDGE_OFFSET: 2,
};

export class ScrollbarGeometryEngine {
  /**
   * Helper to construct a Rect from numbers or DOMRect
   */
  public static createRect(left: number, top: number, width: number, height: number): Rect {
    return {
      left,
      top,
      width,
      height,
      right: left + width,
      bottom: top + height,
    };
  }

  /**
   * Computes the intersection of two rectangles
   */
  public static intersectRect(a: Rect, b: Rect): Rect {
    const left = Math.max(a.left, b.left);
    const top = Math.max(a.top, b.top);
    const right = Math.min(a.right, b.right);
    const bottom = Math.min(a.bottom, b.bottom);
    const width = Math.max(0, right - left);
    const height = Math.max(0, bottom - top);
    return { left, top, right, bottom, width, height };
  }

  /**
   * Checks if a point is within a Rect
   */
  public static isPointInRect(x: number, y: number, rect: Rect): boolean {
    return (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom &&
      rect.width > 0 &&
      rect.height > 0
    );
  }

  /**
   * Computes effective clipping rectangle for an element by intersecting
   * with all ancestor elements that have overflow hidden/auto/scroll.
   */
  public static computeClipRect(el: HTMLElement, windowWidth: number, windowHeight: number): Rect {
    const elRect = el.getBoundingClientRect();
    let currentClip: Rect = this.createRect(elRect.left, elRect.top, elRect.width, elRect.height);

    // Initial boundary is the browser viewport
    const viewportRect: Rect = this.createRect(0, 0, windowWidth, windowHeight);
    currentClip = this.intersectRect(currentClip, viewportRect);

    let parent = el.parentElement;
    while (parent && parent !== document.body && parent !== document.documentElement) {
      const style = window.getComputedStyle(parent);
      const isClipping =
        style.overflowY === 'hidden' ||
        style.overflowY === 'auto' ||
        style.overflowY === 'scroll' ||
        style.overflowX === 'hidden' ||
        style.overflowX === 'auto' ||
        style.overflowX === 'scroll' ||
        style.clipPath !== 'none';

      if (isClipping) {
        const pRect = parent.getBoundingClientRect();
        const parentClip = this.createRect(pRect.left, pRect.top, pRect.width, pRect.height);
        currentClip = this.intersectRect(currentClip, parentClip);
        if (currentClip.width <= 0 || currentClip.height <= 0) break;
      }
      parent = parent.parentElement;
    }

    return currentClip;
  }

  /**
   * Computes full scrollbar metrics for either window or a specific HTMLElement
   */
  public static computeMetrics(
    target: HTMLElement | 'window',
    existing?: ScrollbarMetrics
  ): ScrollbarMetrics | null {
    if (typeof window === 'undefined') return null;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let isWindow = target === 'window';
    let el: HTMLElement | null = isWindow ? null : (target as HTMLElement);

    let scrollWidth = 0;
    let scrollHeight = 0;
    let clientWidth = 0;
    let clientHeight = 0;
    let scrollLeft = 0;
    let scrollTop = 0;
    let containerRect: Rect;
    let clipRect: Rect;

    if (isWindow) {
      const docEl = document.documentElement;
      const body = document.body;
      scrollWidth = Math.max(docEl.scrollWidth, body ? body.scrollWidth : 0);
      scrollHeight = Math.max(docEl.scrollHeight, body ? body.scrollHeight : 0);
      clientWidth = docEl.clientWidth;
      clientHeight = docEl.clientHeight;
      scrollLeft = window.scrollX || window.pageXOffset || docEl.scrollLeft;
      scrollTop = window.scrollY || window.pageYOffset || docEl.scrollTop;
      containerRect = this.createRect(0, 0, windowWidth, windowHeight);
      clipRect = containerRect;
    } else {
      if (!el || !el.isConnected) return null;

      // Check if element is displayed
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
        return null;
      }

      scrollWidth = el.scrollWidth;
      scrollHeight = el.scrollHeight;
      clientWidth = el.clientWidth;
      clientHeight = el.clientHeight;
      scrollLeft = el.scrollLeft;
      scrollTop = el.scrollTop;

      const rawRect = el.getBoundingClientRect();
      containerRect = this.createRect(rawRect.left, rawRect.top, rawRect.width, rawRect.height);
      clipRect = this.computeClipRect(el, windowWidth, windowHeight);
    }

    // Determine overflow existence (with 1px threshold for fractional differences)
    const hasVertical = scrollHeight > clientHeight + 1 && clipRect.height > SCROLLBAR_CONFIG.MIN_THUMB_LENGTH;
    const hasHorizontal = scrollWidth > clientWidth + 1 && clipRect.width > SCROLLBAR_CONFIG.MIN_THUMB_LENGTH;

    if (!hasVertical && !hasHorizontal) {
      return null;
    }

    const isVisible = clipRect.width > 0 && clipRect.height > 0;
    const thickness = SCROLLBAR_CONFIG.THUMB_THICKNESS;
    const hitboxThickness = SCROLLBAR_CONFIG.HITBOX_THICKNESS;
    const offset = SCROLLBAR_CONFIG.EDGE_OFFSET;
    const minLength = SCROLLBAR_CONFIG.MIN_THUMB_LENGTH;

    // 1. VERTICAL SCROLLBAR COMPUTATION
    let vTrackRect = this.createRect(0, 0, 0, 0);
    let vThumbRect = this.createRect(0, 0, 0, 0);
    let vHitboxRect = this.createRect(0, 0, 0, 0);
    let vScrollProgress = 0;

    if (hasVertical && isVisible) {
      const trackHeight = Math.max(0, clipRect.height - (hasHorizontal ? thickness + offset : 0));
      const trackY = clipRect.top;
      const trackX = clipRect.right - thickness - offset;

      vTrackRect = this.createRect(trackX, trackY, thickness, trackHeight);

      const maxScrollY = Math.max(0, scrollHeight - clientHeight);
      const visibleRatioY = clientHeight / scrollHeight;
      const thumbHeight = Math.max(minLength, Math.min(trackHeight, trackHeight * visibleRatioY));
      const thumbTravelY = Math.max(0, trackHeight - thumbHeight);

      vScrollProgress = maxScrollY > 0 ? Math.min(1, Math.max(0, scrollTop / maxScrollY)) : 0;
      const thumbY = trackY + vScrollProgress * thumbTravelY;

      vThumbRect = this.createRect(trackX, thumbY, thickness, thumbHeight);

      // Hitbox is slightly wider for easy clicking/dragging
      vHitboxRect = this.createRect(
        trackX - (hitboxThickness - thickness) / 2,
        trackY,
        hitboxThickness,
        trackHeight
      );
    }

    // 2. HORIZONTAL SCROLLBAR COMPUTATION
    let hTrackRect = this.createRect(0, 0, 0, 0);
    let hThumbRect = this.createRect(0, 0, 0, 0);
    let hHitboxRect = this.createRect(0, 0, 0, 0);
    let hScrollProgress = 0;

    if (hasHorizontal && isVisible) {
      const trackWidth = Math.max(0, clipRect.width - (hasVertical ? thickness + offset : 0));
      const trackX = clipRect.left;
      const trackY = clipRect.bottom - thickness - offset;

      hTrackRect = this.createRect(trackX, trackY, trackWidth, thickness);

      const maxScrollX = Math.max(0, scrollWidth - clientWidth);
      const visibleRatioX = clientWidth / scrollWidth;
      const thumbWidth = Math.max(minLength, Math.min(trackWidth, trackWidth * visibleRatioX));
      const thumbTravelX = Math.max(0, trackWidth - thumbWidth);

      hScrollProgress = maxScrollX > 0 ? Math.min(1, Math.max(0, scrollLeft / maxScrollX)) : 0;
      const thumbX = trackX + hScrollProgress * thumbTravelX;

      hThumbRect = this.createRect(thumbX, trackY, thumbWidth, thickness);

      // Hitbox is slightly taller for easy clicking/dragging
      hHitboxRect = this.createRect(
        trackX,
        trackY - (hitboxThickness - thickness) / 2,
        trackWidth,
        hitboxThickness
      );
    }

    return {
      target,
      element: el,
      isWindow,
      containerRect,
      clipRect,
      isVisible,

      hasVertical,
      vTrackRect,
      vThumbRect,
      vHitboxRect,
      vScrollProgress,

      hasHorizontal,
      hTrackRect,
      hThumbRect,
      hHitboxRect,
      hScrollProgress,

      vHovered: existing ? existing.vHovered : false,
      vDragging: existing ? existing.vDragging : false,
      hHovered: existing ? existing.hHovered : false,
      hDragging: existing ? existing.hDragging : false,
    };
  }

  /**
   * Applies vertical scroll position calculated from pointer delta
   */
  public static applyVerticalDrag(
    metrics: ScrollbarMetrics,
    startScrollTop: number,
    startPointerY: number,
    currentPointerY: number
  ): void {
    const deltaY = currentPointerY - startPointerY;
    const trackHeight = metrics.vTrackRect.height;
    const thumbHeight = metrics.vThumbRect.height;
    const thumbTravel = Math.max(0, trackHeight - thumbHeight);

    if (thumbTravel <= 0) return;

    let scrollHeight = 0;
    let clientHeight = 0;

    if (metrics.isWindow) {
      const docEl = document.documentElement;
      const body = document.body;
      scrollHeight = Math.max(docEl.scrollHeight, body ? body.scrollHeight : 0);
      clientHeight = docEl.clientHeight;
    } else if (metrics.element) {
      scrollHeight = metrics.element.scrollHeight;
      clientHeight = metrics.element.clientHeight;
    }

    const maxScroll = Math.max(0, scrollHeight - clientHeight);
    const scrollDelta = (deltaY / thumbTravel) * maxScroll;
    const newScrollTop = Math.max(0, Math.min(maxScroll, startScrollTop + scrollDelta));

    if (metrics.isWindow) {
      window.scrollTo({ top: newScrollTop, behavior: 'auto' });
    } else if (metrics.element) {
      metrics.element.scrollTop = newScrollTop;
    }
  }

  /**
   * Applies horizontal scroll position calculated from pointer delta
   */
  public static applyHorizontalDrag(
    metrics: ScrollbarMetrics,
    startScrollLeft: number,
    startPointerX: number,
    currentPointerX: number
  ): void {
    const deltaX = currentPointerX - startPointerX;
    const trackWidth = metrics.hTrackRect.width;
    const thumbWidth = metrics.hThumbRect.width;
    const thumbTravel = Math.max(0, trackWidth - thumbWidth);

    if (thumbTravel <= 0) return;

    let scrollWidth = 0;
    let clientWidth = 0;

    if (metrics.isWindow) {
      const docEl = document.documentElement;
      const body = document.body;
      scrollWidth = Math.max(docEl.scrollWidth, body ? body.scrollWidth : 0);
      clientWidth = docEl.clientWidth;
    } else if (metrics.element) {
      scrollWidth = metrics.element.scrollWidth;
      clientWidth = metrics.element.clientWidth;
    }

    const maxScroll = Math.max(0, scrollWidth - clientWidth);
    const scrollDelta = (deltaX / thumbTravel) * maxScroll;
    const newScrollLeft = Math.max(0, Math.min(maxScroll, startScrollLeft + scrollDelta));

    if (metrics.isWindow) {
      window.scrollTo({ left: newScrollLeft, behavior: 'auto' });
    } else if (metrics.element) {
      metrics.element.scrollLeft = newScrollLeft;
    }
  }

  /**
   * Handles click on track to jump directly or page scroll
   */
  public static handleTrackClick(
    metrics: ScrollbarMetrics,
    axis: 'v' | 'h',
    clickPos: number
  ): void {
    if (axis === 'v') {
      const trackY = metrics.vTrackRect.top;
      const trackHeight = metrics.vTrackRect.height;
      const thumbHeight = metrics.vThumbRect.height;
      const thumbTravel = Math.max(0, trackHeight - thumbHeight);
      if (thumbTravel <= 0) return;

      let scrollHeight = 0;
      let clientHeight = 0;
      if (metrics.isWindow) {
        const docEl = document.documentElement;
        scrollHeight = docEl.scrollHeight;
        clientHeight = docEl.clientHeight;
      } else if (metrics.element) {
        scrollHeight = metrics.element.scrollHeight;
        clientHeight = metrics.element.clientHeight;
      }

      const maxScroll = Math.max(0, scrollHeight - clientHeight);
      const relativeClick = clickPos - trackY - thumbHeight / 2;
      const ratio = Math.max(0, Math.min(1, relativeClick / thumbTravel));
      const targetScroll = ratio * maxScroll;

      if (metrics.isWindow) {
        window.scrollTo({ top: targetScroll, behavior: 'auto' });
      } else if (metrics.element) {
        metrics.element.scrollTop = targetScroll;
      }
    } else {
      const trackX = metrics.hTrackRect.left;
      const trackWidth = metrics.hTrackRect.width;
      const thumbWidth = metrics.hThumbRect.width;
      const thumbTravel = Math.max(0, trackWidth - thumbWidth);
      if (thumbTravel <= 0) return;

      let scrollWidth = 0;
      let clientWidth = 0;
      if (metrics.isWindow) {
        const docEl = document.documentElement;
        scrollWidth = docEl.scrollWidth;
        clientWidth = docEl.clientWidth;
      } else if (metrics.element) {
        scrollWidth = metrics.element.scrollWidth;
        clientWidth = metrics.element.clientWidth;
      }

      const maxScroll = Math.max(0, scrollWidth - clientWidth);
      const relativeClick = clickPos - trackX - thumbWidth / 2;
      const ratio = Math.max(0, Math.min(1, relativeClick / thumbTravel));
      const targetScroll = ratio * maxScroll;

      if (metrics.isWindow) {
        window.scrollTo({ left: targetScroll, behavior: 'auto' });
      } else if (metrics.element) {
        metrics.element.scrollLeft = targetScroll;
      }
    }
  }
}
