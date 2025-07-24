// components/property/Lightbox.tsx
"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${currentImage.src}`;
    link.download = `${currentImage.alt || "image"}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
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
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute top-4 left-4 z-40 text-white text-sm">
          {selectedImage + 1} / {filteredImages.length}
        </div>

        {/* Main image display */}
        <div 
          className="flex items-center justify-center h-full w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={currentImage.id}
            className="relative max-w-[90vw] max-h-[90vh]"
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
              className="max-h-[80vh] max-w-full object-contain rounded-lg"
              crop="fill"
              gravity="auto"
              quality="auto"
              format="auto"
            />
          </motion.div>
        </div>

        {/* Image info panel */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  {currentImage.title || currentImage.alt}
                </h2>
                {currentImage.description && (
                  <p className="text-gray-300 mb-2">
                    {currentImage.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {currentImage.category && (
                    <Badge variant="secondary" className="bg-white/10 text-white">
                      {currentImage.category.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </Badge>
                  )}
                  {currentImage.tags?.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-gray-300 border-white/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;