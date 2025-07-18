// components/media/VideoGallery.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X,Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  category: string;
  description?: string;
}

interface VideoGalleryProps {
  videos: Video[];
  title?: string;
  description?: string;
}

const VideoGallery: React.FC<VideoGalleryProps> = ({
  videos,
  title = "Video Tours",
  description = "Take immersive tours of our luxury apartments"
}) => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [isPlaying, setIsPlaying] = useState(false);

  const categories = ["all", ...Array.from(new Set(videos.map(video => video.category)))];
  const filteredVideos = filter === "all" ? videos : videos.filter(video => video.category === filter);

  const handleVideoSelect = (index: number) => {
    setSelectedVideo(index);
    setIsPlaying(true);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {description}
        </motion.p>
      </div>

      {/* Category Filter */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant={filter === category ? "default" : "outline"}
            onClick={() => setFilter(category)}
            className={`capitalize px-6 py-2 rounded-full transition-all duration-300 ${
              filter === category
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105"
                : "hover:scale-105 hover:shadow-md"
            }`}
          >
            {category.replace("-", " ")}
          </Button>
        ))}
      </motion.div>

      {/* Video Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        layout
      >
        <AnimatePresence>
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="group cursor-pointer"
              onClick={() => handleVideoSelect(index)}
            >
              <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/30 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="h-8 w-8 text-white fill-white" />
                  </motion.div>
                </div>

                {/* Duration */}
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-white" />
                  <span className="text-white text-xs font-medium">{video.duration}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                  {video.category}
                </div>
              </div>

              {/* Video Info */}
              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {video.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Player */}
              <video
                src={filteredVideos[selectedVideo].videoUrl}
                controls
                autoPlay={isPlaying}
                className="w-full h-full object-contain"
                onLoadStart={() => setIsPlaying(true)}
              />

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20 bg-black/30 backdrop-blur-sm z-10"
                onClick={closeVideo}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {filteredVideos[selectedVideo].title}
                </h3>
                {filteredVideos[selectedVideo].description && (
                  <p className="text-white/80 text-sm">
                    {filteredVideos[selectedVideo].description}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoGallery;