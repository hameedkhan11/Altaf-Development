"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  batchStagger,
  viewportOnce,
  delays,
  shouldAnimate
} from '@/lib/constants';
import { amenitiesData } from '@/data/amenities';
import { AmenityData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { CldImage } from 'next-cloudinary';
import { AnimatedH1, AnimatedH2, AnimatedP } from '@/components/ui/text-animations';

const Amenities = () => {
  const [activeAmenity, setActiveAmenity] = useState<string>('shopping-mall');
  const canAnimate = shouldAnimate();

  const amenityKeys = Object.keys(amenitiesData);
  const currentAmenity: AmenityData = amenitiesData[activeAmenity];

  const handleAmenityClick = (amenityId: string) => {
    setActiveAmenity(amenityId);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto">
        {/* Header Section */}
        <div 
          className="w-full flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10 lg:mb-12"
          {...fadeInUp}
        >
          <AnimatedH1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center  uppercase w-full leading-tight"
            {...fadeInLeft}
          >
            Live Close to Premium Luxury
          </AnimatedH1>
          {/* <motion.p 
            className="sm:text-md  w-full lg:w-1/3 leading-relaxed font-light"
            {...fadeInRight}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.medium }}
          >
            At Altaf Devlopment, the neigborhood offers top-tier fitness centers, luxurious pools, parks, high-end shopping, dining, coworking spaces, and event venues. Enjoy security, high-speed internet, and eco-friendly infrastructure for modern living in Pakistan&apos;s premier smart city.
          </motion.p> */}
        </div>

        {/* Amenity Tabs */}
        <motion.div 
          className="mb-8 sm:mb-10 lg:mb-12"
          variants={batchStagger.container}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
        >
          <motion.ul className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 items-center justify-center">
            {amenityKeys.map((amenityKey) => {
              const amenity = amenitiesData[amenityKey];
              const isActive = activeAmenity === amenityKey;
              
              return (
                <motion.li 
                  key={amenityKey}
                  variants={batchStagger.item}
                  whileHover={canAnimate ? { scale: 1.02 } : {}}
                  whileTap={canAnimate ? { scale: 0.98 } : {}}
                >
                  <Button
                    onClick={() => handleAmenityClick(amenityKey)}
                    className={`uiverse-btn p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base transition-all duration-300 ${
                      isActive
                        ? 'bg-[rgb(140,46,71)] text-white border-[rgb(140,46,71)] shadow-lg hover:bg-[rgb(140,46,71)]'
                        : 'bg-white border-gray-300 hover:border-amber-400 hover:text-amber-600'
                    }`}
                  >
                    {amenity.name}
                  </Button>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>

        {/* Content Section */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 items-start"
          key={activeAmenity} // This ensures re-animation when content changes
          {...fadeInUp}
        >
          {/* Left Content */}
          <motion.div 
            className="space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-1  max-w-lg"
            {...fadeInLeft}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.short }}
          >
            <AnimatedH2 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight mt-6"
            >
              {currentAmenity.title}
            </AnimatedH2>
            
            <AnimatedP 
              className="text-sm leading-relaxed font-light"
            >
              {currentAmenity.description}
            </AnimatedP>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            className="relative order-1 lg:order-2 w-full"
            {...fadeInRight}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.medium }}
          >
            <motion.div
              className="relative w-full h-[280px] xs:h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[580px] rounded-md overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <CldImage
                src={currentAmenity.image}
                alt={currentAmenity.title}
                fill
                className="object-cover"
                sizes="(max-width: 720px) 100vw, (max-width: 1024px) 100vw, 50vw"
                priority
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"/>
              
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;