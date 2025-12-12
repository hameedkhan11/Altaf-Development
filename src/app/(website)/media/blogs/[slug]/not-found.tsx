// app/blogs/[slug]/not-found.tsx
"use client";
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedH1, AnimatedP } from '@/components/ui/text-animations';

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Animation */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-9xl font-bold text-[rgb(140,46,71)] select-none">
            404
          </div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* <Search className="w-16 h-16 text- opacity-50" /> */}
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <AnimatedH1 wordByWord={true} duration={0.6} className="text-3xl  mb-4">
            Blog Post Not Found
          </AnimatedH1>
          
          <AnimatedP className="mb-8 leading-relaxed">
            Sorry, we couldn&apos;t find the blog post you&apos;re looking for. It might have been moved, deleted, or the URL might be incorrect.
          </AnimatedP>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 bg-[rgb(140,46,71] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blogs
            </Link>
            
            <Link
              href="/"
              className="inline-flex bg-[rgb(140,46,71)] text-white items-center gap-2 border-2  px-6 py-3 rounded-lg font-semibold hover:bg-transparent hover:text-[rgb(140,46,71)] hover:border-2 hover:border-[rgb(140,46,71)]  transition-all duration-300 ease-in group"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#8B2131] rounded-full opacity-20"
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-[#B91C1C] rounded-full opacity-30"
          animate={{ scale: [1, 2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] rounded-full opacity-10"
          animate={{ scale: [1, 1.8, 1], rotate: [0, 360, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        />
      </div>
    </div>
  );
}