// common/components/HeroBackground.tsx
"use client";
import React, { useRef, useState, useEffect } from "react";
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
  parallaxSpeed = 0.5,
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
  const [screenSize, setScreenSize] = useState<{
    width: number;
    height: number;
    devicePixelRatio: number;
  }>({ width: 1920, height: 1080, devicePixelRatio: 1 });

  useEffect(() => {
    const updateScreenSize = () => {
      if (typeof window !== 'undefined') {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
          devicePixelRatio: window.devicePixelRatio || 1,
        });
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const getOptimalDimensions = () => {
    const { width, devicePixelRatio } = screenSize;
    
    // Account for device pixel ratio for sharp images on high-DPI screens
    const pixelRatio = Math.min(devicePixelRatio, 2); // Cap at 2x to avoid huge files
    
    // Mobile-first responsive breakpoints with proper scaling
    if (width <= 480) {
      return { 
        width: Math.ceil(480 * pixelRatio), 
        height: Math.ceil(854 * pixelRatio) // 16:9 aspect ratio
      };
    }
    if (width <= 768) {
      return { 
        width: Math.ceil(768 * pixelRatio), 
        height: Math.ceil(1366 * pixelRatio) 
      };
    }
    if (width <= 1024) {
      return { 
        width: Math.ceil(1024 * pixelRatio), 
        height: Math.ceil(768 * pixelRatio) 
      };
    }
    if (width <= 1440) {
      return { 
        width: Math.ceil(1440 * pixelRatio), 
        height: Math.ceil(900 * pixelRatio) 
      };
    }
    if (width <= 1920) {
      return { 
        width: Math.ceil(1920 * pixelRatio), 
        height: Math.ceil(1080 * pixelRatio) 
      };
    }
    
    // 4K and above
    return { 
      width: Math.ceil(2560 * Math.min(pixelRatio, 1.5)), 
      height: Math.ceil(1440 * Math.min(pixelRatio, 1.5)) 
    };
  };

  const buildVideoUrl = () => {
    const { 
      quality = "auto:good", 
      format = "auto",
      bitrate,
      fps = 30 
    } = videoOptimization ?? {};
    
    const { width, height } = getOptimalDimensions();
    const { width: screenWidth } = screenSize;
    
    // Use higher quality for mobile to compensate for compression
    let videoQuality = quality;
    if (screenWidth <= 768) {
      videoQuality = quality === "auto:good" ? "auto:best" : quality;
    }
    
    const transformations = [
      `q_${videoQuality}`,
      `f_${format}`,
      `w_${width}`,
      `h_${height}`,
      `c_fill`,
      `g_center`,
      `ac_none`,
      `fps_${fps}`
    ];
    
    // Add bitrate control for mobile
    if (bitrate && screenWidth <= 768) {
      transformations.push(`br_${bitrate}`);
    }
    
    const transformString = transformations.join(',');
    
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${transformString}/${publicId}`;
  };

  const buildPosterUrl = () => {
    const { width, height } = getOptimalDimensions();
    
    return fallbackImage
      ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_${width},h_${height},f_auto,q_auto:best,g_center/${fallbackImage}`
      : undefined;
  };

  // Generate multiple video sources for different screen sizes and connection speeds
  const generateVideoSources = () => {
    const sources = [];
    const { devicePixelRatio } = screenSize;
    
    // High-end mobile (iPhone Pro, Samsung S-series, etc.)
    sources.push({
      src: buildVideoUrlForSize(480 * Math.min(devicePixelRatio, 2), 854 * Math.min(devicePixelRatio, 2), "auto:best"),
      media: "(max-width: 480px) and (-webkit-min-device-pixel-ratio: 2)",
      type: "video/mp4"
    });
    
    // Standard mobile
    sources.push({
      src: buildVideoUrlForSize(480, 854, "auto:good"),
      media: "(max-width: 480px)",
      type: "video/mp4"
    });
    
    // Tablet portrait
    sources.push({
      src: buildVideoUrlForSize(768 * Math.min(devicePixelRatio, 1.5), 1024 * Math.min(devicePixelRatio, 1.5), "auto:good"),
      media: "(max-width: 768px)",
      type: "video/mp4"
    });
    
    // Tablet landscape / Small desktop
    sources.push({
      src: buildVideoUrlForSize(1024, 768, "auto:good"),
      media: "(max-width: 1024px)",
      type: "video/mp4"
    });
    
    // Desktop
    sources.push({
      src: buildVideoUrlForSize(1920, 1080, "auto:good"),
      media: "(max-width: 1920px)",
      type: "video/mp4"
    });
    
    // 4K
    sources.push({
      src: buildVideoUrlForSize(2560, 1440, "auto:good"),
      media: "(min-width: 1921px)",
      type: "video/mp4"
    });
    
    return sources;
  };

  const buildVideoUrlForSize = (width: number, height: number, quality = "auto:good") => {
    const { format = "auto", fps = 30 } = videoOptimization ?? {};
    
    const transformations = [
      `q_${quality}`,
      `f_${format}`,
      `w_${width}`,
      `h_${height}`,
      `c_fill`,
      `g_center`,
      `ac_none`,
      `fps_${fps}`
    ].join(',');
    
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${transformations}/${publicId}`;
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
            {generateVideoSources().map((source, index) => (
              <source 
                key={index}
                src={source.src} 
                type={source.type} 
                media={source.media} 
              />
            ))}
            {/* Fallback source */}
            <source src={buildVideoUrl()} type="video/mp4" />
          </video>
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <CldImage
            src={publicId}
            alt={altText}
            width={getOptimalDimensions().width}
            height={getOptimalDimensions().height}
            sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1440px) 1440px, (max-width: 1920px) 1920px, 2560px"
            priority
            gravity="center"
            quality="auto:best"
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