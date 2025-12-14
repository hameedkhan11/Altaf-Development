import React from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Image } from "@imagekit/next";

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
        "A perfectly sized home that feels open, airy, and naturally bright. Designed to welcome sunlight and offer wide, refreshing views. Smart layouts that create a sense of freedom beyond the square footage. Where simplicity meets comfort, light, and modern living.",
      mainImage: "interior/interior (4).jpeg",
      secondaryImage: "interior/interior (3).jpeg",
      highlightText:
        "Your Perfect Studio: Efficient design with premium finishes and smart storage solutions. Located in the heart of the city with easy access to transportation and entertainment.",
      ctaLink: "/properties/apartments/studio",
      type: "studio",
    },
    {
      title: "ONE BED APARTMENTS",
      projectName: "LUXURY ONE BEDROOM SUITES",
      description:
        "A thoughtfully designed home that offers space, comfort, and privacy. Featuring a generous lounge that flows effortlessly into a huge balcony. Open views, fresh air, and natural light create a relaxed living experience. Perfect for those who value everyday comfort with a touch of openness.",
      mainImage: "interior/interior (5).jpeg",
      secondaryImage: "interior/interior (7).jpeg",
      highlightText:
        "Your Dream Home: Elegant one-bedroom apartments with spacious balconies and stunning city views. A perfect blend of luxury and functionality at an attractive price point.",
      ctaLink: "/properties/apartments/1 bed",
      type: "1 bed",
    },
    {
      title: "TWO BED APARTMENTS",
      projectName: "PREMIUM TWO BEDROOM RESIDENCES",
      description:
        "A true living space designed for a perfectly sized family. Balanced layouts that offer comfort, privacy, and room to grow together. A home where everyday moments turn into lasting memories. Thoughtfully planned to be enjoyed today and for many years to come.",
      mainImage: "interior/interior (8).jpeg",
      secondaryImage: "interior/interior (2).jpeg",
      highlightText:
        "Your Family Haven: Spacious two bedroom apartments with premium finishes, ample storage and access to world class amenities including pool, gym, and children's play area.",
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
              <div className="relative h-[400px] md:h-[520px] lg:h-[560px] group overflow-hidden lg:col-span-2">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
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
                <div className="relative lg:flex-1 overflow-hidden hidden lg:block">
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
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
                <div className="relative lg:flex-1 overflow-hidden hidden lg:block">
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
                    fill
                    src={apartment.secondaryImage}
                    alt={`${apartment.projectName} View`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Main Large Image with Overlay Text */}
              <div className="relative h-[400px] md:h-[520px] lg:h-[560px] group overflow-hidden lg:col-span-2">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
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
