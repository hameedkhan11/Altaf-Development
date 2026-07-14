// components/AnalyticsTracker.tsx
'use client';

import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import { useFacebookPixelPageView } from '@/hooks/useFacebookPixel';

// This component only handles analytics tracking, doesn't wrap children
const AnalyticsTracker = () => {
  useGoogleAnalytics();
  useFacebookPixelPageView();
  return null; 
};

export default AnalyticsTracker;