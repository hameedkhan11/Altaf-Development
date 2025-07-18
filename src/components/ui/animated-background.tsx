// components/ui/AnimatedBackground.tsx

"use client";

import { motion } from "framer-motion";
import { shouldAnimate, getPerformanceMode } from "@/lib/constants";

const AnimatedBackground = () => {
  const performanceMode = getPerformanceMode();
  const canAnimate = shouldAnimate();

  return (
    <>
      {/* Subtle Animated Background Elements */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-[#8B2131]/5 to-[#B91C1C]/5 rounded-full blur-2xl sm:blur-3xl pointer-events-none"
        animate={
          canAnimate && performanceMode !== "slow"
            ? {
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }
            : {
                scale: 1,
                opacity: 0.3,
              }
        }
        transition={{
          duration: performanceMode === "fast" ? 4 : 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-xl sm:blur-2xl pointer-events-none"
        animate={
          canAnimate && performanceMode !== "slow"
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }
            : {
                scale: 1,
                opacity: 0.2,
              }
        }
        transition={{
          duration: performanceMode === "fast" ? 5 : 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </>
  );
};

export default AnimatedBackground;