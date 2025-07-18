// components/media/NextCloudinaryGallery.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";
import GalleryControls from "./GalleryControl";
import Lightbox from "./Lightbox";
import Image from "next/image";

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  context?: {
    alt?: string;
    caption?: string;
    title?: string;
    category?: string;
  };
  tags?: string[];
  created_at: string;
  width?: number;
  height?: number;
  format?: string;
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  title?: string;
  description?: string;
  photographer?: string;
  date?: string;
  tags?: string[];
}

interface NextCloudinaryGalleryProps {
  title?: string;
  description?: string;
  standalone?: boolean;
  cloudName: string;
  folder?: string;
  maxResults?: number;
}

const NextCloudinaryGallery: React.FC<NextCloudinaryGalleryProps> = ({ 
  title = "Visual Showcase", 
  standalone = false,
  cloudName,
  folder = "photos",
  maxResults = 100
}) => {
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState('');
  const [hasFixedHeader, setHasFixedHeader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const galleryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(galleryRef, { once: true, margin: "-100px" });

  const IMAGES_PER_PAGE = 9;
  const LOAD_MORE_COUNT = 6;

  // Fetch images from Cloudinary using the API route
  const fetchCloudinaryImages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Fetching images from folder: ${folder}`);

      const response = await fetch('/api/cloudinary/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          folder,
          maxResults,
          sortBy: 'created_at',
          sortOrder: 'desc'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      console.log('Cloudinary response:', data);

      // Check if we have resources
      if (!data.resources || data.resources.length === 0) {
        console.log('No resources found in Cloudinary response');
        setAllImages([]);
        setDisplayedImages([]);
        setHasMoreImages(false);
        return;
      }

      // Transform Cloudinary response to our image format
      const transformedImages: GalleryImage[] = data.resources.map((resource: CloudinaryResource) => ({
        id: resource.public_id,
        src: resource.secure_url,
        alt: resource.context?.alt || resource.context?.caption || extractImageName(resource.public_id),
        category: resource.context?.category || resource.tags?.[0] || 'general',
        title: resource.context?.title || extractImageName(resource.public_id),
        description: resource.context?.caption,
        date: resource.created_at,
        tags: resource.tags || []
      }));

      console.log('Transformed images:', transformedImages);
      console.log('Sample image src:', transformedImages[0]?.src);

      setAllImages(transformedImages);
      
      // Show first batch of images initially
      setDisplayedImages(transformedImages.slice(0, IMAGES_PER_PAGE));
      setHasMoreImages(transformedImages.length > IMAGES_PER_PAGE);

    } catch (err) {
      console.error('Error fetching Cloudinary images:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch images');
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  // Helper function to extract image name from public_id
  const extractImageName = (publicId: string): string => {
    const parts = publicId.split('/');
    const fileName = parts[parts.length - 1];
    return fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Initialize gallery
  // useEffect(() => {
  //   fetchCloudinaryImages();
  // }, [folder, maxResults,]);

  // Load more images
  const loadMoreImages = () => {
    const nextPage = currentPage + 1;
    const startIndex = IMAGES_PER_PAGE + (nextPage - 1) * LOAD_MORE_COUNT;
    const endIndex = startIndex + LOAD_MORE_COUNT;
    
    const newImages = allImages.slice(startIndex, endIndex);
    setDisplayedImages(prev => [...prev, ...newImages]);
    setCurrentPage(nextPage);
    
    // Check if there are more images to load
    setHasMoreImages(endIndex < allImages.length);
  };

  // Header detection logic
  useEffect(() => {
    const checkForFixedHeader = () => {
      const headerSelectors = [
        'header',
        '[data-testid="header"]',
        '.header',
        '.navbar',
        '.nav',
        '.fixed',
        '[class*="fixed"]',
        '[class*="sticky"]'
      ];

      let hasFixed = false;

      headerSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          const computedStyle = window.getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          
          if (
            (computedStyle.position === 'fixed' || computedStyle.position === 'sticky') &&
            rect.top <= 10 &&
            rect.height > 0 &&
            rect.width > 0
          ) {
            hasFixed = true;
          }
        });
      });

      setHasFixedHeader(hasFixed || standalone);
    };

    checkForFixedHeader();
    
    const timeouts = [100, 500, 1000];
    timeouts.forEach(delay => {
      setTimeout(checkForFixedHeader, delay);
    });

    window.addEventListener('resize', checkForFixedHeader);
    
    return () => {
      window.removeEventListener('resize', checkForFixedHeader);
    };
  }, [standalone]);

  // Filter logic
  const categories = ["all", ...Array.from(new Set(allImages.map(img => img.category)))];
  
  const filteredImages = displayedImages.filter(img => {
    const matchesFilter = filter === "all" || img.category === filter;
    const matchesSearch = searchTerm === '' || 
      img.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Debug logging
  useEffect(() => {
    console.log('Gallery state:', {
      allImages: allImages.length,
      displayedImages: displayedImages.length,
      filteredImages: filteredImages.length,
      filter,
      searchTerm,
      initialLoading,
      error
    });
  }, [allImages, displayedImages, filteredImages, filter, searchTerm, initialLoading, error]);

  // Loading state
  if (initialLoading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading gallery...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full text-center py-20">
        <div className="text-red-500 dark:text-red-400">
          <p className="text-xl mb-2">Error loading gallery</p>
          <p className="text-sm mb-4">{error}</p>
          <div className="space-y-2">
            <Button 
              onClick={fetchCloudinaryImages} 
              variant="outline" 
              className="mr-2"
            >
              Retry
            </Button>
            <p className="text-xs text-gray-500 mt-4">
              Make sure your Cloudinary credentials are set up correctly and images exist in the &apos;{folder}&apos; folder.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // No images state
  if (!allImages || allImages.length === 0) {
    return (
      <div className="w-full text-center py-20">
        <div className="text-gray-500 dark:text-gray-400">
          <Search className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
          <p className="text-xl mb-2">No images found</p>
          <p className="text-sm mb-4">No images were found in the &apos;{folder}&apos; folder in Cloudinary</p>
          <div className="space-y-2">
            <Button 
              onClick={fetchCloudinaryImages} 
              variant="outline"
            >
              Refresh Gallery
            </Button>
            <p className="text-xs text-gray-500 mt-4">
              Make sure images are uploaded to the &apos;{folder}&apos; folder in your Cloudinary account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full relative ${!standalone || hasFixedHeader ? 'pt-8' : ''}`} ref={galleryRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl top-20 left-10" />
        <div className="absolute w-72 h-72 bg-gradient-to-r from-blue-400/5 to-cyan-400/5 rounded-full blur-3xl bottom-20 right-10" />
      </div>

      {/* Header */}
      <motion.div 
        className="text-center mb-16 relative"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2 
          className="text-4xl md:text-6xl font-bold dark:text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {title}
        </motion.h2>
      </motion.div>

      {/* Controls Panel */}
      <GalleryControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
        categories={categories}
        isInView={isInView}
      />

      {/* Results Counter */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.6 }}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredImages.length} of {allImages.length} images
        </span>
      </motion.div>

      {/* Gallery Grid */}
      <NextCloudinaryGrid
        filteredImages={filteredImages}
        isInView={isInView}
        onImageClick={setSelectedImage}
        cloudName={cloudName}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
      />

      {/* Load More Button */}
      {hasMoreImages && !searchTerm && filter === 'all' && (
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={loadMoreImages}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Loading...
              </>
            ) : (
              `Load More Images (${allImages.length - displayedImages.length} remaining)`
            )}
          </Button>
        </motion.div>
      )}

      {/* Lightbox */}
      <Lightbox
        selectedImage={selectedImage}
        filteredImages={filteredImages}
        onClose={() => setSelectedImage(null)}
        onNext={() => {
          if (selectedImage !== null && filteredImages.length > 0) {
            setSelectedImage((selectedImage + 1) % filteredImages.length);
          }
        }}
        onPrev={() => {
          if (selectedImage !== null && filteredImages.length > 0) {
            setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
          }
        }}
      />
    </div>
  );
};

// Next-Cloudinary Grid Component
interface NextCloudinaryGridProps {
  filteredImages: GalleryImage[];
  isInView: boolean;
  onImageClick: (index: number) => void;
  cloudName: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

const NextCloudinaryGrid: React.FC<NextCloudinaryGridProps> = ({
  filteredImages,
  isInView,
  onImageClick,
  // cloudName,
  // searchTerm,
  setSearchTerm,
  // filter,
  setFilter
}) => {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [imageLoaded, setImageLoaded] = useState<Set<string>>(new Set());

  const handleImageError = (imageId: string) => {
    console.error(`Failed to load image: ${imageId}`);
    setImageErrors(prev => new Set(prev).add(imageId));
  };

  const handleImageLoad = (imageId: string) => {
    console.log(`Image loaded successfully: ${imageId}`);
    setImageLoaded(prev => new Set(prev).add(imageId));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  if (filteredImages.length === 0) {
    return (
      <motion.div 
        className="text-center py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Search className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
        <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
          No images found
        </h3>
        <p className="text-gray-400 dark:text-gray-500 mb-4">
          Try adjusting your search or filter criteria
        </p>
        <Button
          onClick={() => {
            setSearchTerm('');
            setFilter('all');
          }}
          variant="outline"
          className="mt-4"
        >
          Clear Filters
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {filteredImages.map((image, index) => (
        <motion.div
          key={image.id}
          variants={itemVariants as Variants}
          className="group relative aspect-[4/3] overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
          onClick={() => onImageClick(index)}
          whileHover={{ y: -8 }}
        >
          {/* Loading skeleton */}
          {!imageLoaded.has(image.id) && !imageErrors.has(image.id) && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse rounded-xl" />
          )}

          {/* Error state */}
          {imageErrors.has(image.id) && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <Search className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Failed to load</p>
              </div>
            </div>
          )}

          {/* Try CldImage first, fallback to regular img */}
          {!imageErrors.has(image.id) && (
            <>
              <CldImage
                src={image.id}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 6}
                crop="fill"
                gravity="auto"
                quality="auto"
                format="auto"
                onLoad={() => handleImageLoad(image.id)}
                onError={() => handleImageError(image.id)}
              />
              
              {/* Fallback regular image if CldImage fails */}
              {imageErrors.has(image.id) && (
                <Image
                  fill
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
                  onLoad={() => handleImageLoad(image.id)}
                  onError={() => console.error(`Both CldImage and fallback failed for: ${image.id}`)}
                />
              )}
            </>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-xl" />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl">
            <h3 className="text-white font-semibold text-lg">
              {image.title || image.alt}
            </h3>
            <p className="text-white/80 text-sm capitalize mt-1">
              {image.category.replace("-", " ")}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default NextCloudinaryGallery;