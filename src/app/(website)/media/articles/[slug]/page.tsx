import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import BlogDetailHero from "@/components/sections/blogs/blogs/BlogDetailHero";
import { LocalArticleContent } from "@/components/sections/blogs/LocalArticleContent";
import { articles, getArticleBySlug } from "@/data/articles";

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article not found", robots: { index: false } };
  const url = `/media/articles/${article.slug}`;
  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author }],
    alternates: { canonical: url },
    openGraph: {
      title: article.title, description: article.excerpt, type: "article",
      url, images: [{ url: article.coverImage, alt: article.coverAlt }],
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images: [article.coverImage] },
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const url = `https://www.altafdevelopments.com/media/articles/${article.slug}`;
  const schema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: article.title, description: article.excerpt,
    image: `https://www.altafdevelopments.com${article.coverImage}`,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: "Altaf Developments" },
    mainEntityOfPage: url,
  };
  return (
    <>
      <Script id="article-detail-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BlogDetailHero section="articles" post={{ title: article.title, excerpt: article.excerpt, slug: { current: article.slug } }} />
      <LocalArticleContent article={article} />
    </>
  );
}
