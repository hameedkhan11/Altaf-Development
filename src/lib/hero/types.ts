// Add this to your lib/types.ts file or wherever HeroProps is defined

export interface HeroImage {
  _id: string;
  title: string;
  pageSlug: string;
  cloudinaryUrl: string;
  altText: string;
  isActive: boolean;
  overlaySettings?: {
    hasOverlay: boolean;
    overlayColor?: 'black' | 'white' | 'darkblue' | 'custom';
    customOverlayColor?: string;
    overlayOpacity?: number;
  };
  heroText?: {
    hasText: boolean;
    headline?: string;
    subheadline?: string;
    textPosition?: 'center' | 'left' | 'right' | 'top-center' | 'bottom-center';
  };
  priority: number;
}
export interface HeroProps {
  isHomePage?: boolean;
  title?: string;
  subtitle?: string;
  backgroundType?: "video" | "image";
  backgroundSrc?: string;
  fallbackImage?: string;
  height?: "screen" | "half" | "auto";
  overlay?: "light" | "medium" | "dark" | "gradient" | "none";
  contentAlignment?: "left" | "center" | "right";
  breadcrumbs?: Array<{
    label: string;
    href: string;
  }>;
  showScrollIndicator?: boolean;
  enableAnimations?: boolean;
  enableParallax?: boolean;
  parallaxSpeed?: number;
  ariaLabel?: string;
  heroImage?: HeroImage | null; // New prop for Sanity hero image
}

export interface HeroBackgroundProps {
  type: "video" | "image";
  src: string;
  fallbackImage?: string;
  overlay?: "light" | "medium" | "dark" | "gradient" | "none";
  className?: string;
  enableParallax?: boolean;
  parallaxSpeed?: number;
  videoOptimization?: {
    quality?: "auto" | "auto:low" | "auto:good" | "auto:best" | number;
    format?: "auto" | "mp4" | "webm";
    width?: number;
    height?: number;
    bitrate?: string;
    fps?: number;
  };
  // New props for Sanity hero image support
  heroImage?: {
    cloudinaryUrl: string;
    altText: string;
    overlaySettings?: {
      hasOverlay: boolean;
      overlayColor: string;
      customOverlayColor?: string;
      overlayOpacity: number;
    };
  };
}
