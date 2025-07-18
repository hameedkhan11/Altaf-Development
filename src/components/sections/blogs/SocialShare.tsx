// components/blog-detail/SocialShare.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { BlogPost } from "@/lib/blogs/types";

interface SocialShareProps {
  post: BlogPost;
  currentUrl: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ post, currentUrl }) => {
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      currentUrl
    )}&text=${encodeURIComponent(post.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`,
  };

  const handleShare = (platform: string, url: string) => {
    window.open(
      url,
      `share-${platform}`,
      'width=600,height=400,scrollbars=no,resizable=no'
    );
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-4 border sticky top-8 z-10"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      role="region"
      aria-label="Share this article"
    >
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-4 h-4 text-gray-600" aria-hidden="true" />
        <span className="text-sm font-semibold">Share</span>
      </div>
      
      <div className="flex flex-col gap-3">
        <button
          onClick={() => handleShare('facebook', shareLinks.facebook)}
          className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group w-full text-left"
          aria-label={`Share "${post.title}" on Facebook`}
        >
          <Facebook className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" aria-hidden="true" />
          <span className="text-sm text-blue-600">Facebook</span>
        </button>
        
        <button
          onClick={() => handleShare('twitter', shareLinks.twitter)}
          className="flex items-center gap-2 p-2 rounded-lg bg-sky-50 hover:bg-sky-100 transition-colors group w-full text-left"
          aria-label={`Share "${post.title}" on Twitter`}
        >
          <Twitter className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" aria-hidden="true" />
          <span className="text-sm text-sky-600">Twitter</span>
        </button>
        
        <button
          onClick={() => handleShare('linkedin', shareLinks.linkedin)}
          className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group w-full text-left"
          aria-label={`Share "${post.title}" on LinkedIn`}
        >
          <Linkedin className="w-4 h-4 text-blue-700 group-hover:scale-110 transition-transform" aria-hidden="true" />
          <span className="text-sm text-blue-700">LinkedIn</span>
        </button>
      </div>
    </motion.div>
  );
};

export default SocialShare;