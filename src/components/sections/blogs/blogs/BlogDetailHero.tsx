// components/blog-detail/BlogDetailHero.tsx
import React from "react";
import { Hero } from "@/components/common/Hero";
import { HeroImage } from "@/lib/hero/types";

interface BlogDetailHeroProps {
  post: {
    title: string;
    excerpt?: string;
    categories?: Array<{
      title: string;
      slug?: {
        current: string;
      };
    }>;
    slug?: {
      current: string;
    };
  };
  heroImage?: HeroImage | null; // New prop for Sanity hero image
}

const BlogDetailHero: React.FC<BlogDetailHeroProps> = ({ post }) => {
  const breadcrumbs = [
    { label: "Media", href: "/" },
    { label: "Blogs", href: "/media/blogs" },
    { label: post.title, href: "#" }
  ];

  return (
    <Hero
      // title={post.title}
      // subtitle={post.excerpt}
      backgroundType="image"
      backgroundSrc="Blogs_lbursu"
      breadcrumbs={breadcrumbs}
      height="three-quarter"
      contentAlignment="left"
      enableAnimations={true}
      // enableParallax={true}
      // parallaxSpeed={0.3}
      ariaLabel={`Blog post: ${post.title}`}
    />
  );
};

export default BlogDetailHero;