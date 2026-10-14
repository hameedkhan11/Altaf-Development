import { type Article, articles } from "@/data/articles";
import { getBlogCoverOverride } from "@/lib/blogCoverOverrides";

// Previous Sanity posts belong in the Other Blogs view.
// The locally authored featured blog appears on the first Blogs page instead.
export async function getAllBlogs(): Promise<Article[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) return [];

  try {
    const { sanityService, urlFor } = await import("@/lib/sanityService");
    const { posts } = await sanityService.getPosts({ limit: 1000, offset: 0 });
    return posts.flatMap((post): Article[] => {
      const slug = post.slug?.current;
      if (!slug || articles.some((article) => article.slug === slug)) return [];

      const imageOverride = getBlogCoverOverride(post.title || "");
      let coverImage = "";
      try {
        if (post.featuredImage?.asset) coverImage = urlFor(post.featuredImage).width(1400).url();
      } catch { /* optional image */ }

      // Use locally supplied full-quality imagery for selected posts.
      if (imageOverride) coverImage = imageOverride.src;

      return [{
        slug,
        title: post.title || "Untitled Blog",
        excerpt: post.excerpt || "",
        coverImage,
        coverAlt: imageOverride?.alt || post.featuredImage?.alt || post.title || "Blog image",
        author: post.author?.name || "Altaf Developments",
        body: [], // The full existing blog remains in Sanity, loaded on its detail route.
      }];
    });
  } catch (error) {
    console.error("Unable to load Sanity blogs:", error);
    return [];
  }
}
