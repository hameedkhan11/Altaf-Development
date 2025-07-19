// components/ui/CounterStat.tsx

"use client";

import { motion } from "framer-motion";
import {
  viewportOnce,
  delays,
  shouldAnimate,
  getPerformanceMode,
  getPerformanceVariant,
  microSlide,
} from "@/lib/constants";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";

interface CounterStatProps {
  value: string;
  label: string;
  index: number;
}

const CounterStat = ({ value, label, index }: CounterStatProps) => {
  const performanceMode = getPerformanceMode();
  const canAnimate = shouldAnimate();
  const statsAnimation = getPerformanceVariant(microSlide);
  
  // Extract numeric value for animation
  const numericValue = parseInt(value.replace(/\D/g, ''));
  
  // Adjust duration based on performance mode
  const duration = performanceMode === "fast" ? 1.5 : performanceMode === "slow" ? 1 : 2;
  
  const counterRef = useCounterAnimation(numericValue, duration);

  return (
    <motion.div
      className="text-center mb-6"
      {...statsAnimation}
      transition={{
        ...statsAnimation.transition,
        delay: delays.stagger(index) + delays.long,
      }}
      viewport={viewportOnce}
    >
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-2 sm:mb-4 font-bold">
        {canAnimate ? (
          <>
            <span ref={counterRef} className="text-4xl sm:text-5xl font-bold">0</span>
            <span className="text-4xl sm:text-5xl font-bold">+</span>
          </>
        ) : (
          value
        )}
      </div>
      <div className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium">
        {label}
      </div>
    </motion.div>
  );
};

export default CounterStat;