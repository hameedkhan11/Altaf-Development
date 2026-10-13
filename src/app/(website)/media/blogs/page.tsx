import type { Metadata } from "next";
import { getAllBlogs } from "@/lib/blogPosts";
import { BlogHero } from "@/components/sections/blogs/BlogHero";
import { BlogContent } from "@/components/sections/blogs/BlogContent";
import StructuredData from "@/components/seo/StructuredData";
import Script from "next/script";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Blogs | Altaf Developments",
  description: "Latest blogs, stories, project news, and insights from Altaf Developments.",
  alternates: { canonical: "/media/blogs" },
};

export default async function BlogPage() {
  const blogs = await getAllBlogs();
  const schema = {
    "@context": "https://schema.org", "@type": "Blog", name: "Altaf Developments Blogs",
    url: "https://www.altafdevelopments.com/media/blogs",
    blogPost: blogs.map((blog) => ({
      "@type": "BlogPosting", headline: blog.title, description: blog.excerpt,
      ...(blog.coverImage ? { image: blog.coverImage.startsWith('http') ? blog.coverImage : `https://www.altafdevelopments.com${blog.coverImage}` } : {}),
      url: `https://www.altafdevelopments.com/media/blogs/${blog.slug}`,
      author: { "@type": "Organization", name: blog.author },
    })),
  };
  return <>
    <StructuredData pageType="blogs" />
    <Script id="blogs-list-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <div className="min-h-screen">
      <BlogHero searchParams={{}} backgroundImage="Blogs_lbursu_hm8of8" fallbackImage="blog-hero-fallback" />
      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-8 sm:py-12 md:py-16">
        <BlogContent posts={blogs} />
      </div>
    </div>
  </>;
}
