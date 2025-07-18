// components/sections/blogs/BlogPostContent.tsx - Updated to accept PopulatedPost
/* @eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText } from "@portabletext/react";
// import { BlogPostHeader } from "./BlogPostHeader";
import { portableTextComponents } from "./PortableTextComponents";
// import { BlogPostSidebar } from "./BlogPostSidebar";
import { PopulatedPost } from "@/lib/sanity/sanity"; // Import PopulatedPost instead of Post

interface BlogPostContentProps {
  post: PopulatedPost; // Change from Post to PopulatedPost
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <section>
      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3 max-w-5xl">
            {/* <BlogPostHeader post={post} /> */}
            
            <div className="prose prose-lg prose-blue max-w-none">
              {post.body && (
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* <BlogPostSidebar post={post} /> */}
          </div>
        </div>
      </div>
    </section>
  );
}