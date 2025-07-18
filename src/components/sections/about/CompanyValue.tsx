"use client";
// import { CompanyValueCard } from "@/components/cards/CompanyValueCard";
import { CompanyValue } from "@/lib/about-us/types";
import React from "react";
import FeaturesGrid from "./FeaturesGrid";

interface CompanyValuesSectionProps {
  values: CompanyValue[];
  description: string;
}

export const CompanyValuesSection: React.FC<CompanyValuesSectionProps> = ({
  // values,
  description,
}) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6">
            Our Core Values
          </h2>
          <p className="text-base sm:text-lg max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            {description}
          </p>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-[rgb(140,46,71)] to-[rgb(180,86,111)] mx-auto rounded-full" />
        </div>

        <FeaturesGrid />
      </div>
    </section>
  );
};
