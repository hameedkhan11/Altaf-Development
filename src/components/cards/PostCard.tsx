// components/sections/blogs/PostCard.tsx
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanityService";
import type { PostPreview } from "@/lib/sanity/sanity";
import { HiOutlinePhotograph } from "react-icons/hi";

interface PostCardProps {
  post: PostPreview;
  showBadge?: boolean;
  badgeText?: string;
}

export function PostCard({ 
  post, 
  showBadge = false,
  badgeText = "Featured" 
}: PostCardProps) {
  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(800).height(600).crop("focalpoint").url()
    : null;

  return (
    <article className="group cursor-pointer h-full">
      <Link href={`/blogs/${post.slug?.current}`}>
        <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem] overflow-hidden mb-3 sm:mb-4 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.featuredImage?.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-lg">
              <HiOutlinePhotograph className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400" />
            </div>
          )}
                   
          {/* Optional Badge (Featured/Popular etc.) */}
          {showBadge && (
            <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-[rgb(140,46,71)] text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium shadow-sm">
              {badgeText}
            </div>
          )}
                   
          {/* Date overlay in top-left corner */}
          {post.publishedAt && (
            <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 bg-white text-gray-800 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium shadow-sm">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          )}
        </div>
                
        <div className="px-1 sm:px-2">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl mt-3 sm:mt-4 md:mt-6 text-black leading-tight group-hover:text-[rgb(140,46,71)] transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}

// Convenience components for specific use cases
export const RelatedPostCard = ({ post }: { post: PostPreview }) => (
  <PostCard post={post} />
);

export const FeaturedPostCard = ({ post }: { post: PostPreview }) => (
  <PostCard 
    post={post} 
    showBadge={true}
    badgeText="Featured"
  />
);