// components/blog-detail/RelatedBlogs.tsx
"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/lib/blogs/types";
import {
  fadeInRight,
  viewportOnce,
  getPerformanceVariant,
  scaleOnHover,
} from "@/lib/constants";
// import BlogCard from "@/components/cards/BlogCard";
import { sampleBlogPosts } from "@/data/blogs/data";

interface RelatedBlogsProps {
  currentPost: BlogPost;
}

const RelatedBlogs: React.FC<RelatedBlogsProps> = ({ currentPost }) => {
  const buttonAnimation = getPerformanceVariant(fadeInRight);

  // Get related posts based on category, excluding current post
  const getRelatedPosts = (
    currentPost: BlogPost,
    limit: number = 3
  ): BlogPost[] => {
    // First, try to get posts from the same category
    const sameCategoryPosts = sampleBlogPosts.filter(
      (post) =>
        post.category === currentPost.category && post.id !== currentPost.id
    );

    // If we have enough posts from the same category, return them
    if (sameCategoryPosts.length >= limit) {
      return sameCategoryPosts.slice(0, limit);
    }

    // Otherwise, fill with other recent posts
    const otherPosts = sampleBlogPosts.filter(
      (post) => post.id !== currentPost.id
    );
    const relatedPosts = [...sameCategoryPosts];

    // Add other posts until we reach the limit
    for (const post of otherPosts) {
      if (relatedPosts.length >= limit) break;
      if (!relatedPosts.some((p) => p.id === post.id)) {
        relatedPosts.push(post);
      }
    }

    return relatedPosts.slice(0, limit);
  };

  const relatedPosts = getRelatedPosts(currentPost);

  if (relatedPosts.length === 0) return null;

  return (
    <motion.section
      className="py-12 md:py-16 bg-gray-50"
      data-section="related-blogs"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={viewportOnce}
      aria-labelledby="related-articles-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.header
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={viewportOnce}
        >
          <h2 
            id="related-articles-heading"
            className="text-2xl md:text-3xl lg:text-5xl mb-3 md:mb-4"
          >
            RELATED ARTICLES
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Discover more insights and trends in luxury real estate
          </p>
        </motion.header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* {relatedPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))} */}
        </div>

        {/* View All Blogs Link */}
        <div className="flex justify-center">
          <motion.div {...buttonAnimation} viewport={viewportOnce}>
            <Link
              href="/blogs"
              className="comic-button text-white py-3 px-6 md:px-8 text-sm uppercase tracking-wide inline-block"
              aria-label="View all blog posts"
            >
              <motion.span
                {...scaleOnHover}
                className="flex font-bold active:text-white items-center"
              >
                SEE ALL BLOGS
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default RelatedBlogs;