// Separate client component for ultra-smooth Lenis
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useCallback } from "react";
import Lenis from "@studio-freight/lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  // Optimized RAF callback
  const raf = useCallback((time: number) => {
    if (lenisRef.current) {
      lenisRef.current.raf(time);
    }
    rafRef.current = requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    // Initialize Lenis with butter-smooth settings
    const lenis = new Lenis({
      // Ultra-smooth duration
      duration: 1.8,
      // Butter-smooth easing curve
      easing: (t) => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      // Fine-tuned multipliers for smoothness
      touchInertiaMultiplier: 0.8,
      touchMultiplier: 1.5,
      wheelMultiplier: 0.8,
      // Prevent infinite scroll
      infinite: false,
      // Enhanced performance
      autoResize: true,
      // Smooth wrapper behavior
      wrapper: window,
      content: document.documentElement,
      // lerp: 0.1,
    });

    lenisRef.current = lenis;

    // Start the animation loop
    rafRef.current = requestAnimationFrame(raf);

    // Handle resize for responsive smoothness
    const handleResize = () => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    // Prevent scroll restoration on page load
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("resize", handleResize);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, [raf]);

  // Expose lenis instance globally for programmatic control
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).lenis = lenisRef.current;
    }
  }, []);

  return <>{children}</>;
}