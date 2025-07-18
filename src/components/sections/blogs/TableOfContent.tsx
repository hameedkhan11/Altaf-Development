// // components/blog/Sidebar.tsx
// "use client";

// import Link from "next/link";
// import { useState, useEffect, useCallback, useRef } from "react";
// import { 
//   HiOutlineMenu, 
//   HiOutlineShare, 
//   HiOutlineTag, 
//   HiOutlineMail 
// } from "react-icons/hi";
// import { 
//   FaFacebookF, 
//   FaTwitter, 
//   FaLinkedinIn, 
//   FaWhatsapp 
// } from "react-icons/fa";

// // Table of Contents Component with Active Heading Detection
// export function TableOfContents({ content }: { content: any[] }) {
//   const [activeHeading, setActiveHeading] = useState<string>("");
//   const [isScrolling, setIsScrolling] = useState(false);
//   const [headingElements, setHeadingElements] = useState<{ id: string; text: string; level: string }[]>([]);
//   const observerRef = useRef<IntersectionObserver | null>(null);
//   const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   if (!content) return null;

//   const headings = content.filter(
//     (block) =>
//       block._type === "block" && ["h2", "h3", "h4"].includes(block.style)
//   );

//   if (headings.length === 0) return null;

//   // Function to extract text from portable text children
//   const extractText = (children: any): string => {
//     if (!children) return "";
    
//     if (typeof children === "string") return children;
    
//     if (Array.isArray(children)) {
//       return children.map(child => extractText(child)).join("");
//     }
    
//     if (typeof children === "object" && children.text) {
//       return children.text;
//     }
    
//     return "";
//   };

//   // Generate ID from text (matching the ID generation in PortableText component)
//   const generateId = (text: string): string => {
//     return text
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/(^-|-$)/g, "");
//   };

//   // Handle smooth scrolling to heading
//   const scrollToHeading = useCallback((id: string, event: React.MouseEvent) => {
//     event.preventDefault();
    
//     // Set scrolling state to prevent observer from interfering
//     setIsScrolling(true);
    
//     // Clear any existing timeout
//     if (scrollTimeoutRef.current) {
//       clearTimeout(scrollTimeoutRef.current);
//     }
    
//     // Immediately set the active heading
//     setActiveHeading(id);
    
//     // Wait a bit for DOM to be ready, then find the element
//     setTimeout(() => {
//       let element = document.getElementById(id);
      
//       if (element) {
//         const offset = 100; // Adjust offset as needed
//         const elementPosition = element.offsetTop - offset;
        
//         window.scrollTo({
//           top: elementPosition,
//           behavior: "smooth"
//         });
        
//         // Reset scrolling state after animation completes
//         scrollTimeoutRef.current = setTimeout(() => {
//           setIsScrolling(false);
//         }, 1000);
//       } else {
//         console.warn(`Element with ID "${id}" not found`);
//         setIsScrolling(false);
//       }
//     }, 100); // Small delay to ensure DOM is ready
//   }, []);

//   // Setup intersection observer for active heading detection
//   useEffect(() => {
//     // Wait for DOM to be ready
//     const timer = setTimeout(() => {
//       // Find all headings in the document
//       const allHeadings = document.querySelectorAll('h2, h3, h4');
      
//       if (allHeadings.length === 0) return;

//       // Build headings array from DOM elements
//       const domHeadings = Array.from(allHeadings).map((element) => {
//         const text = element.textContent || "";
//         const id = element.id || generateId(text);
//         const level = element.tagName.toLowerCase();
        
//         // Ensure element has an ID
//         if (!element.id) {
//           element.id = id;
//         }
        
//         return { id, text, level, element };
//       });

//       setHeadingElements(domHeadings.map(h => ({ id: h.id, text: h.text, level: h.level })));

//       // Disconnect previous observer
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }

//       // Create new intersection observer
//       observerRef.current = new IntersectionObserver(
//         (entries) => {
//           // Only update active heading if not currently scrolling
//           if (isScrolling) return;
          
//           const visibleEntries = entries.filter(entry => entry.isIntersecting);
          
//           if (visibleEntries.length > 0) {
//             // Sort by distance from top of viewport
//             const sortedEntries = visibleEntries.sort((a, b) => {
//               const aRect = a.boundingClientRect;
//               const bRect = b.boundingClientRect;
              
//               // Prioritize headings closer to the top of the viewport
//               return Math.abs(aRect.top) - Math.abs(bRect.top);
//             });
            
//             setActiveHeading(sortedEntries[0].target.id);
//           }
//         },
//         {
//           rootMargin: "-80px 0px -60% 0px",
//           threshold: [0, 0.25, 0.5, 0.75, 1]
//         }
//       );

//       // Observe all heading elements
//       domHeadings.forEach(({ element }) => {
//         observerRef.current!.observe(element);
//       });
//     }, 500); // Wait for PortableText to render

//     return () => {
//       clearTimeout(timer);
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//       if (scrollTimeoutRef.current) {
//         clearTimeout(scrollTimeoutRef.current);
//       }
//     };
//   }, [content, isScrolling]);

//   // Set initial active heading on mount
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (headingElements.length > 0 && !activeHeading) {
//         const firstHeading = headingElements[0];
//         const element = document.getElementById(firstHeading.id);
        
//         if (element) {
//           const rect = element.getBoundingClientRect();
//           if (rect.top <= 200) {
//             setActiveHeading(firstHeading.id);
//           }
//         }
//       }
//     }, 600);

//     return () => clearTimeout(timer);
//   }, [headingElements, activeHeading]);

//   return (
//     <div className="rounded-lg p-6 border border-gray-200 bg-white shadow-sm">
//       <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
//         <HiOutlineMenu className="w-5 h-5 mr-2 text-[rgb(140,46,71)]" />
//         Table of Contents
//       </h3>
//       <nav className="space-y-2">
//         {headingElements.length > 0 ? (
//           headingElements.map((heading, index) => {
//             const isActive = activeHeading === heading.id;

//             return (
//               <button
//                 key={index}
//                 onClick={(e) => scrollToHeading(heading.id, e)}
//                 className={`block w-full text-left text-sm cursor-pointer transition-all duration-200 p-2 rounded-md border-l-2 ${
//                   isActive 
//                     ? "bg-[rgb(140,46,71)] text-white border-l-[rgb(140,46,71)] shadow-sm" 
//                     : "hover:bg-[rgb(140,46,71)] hover:text-white border-l-transparent hover:border-l-[rgb(140,46,71)] text-gray-600"
//                 } ${
//                   heading.level === "h2"
//                     ? "font-medium"
//                     : heading.level === "h3"
//                       ? "pl-4 font-normal"
//                       : "pl-8 font-normal"
//                 }`}
//               >
//                 {heading.text}
//               </button>
//             );
//           })
//         ) : (
//           // Fallback to original headings if DOM elements aren't ready
//           headings.map((heading, index) => {
//             const text = extractText(heading.children) || heading.children?.[0]?.text || `Heading ${index + 1}`;
//             const id = generateId(text);
//             const level = heading.style;
//             const isActive = activeHeading === id;

//             return (
//               <button
//                 key={index}
//                 onClick={(e) => scrollToHeading(id, e)}
//                 className={`block w-full text-left text-sm cursor-pointer transition-all duration-200 p-2 rounded-md border-l-2 ${
//                   isActive 
//                     ? "bg-[rgb(140,46,71)] text-white border-l-[rgb(140,46,71)] shadow-sm" 
//                     : "hover:bg-[rgb(140,46,71)] hover:text-white border-l-transparent hover:border-l-[rgb(140,46,71)] text-gray-600"
//                 } ${
//                   level === "h2"
//                     ? "font-medium"
//                     : level === "h3"
//                       ? "pl-4 font-normal"
//                       : "pl-8 font-normal"
//                 }`}
//               >
//                 {text}
//               </button>
//             );
//           })
//         )}
//       </nav>
//     </div>
//   );
// }

// // Social Sharing Component
// export function SocialSharing({
//   title,
//   url,
//   excerpt,
// }: {
//   title: string;
//   url: string;
//   excerpt?: string;
// }) {
//   const encodedTitle = encodeURIComponent(title);
//   const encodedUrl = encodeURIComponent(
//     `${process.env.NEXT_PUBLIC_SITE_URL || "https://altafdevelopments.com"}${url}`
//   );
//   const encodedExcerpt = encodeURIComponent(excerpt || title);

//   const socialLinks = [
//     {
//       name: "Facebook",
//       url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
//       icon: <FaFacebookF className="w-5 h-5" />,
//       color: "hover:text-blue-600",
//     },
//     {
//       name: "Twitter",
//       url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
//       icon: <FaTwitter className="w-5 h-5" />,
//       color: "hover:text-sky-500",
//     },
//     {
//       name: "LinkedIn",
//       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
//       icon: <FaLinkedinIn className="w-5 h-5" />,
//       color: "hover:text-blue-700",
//     },
//     {
//       name: "WhatsApp",
//       url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
//       icon: <FaWhatsapp className="w-5 h-5" />,
//       color: "hover:text-green-600",
//     },
//     {
//       name: "Email",
//       url: `mailto:?subject=${encodedTitle}&body=${encodedExcerpt}%0A%0A${encodedUrl}`,
//       icon: <HiOutlineMail className="w-5 h-5" />,
//       color: "hover:text-gray-600",
//     },
//   ];

//   return (
//     <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
//       <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//         <HiOutlineShare className="w-5 h-5 mr-2 text-blue-600" />
//         Share Article
//       </h3>
//       <div className="grid grid-cols-2 gap-3">
//         {socialLinks.map((social) => (
//           <a
//             key={social.name}
//             href={social.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className={`flex items-center justify-center p-3 rounded-lg border border-gray-200 text-gray-500 ${social.color} transition-all duration-200 hover:border-current hover:shadow-md`}
//             aria-label={`Share on ${social.name}`}
//           >
//             {social.icon}
//             <span className="ml-2 text-sm font-medium">{social.name}</span>
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Categories Widget Component
// export function CategoriesWidget({ categories }: { categories?: any[] }) {
//   if (!categories || categories.length === 0) return null;

//   return (
//     <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
//       <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//         <HiOutlineTag className="w-5 h-5 mr-2 text-blue-600" />
//         Categories
//       </h3>
//       <div className="space-y-2">
//         {categories.map((category) => (
//           <Link
//             key={category._id}
//             href={`/blog?category=${category.slug?.current}`}
//             className="block p-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
//           >
//             <span className="font-medium">{category.title}</span>
//             {category.description && (
//               <p className="text-sm text-gray-500 mt-1">
//                 {category.description}
//               </p>
//             )}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }