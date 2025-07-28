// components/CEOMessage.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  microSlide,
  viewportOnce,
  viewportDefault,
  delays,
  // shouldAnimate,
  // getPerformanceMode,
  getPerformanceVariant,

} from "@/lib/constants";
import { visionData } from "@/data/vision";
import { CldImage } from "next-cloudinary";
import { AnimatedH1, AnimatedH2, AnimatedH3, AnimatedP } from "@/components/ui/text-animations";

const CEOMessage = () => {
  const { ceoName, ceoTitle} = visionData;
  // Performance-aware animations
  const titleAnimation = getPerformanceVariant(fadeInUp);
  const contentAnimation = getPerformanceVariant(fadeInLeft);
  const imageAnimation = getPerformanceVariant(fadeInRight);
  const signatureAnimation = getPerformanceVariant(microSlide);
  // const statsAnimation = getPerformanceVariant(microSlide);
  // const lazyStatsContainer = createLazyAnimation(staggerContainer);

  // Custom underline animation with performance awareness
  // const underlineAnimation = shouldAnimate()
  //   ? {
  //       initial: { scaleX: 0 },
  //       animate: { scaleX: 1 },
  //       transition: {
  //         duration:
  //           getPerformanceMode() === "fast"
  //             ? 0.6
  //             : getPerformanceMode() === "slow"
  //             ? 1.0
  //             : 0.8,
  //         delay: delays.medium,
  //         ease: "easeOut",
  //       },
  //     }
  //   : {
  //       initial: { scaleX: 1 },
  //       animate: { scaleX: 1 },
  //       transition: { duration: 0 },
  //     };

  // Using content from visionData
  const shortContent = [
    "Our vision at Altaf Developments lies in creating communities that not only reflect architectural brilliance, but also resonate with the dreams and aspirations of modern living.",
    "With unwavering commitment to innovation, sustainability, and quality, we're dedicated to shaping environments that inspire and elevate every aspect of modern luxury living."
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative">
      <div className="max-w-8xl mx-auto">
        <AnimatedH1 
        wordByWord={true}
        wordStagger={0.1}
        duration={0.6}
        className="text-3xl sm:text-4xl md:text-5xl text-center pb-12">
            THE NEW ERA OF LUXURY
        </AnimatedH1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-x-12 items-start">
          {/* Content Section */}
          <motion.div
            className="space-y-4 sm:space-y-5 md:space-y-6 flex flex-col justify-center h-full"
            {...contentAnimation}
            viewport={viewportDefault}
          >
            {/* Title */}
            <motion.div {...titleAnimation} viewport={viewportOnce} className="text-left">
              <AnimatedH2 className="text-2xl sm:text-3xl md:text-4xl  mb-0">LEGACY OF EXCELLENCE</AnimatedH2>
            </motion.div>

            {/* Content Paragraphs */}
            <div className="space-y-3 sm:space-y-4 text-left">
              {shortContent.map((paragraph, index) => (
                <AnimatedP
                duration={0.6}
                className="text-sm"
                key={index}
                >
                  {paragraph}
                </AnimatedP>
              ))}
            </div>

            {/* CEO Signature */}
            <motion.div
              className="pt-4 sm:pt-5 md:pt-6 space-y-1 text-center lg:text-left"
              {...signatureAnimation}
              transition={{
                ...signatureAnimation.transition,
                delay: delays.long * 2,
              }}
              viewport={viewportOnce}
            >
              <AnimatedH3 className="text-base sm:text-lg font-bold text-[#8B2131]">{ceoName}</AnimatedH3>
              <AnimatedP className="text-xs sm:text-sm">{ceoTitle}</AnimatedP>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="relative order-first lg:order-last"
            {...imageAnimation}
            viewport={viewportDefault}
          >
            <div className="relative h-[300px] sm:h-[360px] md:h-[400px] lg:h-[460px] xl:h-[520px] w-full overflow-hidden shadow-2xl">
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <CldImage
                  src={"imgi_15_Picture122251_gwvfyf"}
                  alt={`${ceoName} - ${ceoTitle}`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  priority
                  aria-label={`${ceoName} - ${ceoTitle}`}
                />
              </motion.div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>
        </div>
       
      </div>
    </section>
  );
};

export default CEOMessage;