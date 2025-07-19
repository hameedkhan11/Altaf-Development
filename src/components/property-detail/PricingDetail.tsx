import React from "react";
import { PropertyDetail } from "@/lib/types";

interface PricingCardProps {
  property: PropertyDetail;
}

export const PricingCard: React.FC<PricingCardProps> = ({ property }) => {
  const formatPrice = (price: number): string => {
    return `${price.toLocaleString()}`;
  };

  return (
    <div className="flex flex-col bg-white rounded-lg p-6 max-h-[50vh] overflow-y-auto -mt-8 sm:mt-0">
      <h2 className="text-base font-semibold  sm:text-2xl">
        {property.type === "1bed"
          ? "One Bedroom Premium Apartment"
          : "Two Bedroom Luxury Residence"}
      </h2>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <span className="">Size:</span>
          <span className="font-semibold">{property.size} sq ft</span>
        </div>

        <div className="flex justify-between">
          <span className="">Rate:</span>
          <span className="font-semibold">
            {formatPrice(property.rate)} per sq ft
          </span>
        </div>

        <div className="flex justify-between">
          <span className="">Total Price:</span>
          <span className="font-semibold">{property.totalPrice}</span>
        </div>

        <div className="flex justify-between">
          <span>Down Payment:</span>
          <span className="font-semibold">
            {formatPrice(property.downPayment)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="">Quarterly Installment:</span>
          <span className="font-semibold">
            {formatPrice(property.quarterlyInstallment)}
          </span>
        </div>
      </div>
    </div>
  );
};
