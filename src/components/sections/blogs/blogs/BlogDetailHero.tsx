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

const BlogDetailHero: React.FC<BlogDetailHeroProps> = ({ post, heroImage }) => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blogs", href: "/blogs" },
    { label: post.title, href: "#" }
  ];

  return (
    <Hero
      heroImage={heroImage}
      // title={post.title}
      // subtitle={post.excerpt}
      backgroundType="image"
      backgroundSrc="imgi_89_e7vHmyk3naIt1aqkQMnTzkZ50_tjrfnt"
      breadcrumbs={breadcrumbs}
      height="half"
      overlay="gradient"
      contentAlignment="left"
      enableAnimations={true}
      // enableParallax={true}
      // parallaxSpeed={0.3}
      ariaLabel={`Blog post: ${post.title}`}
    />
  );
};

export default BlogDetailHero;