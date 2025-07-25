"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { CldImage } from 'next-cloudinary';


// Property data
const showcaseProperties = [
  {
    id: 1,
    title: "Grand Lobby",
    image: "imgi_21_IjGNDVkEAbAhpxd8VU8yRt7KGM_exhsbq",
  },
  {
    id: 2,
    title: "Dream suite",
    image: "imgi_28_hFGYVnlwaecZbMBXIolx5d7ExQ_uo5x2i",
  },
  {
    id: 3,
    title: "Oceanfront Estate",
    image: "Booking1_rg1bhs",
  },
  {
    id: 4,
    title: "Mountain Retreat Cabin",
    image: "Booking3_uieo5a",
  }
];

// Simple fade animation for text content
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeIn" } }
};

const PropertyShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const newIndex = (prev + 1) % showcaseProperties.length;
        setPrevIndex(prev);
        return newIndex;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);


  const currentProperty = showcaseProperties[currentIndex];

  return (
    // UPDATED:
    // - On small screens, use a 16:9 aspect ratio. This ensures the full image is seen and reduces the component height.
    // - On large screens (lg: and up), revert to h-screen for the immersive desktop experience.
    // - lg:aspect-auto removes the aspect ratio constraint on large screens.
    <div className="relative w-full overflow-hidden bg-gray-900 aspect-[6/7] lg:aspect-auto lg:h-screen">
      {/* Background Images with Progressive Width Transition */}
      <div className="absolute inset-0 flex">
        {/* Previous Image - shrinks during transition */}
        <motion.div
          key={`prev-${prevIndex}`}
          className="relative overflow-hidden"
          initial={{ width: "100%" }}
          animate={{ 
            width: currentIndex !== prevIndex ? "0%" : "100%",
            transition: { duration: 2, ease: "easeInOut" }
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <CldImage
            src={showcaseProperties[prevIndex].image}
            alt={showcaseProperties[prevIndex].title}
            fill
            sizes="100vw"
            // NOTE: object-cover now works as intended because the container has the correct aspect ratio
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
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
            src={currentProperty.image}
            alt={currentProperty.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </motion.div>
      </div>

      {/* Content Overlay - Only Title */}
      <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 lg:bottom-16 left-0 right-0 z-10 text-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentIndex}
            variants={fadeInVariants as Variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white px-4 sm:px-6 md:px-8 drop-shadow-lg"
          >
            {currentProperty.title}
          </motion.h1>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PropertyShowcase;