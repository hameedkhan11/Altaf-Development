// components/blog/SearchAndFilter.tsx
'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';

// Type definitions for the component props
interface CategoryAttributes {
  slug: string;
  name: string;
  color?: string;
}

interface TagAttributes {
  slug: string;
  name: string;
}

interface Category {
  id: string;
  attributes: CategoryAttributes;
}

interface Tag {
  id: string;
  attributes: TagAttributes;
}

interface SearchAndFilterProps {
  categories: Category[];
  tags: Tag[];
  currentSearch?: string;
  currentCategory?: string;
  currentTag?: string;
  currentFeatured?: string;
}

export default function SearchAndFilter({
  categories,
  tags,
  currentSearch,
  currentCategory,
  currentTag,
  currentFeatured,
}: SearchAndFilterProps) {
  const [searchTerm, setSearchTerm] = useState(currentSearch || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    } else {
      params.delete('search');
    }
    params.delete('page'); // Reset to first page
    
    router.push(`/blog?${params.toString()}`);
  };

  const handleFilter = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (params.get(type) === value) {
      params.delete(type);
    } else {
      params.set(type, value);
    }
    params.delete('page'); // Reset to first page
    
    router.push(`/blog?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/blog');
    setSearchTerm('');
  };

  const hasActiveFilters = currentSearch || currentCategory || currentTag || currentFeatured;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>

        {/* Filter Toggle */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Filter Options */}
      {isFilterOpen && (
        <div className="mt-6 pt-6 border-t grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Featured */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Featured</h3>
            <button
              onClick={() => handleFilter('featured', 'true')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                currentFeatured === 'true'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Featured Posts
            </button>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleFilter('category', category.attributes.slug)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    currentCategory === category.attributes.slug
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{
                    backgroundColor: currentCategory === category.attributes.slug ? category.attributes.color : undefined,
                  }}
                >
                  {category.attributes.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 10).map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleFilter('tag', tag.attributes.slug)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    currentTag === tag.attributes.slug
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  #{tag.attributes.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}