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
import { Shield, Monitor, Handshake, User } from "lucide-react";

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

  const cardAnimation = canAnimate
    ? {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: viewportOnce,
      }
    : quickFade;

  useEffect(() => {
    animationMetrics.track("whychoose-section", !canAnimate);
  }, [canAnimate]);

  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description: "Honesty and transparency in every transaction.",
    },
    {
      icon: Monitor,
      title: "Expertise",
      description: "Deep market knowledge to guide informed decisions",
    },
    {
      icon: Handshake,
      title: "Commitment",
      description: "Dedicated to achieving the best results for every client.",
    },
    {
      icon: User,
      title: "Personalized Service",
      description: "We tailor our approach to fit their needs.",
    },
  ];

  return (
    <div className="relative mt-12 sm:mt-16 md:mt-20 lg:mt-24">
      {/* Background Image Section */}
      <div className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-[100vh] min-h-[500px] sm:min-h-[600px] max-h-[1200px] overflow-hidden">
        <motion.div
          initial={canAnimate ? { scale: 1.1 } : { scale: 1 }}
          whileInView={canAnimate ? { scale: 1 } : undefined}
          viewport={canAnimate ? { once: true, amount: 0.3 } : undefined}
          transition={canAnimate ? {
            duration: performanceMode === "fast" ? 1.2 : 1.8,
            ease: easingPresets.smooth,
          } : undefined}
          className="w-full h-full"
        >
          <CldImage
            src="About_us_Hero_cxrska"
            alt="Modern living room interior"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            sizes="100vw"
            priority
            aria-label="Modern living room interior"
          />
        </motion.div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          {/* Header Section */}
          <motion.div {...titleAnimation} className="text-center mb-8 sm:mb-12 md:mb-16">
            <AnimatedP className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-2 sm:mb-3 md:mb-4 tracking-wider">
              BUILDING TRUST, DELIVERING EXCELLENCE
            </AnimatedP>
            <AnimatedH2
              wordByWord={true}
              duration={0.8}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-wider"
            >
              Mission & Values
            </AnimatedH2>
          </motion.div>

          {/* Values Grid */}
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    {...cardAnimation}
                    transition={{
                      duration: performanceMode === "fast" ? 0.6 : 0.8,
                      delay: canAnimate ? index * 0.15 : 0,
                      ease: easingPresets.smooth,
                    }}
                    className="text-start text-white group flex flex-col items-start"
                  >
                    {/* Icon Container */}
                    <motion.div
                      whileHover={canAnimate ? { scale: 1.1 } : undefined}
                      transition={{ duration: 0.3 }}
                      className="mb-4 sm:mb-5 md:mb-6 flex justify-start w-full"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 flex items-center justify-center border-2 border-white/30 rounded-full group-hover:border-white/60 transition-colors duration-300 flex-shrink-0">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10" />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-white mb-2 sm:mb-3 md:mb-4 tracking-wide font-medium">
                      {value.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm md:text-base lg:text-base text-white/90 leading-relaxed max-w-full">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVisionSection;