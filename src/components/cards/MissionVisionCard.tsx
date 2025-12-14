// components/MissionVisionCards.tsx
"use client";
import { motion } from "framer-motion";
import { AnimatedH3, AnimatedP } from "@/components/ui/text-animations";
import { HiPlus } from "react-icons/hi2";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  viewportOnce,
  delays,
} from "@/lib/constants";

const MissionVisionCards = () => {
  const missionContent = "At Altaf Developments, our mission is to redefine the landscape of modern living by creating architectural landmarks that embody innovation, elegance, and purposeful design. We go beyond building spaces and we shape thriving communities that elevate lifestyles, foster meaningful connections, and contribute to a brighter, more prosperous society.";

  const visionContent = "At Altaf Developments, we envision a future where real estate is not just about construction it is a catalyst for transformation. Guided by innovation and inspired by design, we aspire to reshape cities, uplift communities, and enrich lives through spaces that blend functionality with artistic brilliance.";

  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center"
          {...fadeInUp}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: delays.short }}
        >
          <motion.div
            className="inline-block mb-4"
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.medium }}
          >
          </motion.div>
          <AnimatedH3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Our Foundation
          </AnimatedH3>
          <AnimatedP className="text-sm sm:text-base mx-auto leading-relaxed">
            Built on principles of excellence, innovation, and community impact
          </AnimatedP>
        </motion.div>

        {/* Cards Container */}
        <div className="relative flex flex-col lg:flex-row items-stretch gap-8 lg:gap-0">
          {/* Mission Card */}
          <motion.div 
            className="flex-1 relative group cursor-pointer"
            {...fadeInLeft}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: delays.medium }}
          >
            <div className="h-full relative overflow-hidden rounded-2xl lg:rounded-r-none bg-white shadow-sm hover:shadow-md transition-all duration-700 ease-out group-hover:scale-[1.02] lg:group-hover:scale-100">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-neutral-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Content */}
              <div className="relative z-10 p-8 md:p-12 lg:p-16 h-full flex flex-col justify-center">
                  <AnimatedH3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold transition-colors duration-500">
                    Our Mission
                  </AnimatedH3>

                
                <AnimatedP className="text-sm sm:text-base leading-relaxed transition-colors duration-500">
                  {missionContent}
                </AnimatedP>
              </div>
            </div>
          </motion.div>

          {/* Center Divider */}
          <motion.div 
            className="relative hidden sm:flex items-center justify-center lg:w-20 h-20 lg:h-auto z-20"
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: delays.long }}
          >
            {/* Background Circle */}
            {/* Center Icon */}
            <div className="relative z-10 w-10 h-10 bg-[rgb(140,46,71)] rounded-full flex items-center justify-center shadow-sm">
              <HiPlus className="w-5 h-5 text-white" />
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            className="flex-1 relative group cursor-pointer"
            {...fadeInRight}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: delays.medium }}
          >
            <div className="h-full relative overflow-hidden rounded-2xl lg:rounded-l-none bg-white shadow-sm hover:shadow-md transition-all duration-700 ease-out group-hover:scale-[1.02] lg:group-hover:scale-100">
              {/* Content */}
              <div className="relative z-10 p-8 md:p-12 lg:p-16 h-full flex flex-col justify-center">

                  <AnimatedH3 className=" text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold transition-colors duration-500">
                    Our Vision
                  </AnimatedH3>
                
                <AnimatedP className="text-sm sm:text-base leading-relaxed  transition-colors duration-500">
                  {visionContent}
                </AnimatedP>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionCards;