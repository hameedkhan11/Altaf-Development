// app/blog/page.tsx
import { Metadata } from 'next'
import { sanityService } from '@/lib/sanityService'
import type { PostFilters } from '@/lib/sanity/sanity'
import { generateBlogMetadata } from '@/components/sections/blogs/BlogMetadata'
import { generateBlogJsonLd } from '@/components/sections/blogs/BlogJsonLd'
import { BlogHero } from '@/components/sections/blogs/BlogHero'
import { BlogContent } from '@/components/sections/blogs/BlogContent'
import StructuredData from '@/components/seo/StructuredData'

// Generate comprehensive metadata for SEO
export async function generateMetadata(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const searchParams = await props.searchParams
  return generateBlogMetadata(searchParams)
}

// Main blog page component
export default async function BlogPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const page = parseInt(searchParams?.page as string) || 1
  const limit = 6
  const offset = (page - 1) * limit

  const filters: PostFilters = {
    category: searchParams?.category as string,
    location: searchParams?.location as string,
    propertyType: searchParams?.propertyType as string,
    author: searchParams?.author as string,
    featured: searchParams?.featured === 'true' ? true : undefined,
    limit,
    offset,
  }

  // Fetch data in parallel
  const [
    postsResult,
    categories,
    locations,
    authors,
    searchResults,
  ] = await Promise.all([
    searchParams?.search
      ? { posts: await sanityService.searchPosts(searchParams.search as string, limit), total: 0, hasMore: false }
      : sanityService.getPosts(filters),
    sanityService.getCategories(),
    sanityService.getLocations(),
    sanityService.getAuthors(),
    searchParams?.search
      ? sanityService.searchPosts(searchParams.search as string, limit)
      : null,
  ])

  const posts = searchResults || postsResult?.posts || []
  const totalPosts = postsResult?.total || 0
  const totalPages = Math.ceil(totalPosts / limit)

  // Get the first active hero image for the blog page
  // const heroImage = heroImages && heroImages.length > 0 ? heroImages[0] : null

  return (
    <>
      {/* Base structured data (organization, website, breadcrumbs) */}
      <StructuredData pageType="blogs" />

      {/* SEO JSON-LD structured data for blog listing */}
      {generateBlogJsonLd(posts, categories, locations, authors)}
      
      <div className="min-h-screen">
        <BlogHero
          searchParams={searchParams}
          backgroundImage="Blogs_lbursu_hm8of8"
          fallbackImage="blog-hero-fallback"
          // heroImage={heroImage}
        />
        
        <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-8 sm:py-12 md:py-16">
          <BlogContent
            posts={posts}
            totalPages={totalPages}
            currentPage={page}
            searchParams={searchParams}
          />
        </div>
      </div>
    </>
  )
}