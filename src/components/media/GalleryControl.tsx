// components/media/GalleryControls.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

interface GalleryControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  categories: string[];
  isInView: boolean;
}

const GalleryControls: React.FC<GalleryControlsProps> = ({
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  categories,
  isInView
}) => {
  return (
    <motion.div 
      className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 relative z-10"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            variant={filter === category ? "default" : "outline"}
            onClick={() => setFilter(category)}
            className={`capitalize px-6 py-2 uiverse-btn rounded-xl font-optima transition-all duration-300 ${
              filter === category
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg border-0"
                : "hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
            }`}
          >
            {category.replace("-", " ")}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default GalleryControls;