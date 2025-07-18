// components/blog/BlogContent.tsx
import type { PostPreview } from '@/lib/sanity/sanity'
import { Pagination } from './Pagination'
import { BlogCard } from '@/components/cards/BlogCard'

interface BlogContentProps {
  posts: PostPreview[]
  totalPages: number
  currentPage: number
  searchParams: { [key: string]: string | string[] | undefined }
}

export function BlogContent({ posts, totalPages, currentPage, searchParams }: BlogContentProps) {
  return (
    <section className="w-full max-w-7xl mx-auto">
      {posts?.length > 0 ? (
        <>
          <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 mb-8 sm:mb-12 md:mb-16">
            {posts?.map((post, index) => (
              <BlogCard key={post?._id} post={post} index={index} />
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 sm:mt-12 md:mt-16">
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                searchParams={searchParams}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 sm:py-16 md:py-20 px-4">
          <div className="text-gray-500 text-lg sm:text-xl mb-3 sm:mb-4">
            {searchParams?.search ? 'No articles found for your search.' : 'No articles found.'}
          </div>
          <p className="text-gray-400 text-sm sm:text-base">
            Try adjusting your search terms.
          </p>
        </div>
      )}
    </section>
  )
}