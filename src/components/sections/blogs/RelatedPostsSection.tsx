// components/sections/blogs/blogs/RelatedPostsSection.tsx
import { RelatedPostCard } from "@/components/cards/PostCard";
import type { PostPreview } from "@/lib/sanity/sanity";
import { urlFor } from "@/lib/sanityService";

interface RelatedPostsSectionProps {
  relatedPosts: PostPreview[] | null;
}

export function RelatedPostsSection({ relatedPosts }: RelatedPostsSectionProps) {
  if (!relatedPosts || relatedPosts.length === 0) {
    return null;
  }

  // Convert Sanity previews to the card view model. Sanity keeps the full blog body.
  const posts = relatedPosts.flatMap((post) => {
    const slug = post.slug?.current;
    if (!slug) return [];
    let coverImage = "";
    try { if (post.featuredImage?.asset) coverImage = urlFor(post.featuredImage).width(1000).url(); }
    catch { /* optional image */ }
    return [{
      slug, title: post.title, excerpt: post.excerpt || "",
      coverImage, coverAlt: post.featuredImage?.alt || post.title,
      author: post.author?.name || "Altaf Developments", body: [],
    }];
  });

  return (
    <section className="px-4 sm:px-6 lg:px-16 py-16">
      <div className="mx-auto">
        <h2 className="text-3xl md:text-4xl mb-12 text-center">Related Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {posts.map((post) => (
            <RelatedPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}