import type { Article } from "@/data/articles";
import { BlogCard } from "@/components/cards/BlogCard";

export function BlogContent({ posts }: { posts: Article[] }) {
  return (
    <section className="w-full mx-auto">
      {posts.length ? (
        <div>
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} basePath="/media/blogs" />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 sm:py-16 md:py-20 px-4">
          <p className="text-lg sm:text-xl mb-3">No blogs found.</p>
        </div>
      )}
    </section>
  );
}
