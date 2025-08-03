// components/AnalyticsProvider.tsx
'use client';

import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  useGoogleAnalytics();
  return <>{children}</>;
};

export default AnalyticsProvider;