// components/blog/BlogSkeleton.tsx
export default function BlogSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="aspect-video bg-gray-200"></div>
      <div className="p-6">
        <div className="w-20 h-4 bg-gray-200 rounded mb-3"></div>
        <div className="w-full h-6 bg-gray-200 rounded mb-2"></div>
        <div className="w-3/4 h-6 bg-gray-200 rounded mb-4"></div>
        <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
        <div className="w-2/3 h-4 bg-gray-200 rounded mb-4"></div>
        <div className="flex justify-between">
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}