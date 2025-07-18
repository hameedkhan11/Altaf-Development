// components/sections/home/WhyChooseUs.tsx
"use client";

import { motion } from "framer-motion";
import {
  // viewportOnce,
  shouldAnimate,
  getPerformanceMode,
  animationMetrics,
  // quickFade,
  // easingPresets,
} from "@/lib/constants";
import { useEffect } from "react";
import { CldImage } from "next-cloudinary";
import { AnimatedH2, AnimatedP } from "@/components/ui/text-animations";
import StatsSection from "@/components/ui/stats-section";
import AnimatedBackground from "@/components/ui/animated-background";

const WhyChoose = () => {
  const performanceMode = getPerformanceMode();
  const canAnimate = shouldAnimate();

  // Custom viewport configuration for 70-80vh trigger
  // const customViewport = {
  //   once: true,
  //   amount: 0.2, // Trigger when 20% of element is visible
  //   margin: "-200px 0px -200px 0px" // This creates the 70-80vh trigger zone
  // };

  // Performance-optimized animations
  // const titleAnimation = canAnimate
  //   ? {
  //       initial: { opacity: 0, y: 30 },
  //       whileInView: { opacity: 1, y: 0 },
  //       viewport: customViewport,
  //       transition: {
  //         duration: performanceMode === "fast" ? 0.8 : 1.0,
  //         ease: easingPresets.smooth,
  //       },
  //     }
  //   : quickFade;

  useEffect(() => {
    animationMetrics.track("whychoose-section", !canAnimate);
  }, [canAnimate]);

  return (
    <div className="relative">
      {/* Background Image Section */}
      <div className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <CldImage
            src="imgi_20_istur_Neo-futuristic_house_with_pool_architecture_by_david_rock_997de75f-5df4-4851-89b3-9ab751d93bbf-min_ubf7zz"
            alt="ALTAF Development Office"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Curtain Effect - Opens from both sides */}
        <motion.div
          className="absolute inset-0 w-full h-full bg-white z-10"
          initial={{ clipPath: "inset(0 50% 0 0)" }}
          whileInView={{ clipPath: "inset(0 100% 0 0)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1.4,
            delay: 0.8,
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
            duration: 1.4,
            delay: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />

        {/* Content Container */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center items-center text-left px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 z-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: performanceMode === "fast" ? 1.2 : 1.4,
            delay: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {/* Header Section */}
          <div className="mb-6 sm:mb-8 text-center">
            <AnimatedP className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/70 mb-4">
              Why choose us?
            </AnimatedP>
            <AnimatedH2
              wordByWord={true}
              duration={0.6}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-wider leading-tight"
            >
              Why Choose ALTAF DEVELOPMENT?
            </AnimatedH2>

            {/* Statistics Section with Counter Animation */}
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
