import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Maximize2, Minimize2 } from "lucide-react";
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
        <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
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

  // Fullscreen Modal
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
        {/* Close Button */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[10000] bg-white/20 hover:bg-white/30 text-white border-0 p-2 sm:p-3"
          onClick={toggleFullscreen}
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>

        {/* Minimize Button */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 right-16 sm:top-6 sm:right-20 z-[10000] bg-white/20 hover:bg-white/30 text-white border-0 p-2 sm:p-3"
          onClick={toggleFullscreen}
        >
          <Minimize2 className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>

        {/* Main Fullscreen Image Container */}
        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
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
                className="absolute left-2 sm:left-6 top-1/2 hidden sm:block -translate-y-1/2 border-2 border-white bg-white/20 hover:bg-white/30 text-white p-2 sm:p-4 rounded-full"
                onClick={prevImage}
              >
                <FaArrowLeft className="w-4 h-4 sm:w-8 sm:h-8" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-2 sm:right-6 top-1/2 hidden sm:block -translate-y-1/2 border-2 border-white bg-white/20 hover:bg-white/30 text-white p-2 sm:p-4 rounded-full"
                onClick={nextImage}
              >
                <FaArrowRight className="w-4 h-4 sm:w-8 sm:h-8" />
              </Button>
            </>
          )}

          {/* Image Counter for Fullscreen */}
          {images.length > 1 && (
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 bg-white/20 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-lg font-medium">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Regular Gallery View
  return (
    <div className="w-full">
      {/* Main Image Container */}
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
            className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/80 hover:bg-white p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
          >
            <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 border-2 border-white/50 text-white hover:bg-white/20 hover:text-white opacity-70 group-hover:opacity-100 transition-all duration-200 p-2 sm:p-3 md:py-4"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <FaArrowLeft className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 border-2 border-white/50 text-white hover:bg-white/20 hover:text-white opacity-70 group-hover:opacity-100 transition-all duration-200 p-2 sm:p-3 md:py-4"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <FaArrowRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
              </Button>
            </>
          )}

          {/* Thumbnails overlaid at bottom of main image */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:bottom-4">
              <div className="rounded-lg p-2 sm:p-3">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-xs sm:max-w-sm md:max-w-md">
                  {images.slice(0, 6).map((image, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`relative overflow-hidden rounded-md transition-all duration-200 flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${
                        index === currentImageIndex
                          ? ""
                          : ""
                      }`}
                    >
                      <CldImage
                        width={80}
                        height={80}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        sizes="(max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 bg-blue-500/20"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dots Indicator */}
        {images.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-200 ${
                  index === currentImageIndex
                    ? "bg-black"
                    : "bg-transparent border border-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};