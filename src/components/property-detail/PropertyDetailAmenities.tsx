"use client";

import { Image } from "@imagekit/next";
import React, { useState } from "react";

interface Amenity {
  name: string;
  iconPath: string;
}

const ResidenceAmenities: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const amenities: Amenity[] = [
    { name: "Smart car parking",       iconPath: "/icons/icon2.svg" },
    { name: "Laundry services",        iconPath: "/icons/icon25.svg" },
    { name: "Grand entrance lobby",    iconPath: "/icons/icon20.svg" },
    { name: "Gym",                     iconPath: "/icons/icon1.svg" },
    { name: "Sauna",                   iconPath: "/icons/icon4.svg" },
    { name: "Spa",                     iconPath: "/icons/icon3.svg" },
    { name: "Indoor pool",             iconPath: "/icons/icon11.svg" },
    { name: "Barber shop",             iconPath: "/icons/icon28.svg" },
    { name: "Grocery store",           iconPath: "/icons/icon17.svg" },
    { name: "Coffee shop",             iconPath: "/icons/icon7.svg" },
    { name: "Tuition centre",          iconPath: "/icons/icon27.svg" },
    { name: "Mosque",                  iconPath: "/icons/icon9.svg" },
    { name: "Cinema",                  iconPath: "/icons/icon10.svg" },
    { name: "Snooker",                 iconPath: "/icons/icon29.svg" },
    { name: "Meet-up area",            iconPath: "/icons/icon5.svg" },
    { name: "BBQ area",                iconPath: "/icons/icon18.svg" },
    { name: "Roof top",                iconPath: "/icons/icon12.svg" },
    { name: "Security 24/7",           iconPath: "/icons/icon23.svg" },
    { name: "Management office",       iconPath: "/icons/icon14.svg" },
    { name: "Table tennis",            iconPath: "/icons/icon24.svg" },
    { name: "High speed elevator",     iconPath: "/icons/icon21.svg" },
    { name: "Airbnb Facilities",       iconPath: "/icons/icon22.svg" },
    { name: "Medical Store",           iconPath: "/icons/icon8.svg" },
    { name: "House Keeping",           iconPath: "/icons/icon26.svg" },
  ];

  // Mobile pagination - 6 items per page (3 cols x 2 rows)
  const itemsPerPage = 6;
  const totalPages = Math.ceil(amenities.length / itemsPerPage);
  
  const getCurrentPageItems = () => {
    const start = currentPage * itemsPerPage;
    return amenities.slice(start, start + itemsPerPage);
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleDotClick = (index: number) => {
    setCurrentPage(index);
  };

  // Touch handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <div className="w-full mx-auto py-12">
      <div className="mx-auto">
        <h2
          className="text-4xl md:text-5xl text-center mb-16 font-light"
          style={{ letterSpacing: "0.05em" }}
        >
          Features & Amenities
        </h2>

        {/* Mobile View - Grid with Pagination (< sm) */}
        <div className="sm:hidden">
          <div
            className="grid grid-cols-3"
            style={{ borderColor: "rgb(140,46,71)" }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {getCurrentPageItems().map((amenity, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 border-r border-b text-center"
              >
                <div className="mb-4 flex items-center justify-center w-24 h-24">
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
                    src={amenity.iconPath}
                    width={200}
                    height={200}
                    alt={amenity.name}
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(23%) sepia(48%) saturate(1543%) hue-rotate(313deg) brightness(88%) contrast(87%)",
                    }}
                  />
                </div>
                <p className="text-xs md:text-sm font-medium leading-relaxed text-[rgb(140,46,71)]">
                  {amenity.name}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentPage === index
                    ? "bg-[rgb(140,46,71)]"
                    : "bg-gray-300"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Tablet and Desktop View - Full Grid (>= sm) */}
        <div
          className="hidden sm:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          style={{ borderColor: "rgb(140,46,71)" }}
        >
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 border-r border-b text-center"
            >
              <div className="mb-4 flex items-center justify-center w-24 h-24">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
                  src={amenity.iconPath}
                  width={200}
                  height={200}
                  alt={amenity.name}
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(23%) sepia(48%) saturate(1543%) hue-rotate(313deg) brightness(88%) contrast(87%)",
                  }}
                />
              </div>
              <p className="text-xs md:text-sm font-medium leading-relaxed text-[rgb(140,46,71)]">
                {amenity.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResidenceAmenities;