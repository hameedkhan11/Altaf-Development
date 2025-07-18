// lib/seo/seoUtils.ts
import { BlogContentData } from "@/data/blogs/blog-content";
import { BlogPost } from "@/lib/blogs/types";

export interface BlogSEOData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  author: string;
  articleSchema: object;
}

export const generateBlogSEO = (
  post: BlogPost,
  blogContent: BlogContentData,
  currentUrl: string
): BlogSEOData => {
  const seoTitle = `${post.title} | Altaf Development Blog`;
  const seoDescription = post.excerpt || blogContent.introduction.substring(0, 160);
  const seoKeywords = `luxury real estate, ${post.category}, Altaf Development, ${post.title}, luxury homes, property development`;
  const author = post.author || "Altaf Development";

  // Generate Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": seoDescription,
    "image": [post.image],
    "author": {
      "@type": "Organization",
      "name": author,
      "url": "https://altafdevelopment.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Altaf Development",
      "logo": {
        "@type": "ImageObject",
        "url": "https://altafdevelopment.com/logo.png",
        "width": 200,
        "height": 60
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "articleSection": post.category,
    "keywords": seoKeywords.split(', '),
    "wordCount": blogContent.introduction.length + 
                 blogContent.mainContent.reduce((acc, section) => acc + section.content.length, 0) + 
                 blogContent.conclusion.length,
    "inLanguage": "en-US"
  };

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    canonicalUrl: currentUrl,
    ogTitle: seoTitle,
    ogDescription: seoDescription,
    ogImage: post.image,
    ogUrl: currentUrl,
    twitterTitle: seoTitle,
    twitterDescription: seoDescription,
    twitterImage: post.image,
    author,
    articleSchema
  };
};

// Generate breadcrumb schema
export const generateBreadcrumbSchema = (post: BlogPost, currentUrl: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://altafdevelopment.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blogs",
        "item": "https://altafdevelopment.com/blogs"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": currentUrl
      }
    ]
  };
};