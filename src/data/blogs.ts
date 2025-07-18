// data/blogData.ts

import { BlogPost } from "@/lib/blogs/types";



export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Altaf ANNOUNCES LUXURY AS...',
    excerpt: 'Altaf announces Sohail Khan as brand ambassador at launch of Beach Walk 4 in Dubai Islands During a special press...',
    image: 'imgi_4_FRONT_EXTERIOR_VIEW_1_yivycn',
    date: '05-05-2025',
    category: 'NEWS',
    slug: 'altaf-announces-sohail-khan',
    readTime: '3 min read',
    publishedAt: new Date(),
    author: 'John Doe',
    content: 'This is the content of the blog post.'
  },
  {
    id: '2',
    title: 'THE DUBAI PHENOMENON',
    excerpt: 'The emirate offers one of the world\'s most dynamic real estate markets for investors. This article is not merely a reflection on Dubai success...',
    image: 'imgi_79_5mgdQDZxgis4amRrBpoBaqY7I_taw48h',
    date: '04-04-2025',
    category: 'NEWS',
    slug: 'the-dubai-phenomenon',
    readTime: '5 min read',
    publishedAt: new Date(),
    author: 'John Doe',
  },
  {
    id: '3',
    title: 'Altaf DEVELOPMENTS RECEIVES PRESTIGIOUS...',
    excerpt: 'In a landmark event, His Highness Shaikh Mohammad Bin Rashid Al Maktoum, Vice President and Prime Minister of the UAE and Ruler of...',
    image: 'imgi_99_d3QEam3LYXLKxAL4t2KbMIQ5iE_vizwvp',
    date: '27-03-2025',
    category: 'NEWS',
    slug: 'altaf-developments-receives-prestigious',
    readTime: '4 min read',
    publishedAt: new Date(),
    author: 'John Doe',
  }
];

export const getBlogPosts = (): BlogPost[] => {
  return mockBlogPosts.map(post =>({
    ...post,
    publishedAt: new Date()
  }));
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return mockBlogPosts.find(post => post.slug === slug);
};

export const getLatestPosts = (limit: number = 3): BlogPost[] => {
  return mockBlogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};