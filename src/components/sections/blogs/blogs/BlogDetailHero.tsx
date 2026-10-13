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
  heroImage?: HeroImage | null;
  section?: "blogs" | "articles";
}

const BlogDetailHero: React.FC<BlogDetailHeroProps> = ({ post, section = "blogs" }) => {
  const breadcrumbs = [
    { label: "Media", href: "/" },
    { label: section === "articles" ? "Articles" : "Blogs", href: section === "articles" ? "/media/articles" : "/media/blogs" },
    { label: post.title, href: "#" }
  ];

  return (
    <Hero
      // title={post.title}
      // subtitle={post.excerpt}
      backgroundType="image"
      backgroundSrc="Blogs_lbursu_hm8of8"
      breadcrumbs={breadcrumbs}
      height="three-quarter"
      contentAlignment="left"
      enableAnimations={true}
      // enableParallax={true}
      // parallaxSpeed={0.3}
      ariaLabel={`${section === "articles" ? "Article" : "Blog post"}: ${post.title}`}
    />
  );
};

export default BlogDetailHero;