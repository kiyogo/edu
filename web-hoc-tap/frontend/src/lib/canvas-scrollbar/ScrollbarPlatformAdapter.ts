/**
 * ScrollbarPlatformAdapter
 * Detects platform capabilities and manages desktop canvas vs mobile native scrollbars.
 */
export class ScrollbarPlatformAdapter {
  private static _isMobile: boolean | null = null;

  /**
   * Strictly determines if the current device is a mobile phone (Android/iOS)
   * where native browser scrollbars MUST be 100% preserved.
   * Desktop touchscreens (e.g. laptops with touch) are NOT treated as mobile.
   */
  public static isMobileDevice(): boolean {
    if (this._isMobile !== null) return this._isMobile;
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }

    // 1. User Agent Client Hints (Chromium modern)
    // @ts-ignore
    if (navigator.userAgentData?.mobile === true) {
      this._isMobile = true;
      return true;
    }

    const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';

    // 2. Mobile phone UA patterns
    const isMobileUA = /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    // 3. Media queries: pointer & hover capabilities
    // Phones have coarse pointer and cannot hover
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const hasHoverCapability = window.matchMedia('(hover: hover)').matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    // Desktop laptops with touchscreen have maxTouchPoints > 0 BUT have hover: hover or pointer: fine
    if (hasHoverCapability || hasFinePointer) {
      this._isMobile = false;
      return false;
    }

    // If it's a mobile UA or touch-only with no hover/fine pointer
    if (isMobileUA || (isCoarsePointer && !hasHoverCapability)) {
      this._isMobile = true;
      return true;
    }

    this._isMobile = false;
    return false;
  }

  /**
   * Checks if Canvas 2D is supported and environment is Desktop.
   */
  public static isCanvasScrollbarSupported(): boolean {
    if (typeof window === 'undefined' || typeof document === 'undefined') return false;
    if (this.isMobileDevice()) return false;

    try {
      const testCanvas = document.createElement('canvas');
      return !!(testCanvas.getContext && testCanvas.getContext('2d'));
    } catch {
      return false;
    }
  }

  /**
   * Adds the class that hides native scrollbars on desktop without changing layout geometry.
   */
  public static enableDesktopCanvasStyles(): void {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('desktop-canvas-scrollbars-active');
    }
  }

  /**
   * Removes the class and restores native scrollbars if engine is disabled or falls back.
   */
  public static disableDesktopCanvasStyles(): void {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('desktop-canvas-scrollbars-active');
    }
  }
}
