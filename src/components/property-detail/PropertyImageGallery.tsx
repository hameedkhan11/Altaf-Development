// components/property/PropertyImageGallery.tsx
"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Lightbox from "../media/Lightbox";
import { Image } from "@imagekit/next";
import { propertyImages, type GalleryImage } from "@/lib/images/images";

interface PropertyImageGalleryProps {
  category: 'exterior' | 'interior';
  className?: string;
}

const PropertyImageGalleryComponent: React.FC<PropertyImageGalleryProps> = ({
  category,
  className = "",
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(galleryRef, { once: true, margin: "-100px" });

  // Filter images by category
  const images = propertyImages.filter(img => img.category === category);

  return (
    <div
      className={`w-full relative ${className} px-4 sm:px-8 md:px-12`}
      ref={galleryRef}
    >
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
              className={`max-h-[80vh] group relative overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${
                isFullWidth ? "col-span-2" : ""
              }`}
              onClick={() => setSelectedImage(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              {/* Image */}
              <div
                className={`overflow-hidden ${isFullWidth ? "aspect-[16/9]" : "aspect-[4/3]"}`}
              >
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
                  src={image.cloudinaryId}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  aria-label="Property Image"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
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
            setSelectedImage(
              selectedImage === 0 ? images.length - 1 : selectedImage - 1
            );
          }
        }}
      />
    </div>
  );
};

export default PropertyImageGalleryComponent;
