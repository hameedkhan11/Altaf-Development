// components/MissionVisionCards.tsx
"use client";
import { motion } from "framer-motion";
import { AnimatedH3, AnimatedP } from "@/components/ui/text-animations";

const MissionVisionCards = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    viewport: { once: true, margin: "-50px" }
  };

  const staggerChildren = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const missionContent = "At Altaf Developments, our mission is to redefine the landscape of modern living by creating architectural landmarks that embody innovation, elegance, and purposeful design. We go beyond building spaces  we shape thriving communities that elevate lifestyles, foster meaningful connections, and contribute to a brighter, more prosperous society.";

  const visionContent = "At Altaf Developments, we envision a future where real estate is not just about construction  it is a catalyst for transformation. Guided by innovation and inspired by design, we aspire to reshape cities, uplift communities, and enrich lives through spaces that blend functionality with artistic brilliance.";

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto">

        {/* Cards Container */}
        <motion.div 
          className="relative flex flex-col lg:flex-row items-stretch"
          variants={staggerChildren}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Mission Card - Left & Bottom Border */}
          <motion.div 
            className="flex-1 relative group"
            variants={fadeInUp}
          >
            <div className="h-full p-8 md:p-12 lg:p-16 relative">
              {/* Card Content */}
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="mb-2">
                  <AnimatedH3 className="text-2xl md:text-3xl">
                    Our Mission
                  </AnimatedH3>
                </div>
                
                <AnimatedP className="text-sm md:text-base">
                  {missionContent}
                </AnimatedP>
              </div>

              {/* Left Border */}
              <div className="absolute left-0 top-0 w-1 h-full bg-[#8B2131] transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out"></div>
              
              {/* Bottom Border */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#8B2131] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out delay-200"></div>
            </div>
          </motion.div>

          {/* Middle Line */}
          <div className="relative flex items-center justify-center lg:w-16 h-16 lg:h-auto">
            {/* Horizontal line for mobile */}
            <div className="block lg:hidden w-full h-px bg-neutral-600 relative">
              <div className="absolute inset-0 w-full h-full bg-[#8B2131] transform origin-left scale-x-0 animate-[scaleX_1s_ease-out_2s_forwards]"></div>
            </div>
            
            {/* Vertical line for desktop */}
            <div className="hidden lg:block w-px h-full bg-neutral-600 relative">
              <div className="absolute inset-0 w-full h-full bg-[#8B2131] transform origin-top scale-y-0 animate-[scaleY_1s_ease-out_2s_forwards]"></div>
            </div>
            
            {/* Center Circle */}
            <div className="absolute w-4 h-4 bg-white border-2 border-[#8B2131] rounded-full transform scale-0 animate-[scale_0.5s_ease-out_2.5s_forwards]"></div>
          </div>

          {/* Vision Card - Right & Bottom Border */}
          <motion.div 
            className="flex-1 relative group"
            variants={fadeInUp}
          >
            <div className="h-full p-8 md:p-12 lg:p-16 relative">
              {/* Card Content */}
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="mb-2">
                  <AnimatedH3 className="text-2xl md:text-3xl">
                    Our Vision
                  </AnimatedH3>
                </div>
                
                <AnimatedP className="text-sm md:text-base leading-relaxed">
                  {visionContent}
                </AnimatedP>
              </div>

              {/* Right Border */}
              <div className="absolute right-0 top-0 w-1 h-full bg-[#8B2131] transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out"></div>
              
              {/* Bottom Border */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#8B2131] transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out delay-200"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scaleX {
          to { transform: scaleX(1); }
        }
        @keyframes scaleY {
          to { transform: scaleY(1); }
        }
        @keyframes scale {
          to { transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

export default MissionVisionCards;