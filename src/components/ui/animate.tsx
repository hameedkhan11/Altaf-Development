// components/Animate.tsx
'use client';

import { m } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimateProps {
  children: ReactNode;
  className?: string;
  type?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'stagger';
  delay?: number;
  duration?: number;
}

const animations = {
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  stagger: {
    animate: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }
};

export function Animate({ 
  children, 
  className = '', 
  type = 'fadeUp',
  delay = 0,
  duration = 0.6
}: AnimateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <m.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={animations[type]}
      transition={{ 
        duration, 
        delay, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}