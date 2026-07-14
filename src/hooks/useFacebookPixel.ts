// hooks/useFacebookPixel.ts
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type FbEventParams = Record<string, string | number | boolean>;

/**
 * Fire a Meta standard event (Lead, Contact, ViewContent, etc.)
 * Always a single direct call — never loop/spread a string into this.
 */
export const trackFbEvent = (eventName: string, params?: FbEventParams): void => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, params);
  }
};

/**
 * Fire a Meta custom (non-standard) event.
 */
export const trackFbCustomEvent = (eventName: string, params?: FbEventParams): void => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params);
  }
};

/**
 * Tracks PageView on client-side route changes.
 * The base pixel script (FacebookPixel.tsx) already fires PageView once
 * on initial load, so this hook skips the first render and only fires
 * on subsequent pathname changes (SPA navigations via <Link>/router.push).
 */
export const useFacebookPixelPageView = (): void => {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    trackFbEvent("PageView");
  }, [pathname]);
};