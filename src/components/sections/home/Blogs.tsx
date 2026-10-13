"use client";
import { FeaturedPostCard } from "@/components/cards/PostCard";
import { Button } from "@/components/ui/button";
import { AnimatedH2, AnimatedP } from "@/components/ui/text-animations";
import type { Article } from "@/data/articles";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

interface FeaturedPostsSectionProps {
  posts: Article[];
  section?: "blogs" | "articles";
}

export function FeaturedPostsSection({ posts, section = "blogs" }: FeaturedPostsSectionProps) {
  const isArticle = section === "articles";
  const basePath = isArticle ? "/media/articles" : "/media/blogs";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-scroll functionality for mobile
  useEffect(() => {
    // Do not run a hidden carousel on desktop or for reduced-motion users.
    if (!isAutoScrolling || posts.length <= 1) return;
    const mobile = window.matchMedia("(max-width: 639px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mobile.matches || reducedMotion.matches) return;

    const interval = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      if (document.hidden || !mobile.matches || reducedMotion.matches) return;
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

  // Pause and resume cleanly so carousel timers do not accumulate.
  const pauseAutoplay = () => {
    setIsAutoScrolling(false);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };
  const resumeAutoplay = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsAutoScrolling(true), 8000);
  };
  useEffect(() => () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);
  const handleTouchStart = pauseAutoplay;
  const handleTouchEnd = resumeAutoplay;


  return (
    <section className="py-16 sm:py-20 md:py-22 lg:py-24">
      <div className="mx-auto px-4 sm:px-4 md:px-4 lg:px-4 xl:px-8 2xl:px-12">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <AnimatedH2
            wordByWord={true}
            duration={0.6}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4"
          >
            {isArticle ? "Featured Article" : "Featured Blogs"}
          </AnimatedH2>
          <AnimatedP className="max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg">
            {isArticle ? "Explore our latest editorial feature" : "Explore stories and insights from our previous blogs"}
          </AnimatedP>
        </div>

        {posts.length > 0 ? (
        <>
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
              <div key={post.slug} className="flex-shrink-0 w-full snap-start px-2">
                <div className="w-full">
                  <FeaturedPostCard post={post} basePath={basePath} />
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation dots for mobile */}
          <div className="flex justify-center mt-2 gap-3">
            {posts.map((post, index) => (
              <button
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 flex items-center justify-center p-2 ${
                  index === currentIndex ? 'bg-[rgb(140,46,71)] scale-110' : 'border border-[rgb(140,46,71)] hover:bg-gray-300'
                }`}
                onClick={() => {
                  pauseAutoplay();
                  const container = scrollContainerRef.current;
                  if (container) {
                    const cardWidth = container.clientWidth;
                    container.scrollTo({
                      left: index * cardWidth,
                      behavior: 'smooth'
                    });
                    setCurrentIndex(index);
                  }
                  resumeAutoplay();
                }}
                aria-label={`Go to ${isArticle ? "article" : "blog"}: ${post.title}`}
                aria-current={index === currentIndex ? "true" : "false"}
              />
            ))}
          </div>
        </div>

        {/* One responsive grid for tablets and desktops. Previously five copies of
            every card were mounted and hidden with CSS at different breakpoints. */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 2xl:gap-8 auto-rows-fr max-w-7xl mx-auto">
          {posts.map((post) => (
            <div
              key={post.slug}
              className={posts.length === 1 ? "h-full col-span-full max-w-md w-full mx-auto" : "h-full"}
            >
              <FeaturedPostCard post={post} basePath={basePath} />
            </div>
          ))}
        </div>

        </>
        ) : (
          <p className="text-center text-gray-600 py-8 text-sm sm:text-base">Explore our earlier stories in the Blogs section.</p>
        )}

        <div className="relative flex justify-center mt-6 sm:mt-7 md:mt-8">
          <Link href={basePath}>
            <Button
              className={`px-4 sm:px-5 bg-[rgb(140,46,71)] hover:bg-transparent hover:text-[rgb(140,46,71)] border-2 hover:border-[rgb(140,46,71)] cursor-pointer rounded-full font-bold overflow-hidden py-4 sm:py-5 md:py-6 text-sm sm:text-base`}
              aria-label={isArticle ? "View Article" : "View Blog"}
            >
              <div className="flex items-center">
                <span className="transition-all duration-300 ease-in font-bold px-6 sm:px-7 md:px-8 py-4 sm:py-6 md:py-8">
                  {isArticle ? "VIEW ARTICLE" : "VIEW BLOG"}
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