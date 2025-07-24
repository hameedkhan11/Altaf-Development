// common/components/Hero.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HeroBackground } from './HeroBackground';
import { Breadcrumb } from './Breadcrumb';
import { HeroProps } from '@/lib/types';
import { ScrollIndicator } from './ScrollIndicator';
import { HeroImage } from '@/lib/hero/types';
import { AnimatedH1, AnimatedP } from '../ui/text-animations';

// Extended HeroProps interface
interface ExtendedHeroProps extends HeroProps {
  heroImage?: HeroImage | null; // New prop for Sanity data
  pageSlug?: string;
  showHeroButtons?: boolean;
  isHomePage?: boolean;
  children?: React.ReactNode;
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

  // Prioritize Sanity data, with fallbacks to props
  const displayHeight = heroImage?.heightSettings?.height ?? height;
  const displayTitle = heroImage?.heroText?.hasText ? heroImage.heroText.headline : title;
  const displaySubtitle = heroImage?.heroText?.hasText ? heroImage.heroText.subheadline : subtitle;
  // Use the cloudinaryPublicId from Sanity, or fall back to the backgroundSrc prop
  const finalBackgroundSrc = heroImage?.cloudinaryPublicId ?? backgroundSrc;

  const getHeightClass = () => {
    // This switch now uses the determined height (from Sanity or props)
    switch (displayHeight) {
      case 'screen':
        return 'h-screen min-h-screen';
      case 'half':
        return 'h-[50vh] min-h-[400px]';
      case 'three-quarter':
        return 'h-[75vh] min-h-[600px]';
      case 'auto':
        return 'min-h-[60vh]';
      // Note: 'custom' height would be handled via inline styles if needed
      default:
        return 'h-screen min-h-screen';
    }
  };

  const getContentAlignmentClass = () => {
    if (heroImage?.heroText?.hasText && heroImage.heroText.textPosition) {
      switch (heroImage.heroText.textPosition) {
        case 'center': return 'items-center justify-center text-center';
        case 'left': return 'items-center justify-start text-left';
        case 'right': return 'items-center justify-end text-right';
        case 'top-center': return 'items-start justify-center text-center pt-20';
        case 'bottom-center': return 'items-end justify-center text-center pb-20';
        default: return 'items-center justify-center text-center';
      }
    }
    switch (contentAlignment) {
      case 'center': return 'items-center justify-center text-center';
      case 'right': return 'items-center justify-end text-right';
      case 'left': default: return 'items-center justify-start text-left';
    }
  };

  return (
    <section
      ref={heroRef}
      className={`relative ${getHeightClass()} overflow-hidden flex flex-col justify-center items-center`}
      aria-label={ariaLabel}
    >
      <HeroBackground
        heroImage={heroImage}
        type={backgroundType}
        src={finalBackgroundSrc} // Pass the final determined source
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
          {displayTitle && (
            <AnimatedH1 className={`text-4xl sm:text-5xl ${isHomePage ? 'lg:text-6xl' : ''} text-white leading-tight`}>
              {displayTitle}
            </AnimatedH1>
          )}
          {displaySubtitle && (
            <AnimatedP className="text-lg sm:text-xl text-gray-50 max-w-3xl">
              {displaySubtitle}
            </AnimatedP>
          )}

          {children && <motion.div>{children}</motion.div>}
        </div>
      </motion.div>

      {showScrollIndicator && <ScrollIndicator />}
    </section>
  );
};