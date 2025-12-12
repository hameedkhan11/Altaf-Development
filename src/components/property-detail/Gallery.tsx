"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Image } from "@imagekit/next";

type ViewType = "EXTERIOR" | "INTERIOR" | "VIDEO";

interface ImageData {
  id: string;
  cloudinaryId: string;
  alt: string;
  type: string;
  label?: string;
}

interface ProjectData {
  name: string;
  images: ImageData[];
  videoUrl?: string;
  hasVideo?: boolean;
}

interface InteractiveProjectGalleryProps {
  project: ProjectData;
  autoPlayInterval?: number;
  resumeAutoPlayDelay?: number;
}

const InteractiveProjectGallery: React.FC<InteractiveProjectGalleryProps> = ({
  project,
  autoPlayInterval = 5000,
  resumeAutoPlayDelay = 10000,
}) => {
  const [activeView] = useState<ViewType>("INTERIOR");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Filter images based on active view
  const filteredImages = project.images.filter((img) =>
    activeView === "EXTERIOR"
      ? img.type === "exterior"
      : activeView === "INTERIOR"
        ? img.type === "interior"
        : true
  );

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || activeView === "VIDEO" || filteredImages.length === 0)
      return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [filteredImages.length, isAutoPlaying, activeView, autoPlayInterval]);

  // Reset index when view changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [activeView]);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), resumeAutoPlayDelay);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), resumeAutoPlayDelay);
  };

  const handleLineClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), resumeAutoPlayDelay);
  };

  const availableViews: ViewType[] = ["EXTERIOR", "INTERIOR"];
  if (project.hasVideo || project.videoUrl) {
    availableViews.push("VIDEO");
  }

  return (
    <section className="w-full py-12 sm:py-16 md:py-20">
      {/* Gallery Container */}
      <div className="relative w-full h-[80vh] sm:h-[90vh] md:h-screen">
        {/* Main Image Display */}
        {activeView !== "VIDEO" && filteredImages.length > 0 && (
          <div className="absolute inset-0">
            <Image
              urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
              width={1920}
              height={1080}
              src={filteredImages[currentImageIndex]?.cloudinaryId}
              alt={filteredImages[currentImageIndex]?.alt || project.name}
              className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
              style={{ objectFit: "cover" }}
            />

            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
          </div>
        )}

        {/* Project Title and Description - Bottom Left */}
        <div
          className="absolute left-2 sm:left-4 md:left-8 z-10 max-w-4xl"
          style={{ bottom: "10%" }}
        >
          <h2 className="text-white text-2xl text-center sm:text-left md:text-3xl font-light tracking-wide uppercase mb-3 md:mb-4">
            The Residences by Altaf Developments
          </h2>
          <p className="hidden lg:block text-white text-base max-w-xl font-light leading-relaxed">
            Spacious yet sophisticated work environments designed with floor-to-ceiling glazing and adaptable layouts. The skyline becomes a backdrop for decisions, with interiors crafted for focus and presence.
          </p>
        </div>

        {/* Bottom Navigation Bar */}
        {activeView !== "VIDEO" && filteredImages.length > 1 && (
          <div className="hidden sm:block absolute bottom-0 left-0 right-0 pb-4 sm:pb-8 px-2 sm:px-4 md:px-8">
            <div className="flex items-center justify-center w-full">
              {/* Progress Lines - Far Right */}
              <div className="flex items-center justify-center">
                {filteredImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleLineClick(index)}
                    className="group"
                  >
                    <div
                      className={`w-12 sm:w-16 md:w-20 lg:w-40 h-0.5 transition-all duration-300 ${
                        index === currentImageIndex
                          ? "bg-white"
                          : "bg-white/40 group-hover:bg-white/60"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Arrows - Desktop */}
        <div className="hidden sm:block absolute right-4 sm:right-30 bottom-4 sm:bottom-8">
          <div className="absolute top-1/2 transform -translate-y-1/2 left-2 sm:left-4 z-10">
            <button
              onClick={handleNext}
              className="text-white text-2xl sm:text-3xl"
            >
              <FaArrowRightLong />
            </button>
          </div>
          <div className="absolute top-1/2 transform -translate-y-1/2 right-2 sm:right-4 md:right-8 z-10">
            <button
              onClick={handlePrevious}
              className="text-white text-2xl sm:text-3xl"
            >
              <FaArrowLeftLong />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Demo Component with Sample Data
const DemoGallery = () => {
  const sampleProject: ProjectData = {
    name: "Luxury Residences",
    images: [
      {
        id: "1",
        cloudinaryId: "/Property images/altaf fvt2.webp",
        alt: "Modern Living Room",
        type: "interior",
        label: "LIVING ROOM",
      },
      {
        id: "2",
        cloudinaryId: "/Property images/altaf fvt3.webp",
        alt: "Elegant Dining Area",
        type: "interior",
        label: "DINING",
      },
      {
        id: "3",
        cloudinaryId: "/Property images/altaf fvt 9 (1) (1).webp",
        alt: "Gourmet Kitchen",
        type: "interior",
        label: "KITCHEN",
      },
      {
        id: "4",
        cloudinaryId: "/Property images/altaf1.webp",
        alt: "Spa Bathroom",
        type: "interior",
        label: "BATHROOM",
      },
      {
        id: "5",
        cloudinaryId: "/Property images/altaf_fvt2.webp",
        alt: "Master Bedroom",
        type: "interior",
        label: "BEDROOM",
      },
    ],
    hasVideo: false,
  };

  return <InteractiveProjectGallery project={sampleProject} />;
};

export default DemoGallery;