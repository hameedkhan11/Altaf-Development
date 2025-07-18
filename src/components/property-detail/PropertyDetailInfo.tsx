import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bed,
  Bath,
  Square,
  Calendar,
  DollarSign,
  Home,
} from "lucide-react";
import { PropertyDetail } from "@/lib/types";
import { Animate } from "../ui/animate";
import { AnimatedH1, AnimatedH3, AnimatedP, AnimatedSpan } from "../ui/text-animations";

interface PropertyDetailInfoProps {
  property: PropertyDetail;
  // Removed propertyType prop since it's not being used
}

export const PropertyDetailInfo: React.FC<PropertyDetailInfoProps> = ({ property: property }) => {
  const formatPriceFull = (price: number): string => {
    return `PKR ${price.toLocaleString()}`;
  };

  return (
    <Animate type="scale" className="lg:col-span-2 space-y-4 sm:space-y-5 md:space-y-6 px-2 sm:px-6 lg:px-0">
      {/* Header */}
      <div>
        <AnimatedH1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl mb-1 sm:mb-2 leading-tight">
          {property.name}
        </AnimatedH1>
        <AnimatedP className="text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4 text-gray-600">
          Starting from
        </AnimatedP>
        <div className="text-xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold sm:font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6">
          {property.totalPrice}
        </div>
      </div>

      {/* Property Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6">
        <div className="text-center">
          <div className="mb-1 text-xs sm:text-sm md:text-base text-gray-600">
            Bedrooms
          </div>
          <div className="text-lg sm:text-xl md:text-2xl flex items-center justify-center gap-1">
            <Bed className="w-4 h-4 sm:w-5 sm:h-5" />
            {property.bedrooms}
          </div>
        </div>
        <div className="text-center">
          <div className="mb-1 text-xs sm:text-sm md:text-base text-gray-600">
            Bathrooms
          </div>
          <div className="text-lg sm:text-xl md:text-2xl flex items-center justify-center gap-1">
            <Bath className="w-4 h-4 sm:w-5 sm:h-5" />
            {property.bathrooms}
          </div>
        </div>
        <div className="text-center">
          <div className="mb-1 text-xs sm:text-sm md:text-base">
            SQFT
          </div>
          <div className="text-lg sm:text-xl md:text-2xl flex items-center justify-center gap-1">
            <Square className="w-4 h-4 sm:w-5 sm:h-5" />
            {property.size}
          </div>
        </div>
      </div>

      {/* Key Information */}
      <Card>
        <CardContent className="p-4 sm:p-5 md:p-6">
          <AnimatedH3 className="text-base sm:text-lg md:text-lg mb-3 sm:mb-4 font-semibold">
            Key Information
          </AnimatedH3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Home className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="px-2 py-1 rounded-full text-xs sm:text-sm">
                {property.type}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs sm:text-sm">
                Newly Built
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs sm:text-sm">
                Rate: PKR {property.rate.toLocaleString()}/sqft
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs sm:text-sm">
                Open Plan
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Details */}
      <Card>
        <CardContent className="p-4 sm:p-5 md:p-6">
          <h3 className="text-lg sm:text-xl md:text-xl mb-3 sm:mb-4 font-semibold">
            Pricing Details
          </h3>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-base">Size</span>
              <AnimatedSpan className="font-semibold text-xs sm:text-base">
                {property.size} sqft
              </AnimatedSpan>
            </div>
            <div className="flex justify-between items-center">
              <AnimatedSpan className="text-xs sm:text-base">Rate per sqft</AnimatedSpan>
              <AnimatedSpan className="font-semibold text-sm sm:text-base">
                PKR {property.rate.toLocaleString()}
              </AnimatedSpan>
            </div>
            <div className="flex justify-between items-center border-t pt-2 sm:pt-3">
              <span className="text-xs sm:text-base">Total Price</span>
              <span className="font-medium sm:font-semibold text-sm sm:text-lg">
                {property.totalPrice}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-base">
                Down Payment (25%)
              </span>
              <span className="font-medium sm:font-semibold text-sm sm:text-lg">
                {formatPriceFull(property.downPayment)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-base">
                Each Quarterly Installment
              </span>
              <span className="text-sm sm:text-lg font-medium sm:font-semibold">
                {formatPriceFull(property.quarterlyInstallment)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Button */}
      <Button className="bg-[rgb(140,46,71)] w-full cursor-pointer hover:bg-transparent hover:text-[rgb(140,46,71)] border border-[rgb(140,46,71)] text-white py-4 sm:py-5 md:py-6 transition-all duration-300 ease-in text-sm sm:text-base">
        Contact For More Details
      </Button>
    </Animate>
  );
};