"use client";

import { motion, useAnimationControls } from "framer-motion";
import { features } from "@/data/features";
import {
  viewportOnce,
  shouldAnimate,
  getPerformanceMode,
  quickFade,
  easingPresets
} from "@/lib/constants";
import FeatureCard from "@/components/cards/FeatureCard";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FeaturesGrid = () => {
  const performanceMode = getPerformanceMode();
  const canAnimate = shouldAnimate();
  const [visibleCards, setVisibleCards] = useState(3);
  const [, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Animation controls
  const controls = useAnimationControls();
  // const animationRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);
  const pausedProgressRef = useRef<number>(0);

  // Update visible cards based on screen size
  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1); // Mobile: 1 card
        setIsMobile(true);
      } else if (width < 1024) {
        setVisibleCards(2); // Tablet: 2 cards
        setIsMobile(false);
      } else {
        setVisibleCards(3); // Desktop: 3 cards
        setIsMobile(false);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const containerAnimation = canAnimate ? {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: viewportOnce,
    transition: {
      duration: performanceMode === "fast" ? 0.8 : 1.0,
      delay: 0.5,
      ease: easingPresets.smooth
    }
  } : quickFade;

  // Duplicate features array for seamless loop
  const duplicatedFeatures = [...features, ...features, ...features]; // Triple for smooth infinite scroll

  // Calculate responsive values
  const cardWidthPercentage = 100 / visibleCards;
  const gapRem = visibleCards === 1 ? 0 : 1; // No gap on mobile for better spacing
  
  // Calculate move distance for one card width
  const moveDistancePercentage = cardWidthPercentage;
  
  // Animation duration
  const animationDuration = features.length * (visibleCards === 1 ? 3 : 4);

  // Mobile navigation functions
  const goToNext = () => {
    if (isMobile) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (isMobile) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Start animation (only for non-mobile)
  const startAnimation = useCallback((fromProgress: number = 0) => {
    if (isMobile) return;
    
    const remainingProgress = 1 - fromProgress;
    const remainingDuration = animationDuration * remainingProgress;
    
    startTimeRef.current = Date.now() - (animationDuration * fromProgress * 1000);
    
    controls.start({
      x: [`${-moveDistancePercentage * features.length * fromProgress}%`, `-${moveDistancePercentage * features.length}%`],
      transition: {
        duration: remainingDuration,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 0,
      }
    });
  }, [isMobile, animationDuration, moveDistancePercentage, controls]);

  // Handle hover start (only for non-mobile)
  const handleHoverStart = () => {
    if (isMobile) return;
    
    setIsHovered(true);
    
    // Calculate current progress
    const currentTime = Date.now();
    const elapsed = (currentTime - startTimeRef.current) / 1000;
    const progress = (elapsed % animationDuration) / animationDuration;
    pausedProgressRef.current = progress;
    
    // Stop animation
    controls.stop();
  };

  // Handle hover end (only for non-mobile)
  const handleHoverEnd = () => {
    if (isMobile) return;
    
    setIsHovered(false);
    
    // Resume animation from paused position
    startAnimation(pausedProgressRef.current);
  };

  // Initialize animation on mount (only for non-mobile)
  useEffect(() => {
    if (canAnimate && !isMobile) {
      startAnimation(0);
    }
  }, [visibleCards, canAnimate, isMobile, startAnimation]);

  // Handle mobile slide animation
  useEffect(() => {
    if (isMobile) {
      // Start from the middle set of cards (features.length)
      const actualIndex = currentIndex + features.length;
      
      controls.start({
        x: `-${actualIndex * 100}%`,
        transition: {
          duration: 0.5,
          ease: "easeInOut"
        }
      }).then(() => {
        // Reset position without animation when at boundaries
        if (currentIndex >= features.length) {
          // Reset to beginning
          setCurrentIndex(currentIndex - features.length);
          controls.set({ x: `-${(currentIndex - features.length + features.length) * 100}%` });
        } else if (currentIndex < 0) {
          // Reset to end
          setCurrentIndex(currentIndex + features.length);
          controls.set({ x: `-${(currentIndex + features.length + features.length) * 100}%` });
        }
      });
    }
  }, [currentIndex, isMobile, controls]);

  // Initialize mobile position
  useEffect(() => {
    if (isMobile) {
      // Start from the middle set (index 0 of middle set)
      controls.set({ x: `-${features.length * 100}%` });
      setCurrentIndex(0);
    }
  }, [isMobile, controls]);

  return (
    <section className="relative overflow-hidden">
      <motion.div
        {...containerAnimation}
        className="relative"
      >
        {/* Responsive padding */}
        <div className="px-4 sm:px-8 lg:px-16">
          {/* Mobile Navigation Arrows */}
          {isMobile && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[rgb(140,46,71)] hover:bg-white transition-all duration-200 hover:scale-110"
                aria-label="Previous slide"
              >
                <FaArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[rgb(140,46,71)] hover:bg-white transition-all duration-200 hover:scale-110"
                aria-label="Next slide"
              >
                <FaArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Slider Container */}
          <div 
            className="relative overflow-hidden"
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
          >
            <motion.div
              className={`flex ${visibleCards === 1 ? 'gap-0' : 'gap-4'}`}
              animate={controls}
              initial={{ x: "0%" }}
            >
              {duplicatedFeatures.map((item, index) => (
                <div
                  key={`${index}-${index >= features.length ? 'duplicate' : 'original'}`}
                  className="flex-shrink-0"
                  style={{
                     width: isMobile ? '100%' : `calc(${cardWidthPercentage}% - ${gapRem * 0.5}rem)`
                   }}
                >
                  <FeatureCard
                    title={item.title}
                    description={item.desc}
                    index={index % features.length}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile Indicators */}
        {isMobile && (
          <div className="flex justify-center mt-8 space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === (currentIndex % features.length) 
                    ? 'bg-[rgb(140,46,71)] w-8' 
                    : 'bg-gray-300 opacity-50 hover:opacity-75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Desktop Indicators */}
        {!isMobile && (
          <div className="flex justify-center mt-8 space-x-2">
            {features.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300 opacity-50"
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default FeaturesGrid;