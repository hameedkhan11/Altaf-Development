// components/blog/BlogHero.tsx
import { BreadcrumbItem } from '@/lib/types';
import { HeroImage } from '@/lib/hero/types';
import { Hero } from '@/components/common/Hero';

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
}: BlogHeroProps) {
  // Create breadcrumb items for blog
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Media", href: "/" },
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
      title="Spaces with Stories"
      subtitle="Thoughts, trends, and journeys from the heart of our developments."
      backgroundType={backgroundVideo ? "video" : "image"}
      backgroundSrc={backgroundVideo || backgroundImage}
      fallbackImage={fallbackImage}
      height='three-quarter'
      overlay="medium"
      contentAlignment="center"
      breadcrumbs={breadcrumbs}
      showScrollIndicator={false}
      enableAnimations={true}
      // enableParallax={true}
      // parallaxSpeed={0.5}
      ariaLabel="Blog hero section"
    >
    </Hero>
  );
}