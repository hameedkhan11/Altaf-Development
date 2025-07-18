// components/blog/BlogHero.tsx
import React from 'react';
import { BreadcrumbItem } from '@/lib/types';
import { Hero } from '@/components/common/Hero';
import { HeroImage } from '@/lib/hero/types';

interface BlogHeroProps {
  searchParams: { [key: string]: string | string[] | undefined };
  backgroundImage?: string;
  backgroundVideo?: string;
  fallbackImage?: string;
  heroImage?: HeroImage | null;
}

export function BlogHero({
  searchParams,
  backgroundImage = "blog-hero-bg", 
  backgroundVideo,
  fallbackImage = "blog-hero-fallback",
  heroImage
}: BlogHeroProps) {
  // Create breadcrumb items for blog
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blogs" }
  ];

  // Add dynamic breadcrumb based on search params
  if (searchParams?.category) {
    breadcrumbs.push({
      label: `Category: ${searchParams.category}`,
      href: `/blogs?category=${searchParams.category}`
    });
  }

  return (
    <Hero
      heroImage={heroImage} 
      title="Real Estate Blog"
      subtitle="Expert insights, market trends, and property advice"
      backgroundType={backgroundVideo ? "video" : "image"}
      backgroundSrc={backgroundVideo || backgroundImage}
      fallbackImage={fallbackImage}
      height="auto"
      overlay="medium"
      contentAlignment="center"
      breadcrumbs={breadcrumbs}
      showScrollIndicator={false}
      enableAnimations={true}
      enableParallax={true}
      parallaxSpeed={0.5}
      ariaLabel="Blog hero section"
    >
    </Hero>
  );
}