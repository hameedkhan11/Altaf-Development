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
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await sanityService.getPostBySlug(params.slug);
  console.log(post);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1200).height(630).url()
    : null;

  const ogImageUrl = post.ogImage
    ? urlFor(post.ogImage).width(1200).height(630).url()
    : imageUrl;

  return {
    title: post.seoTitle || post.title,
    description: post.excerpt,
    keywords: post.targetKeywords?.join(", "),
    authors: [{ name: "Altaf Developments" }],
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ["Altaf Developments"],
      url: `/blogs/${post.slug?.current}`,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: post.featuredImage?.alt || post.title,
            },
          ]
        : undefined,
      siteName: "Altaf Developments",
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.excerpt,
      images: ogImageUrl ? [ogImageUrl] : undefined,
      creator: "@AltafDevelopments",
    },
    alternates: {
      canonical: post.canonicalUrl || `/blogs/${post.slug?.current}`,
    },
    robots: {
      index: !post.noIndex,
      follow: !post.noIndex,
      googleBot: {
        index: !post.noIndex,
        follow: !post.noIndex,
      },
    },
    other: {
      "article:author": "Altaf Developments",
      "article:section": post.categories?.[0]?.title || "Real Estate",
      "article:tag": post.targetKeywords?.join(", ") || "",
    },
  };
}

// Main blog post page component
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  // Fetch data in parallel
  const [post, heroImages] = await Promise.all([
    sanityService.getPostBySlug(params.slug),
    sanityService.getHeroImagesByPage('blog-detail'),
  ]);

  if (!post) {
    notFound();
  }

  // Fetch related posts
  const relatedPosts = await sanityService.getRelatedPosts(post._id, 3);
  
  // Generate structured data for SEO
  const structuredData = generateBlogStructuredData(post);
  const breadcrumbStructuredData = generateBreadcrumbStructuredData(post);

  const heroImage = heroImages && heroImages.length > 0 ? heroImages[0] : null;

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      
      <BlogDetailHero 
        post={post} 
        heroImage={heroImage}
      />
      
      <article className="min-h-screen mt-8">
        <BlogPostContent post={post} />
        <RelatedPostsSection relatedPosts={relatedPosts} />
      </article>
    </>
  );
}