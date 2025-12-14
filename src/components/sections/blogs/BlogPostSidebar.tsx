
import {
  SocialSharing,
  TableOfContents,
} from "@/components/sections/blogs/blogs/BlogDetailSidebar";
import { PopulatedPost } from "@/lib/sanity/sanity";

interface BlogPostSidebarProps {
  post: PopulatedPost; // Replace with your actual post type
}

export function BlogPostSidebar({ post }: BlogPostSidebarProps) {
  return (
    <div className="sticky top-8 space-y-8">
      {/* Table of Contents */}
      <TableOfContents content={post.body} />

      {/* Social Sharing */}
      <SocialSharing
        title={post.title}
        url={`https://altafdevelopments.com/media/blogs/${post.slug?.current}`}
        excerpt={post.excerpt}
      />
    </div>
  );
}
