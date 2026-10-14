import { permanentRedirect } from "next/navigation";

// Preserve bookmarks, search results and incoming links to old article addresses.
export default async function LegacyArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  permanentRedirect(`/media/blogs/${encodeURIComponent(slug)}`);
}
