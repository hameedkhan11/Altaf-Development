// common/components/Hero.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HeroBackground } from './HeroBackground';
import { Breadcrumb } from './Breadcrumb';
import { HeroProps } from '@/lib/types';
import { ScrollIndicator } from './ScrollIndicator';
import { AnimatedH1, AnimatedP } from '../ui/text-animations';

// Simplified HeroProps interface without Sanity dependencies
interface ExtendedHeroProps extends HeroProps {
  pageSlug?: string;
  showHeroButtons?: boolean;
  isHomePage?: boolean;
  children?: React.ReactNode;
  customHeight?: number; // For custom vh values
  minHeight?: number; // Minimum height in pixels
}

// Content variants for coordinating animations
const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

export const Hero: React.FC<ExtendedHeroProps> = ({
  title,
  isHomePage,
  subtitle,
  backgroundType,
  backgroundSrc,
  fallbackImage,
  height = 'screen',
  customHeight,
  minHeight = 400,
  overlay = 'medium',
  contentAlignment = 'center',
  breadcrumbs,
  showScrollIndicator = false,
  ariaLabel = "Hero section",
  children
}) => {
  const [showContent, setShowContent] = useState(false);
  const heroRef = useRef(null);

  // Parallax for content elements
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const contentY = useTransform(smoothProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const getHeightClass = () => {
    switch (height) {
      case 'screen':
        return 'h-screen min-h-screen';
      case 'half':
        return 'h-[50vh] min-h-[400px]';
      case 'three-quarter':
        return 'h-[70vh] min-h-[560px]';
      case 'auto':
        return 'min-h-[60vh]';
      case 'custom':
        return customHeight 
          ? `min-h-[${minHeight}px]` 
          : 'h-screen min-h-screen';
      default:
        return 'h-screen min-h-screen';
    }
  };

  const getCustomHeightStyle = (): React.CSSProperties | undefined => {
    if (height === 'custom' && customHeight) {
      return {
        height: `${customHeight}vh`,
        minHeight: `${minHeight}px`
      };
    }
    return undefined;
  };

  const getContentAlignmentClass = () => {
    switch (contentAlignment) {
      case 'center': 
        return 'items-center justify-center text-center';
      case 'right': 
        return 'items-center justify-end text-right';
      case 'left': 
      default: 
        return 'items-center justify-start text-left';
    }
  };

  return (
    <section
      ref={heroRef}
      className={`relative ${getHeightClass()} overflow-hidden flex flex-col justify-center items-center`}
      style={getCustomHeightStyle()}
      aria-label={ariaLabel}
    >
      <HeroBackground
        type={backgroundType}
        src={backgroundSrc}
        fallbackImage={fallbackImage}
        overlay={overlay}
      />

      {breadcrumbs && (
        <Breadcrumb items={breadcrumbs} className="absolute bottom-0 left-4 z-10" />
      )}

      <motion.div
        style={{ y: contentY }}
        className={`relative z-10 h-full flex flex-col px-4 sm:px-6 lg:px-8 ${getContentAlignmentClass()}`}
        variants={contentVariants}
        initial="hidden"
        animate={showContent ? "visible" : "hidden"}
      >
        <div className={`w-full flex flex-col items-center justify-center mx-auto mt-8 ${isHomePage ? 'max-w-2xl' : ''}`}>
          {title && (
            <AnimatedH1 className={`text-xl sm:text-2xl md:text-3xl lg:text-5xl ${isHomePage ? 'lg:text-6xl' : ''} text-white leading-tight`}>
              {title}
            </AnimatedH1>
          )}
          {subtitle && (
            <AnimatedP className="text-sm sm:text-lg text-gray-50 max-w-3xl">
              {subtitle}
            </AnimatedP>
          )}

          {children && <motion.div>{children}</motion.div>}
        </div>
      </motion.div>

      {showScrollIndicator && <ScrollIndicator />}
    </section>
  );
};