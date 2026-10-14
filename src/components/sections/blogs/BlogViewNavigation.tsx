import Link from "next/link";

type BlogView = "featured" | "others";

const views: { key: BlogView; label: string; href: string }[] = [
  { key: "featured", label: "Featured Blog", href: "/media/blogs" },
  { key: "others", label: "Other Blogs", href: "/media/blogs/all" },
];

export function BlogViewNavigation({ current }: { current: BlogView }) {
  return (
    <nav aria-label="Blog pages" className="px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
      <div className="flex flex-wrap justify-center gap-3 sm:gap-5 max-w-4xl mx-auto">
        {views.map((view) => {
          const active = current === view.key;
          return (
            <Link
              key={view.key}
              href={view.href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex items-center justify-center min-w-36 sm:min-w-48 rounded-full px-5 py-3 font-medium text-sm sm:text-base transition-colors border-2 border-[rgb(140,46,71)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(140,46,71)] ${
                active
                  ? "bg-[rgb(140,46,71)] text-white"
                  : "bg-white text-[rgb(140,46,71)] hover:bg-[rgb(140,46,71)] hover:text-white"
              }`}
            >
              {view.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
