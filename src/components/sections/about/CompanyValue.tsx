import React from "react";
import FeaturesGrid from "./FeaturesGrid";

export const CompanyValuesSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-12">
          Our Pillars of Excellence
        </h2>

        <FeaturesGrid />
      </div>
    </section>
  );
};
