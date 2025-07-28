// components/property/PropertyGalleryPage.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Loader2 } from "lucide-react";
import {
  getAllPropertyGalleries,
  PropertyImageGallery,
} from "@/lib/image-queries";
import PropertyImageGalleryComponent from "@/components/property-detail/PropertyImageGallery";
import { Hero } from "@/components/common/Hero";

const PropertyGalleryPage: React.FC = () => {
  const [galleries, setGalleries] = useState<PropertyImageGallery[]>([]);
  const [loading, setLoading] = useState(false); // Changed to false initially
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  // Memoize the Hero component props to prevent unnecessary re-renders
  const heroProps = useMemo(() => ({
    title: "Photo Gallery",
    backgroundType: "image" as const,
    backgroundSrc: "media_center_xdtlge",
    height: "screen" as const,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "/Media/photos", href: "/photos" },
    ],
    overlay: "dark" as const,
    contentAlignment: "center" as const,
    enableAnimations: true,
    ariaLabel: "Media Center Hero Section",
  }), []);

  useEffect(() => {
    const fetchAllGalleries = async () => {
      try {
        setLoading(true);
        setError(null);

        const allGalleries = await getAllPropertyGalleries();
        console.log("Fetched all galleries:", allGalleries);
        setGalleries(allGalleries);
      } catch (err) {
        console.error("Error fetching all galleries:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch galleries"
        );
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchAllGalleries();
  }, []);

  // Render Hero immediately, don't wait for data
  const renderHero = () => (
    <Hero {...heroProps} />
  );

  // Render loading state only for gallery content
  const renderGalleryContent = () => {
    if (initialLoad && loading) {
      return (
        <div className="w-full flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[rgb(140,46,71)]" />
            <p>
              Loading galleries...
            </p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="w-full text-center py-12">
          <div className="text-red-500">
            <p className="text-xl mb-2">Error loading galleries</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    if (galleries.length === 0 && !loading) {
      return (
        <div className="w-full text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No galleries available at the moment.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {galleries.map((galleryItem, index) => (
          <GalleryItemWrapper
            key={galleryItem._id}
            gallery={galleryItem}
            index={index}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-16">
      {renderHero()}
      {renderGalleryContent()}
    </div>
  );
};

// Separate wrapper component for better performance and lazy loading
const GalleryItemWrapper: React.FC<{
  gallery: PropertyImageGallery;
  index: number;
}> = React.memo(({ gallery, index }) => {
  const [isVisible, setIsVisible] = useState(index < 2); // Load first 2 immediately
  const [elementRef, setElementRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!elementRef || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px", // Start loading 100px before element is visible
      }
    );

    observer.observe(elementRef);

    return () => observer.disconnect();
  }, [elementRef, isVisible]);

  return (
    <div ref={setElementRef}>
      {isVisible ? (
        <PropertyImageGalleryComponent gallery={gallery} />
      ) : (
        <div className="w-full h-64 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-gray-400" />
            <p className="text-sm">Loading gallery...</p>
          </div>
        </div>
      )}
    </div>
  );
});

GalleryItemWrapper.displayName = "GalleryItemWrapper";

export default PropertyGalleryPage;