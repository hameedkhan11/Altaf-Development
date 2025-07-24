// estate/frontend/lib/queries.ts
import { groq } from "next-sanity";

// Fragment for common post preview fields
const POST_PREVIEW_FIELDS = groq`
  _id,
  title,
  slug,
  excerpt,
  featuredImage { // Using 'featuredImage' as per schema
    asset,
    alt, // Fetch alt text from schema
    hotspot,
    crop
  },
  author-> { // Fetch only necessary author fields for preview cards
    name,
    slug,
    image {
      asset,
      alt
    },
    title // Author's professional title
  },
  publishedAt,
  readingTime,
  featured,
  focusKeyword, // Fetch focus keyword for potential preview sorting/filtering/display
  // Fetch titles/slugs for categories, locations, property types for display/linking
  categories[]-> {
    title,
    slug
  },
  locations[]-> {
    name,
    slug
  },
  propertyTypes[]-> {
    name,
    slug
  },
`;

// Query for the main blog list (fetching previews)
export const BLOG_POSTS_QUERY = groq`
  *[_type == "post" && !defined(noIndex) || noIndex == false] | order(publishedAt desc) { // Filter out noIndex posts
    ${POST_PREVIEW_FIELDS}
  }
`;

// Query for featured blog posts (fetching previews)
export const FEATURED_BLOG_POSTS_QUERY = groq`
  *[_type == "post" && featured == true && (!defined(noIndex) || noIndex == false)] | order(publishedAt desc) [0...3] { // Limit and filter
    ${POST_PREVIEW_FIELDS}
  }
`;

// Query for a single blog post (fetching all details)
export const BLOG_POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    excerpt,
    featuredImage { // Using 'featuredImage'
      asset,
      alt, // Fetch alt text
      hotspot,
      crop
    },
    author-> { // Fetch full author details for single post page
      _id,
      name,
      slug,
      image {
        asset,
        alt
      },
      bio, // Fetch bio (assuming it's block content)
      title, // Professional title
      licenseNumber,
      phone,
      email,
      servingAreas
      // No 'social' field in schema, so not fetching
    },
    publishedAt,
    updatedAt, // Fetch last updated date
    categories[]-> { // Fetch full category details if needed, just title/slug/description for now
      _id,
      title,
      slug,
      description
    },
    locations[]-> { // Fetch location details for single post page
      _id,
      name,
      slug,
      state,
      zipCodes,
      description,
      medianHomePrice,
      pricePerSqFt,
      marketStatus,
      featuredImage // Location also has featured image
    },
    propertyTypes[]-> { // Fetch property type details
      _id,
      name,
      slug,
      description,
      averagePriceRange
    },
    targetKeywords, // Fetch target keywords
    body[] { // Fetch block content with specific fields for custom types
      ..., // Spread standard block fields
      _type == "image" => { // Handle image block type
        asset,
        alt, // Fetch alt text from inline image schema
        caption, // Fetch caption from inline image schema
        hotspot,
        crop
      },
      _type == "propertyHighlight" => { // Handle property highlight object
        _type,
        title,
        price,
        location,
        beds,
        baths,
        sqft,
        image { // Image within property highlight
          asset,
          alt,
          hotspot,
          crop
        }
      },
      _type == "ctaBlock" => { // Handle CTA block object
        _type,
        headline,
        text,
        buttonText,
        buttonUrl
      },
      markDefs[] { // Handle mark definitions like internal links
          ...,
          _type == "internalLink" => {
              reference -> { // Follow the reference
                  _type,
                  slug { current } // Fetch the slug of the referenced document
              }
          }
      }
    },
    seoTitle, // Fetch SEO Title
    ogImage { // Fetch OG Image
        asset,
        alt,
        hotspot,
        crop
    },
    canonicalUrl, // Fetch Canonical URL
    noIndex // Fetch noIndex status
    // focusKeyword is already included in POST_PREVIEW_FIELDS fragment,
    // but for a single post, you might want to ensure it's fetched if fragment changes
    // focusKeyword // Explicitly fetch if not using fragment
  }
`;

// Query for all post slugs (for static generation)
export const BLOG_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && (!defined(noIndex) || noIndex == false)][].slug.current // Filter out noIndex posts from slugs
`;

// Query for all categories
export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
    // No 'color' field in your schema, removing it
  }
`;

// Query for all locations
export const LOCATIONS_QUERY = groq`
  *[_type == "location"] | order(name asc) {
    _id,
    name,
    slug,
    state,
    description
  }
`;

// Query for related posts (based on shared categories, locations, or property types)
// This is a slightly more complex example, you can simplify or adjust as needed
// Currently sticking to Category-based as in the original code, but added location/propertyType potential
export const RELATED_POSTS_QUERY = groq`
  *[_type == "post" && _id != $postId && (!defined(noIndex) || noIndex == false) && (
    count(categories[@._ref in *[_type == "post" && _id == $postId][0].categories[]._ref]) > 0
    || count(locations[@._ref in *[_type == "post" && _id == $postId][0].locations[]._ref]) > 0
    || count(propertyTypes[@._ref in *[_type == "post" && _id == $postId][0].propertyTypes[]._ref]) > 0
  )] | order(publishedAt desc) [0..2] {
    ${POST_PREVIEW_FIELDS} // Re-using the preview fields fragment
  }
`;


