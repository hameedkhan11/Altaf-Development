// lib/hooks/useLenisScroll.ts
/*
eslint-disable @typescript-eslint/no-explicit-any
*/
"use client";
import { useLenis } from 'lenis/react';
import { useCallback, useEffect } from 'react';

export function useLenisScroll() {
  const lenis = useLenis();

  // Premium smooth scroll to element
  const scrollTo = useCallback((
    target: string | number, 
    options?: { 
      offset?: number; 
      duration?: number;
      easing?: (t: number) => number;
    }
  ) => {
    if (!lenis) return;
    
    lenis.scrollTo(target, {
      offset: options?.offset || 0,
      duration: options?.duration || 2.0,
      easing: options?.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
    });
  }, [lenis]);

  // Ultra smooth scroll to top
  const scrollToTop = useCallback((duration = 2.5) => {
    if (!lenis) return;
    lenis.scrollTo(0, { 
      duration,
      easing: (t) => 1 - Math.pow(1 - t, 4) // Ease-out-quart for premium feel
    });
  }, [lenis]);

  // Smooth scroll to element with premium easing
  const scrollToElement = useCallback((
    selector: string, 
    offset = 0, 
    duration = 2.0
  ) => {
    if (!lenis) return;
    
    const element = document.querySelector(selector) as HTMLElement;
    if (!element) return;
    
    lenis.scrollTo(element, { 
      offset, 
      duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  }, [lenis]);

  // Smooth scroll by pixels
  const scrollBy = useCallback((
    pixels: number, 
    duration = 1.5
  ) => {
    if (!lenis) return;
    
    const currentScroll = lenis.scroll;
    lenis.scrollTo(currentScroll + pixels, { 
      duration,
      easing: (t) => t * t * t // Ease-in-cubic
    });
  }, [lenis]);

  // Control functions
  const stop = useCallback(() => lenis?.stop(), [lenis]);
  const start = useCallback(() => lenis?.start(), [lenis]);
  const destroy = useCallback(() => lenis?.destroy(), [lenis]);

  // Get current scroll progress (0-1)
  const getScrollProgress = useCallback(() => {
    if (!lenis) return 0;
    const { scroll, limit } = lenis;
    return scroll / limit;
  }, [lenis]);

  return {
    lenis,
    scrollTo,
    scrollToTop,
    scrollToElement,
    scrollBy,
    stop,
    start,
    destroy,
    getScrollProgress,
    // Expose scroll values
    currentScroll: lenis?.scroll || 0,
    scrollLimit: lenis?.limit || 0,
    scrollDirection: lenis?.direction || 0,
  };
}

// Hook for scroll-based animations (like parallax)
export function useScrollAnimation(callback: (scroll: number) => void) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const unsubscribe = lenis.on('scroll', (e: any) => {
      callback(e.scroll);
    });

    return () => unsubscribe();
  }, [lenis, callback]);
}

// Hook for scroll progress tracking
export function useScrollProgress(callback: (progress: number) => void) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const unsubscribe = lenis.on('scroll', (e: any) => {
      const progress = e.scroll / e.limit;
      callback(progress);
    });

    return () => unsubscribe();
  }, [lenis, callback]);
}