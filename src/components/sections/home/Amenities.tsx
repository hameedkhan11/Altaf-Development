"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  viewportOnce,
  delays,
} from "@/lib/constants";
import { amenitiesData } from "@/data/amenities";
import { AmenityData } from "@/lib/types";
import { CldImage } from "next-cloudinary";
import {
  AnimatedH1,
  AnimatedH2,
  AnimatedP,
} from "@/components/ui/text-animations";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Amenities = () => {
  const [activeAmenity, setActiveAmenity] = useState<string>("location");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const amenityKeys = Object.keys(amenitiesData);
  const currentAmenity: AmenityData = amenitiesData[activeAmenity];

  // Always use location data for title and description
  const locationData = amenitiesData["location"];

  const nextSlide = useCallback(() => {
    const nextIndex = (currentIndex + 1) % amenityKeys.length;
    setCurrentIndex(nextIndex);
    setActiveAmenity(amenityKeys[nextIndex]);
  }, [currentIndex, amenityKeys]);

  const prevSlide = useCallback(() => {
    const prevIndex =
      currentIndex === 0 ? amenityKeys.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setActiveAmenity(amenityKeys[prevIndex]);
  }, [currentIndex, amenityKeys]);

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

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
              Comfort, Connectivity & Community
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
            <AnimatedH2 className="text-xl sm:text-2xl md:text-3xl leading-tight mt-6">
              {locationData.title}
            </AnimatedH2>

            <AnimatedP className="text-sm leading-relaxed font-light">
              {locationData.description}
            </AnimatedP>
          </motion.div>

          {/* Mobile Content - Above image on mobile only */}
          <motion.div
            className="block lg:hidden mb-6 order-1 px-2"
            {...fadeInLeft}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.short }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight mt-6 text-center">
              {locationData.title}
            </h2>

            <p className="text-sm leading-relaxed font-light text-center mt-2">
              {locationData.description}
            </p>
          </motion.div>

          {/* Image Section with Slider */}
          <motion.div
            className="relative order-2 lg:order-2 w-full"
            {...fadeInRight}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.medium }}
          >
            <div className="relative w-full h-[280px] xs:h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[580px] rounded-md overflow-hidden shadow-xl">
              <motion.div
                key={activeAmenity}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <CldImage
                  src={currentAmenity.image}
                  alt={currentAmenity.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 720px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>

              {/* Overlay gradient - only at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />

              {/* Image Title at Bottom - Only this changes based on selected amenity */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl text-center drop-shadow-lg">
                  {currentAmenity.name}
                </h3>
              </div>

              {/* Slider Arrows */}
              <button
                onClick={prevSlide}
                className="absolute hidden sm:block left-4 top-1/2 transform -translate-y-1/2 hover:bg-[rgb(140,46,71)] text-white p-2 rounded-full transition-all duration-300 z-10"
              >
                <FaArrowLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute hidden sm:block right-4 top-1/2 transform -translate-y-1/2 hover:bg-[rgb(140,46,71)] text-white p-2 rounded-full transition-all duration-300 z-10"
              >
                <FaArrowRight size={24} />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {amenityKeys.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setActiveAmenity(amenityKeys[index]);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-[rgb(140,46,71)] scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;