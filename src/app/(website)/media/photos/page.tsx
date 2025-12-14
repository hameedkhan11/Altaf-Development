// components/property/PropertyGalleryPage.tsx
"use client";

import React, { useState } from "react";
import PropertyImageGalleryComponent from "@/components/property-detail/PropertyImageGallery";
import { Hero } from "@/components/common/Hero";

const PropertyGalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'exterior' | 'interior'>('exterior');

  return (
    <div className="space-y-16">
      <Hero
        title="Photo Gallery"
        backgroundType="image"
        backgroundSrc="media_center_xdtlge"
        height="screen"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "/Media/photos", href: "/photos" },
        ]}
        overlay="dark"
        contentAlignment="center"
        enableAnimations={true}
        ariaLabel="Media Center Hero Section"
      />

      {/* Category Buttons */}
      <div className="flex justify-center gap-4 px-4">
        <button
          onClick={() => setActiveCategory('exterior')}
          className={`px-8 py-3 rounded-full font-medium transition-all cursor-pointer duration-300 ${
            activeCategory === 'exterior'
              ? 'bg-[rgb(140,46,71)] text-white shadow-lg'
              : ' border border-[rgb(140,46,71)] hover:bg-[rgb(140,46,71)] hover:text-white'
          }`}
        >
          Exterior
        </button>
        <button
          onClick={() => setActiveCategory('interior')}
          className={`px-8 py-3 rounded-full font-medium transition-all cursor-pointer duration-300 ${
            activeCategory === 'interior'
              ? 'bg-[rgb(140,46,71)] text-white shadow-lg'
              : ' border border-[rgb(140,46,71)] hover:bg-[rgb(140,46,71)] hover:text-white'
          }`}
        >
          Interior
        </button>
      </div>

      {/* Gallery */}
      <PropertyImageGalleryComponent category={activeCategory} />
    </div>
  );
};

export default PropertyGalleryPage;