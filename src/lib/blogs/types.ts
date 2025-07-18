// lib/types.ts
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
  date: string;
  slug: string;
  author?: string;
  readTime?: string;
  featured?: boolean;
  publishedAt: Date;
}

export interface BlogSectionProps {
  posts: BlogPost[];
  title?: string;
  showSeeAll?: boolean;
}

export interface BlogCardProps {
  post: BlogPost;
  index?: number;
  prioritizeLoading?: boolean;
  enableAnimations?: boolean;
}

export interface FeaturedBlogProps {
  post: BlogPost;
}

export interface BlogGridProps {
  posts: BlogPost[];
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  loading?: boolean;
}

export interface BlogLandingPageProps {
  blogTitle?: string;
  featuredPost: BlogPost;
  regularPosts: BlogPost[];
  hasMore?: boolean;
  onLoadMore?: () => void;
  loading?: boolean;
}