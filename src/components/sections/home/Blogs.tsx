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
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12">
          <AnimatedH2
            wordByWord={true}
            duration={0.6}
            className="text-3xl md:text-4xl lg:text-5xl mb-4"
          >
            Featured Posts
          </AnimatedH2>
          <AnimatedP className="max-w-xl md:max-w-2xl mx-auto text-sm md:text-base">
            Discover our most popular and insightful articles
          </AnimatedP>
        </div>

        {/* Mobile Horizontal Slider */}
        <div className="block md:hidden mb-8">
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
          <div className="flex justify-center mt-6 space-x-2">
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
              />
            ))}
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:block lg:hidden mb-8">
          <div className="flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory gap-4 pb-4">
            {posts.map((post) => (
              <div key={post._id} className="flex-shrink-0 w-80 snap-start">
                <FeaturedPostCard post={post} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <FeaturedPostCard key={post._id} post={post} />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/blogs">
            <Button
              className={`relative px-5 bg-[rgb(140,46,71)] hover:bg-transparent hover:text-[rgb(140,46,71)] hover:border-2 hover:border-[rgb(140,46,71)] cursor-pointer rounded-full font-bold mr-8 overflow-hidden py-6`}
            >
              <div className="flex items-center">
                <span className="transition-all duration-300 ease-in font-bold px-8">
                  VIEW ALL
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300" />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}