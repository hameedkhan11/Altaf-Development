// components/sections/home/WhyChooseUs.tsx
"use client";

import { motion } from "framer-motion";
import {
  viewportOnce,
  shouldAnimate,
  getPerformanceMode,
  animationMetrics,
  quickFade,
  easingPresets,
} from "@/lib/constants";
import { useEffect } from "react";
import { CldImage } from "next-cloudinary";
import { AnimatedH2, AnimatedP } from "@/components/ui/text-animations";
import StatsSection from "@/components/ui/stats-section";
import AnimatedBackground from "@/components/ui/animated-background";

const MissionVisionSection = () => {
  const performanceMode = getPerformanceMode();
  const canAnimate = shouldAnimate();

  // Performance-optimized animations
  const titleAnimation = canAnimate
    ? {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: viewportOnce,
        transition: {
          duration: performanceMode === "fast" ? 0.8 : 1.0,
          ease: easingPresets.smooth,
        },
      }
    : quickFade;

  useEffect(() => {
    animationMetrics.track("whychoose-section", !canAnimate);
  }, [canAnimate]);

  return (
    <div className="relative">
      {/* Background Image Section */}
      <div className="relative h-[90vh] overflow-hidden">
        <motion.div
          initial={canAnimate ? { scaleX: 0, transformOrigin: "left center" } : { scaleX: 1, transformOrigin: "left center" }}
          whileInView={canAnimate ? { scaleX: 1, transformOrigin: "left center" } : undefined}
          viewport={canAnimate ? { once: true, amount: 0.8, margin: "-30% 0px -30% 0px" } : undefined}
          transition={canAnimate ? {
            duration: performanceMode === "fast" ? 1.2 : 1.6,
            ease: [0.25, 0.1, 0.25, 1] as const,
            delay: 0.1
          } : undefined}
          className="w-full h-full"
        >
          <CldImage
            src="imgi_20_istur_Neo-futuristic_house_with_pool_architecture_by_david_rock_997de75f-5df4-4851-89b3-9ab751d93bbf-min_ubf7zz"
            alt="ALTAF Development Office"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
        </motion.div>
        
        {/* Dark overlay for text readability - appears after animation */}
        <motion.div 
          className="absolute inset-0 bg-black/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ 
            once: true, 
            amount: 0.8,
            margin: "-30% 0px -30% 0px"
          }}
          transition={{ 
            duration: performanceMode === "fast" ? 0.6 : 0.8,
            delay: performanceMode === "fast" ? 1.3 : 1.7 // Appears after curtain animation
          }}
        />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-left px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
          {/* Header Section */}
          <motion.div {...titleAnimation} className="mb-6 sm:mb-8 text-center">
            <AnimatedP className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/70 mb-4">
              Building Trust, Delivering Excellence
            </AnimatedP>
            <AnimatedH2
              wordByWord={true}
              duration={0.6}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-wider leading-tight"
            >
              Mission & Values
            </AnimatedH2>
            
            {/* Statistics Section with Counter Animation */}
            <StatsSection />
          </motion.div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <AnimatedBackground />
    </div>
  );
};

export default MissionVisionSection;