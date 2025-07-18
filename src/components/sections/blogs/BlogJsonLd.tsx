// components/blog/BlogJsonLd.tsx
import { urlFor } from '@/lib/sanityService'
import type { PostPreview, Category, Location, Author } from '@/lib/sanity/sanity'

export function generateBlogJsonLd(posts: PostPreview[], categories: Category[], locations: Location[], authors: Author[]) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Real Estate Blog',
    description: 'Expert insights, market trends, and property advice',
    url: '/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Real Estate Company',
    },
    blogPost: posts?.map(post => ({
      '@type': 'BlogPosting',
      headline: post?.title,
      description: post?.excerpt,
      datePublished: post?.publishedAt,
      dateModified: post?.publishedAt,
      author: {
        '@type': 'Person',
        name: post?.author?.name,
      },
      image: post?.featuredImage ? urlFor(post.featuredImage).width(1200).height(630).url() : null,
      url: `/blog/${post?.slug?.current}`,
      articleSection: post?.categories?.map(cat => cat?.title),
      keywords: post?.categories?.map(cat => cat?.title)?.join(', '),
    })),
    // SEO categories taxonomy
    about: categories?.map(category => ({
      '@type': 'Thing',
      name: category?.title,
      url: `/blog?category=${category?.slug?.current}`,
    })),
    // SEO locations taxonomy
    spatialCoverage: locations?.map(location => ({
      '@type': 'Place',
      name: location?.name,
      address: {
        '@type': 'PostalAddress',
        addressRegion: location?.state,
        addressCountry: 'pk',
      },
    })),
    // SEO authors
    author: authors?.map(author => ({
      '@type': 'Person',
      name: author?.name,
      jobTitle: author?.title,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}