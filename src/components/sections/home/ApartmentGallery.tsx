"use client";

import { PropertyCard2 } from "@/components/cards/PropertyCard2";
import { AnimatedH2 } from "@/components/ui/text-animations";
import { propertySections } from "@/data/properties";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const ApartmentGallery = () => {
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // const [canScrollLeft, setCanScrollLeft] = useState(false);
  // const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll functionality for mobile
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const nextIndex = (currentIndex + 1) % propertySections.length;
      const cardWidth = container.clientWidth;
      
      container.scrollTo({
        left: nextIndex * cardWidth,
        behavior: 'smooth'
      });
      
      setCurrentIndex(nextIndex);
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoScrolling, currentIndex]);

  // Check scroll position
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // setCanScrollLeft(container.scrollLeft > 0);
    // setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
  };

  // const scrollLeft = () => {
  //   setIsAutoScrolling(false);
  //   const container = scrollContainerRef.current;
  //   if (!container) return;

  //   const cardWidth = container.clientWidth;
  //   const newIndex = Math.max(0, currentIndex - 1);
    
  //   container.scrollTo({
  //     left: newIndex * cardWidth,
  //     behavior: 'smooth'
  //   });
    
  //   setCurrentIndex(newIndex);
    
  //   // Resume auto-scroll after 10 seconds
  //   setTimeout(() => setIsAutoScrolling(true), 10000);
  // };

  // const scrollRight = () => {
  //   setIsAutoScrolling(false);
  //   const container = scrollContainerRef.current;
  //   if (!container) return;

  //   const cardWidth = container.clientWidth;
  //   const newIndex = Math.min(propertySections.length - 1, currentIndex + 1);
    
  //   container.scrollTo({
  //     left: newIndex * cardWidth,
  //     behavior: 'smooth'
  //   });
    
  //   setCurrentIndex(newIndex);
    
  //   // Resume auto-scroll after 10 seconds
  //   setTimeout(() => setIsAutoScrolling(true), 10000);
  // };

  // Handle scroll events to update current index
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / cardWidth);
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(Math.max(0, Math.min(propertySections.length - 1, newIndex)));
    }
    
    checkScrollPosition();
  };

  return (
    <section className="py-24 px-4 sm:px-8 lg:px-16">
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <AnimatedH2
          wordByWord={true}
          wordStagger={0.1}
          duration={0.2}
          className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide"
        >
          Luxury Living Spaces
        </AnimatedH2>
      </motion.div>
      
      <div className="relative overflow-hidden">
        {/* Mobile/Tablet Horizontal Slider */}
        <div className="block md:hidden">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-scroll scrollbar-hide h-[60vh] sm:h-[70vh] snap-x snap-mandatory"
            onScroll={handleScroll}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {propertySections.map((section, index) => (
              <div key={section.id} className="flex-shrink-0 w-full h-full snap-start px-2">
                <div className="w-full h-full">
                  <PropertyCard2 section={section} index={index} />
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {propertySections.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => {
                  setIsAutoScrolling(false);
                  const container = scrollContainerRef.current;
                  if (container) {
                    const cardWidth = container.clientWidth;
                    container.scrollTo({
                      left: index * cardWidth,
                      behavior: 'smooth'
                    });
                    setCurrentIndex(index);
                  }
                  setTimeout(() => setIsAutoScrolling(true), 10000);
                }}
              />
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block overflow-hidden">
          <div className="h-[60vh] sm:h-[70vh] lg:h-[80vh] flex gap-1">
            {propertySections.map((section, index) => (
              <PropertyCard2 key={section.id} section={section} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};