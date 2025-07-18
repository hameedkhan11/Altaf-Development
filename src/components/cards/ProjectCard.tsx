import React from "react";
import { ArrowUpRight } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import { ProjectCardProps } from "@/lib/types";
import { AnimatedP } from "../ui/text-animations";

export const ProjectCard = ({
  image,
  title,
  price,
  bedrooms,
  bathrooms,
  propertyType = "1bed",
}: ProjectCardProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        staggerChildren: 0.1
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0.8 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut"
      }
    }
  };

  const contentCardVariants = {
    hidden: { 
      y: "100%", 
      opacity: 0,
      scale: 0.9,
      backdropFilter: "blur(0px)"
    },
    visible: { 
      y: "50%", 
      opacity: 1,
      scale: 1,
      backdropFilter: "blur(10px)",
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      ref={ref}
      className="w-full overflow-hidden"
      variants={cardVariants as Variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Image Container */}
      <div className="relative group">
        <Link
          href={`/property-detail?property=${propertyType}`}
          className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[460px] overflow-hidden cursor-pointer block"
        >
          <motion.div
            variants={imageVariants as Variants}
            className="w-full h-full"
          >
            <CldImage
              loading="lazy"
              src={image}
              alt={title}
              width={800}
              height={400}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={false}
            />
          </motion.div>
          
          {/* Dark overlay that appears on hover */}
          <motion.div 
            className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 sm:p-6"
            variants={overlayVariants as Variants}
            initial="hidden"
            whileHover="visible"
          >
            {/* View Apartment text and icon at bottom */}
            <div className="flex justify-between items-center">
              <span className="text-white text-lg sm:text-xl">
                View Apartment
              </span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Hover Content Card */}
          <motion.div
            className="absolute inset-x-4 sm:inset-x-6 bottom-4 sm:bottom-6 bg-white/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-2xl border border-white/20"
            variants={contentCardVariants as Variants}
            initial="hidden"
            whileHover="visible"
          >
            <div className="space-y-4">
              {/* Property Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                {title}
              </h3>
              
              {/* Property Details Grid */}
              <div className="grid grid-cols-3 gap-4 text-center">
                {/* Price */}
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Price</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">{price}</p>
                </div>
                
                {/* Bedrooms */}
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Bedrooms</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">{bedrooms}</p>
                </div>
                
                {/* Bathrooms */}
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Bathrooms</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">{bathrooms}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
      
      {/* Original Content Container - keeping as per your request */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* Property Details */}
        <div className="space-y-8 sm:space-y-12 grid grid-cols-3">
          {/* Price */}
          <div>
            <AnimatedP className="text-base sm:text-lg md:text-xl mb-1">Price</AnimatedP>
            <span className="text-lg sm:text-xl md:text-2xl">{price}</span>
          </div>
          {/* Bedrooms */}
          <div className="flex flex-col items-center">
            <span className="font-optima text-base sm:text-lg md:text-xl">Bedrooms</span>
            <span className="font-optima text-lg sm:text-xl md:text-2xl">
              {bedrooms}
            </span>
          </div>
                     
          {/* Bathrooms */}
          <div className="flex flex-col items-center">
            <span className="font-optima text-base sm:text-lg md:text-xl">Bathrooms</span>
            <span className="text-lg sm:text-xl md:text-2xl font-optima">{bathrooms}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};