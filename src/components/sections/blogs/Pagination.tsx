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
      if (value && value !== 'undefined') {
        params.set(key, value as string)
      }
    })
    if (page > 1) {
      params.set('page', page.toString())
    } else {
      params.delete('page')
    }
    return `/blogs?${params.toString()}`
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
    <nav className="flex justify-center mt-16" aria-label="Pagination">
      <div className="flex items-center space-x-3">
        {/* Previous button */}
        {currentPage > 1 && (
          <Link
            href={getPageUrl(currentPage - 1)}
            className="px-6 py-2 bg-[rgb(140,46,71)] text-white hover:bg-transparent hover:text-[rgb(140,46,71)] border border-[rgb(140,46,71)] font-semibold  rounded-full transition-colors ease-in"
          >
            Previous
          </Link>
        )}

        {/* First page */}
        {startPage > 1 && (
          <>
            <Link
              href={getPageUrl(1)}
              className="w-10 h-10 flex items-center justify-center font-semibold transition-colors"
            >
              1
            </Link>
            {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
          </>
        )}

        {/* Page numbers */}
        {pages.map((page) => (
          <Link
          
            key={page}
            href={getPageUrl(page)}
            className={`w-10 h-10 flex items-center justify-center border rounded-full transition-colors ${
              page === currentPage
                ? 'bg-[rgb(140,46,71)] text-white font-semibold'
                : ' border-gray-300'
            }`}
          >
            {page}
          </Link>
        ))}

        {/* Last page */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
            <Link
              href={getPageUrl(totalPages)}
              className="w-10 h-10 flex items-center justify-center text-white border border-gray-300 rounded-full hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              {totalPages}
            </Link>
          </>
        )}

        {/* Next button */}
        {currentPage < totalPages && (
          <Link
            href={getPageUrl(currentPage + 1)}
            className="px-6 py-2 font-semibold bg-[rgb(140,46,71)] text-white hover:bg-transparent hover:text-[rgb(140,46,71)] border border-[rgb(140,46,71)] ease-in rounded-full"
          >
            Next
          </Link>
        )}
      </div>
    </nav>
  )
}