import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CldImage } from "next-cloudinary";
import sanityService from "@/lib/sanityService";

interface ImageGalleryProps {
  propertyType: "1bed" | "2bed";
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ propertyType }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="lg:col-span-3 space-y-4">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-64 sm:h-80 md:h-96 lg:h-[27rem] xl:h-[32rem] rounded-lg"></div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-16 sm:h-20 md:h-24 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center justify-center h-64 sm:h-80 md:h-96 lg:h-[27rem] xl:h-[32rem] bg-gray-100 rounded-lg">
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-3 space-y-4">
      {/* Main Image */}
      <div className="relative group">
        <div className="relative overflow-hidden rounded-lg bg-white shadow-lg cursor-pointer">
          <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[27rem] xl:h-[32rem]">
            <CldImage
              width={800}
              height={600}
              src={`${currentImageIndex ? images[currentImageIndex] : images[0]}`}
              alt={`Property view ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 sm:p-2"
                onClick={prevImage}
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 sm:p-2"
                onClick={nextImage}
              >
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/50 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                index === currentImageIndex
                  ? "border-blue-500"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="w-full h-16 sm:h-20 md:h-24">
                <CldImage
                  width={200}
                  height={150}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};