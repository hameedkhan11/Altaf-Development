// components/blog/BackToBlogs.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackToBlogs() {
  return (
    <Link
      href="/blog"
      className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Back to all posts</span>
    </Link>
  );
}
