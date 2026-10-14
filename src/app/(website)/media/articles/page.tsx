import { permanentRedirect } from "next/navigation";

// Old Articles navigation now belongs to Blogs.
export default function LegacyArticlesPage() {
  permanentRedirect("/media/blogs");
}
