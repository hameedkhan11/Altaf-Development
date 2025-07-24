"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Video,
  Play,
  // FileText,
  // Image as ImageIcon,
  // BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/common/Hero";
import PropertyImageGalleryComponent from "@/components/property-detail/PropertyImageGallery"; 
import { getAllPropertyGalleries, PropertyImageGallery } from "@/lib/image-queries";
import { Loader2 } from "lucide-react";

const MediaCenterPage = () => {
  const [activeSection, setActiveSection] = useState<string>("photos");
  const [galleries, setGalleries] = useState<PropertyImageGallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        setLoading(true);
        setError(null);

        const allGalleries = await getAllPropertyGalleries();
        console.log("Fetched galleries:", allGalleries);
        setGalleries(allGalleries);
      } catch (err) {
        console.error("Error fetching galleries:", err);
        setError(err instanceof Error ? err.message : 'Failed to fetch galleries');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

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
            {loading && (
              <div className="w-full flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                  <p className="text-gray-600 dark:text-gray-400">Loading gallery...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="w-full text-center py-20">
                <div className="text-red-500">
                  <p className="text-xl mb-2">Error loading gallery</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {galleries.length > 0 && activeSection === "photos" && (
              <div className="space-y-16">
                {galleries.map((galleryItem) => (
                  <PropertyImageGalleryComponent
                    key={galleryItem._id}
                    gallery={galleryItem}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl mb-4">Additional Resources</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Download brochures, floor plans, and access press materials
            </p>
          </motion.div>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            [
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
                  <p className="mb-6">{resource.description}</p>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0">
                    Access Resources →
                  </Button>
                </motion.div>
              );
            })}
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default MediaCenterPage;