// components/blog/BlogMetadata.tsx
import { Metadata } from 'next'
import { sanityService } from '@/lib/sanityService'

export async function generateBlogMetadata(searchParams: { [key: string]: string | string[] | undefined }): Promise<Metadata> {
  const category = searchParams?.category as string
  const location = searchParams?.location as string
  const author = searchParams?.author as string
  const search = searchParams?.search as string

  let title = 'Altaf Developments Blog - Latest News & Market Insights'
  let description = 'Stay updated with the latest Altaf Developments real estate news, market trends, and property insights. Expert advice from licensed professionals.'
  let keywords = 'real estate, property news, market trends, investment, buying guide, selling tips'

  // Dynamic SEO based on filters
  if (category) {
    const categoryData = await sanityService.getCategoryBySlug(category)
    if (categoryData) {
      title = categoryData?.seo?.metaTitle || `${categoryData?.title} - Altaf Developments Blog`
      description = categoryData?.seo?.metaDescription || `Latest ${categoryData?.title?.toLowerCase()} articles and insights in real estate.`
      keywords = `${categoryData?.title}, ${keywords}`
    }
  }

  if (location) {
    const locationData = await sanityService.getLocationBySlug(location)
    if (locationData) {
      title = `Altaf Developments Blog - ${locationData?.name}, ${locationData?.state}`
      description = `Latest real estate news and market insights for ${locationData?.name}, ${locationData?.state}. Local market trends and property analysis.`
      keywords = `${locationData?.name}, ${locationData?.state}, ${keywords}`
    }
  }

  if (author) {
    const authorData = await sanityService.getAuthorBySlug(author)
    if (authorData) {
      title = `Articles by ${authorData?.name} - Altaf Developments Blog`
      description = `Expert real estate articles and insights by ${authorData?.name}${authorData?.title ? `, ${authorData?.title}` : ''}.`
      keywords = `${authorData?.name}, ${keywords}`
    }
  }

  if (search) {
    title = `Search Results: "${search}" - Altaf Developments Blog`
    description = `Search results for "${search}" in our real estate blog. Find relevant articles and insights.`
    keywords = `${search}, ${keywords}`
  }

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url: '/blogs',
      siteName: 'Altaf Developments Blog',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: '/blogs',
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}