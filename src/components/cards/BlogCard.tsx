//  components/cards/BlogCard.tsx
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanityService";
import type { PostPreview } from "@/lib/sanity/sanity";
import { AnimatedH1, AnimatedP, AnimatedSpan } from "../ui/text-animations";

interface BlogCardProps {
  post: PostPreview;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  if (!post || !post.slug?.current) {
    return null;
  }

  const imageUrl = post?.featuredImage
    ? urlFor(post.featuredImage).width(800).height(500).url()
    : null;
  const isEven = index % 2 === 0;

  return (
    <article className="overflow-hidden transition-all duration-300">
      <div
        className={`flex flex-col lg:flex-row ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } min-h-[320px] sm:min-h-[360px] md:min-h-[400px] lg:min-h-[460px] w-full`}
      >
        {/* Image Section */}
        <div className="w-full lg:w-1/2 h-56 sm:h-56 md:h-64 lg:h-auto relative overflow-hidden">
          {imageUrl ? (
            <Image
              fill
              src={imageUrl}
              alt={post?.featuredImage?.alt || post?.title || "Blog post image"}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <svg
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
          <AnimatedH1 
            wordByWord={true} 
            duration={0.1}  
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 sm:mb-4 line-clamp-2 transition-colors"
          >
            {post?.title || "Untitled Post"}
          </AnimatedH1>

          <AnimatedP className="mb-4 sm:mb-6 line-clamp-3 text-xs sm:text-sm leading-relaxed">
            {post?.excerpt || "No excerpt available."}
          </AnimatedP>

          <div className="flex items-center justify-between">
            <Link href={`/blogs/${post?.slug?.current}`}>
              <button className="bg-[rgb(140,46,71)] text-white px-4 py-2 rounded-full sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base font-medium hover:bg-transparent hover:text-[rgb(140,46,71)] border border-[rgb(140,46,71)] cursor-pointer ease-in duration-300 transition-colors">
                READ MORE
              </button>
            </Link>

            {/* SEO-friendly hidden metadata */}
            <div className="sr-only">
              <span>Author: {post?.author?.name || "Unknown"}</span>
              <AnimatedSpan>
                Published:{" "}
                {post?.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString()
                  : ""}
              </AnimatedSpan>
              <AnimatedSpan>
                Categories:{" "}
                {post?.categories?.map((cat) => cat?.title).join(", ") || ""}
              </AnimatedSpan>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}