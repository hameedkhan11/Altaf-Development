// components/hero/AltafHeroSection.tsx
"use client";

import React from "react";
import { CldImage } from "next-cloudinary";

const PropertyDetail: React.FC = () => {
  return (
    <section className="min-h-screen px-8 md:px-12 lg:px-16">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center min-h-screen py-8 sm:py-12 lg:py-16">
          {/* Left Side - Images */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto lg:mx-0">
              {/* Main Large Image */}
              <div className="relative aspect-[4/3]">
                <CldImage
                  src="About_us_Hero_cxrska"
                  alt="Modern Luxury Bedroom Interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, 60vw"
                />
              </div>
              
              {/* Overlapping Smaller Image */}
              <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 lg:-bottom-12 lg:-right-24 w-32 sm:w-48 lg:w-84 aspect-[3/2] bg-white p-1 shadow-2xl">
                <div className="relative w-full h-full">
                  <CldImage
                    src="imgi_32_g_7_kaxj9v"
                    alt="Elegant Living Space"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 150px, 250px"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Content */}
          <div className="lg:col-span-5 xl:col-span-5 order-1 lg:order-2">
            <div className="max-w-lg mx-auto lg:mx-0 lg:ml-4 xl:ml-8 px-4 sm:px-0">
              {/* Main Heading */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-light leading-[1.1] mb-6 sm:mb-8 lg:mb-12">
                Architectural Excellence, Elevated Living
              </h2>
              
              {/* Description */}
              <div className="space-y-4 sm:space-y-6">
                <p className="text-xs sm:text-sm">
                  At Altaf Developments, we believe that truly exceptional
                  living spaces should embody your lifestyle and aspirations.
                  Our vision goes beyond construction — we design and deliver
                  homes that harmoniously unite comfort, luxury, and timeless
                  architecture.
                </p>
                <p className="text-xs sm:text-sm">
                  With years of distinguished expertise in premium real estate,
                  we recognize that a home is not just a residence but a
                  reflection of identity and ambition. Every project is guided
                  by our commitment to excellence, ensuring enduring value. We
                  don&apos;t just just build homes — we craft legacies
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetail;