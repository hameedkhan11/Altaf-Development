"use client";

import { PropertyCard2 } from "@/components/cards/PropertyCard2";
import { AnimatedH2 } from "@/components/ui/text-animations";
import { propertySections } from "@/data/properties";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const ApartmentGallery = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Create duplicated sections for infinite scroll
  const duplicatedSections = [...propertySections, ...propertySections];

  // Auto-scroll functionality for mobile - infinite forward scroll
  useEffect(() => {
    if (isTransitioning) return;

    const interval = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      setIsTransitioning(true);
      const cardWidth = container.clientWidth;
      const nextScrollIndex = currentIndex + 1;
      
      container.scrollTo({
        left: nextScrollIndex * cardWidth,
        behavior: 'smooth'
      });

      // If we've scrolled past the original sections, reset to beginning
      if (nextScrollIndex >= propertySections.length) {
        setTimeout(() => {
          // Jump back to the beginning without animation
          container.scrollTo({
            left: 0,
            behavior: 'auto'
          });
          setCurrentIndex(0);
          setIsTransitioning(false);
        }, 500); // Wait for smooth scroll to complete
      } else {
        setCurrentIndex(nextScrollIndex);
        setTimeout(() => setIsTransitioning(false), 500);
      }
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isTransitioning]);

  // Handle manual scroll events to update current index
  const handleScroll = () => {
    if (isTransitioning) return;
    
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    const scrollIndex = Math.round(scrollLeft / cardWidth);
    
    // Map the scroll index to the visual index
    const visualIndex = scrollIndex % propertySections.length;
    
    if (visualIndex !== currentIndex) {
      setCurrentIndex(visualIndex);
    }
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
            {duplicatedSections.map((section, index) => (
              <div key={`${section.id}-${Math.floor(index / propertySections.length)}`} className="flex-shrink-0 w-full h-full snap-start px-2">
                <div className="w-full h-full">
                  <PropertyCard2 section={section} index={index % propertySections.length} />
                </div>
              </div>
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