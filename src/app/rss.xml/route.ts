// File: /app/rss.xml/route.ts
import { NextResponse } from 'next/server';
import { articles } from '@/data/articles';
import { getAllBlogs } from '@/lib/blogPosts';


interface BlogPost {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  guid: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const blogs = await getAllBlogs();
  return [
    ...blogs.map((blog) => ({
      title: blog.title,
      description: blog.excerpt,
      link: `https://www.altafdevelopments.com/media/blogs/${blog.slug}`,
      pubDate: "",
      guid: `https://www.altafdevelopments.com/media/blogs/${blog.slug}`,
    })),
    ...articles.map((article) => {
    const link = `https://www.altafdevelopments.com/media/articles/${article.slug}`;
    return {
      title: article.title,
      description: article.excerpt,
      link,
      // The uploaded document did not specify a publish date.
      pubDate: "",
      guid: link,
    };
  }),
  ];
}

export async function GET() {
  try {
    const posts = await getBlogPosts();
    
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Altaf Developments Blogs and Articles</title>
    <link>https://altafdevelopments.com</link>
    <description>Latest news, insights, and updates from Altaf Developments - Your premier luxury real estate partner in Pakistan</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://altafdevelopments.com/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>https://altafdevelopments.com/logo.png</url>
      <title>Altaf Developments</title>
      <link>https://altafdevelopments.com</link>
      <width>144</width>
      <height>144</height>
    </image>
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${post.link}</link>
      <guid isPermaLink="true">${post.guid}</guid>
      ${post.pubDate ? `<pubDate>${post.pubDate}</pubDate>` : ""}
      <category>Real Estate</category>
      <author>info@altafdevelopments.com (Altaf Developments)</author>
    </item>`).join('')}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('RSS generation error:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}