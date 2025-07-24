// lib/sanityService.ts
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type {
  // Post,
  PopulatedPost,
  PostPreview,
  Author,
  Category,
  Location,
  PropertyType,
  PostFilters,
  SearchResult,
  SanityImage,
  BlockContent,
} from "./sanity/sanity";
import { HeroImage } from "./hero/types";

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

// Initialize image URL builder
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
export function urlFor(source: SanityImage) {
  return builder.image(source).auto("format").quality(95);
}

// GROQ queries
const POST_PREVIEW_QUERY = `
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  readingTime,
  featured,
  "author": author->{
    name,
    slug,
    title,
    image
  },
  "categories": categories[]->{
    title,
    slug,
    color
  }
`;

const POST_FULL_QUERY = `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  _rev,
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  updatedAt,
  targetKeywords,
  body,
  featured,
  readingTime,
  seoTitle,
  focusKeyword,
  ogImage,
  canonicalUrl,
  noIndex,
  "author": author->{
    _id,
    name,
    slug,
    image,
    bio,
    title,
    licenseNumber,
    phone,
    email,
    servingAreas
  },
  "categories": categories[]->{
    _id,
    title,
    slug,
    description,
    color,
    icon,
    seo
  },
  "locations": locations[]->{
    _id,
    name,
    slug,
    state,
    zipCodes,
    description,
    medianHomePrice,
    pricePerSqFt,
    marketStatus,
    featuredImage
  },
  "propertyTypes": propertyTypes[]->{
    _id,
    name,
    slug,
    description,
    averagePriceRange
  },
  "relatedPosts": relatedPosts[]->{
    ${POST_PREVIEW_QUERY}
  }
`;

// GROQ Queries
const FEATURED_PROPERTIES_QUERY = `
  *[_type == "property" && isActive == true] {
    _id,
    title,
    price,
    bedrooms,
    bathrooms,
    location,
    propertyType,
    "featuredImage": images[isFeatured == true][0].cloudinaryUrl,
    "allImages": images[].cloudinaryUrl
  }
`;

const PROPERTY_IMAGES_QUERY = `
  *[_type == "property" && _id == $propertyId][0] {
    "images": images[].cloudinaryUrl
  }
`;

const PROPERTY_FEATURED_IMAGE_QUERY = `
  *[_type == "property" && propertyType == $propertyType && isActive == true][0] {
    "featuredImage": images[isFeatured == true][0].cloudinaryUrl,
    "allImages": images[].cloudinaryUrl
  }
`;

class SanityService {
  // Get all published posts with pagination
  async getPosts(filters: PostFilters = {}): Promise<SearchResult> {
    const {
      category,
      location,
      propertyType,
      author,
      featured,
      limit = 10,
      offset = 0,
    } = filters;

    let filterQuery = `*[_type == "post" && publishedAt <= now()]`;

    // Add filters
    if (category) {
      filterQuery += ` && "${category}" in categories[]->slug.current`;
    }
    if (location) {
      filterQuery += ` && "${location}" in locations[]->slug.current`;
    }
    if (propertyType) {
      filterQuery += ` && "${propertyType}" in propertyTypes[]->slug.current`;
    }
    if (author) {
      filterQuery += ` && author->slug.current == "${author}"`;
    }
    if (featured !== undefined) {
      filterQuery += ` && featured == ${featured}`;
    }

    const query = `{
      "posts": ${filterQuery} | order(publishedAt desc) [${offset}...${offset + limit}] {
        ${POST_PREVIEW_QUERY}
      },
      "total": count(${filterQuery})
    }`;

    const result = await client.fetch<{ posts: PostPreview[]; total: number }>(
      query
    );

    return {
      posts: result.posts,
      total: result.total,
      hasMore: result.total > offset + limit,
    };
  }

  // Get featured posts
  async getFeaturedPosts(limit: number = 3): Promise<PostPreview[]> {
    const query = `*[_type == "post" && featured == true && publishedAt <= now()] | order(publishedAt desc) [0...${limit}] {
      ${POST_PREVIEW_QUERY}
    }`;

    return await client.fetch<PostPreview[]>(query);
  }

  // Get recent posts
  async getRecentPosts(limit: number = 5): Promise<PostPreview[]> {
    const query = `*[_type == "post" && publishedAt <= now()] | order(publishedAt desc) [0...${limit}] {
      ${POST_PREVIEW_QUERY}
    }`;

    return await client.fetch<PostPreview[]>(query);
  }

  // Get post by slug
  async getPostBySlug(slug: string): Promise<PopulatedPost | null> {
    const query = `*[_type == "post" && slug.current == $slug && publishedAt <= now()][0] {
      ${POST_FULL_QUERY}
    }`;

    return await client.fetch<PopulatedPost | null>(query, { slug });
  }

  // Get post by ID
  async getPostById(id: string): Promise<PopulatedPost | null> {
    const query = `*[_type == "post" && _id == $id][0] {
      ${POST_FULL_QUERY}
    }`;

    return await client.fetch<PopulatedPost | null>(query, { id });
  }

  // Get posts by category
  async getPostsByCategory(
    categorySlug: string,
    limit: number = 10
  ): Promise<PostPreview[]> {
    const query = `*[_type == "post" && $categorySlug in categories[]->slug.current && publishedAt <= now()] | order(publishedAt desc) [0...${limit}] {
      ${POST_PREVIEW_QUERY}
    }`;

    return await client.fetch<PostPreview[]>(query, { categorySlug });
  }

  // Get posts by location
  async getPostsByLocation(
    locationSlug: string,
    limit: number = 10
  ): Promise<PostPreview[]> {
    const query = `*[_type == "post" && $locationSlug in locations[]->slug.current && publishedAt <= now()] | order(publishedAt desc) [0...${limit}] {
      ${POST_PREVIEW_QUERY}
    }`;

    return await client.fetch<PostPreview[]>(query, { locationSlug });
  }

  // Get posts by author
  async getPostsByAuthor(
    authorSlug: string,
    limit: number = 10
  ): Promise<PostPreview[]> {
    const query = `*[_type == "post" && author->slug.current == $authorSlug && publishedAt <= now()] | order(publishedAt desc) [0...${limit}] {
      ${POST_PREVIEW_QUERY}
    }`;

    return await client.fetch<PostPreview[]>(query, { authorSlug });
  }

  // Search posts
  async searchPosts(
    searchTerm: string,
    limit: number = 10
  ): Promise<PostPreview[]> {
    const query = `*[_type == "post" && publishedAt <= now() && (
      title match $searchTerm + "*" ||
      excerpt match $searchTerm + "*" ||
      pt::text(body) match $searchTerm + "*"
    )] | order(publishedAt desc) [0...${limit}] {
      ${POST_PREVIEW_QUERY}
    }`;

    return await client.fetch<PostPreview[]>(query, { searchTerm });
  }

  // Get featured properties for home page
  async getFeaturedProperties() {
    try {
      const properties = await client.fetch(FEATURED_PROPERTIES_QUERY);
      return properties;
    } catch (error) {
      console.error("Error fetching featured properties:", error);
      return [];
    }
  }

  // Get property images by property ID
  async getPropertyImages(propertyId: string) {
    try {
      const result = await client.fetch(PROPERTY_IMAGES_QUERY, { propertyId });
      return result?.images || [];
    } catch (error) {
      console.error("Error fetching property images:", error);
      return [];
    }
  }

  // Get property images by property type
  async getPropertyImagesByType(propertyType: "1bed" | "2bed") {
    try {
      console.log("Fetching images for propertyType:", propertyType);

      if (!propertyType) {
        console.log("No propertyType provided, returning empty array");
        return [];
      }

      // Simple query to test
      const simpleResult = await client.fetch(`
        *[_type == "property" && propertyType == "${propertyType}" && isActive == true] {
          "allImages": images[].cloudinaryUrl
        }
      `);
      console.log("Simple query result:", simpleResult);

      // Original query with parameter
      const result = await client.fetch(PROPERTY_FEATURED_IMAGE_QUERY, {
        propertyType,
      });
      console.log("Original query result:", result);

      // Return images from the first property found
      if (simpleResult && simpleResult.length > 0) {
        return simpleResult[0].allImages || [];
      }

      return result?.allImages || [];
    } catch (error) {
      console.error("Error fetching property images by type:", error);
      return [];
    }
  }

  // Get all property images (fallback method)
  async getAllPropertyImages() {
    try {
      const result = await client.fetch(`
        *[_type == "property" && isActive == true] {
          "allImages": images[].cloudinaryUrl
        }
      `);
      return result.flatMap(
        (prop: { allImages: string[] }) => prop.allImages || []
      );
    } catch (error) {
      console.error("Error fetching all property images:", error);
      return [];
    }
  }

  // Debug method to check if properties exist
  async debugProperties() {
    try {
      const allProperties = await client.fetch(`*[_type == "property"]`);
      console.log("All properties:", allProperties);

      const activeProperties = await client.fetch(
        `*[_type == "property" && isActive == true]`
      );
      console.log("Active properties:", activeProperties);

      return { allProperties, activeProperties };
    } catch (error) {
      console.error("Error debugging properties:", error);
      return { allProperties: [], activeProperties: [] };
    }
  }

  // Get all categories
  async getCategories(): Promise<Category[]> {
    const query = `*[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      color,
      icon,
      seo,
      "postCount": count(*[_type == "post" && references(^._id) && publishedAt <= now()])
    }`;

    return await client.fetch<Category[]>(query);
  }

  // Get category by slug
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const query = `*[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      color,
      icon,
      seo,
      "postCount": count(*[_type == "post" && references(^._id) && publishedAt <= now()])
    }`;

    return await client.fetch<Category | null>(query, { slug });
  }

  // Get all locations
  async getLocations(): Promise<Location[]> {
    const query = `*[_type == "location"] | order(name asc) {
      _id,
      name,
      slug,
      state,
      zipCodes,
      description,
      medianHomePrice,
      pricePerSqFt,
      marketStatus,
      featuredImage,
      "postCount": count(*[_type == "post" && references(^._id) && publishedAt <= now()])
    }`;

    return await client.fetch<Location[]>(query);
  }

  // Get location by slug
  async getLocationBySlug(slug: string): Promise<Location | null> {
    const query = `*[_type == "location" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      state,
      zipCodes,
      description,
      medianHomePrice,
      pricePerSqFt,
      marketStatus,
      featuredImage,
      "postCount": count(*[_type == "post" && references(^._id) && publishedAt <= now()])
    }`;

    return await client.fetch<Location | null>(query, { slug });
  }

  // Get all property types
  async getPropertyTypes(): Promise<PropertyType[]> {
    const query = `*[_type == "propertyType"] | order(name asc) {
      _id,
      name,
      slug,
      description,
      averagePriceRange,
      "postCount": count(*[_type == "post" && references(^._id) && publishedAt <= now()])
    }`;

    return await client.fetch<PropertyType[]>(query);
  }

  // Get all authors
  async getAuthors(): Promise<Author[]> {
    const query = `*[_type == "author"] | order(name asc) {
      _id,
      name,
      slug,
      image,
      bio,
      title,
      licenseNumber,
      phone,
      email,
      servingAreas,
      "postCount": count(*[_type == "post" && references(^._id) && publishedAt <= now()])
    }`;

    return await client.fetch<Author[]>(query);
  }

  // Get author by slug
  async getAuthorBySlug(slug: string): Promise<Author | null> {
    const query = `*[_type == "author" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      image,
      bio,
      title,
      licenseNumber,
      phone,
      email,
      servingAreas,
      "postCount": count(*[_type == "post" && references(^._id) && publishedAt <= now()])
    }`;

    return await client.fetch<Author | null>(query, { slug });
  }

  // Get related posts (by categories and locations)
  async getRelatedPosts(
    postId: string,
    limit: number = 3
  ): Promise<PostPreview[]> {
    const query = `*[_type == "post" && _id != $postId && publishedAt <= now() && (
      count((categories[]->slug.current)[@ in *[_type == "post" && _id == $postId][0].categories[]->slug.current]) > 0 ||
      count((locations[]->slug.current)[@ in *[_type == "post" && _id == $postId][0].locations[]->slug.current]) > 0
    )] | order(publishedAt desc) [0...${limit}] {
      ${POST_PREVIEW_QUERY}
    }`;

    return await client.fetch<PostPreview[]>(query, { postId });
  }
  // Get all post slugs for static generation
  async getAllPostSlugs(): Promise<string[]> {
    const query = `*[_type == "post" && publishedAt <= now()].slug.current`;
    return await client.fetch<string[]>(query);
  }

  async getHeroImageBySlug(slug: string): Promise<HeroImage | null> {
    // UPDATED QUERY: Fetches cloudinaryPublicId and heightSettings
    const query = `
      *[_type == "heroImages" && pageSlug == $slug && isActive == true] | order(priority asc)[0] {
        _id,
        title,
        pageSlug,
        cloudinaryPublicId,
        altText,
        isActive,
        heightSettings,
        overlaySettings,
        heroText,
        priority
      }
    `;

    try {
      return await client.fetch<HeroImage | null>(query, { slug });
    } catch (error) {
      console.error(`Error fetching hero image for slug "${slug}":`, error);
      return null;
    }
  }
  // Get all hero images for a specific page (in case you need multiple options)
  async getHeroImagesByPage(pageSlug: string): Promise<HeroImage[]> {
    const query = `*[_type == "heroImages" && pageSlug == $pageSlug && isActive == true] | order(priority asc) {
      _id,
      title,
      pageSlug,
      cloudinaryUrl,
      altText,
      isActive,
      overlaySettings,
      heroText,
      priority
    }`;

    return await client.fetch<HeroImage[]>(query, { pageSlug });
  }

  // Get all active hero images
  async getAllHeroImages(): Promise<HeroImage[]> {
    const query = `*[_type == "heroImages" && isActive == true] | order(pageSlug asc, priority asc) {
      _id,
      title,
      pageSlug,
      cloudinaryUrl,
      altText,
      isActive,
      overlaySettings,
      heroText,
      priority
    }`;

    return await client.fetch<HeroImage[]>(query);
  }

  // Helper function to extract Cloudinary public ID from URL
  getCloudinaryPublicId(cloudinaryUrl: string): string {
    try {
      const url = new URL(cloudinaryUrl);
      const pathSegments = url.pathname.split("/");
      const uploadIndex = pathSegments.findIndex(
        (segment) => segment === "upload"
      );

      if (uploadIndex !== -1 && uploadIndex < pathSegments.length - 1) {
        // Join all segments after 'upload' and any transformation parameters
        const publicIdParts = pathSegments.slice(uploadIndex + 1);
        // Remove file extension if present
        const publicId = publicIdParts
          .join("/")
          .replace(/\.[^/.]+$/, "")
          .split("/")[1];
        console.log(`Extracted Cloudinary public ID: ${publicId}`);
        return publicId;
      }

      // Fallback: return the last segment without extension
      return pathSegments[pathSegments.length - 1].replace(/\.[^/.]+$/, "");
    } catch (error) {
      console.error("Error extracting Cloudinary public ID:", error);
      return cloudinaryUrl; // Return original URL as fallback
    }
  }

  // Helper function to get overlay CSS class based on settings

  // Helper function to get text position classes
  getTextPositionClasses(textPosition?: string): string {
    switch (textPosition) {
      case "center":
        return "items-center justify-center text-center";
      case "left":
        return "items-center justify-start text-left";
      case "right":
        return "items-center justify-end text-right";
      case "top-center":
        return "items-start justify-center text-center pt-20";
      case "bottom-center":
        return "items-end justify-center text-center pb-20";
      default:
        return "items-center justify-center text-center";
    }
  }
  // Get sitemap data
  async getSitemapData(): Promise<{
    posts: { slug: string; publishedAt: string; updatedAt?: string }[];
    categories: { slug: string }[];
    locations: { slug: string }[];
    authors: { slug: string }[];
  }> {
    const query = `{
      "posts": *[_type == "post" && publishedAt <= now()] {
        "slug": slug.current,
        publishedAt,
        updatedAt
      },
      "categories": *[_type == "category"] {
        "slug": slug.current
      },
      "locations": *[_type == "location"] {
        "slug": slug.current
      },
      "authors": *[_type == "author"] {
        "slug": slug.current
      }
    }`;

    return await client.fetch(query);
  }

  // Get blog statistics
  async getBlogStats(): Promise<{
    totalPosts: number;
    totalAuthors: number;
    totalCategories: number;
    totalLocations: number;
    recentPosts: number;
  }> {
    const query = `{
      "totalPosts": count(*[_type == "post" && publishedAt <= now()]),
      "totalAuthors": count(*[_type == "author"]),
      "totalCategories": count(*[_type == "category"]),
      "totalLocations": count(*[_type == "location"]),
      "recentPosts": count(*[_type == "post" && publishedAt <= now() && publishedAt > dateTime(now()) - 60*60*24*30])
    }`;

    return await client.fetch(query);
  }

  // Helper method to convert block content to plain text
  blockContentToPlainText(blocks: BlockContent): string {
    return blocks
      .filter((block) => block._type === "block")
      .map((block) => {
        if ("children" in block) {
          return block.children.map((child) => child.text).join("");
        }
        return "";
      })
      .join(" ");
  }

  // Helper method to get estimated reading time
  getReadingTime(blocks: BlockContent): number {
    const text = this.blockContentToPlainText(blocks);
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  // Helper method to get first image from block content
  getFirstImageFromBlocks(blocks: BlockContent): SanityImage | null {
    const imageBlock = blocks.find(
      (block) =>
        block._type === "image" ||
        (block._type === "propertyHighlight" && "image" in block && block.image)
    );

    if (imageBlock) {
      if (imageBlock._type === "image") {
        return imageBlock as SanityImage;
      }
      if (imageBlock._type === "propertyHighlight" && "image" in imageBlock) {
        return imageBlock.image as SanityImage;
      }
    }

    return null;
  }
}

// Export singleton instance
export const sanityService = new SanityService();

// Export client for direct access if needed
export { client };
export default sanityService;
