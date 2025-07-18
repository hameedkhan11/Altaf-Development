
// components/blog/BlogSidebar.tsx
import Link from 'next/link'
import type { Category, Location, Author, PropertyType } from '@/lib/sanity/sanity'

interface BlogSidebarProps {
  categories: Category[]
  locations: Location[]
  authors: Author[]
  propertyTypes: PropertyType[]
  searchParams: { [key: string]: string | string[] | undefined }
}

export function BlogSidebar({ 
  categories, 
  locations, 
  authors, 
  searchParams 
}: BlogSidebarProps) {
  const createFilterUrl = (filterType: string, filterValue: string) => {
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== 'page' && value && value !== 'undefined') {
        params.set(key, value as string)
      }
    })
    params.set(filterType, filterValue)
    return `/blog?${params.toString()}`
  }

  return (
    <div className="space-y-8">
      {/* Categories */}
      {categories?.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories?.map((category) => (
              <li key={category?._id}>
                <Link
                  href={createFilterUrl('category', category?.slug?.current)}
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    searchParams?.category === category?.slug?.current
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category?.title || 'Untitled Category'}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Locations */}
      {locations?.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Locations</h3>
          <ul className="space-y-2">
            {locations?.slice(0, 10)?.map((location) => (
              <li key={location?._id}>
                <Link
                  href={createFilterUrl('location', location?.slug?.current)}
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    searchParams?.location === location?.slug?.current
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {location?.name}{location?.state ? `, ${location.state}` : ''}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Authors */}
      {authors?.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Authors</h3>
          <ul className="space-y-2">
            {authors?.map((author) => (
              <li key={author?._id}>
                <Link
                  href={createFilterUrl('author', author?.slug?.current)}
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    searchParams?.author === author?.slug?.current
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {author?.name || 'Unknown Author'}
                  {author?.title && <span className="text-gray-500 ml-1">({author.title})</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
