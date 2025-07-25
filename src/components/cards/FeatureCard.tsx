// components/cards/FeatureCard.tsx
"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import {
  viewportOnce,
  delays,
  shouldAnimate,
  getPerformanceMode,
  easingPresets
} from "@/lib/constants";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  index: number;
  // Optional props for contact info usage
  primary?: string;
  secondary?: string;
  variant?: 'feature' | 'contact';
}

const FeatureCard = ({ 
  title, 
  description, 
  index, 
  primary, 
  secondary, 
  variant = 'feature' 
}: FeatureCardProps) => {
  const performanceMode = getPerformanceMode();
  const canAnimate = shouldAnimate();

  // Performance-optimized feature item animation
  const featureAnimation = canAnimate ? {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: viewportOnce,
    transition: {
      duration: performanceMode === "fast" ? 0.5 : 0.7,
      delay: delays.stagger(index) * 0.1,
      ease: easingPresets.smooth
    }
  } : {
    initial: { opacity: 1, y: 0, scale: 1 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0 }
  };

  // Optimized hover animations
  const itemHoverAnimation = canAnimate ? {
    whileHover: {
      y: -8,
      scale: 1.03,
      transition: { duration: performanceMode === "fast" ? 0.3 : 0.4 }
    }
  } : {};

  // const iconHoverAnimation = canAnimate ? {
  //   whileHover: {
  //     scale: 1.15,
  //     transition: { duration: performanceMode === "fast" ? 0.3 : 0.4 }
  //   }
  // } : {};

  // Render content based on variant
  const renderContent = () => {
    if (variant === 'contact') {
      return (
        <div className="text-center">
          <h3
            id={`feature-${index}-title`}
            className="text-xl sm:text-2xl mb-4 sm:mb-5 text-black"
          >
            {title}
          </h3>
          {primary && (
            <p className=" leading-relaxed font-light text-base sm:text-lg mb-2 text-black">
              {primary}
            </p>
          )}
          {secondary && (
            <p className=" text-white leading-relaxed font-light text-base sm:text-lg mb-2">
              {secondary}
            </p>
          )}
          <p className=" text-white leading-relaxed font-light text-base sm:text-lg">
            {description}
          </p>
        </div>
      );
    }

    // Default feature variant
    return (
      <div className="text-start">
        <h3
          id={`feature-${index}-title`}
          className="text-sm sm:texbase md:text-lg lg:text-xl mb-4 sm:mb-5 leading-tight"
        >
          {title}
        </h3>
        <p className=" leading-relaxed font-light text-sm text-black">
          {description}
        </p>
      </div>
    );
  };

  return (
    <motion.article
      {...featureAnimation}
      {...itemHoverAnimation}
      viewport={viewportOnce}
      className="border-2  rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 w-full max-w-[330px] sm:max-w-[350px]  lg:max-w-[400px] h-80 sm:h-88 lg:h-96 hover:shadow-3xl transition-all duration-500 overflow-hidden"
      role="article"
      aria-labelledby={`feature-${index}-title`}
    >
      {/* Icon */}
      {/* <motion.div 
        className="w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br bg-[rgb(80,18,35)] rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-8 mx-auto shadow-xl"
        {...iconHoverAnimation}
        aria-hidden="true"
      >
        <Icon className="h-8 w-8 sm:h-9 sm:w-9 text-white" />
      </motion.div> */}
      
      {/* Content */}
      {renderContent()}
    </motion.article>
  );
};

export default FeatureCard;