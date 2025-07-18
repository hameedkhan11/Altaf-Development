// app/media/photos/page.tsx
"use client";

import { Hero } from "@/components/common/Hero";
import NextCloudinaryGallery from "@/components/media/PhotoGallery";
// import PhotoGallery from "@/components/media/PhotoGallery";
import React from "react";

// Sample data - replace with your actual images
// const sampleImages = [
//   {
//     id: "1",
//     src: "luxury-apartment-living-room-1",
//     alt: "Spacious living room with modern furniture and city view",
//     category: "living-spaces",
//     title: "Modern Living Room",
//   },
//   {
//     id: "2",
//     src: "luxury-apartment-kitchen-1",
//     alt: "Contemporary kitchen with marble countertops",
//     category: "kitchen",
//     title: "Gourmet Kitchen",
//   },
//   {
//     id: "3",
//     src: "luxury-apartment-bedroom-1",
//     alt: "Master bedroom with panoramic windows",
//     category: "bedrooms",
//     title: "Master Suite",
//   },
//   {
//     id: "4",
//     src: "luxury-apartment-bathroom-1",
//     alt: "Spa-like bathroom with rainfall shower",
//     category: "bathrooms",
//     title: "Luxury Bathroom",
//   },
//   {
//     id: "5",
//     src: "luxury-apartment-balcony-1",
//     alt: "Private balcony with city skyline view",
//     category: "outdoor",
//     title: "Private Terrace",
//   },
//   {
//     id: "6",
//     src: "luxury-apartment-amenities-1",
//     alt: "Rooftop pool and lounge area",
//     category: "amenities",
//     title: "Rooftop Pool",
//   },
//   {
//     id: "7",
//     src: "luxury-apartment-living-room-2",
//     alt: "Open concept living and dining area",
//     category: "living-spaces",
//     title: "Open Concept Design",
//   },
//   {
//     id: "8",
//     src: "luxury-apartment-kitchen-2",
//     alt: "Island kitchen with premium appliances",
//     category: "kitchen",
//     title: "Chef's Kitchen",
//   },
//   {
//     id: "9",
//     src: "luxury-apartment-bedroom-2",
//     alt: "Guest bedroom with elegant decor",
//     category: "bedrooms",
//     title: "Guest Suite",
//   },
//   {
//     id: "10",
//     src: "luxury-apartment-amenities-2",
//     alt: "Fitness center with modern equipment",
//     category: "amenities",
//     title: "Fitness Center",
//   },
//   {
//     id: "11",
//     src: "luxury-apartment-outdoor-2",
//     alt: "Garden courtyard with water features",
//     category: "outdoor",
//     title: "Garden Oasis",
//   },
//   {
//     id: "12",
//     src: "luxury-apartment-lobby-1",
//     alt: "Grand lobby with marble and gold accents",
//     category: "common-areas",
//     title: "Grand Lobby",
//   },
// ];

const PhotoGalleryPage = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <Hero
        title="Visual Journey"
        backgroundType="image"
        backgroundSrc="Booking1_rg1bhs"
        fallbackImage="luxury-apartment-hero-gallery"
        height="half"
        overlay="gradient"
        contentAlignment="center"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Media", href: "/media" },
          { label: "Photo Gallery", href: "/media/photos" },
        ]}
      />

      {/* Gallery Section */}
      <section className="py-20 px-16 sm:px-6 lg:px-8 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto">
          <NextCloudinaryGallery
            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}
            folder="photos" // Your Cloudinary folder name
            title="My Photo Gallery"
            description="A beautiful collection of moments captured through the lens"
            standalone={true}
            maxResults={100} // Maximum number of images to fetch
          />
        </div>
      </section>
    </div>
  );
};

export default PhotoGalleryPage;
