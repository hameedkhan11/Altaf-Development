// lib/actions/blog.ts
import { sampleBlogPosts } from '@/data/blogs/data';
import { Metadata } from 'next';

export function getStaticParams() {
  return sampleBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function getMetadata(slug: string): Metadata {
  const post = sampleBlogPosts.find((post) => post.slug === slug);

  if (!post) {
    return {
      title: 'Blog Not Found - Altaf Development',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} - Altaf Development Blog`,
    description: post.excerpt,
    keywords: `luxury real estate, ${post.category.toLowerCase()}, Altaf Development, property development, Pakistan real estate`,
    authors: [{ name: post.author || 'Altaf Development' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author || 'Altaf Development'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}