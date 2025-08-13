// components/AnalyticsTracker.tsx
'use client';

import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

// This component only handles analytics tracking, doesn't wrap children
const AnalyticsTracker = () => {
  useGoogleAnalytics();
  return null; 
};

export default AnalyticsTracker;