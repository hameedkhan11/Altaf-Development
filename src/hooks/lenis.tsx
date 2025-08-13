// hooks/lenis.tsx
'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect } from 'react';

export default function LenisProvider() {
  useEffect(() => {
    // Prevent default scroll restoration
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05, // Much slower lerp for ultra-smooth feel (0.05-0.08 is ideal)
        duration: 2.0, // Longer duration for more cinematic feel
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.8, // Reduced for more controlled scrolling
        touchMultiplier: 1.5,
        infinite: false,
        autoResize: true,
        prevent: (node) =>
          node.classList.contains('lenis-prevent') ||
          node.getAttribute('data-lenis-prevent') === 'true',
        // Advanced easing for premium feel
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    />
  );
}