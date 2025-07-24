// components/property/PropertyGalleryPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  getAllPropertyGalleries,
  PropertyImageGallery,
} from "@/lib/image-queries"; // Assuming this function exists
import PropertyImageGalleryComponent from "@/components/property-detail/PropertyImageGallery"; // Adjust path if needed
import { Hero } from "@/components/common/Hero";

// Remove the props interface since we don't need props
// interface PropertyGalleryPageProps {
//   slug?: string;
//   propertyId?: string;
//   showAll?: boolean;
// }

// Make the component a simple functional component without props
const PropertyGalleryPage: React.FC = () => {
  // Removed props
  // We only need the state for multiple galleries now
  const [galleries, setGalleries] = useState<PropertyImageGallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllGalleries = async () => {
      try {
        setLoading(true);
        setError(null);

        // Directly fetch all galleries
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
      }
    };

    fetchAllGalleries();
  }, []); // Empty dependency array, runs only once on mount

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading galleries...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-20">
        <div className="text-red-500">
          <p className="text-xl mb-2">Error loading galleries</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Render all fetched galleries
  // This part was already correct for showing multiple galleries
  return (
    <div className="space-y-16">
      <Hero
        title="Photo Gallery"
        backgroundType="image"
        backgroundSrc="Booking1_rg1bhs"
        height="screen"
        overlay="dark"
        contentAlignment="center"
        enableAnimations={true}
        ariaLabel="Media Center Hero Section"
      />
      {galleries.map((galleryItem) => (
        <PropertyImageGalleryComponent
          key={galleryItem._id}
          gallery={galleryItem}
        />
      ))}
    </div>
  );
};

export default PropertyGalleryPage;
