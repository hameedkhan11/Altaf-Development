"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  viewportOnce,
  delays,
} from "@/lib/constants";
import { amenitiesData, additionalAmenities, SimpleAmenityData } from "@/data/amenities";
import { AmenityData } from "@/lib/types";
import { CldImage } from "next-cloudinary";
import {
  AnimatedH1,
  AnimatedH2,
  AnimatedP,
} from "@/components/ui/text-animations";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Amenities = () => {
  const [, setActiveAmenity] = useState<string>("location");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number>(0);
  const [isGoingForward, setIsGoingForward] = useState<boolean>(true);

  // Memoize the combined amenities array to prevent recreation on every render
  const allAmenities: Array<{ key: string; data: AmenityData | SimpleAmenityData }> = useMemo(() => [
    { key: 'location', data: amenitiesData.location },
    ...additionalAmenities
  ], []);

  const currentAmenity = allAmenities[currentIndex];

  // Always use location data for title and description
  const locationData = amenitiesData["location"];

  const nextSlide = useCallback(() => {
    const nextIndex = (currentIndex + 1) % allAmenities.length;
    setPrevIndex(currentIndex);
    setCurrentIndex(nextIndex);
    setActiveAmenity(allAmenities[nextIndex].key);
    setIsGoingForward(true);
  }, [currentIndex, allAmenities]);

  const prevSlide = useCallback(() => {
    const prevIndexValue = currentIndex === 0 ? allAmenities.length - 1 : currentIndex - 1;
    setPrevIndex(currentIndex);
    setCurrentIndex(prevIndexValue);
    setActiveAmenity(allAmenities[prevIndexValue].key);
    setIsGoingForward(false);
  }, [currentIndex, allAmenities]);

  const goToSlide = useCallback((index: number) => {
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
    setActiveAmenity(allAmenities[index].key);
    setIsGoingForward(index > currentIndex);
  }, [currentIndex, allAmenities]);

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
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center uppercase w-full leading-tight"
            {...fadeInLeft}
          >
              Comfort, Connectivity & Community
          </AnimatedH1>
        </div>

        {/* Desktop Content Section */}
        <div
          className="hidden lg:grid grid-cols-2 items-start"
          {...fadeInUp}
        >
          {/* Left Content - Desktop only */}
          <motion.div
            className="space-y-4 sm:space-y-5 md:space-y-6 order-1 max-w-lg"
            {...fadeInLeft}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.short }}
          >
            <AnimatedH2 className="text-xl sm:text-2xl md:text-3xl leading-tight mt-6">
              {locationData.title}
            </AnimatedH2>

            <div className="space-y-3">
              {locationData.description.map((paragraph, index) => (
                <AnimatedP key={index} className="text-sm leading-relaxed font-light">
                  {paragraph}
                </AnimatedP>
              ))}
            </div>
          </motion.div>

          {/* Desktop Image Section */}
          <motion.div
            className="relative order-2 w-full"
            {...fadeInRight}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.medium }}
          >
            <div className="relative w-full h-[500px] xl:h-[580px] rounded-md overflow-hidden shadow-xl">
              {/* Background Images with Progressive Width Transition */}
              <div className="absolute inset-0 flex" style={{ flexDirection: isGoingForward ? 'row' : 'row-reverse' }}>
                {/* Previous Image - shrinks during transition */}
                <motion.div
                  key={`prev-${prevIndex}`}
                  className="relative overflow-hidden"
                  initial={{ width: "100%" }}
                  animate={{ 
                    width: currentIndex !== prevIndex ? "0%" : "100%",
                    transition: { duration: 2, ease: "easeInOut" }
                  }}
                >
                  <CldImage
                    src={allAmenities[prevIndex].data.image}
                    alt={allAmenities[prevIndex].data.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    aria-label="Previous amenity image"
                  />
                </motion.div>

                {/* Current Image - grows during transition */}
                <motion.div
                  key={`current-${currentIndex}`}
                  className="relative overflow-hidden"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: currentIndex !== prevIndex ? "100%" : "0%",
                    transition: { duration: 2, ease: "easeInOut" }
                  }}
                >
                  <CldImage
                    src={currentAmenity.data.image}
                    alt={currentAmenity.data.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    aria-label="Current amenity image"
                  />
                </motion.div>
              </div>

              {/* Overlay gradient - only at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />

              {/* Image Title at Bottom - Only this changes based on selected amenity */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl text-center drop-shadow-lg">
                  {currentAmenity.data.name}
                </h3>
              </div>

              {/* Desktop Slider Arrows */}
              <button
                onClick={prevSlide}
                aria-label="Previous amenity image"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 hover:bg-[rgb(140,46,71)] text-white p-2 rounded-full transition-all duration-300 z-10"
              >
                <FaArrowLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next amenity image"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-[rgb(140,46,71)] text-white p-2 rounded-full transition-all duration-300 z-10"
              >
                <FaArrowRight size={24} />
              </button>
            </div>

            {/* Desktop Dots Indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {allAmenities.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-[rgb(140,46,71)] scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label="Amenity image indicator"
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile Full-Width Image Section - PropertyShowcase Style */}
        <div className="lg:hidden relative w-full overflow-hidden bg-gray-900 aspect-[6/7]">
          {/* Background Images with Progressive Width Transition */}
          <div className="absolute inset-0 flex" style={{ flexDirection: isGoingForward ? 'row' : 'row-reverse' }}>
            {/* Previous Image - shrinks during transition */}
            <motion.div
              key={`mobile-prev-${prevIndex}`}
              className="relative overflow-hidden"
              initial={{ width: "100%" }}
              animate={{ 
                width: currentIndex !== prevIndex ? "0%" : "100%",
                transition: { duration: 2, ease: "easeInOut" }
              }}
            >
              <CldImage
                src={allAmenities[prevIndex].data.image}
                alt={allAmenities[prevIndex].data.name}
                fill
                sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 768px) calc(100vw - 3rem), (max-width: 1024px) calc(100vw - 4rem), 100vw"
                className="object-cover"
                priority
                aria-label="Amenity Images"
              />
            </motion.div>

            {/* Current Image - grows during transition */}
            <motion.div
              key={`mobile-current-${currentIndex}`}
              className="relative overflow-hidden"
              initial={{ width: "0%" }}
              animate={{ 
                width: currentIndex !== prevIndex ? "100%" : "0%",
                transition: { duration: 2, ease: "easeInOut" }
              }}
            >
              <CldImage
                src={currentAmenity.data.image}
                alt={currentAmenity.data.name}
                fill
                sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 768px) calc(100vw - 3rem), (max-width: 1024px) calc(100vw - 4rem), 100vw"
                className="object-cover"
                priority
                aria-label="Amenity Images"
              />
            </motion.div>
          </div>


        </div>

        {/* Mobile Navigation - Title with Arrows Below Image */}
        <div className="lg:hidden flex items-center justify-between">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            aria-label="Previous amenity image"
            className="hover:bg-[rgb(140,46,71)] text-black hover:text-white rounded-full transition-all duration-300 flex-shrink-0"
          >
            <FaArrowLeft size={20} />
          </button>

          {/* Amenity Name */}
          <motion.h4
            key={`mobile-title-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-xl sm:text-xl text-[rgb(140,46,71)] text-center mt-4 pt-0.5 flex-1"
          >
            {currentAmenity.data.name}
          </motion.h4>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            aria-label="Next amenity image"
            className="hover:bg-[rgb(140,46,71)] text-black hover:text-white rounded-full transition-all duration-300 flex-shrink-0"
          >
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Amenities;