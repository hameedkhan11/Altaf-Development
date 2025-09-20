"use client";
import React from "react";
import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";

const CareerPageIntro: React.FC = () => {
  return (
    <section className="relative w-full">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="flex flex-col space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20">
          
          {/* Content Section at Top */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-xs sm:max-w-lg md:max-w-2xl mx-auto font-light leading-[0.9] tracking-wide px-2">
                Career Opportunities at Altaf Developments
              </h1>
              
              <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-light max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4">
                Join Altaf Developments and shape the future of luxury real estate.
              </p>
            </div>
          </motion.div>
          
          {/* Image Section at Bottom */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-7xl"
          >
            <div className="aspect-[7/6] sm:aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/10] xl:aspect-[16/9] overflow-hidden">
              <CldImage
                width={1200}
                height={750}
                src="imageye___-_imgi_61_Zt9gitWemrWNXODxUK4XsnqN6jQ_tpewtj"
                alt="Altaf Developments"
                className="w-full h-full object-cover transition-all duration-700"
                quality="auto:best"
                format="auto"
                dpr="auto"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 95vw, (max-width: 1024px) 90vw, 85vw"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CareerPageIntro;