// ProjectsSection.jsx
"use client";
import  { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/cards/ProjectCard";
import sanityService from "@/lib/sanityService";
import { AnimatedH1 } from "@/components/ui/text-animations";
import Link from "next/link";

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
        console.log(data)
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
      <section className="py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* UPDATED: Changed lg:grid-cols-2 to md:grid-cols-2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse">
              {/* NOTE: The skeleton already uses a good responsive approach with aspect-ratio */}
              <div className="bg-gray-200 w-full aspect-[4/3] rounded-lg mb-4"></div>
              <div className="space-y-2 p-4">
                <div className="h-4 xs:h-5 sm:h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 xs:h-4 sm:h-5 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 2xl:py-24 px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 overflow-hidden">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 xs:gap-5 sm:gap-6 lg:gap-8 mb-4 "
      >
        {/* UPDATED: Changed lg:w-[60%] to md:w-[60%] for consistent breakpoint */}
        <AnimatedH1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl w-full md:w-[60%] xl:w-[50%] 2xl:w-[40%] mb-0 leading-tight">
          Preview Modern Elegance
        </AnimatedH1>
        
        {/* UPDATED: Changed lg:w-[35%] to md:w-auto to allow natural sizing on tablet */}
        <Link href={'/property-detail'} className="flex flex-col gap-3 sm:gap-4 w-full sm:w-auto md:w-auto">
          <Button className="bg-[rgb(140,46,71)] text-white hover:bg-transparent hover:text-[rgb(140,46,71)] py-3 xs:py-3.5 sm:py-4 md:py-4.5 lg:py-4 xl:py-5 2xl:py-6 px-4 xs:px-5 sm:px-6 md:px-7 lg:px-6 xl:px-7 2xl:px-8 w-full text-sm xs:text-base sm:text-lg md:text-xl lg:text-base xl:text-lg 2xl:text-xl transition-all duration-300 ease-in transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-transparent cursor-pointer hover:border-[rgb(140,46,71)] rounded-full font-medium"
          aria-label="View All Apartments"
          >
            View All Apartments
          </Button>
        </Link>
      </motion.div>

      <div className="mx-auto relative z-10 max-w-full">
        <motion.div
          // UPDATED: Changed lg:grid-cols-2 to md:grid-cols-2
          className="grid grid-cols-1 md:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 md:gap-10 lg:gap-10 xl:gap-12 2xl:gap-16"
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
              className="w-full max-w-full"
            >
              <ProjectCard
                image={property.featuredImage}
                title={property.title}
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