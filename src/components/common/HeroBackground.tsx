// common/components/HeroBackground.tsx
"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CldImage } from "next-cloudinary";

interface HeroBackgroundProps {
  type?: "video" | "image";
  src?: string;
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
    quality?: "auto" | "auto:low" | "auto:good" | "auto:best" | "auto:eco";
    streaming?: boolean; // Use adaptive bitrate streaming for long videos
  };
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  type = "image",
  src,
  fallbackImage,
  overlay = "medium",
  className = "absolute inset-0 w-full h-full",
  altText = "Hero background image",
  parallaxSpeed = 0.8,
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
  const scale = useTransform(smoothY, [0, 1], [1, 1]);

  const getOverlayClass = () => {
    if (customOverlay) {
      return "";
    }
    
    switch (overlay) {
      case "light":
        return "bg-black/10";
      case "medium":
        return "bg-black/40";
      case "dark":
        return "bg-black/70";
      case "gradient":
        return "bg-gradient-to-b from-black/20 via-black/30 to-black/40";
      case "none":
        return "";
      default:
        return "bg-black/25";
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

  if (!src) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`${className} overflow-hidden bg-gray-900`}
      style={{ backgroundColor: 'var(--background, #111827)' }}
    >
      <motion.div
        className="absolute w-full will-change-transform"
        style={{
          y,
          scale,
          height: `calc(100% + ${100 * parallaxSpeed}px)`,
          top: 0,
          left: 0,
          right: 0,
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

const ParallaxContent: React.FC<{
  type: "video" | "image";
  publicId: string;
  altText: string;
  fallbackImage?: string;
  videoOptimization: HeroBackgroundProps["videoOptimization"];
}> = ({ type, publicId, altText, fallbackImage, videoOptimization }) => {
  
  const buildOptimizedVideoUrl = () => {
    const { quality = "auto:good", streaming = false } = videoOptimization ?? {};
    
    // For streaming (long videos), use adaptive bitrate
    if (streaming) {
      // Use m3u8 format for HLS adaptive streaming
      return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/f_auto,q_${quality},vc_auto/${publicId}.m3u8`;
    }
    
    // For progressive download (short videos like hero backgrounds)
    // Let Cloudinary handle all optimizations automatically
    const transformations = [
      `f_auto`,        // Auto format (WebM/MP4/AV1 based on browser)
      `q_${quality}`,  // Auto quality with content-aware compression
      `vc_auto`        // Auto codec selection
    ].join(',');
    
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${transformations}/${publicId}`;
  };

  const buildPosterUrl = () => {
    // Use Cloudinary's automatic optimization for poster image
    const posterSrc = fallbackImage || publicId;
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto:good,c_fill,g_center,ar_16:9/${posterSrc}`;
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
            {/* Single optimized source - Cloudinary handles all device/browser optimization */}
            <source 
              src={buildOptimizedVideoUrl()} 
              type={videoOptimization?.streaming ? "application/vnd.apple.mpegurl" : "video/mp4"}
            />
            {/* Fallback message for browsers that don't support video */}
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <CldImage
            src={publicId}
            alt={altText}
            fill
            sizes="100vw"
            priority
            crop="fill"
            gravity="center"
            format="auto"
            quality="auto:good"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </>
  );
};