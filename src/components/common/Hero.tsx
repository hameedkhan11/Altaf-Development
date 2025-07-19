// Updated Hero.tsx with better parallax bounds
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HeroBackground } from './HeroBackground';
import { Breadcrumb } from './Breadcrumb';
import { HeroProps } from '@/lib/types';
import { ScrollIndicator } from './ScrollIndicator';
import { HeroImage } from '@/lib/hero/types';
import { AnimatedH1, AnimatedP } from '../ui/text-animations';

interface ExtendedHeroProps extends HeroProps {
  heroImage?: HeroImage | null;
  pageSlug?: string;
  showHeroButtons?: boolean;
  isHomePage?: boolean;
  enableParallax?: boolean;
  parallaxSpeed?: number;
  children?: React.ReactNode;
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

export const Hero: React.FC<ExtendedHeroProps> = ({
  heroImage,
  title,
  isHomePage,
  subtitle,
  backgroundType,
  backgroundSrc,
  fallbackImage,
  height = 'screen',
  overlay = 'medium',
  contentAlignment = 'center',
  breadcrumbs,
  showScrollIndicator = false,
  enableAnimations = true,
  enableParallax = true,
  parallaxSpeed = 0.5,
  ariaLabel = "Hero section",
  children
}) => {
  const [showContent, setShowContent] = useState(false);
  const [setInitialLoad] = useState(true);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // FIXED: Reduce content parallax for high speeds to prevent issues
  const contentParallaxSpeed = Math.min(parallaxSpeed * 0.3, 0.2);
  const contentY = useTransform(smoothProgress, [0, 1], [0, -50 * contentParallaxSpeed]);

  useEffect(() => {
    const checkInitialScroll = () => {
      const scrollPosition = window.scrollY;
      const isScrolled = scrollPosition > 100;
      
      if (isScrolled) {
        setShowContent(true);
      } else {
        const timer = setTimeout(() => {
          setShowContent(true);
        }, 3500);
        
        return () => clearTimeout(timer);
      }
    };

    checkInitialScroll();
  }, [setInitialLoad]);

  const getHeightClass = () => {
    switch (height) {
      case 'screen':
        return 'h-screen min-h-screen';
      case 'half':
        return 'h-[50vh] min-h-[400px]';
      case 'auto':
        return 'min-h-[60vh]';
      default:
        return 'h-screen min-h-screen';
    }
  };

  const getContentAlignmentClass = () => {
    if (heroImage?.heroText?.hasText && heroImage.heroText.textPosition) {
      switch (heroImage.heroText.textPosition) {
        case 'center':
          return 'items-center justify-center text-center';
        case 'left':
          return 'items-center justify-start text-left';
        case 'right':
          return 'items-center justify-end text-right';
        case 'top-center':
          return 'items-start justify-center text-center pt-20';
        case 'bottom-center':
          return 'items-end justify-center text-center pb-20';
        default:
          return 'items-center justify-center text-center';
      }
    }
    
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

  const displayTitle = heroImage?.heroText?.hasText ? heroImage.heroText.headline : title;
  const displaySubtitle = heroImage?.heroText?.hasText ? heroImage.heroText.subheadline : subtitle;

  const MotionWrapper = enableAnimations ? motion.section : 'section';

  return (
    <MotionWrapper
      ref={heroRef}
      className={`relative ${getHeightClass()} overflow-hidden flex flex-col justify-center items-center hero-container`}
      style={{ backgroundColor: '#1f2937' }} // Fallback background
      variants={enableAnimations ? containerVariants : undefined}
      initial={enableAnimations ? "initial" : undefined}
      animate={enableAnimations ? "animate" : undefined}
      aria-label={ariaLabel}
    >
      <HeroBackground
        heroImage={heroImage} 
        type={backgroundType}
        src={backgroundSrc}
        fallbackImage={fallbackImage}
        overlay={overlay}
        enableParallax={enableParallax}
        parallaxSpeed={parallaxSpeed}
      />

      {breadcrumbs && (
        <Breadcrumb 
          items={breadcrumbs} 
          className="absolute bottom-0 left-4 z-10"
        />
      )}

      <motion.div
        style={enableParallax ? { y: contentY } : undefined}
        className={`relative z-10 h-full flex flex-col px-4 sm:px-6 lg:px-8 ${getContentAlignmentClass()}`}
        initial={enableAnimations ? "hidden" : undefined}
        animate={enableAnimations && showContent ? "visible" : undefined}
      >
        <div className={`w-full flex flex-col items-center justify-center mx-auto mt-8 ${isHomePage ? 'max-w-2xl' : ''}`}>
          {displayTitle && (
            <AnimatedH1
              wordByWord={true}
              duration={0.2}
              className={`text-4xl sm:text-5xl ${isHomePage ? 'lg:text-6xl' : ''} text-white leading-tight`}
            >
              {displayTitle}
            </AnimatedH1>
          )}
          {displaySubtitle && (
            <AnimatedP
              className="text-lg sm:text-xl text-gray-50 max-w-3xl"
            >
              {displaySubtitle}
            </AnimatedP>
          )}

          {children && (
            <motion.div>
              {children}
            </motion.div>
          )}
        </div>
      </motion.div>

      {showScrollIndicator && <ScrollIndicator />}
    </MotionWrapper>
  );
};