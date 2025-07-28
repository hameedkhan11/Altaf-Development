// components/property/PropertyImageGallery.tsx
/*
eslint-disable @typescript-eslint/no-explicit-any
*/
"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Loader2 } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Lightbox from "../media/Lightbox";

interface GalleryImage {
  id: string;
  cloudinaryId: string;
  alt: string;
}

interface PropertyImageGalleryProps {
  gallery: any; // Simplified for now; adjust based on actual data structure
  className?: string;
}

const PropertyImageGalleryComponent: React.FC<PropertyImageGalleryProps> = ({
  gallery,
  className = "",
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(galleryRef, { once: true, margin: "-100px" });

  // Transform images to a simplified format
  const images = gallery.images.map((image: any) => ({
    id: image.cloudinaryPublicId,
    cloudinaryId: image.cloudinaryPublicId,
    alt: image.alt,
  }));

  if (!gallery || !gallery.images || gallery.images.length === 0) {
    return (
      <div className="w-full text-center py-16">
        <Loader2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className={`w-full relative ${className} px-4 sm:px-8 md:px-16`} ref={galleryRef}>
      {/* Image Grid */}
      <motion.div
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {images.map((image: GalleryImage, index: number) => {
          const isFullWidth = index % 3 === 0;

          return (
            <motion.div
              key={image.id}
              className={`group relative bg-white dark:bg-gray-800 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${
                isFullWidth ? "col-span-2" : ""
              }`}
              onClick={() => setSelectedImage(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              {/* Image */}
              <div className=" relative overflow-hidden">
                <CldImage
                  src={image.cloudinaryId}
                  alt={image.alt}
                  width={isFullWidth ? 1900 : 800} // Full-width images are larger
                  height={isFullWidth ? 600 : 560} // Maintain 4:3 aspect ratio
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  crop="fill"
                  gravity="auto"
                  format="auto"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/path-to-blur-placeholder.png"
                  aria-label="Property Image"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Lightbox */}
      <Lightbox
        selectedImage={selectedImage}
        filteredImages={images.map((img: GalleryImage) => ({
          id: img.id,
          src: img.cloudinaryId,
          alt: img.alt,
        }))}
        onClose={() => setSelectedImage(null)}
        onNext={() => {
          if (selectedImage !== null && images.length > 0) {
            setSelectedImage((selectedImage + 1) % images.length);
          }
        }}
        onPrev={() => {
          if (selectedImage !== null && images.length > 0) {
            setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
          }
        }}
      />
    </div>
  );
};

export default PropertyImageGalleryComponent;