"use client";
import { FeaturedPostCard } from "@/components/cards/PostCard";
import { Button } from "@/components/ui/button";
import { AnimatedH2, AnimatedP } from "@/components/ui/text-animations";
import type { PostPreview } from "@/lib/sanity/sanity";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

interface FeaturedPostsSectionProps {
  posts: PostPreview[];
}

export function FeaturedPostsSection({ posts }: FeaturedPostsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll functionality for mobile
  useEffect(() => {
    if (!isAutoScrolling || !posts || posts.length <= 1) return;

    const interval = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const nextIndex = (currentIndex + 1) % posts.length;
      const cardWidth = container.clientWidth;
      
      container.scrollTo({
        left: nextIndex * cardWidth,
        behavior: 'smooth'
      });
      
      setCurrentIndex(nextIndex);
    }, 4000); // Scroll every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoScrolling, currentIndex, posts]);

  // Handle scroll events to update current index
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / cardWidth);
    
    if (newIndex !== currentIndex && posts) {
      setCurrentIndex(Math.max(0, Math.min(posts.length - 1, newIndex)));
    }
  };

  // Handle touch interactions
  const handleTouchStart = () => {
    setIsAutoScrolling(false);
  };

  const handleTouchEnd = () => {
    // Resume auto-scroll after 8 seconds of inactivity
    setTimeout(() => setIsAutoScrolling(true), 8000);
  };

  // Early return after all hooks have been called
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 md:py-22 lg:py-24">
      <div className="mx-auto px-4 sm:px-4 md:px-4 lg:px-4 xl:px-8 2xl:px-12">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <AnimatedH2
            wordByWord={true}
            duration={0.6}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4"
          >
            Featured Posts
          </AnimatedH2>
          <AnimatedP className="max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg">
            Discover our most popular and insightful articles
          </AnimatedP>
        </div>

        {/* Mobile Horizontal Slider */}
        <div className="block sm:hidden mb-6">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory"
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {posts.map((post) => (
              <div key={post._id} className="flex-shrink-0 w-full snap-start px-2">
                <div className="w-full">
                  <FeaturedPostCard post={post} />
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation dots for mobile */}
          <div className="flex justify-center mt-4 space-x-2">
            {posts.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-[rgb(140,46,71)]' : 'bg-gray-300'
                }`}
                onClick={() => {
                  setIsAutoScrolling(false);
                  const container = scrollContainerRef.current;
                  if (container) {
                    const cardWidth = container.clientWidth;
                    container.scrollTo({
                      left: index * cardWidth,
                      behavior: 'smooth'
                    });
                    setCurrentIndex(index);
                  }
                  setTimeout(() => setIsAutoScrolling(true), 8000);
                }}
                aria-label="Go to slide"
              />
            ))}
          </div>
        </div>

        {/* Small Tablet Horizontal Slider */}
        <div className="hidden sm:block md:hidden mb-6">
          <div className="grid grid-cols-2 gap-4 auto-rows-fr max-w-5xl mx-auto">
            {posts.map((post) => (
              <div key={post._id} className="h-full">
                <FeaturedPostCard post={post} />
              </div>
            ))}
          </div>
        </div>

        {/* Medium Tablet - 2 Column Grid with larger cards */}
        <div className="hidden md:block lg:hidden mb-6">
          <div className="grid grid-cols-2 gap-4 auto-rows-fr max-w-5xl mx-auto">
            {posts.map((post) => (
              <div key={post._id} className="h-full">
                <FeaturedPostCard post={post} />
              </div>
            ))}
          </div>
        </div>

        {/* Large Desktop - 3 Column Grid */}
        <div className="hidden lg:block xl:hidden">
          <div className="grid grid-cols-3 gap-4 auto-rows-fr">
            {posts.map((post) => (
              <div key={post._id} className="h-full">
                <FeaturedPostCard post={post} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Extra Large Desktop - 3 Column Grid with more space */}
        <div className="hidden xl:block 2xl:hidden">
          <div className="grid grid-cols-3 gap-6 auto-rows-fr">
            {posts.map((post) => (
              <div key={post._id} className="h-full">
                <FeaturedPostCard post={post} />
              </div>
            ))}
          </div>
        </div>
        
        {/* 2XL screens and above - 3 Column Grid with maximum space */}
        <div className="hidden 2xl:block">
          <div className="grid grid-cols-3 gap-8 auto-rows-fr">
            {posts.map((post) => (
              <div key={post._id} className="h-full">
                <FeaturedPostCard post={post} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6 sm:mt-7 md:mt-8">
          <Link href="/blogs">
            <Button
              className={`relative px-4 sm:px-5 bg-[rgb(140,46,71)] hover:bg-transparent hover:text-[rgb(140,46,71)] hover:border-2 hover:border-[rgb(140,46,71)] cursor-pointer rounded-full font-bold overflow-hidden py-4 sm:py-5 md:py-6 text-sm sm:text-base`}
              aria-label="View All Blogs"
            >
              <div className="flex items-center">
                <span className="transition-all duration-300 ease-in font-bold px-6 sm:px-7 md:px-8">
                  VIEW ALL
                </span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300" />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}