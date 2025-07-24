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
    <div className="relative">
      {/* Background Image Section */}
      <div className="relative h-screen overflow-hidden">
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
            src="imgi_20_istur_Neo-futuristic_house_with_pool_architecture_by_david_rock_997de75f-5df4-4851-89b3-9ab751d93bbf-min_ubf7zz"
            alt="Modern living room interior"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
        </motion.div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div {...titleAnimation} className="text-center mb-16">
            <AnimatedP className="text-lg md:text-xl text-white/80 mb-4 tracking-wider">
              BUILDING TRUST, DELIVERING EXCELLENCE
            </AnimatedP>
            <AnimatedH2
              wordByWord={true}
              duration={0.8}
              className="text-4xl md:text-5xl text-white font-light tracking-wider"
            >
              Mission & Values
            </AnimatedH2>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto">
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
                  className="text-start text-white group"
                >
                  {/* Icon Container */}
                  <motion.div
                    whileHover={canAnimate ? { scale: 1.1 } : undefined}
                    transition={{ duration: 0.3 }}
                    className="mb-6 flex justify-start"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border-2 border-white/30 rounded-full group-hover:border-white/60 transition-colors duration-300">
                      <Icon className="w-8 h-8 md:w-10 md:h-10" />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl text-white mb-4 tracking-wide">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-white leading-relaxed max-w-xs mx-auto">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVisionSection;