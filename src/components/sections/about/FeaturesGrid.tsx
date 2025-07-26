// components/sections/home/FeaturesGrid.tsx

"use client";

import { motion } from "framer-motion";
import { features } from "@/data/features";
import { 
  viewportOnce,
  shouldAnimate,
  getPerformanceMode,
  quickFade,
  easingPresets
} from "@/lib/constants";
import FeatureCard from "@/components/cards/FeatureCard";

const FeaturesGrid = () => {
  const performanceMode = getPerformanceMode();
  const canAnimate = shouldAnimate();

  const cardsAnimation = canAnimate ? {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewportOnce,
    transition: { 
      duration: performanceMode === "fast" ? 0.8 : 1.0,
      delay: 0.5,
      ease: easingPresets.smooth
    }
  } : quickFade;

  return (
    <section className="relative">
      {/* Cards Container - Positioned to overlap 10% on image, 90% after */}
      <motion.div
        {...cardsAnimation}
        className="relative"
      >
        <div className="mx-auto px-16">
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-4 xl:gap-2 justify-items-center"
            role="list"
            aria-label="Company features and benefits"
          >
            {features.map((item, index) => (
              <FeatureCard
                key={index}
                // icon={item.icon}
                title={item.title}
                description={item.desc}
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturesGrid;