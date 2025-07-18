// components/media/Lightbox.tsx
"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Download, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface LightboxProps {
  selectedImage: number | null;
  filteredImages: Array<{
    id: string;
    src: string;
    alt: string;
    category: string;
    title?: string;
    description?: string;
    photographer?: string;
    date?: string;
    tags?: string[];
  }>;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  selectedImage,
  filteredImages,
  onClose,
  onNext,
  onPrev,
}) => {
  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedImage === null) return;
    
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        onPrev();
        break;
      case 'ArrowRight':
        onNext();
        break;
    }
  }, [selectedImage, onClose, onNext, onPrev]);

  useEffect(() => {
    if (selectedImage !== null) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = 'hidden';
      
      // Hide header when lightbox is open
      const header = document.querySelector('header');
      const navbar = document.querySelector('nav');
      const headerElements = document.querySelectorAll('[data-header], .header, .navbar, .navigation');
      
      if (header) header.style.display = 'none';
      if (navbar) navbar.style.display = 'none';
      headerElements.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
        
        // Restore header when lightbox is closed
        if (header) header.style.display = '';
        if (navbar) navbar.style.display = '';
        headerElements.forEach(el => {
          (el as HTMLElement).style.display = '';
        });
      };
    }
  }, [selectedImage, handleKeyDown]);

  // Helper function to get high-resolution Cloudinary URL
  const getHighResImageUrl = (src: string) => {
    if (!src.includes('cloudinary.com')) {
      return src; // Return original if not a Cloudinary URL
    }
    
    // Extract the base URL and image path
    const parts = src.split('/upload/');
    if (parts.length !== 2) return src;
    
    const [baseUrl, imagePath] = parts;
    
    // Add transformation parameters for high-resolution lightbox display
    const transformations = [
      'w_1920',
      'h_1080',
      'c_limit',
      'f_auto',
      'q_auto:best',
      'dpr_auto'
    ].join(',');
    
    return `${baseUrl}/upload/${transformations}/${imagePath}`;
  };

  if (selectedImage === null || !filteredImages[selectedImage]) return null;

  const currentImage = filteredImages[selectedImage];
  const isFirst = selectedImage === 0;
  const isLast = selectedImage === filteredImages.length - 1;

  return (
    <AnimatePresence>
      {selectedImage !== null && (
        <>
          {/* Backdrop - Full screen overlay */}
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Lightbox Container - Full screen */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-[10000] text-white hover:bg-white/10 hover:text-white"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation Buttons */}
            {!isFirst && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[10000] text-white hover:bg-white/10 hover:text-white"
                onClick={onPrev}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            )}

            {!isLast && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[10000] text-white hover:bg-white/10 hover:text-white"
                onClick={onNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            )}

            {/* Main Content */}
            <motion.div
              className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Image Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative max-w-full max-h-full">
                  <Image
                    src={getHighResImageUrl(currentImage.src)}
                    alt={currentImage.alt}
                    width={1920}
                    height={1080}
                    className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                    priority
                    onError={(e) => {
                      // Fallback to original URL if optimized URL fails
                      const target = e.target as HTMLImageElement;
                      target.src = currentImage.src;
                    }}
                  />
                </div>
              </div>

              {/* Image Info Panel */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md rounded-lg p-4 text-white"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">
                      {currentImage.title || currentImage.alt}
                    </h3>
                    {currentImage.description && (
                      <p className="text-sm text-gray-300 mb-2">
                        {currentImage.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      {currentImage.photographer && (
                        <span>By {currentImage.photographer}</span>
                      )}
                      {currentImage.date && (
                        <span>{new Date(currentImage.date).toLocaleDateString()}</span>
                      )}
                      <span className="capitalize">{currentImage.category.replace('-', ' ')}</span>
                      <span>{selectedImage + 1} of {filteredImages.length}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/10 hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/10 hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/10 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Create a download link
                        const link = document.createElement('a');
                        link.href = currentImage.src;
                        link.download = currentImage.title || currentImage.alt;
                        link.target = '_blank';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Tags */}
                {currentImage.tags && currentImage.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {currentImage.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;