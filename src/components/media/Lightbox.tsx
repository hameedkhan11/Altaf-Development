// components/property/Lightbox.tsx
"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { Button } from "@/components/ui/button";

interface LightboxImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
}

interface LightboxProps {
  selectedImage: number | null;
  filteredImages: LightboxImage[];
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
  const currentImage = selectedImage !== null ? filteredImages[selectedImage] : null;

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          onNext();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        default:
          break;
      }
    },
    [selectedImage, onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (selectedImage !== null) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage, handleKeyDown]);

  if (selectedImage === null || !currentImage) return null;


  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Navigation buttons */}
        {filteredImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </>
        )}
        {/* Main image display */}
        <div 
          className="flex items-center justify-center h-full w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={currentImage.id}
            className="relative max-w-[95vw] max-h-[95vh] md:max-w-[90vw] md:max-h-[90vh]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <CldImage
              src={currentImage.src}
              alt={currentImage.alt}
              width={1920}
              height={1080}
              className="max-h-[90vh] max-w-full object-contain rounded-lg md:max-h-[80vh]"
              crop="fill"
              gravity="auto"
              quality="auto"
              format="auto"
              aria-label="Lightbox image"
            />
          </motion.div>
        </div>

        {/* Simplified image info panel - only title */}
        {/* <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg md:text-xl font-bold text-white text-center">
              {currentImage.title || currentImage.alt}
            </h2>
          </div>
        </motion.div> */}
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;