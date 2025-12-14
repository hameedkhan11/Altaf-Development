import { SanityImage } from "@/lib/sanity/sanity";
import { urlFor } from "@/lib/sanityService";

// Type definitions for the blog post data
interface Category {
  title: string;
}

interface Location {
  name: string;
  state: string;
}

interface PropertyType {
  name: string;
}

interface Slug {
  current: string;
}

interface BlogPost {
  title: string;
  excerpt: string;
  featuredImage?: SanityImage;
  publishedAt: string;
  updatedAt?: string;
  slug?: Slug;
  categories?: Category[];
  targetKeywords?: string[];
  locations?: Location[];
  propertyTypes?: PropertyType[];
}

export function generateBlogStructuredData(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage
      ? urlFor(post.featuredImage).width(1200).height(630).url()
      : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Altaf Developments",
      url: "https://altafdevelopments.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Altaf Developments",
      url: "https://altafdevelopments.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/media/blogs/${post.slug?.current}`,
    },
    articleSection: post.categories?.[0]?.title || "Real Estate",
    keywords: post.targetKeywords?.join(", "),
    about: post.categories?.map((cat: Category) => ({
      "@type": "Thing",
      name: cat.title,
    })),
    mentions: [
      ...(post.locations?.map((location: Location) => ({
        "@type": "Place",
        name: `${location.name}, ${location.state}`,
      })) || []),
      ...(post.propertyTypes?.map((type: PropertyType) => ({
        "@type": "Thing",
        name: type.name,
      })) || []),
    ],
    isPartOf: {
      "@type": "Blog",
      name: "Altaf Developments Blog",
      url: "/media/blogs",
    },
  };
}

export function generateBreadcrumbStructuredData(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "/media/blogs",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `/media/blogs/${post.slug?.current}`,
      },
    ],
  };
}