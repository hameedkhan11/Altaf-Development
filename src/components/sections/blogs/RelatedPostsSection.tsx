// components/sections/blogs/blogs/RelatedPostsSection.tsx
import { RelatedPostCard } from "@/components/cards/PostCard";
import type { PostPreview } from "@/lib/sanity/sanity";

interface RelatedPostsSectionProps {
  relatedPosts: PostPreview[] | null;
}

export function RelatedPostsSection({ relatedPosts }: RelatedPostsSectionProps) {
  if (!relatedPosts || relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-16 py-16">
      <div className="mx-auto">
        <h2 className="text-3xl md:text-4xl mb-12 text-center">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {relatedPosts.map((relatedPost) => (
            <RelatedPostCard key={relatedPost._id} post={relatedPost} />
          ))}
        </div>
      </div>
    </section>
  );
}