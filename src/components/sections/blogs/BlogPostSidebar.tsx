/*
@eslint-disable @typescript-eslint/no-explicit-any
*/
import {
  SocialSharing,
  TableOfContents,
} from "@/components/sections/blogs/blogs/BlogDetailSidebar";
import { Post } from "@/lib/sanity/sanity";

interface BlogPostSidebarProps {
  post: Post; // Replace with your actual post type
}

export function BlogPostSidebar({ post }: BlogPostSidebarProps) {
  return (
    <div className="sticky top-8 space-y-8">
      {/* Table of Contents */}
      <TableOfContents content={post.body} />

      {/* Social Sharing */}
      <SocialSharing
        title={post.title}
        url={`https://altafdevelopments.com/blogs/${post.slug?.current}`}
        excerpt={post.excerpt}
      />
    </div>
  );
}// components/sections/blogs/blogs/BlogPostSidebar.tsx
