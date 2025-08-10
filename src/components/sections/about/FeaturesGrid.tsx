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
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FeaturesGrid = () => {
  const performanceMode = getPerformanceMode();
  const canAnimate = shouldAnimate();
  const [visibleCards, setVisibleCards] = useState(3);
  const [, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Memoize features length to avoid dependency warnings
  const featuresLength = useMemo(() => features.length, []);
  
  // Animation controls
  const controls = useAnimationControls();
  const startTimeRef = useRef<number>(0);
  const pausedProgressRef = useRef<number>(0);

  // Update visible cards based on screen size
  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1);
        setIsMobile(true);
      } else if (width < 1024) {
        setVisibleCards(2);
        setIsMobile(false);
      } else {
        setVisibleCards(3);
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
  const duplicatedFeatures = [...features, ...features, ...features];

  // Calculate responsive values
  const cardWidthPercentage = 100 / visibleCards;
  const gapRem = visibleCards === 1 ? 0 : 1;
  
  // Calculate move distance for one card width
  const moveDistancePercentage = cardWidthPercentage;
  
  // Animation duration
  const animationDuration = featuresLength * (visibleCards === 1 ? 3 : 4);

  // Mobile navigation functions
  const goToNext = useCallback(() => {
    if (isMobile && isInitialized) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [isMobile, isInitialized]);

  const goToPrev = useCallback(() => {
    if (isMobile && isInitialized) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [isMobile, isInitialized]);

  // Start animation (only for non-mobile)
  const startAnimation = useCallback((fromProgress: number = 0) => {
    if (isMobile || !canAnimate) return;
    
    const remainingProgress = 1 - fromProgress;
    const remainingDuration = animationDuration * remainingProgress;
    
    startTimeRef.current = Date.now() - (animationDuration * fromProgress * 1000);
    
    controls.start({
      x: [`${-moveDistancePercentage * featuresLength * fromProgress}%`, `-${moveDistancePercentage * featuresLength}%`],
      transition: {
        duration: remainingDuration,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 0,
      }
    });
  }, [isMobile, canAnimate, animationDuration, moveDistancePercentage, controls, featuresLength]);

  // Handle hover start (only for non-mobile)
  const handleHoverStart = useCallback(() => {
    if (isMobile || !canAnimate) return;
    
    setIsHovered(true);
    
    // Calculate current progress
    const currentTime = Date.now();
    const elapsed = (currentTime - startTimeRef.current) / 1000;
    const progress = (elapsed % animationDuration) / animationDuration;
    pausedProgressRef.current = progress;
    
    // Stop animation
    controls.stop();
  }, [isMobile, canAnimate, animationDuration, controls]);

  // Handle hover end (only for non-mobile)
  const handleHoverEnd = useCallback(() => {
    if (isMobile || !canAnimate) return;
    
    setIsHovered(false);
    
    // Resume animation from paused position
    startAnimation(pausedProgressRef.current);
  }, [isMobile, canAnimate, startAnimation]);

  // Initialize mobile position
  useEffect(() => {
    if (isMobile) {
      // Start from the middle set (index 0 of middle set)
      controls.set({ x: `-${featuresLength * 100}%` });
      setCurrentIndex(0);
      setIsInitialized(true);
    } else {
      setIsInitialized(true);
    }
  }, [isMobile, controls, featuresLength]);

  // Initialize animation on mount (only for non-mobile)
  useEffect(() => {
    if (canAnimate && !isMobile && isInitialized) {
      startAnimation(0);
    }
  }, [canAnimate, isMobile, isInitialized, startAnimation]);

  // Handle mobile slide animation
  useEffect(() => {
    if (isMobile && isInitialized) {
      // Start from the middle set of cards (features.length)
      const actualIndex = currentIndex + featuresLength;
      
      controls.start({
        x: `-${actualIndex * 100}%`,
        transition: {
          duration: 0.5,
          ease: "easeInOut"
        }
      }).then(() => {
        // Reset position without animation when at boundaries
        if (currentIndex >= featuresLength) {
          // Reset to beginning
          const newIndex = currentIndex - featuresLength;
          setCurrentIndex(newIndex);
          controls.set({ x: `-${(newIndex + featuresLength) * 100}%` });
        } else if (currentIndex < 0) {
          // Reset to end
          const newIndex = currentIndex + featuresLength;
          setCurrentIndex(newIndex);
          controls.set({ x: `-${(newIndex + featuresLength) * 100}%` });
        }
      }).catch(() => {
        // Handle any animation errors silently
      });
    }
  }, [currentIndex, isMobile, isInitialized, controls, featuresLength]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      controls.stop();
    };
  }, [controls]);

  if (!isInitialized) {
    return null; // or a loading skeleton
  }

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
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-[rgb(140,46,71)] transition-all duration-200 hover:scale-110"
                aria-label="Previous slide"
              >
                <FaArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-[rgb(140,46,71)] transition-all duration-200 hover:scale-110"
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
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
            >
              {duplicatedFeatures.map((item, index) => (
                <div
                  key={`${item.title}-${index}-${Math.floor(index / featuresLength)}`}
                  className="flex-shrink-0"
                  style={{
                    width: isMobile ? '100%' : `calc(${cardWidthPercentage}% - ${gapRem * 0.5}rem)`,
                    transform: 'translateZ(0)', // Force GPU acceleration
                  }}
                >
                  <FeatureCard
                    title={item.title}
                    description={item.desc}
                    index={index % featuresLength}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturesGrid;