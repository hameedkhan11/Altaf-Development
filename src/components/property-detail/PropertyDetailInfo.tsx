import React from "react";
import { Button } from "@/components/ui/button";
import {
  Bed,
  Bath,
  Ruler,
  Utensils,
} from "lucide-react";
import { PropertyDetail } from "@/lib/types";
import Link from "next/link";

interface PropertyDetailInfoProps {
  property: PropertyDetail;
}

export const PropertyDetailInfo: React.FC<PropertyDetailInfoProps> = ({ property }) => {
  // Debug log to check if component is receiving data
  console.log("PropertyDetailInfo received property:", property);

  return (
    <div className="w-full border-2 border-gray-200 rounded-lg relative overflow-hidden">
      {/* Container with responsive aspect ratio and padding */}
      <div className="w-full aspect-[4/3] sm:aspect-[5/4] md:aspect-[4/3] bg-gray-50 rounded-lg p-3 sm:p-4 md:p-6 flex flex-col justify-between min-h-0">
        {/* Header Section */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4 flex-shrink-0">
          {/* Descriptive text matching the image layout */}
          <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
            Real Estate Residence - {property?.propertyType === "1bed" ? "1 Bedroom" : "2 Bedroom"} Apartment
          </div>
                   
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 leading-tight">
              {property?.propertyType === "1bed" ? "Luxury Apartment" : "Luxury Residence"}
            </h1>
          </div>
        </div>

        {/* Property Stats Grid - responsive layout */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:gap-x-3 sm:gap-y-3 md:gap-x-4 md:gap-y-4 flex-1 items-center">
          <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg flex items-center gap-2 sm:gap-3 shadow-sm border border-gray-100">
            <Bed className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-600 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-xs sm:text-sm text-gray-600">Beds</div>
              <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">{property?.bedrooms || "N/A"}</div>
            </div>
          </div>
                   
          <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg flex items-center gap-2 sm:gap-3 shadow-sm border border-gray-100">
            <Bath className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-600 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-xs sm:text-sm text-gray-600">Baths</div>
              <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">{property?.bathrooms || "N/A"}</div>
            </div>
          </div>
                   
          <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg flex items-center gap-2 sm:gap-3 shadow-sm border border-gray-100">
            <Utensils className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-600 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-xs sm:text-sm text-gray-600">Kitchens</div>
              <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">1</div>
            </div>
          </div>
                   
          <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg flex items-center gap-2 sm:gap-3 shadow-sm border border-gray-100">
            <Ruler className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-600 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-xs sm:text-sm text-gray-600">Area(sqft)</div>
              <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">{property?.size || "N/A"}</div>
            </div>
          </div>
        </div>

        {/* Bottom section - responsive button */}
        <Link 
          className="mt-2 sm:mt-3 md:mt-4 flex-shrink-0"
          href={"/contact"}
        >
          <Button className="w-full py-3 sm:py-4 md:py-5 text-sm sm:text-base bg-[rgb(140,46,71)] hover:bg-transparent border border-[rgb(140,46,71)] hover:text-[rgb(140,46,71)] text-white transition-all duration-300 ease-in rounded-full cursor-pointer">
            Contact Now
          </Button>
        </Link>
       </div>
    </div>
  );
};