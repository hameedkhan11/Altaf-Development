import React from "react";
import { PropertyDetail, PropertyKey } from "@/lib/types";
import Layout3D from "./Layout3D";
import { PricingCard } from "./PricingDetail";

interface PricingAndLayoutSectionProps {
  property: PropertyDetail;
  selectedProperty: PropertyKey;
}

export const PricingAndLayoutSection: React.FC<PricingAndLayoutSectionProps> = ({
  property,
}) => {
  return (
    <div className="mb-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 mt-24">
          Pricing & Floor Plan
        </h2>
        <p className="text-sm md:text-base max-w-2xl mx-auto">
          Explore detailed pricing breakdown and interactive 3D floor plans for your perfect home
        </p>
      </div>

      {/* Main Layout: Pricing Card Left, 3D Layout Right */}
      <div className="flex flex-col lg:flex-row">
        {/* Left Side - Pricing Card */}
        <div className="flex-1">
          <PricingCard property={property} />
        </div>
        
        {/* Right Side - 3D Layout */}
        <div className="flex-1">
          <Layout3D />
        </div>
      </div>
    </div>
  );
};