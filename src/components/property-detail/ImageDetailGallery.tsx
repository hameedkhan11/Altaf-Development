import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {  X, Maximize2, Minimize2 } from "lucide-react";
import { CldImage } from "next-cloudinary";
import sanityService from "@/lib/sanityService";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

interface ImageGalleryProps {
  propertyType: "1bed" | "2bed";
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ propertyType }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageUrls = await sanityService.getPropertyImagesByType(propertyType);
        if (imageUrls.length === 0) {
          // Fallback to get all images if no specific property type found
          const allImages = await sanityService.getAllPropertyImages();
          setImages(allImages);
        } else {
          setImages(imageUrls);
        }
      } catch (error) {
        console.error('Error fetching property images:', error);
        // Set empty array as fallback
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [propertyType]);

  const nextImage = (): void => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (): void => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  // Loading state
  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-pulse">
          <div className="bg-gray-200 w-full aspect-[4/3] rounded-lg"></div>
        </div>
        <div className="mt-3 grid grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 w-full aspect-square rounded-lg"></div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  // No images available
  if (images.length === 0) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-center w-full aspect-[4/3] bg-gray-100 rounded-lg">
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  // Fullscreen Modal - NO THUMBNAILS IN FULLSCREEN
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
        {/* Close Button */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-6 right-6 z-[10000] bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 p-3"
          onClick={toggleFullscreen}
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Minimize Button */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-6 right-20 z-[10000] bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 p-3"
          onClick={toggleFullscreen}
        >
          <Minimize2 className="w-6 h-6" />
        </Button>

        {/* Main Fullscreen Image Container */}
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <CldImage
            width={1920}
            height={1080}
            src={images[currentImageIndex]}
            alt={`Property view ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
            sizes="100vw"
            priority
          />

          {/* Navigation Arrows for Fullscreen */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="absolute left-6 top-1/2 -translate-y-1/2 border-2 border-white bg-transparent backdrop-blur-sm hover:bg-white/30 text-white p-4 rounded-full "
                onClick={prevImage}
              >
                <FaArrowLeft className="w-12 h-12" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-6 top-1/2 -translate-y-1/2 border-2 border-white bg-transparent backdrop-blur-sm hover:bg-white/30 text-white p-4 rounded-full"
                onClick={nextImage}
              >
                <FaArrowRight className="w-12 h-12" />
              </Button>
            </>
          )}

          {/* Image Counter for Fullscreen */}
          {images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-6 py-3 rounded-full text-lg font-medium">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Regular Gallery View - Matching the exact layout from your image
  return (
    <div className="w-full">
      {/* Main Image Container with same aspect ratio */}
      <div className="relative group">
        <div 
          className="relative overflow-hidden rounded-lg bg-white shadow-lg cursor-pointer w-full aspect-[4/3]"
          onClick={toggleFullscreen}
        >
          <CldImage
            width={800}
            height={600}
            src={images[currentImageIndex]}
            alt={`Property view ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
          />

          {/* Fullscreen Button */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
          >
            <Maximize2 className="w-4 h-4" />
          </Button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-transparent border-2 text-white  hover:text-black  opacity-0 group-hover:opacity-100 transition-opacity duration-200 py-4"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <FaArrowLeft className="w-8 h-8" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-transparent border-2 text-white opacity-0 group-hover:opacity-100 hover:text-black transition-opacity duration-200 py-4"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <FaArrowRight className="w-8 h-8" />
              </Button>
            </>
          )}
        </div>

        {/* Thumbnail Images Grid - Bottom of main image */}
        {/* {images.length > 1 && (
          <div className="mt-3 grid grid-cols-6 gap-2">
            {images.slice(0, 6).map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative overflow-hidden rounded-lg transition-all duration-200 aspect-square ${
                  index === currentImageIndex
                    ? "ring-2 ring-blue-500"
                    : "hover:ring-2 hover:ring-gray-300"
                }`}
              >
                <CldImage
                  width={120}
                  height={120}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 15vw, 10vw"
                />
                {index === currentImageIndex && (
                  <div className="absolute inset-0 bg-blue-500/20"></div>
                )}
              </button>
            ))}
          </div>
        )} */}

        {/* Dots Indicator - Under thumbnails */}
        {images.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex
                    ? "bg-black"
                    : "border border-gray-600 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};