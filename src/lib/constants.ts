/* eslint-disable @typescript-eslint/no-explicit-any */
import { Variants } from "framer-motion";
import { Country, NavigationItem, NewsItem } from "./types";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPinterestP,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import { FaSnapchatGhost } from "react-icons/fa";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: "ABOUT", href: "/about" },
  { name: "PROPERTIES", href: "/property-detail" },
  // { name: "CAREERS", href: "/careers" },
  { name: "BLOGS", href: "/blogs" },
  { name: "MEDIA CENTER", href: "/media" },
  // Removed "Contact Us" as it's now a separate button
];

export const COMPANY_INFO = {
  name: "ALTAF BUILDER",
  tagline: "Redefining Luxury Living in Prime Locations",
  description:
    "Discover exceptional properties crafted with precision and designed for those who appreciate the finest details in life.",
  address: "Sheikh Zayed Road, Dubai, UAE",
  phone: "+971 4 123 4567",
  email: "info@altafbuilder.com",
  hours: "Sun - Thu: 9AM - 6PM",
};

export const quickLinks = [
  {
    name: "About Us",
    href: '/about'
  },
  {
    name: "Properties",
    href: '/property-detail'
  },
  {
    name: "Blogs",
    href: '/blogs'
  },
  {
    name: "Media Center",
    href: '/media'
  },
  {
    name: "Contact Us",
    href: '/contact'
  },
];

export const socialMediaLinks = [
  { name: "Facebook", href: "https://www.facebook.com/share/19NaPNBX9R/?mibextid=wwXIfr" },
  { name: "Instagram", href: "https://www.instagram.com/altafdevelopments?igsh=ZWFqd3Z2amZ0ZXJ2" },
  { name: "Tiktok", href: "https://www.tiktok.com/@altafdevelopments?_t=ZS-8xlu0gMnTfQ&_r=1" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/altaf-developments/" },
  { name: "Youtube", href: "https://www.youtube.com/@AltafDevelopments" },
  { name: "Twitter", href: "https://x.com/Altafdevelpmnts" },
  { name: "Pinterest", href: "https://www.pinterest.com/altafdevelopmentspk/" },
  { name: "Snapchat", href: "https://www.snapchat.com/add/altafdevelopmnt" },
];

export const contactInfo = {
  address: "Sheikh Zayed Road, Dubai, UAE",
  phone: "+971 4 123 4567",
  email: "info@altafbuilder.com",
  workingHours: "Sun - Thu: 9AM - 6PM",
};

export const footerLinks = {
  privacy: "#",
  terms: "#",
  cookies: "#",
};

export const companyInfo = {
  name: "ALTAF DEVELOPMENT",
  description:
    "Redefining luxury living with exceptional properties in prime locations. Experience the pinnacle of architectural excellence and craftsmanship.",
  copyright: "© 2025 ALTAF DEVELOPMENT. All rights reserved.",
};

export const latestNews: NewsItem[] = [
  {
    title: "New Project Launch",
    description: "The Oasis Towers breaks ground in Business Bay",
    date: "Dec 15, 2024",
  },
  {
    title: "Award Recognition",
    description: "Best Luxury Developer Award 2024",
    date: "Nov 28, 2024",
  },
  {
    title: "Sustainability Initiative",
    description: "Green building certification for all new projects",
    date: "Oct 20, 2024",
  },
];
export const socialMediaConfig = [
  {
    icon: FaFacebookF,
    href: "https://www.facebook.com/share/19NaPNBX9R/?mibextid=wwXIfr",
    name: "Facebook",
    color: "#1877F2",
    hoverColor: "#166FE5",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/altafdevelopments?igsh=ZWFqd3Z2amZ0ZXJ2",
    name: "Instagram",
    color: "#E4405F",
    hoverColor: "#D73650",
  },
  {
    icon: FaTiktok,
    href: "https://www.tiktok.com/@altafdevelopments?_t=ZS-8xlu0gMnTfQ&_r=1",
    name: "TikTok",
    color: "#000000",
    hoverColor: "#333333",
  },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/company/altaf-developments/",
    name: "LinkedIn",
    color: "#0A66C2",
    hoverColor: "#0958A5",
  },
  {
    icon: FaYoutube,
    href: "https://www.youtube.com/@AltafDevelopments",
    name: "YouTube",
    color: "#FF0000",
    hoverColor: "#E60000",
  },
  {
    icon: FaXTwitter,
    href: "https://x.com/Altafdevelpmnts",
    name: "Twitter",
    color: "#000000",
    hoverColor: "#333333",
  },
  {
    icon: FaPinterestP,
    href: "https://www.pinterest.com/altafdevelopmentspk/",
    name: "Pinterest",
    color: "#E60023",
    hoverColor: "#D50020",
  },
  {
    icon: FaSnapchatGhost,
    href: "https://www.snapchat.com/add/altafdevelopmnt",
    name: "Snapchat",
    color: "#FFFC00",
    hoverColor: "#F2EF00",
  },
];

// lib/constants/animations.ts

// ULTRA-OPTIMIZED Animation Constants for LCP < 2.5s
// Critical performance improvements for 4.44s → <2.5s LCP

// Performance detection utilities
// Balanced & High-Performance Animation System (Combined Approach)
// Prioritizes LCP, User Preference, and Maintainability while optimizing performance

// --- Global State and Configuration ---

// Cached animation configuration
// @/lib/constants.ts (Updated Combined Version)

// --- Import Framer Motion Types ---
// Stable, high-performance animation system
// Fixed version that won't break your code

// Simple performance detection without caching issues
const getAnimationConfig = () => {
  // Always respect user preference first
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return { shouldAnimate: false, mode: "disabled" as const };
  }

  // Only check for extreme low-end scenarios
  if (typeof navigator !== "undefined") {
    const connection = (navigator as any).connection;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;

    // Conservative thresholds - only disable for genuinely struggling devices
    if (hardwareConcurrency <= 1 || connection?.effectiveType === "slow-2g") {
      return { shouldAnimate: false, mode: "slow" as const };
    }

    // Fast devices get full animations
    if (hardwareConcurrency >= 8) {
      return { shouldAnimate: true, mode: "fast" as const };
    }
  }

  return { shouldAnimate: true, mode: "normal" as const };
};

// Simple shouldAnimate function - no caching to avoid issues
export const shouldAnimate = () => {
  try {
    return getAnimationConfig().shouldAnimate;
  } catch {
    return true; // Fallback to true if detection fails
  }
};

// Safe performance mode getter
export const getPerformanceMode = () => {
  try {
    return getAnimationConfig().mode;
  } catch {
    return "normal" as const;
  }
};

// Performance-aware animation creator
const createAnimation = (config: {
  initialHidden: Record<string, any>;
  visible: Record<string, any>;
  duration?: { fast: number; normal: number; slow: number };
  ease?: string;
}) => {
  const animate = shouldAnimate();
  if (!animate) {
    return {
      initial: config.visible,
      animate: config.visible,
      transition: { duration: 0 },
    };
  }

  // Performance-tiered durations
  const durations = config.duration || {
    fast: 0.15,
    normal: 0.2,
    slow: 0.25,
    disabled: 0,
  };
  const mode = getPerformanceMode();
  const duration = mode !== "disabled" ? durations[mode] : durations.normal;

  return {
    initial: config.initialHidden,
    animate: config.visible,
    transition: {
      duration,
      ease: config.ease || "easeOut",
      willChange: "transform, opacity",
    },
  };
};

// Performance-aware hover creator
const createHoverAnimation = (
  hoverState: Record<string, any>,
  tapState?: Record<string, any>
) => {
  const animate = shouldAnimate();
  const mode = getPerformanceMode();

  if (!animate || mode === "slow") {
    return {};
  }

  const duration = mode === "fast" ? 0.1 : 0.15;

  return {
    whileHover: hoverState,
    ...(tapState && { whileTap: tapState }),
    transition: { duration, ease: "easeOut" },
  };
};

// Base animation states
const baseStates = {
  visible: { opacity: 1, y: 0, x: 0, scale: 1 },
  hiddenUp: { opacity: 0, y: 15 },
  hiddenLeft: { opacity: 0, x: -15 },
  hiddenRight: { opacity: 0, x: 15 },
  hiddenDown: { opacity: 0, y: 20 },
  microHidden: { opacity: 0, y: 8 },
};

// Core animations - stable exports
export const fadeInUp = createAnimation({
  initialHidden: baseStates.hiddenUp,
  visible: baseStates.visible,
});

export const fadeInLeft = createAnimation({
  initialHidden: baseStates.hiddenLeft,
  visible: baseStates.visible,
});

export const fadeInRight = createAnimation({
  initialHidden: baseStates.hiddenRight,
  visible: baseStates.visible,
});

export const slideInFromBottom = createAnimation({
  initialHidden: baseStates.hiddenDown,
  visible: baseStates.visible,
  duration: { fast: 0.2, normal: 0.25, slow: 0.3 },
});

export const microSlide = createAnimation({
  initialHidden: baseStates.microHidden,
  visible: baseStates.visible,
  duration: { fast: 0.12, normal: 0.15, slow: 0.18 },
});

// Hover animations
export const scaleOnHover = createHoverAnimation(
  { scale: 1.02 },
  { scale: 0.98 }
);

export const cardHover = createHoverAnimation({ y: -4, scale: 1.01 });

export const rotateOnHover = createHoverAnimation({ rotate: 2 });

// Quick fade for critical path
export const quickFade = {
  initial: { opacity: shouldAnimate() ? 0 : 1 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: shouldAnimate() ? 0.1 : 0 },
};

// Stagger container
export const staggerContainer = (() => {
  const animate = shouldAnimate();
  const mode = getPerformanceMode();

  if (!animate) {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      transition: { duration: 0 },
    };
  }

  const staggerDelay = mode === "fast" ? 0.02 : mode === "slow" ? 0.05 : 0.03;

  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: 0.15,
      staggerChildren: staggerDelay,
      ease: "easeOut",
    },
  };
})();

// Pulse animation
export const pulseAnimation = (() => {
  const animate = shouldAnimate();
  const mode = getPerformanceMode();

  if (!animate || mode === "slow") {
    return {
      initial: { scale: 1 },
      animate: { scale: 1 },
      transition: { duration: 0 },
    };
  }

  return {
    initial: { scale: 1 },
    animate: { scale: [1, 1.01, 1] },
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
      willChange: "transform",
    },
  };
})();

// Batch stagger for lists
// Fixed batchStagger export
// Fixed batchStagger export
export const batchStagger = (() => {
  const animate = shouldAnimate();
  const mode = getPerformanceMode();
  
  if (!animate) {
    return {
      container: {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        transition: { duration: 0 }
      },
      item: {
        initial: baseStates.visible,
        animate: baseStates.visible,
        transition: { duration: 0 }
      }
    };
  }

  const staggerDelay = mode === "fast" ? 0.01 : 0.02;
  const itemDuration = mode === "fast" ? 0.12 : 0.15;

  return {
    container: {
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.02,
        }
      },
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.02,
      }
    },
    item: {
      initial: { opacity: 0, y: 10 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: itemDuration,
          willChange: "transform, opacity",
        }
      },
      transition: {
        duration: itemDuration,
        willChange: "transform, opacity",
      }
    }
  };
})();

// Alternative: Individual variants for better type safety
export const batchStaggerContainer = (() => {
  const animate = shouldAnimate();
  const mode = getPerformanceMode();
  
  if (!animate) {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      transition: { duration: 0 }
    };
  }

  const staggerDelay = mode === "fast" ? 0.01 : 0.02;

  return {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.02,
      }
    },
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.02,
    }
  };
})();

export const batchStaggerItem = (() => {
  const animate = shouldAnimate();
  const mode = getPerformanceMode();
  
  if (!animate) {
    return {
      initial: baseStates.visible,
      animate: baseStates.visible,
      transition: { duration: 0 }
    };
  }

  const itemDuration = mode === "fast" ? 0.12 : 0.15;

  return {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: itemDuration,
        willChange: "transform, opacity",
      }
    },
    transition: {
      duration: itemDuration,
      willChange: "transform, opacity",
    }
  };
})();
// Viewport settings
export const viewportOnce = {
  once: true,
  margin: "0px",
  amount: 0.1,
};

export const viewportDefault = {
  once: true,
  amount: 0.05,
};

export const viewportMobile = {
  once: true,
  margin: "0px",
  amount: 0.05,
};

// Easing presets
export const easingPresets = {
  instant: "linear" as const,
  fast: [0.4, 0, 0.2, 1] as const,
  smooth: [0.25, 0.1, 0.25, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  elastic: [0.175, 0.885, 0.32, 1.275] as const,
};

// Delay utilities
export const delays = {
  instant: 0,
  short: 0.02,
  medium: 0.05,
  long: 0.1,
  stagger: (index: number) => {
    const animate = shouldAnimate();
    const mode = getPerformanceMode();
    if (!animate) return 0;
    const baseDelay = mode === "fast" ? 0.015 : 0.025;
    return index * baseDelay;
  },
};

// Utility functions - safe versions
export const getPerformanceVariant = (baseVariant: any) => {
  const animate = shouldAnimate();
  if (!animate) {
    return {
      initial: baseVariant.animate || baseStates.visible,
      animate: baseVariant.animate || baseStates.visible,
      transition: { duration: 0 },
    };
  }
  return baseVariant;
};

export const deferredAnimation = (animation: any) => {
  try {
    if (typeof window !== "undefined" && document.readyState !== "complete") {
      return {
        initial: animation.animate || baseStates.visible,
        animate: animation.animate || baseStates.visible,
        transition: { duration: 0 },
      };
    }
    return animation;
  } catch {
    return animation; // Fallback to original animation
  }
};

export const createLazyAnimation = (animation: any) => {
  const animate = shouldAnimate();
  if (typeof window === "undefined" || !animate) {
    return {
      initial: animation.animate || baseStates.visible,
      animate: animation.animate || baseStates.visible,
      transition: { duration: 0 },
    };
  }

  return {
    ...animation,
    viewport: { once: true, amount: 0.1 },
  };
};

// Performance monitoring (simplified and safe)
export const animationMetrics = {
  totalAnimations: 0,
  skippedAnimations: 0,

  track(name: string, wasSkipped: boolean) {
    this.totalAnimations++;
    if (wasSkipped) this.skippedAnimations++;

    // Occasional logging (safe)
    if (this.totalAnimations > 0 && this.totalAnimations % 20 === 0) {
      console.log(
        `Animation Performance: ${this.skippedAnimations}/${this.totalAnimations} optimized`
      );
    }
  },
};

// Backward compatibility exports
export const optimizedAnimations = {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  slideInFromBottom,
  microSlide,
};

// Performance mode constants
export const PERFORMANCE_MODE = {
  FAST: "fast",
  NORMAL: "normal",
  SLOW: "slow",
  DISABLED: "disabled",
} as const;

// Type definitions for better TypeScript support
export type PerformanceMode =
  (typeof PERFORMANCE_MODE)[keyof typeof PERFORMANCE_MODE];
export type AnimationVariant = Variants;

// No caching reset needed - this version doesn't cache
export const resetAnimationConfig = () => {
  // No-op in this stable version
};
// Simple slideshow fade animation with continuous scale
export const simpleFadeSlide = {
  initial: { opacity: 0, scale: 1 },
  animate: { 
    opacity: 1, 
    scale: 1.1,
    transition: {
      opacity: { duration: 0.8, ease: "easeInOut" },
      scale: { duration: 3, ease: "easeInOut" } // Slow scale up during display
    }
  },
  exit: { 
    opacity: 0, 
    scale: 1,
    transition: {
      opacity: { duration: 0.8, ease: "easeInOut" },
      scale: { duration: 3, ease: "easeInOut" } // Slow scale down during exit
    }
  }
};



// constants/countries.ts
export const COUNTRIES: Country[] = [
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
];

export const APARTMENT_TYPES = [
  { value: 'one-bed', label: 'One Bedroom Apartment' },
  { value: 'two-bed', label: 'Two Bedroom Apartment' },
] as const;

export const APARTMENT_SIZES = [
  { value: 'compact', label: 'Compact (450-550 sq ft)', description: 'Perfect for individuals' },
  { value: 'standard', label: 'Standard (550-750 sq ft)', description: 'Ideal for couples' },
  { value: 'premium', label: 'Premium (750-950 sq ft)', description: 'Spacious luxury living' },
] as const;