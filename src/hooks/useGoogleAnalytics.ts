// src/hooks/useGoogleAnalytics.ts
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, string | number | boolean>
    ) => void;
  }
}

// Google Analytics tracking ID from environment variable
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || 'G-7R6GW0BM3W';

// Simple type for event parameters
interface EventParameters {
  category?: string;
  label?: string;
  value?: number;
  currency?: string;
  [key: string]: string | number | boolean | undefined;
}

// Track page views
export const trackPageView = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters: EventParameters = {}
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Build event parameters, flattening any nested objects
    const eventParams: Record<string, string | number | boolean> = {
      event_category: parameters.category || 'engagement',
      event_label: parameters.label || '',
    };

    // Add value if provided
    if (parameters.value !== undefined) {
      eventParams.value = parameters.value;
    }

    // Add currency if provided
    if (parameters.currency) {
      eventParams.currency = parameters.currency;
    }

    // Add other parameters, but skip nested objects
    Object.entries(parameters).forEach(([key, value]) => {
      if (key !== 'category' && key !== 'label' && key !== 'value' && key !== 'currency') {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          eventParams[key] = value;
        }
      }
    });

    window.gtag('event', eventName, eventParams);
  }
};

// Hook to track route changes - safe for SSR and static generation
export const useGoogleAnalytics = (): void => {
  const pathname = usePathname();
  
  useEffect(() => {
    if (pathname) {
      // Get search params safely on client side only
      const searchParams = typeof window !== 'undefined' ? window.location.search : '';
      const url = pathname + searchParams;
      trackPageView(url);
    }
  }, [pathname]);
};

export default useGoogleAnalytics;