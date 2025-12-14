// components/hero/AltafHeroSection.tsx
"use client";

import React from "react";
import { CldImage } from "next-cloudinary";

const PropertyDetail: React.FC = () => {
  return (
    <section className="min-h-screen px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center min-h-screen py-8 sm:py-12 lg:py-16">
          {/* Left Side - Images */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto lg:mx-0 mb-16 sm:mb-20 md:mb-24 lg:mb-16">
              {/* Main Large Image */}
              <div className="relative aspect-[4/3]">
                <CldImage
                  src="About_us_Hero_cxrska"
                  alt="Modern Luxury Bedroom Interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 70vw, 50vw"
                />
              </div>
              
              {/* Overlapping Smaller Image */}
              <div className="absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-6 md:-bottom-12 md:-right-8 lg:-bottom-10 lg:-right-12 xl:-bottom-12 xl:-right-16 w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 aspect-[3/2] bg-white p-1 sm:p-1.5 shadow-2xl">
                <div className="relative w-full h-full">
                  <CldImage
                    src="imgi_32_g_7_kaxj9v"
                    alt="Elegant Living Space"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 130px, (max-width: 768px) 170px, (max-width: 1024px) 200px, 250px"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Content */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="max-w-xl mx-auto lg:mx-0 lg:pl-4 xl:pl-8 px-4 sm:px-6 lg:px-0">
              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-light leading-tight mb-6 sm:mb-8 lg:mb-10 xl:mb-12">
                Architectural Excellence, Elevated Living
              </h2>
              
              {/* Description */}
              <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                <p className="text-sm sm:text-base lg:text-sm xl:text-base leading-relaxed">
                  At Altaf Developments, we believe that truly exceptional
                  living spaces should embody your lifestyle and aspirations.
                  Our vision goes beyond construction. We design and deliver
                  homes that harmoniously unite comfort, luxury, and timeless
                  architecture.
                </p>
                <p className="text-sm sm:text-base lg:text-sm xl:text-base leading-relaxed">
                  With years of distinguished expertise in premium real estate,
                  we recognize that a home is not just a residence but a
                  reflection of identity and ambition. Every project is guided
                  by our commitment to excellence, ensuring enduring value. We
                  don&apos;t just build homes, we craft legacies.
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