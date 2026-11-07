/**
 * ScrollContainerRegistry
 * Discovers, registers, and tracks the lifecycle of all scrollable containers in the DOM,
 * including root window, modals, dropdowns, sidebars, dynamic portals, and tables.
 */

export type ContainerTarget = HTMLElement | 'window';

export class ScrollContainerRegistry {
  private containers: Set<HTMLElement> = new Set();
  private mutationObserver: MutationObserver | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private onContainerChangeCallback: (() => void) | null = null;
  private onScrollCallback: (target: ContainerTarget) => void;
  private scanDebounceTimer: any = null;

  constructor(
    onScroll: (target: ContainerTarget) => void,
    onContainerChange?: () => void
  ) {
    this.onScrollCallback = onScroll;
    this.onContainerChangeCallback = onContainerChange || null;
  }

  /**
   * Initializes DOM scanning, MutationObserver, and ResizeObserver.
   */
  public init(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Listen to global window scrolling
    window.addEventListener('scroll', this.handleWindowScroll, { passive: true });

    // Global capturing scroll listener to catch any scrolling element without needing individual binding
    window.addEventListener('scroll', this.handleCaptureScroll, { passive: true, capture: true });

    // Setup ResizeObserver to watch container size changes
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver((entries) => {
        let hasChanges = false;
        for (const entry of entries) {
          if (entry.target) hasChanges = true;
        }
        if (hasChanges && this.onContainerChangeCallback) {
          this.onContainerChangeCallback();
        }
      });
      // Observe document root
      this.resizeObserver.observe(document.documentElement);
    }

    // Setup MutationObserver to watch dynamic DOM additions (modals, dropdowns, routing)
    if (typeof MutationObserver !== 'undefined') {
      this.mutationObserver = new MutationObserver((mutations) => {
        let needsRescan = false;
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
              needsRescan = true;
              break;
            }
          } else if (mutation.type === 'attributes') {
            const attr = mutation.attributeName;
            if (attr === 'style' || attr === 'class' || attr === 'hidden') {
              needsRescan = true;
              break;
            }
          }
        }

        if (needsRescan) {
          this.scheduleScan();
        }
      });

      this.mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class', 'hidden'],
      });
    }

    // Initial scan of existing DOM elements
    this.scan();
  }

  /**
   * Debounced DOM scan
   */
  public scheduleScan(): void {
    if (this.scanDebounceTimer) clearTimeout(this.scanDebounceTimer);
    this.scanDebounceTimer = setTimeout(() => {
      this.scan();
      this.scanDebounceTimer = null;
    }, 40);
  }

  /**
   * Scans document for all potential scroll containers
   */
  public scan(): void {
    if (typeof document === 'undefined') return;

    // Remove any disconnected elements
    const disconnected: HTMLElement[] = [];
    this.containers.forEach((el) => {
      if (!el.isConnected) {
        disconnected.push(el);
      }
    });
    for (let i = 0; i < disconnected.length; i++) {
      this.unregister(disconnected[i]);
    }

    // Find all elements that might scroll
    // Fast path: query elements with overflow classes or scroll attributes
    const candidateElements = document.querySelectorAll<HTMLElement>(
      '[class*="overflow"], [class*="scroll"], [style*="overflow"], main, section, aside, div, textarea, pre, table'
    );

    for (let i = 0; i < candidateElements.length; i++) {
      const el = candidateElements[i];
      if (this.isScrollableElement(el)) {
        this.register(el);
      }
    }

    if (this.onContainerChangeCallback) {
      this.onContainerChangeCallback();
    }
  }

  /**
   * Determines if an HTMLElement has scrollable overflow
   */
  public isScrollableElement(el: HTMLElement): boolean {
    if (!el || !el.isConnected) return false;
    if (el === document.body || el === document.documentElement) return false;

    // Skip elements with no dimensions
    if (el.clientWidth === 0 && el.clientHeight === 0) return false;

    const style = window.getComputedStyle(el);
    const hasScrollOverflowY = style.overflowY === 'auto' || style.overflowY === 'scroll';
    const hasScrollOverflowX = style.overflowX === 'auto' || style.overflowX === 'scroll';

    if (!hasScrollOverflowY && !hasScrollOverflowX) return false;

    // Check if contents actually overflow
    const overflowsY = el.scrollHeight > el.clientHeight + 1;
    const overflowsX = el.scrollWidth > el.clientWidth + 1;

    return overflowsY || overflowsX;
  }

  /**
   * Registers a scrollable element
   */
  public register(el: HTMLElement): void {
    if (this.containers.has(el)) return;
    this.containers.add(el);

    if (this.resizeObserver) {
      this.resizeObserver.observe(el);
    }

    el.addEventListener('scroll', this.handleElementScroll, { passive: true });
  }

  /**
   * Unregisters an element
   */
  public unregister(el: HTMLElement): void {
    if (!this.containers.has(el)) return;
    this.containers.delete(el);

    if (this.resizeObserver) {
      this.resizeObserver.unobserve(el);
    }

    el.removeEventListener('scroll', this.handleElementScroll);
  }

  /**
   * Returns all currently registered scroll containers (including window)
   */
  public getAllTargets(): ContainerTarget[] {
    const list: ContainerTarget[] = ['window'];
    this.containers.forEach((el) => {
      if (el.isConnected) {
        list.push(el);
      }
    });
    return list;
  }

  private handleWindowScroll = (): void => {
    this.onScrollCallback('window');
  };

  private handleElementScroll = (e: Event): void => {
    const target = e.currentTarget as HTMLElement;
    if (target) {
      this.onScrollCallback(target);
    }
  };

  private handleCaptureScroll = (e: Event): void => {
    const target = e.target as HTMLElement;
    if (target && target !== document as any && target !== window as any) {
      if (!this.containers.has(target) && this.isScrollableElement(target)) {
        this.register(target);
      }
      this.onScrollCallback(target);
    }
  };

  /**
   * Cleans up observers and listeners
   */
  public destroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleWindowScroll);
      window.removeEventListener('scroll', this.handleCaptureScroll, { capture: true });
    }

    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    this.containers.forEach((el) => {
      el.removeEventListener('scroll', this.handleElementScroll);
    });
    this.containers.clear();

    if (this.scanDebounceTimer) {
      clearTimeout(this.scanDebounceTimer);
      this.scanDebounceTimer = null;
    }
  }
}
