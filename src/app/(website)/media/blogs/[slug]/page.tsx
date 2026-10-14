import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import BlogDetailHero from "@/components/sections/blogs/blogs/BlogDetailHero";
import StructuredData from "@/components/seo/StructuredData";
import { getArticleBySlug } from "@/data/articles";
import { LocalArticleContent } from "@/components/sections/blogs/LocalArticleContent";
import { BlogPostContent } from "@/components/sections/blogs/BlogPostContent";
import { RelatedPostsSection } from "@/components/sections/blogs/RelatedPostsSection";
import { getBlogCoverOverride } from "@/lib/blogCoverOverrides";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (article) {
    const url = `/media/blogs/${article.slug}`;
    return {
      title: article.title,
      description: article.excerpt,
      authors: [{ name: article.author }],
      alternates: { canonical: url },
      openGraph: {
        title: article.title, description: article.excerpt, type: "article",
        url, images: [{ url: article.coverImage, alt: article.coverAlt }],
      },
      twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images: [article.coverImage] },
    };
  }
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
    return { title: "Blog not found", robots: { index: false } };
  }
  const { sanityService, urlFor } = await import("@/lib/sanityService");
  const post = await sanityService.getPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Blog not found", robots: { index: false } };
  let image: string | undefined;
  try { if (post.featuredImage?.asset) image = urlFor(post.featuredImage).width(1200).url(); } catch { /* no image */ }
  const imageOverride = getBlogCoverOverride(post.title || "");
  if (imageOverride) image = `https://www.altafdevelopments.com${imageOverride.src}`;
  return {
    title: post.seoTitle || post.title, description: post.excerpt,
    alternates: { canonical: `/media/blogs/${slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article", ...(image ? { images: [{ url: image }] } : {}) },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (article) {
    const url = `https://www.altafdevelopments.com/media/blogs/${article.slug}`;
    const schema = {
      "@context": "https://schema.org", "@type": "BlogPosting",
      headline: article.title, description: article.excerpt,
      image: `https://www.altafdevelopments.com${article.coverImage}`,
      author: { "@type": "Organization", name: article.author },
      publisher: { "@type": "Organization", name: "Altaf Developments" },
      mainEntityOfPage: url,
    };
    return (
      <>
        <Script id="featured-blog-detail-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <BlogDetailHero post={{ title: article.title, excerpt: article.excerpt, slug: { current: article.slug } }} />
        <LocalArticleContent article={article} />
      </>
    );
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
