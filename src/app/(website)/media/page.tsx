// app/media/page.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
// import PhotoGallery from "@/components/media/PhotoGallery";
// import VideoGallery from "@/components/media/VideoGallery";
// import VirtualTours from "@/components/media/VirtualTour";
import {
  Camera,
  Video,
  Play,
  FileText,
  Image as ImageIcon,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/common/Hero";

// Sample data - replace with your actual data
// const sampleImages = [
//   {
//     id: "1",
//     src: "/images/Booking1.jpg",
//     alt: "Luxury Living Room",
//     category: "living-room",
//     title: "Spacious Living Area",
//   },
//   {
//     id: "2",
//     src: "/images/Booking2.jpg",
//     alt: "Master Bedroom",
//     category: "bedroom",
//     title: "Master Bedroom Suite",
//   },
//   {
//     id: "3",
//     src: "/images/Booking3.jpg",
//     alt: "Modern Kitchen",
//     category: "kitchen",
//     title: "Designer Kitchen",
//   },
//   {
//     id: "4",
//     src: "/images/Apartment1.jpg",
//     alt: "Luxury Bathroom",
//     category: "bathroom",
//     title: "Premium Bathroom",
//   },
//   {
//     id: "5",
//     src: "/images/Apartment2.jpg",
//     alt: "Private Balcony",
//     category: "outdoor",
//     title: "Private Balcony View",
//   },
//   {
//     id: "6",
//     src: "/images/Apartment3.jpg",
//     alt: "Building Lobby",
//     category: "amenities",
//     title: "Grand Lobby",
//   },
// ];

// const sampleVideos = [
//   {
//     id: "1",
//     title: "One Bedroom Apartment Tour",
//     thumbnail: "/images/video-thumb-1.jpg",
//     videoUrl: "/videos/1bed-tour.mp4",
//     duration: "3:45",
//     category: "apartment-tours",
//     description: "Complete walkthrough of our luxury one-bedroom apartment",
//   },
//   {
//     id: "2",
//     title: "Two Bedroom Apartment Tour",
//     thumbnail: "/images/video-thumb-2.jpg",
//     videoUrl: "/videos/2bed-tour.mp4",
//     duration: "5:20",
//     category: "apartment-tours",
//     description: "Detailed tour of our spacious two-bedroom unit",
//   },
//   {
//     id: "3",
//     title: "Building Amenities Overview",
//     thumbnail: "/images/video-thumb-3.jpg",
//     videoUrl: "/videos/amenities.mp4",
//     duration: "4:15",
//     category: "amenities",
//     description: "Explore our world-class amenities and facilities",
//   },
// ];

// const sampleTours = [
//   {
//     id: "1",
//     title: "One Bedroom Luxury Suite",
//     thumbnail: "/images/tour-thumb-1.jpg",
//     tourUrl: "https://my.matterport.com/show/?m=example1",
//     type: "3D" as const,
//     propertyType: "Apartment",
//     rooms: 1,
//     area: "750 sq ft",
//     description: "Experience our premium one-bedroom apartment in immersive 3D",
//     featured: true,
//   },
//   {
//     id: "2",
//     title: "Two Bedroom Premium Unit",
//     thumbnail: "/images/tour-thumb-2.jpg",
//     tourUrl: "https://my.matterport.com/show/?m=example2",
//     type: "360" as const,
//     propertyType: "Apartment",
//     rooms: 2,
//     area: "1200 sq ft",
//     description: "360° tour of our spacious two-bedroom luxury apartment",
//     featured: true,
//   },
//   {
//     id: "3",
//     title: "Rooftop Amenities",
//     thumbnail: "/images/Booking3.jpg",
//     tourUrl: "https://my.matterport.com/show/?m=example3",
//     type: "360" as const,
//     propertyType: "Amenities",
//     rooms: 0,
//     area: "Various",
//     description: "Explore our stunning rooftop facilities and amenities",
//   },
// ];

const MediaCenterPage = () => {
  const [activeSection, setActiveSection] = useState<string>("photos");

  const sections = [
    {
      id: "photos",
      name: "Photo Gallery",
      icon: Camera,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "videos",
      name: "Video Tours",
      icon: Video,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "virtual",
      name: "Virtual Tours",
      icon: Play,
      color: "from-green-500 to-emerald-500",
    },
  ];

  // const renderActiveSection = () => {
  //   switch (activeSection) {
  //     case "photos":
  //       return (
  //         <PhotoGallery
  //           images={sampleImages}
  //           standalone={false} // This ensures consistent behavior with header detection
  //         />
  //       );
  //     case "videos":
  //       return <VideoGallery videos={sampleVideos} />;
  //     // case "virtual":
  //     //   return <VirtualTours tours={sampleTours} />;
  //     default:
  //       return <PhotoGallery images={sampleImages} standalone={false} />;
  //   }
  // };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Media Center", href: "/media" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Media Center"
        backgroundType="image"
        backgroundSrc="Booking1_rg1bhs"
        fallbackImage="/images/Booking1.jpg"
        height="screen"
        overlay="dark"
        contentAlignment="center"
        breadcrumbs={breadcrumbs}
        enableAnimations={true}
        ariaLabel="Media Center Hero Section"
      >
        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-3 ${
                  activeSection === section.id
                    ? `bg-gradient-to-r ${section.color} text-white shadow-lg scale-105`
                    : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
                }`}
              >
                <Icon className="h-5 w-5" />
                {section.name}
              </Button>
            );
          })}
        </div>
      </Hero>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* {renderActiveSection()} */}
          </motion.div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20 ">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl mb-4">
              Additional Resources
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Download brochures, floor plans, and access press materials
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Property Brochures",
                description: "Detailed specifications and features",
                color: "from-orange-500 to-red-500",
                href: "/media/brochures",
              },
              {
                icon: ImageIcon,
                title: "Floor Plans",
                description: "Architectural layouts and dimensions",
                color: "from-indigo-500 to-purple-500",
                href: "/media/floor-plans",
              },
              {
                icon: BookOpen,
                title: "Press Kit",
                description: "Media resources and press releases",
                color: "from-teal-500 to-blue-500",
                href: "/media/press",
              },
            ].map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={resource.title}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${resource.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {resource.title}
                  </h3>
                  <p className="mb-6">
                    {resource.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-700  p-0 "
                  >
                    Access Resources →
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaCenterPage;