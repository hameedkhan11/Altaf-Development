"use client";
// import { CompanyValueCard } from "@/components/cards/CompanyValueCard";
import { CompanyValue } from "@/lib/about-us/types";
import React from "react";
import FeaturesGrid from "./FeaturesGrid";

interface CompanyValuesSectionProps {
  values: CompanyValue[];
  description: string;
}

export const CompanyValuesSection: React.FC<CompanyValuesSectionProps> = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6">
            Our Pillars of Excellence
          </h2>
        </div>

        <FeaturesGrid />
      </div>
    </section>
  );
};
