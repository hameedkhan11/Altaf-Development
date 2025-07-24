// components/property/PropertyGalleryPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
// Updated import path
import {
  getAllPropertyGalleries,
  getGalleriesByPropertyId,
  getPropertyGalleryBySlug,
  PropertyImageGallery,
} from "@/lib/image-queries";
import PropertyImageGalleryComponent from "../property-detail/PropertyImageGallery";

interface PropertyGalleryPageProps {
  slug?: string;
  propertyId?: string;
  showAll?: boolean;
}

const PropertyGalleryPage: React.FC<PropertyGalleryPageProps> = ({
  slug,
  propertyId,
  showAll = false,
}) => {
  const [gallery, setGallery] = useState<PropertyImageGallery | null>(null);
  const [galleries, setGalleries] = useState<PropertyImageGallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(null);

        if (showAll) {
          const allGalleries = await getAllPropertyGalleries();
          setGalleries(allGalleries);
        } else if (slug) {
          const galleryData = await getPropertyGalleryBySlug(slug);
          setGallery(galleryData);
        } else if (propertyId) {
          const galleriesData = await getGalleriesByPropertyId(propertyId);
          // If multiple galleries, you might want to handle this differently
          // For now, we'll take the first one
          setGallery(galleriesData[0] || null);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch gallery"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [slug, propertyId, showAll]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-20">
        <div className="text-red-500">
          <p className="text-xl mb-2">Error loading gallery</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (showAll) {
    return (
      <div className="space-y-16 px-16">
        {galleries.map((galleryItem) => (
          <PropertyImageGalleryComponent
            key={galleryItem._id}
            gallery={galleryItem}
          />
        ))}
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="w-full text-center py-20">
        <p className="text-gray-500">Gallery not found</p>
      </div>
    );
  }

  return (
    <div className="px-16">
      <PropertyImageGalleryComponent gallery={gallery} />
    </div>
  );
};

export default PropertyGalleryPage;
