import React from "react";
import { ArrowUpRight } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

interface ApartmentData {
  title: string;
  projectName: string;
  description: string;
  mainImage: string;
  secondaryImage: string;
  highlightText: string;
  ctaLink: string;
  type: "studio" | "1 bed" | "2 bed";
}

const ApartmentShowcase: React.FC = () => {
  const apartments: ApartmentData[] = [
    {
      title: "STUDIO APARTMENTS",
      projectName: "MODERN STUDIO RESIDENCES",
      description:
        "Compact luxury living spaces of 450-600 sq. ft. Perfect for young professionals and investors seeking prime location with modern amenities and lifestyle facilities.",
      mainImage: "imgi_4442_b10d4f101476497.5f1fdce5873f0_czr5uk",
      secondaryImage: "imgi_4445_f121a9101476497.5f1fdce58a4da_rrpfmi",
      highlightText:
        "Your Perfect Studio: Efficient design with premium finishes and smart storage solutions. Located in the heart of the city with easy access to transportation and entertainment.",
      ctaLink: "/properties/apartments/studio",
      type: "studio",
    },
    {
      title: "ONE BED APARTMENTS",
      projectName: "LUXURY ONE BEDROOM SUITES",
      description:
        "Spacious one-bedroom apartments ranging from 700-900 sq. ft. Designed for comfort and style with open-plan layouts, modern kitchens, and premium amenities.",
      mainImage: "imgi_5125_3a9d3e239745899.692ff3af9b67f_lyz9jc",
      secondaryImage: "imgi_5123_7bfa2c239745899.692ff3af99e54_wlvefe",
      highlightText:
        "Your Dream Home: Elegant one-bedroom apartments with spacious balconies and stunning city views. A perfect blend of luxury and functionality at an attractive price point.",
      ctaLink: "/properties/apartments/1 bed",
      type: "1 bed",
    },
    {
      title: "TWO BED APARTMENTS",
      projectName: "PREMIUM TWO BEDROOM RESIDENCES",
      description:
        "Expansive two-bedroom apartments of 1,100-1,400 sq. ft. Ideal for families seeking luxury living with multiple bathrooms, large living areas, and contemporary design.",
      mainImage: "imgi_4442_b10d4f101476497.5f1fdce5873f0_czr5uk",
      secondaryImage: "imgi_4462_6eaff2101476497.5f1fdce589b13_alar4b",
      highlightText:
        "Your Family Haven: Spacious two-bedroom apartments with premium finishes, ample storage, and access to world-class amenities including pool, gym, and children's play area.",
      ctaLink: "/properties/apartments/2 bed",
      type: "2 bed",
    },
  ];

  const renderApartmentSection = (apartment: ApartmentData, index: number) => {
    const isReversed = index === 1; // Middle section (ONE BED) has reversed layout

    return (
      <div key={index} className="mb-20 md:mb-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-16">
          {/* Top Section - Title, Description, CTA */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12 md:mb-16">
            {/* Title */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide">
              {apartment.title}
            </h2>

            {/* Description and CTA */}
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8 md:max-w-2xl">
              <p className="text-sm leading-relaxed flex-1 mb-8">
                {apartment.description}
              </p>
              <Link
                href={apartment.ctaLink}
                className="hidden md:inline-flex items-center justify-center px-6 py-3 border-2 border-[rgb(140,46,71)] rounded-full bg-[rgb(140,46,71)] hover:text-[rgb(140,46,71)] hover:bg-transparent text-white transition-all duration-300 whitespace-nowrap text-sm font-medium self-start"
              >
                FIND PROPERTIES
              </Link>
            </div>
          </div>

          {/* Images Section - Alternating Layout */}
          {!isReversed ? (
            // Layout 1 & 3: Large Left, Small Right
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Main Large Image with Overlay Text */}
              <div className="relative h-[400px] md:h-[520px] group overflow-hidden lg:col-span-2">
                <CldImage
                  fill
                  src={apartment.mainImage}
                  alt={apartment.projectName}
                  className="w-full h-full object-cover"
                />
                {/* Dark Overlay */}

                {/* Bottom Left Text with Arrow */}
                <div className="absolute bottom-6 left-6 right-6">
                  <Link
                    href={apartment.ctaLink}
                    className="inline-flex items-center gap-2 text-white text-lg md:text-xl font-medium group-hover:gap-4 transition-all duration-300"
                  >
                    <span>{apartment.projectName}</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Right Column - Text and Secondary Image */}
              <div className="flex flex-col gap-6 md:gap-8">
                {/* Highlight Text - Hidden on mobile */}
                <div className=" p-6 md:p-8 mb-20 hidden lg:block">
                  <p className="text-sm md:text-base leading-relaxed">
                    {apartment.highlightText}
                  </p>
                </div>

                {/* Secondary Image - Hidden on mobile */}
                <div className="relative h-[300px] md:h-[350px] lg:flex-1 overflow-hidden hidden lg:block">
                  <CldImage
                    fill
                    src={apartment.secondaryImage}
                    alt={`${apartment.projectName} View`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            // Layout 2: Small Left, Large Right
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Left Column - Text and Secondary Image */}
              <div className="flex flex-col gap-6 md:gap-8">
                {/* Highlight Text - Hidden on mobile */}
                <div className="p-6 md:p-8 mb-20 hidden lg:block">
                  <p className="text-sm md:text-base leading-relaxed">
                    {apartment.highlightText}
                  </p>
                </div>

                {/* Secondary Image - Hidden on mobile */}
                <div className="relative h-[300px] md:h-[350px] lg:flex-1 overflow-hidden hidden lg:block">
                  <CldImage
                    fill
                    src={apartment.secondaryImage}
                    alt={`${apartment.projectName} View`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Main Large Image with Overlay Text */}
              <div className="relative h-[400px] md:h-[520px] group overflow-hidden lg:col-span-2">
                <CldImage
                  fill
                  src={apartment.mainImage}
                  alt={apartment.projectName}
                  className="w-full h-full object-cover"
                />
                {/* Dark Overlay */}
                {/* Bottom Left Text with Arrow */}
                <div className="absolute bottom-6 left-6 right-6">
                  <Link
                    href={apartment.ctaLink}
                    className="inline-flex items-center gap-2 text-white text-lg md:text-xl font-medium group-hover:gap-4 transition-all duration-300"
                  >
                    <span>{apartment.projectName}</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
      {apartments.map((apartment, index) =>
        renderApartmentSection(apartment, index)
      )}
    </section>
  );
};

export default ApartmentShowcase;