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
  // Generate responsive image URLs for Next.js optimization
  const getOptimizedImageUrl = () => {
    if (!post.featuredImage) return null;
    
    return urlFor(post.featuredImage)
      .width(800)
      .height(600)
      .crop("focalpoint")
      .format('webp')
      .quality(85)
      .url();
  };

  const imageUrl = getOptimizedImageUrl();

  return (
    <article className="group cursor-pointer h-full flex flex-col w-full">
      <Link href={`/blogs/${post.slug?.current}`} className="block w-full h-full">
        <div className="relative aspect-[4/3] w-full overflow-hidden mb-2 xs:mb-3 sm:mb-4 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.featuredImage?.alt || post.title}
              width={800}
              height={600}
              className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-full"
              sizes="(max-width: 480px) 400px, (max-width: 768px) 600px, 800px"
              priority={showBadge} // Prioritize featured images
              quality={85}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-lg">
              <HiOutlinePhotograph className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-gray-400" />
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

        <div className="px-1 flex-grow flex flex-col justify-start">
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 sm:mt-3 md:mt-4 text-black leading-tight group-hover:text-[rgb(140,46,71)] transition-colors duration-200 line-clamp-2">
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