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
    <div className="w-full border-2 border-gray-200 rounded-lg">
      {/* Container with same aspect ratio as image gallery */}
      <div className="w-full aspect-[4/3] bg-gray-50 rounded-lg p-6 flex flex-col justify-between min-h-0">
        {/* Header Section */}
        <div className="space-y-4 flex-shrink-0">
          {/* Descriptive text matching the image layout */}
          <div className="text-sm text-gray-600 mb-2">
            Real Estate Residence - {property?.propertyType === "1bed" ? "1 Bedroom" : "2 Bedroom"} Apartment
          </div>
                   
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
              {property?.propertyType === "1bed" ? "Luxury Apartment" : "Luxury Residence"}
            </h1>
            {/* <p className="text-sm md:text-base mb-3 text-gray-600">
              Starting from
            </p>
            <div className="text-xl lg:text-2xl font-semibold mb-6 text-gray-900">
              {property?.totalPrice || "Price not available"}
            </div> */}
          </div>
        </div>

        {/* Property Stats Grid - 2x2 layout */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 flex-1 items-center">
          <div className="bg-white p-4 rounded-lg flex items-center gap-3 shadow-sm border border-gray-100">
            <Bed className="w-10 h-10 text-gray-600 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-sm text-gray-600">Beds</div>
              <div className="text-lg font-semibold text-gray-900">{property?.bedrooms || "N/A"}</div>
            </div>
          </div>
                   
          <div className="bg-white p-4 rounded-lg flex items-center gap-3 shadow-sm border border-gray-100">
            <Bath className="w-10 h-10 text-gray-600 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-sm text-gray-600">Baths</div>
              <div className="text-lg font-semibold text-gray-900">{property?.bathrooms || "N/A"}</div>
            </div>
          </div>
                   
          <div className="bg-white p-4 rounded-lg flex items-center gap-3 shadow-sm border border-gray-100">
            <Utensils className="w-10 h-10 text-gray-600 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-sm text-gray-600">Kitchens</div>
              <div className="text-lg font-semibold text-gray-900">1</div>
            </div>
          </div>
                   
          <div className="bg-white p-4 rounded-lg flex items-center gap-3 shadow-sm border border-gray-100">
            <Ruler className="w-10 h-10 text-gray-600 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-sm text-gray-600">Area(sqft)</div>
              <div className="text-lg font-semibold text-gray-900">{property?.size || "N/A"}</div>
            </div>
          </div>
        </div>

        {/* Bottom section for additional content if needed */}
        <Link 
        className="mt-4 flex-shrink-0"
        href={"/contact"}
        >
          <Button className="w-full py-5 bg-[rgb(140,46,71)] hover:bg-transparent border border-[rgb(140,46,71)] hover:text-[rgb(140,46,71)] text-white transition-all duration-300 ease-in rounded-full cursor-pointer">
            Contact Now
          </Button>
        </Link>
       </div>
    </div>
  );
};