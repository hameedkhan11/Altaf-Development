// app/blogs/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityService, urlFor } from "@/lib/sanityService";
import BlogDetailHero from "@/components/sections/blogs/blogs/BlogDetailHero";
import { generateBlogStructuredData, generateBreadcrumbStructuredData } from "@/components/sections/blogs/PostStructuredData";
import { BlogPostContent } from "@/components/sections/blogs/BlogPostContent";
import { RelatedPostsSection } from "@/components/sections/blogs/RelatedPostsSection";

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await sanityService.getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const post = await sanityService.getPostBySlug(params.slug);
  console.log(post);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  // Safe image URL generation with proper null checks
  const imageUrl = post?.featuredImage?.asset
    ? urlFor(post.featuredImage)?.width(1200)?.height(630)?.url()
    : null;

  const ogImageUrl = post?.ogImage?.asset
    ? urlFor(post.ogImage)?.width(1200)?.height(630)?.url()
    : imageUrl;

  return {
    title: post?.seoTitle || post?.title,
    description: post?.excerpt,
    keywords: post?.targetKeywords?.join(", "),
    authors: [{ name: "Altaf Developments" }],
    openGraph: {
      title: post?.seoTitle || post?.title,
      description: post?.excerpt,
      type: "article",
      publishedTime: post?.publishedAt,
      modifiedTime: post?.updatedAt,
      authors: ["Altaf Developments"],
      url: `/blogs/${post?.slug?.current}`,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: post?.featuredImage?.alt || post?.title || "Blog post image",
            },
          ]
        : undefined,
      siteName: "Altaf Developments",
    },
    twitter: {
      card: "summary_large_image",
      title: post?.seoTitle || post?.title,
      description: post?.excerpt,
      images: ogImageUrl ? [ogImageUrl] : undefined,
      creator: "@AltafDevelopments",
    },
    alternates: {
      canonical: post?.canonicalUrl || `/blogs/${post?.slug?.current}`,
    },
    robots: {
      index: !post?.noIndex,
      follow: !post?.noIndex,
      googleBot: {
        index: !post?.noIndex,
        follow: !post?.noIndex,
      },
    },
    other: {
      "article:author": "Altaf Developments",
      "article:section": post?.categories?.[0]?.title || "Real Estate",
      "article:tag": post?.targetKeywords?.join(", ") || "",
    },
  };
}

// Main blog post page component
export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  
  // Fetch data in parallel with error handling
  const [post, heroImages] = await Promise.all([
    sanityService.getPostBySlug(params.slug).catch(() => null),
    sanityService.getHeroImagesByPage('blog-detail').catch(() => []),
  ]);

  if (!post) {
    notFound();
  }

  // Fetch related posts with error handling
  const relatedPosts = post?._id ? await sanityService.getRelatedPosts(post._id, 3).catch(() => []) : [];
  
  // Generate structured data for SEO with safe access
  const structuredData = post ? generateBlogStructuredData(post) : null;
  const breadcrumbStructuredData = post ? generateBreadcrumbStructuredData(post) : null;

  const heroImage = heroImages && heroImages.length > 0 ? heroImages[0] : null;

  return (
    <>
      {/* Structured Data - only render if data exists */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
      {breadcrumbStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbStructuredData),
          }}
        />
      )}
      
      <BlogDetailHero 
        post={post} 
        heroImage={heroImage}
      />
      
      <article className="min-h-screen mt-8">
        <BlogPostContent post={post} />
        <RelatedPostsSection relatedPosts={relatedPosts || []} />
      </article>
    </>
  );
}