import type { Article } from "@/data/articles";
import { BlogCard } from "@/components/cards/BlogCard";

export function BlogContent({ posts, section = "blogs" }: {
  posts: Article[];
  section?: "blogs" | "articles";
}) {
  return (
    <section className="w-full mx-auto">
      {posts.length ? (
        <div>
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} basePath={section === "blogs" ? "/media/blogs" : "/media/articles"} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 sm:py-16 md:py-20 px-4">
          <p className="text-lg sm:text-xl mb-3">No {section === "blogs" ? "blogs" : "articles"} found.</p>
        </div>
      )}
    </section>
  );
}
