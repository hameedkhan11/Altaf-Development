// ProjectCard.jsx
import React from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { TbRulerMeasure } from "react-icons/tb";
import { ProjectCardProps } from "@/lib/types";

export const ProjectCard = ({
  image,
  title,
  price,
  bedrooms,
  bathrooms,
  propertyType = "1bed",
}: ProjectCardProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.3
  });

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  };

  const imageVariants = {
    hidden: { 
      scale: 1.05, 
      opacity: 0.7
    },
    visible: { 
      scale: 1, 
      opacity: 1
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  const priceTagVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  };

  return (
    <motion.div 
      ref={ref}
      className="w-full max-w-full"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
        staggerChildren: 0.1
      }}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Card Container */}
      <div className="bg-white rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group w-full">
        {/* Image Container */}
        {/* 
          UPDATED: Replaced the chain of fixed height classes 
          (h-64 xs:h-72 sm:h-80 md:h-96 lg:h-[400px] xl:h-[440px])
          with a single aspect-ratio class 'aspect-[4/3]'.
          This makes the image container fully responsive.
        */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Link
            href={`/property-detail?property=${propertyType}`}
            className="block w-full h-full cursor-pointer"
          >
            {/* Single Image - No hover effect */}
            <motion.div
              variants={imageVariants}
              transition={{
                duration: 0.8,
                ease: "easeInOut"
              }}
              className="absolute inset-0 w-full h-full"
              style={{ willChange: 'transform, opacity' }}
            >
              <CldImage
                loading="lazy"
                src={image}
                alt={title}
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 767px) 100vw, 50vw" // Simplified sizes prop for clarity
                priority={false}
              />
            </motion.div>

            {/* Dark Gradient Overlay for Price */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>

            {/* Price Tag */}
            <motion.div
              className="absolute bottom-2 left-2 xs:bottom-3 xs:left-3 sm:bottom-4 sm:left-4 text-white px-2 py-1 xs:px-3 xs:py-2 sm:px-4 sm:py-3 text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold ml-4"
              variants={priceTagVariants}
              transition={{
                duration: 0.4,
                delay: 0.3,
                ease: "easeOut"
              }}
              style={{ willChange: 'transform, opacity' }}
            >
              {price}
            </motion.div>
          </Link>
        </div>

        {/* Content Container */}
        <motion.div 
          className="p-3 xs:p-4 sm:p-6 md:p-8 space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-6"
          variants={contentVariants}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: "easeOut"
          }}
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Property Title and Location */}
          <div className="space-y-1 sm:space-y-2">
            <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-tight">
              {title}
            </h3>
            <p className="text-sm xs:text-base sm:text-lg text-gray-600">Faisal Hills Islamabad</p>
          </div>

          {/* Property Details */}
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 md:space-x-6 text-xs xs:text-sm sm:text-base md:text-lg">
              <div className="flex items-center space-x-1">
                <IoBedOutline className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">{bedrooms} Bed</span>
              </div>
              <span className="text-gray-300">|</span>
              <div className="flex items-center space-x-1">
                <LuBath className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">{bathrooms} Bath</span>
              </div>
              <span className="text-gray-300">|</span>
              <div className="flex items-center space-x-1">
                <TbRulerMeasure className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">{propertyType === "1bed" ? "850 SQFt" : "1,600 SQFt"}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};