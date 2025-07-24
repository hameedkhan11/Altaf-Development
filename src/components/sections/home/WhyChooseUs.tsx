// components/sections/home/WhyChooseUs.tsx
"use client";

import { motion } from "framer-motion";
import {
  shouldAnimate,
  animationMetrics,
} from "@/lib/constants";
import { useEffect, useRef, useState } from "react";
import { CldImage } from "next-cloudinary";
import { AnimatedH2, AnimatedP } from "@/components/ui/text-animations";
import StatsSection from "@/components/ui/stats-section";
import AnimatedBackground from "@/components/ui/animated-background";
import { useScrollAnimation } from "@/hooks/use-linus";

const WhyChoose = () => {
  const canAnimate = shouldAnimate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallaxValues, setParallaxValues] = useState({
    background: 0,
    content: 0,
  });

  // Single Lenis parallax handler - clean and performant
  useScrollAnimation(() => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Only calculate when element is in viewport
    if (rect.bottom < 0 || rect.top > windowHeight) return;
    
    // Simple progress calculation
    const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
    const clampedProgress = Math.max(0, Math.min(1, progress));
    
    // Minimal parallax values
    const backgroundOffset = clampedProgress * 80; // Subtle background movement
    const contentOffset = clampedProgress * -20; // Gentle content counter-movement
    
    setParallaxValues({
      background: backgroundOffset,
      content: contentOffset,
    });
  });

  useEffect(() => {
    animationMetrics.track("whychoose-section", !canAnimate);
  }, [canAnimate]);

  return (
    <div className="relative" ref={containerRef}>
      {/* Background Image Section */}
      <div className="relative h-[50vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 w-full h-[110%] -top-[5%] will-change-transform"
          style={{
            transform: `translate3d(0, ${parallaxValues.background}px, 0)`,
          }}
        >
          <CldImage
            src="imgi_20_istur_Neo-futuristic_house_with_pool_architecture_by_david_rock_997de75f-5df4-4851-89b3-9ab751d93bbf-min_ubf7zz"
            alt="ALTAF Development Office"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Curtain Effect - Opens from both sides */}
        <motion.div
          className="absolute inset-0 w-full h-full bg-white z-10"
          initial={{ clipPath: "inset(0 50% 0 0)" }}
          whileInView={{ clipPath: "inset(0 100% 0 0)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1.7,
            delay: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />

        {/* Second curtain for dual-side effect */}
        <motion.div
          className="absolute inset-0 w-full h-full bg-white z-10"
          initial={{ clipPath: "inset(0 0 0 50%)" }}
          whileInView={{ clipPath: "inset(0 0 0 100%)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1.7,
            delay: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />

        {/* Content Container with Subtle Parallax */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center items-center text-left px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 z-20 will-change-transform"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            delay: 1.7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{
            transform: `translate3d(0, ${parallaxValues.content}px, 0)`,
          }}
        >
          {/* Header Section */}
          <div className="sm:mb-8 text-center">
            <AnimatedP className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/70">
              Why choose us?
            </AnimatedP>
            <AnimatedH2
              wordByWord={true}
              duration={0.6}
              className="mt-12 text-lg sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-wider leading-tight"
            >
              Why Choose ALTAF DEVELOPMENT?
            </AnimatedH2>

            {/* Statistics Section */}
            <StatsSection />
          </div>
        </motion.div>
      </div>

      {/* Animated Background Elements */}
      <AnimatedBackground />
    </div>
  );
};

export default WhyChoose;