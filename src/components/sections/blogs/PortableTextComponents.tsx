// components/sections/blogs/blogs/PortableTextComponents.tsx
import Image from "next/image";
import Link from "next/link";
import { PortableTextComponents, PortableTextBlockComponent, PortableTextMarkComponent } from "@portabletext/react";
import { urlFor } from "@/lib/sanityService";
import { HiLocationMarker } from "react-icons/hi";
import { FaBath, FaBed, FaRulerCombined } from "react-icons/fa6";
import type {
  PropertyHighlight,
  CTABlock,
  SanityImage,
} from "@/lib/sanity/sanity";
import { ReactNode } from "react";

// Type definitions for better type safety
interface LinkValue {
  href?: string;
  blank?: boolean;
}

interface InternalLinkValue {
  reference?: {
    _ref: string;
  };
}

// Helper function to extract text from children for ID generation
const extractTextFromChildren = (children: ReactNode): string => {
  if (!children) return "";

  if (typeof children === "string") return children;

  if (Array.isArray(children)) {
    return children
      .map((child) => {
        if (typeof child === "string") return child;
        if (
          child &&
          typeof child === "object" &&
          "props" in child &&
          child.props &&
          "children" in child.props
        ) {
          return extractTextFromChildren(child.props.children);
        }
        if (child && typeof child === "object" && "text" in child) {
          return (child as { text: string }).text;
        }
        return "";
      })
      .join("");
  }

  if (
    typeof children === "object" &&
    children &&
    "props" in children &&
    children.props &&
    "children"
  ) {
    return extractTextFromChildren((children as { props: { children: ReactNode } }).props.children);
  }

  if (typeof children === "object" && children && "text" in children) {
    return (children as { text: string }).text;
  }

  return "";
};

// Helper function to generate consistent IDs
const generateId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => (
      <figure className="my-10 rounded-sm overflow-hidden shadow-lg">
        <Image
          src={urlFor(value).width(1920).height(1080).url() || ""} 
          alt={value.alt || "Blog image"}
          width={1920}
          height={1080}
          className="w-full h-auto"
        />
        {value.caption && (
          <figcaption className="px-6 py-4 text-center text-sm italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    propertyHighlight: ({ value }: { value: PropertyHighlight }) => (
      <div className="my-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-sm">
        <h3 className="text-2xl">{value.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {value.price && <p className="text-3xl">{value.price}</p>}
            {value.location && (
              <p className="flex items-center">
                <HiLocationMarker />
                {value.location}
              </p>
            )}
            <div className="flex space-x-6 ">
              {value.beds && (
                <span className="flex items-center">
                  <FaBed />
                  {value.beds} beds
                </span>
              )}
              {value.baths && (
                <span className="flex items-center">
                  <FaBath />
                  {value.baths} baths
                </span>
              )}
              {value.sqft && (
                <span className="flex items-center">
                  <FaRulerCombined />
                  {value.sqft} sq ft
                </span>
              )}
            </div>
          </div>
          {value.image && (
            <div className="relative h-40 rounded-lg overflow-hidden">
              <Image
                src={urlFor(value.image).width(300).height(200).url()}
                alt={value.image.alt || value.title}
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
          )}
        </div>
      </div>
    ),
    ctaBlock: ({ value }: { value: CTABlock }) => (
      <div className="my-10 text-white rounded-xl p-10 text-center shadow-xl">
        {value.headline && <h3 className="text-3xl">{value.headline}</h3>}
        {value.text && (
          <p className="text-blue-100 mb-8 text-lg leading-relaxed">
            {value.text}
          </p>
        )}
        {value.buttonText && value.buttonUrl && (
          <Link
            href={value.buttonUrl}
            className="inline-block text-[rgb(140,46,71)] px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {value.buttonText}
          </Link>
        )}
      </div>
    ),
  },
  marks: {
    link: (({ value, children }: { value?: LinkValue; children: ReactNode }) => (
      <Link
        href={value?.href || "#"}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-[rgb(140,46,71)] hover:text-[rgb(214,110,138)] underline font-medium"
      >
        {children}
      </Link>
    )) as PortableTextMarkComponent,
    internalLink: (({ value, children }: { value?: InternalLinkValue; children: ReactNode }) => (
      <Link
        href={`#${value?.reference?._ref || ""}`}
        className="underline font-medium"
      >
        {children}
      </Link>
    )) as PortableTextMarkComponent,
  },
  block: {
    h2: (({ children }) => {
      const text = extractTextFromChildren(children) || "Heading";
      const id = generateId(text);

      return (
        <h2
          id={id}
          className="text-2xl mt-4 mb-4 scroll-mt-32"
        >
          {children}
        </h2>
      );
    }) as PortableTextBlockComponent,
    h3: (({ children }) => {
      const text = extractTextFromChildren(children) || "Heading";
      const id = generateId(text);

      return (
        <h3 id={id} className="text-xl scroll-mt-32">
          {children}
        </h3>
      );
    }) as PortableTextBlockComponent,
    h4: (({ children }) => {
      const text = extractTextFromChildren(children) || "Heading";
      const id = generateId(text);

      return (
        <h4 id={id} className="text-xl mt-4 mb-4 scroll-mt-32">
          {children}
        </h4>
      );
    }) as PortableTextBlockComponent,
    blockquote: (({ children }) => (
      <blockquote className="border-l-4 pl-6 py-2 italic  my-8 bg-blue-50 rounded-r-lg">
        {children}
      </blockquote>
    )) as PortableTextBlockComponent,
    normal: (({ children }) => (
      <p className="mb-2 leading-relaxed text-sm">{children}</p>
    )) as PortableTextBlockComponent,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-2 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-2 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};