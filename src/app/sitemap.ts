// app/sitemap.ts
import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
import { BLOG_SLUGS_QUERY } from '@/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://altafdevelopments.com'
  
  // Get all blog posts
  const blogPosts = await client.fetch(BLOG_SLUGS_QUERY)
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]
  
  // Dynamic blog pages
  const blogPages = blogPosts.map((post: { slug: string }) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))
  
  return [...staticPages, ...blogPages]
}