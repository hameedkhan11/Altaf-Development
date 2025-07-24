/*
eslint-disable @typescript-eslint/no-explicit-any
*/
'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { ReactNode, useRef,  } from 'react';
// import { useScroll } from 'framer-motion';

interface AnimatedTextProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'; // HTML element to render
  threshold?: number;
  triggerOnce?: boolean;
  wordByWord?: boolean;
  wordStagger?: number;
}

export function AnimatedText({ 
  children, 
  delay = 0, 
  duration = 1.2,
  className = '',
  as = 'div', // Default to div for backward compatibility
  triggerOnce = true,
  wordByWord = false,
  wordStagger = 0.3
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: triggerOnce,
    margin: "-100px 0px -100px 0px"
  });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
      filter: 'blur(20px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        filter: {
          duration: duration * 1.2,
        },
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      filter: 'blur(10px)',
      rotateX: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: wordStagger,
        delayChildren: delay,
      },
    },
  };

  // Function to split text into words and wrap each in a span
  const splitTextIntoWords = (text: string) => {
    return text.split(' ').map((word, index) => (
      <motion.span
        key={index}
        variants={wordVariants}
        style={{ 
          willChange: 'transform, filter, opacity',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
          display: 'inline-block',
          marginRight: '0.5rem',
          // Inherit all text properties from parent
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          lineHeight: 'inherit',
          letterSpacing: 'inherit',
          textTransform: 'inherit',
          color: 'inherit'
        }}
      >
        {word}
      </motion.span>
    ));
  };

  // Function to recursively process children and split text nodes
  const processChildren = (children: ReactNode): ReactNode => {
    if (typeof children === 'string') {
      return splitTextIntoWords(children);
    }
    
    if (Array.isArray(children)) {
      return children.map((child) => processChildren(child));
    }
    
    return children;
  };

  // Create motion component with the specified HTML element
  const MotionElement = motion[as as keyof typeof motion] as any;

  if (wordByWord) {
    return (
      <MotionElement
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className={className}
        style={{ 
          willChange: 'transform, filter, opacity',
          backfaceVisibility: 'hidden',
          display: 'block' // Ensure proper block display for headings
        }}
      >
        {processChildren(children)}
      </MotionElement>
    );
  }

  return (
    <MotionElement
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      style={{ 
        willChange: 'transform, filter, opacity',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </MotionElement>
  );
}

// Container for staggered scroll animations
interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  as?: 'div' | 'section' | 'article' | 'header' | 'main' | 'footer' | 'aside' | 'nav'; // Semantic HTML elements
}

export function AnimatedContainer({ 
  children, 
  className = '',
  staggerDelay = 0.2,
  triggerOnce = true,
  as = 'div'
}: AnimatedContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: triggerOnce,
    margin: "-50px 0px -50px 0px"
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const MotionElement = motion[as as keyof typeof motion] as any;

  return (
    <MotionElement
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </MotionElement>
  );
}

// Lenis Scroll Provider Hook
// export function useLenisScroll() {
//   useEffect(() => {
//     let lenis: any;
    
//     const initLenis = async () => {
//       const Lenis = (await import('@studio-freight/lenis')).default;
      
//       lenis = new Lenis({
//         duration: 0.2,
//         easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//         touchMultiplier: 2,
//         syncTouch: false,
//         smoothWheel: true,
//         wheelMultiplier: 0.4
//       });

//       function raf(time: number) {
//         lenis.raf(time);
//         requestAnimationFrame(raf);
//       }

//       requestAnimationFrame(raf);
//     };

//     initLenis();

//     return () => {
//       if (lenis) {
//         lenis.destroy();
//       }
//     };
//   }, []);
// }

// Scroll-triggered fade up animation for hero sections
interface ScrollFadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: 'div' | 'section' | 'article' | 'header' | 'main' | 'footer' | 'aside' | 'nav';
}

export function ScrollFadeUp({ 
  children, 
  className = '',
  delay = 0,
  duration = 0.8,
  as = 'div'
}: ScrollFadeUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    margin: "-100px 0px -100px 0px"
  });

  const MotionElement = motion[as as keyof typeof motion] as any;

  return (
    <MotionElement
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.25, 0.46, 0.45, 0.94] as const 
      }}
      className={className}
    >
      {children}
    </MotionElement>
  );
}

// Preset components for common use cases (maintains your CSS styling)
export const AnimatedH1 = (props: Omit<AnimatedTextProps, 'as'>) => 
  <AnimatedText {...props} as="h1" />;

export const AnimatedH2 = (props: Omit<AnimatedTextProps, 'as'>) => 
  <AnimatedText {...props} as="h2" />;

export const AnimatedH3 = (props: Omit<AnimatedTextProps, 'as'>) => 
  <AnimatedText {...props} as="h3" />;

export const AnimatedH4 = (props: Omit<AnimatedTextProps, 'as'>) => 
  <AnimatedText {...props} as="h4" />;

export const AnimatedH5 = (props: Omit<AnimatedTextProps, 'as'>) => 
  <AnimatedText {...props} as="h5" />;

export const AnimatedH6 = (props: Omit<AnimatedTextProps, 'as'>) => 
  <AnimatedText {...props} as="h6" />;

export const AnimatedP = (props: Omit<AnimatedTextProps, 'as'>) => 
  <AnimatedText {...props} as="p" />;

export const AnimatedSpan = (props: Omit<AnimatedTextProps, 'as'>) => 
  <AnimatedText {...props} as="span" />;