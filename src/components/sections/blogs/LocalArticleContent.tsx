import Image from "next/image";
import Link from "next/link";
import { Clock3, ArrowLeft } from "lucide-react";
import type { Article } from "@/data/articles";
import { SocialSharing } from "@/components/sections/blogs/blogs/BlogDetailSidebar";

export function LocalArticleContent({ article }: { article: Article }) {
  const headings = article.body.filter(
    (block): block is Extract<Article["body"][number], { type: "heading" }> => block.type === "heading"
  );
  const words = article.body.reduce(
    (total, block) => total + (block.type !== "image" ? block.text.split(/\s+/).length : 0), 0
  );
  const readingMinutes = Math.max(1, Math.ceil(words / 220));
  return (
    <article className="min-h-screen mt-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3 max-w-5xl min-w-0">
            <header className="border-b border-gray-200 pb-6 mb-8">
              <div className="flex items-center flex-wrap gap-4 text-sm mb-5 text-gray-600">
                <span className="font-medium">{article.author}</span>
                <span className="flex items-center gap-1"><Clock3 className="w-4 h-4" />{readingMinutes} min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight mb-5">{article.title}</h1>
              <p className="text-base sm:text-lg leading-relaxed text-gray-600">{article.excerpt}</p>
            </header>
            <div className="max-w-none">
              {article.body.map((block, index) => {
                if (block.type === "heading") return (
                  <h2 key={index} id={block.id} className="scroll-mt-24 text-2xl sm:text-3xl font-medium leading-snug mt-12 mb-5">{block.text}</h2>
                );
                if (block.type === "paragraph") return (
                  <p key={index} className="text-base sm:text-lg leading-relaxed text-gray-700 mb-5">{block.text}</p>
                );
                return (
                  <figure key={index} className="my-9 overflow-hidden">
                    <Image src={block.src} alt={block.alt} width={1920} height={1080}
                      sizes="(max-width: 1024px) 100vw, 75vw" className="w-full h-auto object-cover"
                        quality={90}
                      />
                  </figure>
                );
              })}
            </div>
            <Link href="/media/blogs" className="inline-flex mt-12 items-center gap-2 text-[rgb(140,46,71)] hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to Blogs
            </Link>
          </div>
          <aside className="lg:col-span-1 min-w-0">
            <div className="sticky top-24 space-y-8">
              <nav aria-label="Article sections">
                <h2 className="text-lg font-semibold mb-4">In this article</h2>
                <ul className="space-y-3 text-sm">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`} className="text-gray-600 hover:text-[rgb(140,46,71)] transition-colors">
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <SocialSharing title={article.title}
                url={`https://www.altafdevelopments.com/media/blogs/${article.slug}`}
                excerpt={article.excerpt} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
