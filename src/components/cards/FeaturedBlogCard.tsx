// components/blog/FeaturedBlogCard.tsx
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import type { PostPreview } from "@/lib/sanity/sanity";
import { urlFor } from "@/lib/sanityService";

interface FeaturedBlogCardProps {
  post: PostPreview;
  imageWidth?: number;
  imageHeight?: number;
}

export function FeaturedBlogCard({
  post,
  imageWidth = 400,
  imageHeight = 250,
}: FeaturedBlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <Link href={`/blogs/${post?.slug?.current}`} className="block">
        <div className="relative h-48 overflow-hidden">
          {post?.featuredImage ? (
            <CldImage
              src={urlFor(post.featuredImage)
                .width(imageWidth)
                .height(imageHeight)
                .url()}
              alt={post?.featuredImage?.alt || post?.title || "Blog post image"}
              width={imageWidth}
              height={imageHeight}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              crop="fill"
              gravity="auto"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}

          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              Featured
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
            {post?.title || "Untitled Post"}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-3">
            {post?.excerpt || "No excerpt available."}
          </p>

          <div className="flex items-center justify-between">
            <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              Read More
            </span>
            <time
              dateTime={post?.publishedAt}
              className="text-sm text-gray-500"
            >
              {post?.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString()
                : "No date"}
            </time>
          </div>
        </div>
      </Link>

      {/* Hidden SEO elements */}
      <div className="sr-only">
        <span itemProp="author">{post?.author?.name || "Unknown Author"}</span>
        <span itemProp="publisher">Real Estate Blog</span>
        <span itemProp="datePublished">{post?.publishedAt}</span>
        {/* <span itemProp="dateModified">{post?.updatedAt || post?.publishedAt}</span> */}
        <span itemProp="isFeatured">true</span>
        {post?.categories?.map((category, index) => (
          <span key={index} itemProp="articleSection">
            {category?.title}
          </span>
        ))}
        {/* <span itemProp="wordCount">{post?.estimatedReadingTime}</span> */}
      </div>
    </article>
  );
}
