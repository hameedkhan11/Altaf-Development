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
  const [activeAmenity, setActiveAmenity] = useState<string>('location');
  const canAnimate = shouldAnimate();

  const amenityKeys = Object.keys(amenitiesData);
  const currentAmenity: AmenityData = amenitiesData[activeAmenity];
  
  // Always use location data for title and description
  const locationData = amenitiesData['location'];

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
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center uppercase w-full leading-tight"
            {...fadeInLeft}
          >
            Live Close to Premium Luxury
          </AnimatedH1>
        </div>

        {/* Content Section */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 items-start"
          {...fadeInUp}
        >
          {/* Left Content - Hidden on mobile */}
          <motion.div 
            className="hidden lg:block space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-1 max-w-lg"
            {...fadeInLeft}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.short }}
          >
            <AnimatedH2 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight mt-6"
            >
              {locationData.title}
            </AnimatedH2>
            
            <AnimatedP 
              className="text-sm leading-relaxed font-light"
            >
              {locationData.description}
            </AnimatedP>

            {/* Amenity Tabs - On Left Side Under Description for Desktop */}
            <motion.div 
              className="mt-8"
              variants={batchStagger.container}
              initial="initial"
              whileInView="animate"
              viewport={viewportOnce}
            >
              <motion.ul className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
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
                        className={`group relative transition-all duration-500 ease-in px-5 bg-transparent border-2 border-[rgb(140,46,71)] text-[rgb(140,46,71)] hover:bg-[rgb(140,46,71)] hover:text-white hover:border-[rgb(140,46,71)] cursor-pointer rounded-full font-bold mr-8 overflow-hidden py-5 ${
                          isActive
                            ? 'bg-[rgb(140,46,71)] text-white border-2 border-[rgb(140,46,71)] shadow-lg hover:bg-[rgb(140,46,71)]'
                            : ''
                        }`}
                      >
                        {amenity.name}
                      </Button>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          </motion.div>

          {/* Mobile Amenity Tabs - Above image on mobile only */}
          <motion.div 
            className="block lg:hidden mb-6 order-1 px-2"
            variants={batchStagger.container}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
          >
            <motion.ul className="flex flex-wrap gap-2 justify-center">
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
                      className={`group relative transition-all duration-300 ease-in px-2 py-1.5 text-xs bg-transparent border border-[rgb(140,46,71)] text-[rgb(140,46,71)] hover:bg-[rgb(140,46,71)] hover:text-white hover:border-[rgb(140,46,71)] cursor-pointer rounded-lg font-semibold overflow-hidden min-h-[32px] ${
                        isActive
                          ? 'bg-[rgb(140,46,71)] text-white border-[rgb(140,46,71)] shadow-md'
                          : ''
                      }`}
                    >
                      <span className="relative z-10">{amenity.name}</span>
                    </Button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>

          {/* Image Section */}
          <motion.div 
            className="relative order-2 lg:order-2 w-full"
            {...fadeInRight}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.medium }}
          >
            <motion.div
              className="relative w-full h-[280px] xs:h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[580px] rounded-md overflow-hidden shadow-xl"
              key={activeAmenity}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <CldImage
                src={currentAmenity.image}
                alt={currentAmenity.name}
                fill
                className="object-cover"
                sizes="(max-width: 720px) 100vw, (max-width: 1024px) 100vw, 50vw"
                priority
              />
              
              {/* Overlay gradient - only at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/70 to-transparent"/>
              
              {/* Image Title at Bottom - Only this changes based on selected amenity */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center drop-shadow-lg">
                  {currentAmenity.name}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;