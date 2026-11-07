'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollbarManager } from './ScrollbarManager';

/**
 * CanvasScrollbarProvider
 * Mounts the Canvas Scrollbar Engine into the Next.js React component tree.
 * Automatically triggers rescanning upon route transitions and modal lifecycle events.
 */
export const CanvasScrollbarProvider: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    const manager = ScrollbarManager.getInstance();
    manager.init();

    return () => {
      manager.destroy();
    };
  }, []);

  // When route changes, trigger a quick rescan of new containers
  useEffect(() => {
    const manager = ScrollbarManager.getInstance();
    const timer = setTimeout(() => {
      manager.rescan();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};
