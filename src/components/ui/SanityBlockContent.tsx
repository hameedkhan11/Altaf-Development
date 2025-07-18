// // components/SanityBlockContent.tsx
// 'use client'; // This component might contain client-side interactions (e.g., links)

// import { PortableText, PortableTextComponents } from '@portabletext/react';
// import Image from 'next/image'; // Using Next.js Image component for optimization
// import Link from 'next/link'; // Using Next.js Link for internal navigation
// import {
//     SanityImage,
//     BlockContent,
//     PropertyHighlight,
//     CTABlock,
//     SanityReference,
// } from '@/lib/sanity/sanity'; // Adjust path
// import { urlFor } from '@/lib/sanity';

// // Optional: Components object for PortableText. Allows customizing rendering of
// // different block types, marks, and annotations.
// const components: PortableTextComponents = {
//     types: {
//         image: ({ value }: { value: SanityImage }) => {
//             // Use urlFor to get the URL and Next.js Image for optimization
//             if (!value || !value.asset) return null;
//             const imageUrl = urlFor(value).width(800).url(); // Adjust width as needed
//             if (!imageUrl) return null;

//             return (
//                 <figure className="my-8"> {/* Add some margin around images */}
//                     <div className="relative w-full h-auto aspect-[16/9]"> {/* Simple responsive container */}
//                        <Image
//                           src={imageUrl}
//                           alt={value.alt || ''}
//                           fill
//                           sizes="(max-width: 800px) 100vw, 800px" // Improve performance
//                           style={{ objectFit: 'cover' }}
//                           unoptimized={imageUrl.startsWith('data:')} // Don't optimize data URLs (placeholders)
//                        />
//                     </div>
//                     {value.caption && (
//                         <figcaption className="mt-2 text-center text-sm text-gray-500">{value.caption}</figcaption>
//                     )}
//                 </figure>
//             );
//         },
//         propertyHighlight: ({ value }: { value: PropertyHighlight }) => (
//             <div className="border-2 border-blue-500 p-4 my-6 rounded-lg bg-blue-50">
//                 <h3 className="text-xl font-semibold text-blue-700 mb-2">{value.title}</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {value.image && (
//                          <div className="relative w-full h-48 md:h-auto aspect-video md:aspect-[4/3]"> {/* Adjust size */}
//                              <Image
//                                 src={urlFor(value.image).width(400).url() || ''}
//                                 alt={value.image.alt || value.title}
//                                 fill
//                                 sizes="(max-width: 768px) 100vw, 400px"
//                                 style={{ objectFit: 'cover' }}
//                              />
//                          </div>
//                     )}
//                     <div>
//                          {value.price && <p className="text-lg font-bold text-green-600">{value.price}</p>}
//                          {value.location && <p className="text-gray-700">{value.location}</p>}
//                          <div className="flex items-center space-x-4 text-gray-600 mt-2">
//                             {value.beds && <span>🛌 {value.beds} Beds</span>}
//                             {value.baths && <span>🛁 {value.baths} Baths</span>}
//                             {value.sqft && <span>📐 {value.sqft} Sqft</span>}
//                          </div>
//                     </div>
//                 </div>
//             </div>
//         ),
//         ctaBlock: ({ value }: { value: CTABlock }) => (
//             <div className="bg-green-600 text-white p-6 my-6 rounded-lg text-center">
//                 {value.headline && <h3 className="text-2xl font-bold mb-2">{value.headline}</h3>}
//                 {value.text && <p className="text-lg mb-4">{value.text}</p>}
//                 {value.buttonText && value.buttonUrl && (
//                     <a
//                         href={value.buttonUrl}
//                         className="inline-block bg-white text-green-700 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-200"
//                         {...(value.buttonUrl.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} // Open external links in new tab
//                     >
//                         {value.buttonText}
//                     </a>
//                 )}
//             </div>
//         ),
//         // Add other custom block types here if you have them
//     },

//     marks: {
//         // Ex: Custom renderer for bold/strong (usually handled by default)
//         // strong: ({ children }) => <strong>{children}</strong>,

//         // Standard external links
//         link: ({ value, children }: { value: { href: string; blank?: boolean }; children: React.ReactNode }) => {
//             const { href, blank } = value;
//             // Use Next.js Link for internal relative URLs, standard <a> for external
//             const isInternal = href.startsWith('/') || href.startsWith('#');

//             if (isInternal) {
//                 return (
//                     <Link href={href}>
//                         {children}
//                     </Link>
//                 );
//             }

//             return (
//                 <a href={href} target={blank ? '_blank' : '_self'} rel={blank ? 'noopener noreferrer' : undefined}>
//                     {children}
//                 </a>
//             );
//         },

//         // Custom internal links based on reference
//         internalLink: ({ value, children }: { value: { reference?: SanityReference & { _type?: string; slug?: { current: string } } }; children: React.ReactNode }) => {
//              const ref = value?.reference;
//              if (!ref || !ref._type || !ref.slug?.current) {
//                  console.warn("Internal link missing reference or slug:", value);
//                  return <span>{children}</span>; // Render text without link if reference is invalid
//              }

//              let href = '#'; // Default fallback
//              switch (ref._type) {
//                  case 'post':
//                      href = `/blogs/${ref.slug.current}`;
//                      break;
//                  case 'location':
//                       href = `/locations/${ref.slug.current}`; // Assuming you have a /locations/[slug] page
//                      break;
//                  case 'category':
//                       href = `/categories/${ref.slug.current}`; // Assuming you have a /categories/[slug] page
//                      break;
//                  // Add cases for other linkable types if needed
//                  default:
//                      console.warn(`Internal link to unhandled type: ${ref._type}`);
//                      return <span>{children}</span>;
//              }

//             return (
//                 <Link href={href}>
//                     {children}
//                 </Link>
//             );
//         },
//         // Add other custom marks here
//     },

//     block: {
//         // Customize block styles (h1, h2, blockquote, etc.)
//         h2: ({ children }) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
//         h3: ({ children }) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
//         h4: ({ children }) => <h4 className="text-xl font-bold mt-4 mb-2">{children}</h4>,
//         blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6">{children}</blockquote>,
//         normal: ({ children }) => <p className="my-4 leading-relaxed">{children}</p>, // Add margin for paragraphs
//     },

//     list: {
//         bullet: ({ children }) => <ul className="list-disc pl-8 my-4">{children}</ul>,
//         number: ({ children }) => <ol className="list-decimal pl-8 my-4">{children}</ol>,
//     },

//     listItem: {
//         bullet: ({ children }) => <li className="mb-2">{children}</li>,
//         number: ({ children }) => <li className="mb-2">{children}</li>,
//     },

//     // Add other components for container, unknown types, etc. if needed
// };

// interface SanityBlockContentProps {
//     blocks: BlockContent;
// }

// const SanityBlockContent: React.FC<SanityBlockContentProps> = ({ blocks }) => {
//     if (!blocks) return null;
//     return (
//         <div className="prose max-w-none"> {/* Optional: Use Tailwind CSS typography plugin for basic styling */}
//             <PortableText
//                 value={blocks}
//                 components={components}
//             />
//         </div>
//     );
// };

// export default SanityBlockContent;