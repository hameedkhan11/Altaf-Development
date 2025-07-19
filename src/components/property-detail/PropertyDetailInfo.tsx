import React from "react";
import { Button } from "@/components/ui/button";
import {
  Bed,
  Bath,
  Ruler,
  Utensils,
} from "lucide-react";
import { PropertyDetail } from "@/lib/types";
import { Animate } from "../ui/animate";
import { AnimatedH1, AnimatedP } from "../ui/text-animations";

interface PropertyDetailInfoProps {
  property: PropertyDetail;
}

export const PropertyDetailInfo: React.FC<PropertyDetailInfoProps> = ({ property: property }) => {
  // const formatPriceFull = (price: number): string => {
  //   return `PKR ${price.toLocaleString()}`;
  // };



  return (
    <Animate type="scale" className="w-full border-2 border-gray-200 rounded-lg">
      {/* Container with same aspect ratio as image gallery */}
      <div className="w-full aspect-[4/3] bg-gray-50 rounded-lg p-6 flex flex-col justify-between">
        {/* Header Section */}
        <div className="space-y-4">
          {/* Descriptive text matching the image layout */}
          <div className="text-sm text-gray-600 mb-2">
            Real Estate Residence - {property.propertyType === "1bed" ? "1 Bedroom" : "2 Bedroom"} Apartment
          </div>
          
          <div>
            <AnimatedH1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
              {property.propertyType === "1bed" ? "Luxury Apartment" : "Luxury Residence"}
            </AnimatedH1>
            <AnimatedP className="text-sm md:text-base mb-3 text-gray-600">
              Starting from
            </AnimatedP>
            <div className="text-xl lg:text-2xl font-semibold mb-6">
              {property.totalPrice}
            </div>
          </div>
        </div>

        {/* Property Stats Grid - 2x2 layout */}
        <div className="grid grid-cols-2 gap-x-4">
          <div className="bg-white p-4 rounded-lg flex items-center gap-3 shadow-sm">
            <Bed className=" w-10 h-10 text-gray-600" />
            <div>
              <div className="text-sm text-gray-600">Beds</div>
              <div className="text-lg font-semibold">{property.bedrooms}</div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg flex items-center gap-3 shadow-sm">
            <Bath className="w-10 h-10 text-gray-600" />
            <div>
              <div className="text-sm text-gray-600">Baths</div>
              <div className="text-lg font-semibold">{property.bathrooms}</div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg flex items-center gap-3 shadow-sm">
            <Utensils className="w-10 h-10 text-gray-600" />
            <div>
              <div className="text-sm text-gray-600">Kitchens</div>
              <div className="text-lg font-semibold">1</div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg flex items-center gap-3 shadow-sm">
            <Ruler className="w-10 h-10 text-gray-600" />
            <div>
              <div className="text-sm text-gray-600">Area(sqft)</div>
              <div className="text-lg font-semibold">{property.size}</div>
            </div>
          </div>
        </div>

        {/* Bottom section for additional content if needed */}
        <div className="mt-4">
          <Button className="w-full py-5 bg-[rgb(140,46,71)] hover:bg-transparent border border-[rgb(140,46,71)] hover:text-[rgb(140,46,71)] text-white transition-all duration-300 ease-in rounded-full cursor-pointer">
            View Details
          </Button>
        </div>
      </div>
    </Animate>
  );
};