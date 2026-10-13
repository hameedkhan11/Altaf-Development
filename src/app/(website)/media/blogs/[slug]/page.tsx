import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import BlogDetailHero from "@/components/sections/blogs/blogs/BlogDetailHero";
import StructuredData from "@/components/seo/StructuredData";
import { getArticleBySlug } from "@/data/articles";
import { BlogPostContent } from "@/components/sections/blogs/BlogPostContent";
import { RelatedPostsSection } from "@/components/sections/blogs/RelatedPostsSection";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (getArticleBySlug(slug)) {
    return { title: "Article moved", robots: { index: false } };
  }
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
    return { title: "Blog not found", robots: { index: false } };
  }
  const { sanityService, urlFor } = await import("@/lib/sanityService");
  const post = await sanityService.getPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Blog not found", robots: { index: false } };
  let image: string | undefined;
  try { if (post.featuredImage?.asset) image = urlFor(post.featuredImage).width(1200).url(); } catch { /* no image */ }
  return {
    title: post.seoTitle || post.title, description: post.excerpt,
    alternates: { canonical: `/media/blogs/${slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article", ...(image ? { images: [{ url: image }] } : {}) },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (getArticleBySlug(slug)) {
    permanentRedirect(`/media/articles/${slug}`);
  }
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) notFound();
  const { sanityService } = await import("@/lib/sanityService");
  const post = await sanityService.getPostBySlug(slug).catch(() => null);
  if (!post) notFound();
  const relatedPosts = post._id ? await sanityService.getRelatedPosts(post._id, 3).catch(() => []) : [];
  return (
    <>
      <StructuredData pageType="blog-post" />
      <BlogDetailHero post={post} />
      <article className="min-h-screen mt-8">
        <BlogPostContent post={post} />
        <RelatedPostsSection relatedPosts={relatedPosts} />
      </article>
    </>
  );
}
