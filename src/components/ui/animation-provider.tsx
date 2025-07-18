// components/ui/animation-provider.tsx
'use client';

import { LazyMotion, domAnimation } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimationProviderProps {
  children: ReactNode;
}

export default function AnimationProvider({ children }: AnimationProviderProps) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}