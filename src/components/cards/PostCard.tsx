

// components/sections/blogs/PostCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/data/articles";
import { HiOutlinePhotograph } from "react-icons/hi";

interface PostCardProps {
  post: Article;
  showBadge?: boolean;
  badgeText?: string;
  basePath?: "/media/blogs" | "/media/articles";
}

export function PostCard({
  post,
  showBadge = false,
  badgeText = "Featured",
  basePath = "/media/blogs"
}: PostCardProps) {
  const imageUrl = post.coverImage;

  return (
    <article className="group cursor-pointer h-full flex flex-col w-full">
      <Link href={`${basePath}/${post.slug}`} className="block w-full max-w-[480px] mx-auto">
        <div className="relative aspect-[23/22] w-full overflow-hidden mb-2 xs:mb-3 sm:mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.coverAlt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300 overflow-hidden"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
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
export function RelatedPostCard({ post }: { post: Article }) {
  return <PostCard post={post} />;
}

export function FeaturedPostCard({ post, basePath = "/media/blogs" }: { post: Article; basePath?: "/media/blogs" | "/media/articles" }) {
  return (
    <PostCard 
      post={post} 
      basePath={basePath}
      showBadge={true}
      badgeText="Featured"
    />
  );
}