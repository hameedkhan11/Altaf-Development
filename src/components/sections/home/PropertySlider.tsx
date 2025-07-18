"use client";
import React, { useState, useEffect, useMemo } from 'react';
import {  AnimatePresence } from 'framer-motion';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import {
  fadeInUp,
  slideInFromBottom,
  microSlide,
  shouldAnimate,
  simpleFadeSlide
} from '@/lib/constants';
import { AnimatedH1 } from '@/components/ui/text-animations';

// Property data - moved outside component to prevent recreating on each render
const showcaseProperties = [
  {
    id: 1,
    title: "Luxury Villa Paradise",
    location: "Beverly Hills, CA",
    price: "$2,850,000",
    image: "imgi_21_IjGNDVkEAbAhpxd8VU8yRt7KGM_exhsbq",
    beds: 5,
    baths: 4,
    sqft: "3,200",
    rating: 4.9,
    type: "Villa",
    features: ["Swimming Pool", "Garden", "Garage", "Security"],
    description: "Experience luxury living in this stunning villa with panoramic city views."
  },
  {
    id: 2,
    title: "Modern Downtown Penthouse",
    location: "Manhattan, NY",
    price: "$4,200,000",
    image: "imgi_28_hFGYVnlwaecZbMBXIolx5d7ExQ_uo5x2i",
    beds: 3,
    baths: 3,
    sqft: "2,800",
    rating: 4.8,
    type: "Penthouse",
    features: ["City View", "Rooftop Access", "Modern Kitchen", "Elevator"],
    description: "Sophisticated penthouse offering the ultimate urban lifestyle experience."
  },
  {
    id: 3,
    title: "Oceanfront Estate",
    location: "Malibu, CA",
    price: "$6,750,000",
    image: "Booking1_rg1bhs",
    beds: 6,
    baths: 5,
    sqft: "4,500",
    rating: 5.0,
    type: "Estate",
    features: ["Ocean View", "Private Beach", "Wine Cellar", "Guest House"],
    description: "Exclusive oceanfront estate with private beach access and stunning sunset views."
  },
  {
    id: 4,
    title: "Mountain Retreat Cabin",
    location: "Aspen, CO",
    price: "$1,850,000",
    image: "Booking3_uieo5a",
    beds: 4,
    baths: 3,
    sqft: "2,400",
    rating: 4.7,
    type: "Cabin",
    features: ["Mountain View", "Fireplace", "Ski Access", "Hot Tub"],
    description: "Charming mountain retreat perfect for year-round outdoor adventures."
  }
];

const PropertyShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [, setIsMobile] = useState(false);
  const [, setDirection] = useState(0);

  // Memoize performance checks
  const animationEnabled = useMemo(() => shouldAnimate(), []);
  // const performanceMode = useMemo(() => getPerformanceMode(), []);

  // Memoize current property to prevent unnecessary recalculations
  const currentProperty = useMemo(() => showcaseProperties[currentIndex], [currentIndex]);

  // Optimized mobile detection with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100); // Debounce resize events
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Optimized auto-switch with proper cleanup
  useEffect(() => {
    if (!isHovered && animationEnabled) {
      const interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % showcaseProperties.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isHovered, animationEnabled]);

  // Memoized navigation functions
  // const nextSlide = useCallback(() => {
  //   setDirection(1);
  //   setCurrentIndex((prev) => (prev + 1) % showcaseProperties.length);
  // }, []);

  // const prevSlide = useCallback(() => {
  //   setDirection(-1);
  //   setCurrentIndex((prev) => (prev - 1 + showcaseProperties.length) % showcaseProperties.length);
  // }, []);

  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-[110vh] w-full overflow-hidden">
      {/* Background Images with Simple Fade Effect */}
      <div className="absolute inset-0 bg-black">
        <AnimatePresence initial={false} mode="popLayout">
          <div
            key={currentIndex}
            {...simpleFadeSlide}
            className="absolute inset-0 z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CldImage
              src={currentProperty.image}
              alt={currentProperty.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls - Only show on larger screens or when hovered */}
      {/* <motion.button
        onClick={prevSlide}
        className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 ${
          isMobile ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } md:opacity-100`}
        {...scaleOnHover}
        {...fadeInLeft}
      >
        <ChevronLeft size={isMobile ? 20 : 24} />
      </motion.button> */}

      {/* <motion.button
        onClick={nextSlide}
        className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 ${
          isMobile ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } md:opacity-100`}
        {...scaleOnHover}
        {...fadeInRight}
      >
        <ChevronRight size={isMobile ? 20 : 24} />
      </motion.button> */}

      {/* Main Content Overlay */}
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="w-full p-4 sm:p-6 md:p-8 lg:p-12">
          <div 
            className="max-w-4xl mx-auto"
            {...fadeInUp}
          >
            <div className="mb-4 sm:mb-6" {...microSlide}>
              
              <AnimatedH1
                className="text-xl sm:text-2xl md:text-3xl text-center lg:text-4xl text-white leading-tight px-2 sm:px-4"
                {...slideInFromBottom}
              >
                {currentProperty.title}
              </AnimatedH1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyShowcase;