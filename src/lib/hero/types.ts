// lib/types.ts

// The main type definition for the Sanity 'heroImages' document
export interface HeroImage {
  _id: string;
  title: string;
  pageSlug: string;
  cloudinaryPublicId: string; // CHANGED from cloudinaryUrl
  altText: string;
  isActive: boolean;
  priority: number;
  
  heightSettings?: {
    height: 'screen' | 'half' | 'three-quarter' | 'auto' | 'custom';
    customHeight?: number;
    minHeight?: number;
  };
  
  overlaySettings?: {
    hasOverlay: boolean;
    overlayType?: 'solid' | 'gradient' | 'none';
    overlayColor?: 'black' | 'white' | 'darkblue' | 'darkgray' | 'custom';
    customOverlayColor?: string;
    gradientSettings?: {
      direction: 'to-b' | 'to-r' | 'to-br' | 'to-bl';
      startColor: string;
      endColor: string;
    };
    overlayOpacity?: number;
  };
  
  heroText?: {
    hasText: boolean;
    headline?: string;
    subheadline?: string;
    textPosition?: 'center' | 'left' | 'right' | 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right';
    textColor?: 'white' | 'black' | 'gray' | 'custom';
    customTextColor?: string;
    fontSize?: {
      mobile: string;
      desktop: string;
    };
  };
  
  breadcrumbSettings?: {
    showBreadcrumbs: boolean;
    breadcrumbPosition?: 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-left' | 'top-right';
  };
  
  animationSettings?: {
    showScrollIndicator?: boolean;
    animationDelay?: number;
  };
}

// Props for the main Hero component
export interface HeroProps {
  isHomePage?: boolean;
  title?: string;
  subtitle?: string;
  backgroundType?: "video" | "image";
  backgroundSrc?: string; // This is the fallback publicId
  fallbackImage?: string;
  height?: "screen" | "half" | "auto" | "three-quarter" | "custom";
  overlay?: "light" | "medium" | "dark" | "gradient" | "none";
  contentAlignment?: "left" | "center" | "right";
  breadcrumbs?: Array<{
    label: string;
    href: string;
  }>;
  showScrollIndicator?: boolean;
  ariaLabel?: string;
  heroImage?: HeroImage | null; // Uses the updated HeroImage type
}

// Props for the internal HeroBackground component
export interface HeroBackgroundProps {
  type?: "video" | "image";
  src?: string; // Can be a video source or an image publicId
  fallbackImage?: string;
  overlay?: "light" | "medium" | "dark" | "gradient" | "none";
  className?: string;
  videoOptimization?: {
    quality?: "auto" | "auto:low" | "auto:good" | "auto:best" | number;
    format?: "auto" | "mp4" | "webm";
    width?: number;
    height?: number;
    bitrate?: string;
    fps?: number;
  };
  // The full heroImage object is passed for its settings (overlay, alt text etc)
  heroImage?: HeroImage | null;
}