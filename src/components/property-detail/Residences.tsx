import React from "react";
import { Image } from "@imagekit/next";

interface ProjectDetail {
  label: string;
  value: string;
}

interface AtAGlanceProps {
  title?: string;
  details?: ProjectDetail[];
  imageUrl?: string;
  imageAlt?: string;
}

const AtAGlance: React.FC<AtAGlanceProps> = ({
  title = "The Residences by Altaf Development",
  details = [
    {
      label: "Location",
      value: "Main civic Center plot#11 block A faisal hills",
    },
    { label: "Project Type", value: "Residential" },
    {
      label: "Floor Stories",
      value: "24",
    },
    { label: "Number of Units", value: "450+" },
    { label: "Basement", value: "3" },
    {
      label: "Unit Sizes",
      value: "798 Sq Ft(Studio) / 945 Sq Ft(1 Bed) / 1641 Sq Ft(2 Bed)",
    },
    {
      label: "Parking",
      value: "450+",
    }
  ],
  imageAlt = "Modern Residential Building",
}) => {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20">
          {/* Left Content - Details */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-5 font-light leading-tight">
              {title}
            </h2>

            <div className="space-y-0">
              {details.map((detail, index) => (
                <div
                  key={index}
                  className="py-4 sm:py-5 md:py-6 border-b"
                  style={{ borderColor: "rgb(140,46,71)" }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                    <div className="sm:col-span-2 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-[rgb(140,46,71)]">
                      {detail.label}
                    </div>
                    <div className="sm:col-span-3 text-xs sm:text-sm md:text-base lg:text-lg font-normal">
                      {detail.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] w-full order-1 lg:order-2">
            <Image
              urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
              src={`/Property images/altaf fvt (1).webp`}
              alt={imageAlt}
              fill
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtAGlance;
