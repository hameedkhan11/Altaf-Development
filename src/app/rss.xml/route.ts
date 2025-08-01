// File: /app/rss.xml/route.ts
import { NextResponse } from 'next/server';


interface BlogPost {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  guid: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  // Replace this with your actual blog data fetching logic
  // For example, if using a CMS like Contentful, Sanity, or markdown files
  
  // Example static data - replace with your actual implementation
  const posts: BlogPost[] = [
    {
      title: "Luxury Real Estate Trends in 2024",
      description: "Discover the latest trends shaping the luxury real estate market in Pakistan and internationally.",
      link: "https://altafdevelopments.com/blog/luxury-real-estate-trends-2024",
      pubDate: new Date('2024-01-15').toUTCString(),
      guid: "https://altafdevelopments.com/blog/luxury-real-estate-trends-2024"
    },
    {
      title: "Investment Opportunities in Islamabad",
      description: "Explore the best investment opportunities in Islamabad's growing real estate market.",
      link: "https://altafdevelopments.com/blog/investment-opportunities-islamabad",
      pubDate: new Date('2024-01-10').toUTCString(),
      guid: "https://altafdevelopments.com/blog/investment-opportunities-islamabad"
    }
    // Add more posts here or fetch from your data source
  ];

  return posts;
}

export async function GET() {
  try {
    const posts = await getBlogPosts();
    
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Altaf Developments Blog</title>
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
      <pubDate>${post.pubDate}</pubDate>
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