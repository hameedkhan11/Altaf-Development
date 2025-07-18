export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface SanityReference {
  _type: 'reference';
  _ref: string;
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  crop?: {
    _type: 'sanity.imageCrop';
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  hotspot?: {
    _type: 'sanity.imageHotspot';
    height: number;
    width: number;
    x: number;
    y: number;
  };
  alt?: string;
  caption?: string;
}

// Block Content Types
export interface BlockText {
  _type: 'block';
  _key: string;
  style: 'normal' | 'h2' | 'h3' | 'h4' | 'blockquote';
  children: Array<{
    _type: 'span';
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _type: 'link' | 'internalLink';
    _key: string;
    href?: string;
    blank?: boolean;
    reference?: SanityReference;
  }>;
  listItem?: 'bullet' | 'number';
  level?: number;
}

export interface PropertyHighlight {
  _type: 'propertyHighlight';
  _key: string;
  title: string;
  price?: string;
  location?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  image?: SanityImage;
}

export interface CTABlock {
  _type: 'ctaBlock';
  _key: string;
  headline?: string;
  text?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export type BlockContent = Array<
  | BlockText
  | (SanityImage & { _key: string })
  | PropertyHighlight
  | CTABlock
>;

// Author Schema
export interface Author extends SanityDocument {
  _type: 'author';
  name: string;
  slug: SanitySlug;
  image?: SanityImage;
  bio?: string;
  title?: string;
  licenseNumber?: string;
  phone?: string;
  email?: string;
  servingAreas?: string[];
}

// Category Schema
export interface CategorySEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface Category extends SanityDocument {
  _type: 'category';
  title: string;
  slug: SanitySlug;
  description?: string;
  color?: '#FFD700' | '#4A90E2' | '#50C878' | '#DC143C' | '#708090';
  icon?: SanityImage;
  seo?: CategorySEO;
}

// Location Schema
export interface Location extends SanityDocument {
  _type: 'location';
  name: string;
  slug: SanitySlug;
  state: string;
  zipCodes?: string[];
  description?: string;
  medianHomePrice?: string;
  pricePerSqFt?: string;
  marketStatus?: 'sellers' | 'buyers' | 'balanced';
  featuredImage?: SanityImage;
}

// Property Type Schema
export interface PropertyType extends SanityDocument {
  _type: 'propertyType';
  name: string;
  slug: SanitySlug;
  description?: string;
  averagePriceRange?: string;
}

// Post Schema
export interface Post extends SanityDocument {
  _type: 'post';
  title: string;
  slug: SanitySlug;
  excerpt: string;
  featuredImage: SanityImage;
  author?: SanityReference;
  publishedAt: string;
  updatedAt?: string;
  categories?: SanityReference[];
  locations?: SanityReference[];
  propertyTypes?: SanityReference[];
  targetKeywords: string[];
  body: BlockContent;
  featured?: boolean;
  readingTime?: number;
  relatedPosts?: SanityReference[];
  seoTitle?: string;
  focusKeyword: string;
  ogImage?: SanityImage;
  canonicalUrl?: string;
  noIndex?: boolean;
}

// Populated/Expanded Types (for when references are resolved)
export interface PopulatedPost extends Omit<Post, 'author' | 'categories' | 'locations' | 'propertyTypes' | 'relatedPosts'> {
  author?: Author;
  categories?: Category[];
  locations?: Location[];
  propertyTypes?: PropertyType[];
  relatedPosts?: Post[];
}

// Query result types
export interface PostPreview {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt: string;
  featuredImage: SanityImage;
  publishedAt: string;
  author: {
    name: string;
  };
  categories: {
    title: string;
    slug: SanitySlug;
  }[];
}

export interface AuthorPreview {
  _id: string;
  name: string;
  slug: SanitySlug;
  title?: string;
  image?: SanityImage;
}

export interface CategoryPreview {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
  color?: string;
}

export interface LocationPreview {
  _id: string;
  name: string;
  slug: SanitySlug;
  state: string;
  medianHomePrice?: string;
}

// Union types for references
export type DocumentReference = Author | Category | Location | PropertyType | Post;

// Search and filter types
export interface PostFilters {
  category?: string;
  location?: string;
  propertyType?: string;
  author?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  posts: PostPreview[];
  total: number;
  hasMore: boolean;
}

// Form types for content creation
export interface CreatePostData {
  title: string;
  excerpt: string;
  body: BlockContent;
  featuredImage: File | string;
  authorId: string;
  categoryIds: string[];
  locationIds?: string[];
  propertyTypeIds?: string[];
  targetKeywords: string[];
  focusKeyword: string;
  featured?: boolean;
  seoTitle?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface CreateAuthorData {
  name: string;
  bio?: string;
  title?: string;
  licenseNumber?: string;
  phone?: string;
  email?: string;
  servingAreas?: string[];
  image?: File | string;
}

export interface CreateCategoryData {
  title: string;
  description?: string;
  color?: string;
  icon?: File | string;
  seo?: CategorySEO;
}

export interface CreateLocationData {
  name: string;
  state: string;
  zipCodes?: string[];
  description?: string;
  medianHomePrice?: string;
  pricePerSqFt?: string;
  marketStatus?: 'sellers' | 'buyers' | 'balanced';
  featuredImage?: File | string;
}

export interface CreatePropertyTypeData {
  name: string;
  description?: string;
  averagePriceRange?: string;
}

// Utility types
export type SanityDocumentType = 'post' | 'author' | 'category' | 'location' | 'propertyType';

export interface SanityDocumentMap {
  post: Post;
  author: Author;
  category: Category;
  location: Location;
  propertyType: PropertyType;
}

// GROQ query builder helpers with proper recursive typing
export type GroqProjection<T> = {
  [K in keyof T]?: T[K] extends SanityReference 
    ? boolean | GroqProjection<DocumentReference>
    : T[K] extends SanityReference[]
    ? boolean | GroqProjection<DocumentReference>
    : boolean;
};

// Content block helpers
export interface BlockContentHelpers {
  toPlainText: (blocks: BlockContent) => string;
  getReadingTime: (blocks: BlockContent) => number;
  getFirstImage: (blocks: BlockContent) => SanityImage | null;
  hasPropertyHighlights: (blocks: BlockContent) => boolean;
  getPropertyHighlights: (blocks: BlockContent) => PropertyHighlight[];
  getCTABlocks: (blocks: BlockContent) => CTABlock[];
}

// Validation types
export interface ValidationRule {
  required: () => ValidationRule;
  max: (limit: number) => ValidationRule;
  min: (limit: number) => ValidationRule;
  email: () => ValidationRule;
  url: () => ValidationRule;
}