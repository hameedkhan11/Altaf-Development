import type { Metadata } from "next";
import Script from "next/script";
import { getAllBlogs } from "@/lib/blogPosts";
import { BlogHero } from "@/components/sections/blogs/BlogHero";
import { BlogContent } from "@/components/sections/blogs/BlogContent";
import { BlogViewNavigation } from "@/components/sections/blogs/BlogViewNavigation";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Other Blogs | Altaf Developments",
  description: "Browse previous blogs, project news and insights from Altaf Developments.",
  alternates: { canonical: "/media/blogs/all" },
};

export default async function OtherBlogsPage() {
  // These are the previously published Sanity posts; the featured editorial is excluded.
  const blogs = await getAllBlogs();
  const schema = {
    "@context": "https://schema.org", "@type": "Blog", name: "Altaf Developments — Other Blogs",
    url: "https://www.altafdevelopments.com/media/blogs/all",
    blogPost: blogs.map((blog) => ({
      "@type": "BlogPosting", headline: blog.title, description: blog.excerpt,
      ...(blog.coverImage ? { image: blog.coverImage.startsWith("http") ? blog.coverImage : `https://www.altafdevelopments.com${blog.coverImage}` } : {}),
      url: `https://www.altafdevelopments.com/media/blogs/${blog.slug}`,
      author: { "@type": "Organization", name: blog.author },
    })),
  };
  return (
    <>
      <Script id="blogs-others-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen">
        <BlogHero searchParams={{}} backgroundImage="/hero/blogs-hero-residences-elevation.png" fallbackImage="blog-hero-fallback" />
        <BlogViewNavigation current="others" />
        <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-8 sm:py-12 md:py-16">
          <h2 className="text-center text-2xl sm:text-3xl font-medium mb-8 sm:mb-12">Other Blogs</h2>
          <BlogContent posts={blogs} />
        </div>
      </div>
    </>
  );
}
