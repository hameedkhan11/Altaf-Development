// lib/blogData.ts
import { BlogPost } from "@/lib/blogs/types";

export const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Faisal Hills A Master Planned Community with Natural Beauty',
    excerpt: 'Strategically located with five major access points, including direct links to the Motorway (M-1)(M2), GT Road, and  (FMC),B-17, Faisal Hills offers unparalleled connectivity.',
    image: 'imgi_5_default_dgtiah',
    category: 'Market Trends',
    date: 'June 10, 2025',
    slug: 'future-luxury-real-estate-2025',
    author: 'Omar Aziz Khan',
    readTime: '8 min read',
    featured: true,
    publishedAt: new Date('2025-06-10'),
  },
  {
    id: '2',
    title: 'Discover Faisal Hills, A Buyer’s Choice',
    excerpt: 'A Modern Community Rising with Purpose, Vision, and Value...',
    image: 'imgi_4_default_is216q',
    category: 'Technology',
    date: 'June 8, 2025',
    slug: 'smart-home-luxury-properties',
    author: 'Omar Aziz Khan',
    readTime: '6 min read',
    publishedAt: new Date('2025-06-08'),
  },
  {
    id: '3',
    title: 'Sustainable Luxury: Eco-Friendly Development Practices',
    excerpt: 'Learn about Altaf Development\'s commitment to sustainable luxury, featuring green building practices and eco-conscious design elements.',
    image: 'imgi_16_Dubai-Skyline12_rhcd74',
    category: 'Sustainability',
    date: 'June 6, 2025',
    slug: 'sustainable-luxury-development',
    author: 'Hassan Khan',
    readTime: '10 min read',
    publishedAt: new Date('2025-06-06'),
  },
  {
    id: '4',
    title: 'Investment Opportunities in Luxury Real Estate',
    excerpt: 'A comprehensive guide to luxury real estate investment opportunities in Pakistan\'s premium markets, including ROI analysis and market forecasts.',
    image: 'imgi_15_Picture122251_gwvfyf',
    category: 'Investment',
    date: 'June 4, 2025',
    slug: 'luxury-real-estate-investment-guide',
    author: 'Fatima Sheikh',
    readTime: '6 min read',
    publishedAt: new Date('2025-06-04'),
  },
  {
    id: '5',
    title: 'Design Trends: Contemporary Luxury Interiors',
    excerpt: 'Discover the latest interior design trends for luxury homes, from minimalist aesthetics to opulent finishes that define sophisticated living spaces.',
    image: 'imgi_14_Cotierhouse_banner_dluavl',
    category: 'Design',
    date: 'June 2, 2025',
    slug: 'contemporary-luxury-interior-trends',
    author: 'Ayesha Rahman',
    readTime: '15 min read',
    publishedAt: new Date('2025-06-02'),
  },
  {
    id: '6',
    title: 'Luxury Amenities That Define Premium Living',
    excerpt: 'Explore the exclusive amenities that set luxury developments apart, from private concierge services to world-class recreational facilities.',
    image: 'imgi_4_default_is216q',
    category: 'Amenities',
    date: 'May 30, 2025',
    slug: 'luxury-amenities-premium-living',
    author: 'Omar Siddiqui',
    readTime: '11 min read',
    publishedAt: new Date('2025-05-30'),
  },
  {
    id: '7',
    title: 'Location Analysis: Prime Real Estate Markets in Pakistan',
    excerpt: 'An in-depth analysis of Pakistan\'s most sought-after luxury real estate locations, including market dynamics and growth potential.',
    image: 'imgi_87_18jLYFnp8jmIsqpvfqRCg9ukDM_lvujpo',
    category: 'Market Analysis',
    date: 'May 28, 2025',
    slug: 'prime-real-estate-markets-pakistan',
    author: 'Zara Ali',
    readTime: '9 min read',
    publishedAt: new Date('2025-05-28'),
  },
  {
    id: '8',
    title: 'The Art of Luxury Property Marketing',
    excerpt: 'Discover innovative marketing strategies for luxury real estate, from virtual tours to exclusive private viewings that attract discerning buyers.',
    image: 'imgi_83_7gDEbNxcayf9dPcV6sVBwtRBfE_scm1tf',
    category: 'Marketing',
    date: 'May 26, 2025',
    slug: 'luxury-property-marketing-strategies',
    author: 'Imran Qureshi',
    readTime: '13 min read',
    publishedAt: new Date('2025-05-26'),
  },
  {
    id: '9',
    title: 'Architectural Excellence in Luxury Developments',
    excerpt: 'Explore the architectural innovations and design philosophies that define Altaf Development\'s luxury projects, from concept to completion.',
    image: 'imgi_85_JgYj8FG9L6uiD6VOjPu5xjCB3Y_y4sjvl',
    category: 'Architecture',
    date: 'May 24, 2025',
    slug: 'architectural-excellence-luxury-developments',
    author: 'Mehreen Akram',
    readTime: '14 min read',
    publishedAt: new Date('2025-05-24'),
  }
];

// Helper function to get latest posts
export const getLatestPosts = (posts: BlogPost[], limit?: number): BlogPost[] => {
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return limit ? sortedPosts.slice(0, limit) : sortedPosts;
};

// Helper function to get featured post
export const getFeaturedPost = (posts: BlogPost[]): BlogPost | null => {
  const featuredPost = posts.find(post => post.featured);
  if (featuredPost) return featuredPost;
  
  // If no featured post, return the latest post
  const latestPosts = getLatestPosts(posts, 1);
  return latestPosts.length > 0 ? latestPosts[0] : null;
};

// Helper function to get regular posts (excluding featured)
export const getRegularPosts = (posts: BlogPost[], excludeFeatured: boolean = true): BlogPost[] => {
  let filteredPosts = posts;
  
  if (excludeFeatured) {
    const featuredPost = getFeaturedPost(posts);
    if (featuredPost) {
      filteredPosts = posts.filter(post => post.id !== featuredPost.id);
    }
  }
  
  return getLatestPosts(filteredPosts);
};

// Helper function to get posts by category
export const getPostsByCategory = (posts: BlogPost[], category: string): BlogPost[] => {
  return posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
};

// Helper function to get all categories
export const getAllCategories = (posts: BlogPost[]): string[] => {
  const categories = posts.map(post => post.category);
  return [...new Set(categories)].sort();
};