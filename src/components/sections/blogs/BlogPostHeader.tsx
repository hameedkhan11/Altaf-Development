// components/sections/blogs/blogs/BlogPostHeader.tsx
import { PopulatedPost } from "@/lib/sanity/sanity";
import { Calendar, Clock } from "lucide-react";

interface BlogPostHeaderProps {
  post: PopulatedPost; 
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header>
      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-6 text-sm pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="font-medium ">Altaf Developments</span>
        </div>
        {post.publishedAt && (
          <time
            dateTime={post.publishedAt}
            className="flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(post.publishedAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </span>
          </time>
        )}
        {post.readingTime && (
          <span className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime} min read</span>
          </span>
        )}
      </div>
    </header>
  );
}