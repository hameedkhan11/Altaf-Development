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
        className="absolute w-full h-full will-change-transform"
        style={{
          y,
          scale,
          top: `-${parallaxSpeed * 20}%`,
          left: "-10%",
          width: "120%",
          height: `${120 + parallaxSpeed * 40}%`,
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
  const buildVideoUrl = () => {
    const { quality = "auto:good", format = "auto" } = videoOptimization ?? {};
    const transformations = `q_${quality},f_${format},w_3840,h_2160,c_fill,ac_none`;
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${transformations}/${publicId}`;
  };

  return (
    <>
      {type === "video" ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover z-0"
          poster={
            fallbackImage
              ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_3840,h_2160,f_auto,q_auto/${fallbackImage}`
              : undefined
          }
        >
          <source src={buildVideoUrl()} type="video/mp4" />
        </video>
      ) : (
        <CldImage
          src={publicId}
          alt={altText}
          width={3840}
          height={2160}
          sizes="100vw"
          priority
          gravity="center"
          quality="auto:good"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
    </>
  );
};