"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { amenitiesData } from "@/data/amenities";
import { AmenityData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";

const Amenities2 = () => {
  const [activeAmenity, setActiveAmenity] = useState<string>("location");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallTablet, setIsSmallTablet] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const amenityKeys = Object.keys(amenitiesData);
  const currentAmenity: AmenityData = amenitiesData[activeAmenity];
  const currentIndex = amenityKeys.indexOf(activeAmenity);

  // Check screen sizes
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsSmallTablet(width >= 768 && width < 1024);
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Parallax mouse movement (disabled on touch devices)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile && !isSmallTablet) {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 10 - 5,
          y: (e.clientY / window.innerHeight) * 10 - 5,
        });
      }
    };

    if (!isMobile && !isSmallTablet) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, isSmallTablet]);

  // Wrap handleAmenityClick in useCallback to fix dependency warning
  const handleAmenityClick = useCallback((amenityId: string) => {
    if (amenityId === activeAmenity) return;
    setActiveAmenity(amenityId);
  }, [activeAmenity]);

  // Navigate to next/previous amenity
  const navigateAmenity = useCallback((direction: 'next' | 'prev') => {
    const currentIdx = amenityKeys.indexOf(activeAmenity);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIdx === amenityKeys.length - 1 ? 0 : currentIdx + 1;
    } else {
      newIndex = currentIdx === 0 ? amenityKeys.length - 1 : currentIdx - 1;
    }
    
    handleAmenityClick(amenityKeys[newIndex]);
  }, [activeAmenity, amenityKeys, handleAmenityClick]);

  // Handle swipe gestures with proper typing
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const swipeVelocityThreshold = 500;
    
    if (Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.velocity.x) > swipeVelocityThreshold) {
      if (info.offset.x > 0) {
        navigateAmenity('prev');
      } else {
        navigateAmenity('next');
      }
    }
  };

  // Touch handlers for better mobile support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    const swipeThreshold = 50;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        navigateAmenity('next');
      } else {
        navigateAmenity('prev');
      }
    }
    
    setTouchStartX(0);
  };

  const isSliderMode = isMobile || isSmallTablet;

  return (
    <div className="w-full">
      {/* Title Section - Responsive */}
      <div className="relative z-20 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-[0.9] font-light">
          Live Close to Luxury
        </h1>
      </div>

      {/* Main Gallery Section - Reduced Heights for Mobile/Tablet */}
      <section 
        ref={containerRef}
        className={`
          relative w-full overflow-hidden
          ${isMobile ? 'h-[50vh] min-h-[400px]' : ''}
          ${isSmallTablet ? 'h-[60vh] min-h-[500px]' : ''}
          ${!isSliderMode ? 'h-[90vh] lg:h-screen min-h-[700px]' : ''}
        `}
      >
        {/* Animated Background Layers */}
        <motion.div 
          className="absolute inset-0"
          drag={isSliderMode ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={isSliderMode ? handleDragEnd : undefined}
          onTouchStart={isSliderMode ? handleTouchStart : undefined}
          onTouchEnd={isSliderMode ? handleTouchEnd : undefined}
        >
          {/* Primary Image Layer with Wave Transition */}
          <div className="absolute inset-0 w-full h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAmenity}
                className="absolute inset-0 w-full h-full"
                initial={{ 
                  clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"
                }}
                animate={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                  x: (!isMobile && !isSmallTablet) ? mousePosition.x * 0.3 : 0,
                  y: (!isMobile && !isSmallTablet) ? mousePosition.y * 0.3 : 0,
                }}
                exit={{ 
                  clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
                }}
                transition={{
                  clipPath: {
                    duration: 1.2,
                    ease: [0.76, 0, 0.24, 1]
                  },
                  x: (!isMobile && !isSmallTablet) ? { type: "spring", stiffness: 80, damping: 40 } : {},
                  y: (!isMobile && !isSmallTablet) ? { type: "spring", stiffness: 80, damping: 40 } : {},
                }}
                style={{ 
                  transformStyle: (!isMobile && !isSmallTablet) ? "preserve-3d" : "flat",
                  perspective: (!isMobile && !isSmallTablet) ? "1000px" : "none"
                }}
              >
                <CldImage
                  src={currentAmenity.image}
                  alt={currentAmenity.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  priority
                />
                {/* Responsive Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 lg:to-black/50" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 sm:from-black/80 via-black/30 sm:via-black/10 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Wave Overlay Effect */}
            <AnimatePresence>
              <motion.div
                key={`wave-${activeAmenity}`}
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Multiple wave layers for smoother effect */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0"
                    initial={{
                      background: `linear-gradient(90deg, 
                        transparent 0%, 
                        rgba(255,255,255,${0.1 - i * 0.03}) 50%, 
                        transparent 100%
                      )`,
                      x: "-100%"
                    }}
                    animate={{
                      x: "100%"
                    }}
                    transition={{
                      duration: 1.5,
                      ease: [0.76, 0, 0.24, 1],
                      delay: i * 0.1
                    }}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Main Content - Different layouts for slider vs desktop */}
        <div className="relative z-10 h-full flex flex-col lg:flex-row">
          {/* Desktop Layout - Left Panel */}
          {!isSliderMode && (
            <motion.div
              className="w-full lg:w-80 xl:w-96 2xl:w-[420px] h-full relative flex flex-col flex-shrink-0"
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.4,
              }}
            >
              {/* Enhanced Glass Morphism Panel */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              <div className="relative h-full flex flex-col px-8 py-12">
                {/* Sidebar Header */}
                <motion.div
                  className="mb-10 flex-shrink-0"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <div className="text-center">
                    <span className="text-xs font-semibold tracking-[0.25em] text-white/50 uppercase">
                      Discover
                    </span>
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mt-4 mx-auto" />
                  </div>
                </motion.div>

                {/* Enhanced Amenity Navigation */}
                <motion.div
                  className="flex-1 flex flex-col justify-center items-stretch space-y-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  {amenityKeys.map((amenityKey, index) => {
                    const amenity = amenitiesData[amenityKey];
                    const isActive = activeAmenity === amenityKey;

                    return (
                      <motion.div
                        key={amenityKey}
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 1.2 + index * 0.1,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      >
                        <Button
                          onClick={() => handleAmenityClick(amenityKey)}
                          className={`
                            group relative w-full text-left transition-all duration-500 ease-out overflow-hidden
                            py-5 px-6 bg-transparent border-0
                            ${isActive 
                              ? "bg-white/8 shadow-lg" 
                              : "hover:bg-white/5"
                            }
                          `}
                        >
                          {/* Background Animation */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
                            initial={false}
                            animate={{
                              scaleX: isActive ? 1 : 0,
                              opacity: isActive ? 1 : 0,
                            }}
                            transition={{ 
                              duration: 0.6, 
                              ease: [0.16, 1, 0.3, 1],
                              scaleX: { velocity: 0 }
                            }}
                          />

                          <div className="relative flex items-center gap-5 w-full">
                            {/* Enhanced Number Badge */}
                            <motion.div
                              className={`
                                flex items-center justify-center border transition-all duration-500 flex-shrink-0
                                w-8 h-8
                                ${isActive
                                  ? "border-white/60 bg-white/15 text-white shadow-md scale-110"
                                  : "border-white/25 text-white/50 group-hover:border-white/40 group-hover:text-white/70 group-hover:scale-105"
                                }
                              `}
                              animate={{
                                rotate: isActive ? 360 : 0,
                              }}
                              transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            >
                              <span className="font-bold text-xs">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </motion.div>

                            {/* Amenity Name Container */}
                            <div className="flex items-center justify-between flex-1 mt-4">
                              <AnimatePresence mode="wait">
                                <motion.h4
                                  key={`${amenityKey}-${isActive}`}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{
                                    duration: 0.3,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                  className={`
                                    font-medium transition-all duration-500 text-lg
                                    ${isActive
                                      ? "text-white"
                                      : "text-white/75 group-hover:text-white/95"
                                    }
                                  `}
                                >
                                  {amenity.name}
                                </motion.h4>
                              </AnimatePresence>
                            </div>
                          </div>

                          {/* Subtle hover glow */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </Button>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Desktop Right Panel - Image Title Overlay */}
          {!isSliderMode && (
            <div className="flex-1 h-full relative">
              <div className="absolute inset-4 pointer-events-none z-10" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAmenity}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 1.05 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.1,
                  }}
                  className="absolute bottom-6 left-6 right-6 z-20"
                >
                  <div className="p-5 shadow-2xl">
                    <div className="text-center">
                      <div className="inline-block mb-2">
                        <span className="text-xs font-medium tracking-[0.3em] text-white uppercase">
                          Experience
                        </span>
                      </div>
                      <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-light text-white leading-tight">
                        {currentAmenity.name}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile/Tablet Slider Interface */}
        {isSliderMode && (
          <>
            {/* Bottom Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-3 sm:p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAmenity}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="borderp-4 sm:p-5 text-center"
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-light text-white mb-3">
                    {currentAmenity.name}
                  </h3>
                 
                  {/* Progress Dots */}
                  <div className="flex justify-center gap-2">
                    {amenityKeys.map((key, index) => (
                      <button
                        key={key}
                        onClick={() => handleAmenityClick(key)}
                        className={`
                          w-2 h-2 rounded-full transition-all duration-300
                          ${index === currentIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white/30 hover:bg-white/50'
                          }
                        `}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows for Tablets */}
            {isSmallTablet && (
              <>
                <button
                  onClick={() => navigateAmenity('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/30 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300"
                >
                  <FaArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigateAmenity('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300"
                >
                  <FaArrowRight className="w-5 h-5" />
                </button>
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Amenities2;