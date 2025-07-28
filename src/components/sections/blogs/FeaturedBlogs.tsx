// components/FeaturedBlog.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
// import { Clock, User, Calendar } from 'lucide-react';
import { FeaturedBlogProps } from '@/lib/blogs/types';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  viewportOnce,
  delays,
  getPerformanceVariant,
} from "@/lib/constants";
// import { ArrowIcon } from '../../../../public/icons/ArrowIcon';
import { CldImage } from 'next-cloudinary';

const FeaturedBlog: React.FC<FeaturedBlogProps> = ({ post }) => {
  // Performance-aware animations
  const containerAnimation = getPerformanceVariant(fadeInUp);
  const contentAnimation = getPerformanceVariant(fadeInLeft);
  const imageAnimation = getPerformanceVariant(fadeInRight);

  return (
    <motion.section 
      className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-gray-50 to-white"
      {...containerAnimation}
      viewport={viewportOnce}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Featured Badge */}
        {/* <motion.div
          className="flex items-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: delays.short }}
          viewport={viewportOnce}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-2 h-2 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm uppercase tracking-widest font-bold">
              Featured Article
            </span>
            <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-[#8B2131] to-[#B91C1C]"></div>
          </div>
        </motion.div> */}

        {/* Main Featured Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-4 sm:space-y-6 order-2 lg:order-1"
            {...contentAnimation}
            viewport={viewportOnce}
          >
            {/* Category and Meta Info */}
            {/* <motion.div 
              className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4 text-sm text-gray-600"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: delays.medium }}
              viewport={viewportOnce}
            >
              <span className="px-3 py-1 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] text-white rounded-full text-xs uppercase font-semibold tracking-wide">
                {post.category}
              </span>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                {post.author && (
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{post.author}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{post.date}</span>
                </div>
                
                {post.readTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{post.readTime}</span>
                  </div>
                )}
              </div>
            </motion.div> */}

            {/* Title */}
            <motion.h1 
              className="text-xl sm:text-2xl md:text-3xl leading-tight max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: delays.long }}
              viewport={viewportOnce}
            >
              {post.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p 
              className="text-sm  leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: delays.long + 0.1 }}
              viewport={viewportOnce}
            >
              {post.excerpt}
            </motion.p>

            {/* Read More Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: delays.long + 0.2 }}
              viewport={viewportOnce}
            >
              <Link 
                href={`/blogs/${post.slug}`}
                className="inline-flex items-center gap-3 w-full sm:w-auto text-white sm:px-4 py-3 px-4 rounded-xs uppercase tracking-wide transition-all duration-300 group bg-[rgb(140,46,71)] hover:bg-transparent hover:border-2 hover:border-[rgb(140,46,71)] hover:text-[rgb(140,46,71)]"
              >
                <motion.span
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className='flex gap-3 sm:gap-4 items-center py-1 font-semibold'
                >
                  Read Full Article
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            className="relative order-1 lg:order-2"
            {...imageAnimation}
            viewport={viewportOnce}
          >
            <motion.div
              className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] w-full overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <CldImage
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  aria-label='Blog image'
                />
              </motion.div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gradient-to-br from-[#8B2131] to-[#B91C1C] rounded-full opacity-20 blur-xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-3 sm:-bottom-6 -left-3 sm:-left-6 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-gradient-to-br from-[#B91C1C] to-[#8B2131] rounded-full opacity-10 blur-2xl"
              animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedBlog;