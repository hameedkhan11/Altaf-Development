"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { testimonials } from "@/data/testimonials";
import Image from "next/image";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  // Star Rating Component
  const StarRating = ({ rating = 5 }: { rating?: number }) => {
    return (
      <div className="flex items-center justify-center gap-1 mb-2">
        {[...Array(5)].map((_, index) => (
          <motion.svg
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: 2.5 + (index * 0.1),
              ease: "easeOut"
            }}
            className={`w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 ${
              index < rating ? "text-yellow-400" : "text-white/30"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </motion.svg>
        ))}
      </div>
    );
  };

  return (
    <section className="relative">
      {/* Header Section */}
      <div className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="mx-auto relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-3 md:mb-4 dark:text-white leading-tight"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              What Our Clients Say
            </motion.h2>
            <motion.p
              className="text-xs sm:text-sm md:text-base lg:text-lg mx-auto px-2 sm:px-4 md:px-0 mb-10 sm:mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Hear from our satisfied clients about their experience with ALTAF DEVELOPMENT.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Testimonial Slider with Curtain Effect */}
      <div
        className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[70vh] xl:h-[75vh] 2xl:h-[80vh] w-full overflow-hidden -mt-12"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <CldImage
            src="testimonialImage_etg2ca"
            alt="Modern living room interior"
            fill
            className="object-cover"
            quality="auto"
            format="auto"
            sizes="100vw"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/60 to-black/40" />
        </div>

        {/* Curtain Effect - Opens from both sides - Perfect scroll timing */}
        <motion.div 
          className="absolute inset-0 w-full h-full bg-white z-10"
          initial={{ clipPath: "inset(0 50% 0 0)" }}
          whileInView={{ clipPath: "inset(0 100% 0 0)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ 
            duration: 1.8, 
            delay: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        />

        {/* Second curtain for dual-side effect */}
        <motion.div 
          className="absolute inset-0 w-full h-full bg-white z-10"
          initial={{ clipPath: "inset(0 0 0 50%)" }}
          whileInView={{ clipPath: "inset(0 0 0 100%)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ 
            duration: 1.8, 
            delay: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        />

        {/* Content */}
        <motion.div 
          className="relative z-20 h-full flex flex-col justify-center items-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ 
            duration: 0.8, 
            delay: 1.8,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <div className="w-full max-w-4xl sm:max-w-5xl md:max-w-6xl lg:max-w-7xl">
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Quote */}
                  <blockquote className="text-white text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl font-light leading-relaxed max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-8 px-2 sm:px-4 md:px-0">
                    &quot;{currentTestimonial.content}&quot;
                  </blockquote>

                  {/* Profile */}
                  <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                    <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:w-22 xl:h-22 rounded-full overflow-hidden border-2 border-white/20 shadow-lg flex-shrink-0">
                      <Image
                        src={currentTestimonial?.image || "default-avatar"}
                        alt={currentTestimonial?.name}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="text-left mt-8">
                      <p className="text-white text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl font-semibold -mb-2">
                        {currentTestimonial?.name}
                      </p>
                      <p className="text-white/80 text-xs xs:text-sm sm:text-base md:text-base lg:text-lg mb-1">
                        {currentTestimonial?.role}
                      </p>
                      {/* Star Rating */}
                      <StarRating rating={4.5} />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Navigation - Reduced size on large devices */}
            <div className="flex justify-center items-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16 gap-2 sm:gap-3 md:gap-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-3 lg:h-3 xl:w-3 xl:h-3 2xl:w-3 2xl:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;