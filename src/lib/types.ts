import type { LucideIcon } from "lucide-react"
import { Author, Category, Post, PropertyType } from "./sanity/sanity"

export interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  image: string
}

export interface Project {
  id: number
  price: string
  bedrooms: number
  bathrooms: number
  title: string
  image: string
  
}

export interface NavigationItem {
  name: string
  href: string
}

export interface Features {
  icon: LucideIcon
  title: string
  desc: string
}

export interface NewsItem {
  title: string
  description: string
  date: string
}

// lib/types/index.ts

// export interface Property {
//   id: number;
//   image: string;
//   title: string;
//   location: string;
//   beds: number;
//   baths: number;
//   sqft: string;
//   price: string;
//   badge: string;
//   badgeColor: string;
//   description?: string;
//   amenities?: string[];
//   yearBuilt?: number;
//   propertyType?: 'apartment' | 'villa' | 'townhouse' | 'penthouse';
//   status?: 'available' | 'sold' | 'reserved' | 'launching_soon';
//   featured?: boolean;
//   coordinates?: [number, number];
//   agent?: {
//     name: string;
//     phone: string;
//     email: string;
//   }
// }

export interface PropertyCardProps {
  property: Property;
  index: number;
  variant?: 'default' | 'compact' | 'featured';
  showStats?: boolean;
}

export interface PropertySectionProps {
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  maxItems?: number;
  variant?: 'grid' | 'carousel' | 'list';
}

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  stagger?: number;
}

export interface BadgeConfig {
  text: string;
  color: string;
  variant?: 'solid' | 'outline' | 'soft';
}

export interface PropertyFilters {
  priceRange?: [number, number];
  bedrooms?: number[];
  bathrooms?: number[];
  location?: string[];
  propertyType?: string[];
  status?: string[];
}

export interface PropertyStats {
  totalProperties: number;
  soldProperties: number;
  availableProperties: number;
  averagePrice: number;
  topLocation: string;
}

// API Response types
export interface PropertyResponse {
  data: Property[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface PropertyDetailsResponse {
  property: Property;
  similarProperties: Property[];
  agent: {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
}

// Form types
export interface PropertyInquiryForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId: string;
  interestedIn: 'buying' | 'renting' | 'investment';
}

export interface PropertySearchForm {
  location: string;
  propertyType: string;
  bedrooms: number;
  minPrice: number;
  maxPrice: number;
  sortBy: 'price_asc' | 'price_desc' | 'date_new' | 'date_old';
}

export interface Agent {
  name: string;
  phone: string;
  email: string;
}

export interface Property {
  id: number;
  title: string;
  location?: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  coordinates?: [number, number]; // [lat, lng] for Leaflet
  badge: string;
  agent: Agent;
}

export interface MapLayer {
  name: string;
  url: string;
  attribution: string;
}

export interface MapLayers {
  [key: string]: MapLayer;
}

export interface Delays {
  small: number;
  medium: number;
  large: number;
}

export interface ViewportOnce {
  once: boolean;
}

// types/blog.ts
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: 'NEWS' | 'BLOG';
  slug: string;
  readTime?: string;
}

export interface BlogSectionProps {
  posts: BlogPost[];
  title?: string;
  showSeeAll?: boolean;
}

export interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'large' | 'small';
}

export interface CEOMessageProps {
  title?: string;
  content: string[];
  ceoName: string;
  ceoTitle?: string;
  ceoImage: string;
}

// types/amenities.ts
export interface AmenityData {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export interface AmenitiesData {
  [key: string]: AmenityData;
}

// types/form.ts
export interface RegisterInterestFormData {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  apartmentType: 'one-bed' | 'two-bed';
  apartmentSize: 'compact' | 'standard' | 'premium';
  message?: string;
}

export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

// common/types/hero.types.ts
export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface HeroProps {
  // Content
  title?: string;
  subtitle?: string;
  
  // Background
  backgroundType: 'video' | 'image';
  backgroundSrc: string;
  fallbackImage?: string;
  
  // Layout & Styling
  height?: 'screen' | 'half' | 'three-quarter' | 'custom' | 'auto';
  overlay?: 'light' | 'medium' | 'dark' | 'gradient' | 'none';
  contentAlignment?: 'left' | 'center' | 'right';
  
  // Navigation
  breadcrumbs?: BreadcrumbItem[];
  showScrollIndicator?: boolean;
  
  // Animation
  enableAnimations?: boolean;
  
  // Custom content
  children?: React.ReactNode;
  
  // Accessibility
  ariaLabel?: string;
}

// Property detail interface - for detailed property information
export interface PropertyDetail {
  name: string;
  size: number;
  rate: number;
  totalPrice: string;
  downPayment: number;
  quarterlyInstallment: number;
  bedrooms: number;
  bathrooms: number;
  type: string;
}

// Project card interface - for project listings
export interface Project {
  id: number;
  title: string;
  image: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  propertyType: PropertyKey;
}

// Other existing interfaces
export interface Delays {
  small: number;
  medium: number;
  large: number;
}

export interface ViewportOnce {
  once: boolean;
}

export interface PropertySection {
  id: string;
  title: string;
  image: string;
  alt: string;
}

export type PropertyKey = "1bed" | "2bed";

export interface PropertyImage {
  cloudinaryUrl: string;
  alt?: string;
  isFeatured: boolean;
}

// For individual property data from Sanity (used in ProjectsSection)
export interface PropertyData {
  _id: string;
  title: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  location?: string;
  propertyType: "1bed" | "2bed";
  featuredImage: string;
  allImages: string[];
}

// For detailed property information (used in PropertyDetailInfo)
export interface PropertyDetail {
  _id?: string;
  name: string;
  type: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  rate: number;
  totalPrice: string;
  downPayment: number;
  quarterlyInstallment: number;
  location?: string;
  propertyType?: "1bed" | "2bed";
  featuredImage?: string;
  allImages?: string[];
}

// For projects/listings data
export interface Project {
  id: number;
  title: string;
  image: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  propertyType: "1bed" | "2bed";
}

// Type for the properties object structure
export type PropertiesData = Record<PropertyKey, PropertyDetail>;

export interface PropertyDetailInfoProps {
  property: PropertyDetail;
}

export interface ProjectCardProps {
  image: string;
  title: string;
  price?: string;
  bedrooms?: number;
  bathrooms?: number;
  location?: string;
  propertyType?: "1bed" | "2bed";
}

export interface ImageGalleryProps {
  propertyType: "1bed" | "2bed";
}
export interface PopulatedPost extends Omit<Post, 'author' | 'categories' | 'locations' | 'propertyTypes'> {
  author: Author; // Populated author instead of reference
  categories: Category[]; // Populated categories
  locations?: Location[]; // Populated locations
  propertyTypes?: PropertyType[]; // Populated property types
}