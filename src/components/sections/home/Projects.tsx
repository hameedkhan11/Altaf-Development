"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/cards/ProjectCard";
import sanityService from "@/lib/sanityService";
import { AnimatedH1 } from "@/components/ui/text-animations";

interface PropertyData {
  _id: string;
  title: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  location?: string;
  propertyType: "1bed" | "2bed";
  featuredImage: string;
  allImages: string[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const ProjectsSection = () => {
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await sanityService.getFeaturedProperties();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-[400px] rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8 mb-8"
      >
        <AnimatedH1 className="text-2xl sm:text-3xl md:text-4xl w-full lg:w-[40%] mb-0 leading-tight">
          Preview Modern Elegance
        </AnimatedH1>

        <div className="flex flex-col gap-3 sm:gap-4 w-full lg:w-[20%]">
          <Button className="bg-[rgb(140,46,71)] text-white hover:bg-transparent hover:text-[rgb(140,46,71)] py-3 sm:py-4 md:py-5 lg:py-6 px-4 sm:px-6 w-full text-sm sm:text-base md:text-lg transition-all duration-300 ease-in transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-transparent cursor-pointer hover:border-[rgb(140,46,71)]">
            View All Apartments
          </Button>
        </div>
      </motion.div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {properties.map((property, index) => (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                y: -3,
                scale: 1.005,
                transition: { duration: 0.15, ease: "easeOut" },
              }}
            >
              <ProjectCard
                image={property.featuredImage}
                title={property.title}
                price={property.price}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                propertyType={property.propertyType}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;