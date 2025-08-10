"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Hero } from "@/components/common/Hero";
import { RegisterHero } from "@/components/register-form/hero-section";
import { properties } from "@/data/properties";
import { PropertySelector } from "@/components/property-detail/PropertySelector";
import { ImageGallery } from "@/components/property-detail/ImageDetailGallery";
import { PropertyDetailInfo } from "@/components/property-detail/PropertyDetailInfo";
import PropertyDetailAmenities  from "@/components/property-detail/PropertyDetailAmenities";
import { PropertyKey } from "@/lib/types";
import StructuredData from "@/components/seo/StructuredData";
// import { PricingAndLayoutSection } from "@/components/property-detail/PricingAndLayout";

// Separate component that uses useSearchParams
const PropertyDetailContent: React.FC = () => {
  const searchParams = useSearchParams();
  const propertyParam = searchParams.get("property") as PropertyKey;
  
  // Set initial state based on URL parameter, fallback to "1bed"
  const [selectedProperty, setSelectedProperty] = useState<PropertyKey>(
    propertyParam && (propertyParam === "1bed" || propertyParam === "2bed") 
      ? propertyParam 
      : "1bed"
  );

  // Update state when URL parameter changes
  useEffect(() => {
    if (propertyParam && (propertyParam === "1bed" || propertyParam === "2bed")) {
      setSelectedProperty(propertyParam);
    }
  }, [propertyParam]);

  // Now this will work correctly with PropertyDetail type
  const currentProperty = properties[selectedProperty as keyof typeof properties];
  
  // Add error handling in case property doesn't exist
  if (!currentProperty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Property not found</p>
      </div>
    );
  }

  return (
    <>
    <StructuredData pageType="property-detail" />
      <Hero
        backgroundType="image"
        backgroundSrc="Featured_Properties_ldygh0"
        fallbackImage="luxury-apartment-hero-gallery"
        height="three-quarter"
        overlay="light"
        contentAlignment="center"
        title="Featured Properties"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Properties", href: "/properties" },
        ]}
      />
      
      <div className="mx-auto mt-24 px-2 md:px-12 lg:px-16">
        <PropertySelector
          selectedProperty={selectedProperty}
          onPropertyChange={setSelectedProperty}
        />
                
        {/* Main Layout: Image Gallery Left, Property Stats Right */}
        <div className="flex flex-col lg:flex-row mt-8 gap-8">
          {/* Left Side - Image Gallery */}
          <div className="flex-1">
            <ImageGallery propertyType={selectedProperty} />
          </div>
          
          {/* Right Side - Property Stats */}
          <div className="flex-1">
            <PropertyDetailInfo property={currentProperty} />
          </div>
        </div>

        {/* New Pricing and 3D Layout Section */}
        {/* <PricingAndLayoutSection 
          property={currentProperty} 
          selectedProperty={selectedProperty}
        /> */}

        <PropertyDetailAmenities />
      </div>
      {/* <Amenities /> */}
      <RegisterHero /> 
      
    </>
  );
};

// Loading component
const PropertyDetailLoading: React.FC = () => (
  <div className="min-h-screen">
    <Hero
      backgroundType="image"
      backgroundSrc="Booking1_rg1bhs"
      fallbackImage="luxury-apartment-hero-gallery"
      height="screen"
      overlay="gradient"
      contentAlignment="center"
      title="Featured Properties"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Property-Detail", href: "/property-detail" },
      ]}
    />
    <div className="mx-auto mt-24 px-8 md:px-12 lg:px-16">
      <div className="animate-pulse">
        <div className="h-12 bg-gray-200 rounded mb-8"></div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 h-96 bg-gray-200 rounded"></div>
          <div className="w-full lg:w-96 space-y-4">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
        {/* Loading for new pricing section */}
        <div className="mt-16 mb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 h-96 bg-gray-200 rounded"></div>
            <div className="flex-1 h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main component wrapped with Suspense
const PropertyDetailSection: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<PropertyDetailLoading />}>
        <PropertyDetailContent />
      </Suspense>
    </div>
  );
};

export default PropertyDetailSection;