// common/components/HeroBackground.tsx
"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CldImage } from "next-cloudinary";

interface HeroBackgroundProps {
  type?: "video" | "image";
  src?: string; // This will be the public ID for images, or a video source
  fallbackImage?: string;
  overlay?: "light" | "medium" | "dark" | "gradient" | "none";
  className?: string;
  altText?: string;
  parallaxSpeed?: number;
  customOverlay?: {
    color?: string;
    opacity?: number;
  };
  videoOptimization?: {
    quality?: "auto" | "auto:low" | "auto:good" | "auto:best" | number;
    format?: "auto" | "mp4" | "webm";
    width?: number;
    height?: number;
    bitrate?: string;
    fps?: number;
  };
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  type = "image",
  src,
  fallbackImage,
  overlay = "medium",
  className = "absolute inset-0 w-full h-full",
  altText = "Hero background image",
  parallaxSpeed = 0.3,
  customOverlay,
  videoOptimization = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  const y = useTransform(smoothY, [0, 1], [0, -(100 * parallaxSpeed)]);
  const scale = useTransform(
    smoothY,
    [0, 1],
    [1 + parallaxSpeed * 0.2, 1 + parallaxSpeed * 0.3]
  );

  const getOverlayClass = () => {
    // Check for custom overlay first
    if (customOverlay) {
      return ""; // Will use inline styles instead
    }
    
    // Default overlay classes
    switch (overlay) {
      case "light":
        return "bg-black/20";
      case "medium":
        return "bg-black/40";
      case "dark":
        return "bg-black/70";
      case "gradient":
        return "bg-gradient-to-b from-black/20 via-black/30 to-black/40";
      case "none":
        return "";
      default:
        return "bg-black/40";
    }
  };

  const getCustomOverlayStyle = (): React.CSSProperties | undefined => {
    if (customOverlay) {
      const { color = "#000000", opacity = 0.5 } = customOverlay;
      return {
        backgroundColor: `${color}${Math.round(opacity * 255)
          .toString(16)
          .padStart(2, "0")}`,
      };
    }
    return undefined;
  };

  // Return null if there is no source for either image or video
  if (!src) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`${className} overflow-hidden bg-gray-900`}
      style={{ backgroundColor: "#1f2937" }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          y,
          scale,
        }}
      >
        <ParallaxContent
          type={type}
          publicId={src}
          altText={altText}
          fallbackImage={fallbackImage}
          videoOptimization={videoOptimization}
        />
      </motion.div>

      {overlay !== "none" && (
        <div
          className={`absolute inset-0 z-10 ${getOverlayClass()}`}
          style={getCustomOverlayStyle()}
        />
      )}
    </div>
  );
};

// ParallaxContent component for rendering image or video content
const ParallaxContent: React.FC<{
  type: "video" | "image";
  publicId: string;
  altText: string;
  fallbackImage?: string;
  videoOptimization: HeroBackgroundProps["videoOptimization"];
}> = ({ type, publicId, altText, fallbackImage, videoOptimization }) => {
  const buildVideoUrl = (width: number = 1920) => {
    const { quality = "auto:good", format = "auto" } = videoOptimization ?? {};
    const transformations = `q_${quality},f_${format},w_${width},c_fill,ac_none`;
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${transformations}/${publicId}`;
  };

  const buildPosterUrl = (width: number = 1920, height: number = 1080) => {
    return fallbackImage
      ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_${width},h_${height},f_auto,q_auto/${fallbackImage}`
      : undefined;
  };

  // Get responsive dimensions based on screen size
  const getResponsiveDimensions = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width <= 640) return { width: 640, height: 360 };
      if (width <= 768) return { width: 768, height: 432 };
      if (width <= 1024) return { width: 1024, height: 576 };
      if (width <= 1536) return { width: 1920, height: 1080 };
      return { width: 2560, height: 1440 };
    }
    return { width: 1920, height: 1080 };
  };

  return (
    <>
      {type === "video" ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              minWidth: '100%',
              minHeight: '100%',
            }}
            poster={buildPosterUrl()}
          >
            {/* Multiple source elements for different screen sizes */}
            <source 
              src={buildVideoUrl(2560)} 
              type="video/mp4" 
              media="(min-width: 1536px)" 
            />
            <source 
              src={buildVideoUrl(1920)} 
              type="video/mp4" 
              media="(min-width: 1024px)" 
            />
            <source 
              src={buildVideoUrl(1024)} 
              type="video/mp4" 
              media="(min-width: 768px)" 
            />
            <source 
              src={buildVideoUrl(640)} 
              type="video/mp4" 
              media="(max-width: 767px)" 
            />
            {/* Fallback source */}
            <source src={buildVideoUrl(1920)} type="video/mp4" />
          </video>
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <CldImage
            src={publicId}
            alt={altText}
            width={getResponsiveDimensions().width}
            height={getResponsiveDimensions().height}
            sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1536px) 1920px, 2560px"
            priority
            gravity="center"
            quality="auto:good"
            className="w-full h-full object-cover"
            style={{
              minWidth: '100%',
              minHeight: '100%',
            }}
            crop="fill"
          />
        </div>
      )}
    </>
  );
};