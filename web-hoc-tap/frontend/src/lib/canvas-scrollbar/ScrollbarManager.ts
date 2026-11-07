/**
 * ScrollbarManager
 * Central coordinator and lifecycle manager for the Desktop Canvas Scrollbar Engine.
 */

import { ScrollbarPlatformAdapter } from './ScrollbarPlatformAdapter';
import { ScrollbarMetrics, ScrollbarGeometryEngine } from './ScrollbarGeometryEngine';
import { ScrollContainerRegistry, ContainerTarget } from './ScrollContainerRegistry';
import { CanvasScrollbarRenderer } from './CanvasScrollbarRenderer';
import { ScrollbarInteractionController } from './ScrollbarInteractionController';
import { ScrollbarPerformanceController } from './ScrollbarPerformanceController';

export class ScrollbarManager {
  private static instance: ScrollbarManager | null = null;

  private isInitialized: boolean = false;
  private renderer: CanvasScrollbarRenderer;
  private registry: ScrollContainerRegistry;
  private interaction: ScrollbarInteractionController;
  private performance: ScrollbarPerformanceController;

  private currentMetrics: Map<ContainerTarget, ScrollbarMetrics> = new Map();
  private themeObserver: MutationObserver | null = null;

  private constructor() {
    this.renderer = new CanvasScrollbarRenderer();

    this.performance = new ScrollbarPerformanceController(() => {
      this.performRender();
    });

    this.registry = new ScrollContainerRegistry(
      (target) => {
        this.updateTarget(target);
        this.performance.markDirty();
      },
      () => {
        this.updateAllMetrics();
        this.performance.markDirty();
      }
    );

    this.interaction = new ScrollbarInteractionController(() => {
      this.performance.markDirty();
    });
  }

  /**
   * Singleton accessor
   */
  public static getInstance(): ScrollbarManager {
    if (!this.instance) {
      this.instance = new ScrollbarManager();
    }
    return this.instance;
  }

  /**
   * Initializes the Canvas Scrollbar Engine on Desktop.
   * If mobile device or unsupported, returns false and does nothing (native scrollbars preserved).
   */
  public init(): boolean {
    if (this.isInitialized) return true;
    if (typeof window === 'undefined') return false;

    // 1. Strict platform verification
    if (!ScrollbarPlatformAdapter.isCanvasScrollbarSupported()) {
      return false;
    }

    try {
      // 2. Hide native scrollbars on desktop via CSS overlay class
      ScrollbarPlatformAdapter.enableDesktopCanvasStyles();

      // 3. Initialize renderer
      const rendererOk = this.renderer.init();
      if (!rendererOk) {
        ScrollbarPlatformAdapter.disableDesktopCanvasStyles();
        return false;
      }

      // 4. Initialize interaction controller
      this.interaction.init();

      // 5. Initialize container discovery registry
      this.registry.init();

      // 6. Listen for window resize
      window.addEventListener('resize', this.handleWindowResize, { passive: true });

      // 7. Watch for dark/light theme class changes on html
      this.themeObserver = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.attributeName === 'class') {
            this.performance.markDirty();
            break;
          }
        }
      });
      this.themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });

      this.isInitialized = true;

      // Initial layout measurement and render
      this.updateAllMetrics();
      this.performance.markDirty();

      return true;
    } catch (err) {
      console.error('[CanvasScrollbarEngine] Initialization failed, falling back to native scrollbars:', err);
      this.destroy();
      return false;
    }
  }

  /**
   * Updates metrics for a single container
   */
  private updateTarget(target: ContainerTarget): void {
    const existing = this.currentMetrics.get(target);
    const newMetrics = ScrollbarGeometryEngine.computeMetrics(target, existing);
    if (newMetrics) {
      this.currentMetrics.set(target, newMetrics);
    } else {
      this.currentMetrics.delete(target);
    }
    this.syncMetricsList();
  }

  /**
   * Computes metrics for all registered containers
   */
  private updateAllMetrics(): void {
    const targets = this.registry.getAllTargets();
    const newMap = new Map<ContainerTarget, ScrollbarMetrics>();

    for (const target of targets) {
      const existing = this.currentMetrics.get(target);
      const metrics = ScrollbarGeometryEngine.computeMetrics(target, existing);
      if (metrics) {
        newMap.set(target, metrics);
      }
    }

    this.currentMetrics = newMap;
    this.syncMetricsList();
  }

  /**
   * Helper to convert metrics map to array safely in ES5
   */
  private getMetricsList(): ScrollbarMetrics[] {
    const list: ScrollbarMetrics[] = [];
    this.currentMetrics.forEach((m) => {
      list.push(m);
    });
    return list;
  }

  /**
   * Synchronizes computed metrics array to interaction controller
   */
  private syncMetricsList(): void {
    const list = this.getMetricsList();
    this.interaction.setMetricsList(list);
  }

  /**
   * Performs the actual canvas redraw
   */
  private performRender(): void {
    if (!this.isInitialized) return;
    const list = this.getMetricsList();
    this.renderer.render(list);
  }

  private handleWindowResize = (): void => {
    this.renderer.updateDimensions();
    this.updateAllMetrics();
    this.performance.markDirty();
  };

  /**
   * Forces an immediate rescan of the DOM (e.g. after opening a modal or dynamic view)
   */
  public rescan(): void {
    if (!this.isInitialized) return;
    this.registry.scan();
    this.updateAllMetrics();
    this.performance.markDirty();
  }

  /**
   * Graceful destruction and restoration of native browser scrollbars
   */
  public destroy(): void {
    ScrollbarPlatformAdapter.disableDesktopCanvasStyles();

    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleWindowResize);
    }

    if (this.themeObserver) {
      this.themeObserver.disconnect();
      this.themeObserver = null;
    }

    this.registry.destroy();
    this.interaction.destroy();
    this.performance.destroy();
    this.renderer.destroy();
    this.currentMetrics.clear();

    this.isInitialized = false;
  }
}
