import type { Metadata } from "next";
import Script from "next/script";
import { Hero } from "@/components/common/Hero";
import { BlogContent } from "@/components/sections/blogs/BlogContent";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Articles | Altaf Developments",
  description: "Editorial articles and features from Altaf Developments.",
  alternates: { canonical: "/media/articles" },
};

export default function ArticlesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Articles | Altaf Developments",
    url: "https://www.altafdevelopments.com/media/articles",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem", position: index + 1,
        name: article.title,
        url: `https://www.altafdevelopments.com/media/articles/${article.slug}`,
      })),
    },
  };
  return (
    <>
      <Script id="articles-list-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen">
        <Hero
          title="Articles"
          subtitle="Features and perspectives from Altaf Developments."
          backgroundType="image"
          backgroundSrc="Blogs_lbursu_hm8of8"
          height="three-quarter"
          overlay="medium"
          contentAlignment="center"
          breadcrumbs={[{ label: "Media", href: "/media/articles" }, { label: "Articles", href: "/media/articles" }]}
          showScrollIndicator={false}
          ariaLabel="Articles hero section"
        />
        <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-8 sm:py-12 md:py-16">
          <BlogContent posts={articles} section="articles" />
        </div>
      </div>
    </>
  );
}
