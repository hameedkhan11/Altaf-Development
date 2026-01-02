// components/blog/Pagination.tsx
import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  searchParams: { [key: string]: string | string[] | undefined }
}

export function Pagination({ currentPage, totalPages, searchParams }: PaginationProps) {
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams()
    
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && value !== 'undefined' && key !== 'page') {
        params.set(key, value as string)
      }
    })
    
    if (page > 1) {
      params.set('page', page.toString())
    }
    
    const queryString = params.toString()
    return queryString ? `/media/blogs?${queryString}` : '/media/blogs'
  }

  const pages = []
  const maxVisiblePages = 5
  const halfVisible = Math.floor(maxVisiblePages / 2)
  let startPage = Math.max(1, currentPage - halfVisible)
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous button */}
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 border border-[rgb(140,46,71)] font-medium bg-[rgb(140,46,71)] text-white rounded hover:bg-transparent hover:text-[rgb(140,46,71)]"
        >
          Previous
        </Link>
      )}

      {/* First page */}
      {startPage > 1 && (
        <>
          <Link
            href={getPageUrl(1)}
            className="px-4 py-2 border rounded-full hover:bg-gray-100"
          >
            1
          </Link>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}

      {/* Page numbers */}
      {pages.map((page) => (
        <Link
          key={page}
          href={getPageUrl(page)}
          className={`px-4 py-2 border border-[rgb(140,46,71)] rounded-full ${
            page === currentPage
              ? 'bg-[rgb(140,46,71)] text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Last page */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <Link
            href={getPageUrl(totalPages)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next button */}
      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 border border-[rgb(140,46,71)] font-medium bg-[rgb(140,46,71)] text-white rounded hover:bg-transparent hover:text-[rgb(140,46,71)]"
        >
          Next
        </Link>
      )}
    </div>
  )
}