import { type Article, articles } from "@/data/articles";

// Only previously published Sanity posts belong on the Blogs page.
// The locally authored editorial piece is shown separately under Articles.
// If Sanity is unavailable, do not mislabel the article as a blog.
export async function getAllBlogs(): Promise<Article[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) return [];

  try {
    const { sanityService, urlFor } = await import("@/lib/sanityService");
    const { posts } = await sanityService.getPosts({ limit: 1000, offset: 0 });
    return posts.flatMap((post): Article[] => {
      const slug = post.slug?.current;
      if (!slug || articles.some((article) => article.slug === slug)) return [];

      let coverImage = "";
      try {
        if (post.featuredImage?.asset) coverImage = urlFor(post.featuredImage).width(1400).url();
      } catch { /* optional image */ }

      return [{
        slug,
        title: post.title || "Untitled Blog",
        excerpt: post.excerpt || "",
        coverImage,
        coverAlt: post.featuredImage?.alt || post.title || "Blog image",
        author: post.author?.name || "Altaf Developments",
        body: [], // The full existing blog remains in Sanity, loaded on its detail route.
      }];
    });
  } catch (error) {
    console.error("Unable to load Sanity blogs:", error);
    return [];
  }
}
