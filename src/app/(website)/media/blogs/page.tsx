import type { Metadata } from "next";
import Script from "next/script";
import { articles } from "@/data/articles";
import { BlogHero } from "@/components/sections/blogs/BlogHero";
import { BlogContent } from "@/components/sections/blogs/BlogContent";
import { BlogViewNavigation } from "@/components/sections/blogs/BlogViewNavigation";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Blogs | Altaf Developments",
  description: "Explore our featured story and earlier blogs from Altaf Developments.",
  alternates: { canonical: "/media/blogs" },
};

export default function BlogsPage() {
  // Only the single editorial feature belongs on the first page.
  const featured = articles.slice(0, 1);
  const schema = {
    "@context": "https://schema.org", "@type": "Blog", name: "Altaf Developments — Featured Blog",
    url: "https://www.altafdevelopments.com/media/blogs",
    blogPost: featured.map((blog) => ({
      "@type": "BlogPosting", headline: blog.title, description: blog.excerpt,
      image: `https://www.altafdevelopments.com${blog.coverImage}`,
      url: `https://www.altafdevelopments.com/media/blogs/${blog.slug}`,
      author: { "@type": "Organization", name: blog.author },
    })),
  };
  return (
    <>
      <StructuredData pageType="blogs" />
      <Script id="blogs-featured-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen">
        <BlogHero searchParams={{}} backgroundImage="/hero/blogs-hero-residences-elevation.png" fallbackImage="blog-hero-fallback" />
        <BlogViewNavigation current="featured" />
        <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-8 sm:py-12 md:py-16">
          <h2 className="text-center text-2xl sm:text-3xl font-medium mb-8 sm:mb-12">Featured Blog</h2>
          <BlogContent posts={featured} />
        </div>
      </div>
    </>
  );
}
