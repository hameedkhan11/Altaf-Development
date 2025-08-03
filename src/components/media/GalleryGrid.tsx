// components/media/GalleryGrid.tsx
"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryGridProps {
  filteredImages: Array<{
    id: string;
    src: string;
    alt: string;
    category: string;
    title?: string;
  }>;
  isInView: boolean;
  onImageClick: (index: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({
  filteredImages,
  isInView,
  onImageClick,
  // searchTerm,
  setSearchTerm,
  // filter,
  setFilter
}) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = useCallback((imageId: string) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
  }, []);

  // Generate Cloudinary optimized URL
  const getOptimizedImageUrl = (originalUrl: string, width: number, height: number) => {
    if (!originalUrl.includes('cloudinary.com')) {
      return originalUrl; // Return original if not a Cloudinary URL
    }
    
    // Extract the base URL and image path
    const parts = originalUrl.split('/upload/');
    if (parts.length !== 2) return originalUrl;
    
    const [baseUrl, imagePath] = parts;
    
    // Add transformation parameters for optimization
    const transformations = [
      `w_${width}`,
      `h_${height}`,
      'c_fill',
      'f_auto',
      'q_auto',
      'dpr_auto'
    ].join(',');
    
    return `${baseUrl}/upload/${transformations}/${imagePath}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  if (filteredImages.length === 0) {
    return (
      <motion.div 
        className="text-center py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Search className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
        <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
          No images found
        </h3>
        <p className="text-gray-400 dark:text-gray-500">
          Try adjusting your search or filter criteria
        </p>
        <Button
          onClick={() => {
            setSearchTerm('');
            setFilter('all');
          }}
          variant="outline"
          className="mt-4"
          aria-label="Clear Filters"
        >
          Clear Filters
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <AnimatePresence mode="popLayout">
        {filteredImages.map((image, index) => (
          <motion.div
            key={image.id}
            variants={itemVariants as Variants}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
            className="group relative aspect-[4/3] overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            onClick={() => onImageClick(index)}
            whileHover={{ y: -8 }}
          >
            {/* Loading Skeleton */}
            {!loadedImages.has(image.id) && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse rounded-xl" />
            )}

            <Image
              src={getOptimizedImageUrl(image.src, 400, 300)}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
              onLoad={() => handleImageLoad(image.id)}
              onError={(e) => {
                // Fallback to original URL if optimized URL fails
                const target = e.target as HTMLImageElement;
                target.src = image.src;
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 6}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl" />
            
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl">
              <h3 className="text-white font-semibold text-lg">
                {image.title || image.alt}
              </h3>
              <p className="text-white/80 text-sm capitalize mt-1">
                {image.category.replace("-", " ")}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default GalleryGrid;