/*
@eslint-disable @typescript-eslint/no-explicit-any
*/
// components/blog/Sidebar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import { 
  HiOutlineMenu, 
  HiOutlineShare, 
  HiOutlineMail 
} from "react-icons/hi";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaWhatsapp 
} from "react-icons/fa";

// Define proper types for the content structure
interface PortableTextChild {
  _type: string;
  text?: string;
  marks?: string[];
  _key: string;
}

interface ContentBlock {
  _type: string;
  style?: string;
  children?: PortableTextChild[];
  _key: string;
}

// Table of Contents Component with Active Heading Detection
export function TableOfContents({ content }: { content: ContentBlock[] }) {
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [isScrolling, setIsScrolling] = useState(false);

  // Move all hooks to the top, before any conditional logic
  // Handle smooth scrolling to heading
  const scrollToHeading = useCallback((id: string, event: React.MouseEvent) => {
    event.preventDefault();
    
    const element = document.getElementById(id);
    if (element) {
      setIsScrolling(true);
      
      const offset = 120; // Adjust for fixed header + some padding
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
      
      // Update active heading immediately
      setActiveHeading(id);
      
      // Reset scrolling flag after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    } else {
      console.warn(`Element with ID "${id}" not found`);
    }
  }, []);

  // Function to extract text from portable text children - EXACT same logic as main component
  const extractText = useCallback((children: PortableTextChild[] | PortableTextChild | string | undefined): string => {
    if (!children) return "";
    
    if (typeof children === "string") return children;
    
    if (Array.isArray(children)) {
      return children.map(child => {
        if (typeof child === "string") return child;
        if (child && typeof child === "object" && child.text) return child.text;
        return "";
      }).join("");
    }
    
    if (typeof children === "object" && children.text) {
      return children.text;
    }
    
    return "";
  }, []);

  // Generate ID from text - EXACT same logic as in your main component
  const generateId = useCallback((text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }, []);

  // Get headings from content using useMemo to prevent re-calculation on every render
  const headings = useMemo(() => {
    return content ? content.filter(
      (block) =>
        block._type === "block" && ["h2", "h3", "h4"].includes(block.style || "")
    ) : [];
  }, [content]);

  // Improved scroll listener to detect active heading
  useEffect(() => {
    // Only set up scroll listener if we have headings
    if (headings.length === 0) return;

    const handleScroll = () => {
      // Don't update during programmatic scrolling
      if (isScrolling) return;

      // Get all heading elements that should exist based on content
      const headingIds = headings.map(heading => {
        const text = extractText(heading.children);
        return generateId(text);
      });

      if (headingIds.length === 0) return;

      // Find which heading is currently active
      let currentActiveHeading = "";
      
      // Check each heading to see which one is currently visible
      for (let i = 0; i < headingIds.length; i++) {
        const element = document.getElementById(headingIds[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          const nextElement = i < headingIds.length - 1 ? 
            document.getElementById(headingIds[i + 1]) : null;
          
          // If this heading is above the viewport top + 150px
          // and the next heading is below that point (or doesn't exist)
          if (rect.top <= 150) {
            if (nextElement) {
              const nextRect = nextElement.getBoundingClientRect();
              if (nextRect.top > 150) {
                currentActiveHeading = headingIds[i];
                break;
              }
            } else {
              // This is the last heading and it's above the threshold
              currentActiveHeading = headingIds[i];
              break;
            }
          }
        }
      }

      // If no heading is found above the threshold, check if we're at the top
      if (!currentActiveHeading && window.scrollY < 200) {
        currentActiveHeading = headingIds[0];
      }

      // If still no match, find the last heading that's passed
      if (!currentActiveHeading) {
        for (let i = headingIds.length - 1; i >= 0; i--) {
          const element = document.getElementById(headingIds[i]);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150) {
              currentActiveHeading = headingIds[i];
              break;
            }
          }
        }
      }

      if (currentActiveHeading !== activeHeading) {
        setActiveHeading(currentActiveHeading);
      }
    };

    // Initial check with delay to ensure DOM is ready
    const initialTimer = setTimeout(() => {
      handleScroll();
    }, 500);

    // Throttled scroll listener
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    window.addEventListener("resize", scrollListener, { passive: true });
    
    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("resize", scrollListener);
    };
  }, [headings, activeHeading, isScrolling, extractText, generateId]);

  // Early returns after all hooks have been called
  if (!content) return null;

  if (headings.length === 0) return null;

  return (
    <div className="rounded-lg p-6 border border-gray-200 bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <HiOutlineMenu className="w-5 h-5 mr-2 text-[rgb(140,46,71)]" />
        Table of Contents
      </h3>
      <nav className="space-y-2">
        {headings.map((heading, index) => {
          const text = extractText(heading.children) || `Heading ${index + 1}`;
          const id = generateId(text);
          const level = heading.style;
          const isActive = activeHeading === id;

          return (
            <button
              key={`${id}-${index}`}
              onClick={(e) => scrollToHeading(id, e)}
              className={`block w-full text-left text-sm cursor-pointer transition-all duration-300 p-1 rounded-md border-l-2 ${
                isActive 
                  ? "bg-[rgb(140,46,71)] text-white border-l-[rgb(140,46,71)]" 
                  : "hover:bg-[rgb(140,46,71)] hover:text-white border-l-transparent hover:border-l-[rgb(140,46,71)]"
              } ${
                level === "h2"
                  ? "font-medium"
                  : level === "h3"
                    ? "pl-4 font-normal"
                    : "pl-8 font-normal"
              }`}
              title={text}
            >
              <span className="block truncate">{text}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

// Social Sharing Component
export function SocialSharing({
  title,
  url,
  excerpt,
}: {
  title: string;
  url: string;
  excerpt?: string;
}) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(
    `${process.env.NEXT_PUBLIC_SITE_URL || "https://altafdevelopments.com"}${url}`
  );
  const encodedExcerpt = encodeURIComponent(excerpt || title);

  const socialLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FaFacebookF className="w-5 h-5" />,
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: <FaTwitter className="w-5 h-5" />,
      color: "hover:text-sky-500",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <FaLinkedinIn className="w-5 h-5" />,
      color: "hover:text-blue-700",
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <FaWhatsapp className="w-5 h-5" />,
      color: "hover:text-green-600",
    },
    {
      name: "Email",
      url: `mailto:?subject=${encodedTitle}&body=${encodedExcerpt}%0A%0A${encodedUrl}`,
      icon: <HiOutlineMail className="w-5 h-5" />,
      color: "hover:text-gray-600",
    },
  ];

  return (
    <div className="rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <HiOutlineShare className="w-5 h-5 mr-2" />
        Share Article
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {socialLinks.map((social) => (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center p-1 rounded-lg  ${social.color} transition-all duration-200 hover:border-current hover:shadow-md`}
            aria-label={`Share on ${social.name}`}
          >
            {social.icon}
            <span className="ml-2 text-sm font-medium">{social.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}